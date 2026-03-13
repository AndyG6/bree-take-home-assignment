import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BreakdownItem {
  weight: number;
  score: number;
  note: string;
}

type SystemDecision = "approved" | "denied" | "flagged_for_review";

interface AppealData {
  submittedAt: string;          // e.g. "Mar 8, 2026"
  deniedAt: string;             // original denial date
  deniedBy: string;             // "System (auto-denial)" | "Admin review"
  denialReason: string;         // plain-language reason
  adjustedAmount?: number;      // if applicant lowered the request
  newDocuments?: string[];      // re-uploaded docs
  contextText?: string;         // free-text the applicant wrote
}

interface Application {
  id: string;
  applicant: string;
  email: string;
  loanAmount: number;
  monthlyIncome: number;
  employmentStatus: string;
  documents: string[];
  score: number;
  decision: SystemDecision;
  extractionError?: string;
  appeal?: AppealData;
  breakdown: {
    income_verification: BreakdownItem;
    income_level: BreakdownItem;
    account_stability: BreakdownItem;
    employment_status: BreakdownItem;
    debt_to_income: BreakdownItem;
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPLICATIONS: Application[] = [
  {
    id: "app-001",
    applicant: "Jane Doe",
    email: "jane.doe@example.com",
    loanAmount: 1500,
    monthlyIncome: 5000,
    employmentStatus: "employed",
    documents: ["pay_stub_strong.pdf", "bank_statement_healthy.pdf"],
    score: 82,
    decision: "approved",
    breakdown: {
      income_verification: { weight: 0.30, score: 95, note: "Documented income matches stated income within tolerance" },
      income_level:        { weight: 0.25, score: 90, note: "Monthly income is 3.3x loan amount" },
      account_stability:   { weight: 0.20, score: 85, note: "Positive balance, no overdrafts, consistent deposits" },
      employment_status:   { weight: 0.15, score: 100, note: "Employed" },
      debt_to_income:      { weight: 0.10, score: 30, note: "Low withdrawal-to-deposit ratio" },
    },
  },
  {
    id: "app-002",
    applicant: "Bob Smith",
    email: "bob.smith@example.com",
    loanAmount: 2000,
    monthlyIncome: 1400,
    employmentStatus: "self-employed",
    documents: ["pay_stub_weak.pdf", "bank_statement_risky.pdf"],
    score: 31,
    decision: "denied",
    appeal: {
      submittedAt: "Mar 10, 2026",
      deniedAt: "Mar 8, 2026",
      deniedBy: "System (auto-denial)",
      denialReason: "Requested amount exceeded 3x monthly income threshold. Account showed overdrafts and inconsistent deposits.",
      adjustedAmount: 800,
      newDocuments: ["bank_statement_healthy.pdf"],
      contextText: "I've switched to direct deposit and my last 3 months have been stable. Lowered my request to better fit my income.",
    },
    breakdown: {
      income_verification: { weight: 0.30, score: 40, note: "Documented income roughly matches but low confidence" },
      income_level:        { weight: 0.25, score: 0,  note: "Monthly income is 0.7x loan amount (below 3x threshold)" },
      account_stability:   { weight: 0.20, score: 15, note: "Overdrafts present, inconsistent deposits, low balance" },
      employment_status:   { weight: 0.15, score: 60, note: "Self-employed" },
      debt_to_income:      { weight: 0.10, score: 80, note: "High withdrawal-to-deposit ratio" },
    },
  },
  {
    id: "app-003",
    applicant: "Bob Smith",
    email: "bob.smith@example.com",
    loanAmount: 300,
    monthlyIncome: 1400,
    employmentStatus: "self-employed",
    documents: ["pay_stub_weak.pdf", "bank_statement_risky.pdf"],
    score: 58,
    decision: "flagged_for_review",
    breakdown: {
      income_verification: { weight: 0.30, score: 40, note: "Documented income roughly matches but low confidence" },
      income_level:        { weight: 0.25, score: 90, note: "Monthly income is 4.7x loan amount" },
      account_stability:   { weight: 0.20, score: 15, note: "Overdrafts present, inconsistent deposits, low balance" },
      employment_status:   { weight: 0.15, score: 60, note: "Self-employed" },
      debt_to_income:      { weight: 0.10, score: 80, note: "High withdrawal-to-deposit ratio" },
    },
  },
  {
    id: "app-004",
    applicant: "Jane Doe",
    email: "jane.doe@example.com",
    loanAmount: 4500,
    monthlyIncome: 5000,
    employmentStatus: "employed",
    documents: ["pay_stub_strong.pdf", "bank_statement_healthy.pdf"],
    score: 68,
    decision: "flagged_for_review",
    breakdown: {
      income_verification: { weight: 0.30, score: 95, note: "Documented income matches stated income within tolerance" },
      income_level:        { weight: 0.25, score: 45, note: "Monthly income is 1.1x loan amount (below 3x threshold)" },
      account_stability:   { weight: 0.20, score: 85, note: "Positive balance, no overdrafts, consistent deposits" },
      employment_status:   { weight: 0.15, score: 100, note: "Employed" },
      debt_to_income:      { weight: 0.10, score: 30, note: "Low withdrawal-to-deposit ratio" },
    },
  },
  {
    id: "app-005",
    applicant: "Carol Tester",
    email: "carol.tester@example.com",
    loanAmount: 1000,
    monthlyIncome: 8000,
    employmentStatus: "employed",
    documents: [],
    score: 55,
    decision: "flagged_for_review",
    extractionError: "no_documents_provided",
    breakdown: {
      income_verification: { weight: 0.30, score: 0,   note: "No documents to verify" },
      income_level:        { weight: 0.25, score: 95,  note: "Stated income is 8x loan amount (unverified)" },
      account_stability:   { weight: 0.20, score: 0,   note: "No bank statement provided" },
      employment_status:   { weight: 0.15, score: 100, note: "Employed" },
      debt_to_income:      { weight: 0.10, score: 0,   note: "Cannot assess without bank statement" },
    },
  },
  {
    id: "app-006",
    applicant: "Dave Liar",
    email: "dave.liar@example.com",
    loanAmount: 2000,
    monthlyIncome: 10000,
    employmentStatus: "employed",
    documents: ["pay_stub_weak.pdf"],
    score: 28,
    decision: "denied",
    appeal: {
      submittedAt: "Mar 11, 2026",
      deniedAt: "Mar 9, 2026",
      deniedBy: "System (auto-denial)",
      denialReason: "Critical income mismatch: stated $10,000/mo but documents show $1,400/mo. Score of 28 is well below auto-deny threshold.",
      newDocuments: ["pay_stub_strong.pdf", "bank_statement_healthy.pdf"],
      contextText: "The previous pay stub was from a contract that ended. I've uploaded my new full-time employment documents.",
    },
    breakdown: {
      income_verification: { weight: 0.30, score: 0,   note: "MISMATCH: Stated $10,000/mo, documented $1,400/mo (86% discrepancy)" },
      income_level:        { weight: 0.25, score: 0,   note: "Documented income is 0.7x loan amount" },
      account_stability:   { weight: 0.20, score: 15,  note: "Overdrafts present, inconsistent deposits" },
      employment_status:   { weight: 0.15, score: 100, note: "Employed" },
      debt_to_income:      { weight: 0.10, score: 80,  note: "High withdrawal-to-deposit ratio" },
    },
  },
];

const FLAGGED   = APPLICATIONS.filter(a => a.decision === "flagged_for_review");
const APPEALS   = APPLICATIONS.filter(a => a.decision === "denied" && !!a.appeal);
const NEEDS_REVIEW = [...FLAGGED, ...APPEALS]; // interleaved — both need a decision today
const DENIED    = APPLICATIONS.filter(a => a.decision === "denied");
const APPROVED  = APPLICATIONS.filter(a => a.decision === "approved");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreColor(s: number): string {
  if (s === 0)  return "#ef4444";
  if (s < 40)   return "#f97316";
  if (s < 70)   return "#eab308";
  if (s < 85)   return "#3b82f6";
  return "#22c55e";
}

function scoreIcon(s: number): React.ReactElement {
  const color = scoreColor(s);
  if (s >= 70) return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
  if (s >= 30) return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}

function cleanDoc(name: string): string {
  return name
    .replace(/_strong|_weak|_healthy|_risky/g, "")
    .replace(".pdf", "")
    .replace(/_/g, " ");
}

const BREAKDOWN_LABELS: Record<string, string> = {
  income_verification: "Income Verification",
  income_level:        "Income Level",
  account_stability:   "Account Stability",
  employment_status:   "Employment Status",
  debt_to_income:      "Debt-to-Income",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const color = scoreColor(score);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        flex: 1, height: 6, borderRadius: 999,
        backgroundColor: "#f1f5f9", overflow: "hidden",
      }}>
        <div style={{
          width: `${score}%`, height: "100%",
          borderRadius: 999, backgroundColor: color,
          transition: "width 0.3s",
        }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color, minWidth: 24, textAlign: "right" }}>{score}</span>
      <span style={{ minWidth: 12, display: "flex", alignItems: "center" }}>{scoreIcon(score)}</span>
    </div>
  );
}

function BreakdownTable({ breakdown }: { breakdown: Application["breakdown"] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {Object.entries(breakdown).map(([key, item]) => (
        <div key={key}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{BREAKDOWN_LABELS[key]}</span>
            <span style={{
              fontSize: 11, fontWeight: 600, color: "#94a3b8",
              backgroundColor: "#f1f5f9", borderRadius: 4,
              padding: "1px 7px",
            }}>
              {Math.round(item.weight * 100)}%
            </span>
          </div>
          <ScoreBar score={item.score} />
          <p style={{
            margin: "5px 0 0", fontSize: 12,
            color: item.score === 0 ? "#ef4444" : "#6b7280",
            lineHeight: 1.45,
          }}>
            {item.score === 0 && <span style={{ marginRight: 4, display: "inline-flex", verticalAlign: "middle" }}><IconAlert size={12} color="#ef4444" /></span>}{item.note}
          </p>
        </div>
      ))}
    </div>
  );
}

function OverallScoreBadge({ score }: { score: number }) {
  const color = scoreColor(score);
  const label = score >= 70 ? "Auto-approve range" : score >= 50 ? "Manual review" : "Auto-deny range";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      backgroundColor: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: 12, padding: "14px 18px", marginBottom: 20,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        border: `3px solid ${color}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 18, fontWeight: 800, color }}>{score}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 6 }}>Overall Score</div>
        <div style={{ width: "100%", height: 6, borderRadius: 999, backgroundColor: "#e2e8f0", overflow: "hidden" }}>
          <div style={{ width: `${score}%`, height: "100%", borderRadius: 999, backgroundColor: color }} />
        </div>
      </div>
      <div style={{
        fontSize: 12, fontWeight: 600, color,
        backgroundColor: `${color}18`,
        border: `1px solid ${color}30`,
        borderRadius: 8, padding: "4px 12px", flexShrink: 0,
      }}>
        {label}
      </div>
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const S = 16; // default icon size

function IconDashboard({ size = S, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconFlag({ size = S, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

function IconXCircle({ size = S, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function IconCheckCircle({ size = S, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function IconList({ size = S, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="3.5" cy="6" r="1" fill={color} stroke="none" />
      <circle cx="3.5" cy="12" r="1" fill={color} stroke="none" />
      <circle cx="3.5" cy="18" r="1" fill={color} stroke="none" />
    </svg>
  );
}

function IconSettings({ size = S, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconBell({ size = S, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconChat({ size = S, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconLogOut({ size = S, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IconAlert({ size = S, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconCheckBig({ size = 32, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── Bree Logo ─────────────────────────────────────────────────────────────────
// TODO: Replace svg below with the actual Bree logo asset

function BreeLogo() {
  return (
    <img src="/bree-logo.png" alt="Bree" style={{ height: 28, objectFit: "contain" }} />
  );
}

// ─── Nav Item ─────────────────────────────────────────────────────────────────

function NavItem({
  icon, label, active, badge, onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        width: "100%", padding: "9px 12px", borderRadius: 8,
        border: "none", cursor: "pointer", textAlign: "left" as const,
        backgroundColor: active ? "#eff6ff" : "transparent",
        color: active ? "#2563eb" : "#374151",
        fontSize: 14, fontWeight: active ? 600 : 400,
        transition: "background 0.15s",
      }}
    >
      <span style={{ width: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span style={{
          fontSize: 11, fontWeight: 700,
          backgroundColor: "#fef3c7", color: "#d97706",
          borderRadius: 20, padding: "1px 7px", minWidth: 20, textAlign: "center" as const,
        }}>
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── Status chip ──────────────────────────────────────────────────────────────

function StatusChip({ decision, adminDecision }: { decision: SystemDecision; adminDecision?: "approved" | "denied" }) {
  if (adminDecision) {
    return adminDecision === "approved"
      ? <span style={{ fontSize: 11, fontWeight: 600, color: "#16a34a", backgroundColor: "#dcfce7", borderRadius: 20, padding: "2px 10px" }}>Approved</span>
      : <span style={{ fontSize: 11, fontWeight: 600, color: "#dc2626", backgroundColor: "#fee2e2", borderRadius: 20, padding: "2px 10px" }}>Denied</span>;
  }
  if (decision === "approved")        return <span style={{ fontSize: 11, fontWeight: 600, color: "#16a34a", backgroundColor: "#dcfce7", borderRadius: 20, padding: "2px 10px" }}>Approved</span>;
  if (decision === "denied")          return <span style={{ fontSize: 11, fontWeight: 600, color: "#dc2626", backgroundColor: "#fee2e2", borderRadius: 20, padding: "2px 10px" }}>Denied</span>;
  return                                     <span style={{ fontSize: 11, fontWeight: 600, color: "#d97706", backgroundColor: "#fef3c7", borderRadius: 20, padding: "2px 10px" }}>Flagged</span>;
}

// ─── Main App ─────────────────────────────────────────────────────────────────

type NavTab = "needs_review" | "denied" | "approved" | "all";

export const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavTab>("needs_review");
  const [selectedId, setSelectedId] = useState<string>(NEEDS_REVIEW[0]?.id ?? "");
  const [adminDecisions, setAdminDecisions] = useState<Record<string, "approved" | "denied">>({});

  const listItems: Application[] = (() => {
    if (activeNav === "needs_review") return NEEDS_REVIEW.filter(a => !adminDecisions[a.id]);
    if (activeNav === "denied")       return DENIED;
    if (activeNav === "approved")     return APPROVED;
    return APPLICATIONS;
  })();

  const selectedApp = APPLICATIONS.find(a => a.id === selectedId) ?? null;
  const adminDecision = selectedId ? adminDecisions[selectedId] : undefined;

  const pendingCount = NEEDS_REVIEW.filter(a => !adminDecisions[a.id]).length;

  function handleDecide(id: string, decision: "approved" | "denied") {
    setAdminDecisions(prev => ({ ...prev, [id]: decision }));
    if (activeNav === "needs_review") {
      const remaining = NEEDS_REVIEW.filter(a => a.id !== id && !adminDecisions[a.id]);
      if (remaining.length > 0) setSelectedId(remaining[0].id);
    }
  }

  function switchNav(tab: NavTab) {
    setActiveNav(tab);
    const items = tab === "needs_review" ? NEEDS_REVIEW.filter(a => !adminDecisions[a.id])
                : tab === "denied"       ? DENIED
                : tab === "approved"     ? APPROVED
                : APPLICATIONS;
    if (items.length > 0) setSelectedId(items[0].id);
  }

  return (
    <div style={{
      height: "100vh", display: "flex",
      backgroundColor: "#f5f4ef",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      color: "#0f172a",
      overflow: "hidden",
    }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 220, flexShrink: 0,
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        display: "flex", flexDirection: "column",
        padding: "24px 12px",
      }}>
        {/* Logo */}
        <div style={{ paddingLeft: 8, marginBottom: 32 }}>
          <BreeLogo />
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2, paddingLeft: 30 }}>Admin Dashboard</div>
        </div>

        {/* Primary nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          <NavItem
            icon={<IconDashboard />}
            label="Dashboard"
            active={false}
            onClick={() => {}}
          />
          <NavItem
            icon={<IconFlag />}
            label="Needs Review"
            active={activeNav === "needs_review"}
            badge={pendingCount}
            onClick={() => switchNav("needs_review")}
          />
          <NavItem
            icon={<IconXCircle />}
            label="Denied"
            active={activeNav === "denied"}
            onClick={() => switchNav("denied")}
          />
          <NavItem
            icon={<IconCheckCircle />}
            label="Accepted"
            active={activeNav === "approved"}
            onClick={() => switchNav("approved")}
          />
          <NavItem
            icon={<IconList />}
            label="All"
            active={activeNav === "all"}
            onClick={() => switchNav("all")}
          />
          <NavItem
            icon={<IconSettings />}
            label="Settings"
            active={false}
            onClick={() => {}}
          />

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Score legend */}
          <div style={{
            backgroundColor: "#f8fafc", borderRadius: 10, padding: "12px 14px",
            border: "1px solid #e2e8f0", marginBottom: 16,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 8 }}>
              Score thresholds
            </div>
            {[
              { label: "≥ 70 · Auto-approve", color: "#22c55e" },
              { label: "50–69 · Manual review", color: "#3b82f6" },
              { label: "< 50 · Auto-deny", color: "#ef4444" },
            ].map(({ label, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, fontSize: 11, color: "#64748b" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: color, flexShrink: 0 }} />
                {label}
              </div>
            ))}
          </div>

          {/* Bottom links */}
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 12, display: "flex", flexDirection: "column", gap: 2 }}>
            <NavItem icon={<IconBell />} label="Notifications" active={false} onClick={() => {}} />
            <NavItem icon={<IconChat />} label="Support" active={false} onClick={() => {}} />
            <button style={{
              display: "flex", alignItems: "center", gap: 10,
              width: "100%", padding: "9px 12px", borderRadius: 8,
              border: "none", cursor: "pointer", textAlign: "left" as const,
              backgroundColor: "transparent", color: "#94a3b8",
              fontSize: 14, transition: "background 0.15s",
            }}>
              <span style={{ width: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconLogOut color="#94a3b8" />
              </span>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Application List ── */}
      <div style={{
        width: 300, flexShrink: 0,
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* List header */}
        <div style={{
          padding: "20px 18px 14px",
          borderBottom: "1px solid #f1f5f9",
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>
            {activeNav === "needs_review" ? "Needs Review"
           : activeNav === "denied"       ? "Denied"
           : activeNav === "approved"     ? "Accepted"
           : "All Applications"}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>
            {listItems.length} {activeNav === "needs_review" ? "pending" : "application"}{listItems.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* List items */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {listItems.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8", fontSize: 14 }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <IconCheckBig color="#94a3b8" />
              </div>
              Queue is clear
            </div>
          )}

          {listItems.map(app => {
            const active = selectedId === app.id;
            const isAppeal = !!app.appeal;
            // Appeals use blue score circle; fresh flags use the score-based color
            const sc = isAppeal ? "#3b82f6" : scoreColor(app.score);
            const adminD = adminDecisions[app.id];
            return (
              <div
                key={app.id}
                onClick={() => setSelectedId(app.id)}
                style={{
                  padding: "14px 18px", cursor: "pointer",
                  borderBottom: "1px solid #f8fafc",
                  backgroundColor: active ? "#eff6ff" : "transparent",
                  borderLeft: `3px solid ${active ? "#3b82f6" : "transparent"}`,
                  transition: "background 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{app.applicant}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>
                      {app.id} · ${isAppeal && app.appeal?.adjustedAmount
                        ? app.appeal.adjustedAmount.toLocaleString()
                        : app.loanAmount.toLocaleString()}
                    </div>
                  </div>
                  {/* Score badge — blue for appeals, score-color for fresh flags */}
                  <div style={{
                    fontSize: 14, fontWeight: 800, color: sc,
                    backgroundColor: `${sc}18`,
                    border: `1px solid ${sc}30`,
                    borderRadius: 8, padding: "2px 9px", flexShrink: 0,
                  }}>
                    {app.score}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {isAppeal ? (
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#2563eb", backgroundColor: "#dbeafe", borderRadius: 20, padding: "2px 10px" }}>
                      Appeal
                    </span>
                  ) : (
                    <StatusChip decision={app.decision} adminDecision={adminD} />
                  )}
                  {isAppeal && app.appeal && (
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>
                      Denied {app.appeal.deniedAt}
                    </span>
                  )}
                  {!isAppeal && app.extractionError && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#ea580c", backgroundColor: "#fff7ed", borderRadius: 20, padding: "2px 8px" }}>
                      No docs
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: "#cbd5e1", marginLeft: "auto" }}>
                    {app.employmentStatus === "employed" ? "Employed" : "Self-emp."}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Detail Panel ── */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {!selectedApp ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 15 }}>
            Select an application to review
          </div>
        ) : (
          <>
            {/* Sticky top bar */}
            <div style={{
              position: "sticky", top: 0, zIndex: 10,
              backgroundColor: "#ffffff",
              borderBottom: "1px solid #e2e8f0",
              padding: "16px 28px",
              display: "flex", alignItems: "center", gap: 16,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 3 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>{selectedApp.applicant}</span>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{selectedApp.id}</span>
                  {selectedApp.appeal
                    ? <span style={{ fontSize: 11, fontWeight: 600, color: "#2563eb", backgroundColor: "#dbeafe", borderRadius: 20, padding: "2px 10px" }}>Appeal</span>
                    : <StatusChip decision={selectedApp.decision} adminDecision={adminDecision} />}
                </div>
                <div style={{ fontSize: 13, color: "#64748b" }}>
                  {selectedApp.appeal?.adjustedAmount ? (
                    <>
                      <span style={{ color: "#6b7280", textDecoration: "line-through", marginRight: 4 }}>${selectedApp.loanAmount.toLocaleString()}</span>
                      <strong style={{ color: "#2563eb" }}>${selectedApp.appeal.adjustedAmount.toLocaleString()}</strong> requested ·{" "}
                    </>
                  ) : (
                    <><strong style={{ color: "#374151" }}>${selectedApp.loanAmount.toLocaleString()}</strong> requested · </>
                  )}
                  <strong style={{ color: "#374151" }}>${selectedApp.monthlyIncome.toLocaleString()}</strong>/mo income ·{" "}
                  {selectedApp.employmentStatus}
                </div>
              </div>

              {/* Approve / Deny buttons */}
              {adminDecision ? (
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  fontSize: 14, fontWeight: 700,
                  color: adminDecision === "approved" ? "#16a34a" : "#dc2626",
                  backgroundColor: adminDecision === "approved" ? "#dcfce7" : "#fee2e2",
                  border: `1px solid ${adminDecision === "approved" ? "#86efac" : "#fca5a5"}`,
                  borderRadius: 10, padding: "10px 20px",
                }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {adminDecision === "approved"
                      ? <><IconCheckCircle size={15} color="#16a34a" /> Approved</>
                      : <><IconXCircle size={15} color="#dc2626" /> Denied</>}
                  </span>
                  <button
                    onClick={() => setAdminDecisions(p => { const n = { ...p }; delete n[selectedApp.id]; return n; })}
                    style={{
                      marginLeft: 4, background: "none", border: "none",
                      color: "#94a3b8", cursor: "pointer", fontSize: 12, fontWeight: 400,
                    }}
                  >
                    Undo
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => handleDecide(selectedApp.id, "denied")}
                    style={{
                      padding: "10px 22px", borderRadius: 10,
                      border: "1.5px solid #fca5a5",
                      backgroundColor: "#fff",
                      color: "#dc2626",
                      fontWeight: 600, fontSize: 14, cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseOver={e => (e.currentTarget.style.backgroundColor = "#fee2e2")}
                    onMouseOut={e => (e.currentTarget.style.backgroundColor = "#fff")}
                  >
                    Deny
                  </button>
                  <button
                    onClick={() => handleDecide(selectedApp.id, "approved")}
                    style={{
                      padding: "10px 22px", borderRadius: 10,
                      border: "none",
                      backgroundColor: "#3b82f6",
                      color: "#ffffff",
                      fontWeight: 600, fontSize: 14, cursor: "pointer",
                      transition: "background 0.15s",
                      boxShadow: "0 2px 8px rgba(59,130,246,0.35)",
                    }}
                    onMouseOver={e => (e.currentTarget.style.backgroundColor = "#2563eb")}
                    onMouseOut={e => (e.currentTarget.style.backgroundColor = "#3b82f6")}
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>

            {/* Detail body */}
            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

              {/* ── Prior Decision (appeals only) ── */}
              {selectedApp.appeal && (
                <div style={{
                  backgroundColor: "#fff",
                  borderRadius: 16, border: "1px solid #e2e8f0",
                  padding: "20px 22px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 16 }}>
                    Prior Decision
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px 20px", marginBottom: 14 }}>
                    {[
                      { label: "Denied By",      value: selectedApp.appeal.deniedBy },
                      { label: "Denied On",      value: selectedApp.appeal.deniedAt },
                      { label: "Original Score", value: String(selectedApp.score) },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 4 }}>{label}</div>
                        <div style={{ fontSize: 14, color: "#0f172a", fontWeight: 500 }}>{value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 4 }}>Denial Reason</div>
                    <div style={{ fontSize: 13, color: "#7f1d1d" }}>{selectedApp.appeal.denialReason}</div>
                  </div>
                </div>
              )}

              {/* ── What's New (appeals only) ── */}
              {selectedApp.appeal && (
                <div style={{
                  backgroundColor: "#fff",
                  borderRadius: 16, border: "1px solid #bfdbfe",
                  padding: "20px 22px",
                  boxShadow: "0 1px 4px rgba(59,130,246,0.08)",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 16 }}>
                    What's New
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
                    {selectedApp.appeal.adjustedAmount && (
                      <div>
                        <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 4 }}>Adjusted Amount</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 14, color: "#6b7280", textDecoration: "line-through" }}>${selectedApp.loanAmount.toLocaleString()}</span>
                          <span style={{ fontSize: 14, color: "#94a3b8" }}>→</span>
                          <span style={{ fontSize: 16, fontWeight: 700, color: "#2563eb" }}>${selectedApp.appeal.adjustedAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                    {selectedApp.appeal.newDocuments && selectedApp.appeal.newDocuments.length > 0 && (
                      <div>
                        <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 8 }}>Re-uploaded Documents</div>
                        <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
                          {selectedApp.appeal.newDocuments.map(doc => (
                            <div key={doc} style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#eff6ff", borderRadius: 8, padding: "8px 12px" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                              <span style={{ fontSize: 13, color: "#1d4ed8", fontWeight: 500 }}>{cleanDoc(doc)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedApp.appeal.contextText && (
                      <div>
                        <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 6 }}>Applicant's Note</div>
                        <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.55, backgroundColor: "#f8fafc", borderRadius: 8, padding: "10px 14px", borderLeft: "3px solid #3b82f6" }}>
                          "{selectedApp.appeal.contextText}"
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Application facts card */}
              <div style={{
                backgroundColor: "#ffffff",
                borderRadius: 16, border: "1px solid #e2e8f0",
                padding: "20px 22px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 16 }}>
                  Application Details
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px 20px" }}>
                  {[
                    { label: "Email",         value: selectedApp.email },
                    { label: "Employment",    value: selectedApp.employmentStatus },
                    { label: "Monthly Income",value: `$${selectedApp.monthlyIncome.toLocaleString()}` },
                    { label: "Loan Amount",   value: `$${selectedApp.loanAmount.toLocaleString()}` },
                    { label: "Income Ratio",  value: `${(selectedApp.monthlyIncome / selectedApp.loanAmount).toFixed(1)}x monthly income` },
                    { label: "Documents",
                      value: selectedApp.documents.length === 0
                        ? "None submitted"
                        : selectedApp.documents.map(cleanDoc).join(", ") },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 14, color: "#0f172a", fontWeight: 500 }}>{value}</div>
                    </div>
                  ))}
                </div>
                {selectedApp.extractionError && (
                  <div style={{
                    marginTop: 14,
                    backgroundColor: "#fff7ed", border: "1px solid #fed7aa",
                    borderRadius: 10, padding: "10px 14px",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <IconAlert color="#ea580c" />
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#ea580c" }}>Extraction error: </span>
                      <span style={{ fontSize: 13, color: "#9a3412" }}>{selectedApp.extractionError.replaceAll("_", " ")}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Score breakdown card */}
              <div style={{
                backgroundColor: "#ffffff",
                borderRadius: 16, border: "1px solid #e2e8f0",
                padding: "20px 22px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 16 }}>
                  Score Breakdown
                </div>
                <OverallScoreBadge score={selectedApp.score} />
                <BreakdownTable breakdown={selectedApp.breakdown} />
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};
