# Google and Apple sign-in for MK lab

The login and signup pages now offer email/password, Google and Apple. ChatGPT is no longer a login option in these pages. Social buttons remain disabled with a clear explanation until their provider credentials are configured; no successful social sign-in is simulated.

Configure credentials as secret production environment variables in Sites hosting. Do not commit credentials or paste private keys in chat.

## Google

Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for a Web application OAuth client. Register the exact callback:

`https://mek-lab-studio.sasabelle.chatgpt.site/api/auth/google/callback`

The existing Google flow validates state, PKCE, issuer, audience, expiry and verified email.

## Apple

Set `APPLE_CLIENT_ID` (Services ID), `APPLE_TEAM_ID`, `APPLE_KEY_ID` and `APPLE_PRIVATE_KEY` (the Sign in with Apple .p8 private key). Enable the Services ID for the website domain and register the exact HTTPS return URL:

`https://mek-lab-studio.sasabelle.chatgpt.site/api/auth/apple/callback`

The Apple callback receives `form_post`, binds the request with a short-lived Secure/HttpOnly/SameSite=None cookie, exchanges a one-use authorization code using an ES256 client assertion, and verifies the ID token signature with Apple's keys plus issuer, audience, nonce and expiry before creating a local session.

After updating the hosting environment, deploy a saved version to activate the new environment revision. Then verify a real consent/sign-in with each provider. Unit tests use generated signing keys and a real in-memory SQLite database; they do not establish that a production OAuth application is configured correctly.
