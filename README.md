# Bree Take-Home Andy Guo

A prototype for an AI-powered loan application processor covering the full applicant submission flow (approve / flag / deny paths)

**Loom walkthrough:** https://www.loom.com/share/e4c7b6ef39f04c29aa1ef0ab6c30815e
https://www.loom.com/share/32085849d1fe41cebfa63908807d9290

Explore the design thinking and decision-making behind every screen in the FigJam board:

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
- All data is hardcoded in `apps/mobile/data/testData.ts` (mobile) and inlined in `apps/admin/src/App.tsx` (admin).
- The mobile app has 7 demo scenarios selectable from the landing screen or the Settings tab in the main app. Each one drives a different decision path.
- Admin decisions (approve/deny) are in-memory only and reset on page refresh.

---

## Design rationale

**Key problems identified with Bree:**
- Applicants submit sensitive financial documents and receive little to no feedback on what's happening with their application
- Denied users get vague rejections with no explanation and no path forward, creating a feeling of wasted effort and broken trust
- The app promises speed but has no mechanism to set realistic expectations, leading to frustration when timelines don't match reality
- There is no way for applicants to correct mistakes or advocate for themselves after a decision is made

**Why user trust is the central design driver:**
Bree is a financial product that asks people to hand over their most sensitive information at a vulnerable moment. Every gap in transparency, whether it be a missing status update, a vague denial, or a broken time estimate, compounds into distrust. Every feature prioritization decision in this prototype ties back to closing those trust gaps. 

---

Again, thank you so much to Carmel and Richard for giving me the opportunity to interview for this role!

