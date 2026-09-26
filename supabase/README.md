# Learner accounts (Supabase)

Learners can sign in so their progress follows them between devices. Everything is optional: with no sign-in method switched on, the site works exactly as before and saves progress in the visitor's own browser.

| | |
| --- | --- |
| Project | `r357-education` in the "Sehan Thomas" organization |
| Project ref | `aqrxgjguqazsezlsmbiw` |
| Dashboard | https://supabase.com/dashboard/project/aqrxgjguqazsezlsmbiw |
| Region | ap-south-1 (Mumbai) |
| API URL | https://aqrxgjguqazsezlsmbiw.supabase.co |

## What is in this folder

- `migrations/`: the database schema, applied with `supabase db push`. It creates one table, `progress` (one row per learner per course), with **Row Level Security**, so a learner can only ever read or change their own row and the public key can do nothing to it. It also adds `delete_my_account()` so a learner can erase their own account and data.
- `config.toml`: the project's Auth settings (site address, allowed return addresses, and so on), applied with `supabase config push`.
- `templates/sign-in-code.html`: the email that carries a sign-in code (used once email sending is set up, see below).

The website side lives in `shared/`: `config.js` (public URL and key, and which sign-in methods to show), `auth.js`, `account.js` (the interface), `progress-sync.js` (how progress from several devices is merged) and `vendor/` (a pinned copy of the official `@supabase/supabase-js` library, loaded only when someone signs in).

## Turning sign-in on

Both methods are off in `shared/config.js` until they are ready, so nothing broken is ever shown to visitors. The site also asks Supabase which providers are really enabled before it shows a Google button.

### 1. Google sign-in (recommended first: no email sending needed)

1. In the [Google Cloud Console](https://console.cloud.google.com/), create a project (or use one), then **APIs & Services → OAuth consent screen**: app name `R357 Education`, your support email, and add the scopes `openid`, `email` and `profile`. Publish the app ("In production") so anyone can sign in.
2. **Credentials → Create credentials → OAuth client ID → Web application.**
   - **Authorized JavaScript origins:** `https://r357-education.vercel.app` and `http://localhost:8123`
   - **Authorized redirect URI:** `https://aqrxgjguqazsezlsmbiw.supabase.co/auth/v1/callback`
3. Click **Download JSON** on the "OAuth client created" dialog (or on the client's page) and put the file in the repo folder (or leave it in Downloads). Run the helper: it reads the Client ID and secret from that file, applies them to Supabase, flips `google: true` in `shared/config.js`, and deletes the file. Git ignores `client_secret*.json`, so it can never be committed:
   ```powershell
   powershell -ExecutionPolicy Bypass -File tools\enable-google.ps1
   ```
   (By hand instead: Dashboard → **Authentication → Sign In / Providers → Google → enable**, paste both, save, then set `google: true` in `shared/config.js`.)
4. Try it at http://localhost:8123/marginal, then commit and push.

The Google block in `config.toml` reads its values from the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables. Note that `supabase config push` also switches off Twilio SMS on the project (it was on by default and is not used).

### 2. Email code sign-in (needs a custom email sender)

Supabase's built-in email sender is for testing only: about 2 emails an hour, and only to your own team's addresses. On the free plan it also cannot use custom email templates, and the code sign-in needs one. To go public with email sign-in:

1. Set up an SMTP sender (Resend, Brevo, Amazon SES, and so on). Most require a domain you own, so that emails come from an address at your own domain.
2. Supabase Dashboard → **Authentication → Emails → SMTP Settings**: enable custom SMTP and enter the sender's details.
3. In `config.toml`, uncomment the two `[auth.email.template.*]` blocks and raise `[auth.rate_limit] email_sent` to suit your traffic, then run `supabase config push`. (The `sign-in-code.html` template contains the `{{ .Token }}` code.)
4. In `shared/config.js` set `emailCode: true`, commit and push.

## Working on it

```bash
supabase db push            # apply new migrations to the project
supabase config push        # apply changes to config.toml (it shows a diff and applies it)
supabase db advisors --linked   # security and performance scan
```

The database password is saved in `.env.supabase` at the repo root (git-ignored). Never commit it, and never put the **secret / service_role** key in any website file. Only the public "publishable" key belongs in `shared/config.js`.

### Testing the security rules

`tools/test-supabase-rls.js` proves against the live project that the public key can do nothing, that learners cannot see or change each other's progress, that bad data is rejected, and that account deletion works. It creates two throwaway users through the admin API (no emails are sent) and deletes them afterwards:

```powershell
$keys = supabase projects api-keys --project-ref aqrxgjguqazsezlsmbiw -o json | ConvertFrom-Json
$env:SUPABASE_URL = "https://aqrxgjguqazsezlsmbiw.supabase.co"
$env:SUPABASE_PUBLISHABLE_KEY = ($keys | ? type -eq 'publishable').api_key
$env:SUPABASE_SERVICE_KEY = ($keys | ? name -eq 'service_role').api_key
node tools/test-supabase-rls.js
```

## Good to know

- **Intentional advisor warning.** `supabase db advisors` flags `delete_my_account()` as a security-definer function callable by signed-in users. That is by design: it can only delete the caller's own account (it reads the caller's id from their token), and the test above checks that nobody else can call it.
- **Free plan pauses idle projects.** Supabase's free plan pauses a project after about a week without activity, and sign-in will not work until it is restored from the dashboard. If R357 Education gets real users, consider the Pro plan (or a small scheduled request to keep it active).
- **Two devices, one account.** Progress is merged, not overwritten: for each lesson the most recent action wins (so "undo" syncs too) and the best quiz score is kept. The rules are in `shared/progress-sync.js` and tested by `tools/check-progress-sync.js`.
- **Signing out** removes that account's progress from the browser, so the next person on a shared computer doesn't inherit it. It stays in the account.
