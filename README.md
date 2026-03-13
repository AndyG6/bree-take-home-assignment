# Bree Take-Home — Andy Guo

A prototype for an AI-powered loan application processor covering the full applicant submission flow (approve / flag / deny paths), a post-decision experience for denied and flagged applicants (inline appeal, status tracker, review details modal), and an admin dashboard for human review of flagged applications and incoming appeals. Built in React Native (Expo) for the mobile app and React (Vite) for the admin dashboard. All application decisions are driven by a deterministic scoring engine against hardcoded spec data — no backend required.

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

## Design decisions

### Applicant-facing: the post-decision screen is the product

The spec focuses on the application flow, but the real design challenge is what happens after the decision. That's when anxiety peaks — the applicant got a result they didn't expect and they're trying to figure out what it means and what they can do. Three things drove the decisions here:

**Language.** The denial copy avoids "denied" in favor of "we weren't able to approve an advance at this time." This isn't euphemism — it's legally safer and more accurate for an algorithmic decision where no human reviewed the file. The copy also avoids listing specific denial reasons ("your income was too low") because the scoring model is a weighted composite and any single-factor explanation is misleading. Instead, the copy names the general evaluation categories (income consistency, account patterns, repayment capacity) so applicants understand the system without feeling singled out.

**The appeal flow is inline, not a modal.** For auto-denied applicants, the appeal is a simple adjustment — lower the amount, re-upload a document, add context. That doesn't warrant a full modal flow. The expansion lives inside the status card so the applicant sees exactly what's on file before they submit. The only modal appeal (`AppealScreen`) is for applicants who were flagged and then manually denied after human review — those cases warrant more context because a human already looked at the file.

**The status tracker is always visible.** When someone opens the app during the 1–2 day review window, they're not checking casually — they're anxious. The progress stages and time estimate are the entire point of the screen, so they're never hidden behind a tap. The explanatory context ("some applications need a closer look...") is collapsible because it's only useful on the first visit; by the third visit the applicant has already read it.

**Four decision states, not three.** The spec covers approve/deny/flag, but a complete product needs a fourth: flagged → denied after manual review. That applicant has account access (they got through the flagging stage), has seen a human review, and can appeal with more context. Treating them the same as an auto-denied applicant would be confusing and unfair.

### Admin: minimize time-to-decision

The admin dashboard is built around the assumption that the primary job is to clear the review queue, and every extra click is friction on a task that needs to happen quickly.

**One tab for everything that needs a decision today.** Fresh flags and incoming appeals are interleaved in the "Needs Review" queue rather than split across tabs. The distinction is visual: fresh flags show score-based colors (orange/red/yellow), appeals show a blue score circle — blue means "returning applicant with history, evaluate the delta." An admin can pre-triage at a glance without opening the item.

**Appeals surface prior context immediately.** When an admin opens an appeal, the detail panel leads with "Prior Decision" (who denied it, when, the original score, the denial reason) and "What's New" (adjusted amount, re-uploaded documents, applicant note) before the score breakdown. The reviewer shouldn't have to reconstruct what happened — that context should be waiting for them.

**Approve/Deny are always visible.** Sticky top bar, no scrolling required. After a decision the panel auto-advances to the next pending item so the reviewer stays in flow.

**Score breakdown with weights.** Each criterion shows its weight in the composite score so an admin can quickly see whether a low sub-score is load-bearing (30% weight) or a footnote (10% weight). Zero-score items are flagged in red with a warning icon because they represent hard failures in the model, not just low performance.

---

## What I'd do differently with more time

**Re-score appeals before they hit the queue.** Right now, Bob's appeal (adjusting from $2,000 to $800) lands in the review queue with his original score of 31. But a $800 request against $1,400/mo income clears the 3x threshold — his score on the adjusted amount would be closer to 58. The admin is evaluating him on stale data. The right behavior is to run the scoring model against the adjusted parameters when an appeal is submitted and surface the new score alongside the original in the "Prior Decision" section.

**Build the notification system.** When Bob's appeal is resolved, how does he find out? The prototype has no answer for this. The interesting design question isn't the mechanics (push vs. email) — it's what the message says. An approval notification is easy. A denial-after-appeal notification is the hardest copy in the product: it has to be final without being cruel, and it has to close off the loop without opening a new one ("what do I do now?"). That message deserves as much design attention as the in-app copy.

**Separate appeal UX from fresh application UX more clearly in the admin.** Appeals are scoped — the reviewer is evaluating a delta (what changed, does it change the outcome?) not a full application. The current detail panel shows the full score breakdown for both, which is right for fresh flags but creates noise for appeals where the breakdowns haven't changed. An appeal-specific panel might collapse the unchanged criteria and lead with only the dimensions affected by the new documents or adjusted amount.

**Test the denial copy with real users.** "We weren't able to approve an advance at this time" is safer than "denied" but it might read as evasive. Real applicants may find the general category framing (income consistency, account patterns) informative or they may find it maddeningly vague. The right answer comes from testing, not from design intuition.

**Revisit the scoring model's time weighting.** Bob Smith's scenario illustrates a real problem: a single bad month of overdrafts tanks his account stability score even if the previous six months were fine. The current model treats all bank statement data equally. Weighting recent activity more heavily (last 30 days > last 60 days > last 90 days) would better reflect actual repayment capacity and reduce false negatives for applicants who had a rough patch but have since recovered.

Again, thank you so much to Carmel and Richard for giving me to opportunity to interview for this role!
