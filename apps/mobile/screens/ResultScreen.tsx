import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DemoUser } from "../data/testData";
import AppealScreen from "./main/AppealScreen";

interface Props {
  user: DemoUser;
  onStartOver: () => void;
  onEnterApp?: () => void;
}

function ApprovedScreen({ user, onStartOver, onEnterApp }: Props) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0fdf4" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Success icon */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#22c55e",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
            shadowColor: "#22c55e",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 48 }}>✓</Text>
        </Animated.View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
            color: "#14532d",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          You're approved, {user.firstName}!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#166534",
            textAlign: "center",
            marginBottom: 32,
            lineHeight: 24,
          }}
        >
          Your application was reviewed and accepted instantly.
        </Text>

        {/* Loan card */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 24,
            width: "100%",
            marginBottom: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: "#64748b",
              letterSpacing: 0.5,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Credit Line Approved
          </Text>
          <Text
            style={{
              fontSize: 44,
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: 4,
            }}
          >
            ${user.loanAmount.toLocaleString()}
          </Text>
          <Text style={{ fontSize: 14, color: "#64748b" }}>
            No interest · No late fees · No hidden costs
          </Text>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#f1f5f9",
              marginTop: 20,
              paddingTop: 20,
              gap: 12,
            }}
          >
            {[
              ["Funds available", "Instantly"],
              ["Repayment", "On your next payday"],
              ["Interest rate", "0%"],
            ].map(([label, value]) => (
              <View
                key={label}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 14, color: "#64748b" }}>{label}</Text>
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#0f172a" }}>
                  {value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Next steps */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
            width: "100%",
            marginBottom: 32,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: 14,
            }}
          >
            What happens next
          </Text>
          {[
            ["1", "Funds sent to your account", "Within minutes"],
            ["2", "Repay on your payday", "No penalties, ever"],
            ["3", "Build your limit", "Use Bree to grow your credit"],
          ].map(([num, title, sub]) => (
            <View
              key={num}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 14,
              }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: "#dcfce7",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                  marginTop: 1,
                }}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "700", color: "#16a34a" }}
                >
                  {num}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#0f172a",
                    marginBottom: 2,
                  }}
                >
                  {title}
                </Text>
                <Text style={{ fontSize: 13, color: "#64748b" }}>{sub}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onEnterApp}
          style={{
            backgroundColor: "#22c55e",
            borderRadius: 16,
            paddingVertical: 18,
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginBottom: 16,
            shadowColor: "#22c55e",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600", marginRight: 8 }}>
            View my account
          </Text>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onStartOver}>
          <Text style={{ fontSize: 14, color: "#64748b" }}>
            ← Back to demo
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function FlaggedScreen({ user, onStartOver, onEnterApp }: Props) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fffbeb" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#fef3c7",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <Text style={{ fontSize: 44 }}>🔍</Text>
        </Animated.View>

        <Text
          style={{
            fontSize: 26,
            fontWeight: "800",
            color: "#0f172a",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Under Review, {user.firstName}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#475569",
            textAlign: "center",
            lineHeight: 24,
            marginBottom: 32,
          }}
        >
          Your application has been flagged for manual review. This usually takes about 10 minutes.
        </Text>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 22,
            width: "100%",
            marginBottom: 32,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700", color: "#0f172a", marginBottom: 10 }}>
            What happens next
          </Text>
          <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22 }}>
            Our team is reviewing your documents. You'll receive a decision shortly. You may upload additional documents to speed up the process.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onEnterApp}
          style={{
            backgroundColor: "#f59e0b",
            borderRadius: 16,
            paddingVertical: 18,
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginBottom: 16,
            shadowColor: "#f59e0b",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600", marginRight: 8 }}>
            View my account
          </Text>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onStartOver}>
          <Text style={{ fontSize: 14, color: "#64748b" }}>← Back to demo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function cleanDocName(raw: string): string {
  return raw.replace("_strong", "").replace("_weak", "").replace("_healthy", "").replace("_risky", "");
}

function DeniedScreen({ user, onStartOver }: Props) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState(false);
  const [appealAmount, setAppealAmount] = useState(String(user.loanAmount));
  const [contextText, setContextText] = useState("");

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#e2e8f0",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <Text style={{ fontSize: 44, color: "#475569" }}>✉️</Text>
        </Animated.View>

        <Text style={{ fontSize: 26, fontWeight: "800", color: "#0f172a", textAlign: "center", marginBottom: 12 }}>
          Thank you for applying, {user.firstName}
        </Text>
        <Text style={{ fontSize: 16, color: "#475569", textAlign: "center", lineHeight: 24, marginBottom: 32 }}>
          Based on the information and documents you provided, we're unable to
          offer you a credit line at this time.
        </Text>

        {/* What this means */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 22,
            width: "100%",
            marginBottom: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700", color: "#0f172a", marginBottom: 10 }}>
            What this means
          </Text>
          <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22 }}>
            This decision doesn't affect your credit score.
          </Text>
        </View>

        {/* Appeal card — inline expansion */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 22,
            width: "100%",
            marginBottom: 32,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700", color: "#0f172a", marginBottom: 8 }}>
            Think something was missed?
          </Text>
          <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 16 }}>
            If your documents have changed, or there's context the system couldn't capture, you can submit an appeal.{" "}
            <Text>
              Requesting a lower amount can also improve your chances. Many applicants are approved on a second look with an adjusted request.
            </Text>
            {" "}Most appeals are reviewed within 1–2 business days.
          </Text>

          {!expanded && (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setExpanded(true)}
              style={{ backgroundColor: "#0f172a", borderRadius: 14, paddingVertical: 16, alignItems: "center" }}
            >
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}>Appeal this decision</Text>
            </TouchableOpacity>
          )}

          {expanded && (
            <View>
              <View style={{ height: 1, backgroundColor: "#e2e8f0", marginBottom: 18 }} />

              {/* Amount adjuster */}
              <Text style={{ fontSize: 12, fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>
                Requested amount
              </Text>
              <Text style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10 }}>
                Original request: ${user.loanAmount.toLocaleString()}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1.5,
                  borderColor: "#3b82f6",
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#64748b", marginRight: 4 }}>$</Text>
                <TextInput
                  value={appealAmount}
                  onChangeText={setAppealAmount}
                  keyboardType="numeric"
                  style={{ flex: 1, fontSize: 18, fontWeight: "700", color: "#0f172a" }}
                />
              </View>

              {/* Documents */}
              <Text style={{ fontSize: 12, fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>
                Documents on file
              </Text>
              {user.documents.length === 0 ? (
                <Text style={{ fontSize: 13, color: "#94a3b8", marginBottom: 16 }}>No documents submitted</Text>
              ) : (
                <View style={{ gap: 8, marginBottom: 20 }}>
                  {user.documents.map((doc) => (
                    <View
                      key={doc}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#f8fafc",
                        borderRadius: 10,
                        padding: 12,
                        borderWidth: 1,
                        borderColor: "#e2e8f0",
                      }}
                    >
                      <Text style={{ fontSize: 16, marginRight: 10 }}>📄</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 13, fontWeight: "600", color: "#0f172a" }} numberOfLines={1}>
                          {cleanDocName(doc)}
                        </Text>
                        <Text style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>Uploaded Jan 15, 2026</Text>
                      </View>
                      <TouchableOpacity activeOpacity={0.7}>
                        <Text style={{ fontSize: 13, color: "#3b82f6", fontWeight: "600" }}>Replace</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              {/* Optional context */}
              <TextInput
                value={contextText}
                onChangeText={setContextText}
                placeholder="Anything else you'd like us to know? (optional)"
                placeholderTextColor="#94a3b8"
                multiline
                style={{
                  borderWidth: 1.5,
                  borderColor: contextText.length > 0 ? "#3b82f6" : "#e2e8f0",
                  borderRadius: 12,
                  padding: 12,
                  fontSize: 14,
                  color: "#0f172a",
                  lineHeight: 20,
                  minHeight: 72,
                  textAlignVertical: "top",
                  marginBottom: 16,
                }}
              />

              <TouchableOpacity
                activeOpacity={0.85}
                style={{ backgroundColor: "#0f172a", borderRadius: 14, paddingVertical: 16, alignItems: "center", marginBottom: 12 }}
              >
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}>Submit appeal</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => setExpanded(false)} style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 13, color: "#94a3b8" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity onPress={onStartOver}>
          <Text style={{ fontSize: 14, color: "#64748b" }}>← Back to demo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function DeniedAfterReviewScreen({ user, onStartOver, onEnterApp }: Props) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [showAppeal, setShowAppeal] = useState(false);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#e2e8f0",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <Text style={{ fontSize: 44 }}>📋</Text>
        </Animated.View>

        <Text
          style={{
            fontSize: 26,
            fontWeight: "800",
            color: "#0f172a",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Review complete, {user.firstName}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#475569",
            textAlign: "center",
            lineHeight: 24,
            marginBottom: 32,
          }}
        >
          Our team reviewed your application and we're unable to offer you a
          credit line at this time.
        </Text>

        {/* What this means */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 22,
            width: "100%",
            marginBottom: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700", color: "#0f172a", marginBottom: 10 }}>
            What this means
          </Text>
          <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22 }}>
            A member of our team personally reviewed your application and
            documents. This decision doesn't affect your credit score.
          </Text>
        </View>

        {/* Appeal card */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 22,
            width: "100%",
            marginBottom: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700", color: "#0f172a", marginBottom: 8 }}>
            Think something was missed?
          </Text>
          <Text style={{ fontSize: 14, color: "#475569", lineHeight: 22, marginBottom: 16 }}>
            If your situation has changed — updated documents, a different
            amount, or context our team didn't have — you can submit an appeal.
          </Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setShowAppeal(true)}
            style={{
              backgroundColor: "#0f172a",
              borderRadius: 14,
              paddingVertical: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}>
              Appeal this decision
            </Text>
          </TouchableOpacity>
        </View>

        {/* View account — available because they went through manual review */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onEnterApp}
          style={{
            backgroundColor: "#3b82f6",
            borderRadius: 16,
            paddingVertical: 18,
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginBottom: 16,
            shadowColor: "#3b82f6",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600", marginRight: 8 }}>
            View my account
          </Text>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onStartOver}>
          <Text style={{ fontSize: 14, color: "#64748b" }}>← Back to demo</Text>
        </TouchableOpacity>
      </ScrollView>

      <AppealScreen
        visible={showAppeal}
        user={user}
        onClose={() => setShowAppeal(false)}
      />
    </SafeAreaView>
  );
}

export default function ResultScreen({ user, onStartOver, onEnterApp }: Props) {
  if (user.decision === "approved") {
    return <ApprovedScreen user={user} onStartOver={onStartOver} onEnterApp={onEnterApp} />;
  }
  if (user.decision === "flagged_for_review") {
    return <FlaggedScreen user={user} onStartOver={onStartOver} onEnterApp={onEnterApp} />;
  }
  if (user.decision === "denied_after_review") {
    return <DeniedAfterReviewScreen user={user} onStartOver={onStartOver} onEnterApp={onEnterApp} />;
  }
  return <DeniedScreen user={user} onStartOver={onStartOver} />;
}
