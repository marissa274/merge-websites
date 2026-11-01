# Connexion Google et Apple — MK lab

Le site utilise ses propres sessions pour email/mot de passe, Google et Apple. Aucun compte ChatGPT ni en-tête d’identité de l’hébergeur n’est nécessaire. Les boutons sociaux restent désactivés tant que les identifiants ne sont pas configurés.

En local, placer les secrets dans `.dev.vars` puis redémarrer le serveur. Pour ton futur hébergement, configurer ces secrets dans ton propre environnement serveur. Ne jamais les ajouter à Git ni au code client.

## Google

Configurer `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` pour un client OAuth Web. Pour le serveur local par défaut, enregistrer exactement :

`http://localhost:5173/api/auth/google/callback`

Ouvrir le site avec `localhost`, le même port et le même protocole que le callback enregistré. Pour ton domaine futur, enregistrer également `https://ton-domaine/api/auth/google/callback`.

Le flux valide state, PKCE, issuer, audience, expiration et email vérifié.

## Apple

Configurer `APPLE_CLIENT_ID` (Services ID), `APPLE_TEAM_ID`, `APPLE_KEY_ID` et `APPLE_PRIVATE_KEY` (clé privée .p8). Enregistrer ton domaine et l’URL de retour HTTPS :

`https://ton-domaine/api/auth/apple/callback`

Apple nécessite une URL HTTPS de domaine valide ; le simple serveur HTTP sur localhost ne suffit pas. Aucun tunnel public n’est lancé automatiquement.

Le callback reçoit `form_post`, vérifie state et le cookie Secure/HttpOnly/SameSite=None, échange le code avec une assertion ES256 puis valide la signature, issuer, audience, nonce et expiration du jeton avant de créer une session du site.

## Vérification

Tester un vrai consentement avec chaque fournisseur après configuration. Les tests automatisés utilisent des clés de test générées et SQLite en mémoire ; leur réussite ne configure pas ton application OAuth chez Google ou Apple.
