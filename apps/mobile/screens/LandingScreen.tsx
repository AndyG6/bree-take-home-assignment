import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DemoUserKey } from "../data/testData";

interface Props {
  selectedUser: DemoUserKey;
  onSelectUser: (user: DemoUserKey) => void;
  onSignUp: () => void;
  onLogin: () => void;
}

type DecisionBadge = "approved" | "denied" | "flagged" | "reviewed";

const DEMO_SCENARIOS: {
  key: DemoUserKey;
  name: string;
  detail: string;
  badge: DecisionBadge;
}[] = [
  { key: "jane",         name: "Jane Doe",      detail: "$1,500 · Employed",              badge: "approved"  },
  { key: "bob",          name: "Bob Smith",      detail: "$2,000 · Self-employed",         badge: "denied"    },
  { key: "bob_flagged",  name: "Bob Smith",      detail: "$300 · Self-employed",           badge: "flagged"   },
  { key: "jane_flagged", name: "Jane Doe",       detail: "$4,500 · Employed",              badge: "flagged"   },
  { key: "carol",        name: "Carol Tester",   detail: "$1,000 · No documents",          badge: "flagged"   },
  { key: "dave",         name: "Dave Liar",      detail: "$2,000 · Income mismatch",       badge: "denied"    },
  { key: "bob_reviewed", name: "Bob Smith",      detail: "$300 · Denied after review",     badge: "reviewed"  },
];

const BADGE_STYLES: Record<DecisionBadge, { bg: string; text: string; label: string }> = {
  approved:  { bg: "#dcfce7", text: "#16a34a", label: "Approved"       },
  denied:    { bg: "#fee2e2", text: "#dc2626", label: "Denied"         },
  flagged:   { bg: "#fef3c7", text: "#d97706", label: "Flagged"        },
  reviewed:  { bg: "#f1f5f9", text: "#475569", label: "Denied (review)"},
};

export default function LandingScreen({
  selectedUser,
  onSelectUser,
  onSignUp,
  onLogin,
}: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#cce3f5" }}>
      {/* Hero */}
      <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 }}>
        <Text style={{ fontSize: 16, color: "#3b82f6", fontWeight: "600", marginBottom: 8 }}>
          Welcome to Bree
        </Text>
        <Text style={{ fontSize: 36, color: "#0f172a", fontWeight: "800", lineHeight: 44, marginBottom: 10 }}>
          Wait less.{"\n"}Live more.
        </Text>
        <Text style={{ fontSize: 15, color: "#374151", lineHeight: 22 }}>
          Join thousands of Canadians tapping into instant credit — no interest, no late fees, no hidden costs.
        </Text>
      </View>

      {/* Birds */}
      <View style={{ alignItems: "center", paddingVertical: 8 }}>
        <Image
          source={require("../assets/welcome-birds.png")}
          resizeMode="contain"
          style={{ width: "80%", height: 130 }}
        />
      </View>

      {/* Demo scenario selector */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 11,
            color: "#64748b",
            fontWeight: "600",
            letterSpacing: 0.8,
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Demo scenario
        </Text>
        <ScrollView
          horizontal={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 8, paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
        >
          {DEMO_SCENARIOS.map((scenario) => {
            const active = selectedUser === scenario.key;
            const badge = BADGE_STYLES[scenario.badge];
            return (
              <TouchableOpacity
                key={scenario.key}
                onPress={() => onSelectUser(scenario.key)}
                activeOpacity={0.75}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: active ? "#1d4ed8" : "#fff",
                  borderRadius: 14,
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  borderWidth: 1.5,
                  borderColor: active ? "#1d4ed8" : "#e2e8f0",
                }}
              >
                {/* Avatar */}
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: active ? "#3b82f6" : "#f1f5f9",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "700", color: active ? "#fff" : "#64748b" }}>
                    {scenario.name.split(" ").map((n) => n[0]).join("")}
                  </Text>
                </View>

                {/* Name + detail */}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: active ? "#fff" : "#0f172a" }}>
                    {scenario.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: active ? "#bfdbfe" : "#64748b", marginTop: 1 }}>
                    {scenario.detail}
                  </Text>
                </View>

                {/* Badge */}
                <View
                  style={{
                    backgroundColor: active ? "rgba(255,255,255,0.15)" : badge.bg,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: active ? "#fff" : badge.text,
                    }}
                  >
                    {badge.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* CTA */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 32, paddingTop: 12 }}>
        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 14 }}>
          <Text style={{ fontSize: 15, color: "#111827", fontWeight: "600" }}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={onLogin}>
            <Text style={{ fontSize: 15, color: "#3b82f6", fontWeight: "600" }}>Log in</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onSignUp}
          style={{
            backgroundColor: "#3b82f6",
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: "center",
            shadowColor: "#3b82f6",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 17, fontWeight: "600" }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
