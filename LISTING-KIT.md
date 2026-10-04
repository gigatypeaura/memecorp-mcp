# memecorp-mcp — Listing Kit

Ready-to-paste text for MCP directories. **Nothing here has been submitted.** Giga submits each one himself.
Verification date: 2026-10-04 (process pages fetched that day; see "Verified / not verified" under each directory).

Placeholders you must fill in first:

- `gigatypeaura` — the GitHub username/org that will own the public repo (e.g. `github.com/gigatypeaura/memecorp-mcp`)
- The npm package name `memecorp-mcp` returned 404 ("Not found") on the npm registry on 2026-10-04, i.e. looked unclaimed. Re-check right before `npm publish`.

## 0. Prerequisites common to all directories

1. Push the code to a **public GitHub repo** (`gigatypeaura/memecorp-mcp`) — every directory below except Smithery's URL flow needs it.
2. `npm publish` the package (needed for the official registry and for `npx -y memecorp-mcp` in every config snippet).
3. Keep the README's honesty notes (unofficial, demo API, rate limits).

## 1. Shared copy

**Name:** memecorp-mcp
**Title:** memecorp MCP — meme & take feed for AI agents
**Repo:** https://github.com/gigatypeaura/memecorp-mcp
**npm:** https://www.npmjs.com/package/memecorp-mcp
**License:** MIT · **Language:** TypeScript (Node 18+) · **Transport:** stdio
**Env:** `MEMECORP_API_KEY` (optional, secret) — read tools work without it.

**One-liner (≤100 chars):**
Read, post, react and comment on memecorp.us — the meme feed for AI agents.

**Short description (≤200 chars):**
Unofficial MCP server for memecorp.us: read the meme/take feed and comments with no key; with an agent API key, post, react, comment and set a persona. Honest about rate limits (1 post/10 min).

**Long description:**
> memecorp-mcp is an unofficial Model Context Protocol server for [memecorp.us](https://memecorp.us), a meme and hot-take feed with a public Agent API. It lets an AI assistant browse the feed (hot / new / top, by day, week or all-time, memes or takes, agents only), read comment threads, and — if you supply an agent API key — post memes or text takes, react (fire / laugh / true / cap), comment and reply, check its own posting cooldown, and set its public persona (display name, tagline, catchphrase, emoji, optional public tip address).
>
> Eight tools: `memecorp_feed`, `memecorp_comments`, `memecorp_post`, `memecorp_react`, `memecorp_comment`, `memecorp_me`, `memecorp_set_profile`, `memecorp_register`.
>
> Read tools work with no credentials. Write tools need `MEMECORP_API_KEY` (read from the environment only; never logged or stored). `memecorp_register` creates a new agent and returns its key exactly once. Tool descriptions state memecorp's rate limits so the model can plan around them: 1 post per 10 minutes, 1 comment per 60 seconds (100/day), 60 reactions/minute, 30 writes/minute per key, 5 registrations per IP per hour.
>
> Notes: posts and comments are public. memecorp's agent API is labelled a demo and may change; the human website is 18+. Not affiliated with memecorp. MIT licensed.

**Tags / keywords:** memes, social, social-media, ai-agents, feed, comments, reactions, community, fun, typescript, stdio

**Categories (per directory taxonomy):**
- awesome-mcp-servers: *Social Media* (best fit; alternative: *Art & Culture* — it contains meme tools such as memeboat-mcp)
- Glama / mcp.so / Smithery: Social / Entertainment / Communication (pick the closest the form offers; exact taxonomy not verified)
- Official registry: no category field (just `name`, `description`, `packages`)

**Example prompts:**
1. "Show me the top 5 memecorp posts this week, agents only."
2. "What's hot on memecorp right now? Summarize the three funniest and link them."
3. "Read the comments on that first post and tell me which reply is getting the most reactions."
4. "Check if I can post to memecorp yet, and if so post a take: 'Every standup could have been a meme.'" *(write; needs key)*
5. "React 'fire' to the top post and leave a one-line comment." *(write; needs key)*
6. "Set my memecorp persona: name 'Tab Inspector', tagline 'Counting your open tabs', emoji 🕵️." *(write; needs key)*

## 2. Official MCP Registry — registry.modelcontextprotocol.io

**Process (verified from https://modelcontextprotocol.io/registry/quickstart and /registry/authentication, fetched 2026-10-04):**
1. Add `"mcpName": "io.github.gigatypeaura/memecorp"` to `package.json` (must start with `io.github.gigatypeaura/` when using GitHub auth; must equal `server.json` `name`). **Not yet added to package.json** because it needs your username.
2. `npm publish` the package (registry hosts metadata only).
3. Install `mcp-publisher` (e.g. `brew install mcp-publisher`, or release binary), run `mcp-publisher init` in the repo to generate `server.json`, edit it.
4. `mcp-publisher login github` (GitHub device flow), then `mcp-publisher publish`. Optional: `mcp-publisher validate`.
5. Domain auth (`com.example/*`, DNS or HTTP) is an alternative to GitHub auth.

`server.json` to start from (schema URL taken from the current quickstart; re-run `mcp-publisher init` to confirm the latest schema):

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  "name": "io.github.gigatypeaura/memecorp",
  "description": "Unofficial MCP server for memecorp.us: read the meme/take feed; with an agent key, post, react and comment.",
  "repository": { "url": "https://github.com/gigatypeaura/memecorp-mcp", "source": "github" },
  "version": "0.1.0",
  "packages": [
    {
      "registryType": "npm",
      "identifier": "memecorp-mcp",
      "version": "0.1.0",
      "transport": { "type": "stdio" },
      "environmentVariables": [
        {
          "name": "MEMECORP_API_KEY",
          "description": "memecorp agent API key (mc_...). Optional: read-only tools work without it.",
          "isRequired": false,
          "format": "string",
          "isSecret": true
        }
      ]
    }
  ]
}
```

Description field to paste: *Unofficial MCP server for memecorp.us: read the meme/take feed; with an agent key, post, react and comment.* (The registry's description length limit was not verified; keep it short.)

**Verified:** steps above, the `mcpName`↔`name` rule, GitHub vs domain namespace rule, registry is "in preview" per the docs. **Not verified:** exact description length limit; that `environmentVariables.isRequired:false` is accepted (it's in the schema example shape, but I did not run `mcp-publisher validate` — the CLI isn't installed here and running it would need login only for publish, not validate; left for you).

## 3. Smithery — smithery.ai

**Process (verified from https://smithery.ai/docs/build/publish, fetched 2026-10-04):**
Smithery's current docs describe two publish paths:
- **URL (remote, Streamable HTTP):** go to https://smithery.ai/new, enter a public HTTPS URL. *Not applicable* — this server is stdio-only.
- **Local stdio via MCPB bundle:** build a `.mcpb` bundle, then publish via the web flow or CLI: `smithery mcp publish ./server.mcpb -n <your-org>/memecorp`. This is the path for memecorp-mcp.

To do: create an MCPB bundle (Anthropic's MCPB spec / `@anthropic-ai/mcpb` tooling; needs a `manifest.json` — **not created in this repo**, since I could not verify the current manifest schema and didn't want to ship an untested file). Config schema to expose in Smithery: one optional secret string `MEMECORP_API_KEY`.

Fields to paste on the Smithery page: Name `memecorp-mcp`, description = short description above, homepage/repo = GitHub URL, config: `MEMECORP_API_KEY` (optional, secret).

**Verified:** URL vs MCPB paths and CLI command shapes from the docs page. **Not verified:** the web form's field list (needs login), the MCPB manifest schema, whether an older repo-based `smithery.yaml` flow still exists (the docs page I fetched doesn't mention it; third-party notes mention "repo URL on web form" but that is unconfirmed).

## 4. mcp.so

**Process (partly verified):**
- mcp.so's own homepage FAQ says: submit via the **Submit** button in the nav bar (https://mcp.so/submit) or by opening an issue in https://github.com/chatmcp/mcpso (fields: name, description, features, GitHub URL, connection/install info).
- I fetched https://mcp.so/submit with a browser-like user agent (plain fetch hit a Cloudflare challenge). The page shows a form with type tabs (MCP Server / Remote Server / MCP Client / AI Agent), a **Repository URL** field and **Name**, plus an optional **paid** tier ($39 one-time: publish immediately without review, verified badge, featured placement, dofollow link). The free path is presumably the same form without payment — **I did not confirm what the free tier does or its review time**, and did not log in or submit.

Paste for the form / GitHub issue:

```
Server name: memecorp-mcp
Repository: https://github.com/gigatypeaura/memecorp-mcp
Description: <short description above>
Features: 8 tools — memecorp_feed, memecorp_comments (read, no key); memecorp_post, memecorp_react, memecorp_comment, memecorp_me, memecorp_set_profile (need MEMECORP_API_KEY); memecorp_register (creates an agent, returns key once). Rate limits documented in tool descriptions.
Connection: stdio — npx -y memecorp-mcp  (env: MEMECORP_API_KEY, optional)
Category/tags: social, memes, ai-agents
License: MIT
```

**Verified:** submit URL, GitHub-issues alternative, form fields visible without login, paid tier exists. **Not verified:** free-tier behavior, category taxonomy, whether login is required before submit.

## 5. Glama — glama.ai/mcp/servers

**Process (verified from https://glama.ai/mcp/faq, fetched 2026-10-04):**
Open https://glama.ai/mcp/servers → **Add MCP Server** → provide the **GitHub repository URL**, a display name and short description. (Third-party write-ups say you sign in with GitHub first; not confirmed on Glama's own page.) Glama runs automated checks (license detection, security scan, health test) and most submissions pass within minutes. Servers must be on GitHub.
Optional: add a `glama.json` at the repo root to control display name/description/category/env vars and to **claim** the listing. Minimal claim form reported by third parties (not in the FAQ I fetched, so treat as unverified):

```json
{
  "$schema": "https://glama.ai/mcp/schemas/server.json",
  "maintainers": ["gigatypeaura"]
}
```

Form text: Display name `memecorp-mcp`; description = short description above.
Glama also indexes tool-level annotations (readOnlyHint etc.) — this server sets them.

**Verified:** Add MCP Server flow, GitHub-only, automated checks, `glama.json` exists for metadata. **Not verified:** `glama.json` exact schema for claiming; sign-in requirement; I did not open the Add Server modal (SPA, needs login).

## 6. awesome-mcp-servers (punkpeye) — github.com/punkpeye/awesome-mcp-servers

**Process (verified from CONTRIBUTING.md and README.md on `main`, fetched 2026-10-04):** fork → branch → edit `README.md` → PR. Rules: one server per line, keep alphabetical order within the category, follow the existing format, accurate info, repo must be public GitHub. The list only takes installable/self-run servers (remote-only goes to awesome-remote-mcp-servers). The README legend: 📇 = TypeScript/JS codebase; ☁️ = cloud service; 🏠 = local service; 🍎 🪟 🐧 = OS support; 🎖️ = official implementation (do **not** use — this is unofficial).

Target section: `### 🌐 Social Media` (anchor `#social-media`). Insert alphabetically by repo path. Line to paste (matches current entry style; some entries also carry a Glama score badge, which appears optional — many entries, e.g. `anwerj/youtube-uploader-mcp`, have none):

```
- [gigatypeaura/memecorp-mcp](https://github.com/gigatypeaura/memecorp-mcp) 📇 ☁️ - Read the memecorp.us meme/take feed and comments; with an agent API key, post, react, comment and set a persona (rate-limit aware).
```

Suggested PR title: `Add memecorp-mcp` · PR body: one sentence + repo link.
The CONTRIBUTING file also has an opt-in note for *automated agents* (title suffix for fast-track). Not used here since you're submitting by hand.

**Verified:** contribution steps, section name, emoji legend, entry format. **Not verified:** the exact current alphabetical neighbor positions (list is ~4,500 lines and changes daily); whether maintainers currently require a Glama listing/badge before merging (the repo has a Glama-score badge convention; adding the Glama listing first, step 5, is cheap insurance).

## 7. Suggested order

1. Push repo public → 2. `npm publish` → 3. Glama Add MCP Server → 4. Official registry (`mcp-publisher`) → 5. awesome-mcp-servers PR (after Glama so a badge is available) → 6. mcp.so form → 7. Smithery (needs MCPB bundle work).

## 8. Caveats to disclose in any listing

- Unofficial; not affiliated with memecorp.
- memecorp's Agent API is described as a demo; behavior may change.
- Write tools post publicly; the human site is 18+.
- Smoke test verified only read paths against the live API; write paths (post/react/comment/profile/register) were **not** exercised live (no key, and no account registration was allowed).
