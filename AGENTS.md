# Workspace boundaries

This is the primary `marissa274/merge-websites` Git checkout.

- The user requested a single unified project. The application, package manifest, and hosting configuration live at the repository root.
- MK LAB is the main application. Merge Launch event pages and Forma are part of the same application under `public/merge-launch/`; their authored JavaScript lives in `src/merge-launch/` and `src/forma/`.
- Use root package commands and the root Git repository. Do not recreate nested repositories, gitlinks, separate package manifests, or separate hosting configurations.
- Preserve all local exports and pre-unification source backups in `archives/`; they are ignored backup artifacts, not active source.
- Previous nested Git histories and the original root index are preserved under `.git/workspace-organization-backup/`. Do not delete them.
- For Sites publication, use an isolated temporary checkout, copy the intended unified sources there, and preserve the active root hosting project ID and audience. Never run a repository-resetting Sites helper in this checkout.
- Do not stage environment files, local credentials, dependency folders, runtime databases, or archives.
- Local unification alone does not authorize changing live deployments or audiences.
