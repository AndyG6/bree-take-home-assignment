import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const STEPS = [
  { label: "Application\nReceived", icon: "✓", state: "done" as const },
  { label: "Under\nReview", icon: "●", state: "active" as const },
  { label: "Decision\nReady", icon: "○", state: "upcoming" as const },
];

function HorizontalTracker() {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 8 }}>
      {STEPS.map((step, i) => {
        const isDone = step.state === "done";
        const isActive = step.state === "active";
        const isUpcoming = step.state === "upcoming";
        const iconBg = isDone ? "#22c55e" : isActive ? "#3b82f6" : "#e2e8f0";
        const iconColor = isUpcoming ? "#94a3b8" : "#fff";
        const labelColor = isActive ? "#0f172a" : isDone ? "#22c55e" : "#94a3b8";

        return (
          <React.Fragment key={step.label}>
            <View style={{ alignItems: "center", flex: 1 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: iconBg,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "700", color: iconColor }}>
                  {step.icon}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: isActive ? "700" : "500",
                  color: labelColor,
                  textAlign: "center",
                  lineHeight: 15,
                }}
              >
                {step.label}
              </Text>
            </View>
            {i < STEPS.length - 1 && (
              <View
                style={{
                  flex: 0.6,
                  height: 2,
                  backgroundColor: i === 0 ? "#22c55e" : "#e2e8f0",
                  marginTop: 19,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const WHAT_WE_LOOK_AT = [
  { icon: "📊", title: "Income consistency", body: "Regular deposits and predictable income patterns help us assess repayment capacity." },
  { icon: "🏦", title: "Account balance patterns", body: "We look at typical balances and spending behaviour over recent months." },
  { icon: "💼", title: "Employment verification", body: "Confirming your employment status helps us understand the stability of your income." },
];

const WHAT_YOU_CAN_DO = [
  {
    icon: "📎",
    title: "Upload updated documents",
    body: "If you think your uploaded documents don't reflect your current situation — for example, a more recent pay stub or bank statement — you can upload updated ones and we'll include them in the review.",
  },
  {
    icon: "⏳",
    title: "Wait for the decision",
    body: "Most manual reviews complete within 1–2 business days. You don't need to do anything unless you want to add documents.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
        paddingVertical: 14,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setOpen((v) => !v)}
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#0f172a", flex: 1, marginRight: 8 }}>
          {question}
        </Text>
        <Text style={{ fontSize: 18, color: "#64748b" }}>{open ? "−" : "+"}</Text>
      </TouchableOpacity>
      {open && (
        <Text style={{ fontSize: 14, color: "#64748b", lineHeight: 22, marginTop: 10 }}>
          {answer}
        </Text>
      )}
    </View>
  );
}

export default function ReviewDetailsScreen({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#f1f5f9",
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "700", color: "#0f172a" }}>
            Application Under Review
          </Text>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={{ fontSize: 20, color: "#64748b" }}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 48 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Status tracker */}
          <View
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: "700", color: "#64748b", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 20 }}>
              Review Progress
            </Text>
            <HorizontalTracker />
            <Text style={{ fontSize: 13, color: "#64748b", marginTop: 16, textAlign: "center", lineHeight: 18 }}>
              Most reviews complete within{" "}
              <Text style={{ fontWeight: "600", color: "#0f172a" }}>1–2 business days</Text>
            </Text>
          </View>

          {/* What we look at */}
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#0f172a", marginBottom: 12 }}>
            What we look at
          </Text>
          <Text style={{ fontSize: 14, color: "#64748b", lineHeight: 22, marginBottom: 16 }}>
            Our review considers a few general factors. We don't share individual scores, but here's what the process involves.
          </Text>
          <View style={{ gap: 12, marginBottom: 28 }}>
            {WHAT_WE_LOOK_AT.map((item) => (
              <View
                key={item.title}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#f8fafc",
                  borderRadius: 14,
                  padding: 16,
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ fontSize: 20, marginRight: 12, marginTop: 1 }}>{item.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: "#0f172a", marginBottom: 4 }}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 13, color: "#64748b", lineHeight: 19 }}>{item.body}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* What you can do */}
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#0f172a", marginBottom: 12 }}>
            What you can do
          </Text>
          <View style={{ gap: 12, marginBottom: 28 }}>
            {WHAT_YOU_CAN_DO.map((item) => (
              <View
                key={item.title}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#f8fafc",
                  borderRadius: 14,
                  padding: 16,
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ fontSize: 20, marginRight: 12, marginTop: 1 }}>{item.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: "#0f172a", marginBottom: 4 }}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 13, color: "#64748b", lineHeight: 19 }}>{item.body}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Upload button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={{
              backgroundColor: "#0f172a",
              borderRadius: 14,
              paddingVertical: 16,
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>↑ Upload updated documents</Text>
          </TouchableOpacity>

          {/* FAQ */}
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#0f172a", marginBottom: 4 }}>
            Common questions
          </Text>
          <FAQItem
            question="How long does the review take?"
            answer="Most manual reviews are completed within 1–2 business days. If your application has been in review longer than that, please contact our support team."
          />
          <FAQItem
            question="What happens if I'm denied after review?"
            answer="If your application isn't approved after manual review, you'll receive a notification with the outcome. You can appeal the decision if you believe key information wasn't properly considered — there's no penalty for appealing, and it won't affect your credit score."
          />
          <FAQItem
            question="Will uploading new documents help?"
            answer="If your original documents were outdated or unclear, uploading newer ones can help the reviewer make a more informed decision. It won't restart the review — your application stays in the same queue."
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
