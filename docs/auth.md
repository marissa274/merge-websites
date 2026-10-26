# Sign in and accounts

Visitors can sign in three ways; all lead to the same MK LAB account features (purchases, downloads, personalization requests):

1. **Email + password**: `/signup`, `/login`, `/forgot-password`, `/reset-password`, `/verify-email`.
2. **Google**: shown only once it is configured (below).
3. **ChatGPT**: the host's sign-in, kept so existing customers keep their purchases.

Each method is its own account, except that Google joins an existing email + password account with the same address (Google has verified it). The sign-in pages hide the site menu and show a home link instead.

## Setup (hosting settings / environment variables)

| Variable | Needed for |
| --- | --- |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Sign in with Google. In Google Cloud Console → APIs & Services → Credentials, create an *OAuth client ID* (Web application). Authorized redirect URI: `https://mek-lab-studio.sasabelle.chatgpt.site/api/auth/google/callback`. Without these, the Google button is hidden. |
| `RESEND_API_KEY`, `MAIL_FROM` | Password-reset and email-confirmation emails via [Resend](https://resend.com) (`MAIL_FROM` like `MK LAB <hello@your-domain>`, on a domain verified in Resend). Without these, "Forgot the password?" says reset by email isn't available yet and points to Contact. |
| `ADMIN_EMAILS` | Unchanged. Admin access now also requires a **verified** email: ChatGPT and Google are verified; an email + password account becomes verified through its confirmation or reset link. |

The database tables come from `drizzle/0001_oval_chameleon.sql`, shipped in the build (`dist/.openai/drizzle`) for the host to apply.

## Security

- Passwords: PBKDF2-SHA256, 100,000 iterations, unique 16-byte salt; never stored or logged in plain text. Minimum 10 characters.
- Sessions: random 256-bit token in an `HttpOnly; SameSite=Lax; Secure` cookie (`mk_session`, 30 days); the database stores only its SHA-256 hash. Sign out deletes it.
- Login: same message for unknown email and wrong password; 8 failures per email (30 per connection) lock for 15 minutes. Sign-ups: 5 per connection per hour. Reset requests: 3 per email per hour, same reply whether or not the account exists.
- Reset and confirmation links: single-use, hashed, 1 hour (reset) / 24 hours (confirm). A reset signs out every other session and verifies the email.
- Google: state + PKCE checked on return; token audience, issuer, expiry and `email_verified` checked. If someone had registered that email with a password they never verified, that password is removed when the real owner signs in with Google.
- Return after sign-in only to same-site paths. Auth API refuses cross-site requests.
- Not included: two-factor authentication, account deletion, merging a ChatGPT account with an email/Google one.

Verified: `tests/auth.mjs` runs the real API routes against SQLite with the real migrations (sign up, log in, lockout, reset, sign out, cross-site refusal, admin rule, Google checks and linking); `tests/auth-page.mjs`; browser flow on the production build (sign up → account → sign out → wrong password message with focus → sign in).
