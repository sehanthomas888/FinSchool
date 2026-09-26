# Turns on Google sign-in for R357 Education.
# Run from the repo root after creating the Google OAuth client (see supabase/README.md):
#   powershell -ExecutionPolicy Bypass -File tools\enable-google.ps1
# It applies the Client ID and Client secret to the Supabase project, and switches the site's Google button on.
# The secret is used only for this run: it is never written to a file in the repo.

$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

$env:Path += ";$env:LOCALAPPDATA\Programs\supabase"
if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) { throw 'The Supabase CLI was not found. Install it, then run "supabase login" and "supabase link".' }

# The credentials come from the client_secret_*.json file that Google Cloud offers as "Download JSON" (looked for in the
# repo folder and in Downloads; git ignores it). The file is deleted after a successful run.
$file = Get-ChildItem $root, "$env:USERPROFILE\Downloads" -Filter 'client_secret*.json' -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (-not $file) { throw 'No client_secret*.json found. In Google Cloud (Clients > your client) download the JSON into this folder.' }
$web = (Get-Content $file.FullName -Raw | ConvertFrom-Json).web
$id = $web.client_id; $secret = $web.client_secret
if ($id -notmatch '\.apps\.googleusercontent\.com$' -or $secret -notmatch '^GOCSPX-') { throw 'That file does not look like a Google web client.' }

$toml = Join-Path $root 'supabase\config.toml'
$text = [IO.File]::ReadAllText($toml)
$new = [regex]::Replace($text, '(\[auth\.external\.google\]\s*\r?\nenabled = )false', '${1}true')
if ($new -eq $text -and $text -notmatch '\[auth\.external\.google\]\s*\r?\nenabled = true') { throw 'Could not find the Google block in supabase/config.toml.' }
[IO.File]::WriteAllText($toml, $new, (New-Object Text.UTF8Encoding($false)))

$env:GOOGLE_CLIENT_ID = $id
$env:GOOGLE_CLIENT_SECRET = $secret
Write-Host 'Applying to Supabase...'
supabase config push
if ($LASTEXITCODE -ne 0) { throw 'supabase config push failed.' }

$cfg = Join-Path $root 'shared\config.js'
$c = [IO.File]::ReadAllText($cfg)
$c2 = $c -replace 'google:\s*false', 'google: true'
[IO.File]::WriteAllText($cfg, $c2, (New-Object Text.UTF8Encoding($false)))

Remove-Item Env:GOOGLE_CLIENT_ID, Env:GOOGLE_CLIENT_SECRET
[IO.File]::Delete($file.FullName)
Write-Host ''
Write-Host 'Done. Google sign-in is on in Supabase and switched on in shared/config.js.'
Write-Host 'Test it at http://localhost:8123/marginal, then tell Claude to commit and push.'
