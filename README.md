# MK lab — projet local

Un seul projet, à la racine du dépôt Git `marissa274/merge-websites`. Les pages actuelles, dont le travail de Claude, restent les sources de référence. Aucune commande ci-dessous ne publie le site ni ne nécessite de compte ChatGPT ou Cloudflare.

## Démarrer sur ton ordinateur

Prérequis : Node.js **22.13 ou supérieur**, npm.

```sh
npm ci
npm run dev
```

Ouvrir **http://localhost:5173**. Le premier démarrage crée `.dev.vars` à partir de `.dev.vars.example` et initialise les tables locales manquantes. Les données et secrets existants ne sont pas écrasés. Le serveur écoute uniquement sur cet ordinateur. Internet est nécessaire pour installer les dépendances et utiliser les services externes facultatifs.

Pour tester la version compilée : arrêter le serveur de développement, puis :

```sh
npm run build
npm start
```

Wrangler affiche son adresse locale, normalement **http://127.0.0.1:8787**. `npm start` émule le serveur complet sur ton ordinateur ; il ne déploie rien. `npm run setup` peut aussi initialiser la base séparément.

## Configuration et données

- `wrangler.jsonc` : configuration du serveur et des bindings `DB` et `BUCKET`, indépendants de Sites. Les noms de ressources historiques y préservent les données locales ; l’identifiant de base est un placeholder, pas une ressource distante active.
- `.dev.vars` : tes réglages et secrets locaux, ignorés par Git. Les variables proposées se trouvent dans `.dev.vars.example`. Redémarrer le serveur après modification.
- `.wrangler/state/` : base SQLite et fichiers stockés localement, ignorés par Git. Garder ce dossier pour conserver les données. Le développement et la version compilée partagent cet emplacement.
- `SITE_URL` : adresse publique utilisée dans les métadonnées et le sitemap, par défaut `http://localhost:5173`. Adapter au port utilisé puis, plus tard, à ton domaine.

Email/mot de passe fonctionne avec la base locale. Google, Apple, les emails et les paiements nécessitent tes propres identifiants de service ; ils ne sont pas simulés. Les emails de validation et de réinitialisation nécessitent Resend. L’administration exige un email vérifié figurant dans `ADMIN_EMAILS`. Aucun administrateur fictif n’est créé. Voir [connexion Google/Apple](docs/social-sign-in.md).

La base en ligne n’a pas été copiée automatiquement : le contenu dynamique affiché en local provient de la base locale déjà présente. Les fichiers sources, images et polices du dépôt restent dans le projet.

## Code et pages

- `app/`, `components/`, `lib/`, `db/` : MK lab, boutique, compte et administration.
- `worker/` : serveur Vinext.
- `src/merge-launch/`, `src/forma/` : scripts des événements et du portfolio.
- `public/merge-launch/` : événements et Forma, sous le même serveur que MK lab.

`npm run build:events` recompile uniquement les scripts des événements. Cette étape est également exécutée par `dev` et `build`. Les changements dans `src/` nécessitent cette recompilation.

## Héberger toi-même ensuite

Voir [le guide d’auto-hébergement](docs/self-hosting.md). Le serveur actuel utilise les API **Cloudflare Workers, D1 et R2**, émulées localement sans compte cloud. Tu peux utiliser ton propre compte Cloudflare et ton domaine. Un hébergeur Node, un VPS ou un hébergement statique nécessite une adaptation du serveur et du stockage ; téléverser uniquement `public/` ne suffit pas pour la boutique et les comptes.

Aucune publication automatique, aucun push Git ni changement du site déjà en ligne n’est effectué. L’ancien lien Sites est archivé sous `archives/local-only-transition/hosting.json` ; il n’est plus utilisé par la configuration active. Les anciens outils Sites encore présents dans `scripts/` sont historiques et ne sont appelés par aucune commande npm active.

## Git et sauvegardes

Utiliser Git depuis ce dossier uniquement, avec un seul `package.json` et un seul fichier de verrouillage. Ne pas ajouter `.dev.vars`, `.env`, `.wrangler/`, `.local-runtime/`, les dépendances ou les archives à Git. Les secrets et données locales ne sont pas sauvegardés par Git.

Les sources et exports précédents restent dans `archives/`. Les anciens historiques restent dans `.git/workspace-organization-backup/`. Les consignes durables se trouvent dans [AGENTS.md](AGENTS.md).
