import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DemoUser } from "../data/testData";

interface Props {
  user: DemoUser;
  onStartOver: () => void;
}

function ApprovedScreen({ user, onStartOver }: Props) {
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
          style={{
            backgroundColor: "#22c55e",
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: "center",
            width: "100%",
            marginBottom: 16,
            shadowColor: "#22c55e",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600" }}>
            View my account
          </Text>
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

function DeniedScreen({ user, onStartOver }: Props) {
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
        {/* Icon */}
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

        <Text
          style={{
            fontSize: 26,
            fontWeight: "800",
            color: "#0f172a",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Thank you for applying, {user.firstName}
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
          After reviewing your application, we're unable to offer you a credit
          line at this time.
        </Text>

        {/* Info card */}
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
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: 10,
            }}
          >
            What this means
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#475569",
              lineHeight: 22,
            }}
          >
            This decision is based on the information and documents you
            provided. It doesn't affect your credit score, and you're welcome
            to reapply in 30 days.
          </Text>
        </View>

        {/* Next steps */}
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
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: 14,
            }}
          >
            What you can do next
          </Text>
          {[
            {
              icon: "📋",
              title: "Check your documents",
              body: "Make sure your pay stub and bank statement are current and legible.",
            },
            {
              icon: "📅",
              title: "Reapply in 30 days",
              body: "Your financial picture may look different next month.",
            },
            {
              icon: "💬",
              title: "Contact support",
              body: "Our team is happy to help you understand your options.",
            },
          ].map(({ icon, title, body }) => (
            <View
              key={title}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 12, marginTop: 1 }}>
                {icon}
              </Text>
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
                <Text style={{ fontSize: 13, color: "#64748b", lineHeight: 18 }}>
                  {body}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            backgroundColor: "#3b82f6",
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: "center",
            width: "100%",
            marginBottom: 16,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600" }}>
            Contact Support
          </Text>
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

export default function ResultScreen({ user, onStartOver }: Props) {
  if (user.decision === "approved") {
    return <ApprovedScreen user={user} onStartOver={onStartOver} />;
  }
  return <DeniedScreen user={user} onStartOver={onStartOver} />;
}
