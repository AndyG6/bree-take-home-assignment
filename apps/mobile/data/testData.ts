export type Decision = "approved" | "denied" | "flagged_for_review";
export type EmploymentStatus = "employed" | "self-employed" | "unemployed";
export type DemoUserKey = "jane" | "bob" | "bob_flagged";

export interface DemoUser {
  id: string;
  name: string;
  firstName: string;
  email: string;
  loanAmount: number;
  monthlyIncome: number;
  employmentStatus: EmploymentStatus;
  documents: string[];
  decision: Decision;
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
    decision: "flagged_for_review",
  },
};
