# InvoiceVault

Invoices and warranty slips in one place. Files go to an `InvoiceVault` folder in your Google Drive, details go to a Google Sheet in the same folder. No server, no database, free.

## 1. Google Cloud (one time)
1. console.cloud.google.com → create project `InvoiceVault`
2. APIs & Services → Library → enable **Google Drive API** and **Google Sheets API**
3. OAuth consent screen → External → add yourself as a **Test user** → scope `.../auth/drive.file`
4. Credentials → Create OAuth Client ID → **Web application**
   Authorized JavaScript origins: `http://localhost:4200` (+ your hosted URL later)
5. Copy the Client ID

## 2. Configure
Open `index.html`, find `const CLIENT_ID = 'PASTE_YOUR_CLIENT_ID...'` and paste your ID.

## 3. Run locally
```
cd invoicevault
npx serve -l 4200        # or: python -m http.server 4200
```
Open http://localhost:4200

## 4. Host free and use on your phone
- Netlify Drop: open app.netlify.com/drop and drag the `invoicevault` folder in.
  (Or GitHub Pages / Cloudflare Pages.)
- Add the new https URL to **Authorized JavaScript origins** in Google Cloud. Wait a few minutes.
- On your phone open the URL in Chrome → menu → **Install app** / **Add to Home screen**.

## Notes
- First sign-in shows "Google hasn't verified this app". That's normal for your own test app: tap Continue.
- Google sign-in lasts 1 hour; the app asks you to continue when it expires.
- Reminders: open a bill → "Add calendar reminder" (2 weeks before expiry).
- Deleted bills move their files to Drive trash (restorable for 30 days).
