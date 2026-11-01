# Héberger MK lab soi-même

Le dépôt fonctionne localement sans Sites. Il contient MK lab, Merge Launch et Forma dans une seule application. La préparation locale ne publie rien, ne crée aucune ressource cloud et ne supprime pas l’ancienne version en ligne.

## Ce que contient la compilation

`npm run build` produit `dist/client/` (ressources publiques) et `dist/server/` (serveur Worker Vinext). Le fichier `dist/server/wrangler.json` est généré depuis la configuration racine. Toujours modifier `wrangler.jsonc`, puis reconstruire.

`npm start` exécute cette compilation **en local**, avec la même base et le même stockage `.wrangler/state/` que le développement. Ce n’est pas un serveur Node générique à lancer tel quel sur un VPS.

## Utiliser ton compte Cloudflare plus tard

Ces étapes sont à effectuer quand tu décides de publier. Rien n’a été exécuté automatiquement.

1. Créer, dans **ton compte**, une base D1 et un bucket R2. Remplacer dans `wrangler.jsonc` le nom de base historique, son identifiant placeholder et le nom de bucket par ceux de tes ressources. Garder les noms de bindings `DB` et `BUCKET` utilisés par le code.
2. Initialiser la base distante vide avec les migrations SQL de `drizzle/`. Les migrations initiales sont `0000_living_excalibur.sql` et `0001_oval_chameleon.sql`. Si la base possède déjà des tables, examiner son schéma et son historique de migrations avant de les appliquer ; ne pas réinitialiser les données.
3. Configurer les variables et secrets chez cet hébergeur : `SITE_URL=https://ton-domaine`, `ADMIN_EMAILS`, et seulement les services utilisés. Ne pas publier `.dev.vars` ni inclure de secrets dans les fichiers du client.
4. Reconstruire avec `npm run build`, puis déployer explicitement le Worker construit et ses ressources avec les outils de ton compte. Configurer ton domaine. Aucun script npm de ce dépôt ne lance de déploiement.
5. Configurer les callbacks Google et Apple sur ton domaine. Pour Stripe, utiliser d’abord le mode test et configurer `/api/webhook`. Vérifier les comptes, permissions, médias, emails et paiements avant d’ouvrir la boutique.

Les données locales et les données de l’ancien hébergement ne sont pas transférées par le build. Préparer séparément un export SQL et les fichiers du stockage que tu souhaites conserver, puis les importer dans tes propres ressources. Les cookies de session locaux ne constituent pas une migration des comptes.

## Choisir un autre hébergeur

La couche serveur importe `cloudflare:workers` et utilise `env.DB` (D1/SQLite) ainsi que `env.BUCKET` (R2). Pour Node/VPS ou un autre fournisseur, il faut adapter ces accès à sa base de données et à son stockage, puis utiliser un serveur compatible avec Vinext. Le code visuel et les ressources peuvent être conservés.

Les pages événementielles dans `public/merge-launch/` sont statiques après compilation de leurs scripts. Les comptes, l’administration, les devis, les médias et les paiements de MK lab nécessitent le serveur. Un hébergement statique seul ne les exécute pas.

## Maintenance locale

`npm run setup` installe uniquement les deux schémas initiaux avec des créations idempotentes ; il ne constitue pas un moteur de migration des futures versions. Conserver les migrations initiales intactes. Pour une évolution du schéma, créer une nouvelle migration, la tester sur une copie de la base puis appliquer explicitement les modifications avec `--local` avant toute opération distante.

Ne pas supprimer `.wrangler/state/` pour résoudre un problème : ce dossier contient les données locales. Git conserve les sources ; les données et secrets nécessitent leur propre copie si tu souhaites les transférer vers une autre machine.
