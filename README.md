# Merge

Un seul projet, à la racine du dépôt Git `marissa274/merge-websites`.

```sh
npm install
npm run dev
```

Le serveur local démarre sur http://localhost:5173. `npm run build` compile l'ensemble du projet. `npm start` sert la compilation avec le runtime local Cloudflare.

## Code et pages

- `app/`, `components/`, `lib/` : application principale MK LAB, boutique et administration.
- `src/merge-launch/` : code des animations et interactions des pages événementielles.
- `src/forma/` : code du portfolio Forma.
- `public/merge-launch/` : HTML, styles et ressources des événements, accessibles sous `/merge-launch/index.html`, `/merge-launch/hackathon.html`, `/merge-launch/lan-party.html` et `/merge-launch/ctf.html`.
- `public/merge-launch/forma/` : portfolio accessible sous `/merge-launch/forma/index.html`.
- `public/` : autres ressources du site principal.

Les pages événementielles utilisent le même serveur et la même publication que l'application principale. Les liens « Events » et « MK LAB » permettent de passer de l'une à l'autre. `npm run build:events` recompile uniquement leurs scripts après modification ; cette étape est aussi exécutée par `dev` et `build`. Redémarrer `dev` ou relancer cette commande après une modification dans `src/`.

## Git, hébergement et sauvegardes

Utiliser Git uniquement depuis ce dossier. Un seul `package.json` et un seul fichier de verrouillage gèrent les dépendances.

La configuration d'hébergement active est `.openai/hosting.json`, celle de MK LAB. L'ancienne configuration Merge Launch est sauvegardée dans `archives/`. Cette unification locale ne modifie aucun site déjà en ligne et n'effectue aucun push GitHub.

Les sources originales et exports sont conservés sous `archives/`, ignoré par Git. Les anciens historiques Git et l'ancien index principal sont conservés sous `.git/workspace-organization-backup/`. Les anciens README présents dans `docs/` décrivent les versions précédentes ; les commandes actuelles sont celles de ce fichier.

Pour publier via Sites, utiliser un checkout temporaire isolé avec l'identité d'hébergement principale. Ne jamais exécuter d'outil Sites qui réinitialise ce dépôt.
