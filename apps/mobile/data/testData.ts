export type Decision = "approved" | "denied" | "flagged_for_review" | "denied_after_review";
export type EmploymentStatus = "employed" | "self-employed" | "unemployed";
export type DemoUserKey = "jane" | "bob" | "bob_flagged" | "jane_flagged" | "carol" | "dave" | "bob_reviewed";

export interface DemoUser {
  id: string;
  name: string;
  firstName: string;
  email: string;
  loanAmount: number;
  monthlyIncome: number;
  employmentStatus: EmploymentStatus;
  documents: string[];
  score: number;
  decision: Decision;
  extractionError?: string;
}

export const DEMO_USERS: Record<DemoUserKey, DemoUser> = {
  jane: {
    id: "app-001",
    name: "Jane Doe",
    firstName: "Jane",
    email: "jane.doe@example.com",
    loanAmount: 1500,
    monthlyIncome: 5000,
    employmentStatus: "employed",
    documents: ["pay_stub_strong.pdf", "bank_statement_healthy.pdf"],
    score: 82,
    decision: "approved",
  },
  bob: {
    id: "app-002",
    name: "Bob Smith",
    firstName: "Bob",
    email: "bob.smith@example.com",
    loanAmount: 2000,
    monthlyIncome: 1400,
    employmentStatus: "self-employed",
    documents: ["pay_stub_weak.pdf", "bank_statement_risky.pdf"],
    score: 31,
    decision: "denied",
  },
  bob_flagged: {
    id: "app-003",
    name: "Bob Smith",
    firstName: "Bob",
    email: "bob.smith@example.com",
    loanAmount: 300,
    monthlyIncome: 1400,
    employmentStatus: "self-employed",
    documents: ["pay_stub_weak.pdf", "bank_statement_risky.pdf"],
    score: 58,
    decision: "flagged_for_review",
  },
  jane_flagged: {
    id: "app-004",
    name: "Jane Doe",
    firstName: "Jane",
    email: "jane.doe@example.com",
    loanAmount: 4500,
    monthlyIncome: 5000,
    employmentStatus: "employed",
    documents: ["pay_stub_strong.pdf", "bank_statement_healthy.pdf"],
    score: 68,
    decision: "flagged_for_review",
  },
  carol: {
    id: "app-005",
    name: "Carol Tester",
    firstName: "Carol",
    email: "carol.tester@example.com",
    loanAmount: 1000,
    monthlyIncome: 8000,
    employmentStatus: "employed",
    documents: [],
    score: 55,
    decision: "flagged_for_review",
    extractionError: "no_documents_provided",
  },
  dave: {
    id: "app-006",
    name: "Dave Liar",
    firstName: "Dave",
    email: "dave.liar@example.com",
    loanAmount: 2000,
    monthlyIncome: 10000,
    employmentStatus: "employed",
    documents: ["pay_stub_weak.pdf"],
    score: 28,
    decision: "denied",
  },
  bob_reviewed: {
    id: "app-003r",
    name: "Bob Smith",
    firstName: "Bob",
    email: "bob.smith@example.com",
    loanAmount: 300,
    monthlyIncome: 1400,
    employmentStatus: "self-employed",
    documents: ["pay_stub_weak.pdf", "bank_statement_risky.pdf"],
    score: 52,
    decision: "denied_after_review",
  },
};
