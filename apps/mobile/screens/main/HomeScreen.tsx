import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DemoUser } from "../../data/testData";
import ReviewDetailsScreen from "./ReviewDetailsScreen";
import AppealScreen from "./AppealScreen";

interface Props {
  user: DemoUser;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function CloudIllustration() {
  return (
    <Image
      source={require("../../assets/clouds.png")}
      resizeMode="contain"
      style={{ width: "100%", height: 180, marginBottom: -30, marginTop: -50 }}
    />
  );
}

const DIVIDER = (
  <View
    style={{
      height: 1,
      backgroundColor: "#e2e8f0",
      marginVertical: 14,
    }}
  />
);

function ApprovedCard({ user }: { user: DemoUser }) {
  return (
    <>
      {/* Green approval status card */}
      <View
        style={{
          backgroundColor: "#abf7b1",
          borderRadius: 20,
          padding: 22,
          borderWidth: 2,
          borderColor: "#22c55e",
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#166534", lineHeight: 24 }}>
          Your account has been approved successfully!
        </Text>
      </View>

      {/* Available Credit card */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 22,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
      {/* Header row */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Wallet icon placeholder */}
        <View
          style={{
            width: 38,
            height: 28,
            backgroundColor: "#1e3a5f",
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
          }}
        >
          <View
            style={{
              width: 20,
              height: 12,
              borderWidth: 2,
              borderColor: "#fff",
              borderRadius: 3,
            }}
          />
        </View>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#0f172a" }}>
          Available Credit
        </Text>
      </View>

      {DIVIDER}

      <Text style={{ fontSize: 48, fontWeight: "800", color: "#0f172a", marginBottom: 8 }}>
        ${user.loanAmount.toLocaleString()}.00
      </Text>
      <Text style={{ fontSize: 15, color: "#374151", lineHeight: 22, marginBottom: 24 }}>
        Withdraw from your credit line anytime — No interest, no late fees, and no hidden costs.
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          backgroundColor: "#3b82f6",
          borderRadius: 14,
          paddingVertical: 18,
          alignItems: "center",
          borderWidth: 2,
          borderColor: "#1d4ed8",
          shadowColor: "#1d4ed8",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>Withdraw Funds</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

function DeniedCard({ onAppeal }: { onAppeal: () => void }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 22,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      <Text style={{ fontSize: 13, fontWeight: "700", color: "#0f172a", letterSpacing: 0.3 }}>
        Application Status
      </Text>
      {DIVIDER}
      <Text style={{ fontSize: 15, fontWeight: "600", color: "#0f172a", lineHeight: 22, marginBottom: 8 }}>
        We weren't able to approve an advance at this time.
      </Text>
      <Text style={{ fontSize: 14, color: "#64748b", lineHeight: 22, marginBottom: 16 }}>
        Our review considers factors like income consistency, account balance patterns, and repayment capacity — these don't always align on the first try.
      </Text>
      <TouchableOpacity activeOpacity={0.7} onPress={onAppeal}>
        <Text style={{ fontSize: 14, color: "#3b82f6", fontWeight: "600" }}>Appeal Now</Text>
      </TouchableOpacity>
    </View>
  );
}

function DeniedAfterReviewCard({ onAppeal }: { onAppeal: () => void }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 22,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      <Text style={{ fontSize: 13, fontWeight: "700", color: "#0f172a", letterSpacing: 0.3 }}>
        Application Status
      </Text>
      {DIVIDER}
      <Text style={{ fontSize: 15, fontWeight: "600", color: "#0f172a", lineHeight: 22, marginBottom: 8 }}>
        Your application was reviewed and not approved.
      </Text>
      <Text style={{ fontSize: 14, color: "#64748b", lineHeight: 22, marginBottom: 16 }}>
        A member of our team personally reviewed your documents. If your situation has changed or you'd like to request a different amount, you can appeal.
      </Text>
      <TouchableOpacity activeOpacity={0.7} onPress={onAppeal}>
        <Text style={{ fontSize: 14, color: "#3b82f6", fontWeight: "600" }}>Appeal Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const TRACKER_STEPS = [
  { label: "Application Received", state: "done" as const },
  { label: "Under Review", state: "active" as const },
  { label: "Decision Ready", state: "upcoming" as const },
];

function VerticalTracker() {
  return (
    <View style={{ marginBottom: 12 }}>
      {TRACKER_STEPS.map((step, i) => {
        const isDone = step.state === "done";
        const isActive = step.state === "active";
        const isLast = i === TRACKER_STEPS.length - 1;
        const dotBg = isDone ? "#22c55e" : isActive ? "#3b82f6" : "#e2e8f0";
        const labelColor = isActive ? "#0f172a" : isDone ? "#22c55e" : "#94a3b8";
        const labelWeight = isActive ? "700" : "500";

        return (
          <View key={step.label} style={{ flexDirection: "row", alignItems: "flex-start" }}>
            {/* Dot + line column */}
            <View style={{ alignItems: "center", width: 20, marginRight: 12 }}>
              <View
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: dotBg,
                  marginTop: 3,
                }}
              />
              {!isLast && (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 22,
                    backgroundColor: isDone ? "#22c55e" : "#e2e8f0",
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                />
              )}
            </View>
            <Text
              style={{
                fontSize: 13,
                fontWeight: labelWeight,
                color: labelColor,
                paddingBottom: isLast ? 0 : 20,
                lineHeight: 20,
              }}
            >
              {step.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function FlaggedCard({ onSeeFullDetails }: { onSeeFullDetails: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 22,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      <Text style={{ fontSize: 13, fontWeight: "700", color: "#0f172a", letterSpacing: 0.3 }}>
        Application Status
      </Text>
      {DIVIDER}

      {/* Summary row — always visible */}
      <Text style={{ fontSize: 14, color: "#374151", lineHeight: 22, marginBottom: 10 }}>
        Your application is being reviewed by our team.{" "}
        <Text
          style={{ color: "#3b82f6", fontWeight: "600" }}
          onPress={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show less ▲" : "Learn More ▼"}
        </Text>
      </Text>

      {/* Inline expansion */}
      {expanded && (
        <View
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: 14,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 14, color: "#374151", lineHeight: 22, marginBottom: 18 }}>
            Some applications need a closer look from our team. This usually happens when we want to verify a few details before making a decision — it's not a rejection, just a thorough check.
          </Text>

          <VerticalTracker />

          <Text style={{ fontSize: 13, color: "#64748b", lineHeight: 19, marginBottom: 14 }}>
            Most reviews complete within{" "}
            <Text style={{ fontWeight: "600", color: "#0f172a" }}>1–2 business days</Text>.
          </Text>

          <TouchableOpacity activeOpacity={0.7} onPress={onSeeFullDetails}>
            <Text style={{ fontSize: 14, color: "#3b82f6", fontWeight: "600" }}>
              See full details →
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          backgroundColor: "#0f172a",
          borderRadius: 14,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>↑ Reupload documents</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen({ user }: Props) {
  const [showReviewDetails, setShowReviewDetails] = useState(false);
  const [showAppeal, setShowAppeal] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#cce3f5" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 32, fontWeight: "800", color: "#0f172a" }}>
          {getGreeting()},
        </Text>
        <Text style={{ fontSize: 32, fontWeight: "800", color: "#0f172a", marginBottom: 8 }}>
          {user.firstName}!
        </Text>

        <CloudIllustration />

        {user.decision === "approved" && <ApprovedCard user={user} />}
        {user.decision === "denied" && (
          <DeniedCard onAppeal={() => setShowAppeal(true)} />
        )}
        {user.decision === "denied_after_review" && (
          <DeniedAfterReviewCard onAppeal={() => setShowAppeal(true)} />
        )}
        {user.decision === "flagged_for_review" && (
          <FlaggedCard onSeeFullDetails={() => setShowReviewDetails(true)} />
        )}
      </ScrollView>

      <ReviewDetailsScreen
        visible={showReviewDetails}
        onClose={() => setShowReviewDetails(false)}
      />
      <AppealScreen
        visible={showAppeal}
        user={user}
        onClose={() => setShowAppeal(false)}
      />
    </SafeAreaView>
  );
}
