# Turns on Google sign-in for R357 Education.
# Run from the repo root after creating the Google OAuth client (see supabase/README.md):
#   powershell -ExecutionPolicy Bypass -File tools\enable-google.ps1
# It asks for the Client ID and Client secret, applies them to the Supabase project, and switches the site's Google button on.
# The secret is used only for this run: it is never written to a file in the repo.

$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

$env:Path += ";$env:LOCALAPPDATA\Programs\supabase"
if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) { throw 'The Supabase CLI was not found. Install it, then run "supabase login" and "supabase link".' }

$id = (Read-Host 'Google Client ID (ends in .apps.googleusercontent.com)').Trim()
$sec = Read-Host 'Google Client secret' -AsSecureString
$secret = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)).Trim()
if ($id -notmatch '\.apps\.googleusercontent\.com$') { throw 'That does not look like a Google Client ID.' }
if ($secret.Length -lt 10) { throw 'The client secret looks too short.' }

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
Write-Host ''
Write-Host 'Done. Google sign-in is on in Supabase and switched on in shared/config.js.'
Write-Host 'Test it at http://localhost:8123/marginal, then tell Claude to commit and push.'
