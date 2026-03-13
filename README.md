# Bree Take-Home Andy Guo

A prototype for an AI-powered loan application processor covering the full applicant submission flow (approve / flag / deny paths)

**Loom walkthrough:** [ADD LOOM LINK HERE]
**FigJam:** https://www.figma.com/board/PKtRNY90ktYb1Vw02lGjzP/Bree-take-home?node-id=0-1&p=f&t=cLGzZdXJzlNHhUFU-0

---

## Running the prototype

```bash
npm install
npm run dev:admin    # http://localhost:5173
npm run dev:mobile   # Expo Go — scan the QR code
```

**Mobile:** Scan the QR code with [Expo Go](https://expo.dev/go) on your phone, or press `i`/`a` for iOS/Android simulator. On the landing screen, pick any demo scenario to pre-select a user, then tap Sign Up to run through the flow.

**Admin:** Opens at `localhost:5173`. Defaults to the "Needs Review" tab, which auto-selects the first pending item.

**Quirks to know:**
- All data is hardcoded in `apps/mobile/data/testData.ts` (mobile) and inlined in `apps/admin/src/App.tsx` (admin). There's no persistence — refreshing resets state.
- The mobile app has 7 demo scenarios selectable from the landing screen or the Settings tab in the main app. Each one drives a different decision path.
- Admin decisions (approve/deny) are in-memory only and reset on page refresh.
- Drop `bree-logo.png` into `apps/admin/public/` to replace the logo placeholder.

---

Again, thank you so much to Carmel and Richard for giving me to opportunity to interview for this role!
