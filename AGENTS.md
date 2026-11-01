# Workspace boundaries

This is the primary `marissa274/merge-websites` Git checkout.

- The user requested a single unified project. The application, package manifest, and hosting configuration live at the repository root.
- MK LAB is the main application. Merge Launch event pages and Forma are part of the same application under `public/merge-launch/`; their authored JavaScript lives in `src/merge-launch/` and `src/forma/`.
- Use root package commands and the root Git repository. Do not recreate nested repositories, gitlinks, separate package manifests, or separate hosting configurations.
- Preserve all local exports and pre-unification source backups in `archives/`; they are ignored backup artifacts, not active source.
- Previous nested Git histories and the original root index are preserved under `.git/workspace-organization-backup/`. Do not delete them.
- This project is local-first. Do not use Sites to publish, link a hosting project, change remote environments, deploy, or change audiences unless the user explicitly authorizes the specific destination.
- `npm run dev`, `npm run build`, `npm start`, and `npm run setup` must stay local. No implicit deployment hooks.
- Future self-hosting belongs to the user. Preserve their freedom to choose the host; never activate a ChatGPT/Sites deployment by default.
- If the user explicitly requests Sites publication later, use an isolated temporary checkout. Never run a repository-resetting Sites helper in this checkout.
- Do not stage environment files, local credentials, dependency folders, runtime databases, or archives.
- Local unification alone does not authorize changing live deployments or audiences.

# Preserve the user's existing work

- Treat the current unified local application, including Claude's work, as the source of truth.
- Before publishing, compare the temporary checkout with the intended local sources. Do not publish an older hosted baseline that omits local changes.
- Do not replace or remove Claude's work, including the Pricing page, without the user's explicit authorization. Apply requested edits on top of the existing work.
