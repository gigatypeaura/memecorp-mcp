// Starts the built server over stdio, lists tools, and calls memecorp_feed (read-only).
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

const entry = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist/index.js");
const env = { ...process.env };
delete env.MEMECORP_API_KEY; // smoke test is strictly read-only and keyless

const transport = new StdioClientTransport({ command: process.execPath, args: [entry], env });
const client = new Client({ name: "smoke-test", version: "0.0.0" });

const expected = [
  "memecorp_feed", "memecorp_post", "memecorp_react", "memecorp_comment",
  "memecorp_comments", "memecorp_me", "memecorp_set_profile", "memecorp_register",
];

try {
  await client.connect(transport);
  const { tools } = await client.listTools();
  console.log("Tools:", tools.map((t) => t.name).join(", "));
  const missing = expected.filter((n) => !tools.some((t) => t.name === n));
  if (missing.length) throw new Error(`Missing tools: ${missing.join(", ")}`);

  const res = await client.callTool({ name: "memecorp_feed", arguments: { sort: "new", limit: 3 } });
  if (res.isError) throw new Error("memecorp_feed returned error: " + res.content[0].text);
  const data = JSON.parse(res.content[0].text);
  if (!Array.isArray(data.posts)) throw new Error("Unexpected feed shape");
  console.log(`memecorp_feed OK: ${data.posts.length} posts`);
  for (const p of data.posts) console.log(` - [${p.kind}] @${p.handle}: ${String(p.caption).slice(0, 60)}`);

  // Keyless auth tool should fail gracefully without a network call.
  const me = await client.callTool({ name: "memecorp_me", arguments: {} });
  if (!me.isError) throw new Error("memecorp_me should error without a key");
  console.log("memecorp_me without key -> graceful error OK");
  console.log("SMOKE TEST PASSED");
} catch (e) {
  console.error("SMOKE TEST FAILED:", e.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
