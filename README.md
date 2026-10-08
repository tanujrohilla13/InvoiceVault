# InvoiceVault v2

Bills, warranties and personal documents in one place, stored in your own Google Drive.

## Update your live app (GitHub)
Upload these files to your `invoicevault` repo and replace the old ones:
index.html, sw.js (plus the icons and manifest if missing). Commit. Wait 1-2 minutes.
On your phone, close and reopen the app (twice if you still see the old version).

## What's new
- Documents tab: Aadhaar, PAN, passport, licence, RC, insurance, PUC, certificates and more
- Expiry tracking with type-aware alerts (passport 6 months before, PUC 15 days, etc.)
- "Belongs to" field for family members
- Optional encryption (AES-256-GCM) with a vault password, done on your phone before upload
- App lock with fingerprint/screen lock or a PIN
- Image previews for bills and documents, full-screen view

## Important
- If you forget the vault password, encrypted documents cannot be recovered. Write it down somewhere safe.
- The app lock is set separately on each phone.
- Don't rename the InvoiceVault folder, the "InvoiceVault Data" sheet, or its tabs.
