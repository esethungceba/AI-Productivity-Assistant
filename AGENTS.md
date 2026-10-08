<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- All AI calls go through one server route (src/routes/api/ai.ts) with per-tool structured system prompts in src/lib/prompts.ts — keeps keys server-side and prompts consistent.
- Demo data lives in src/lib/demo-data.ts; chat history and time-saved estimates use browser storage — no backend database yet.
- Shared company identity and contact links live in src/lib/business.ts and feed the interface and AI context to prevent conflicting business details.
