import React from "react";
import {
  Image,
  SafeAreaView,
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

const DEMO_PILLS: { key: DemoUserKey; name: string; sub: string }[] = [
  { key: "jane", name: "Jane Doe", sub: "$1,500 · Auto-approved" },
  { key: "bob", name: "Bob Smith", sub: "$2,000 · Auto-denied" },
  { key: "bob_flagged", name: "Bob Smith", sub: "$300 · Flagged" },
];

export default function LandingScreen({
  selectedUser,
  onSelectUser,
  onSignUp,
  onLogin,
}: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#cce3f5" }}>
      {/* Hero */}
      <View
        style={{
          backgroundColor: "#cce3f5",
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 28,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#3b82f6",
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          Welcome to Bree
        </Text>
        <Text
          style={{
            fontSize: 40,
            color: "#0f172a",
            fontWeight: "800",
            lineHeight: 48,
            marginBottom: 16,
          }}
        >
          Wait less.{"\n"}Live more.
        </Text>
        <Text style={{ fontSize: 16, color: "#374151", lineHeight: 24 }}>
          Join thousands of Canadians tapping into instant credit — no
          interest, no late fees, no hidden costs.
        </Text>
      </View>

      {/* Birds */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#cce3f5",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/welcome-birds.png")}
          resizeMode="contain"
          style={{ width: "80%", height: 200 }}
        />
      </View>

      {/* Demo scenario selector */}
      <View
        style={{
          backgroundColor: "#cce3f5",
          paddingHorizontal: 24,
          paddingBottom: 8,
        }}
      >
        <Text
          style={{
            fontSize: 11,
            color: "#64748b",
            fontWeight: "600",
            letterSpacing: 0.8,
            textTransform: "uppercase",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Demo scenario
        </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {DEMO_PILLS.map((pill) => {
            const active = selectedUser === pill.key;
            return (
              <TouchableOpacity
                key={pill.key}
                onPress={() => onSelectUser(pill.key)}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 8,
                  backgroundColor: active ? "#3b82f6" : "#fff",
                  borderWidth: 1.5,
                  borderColor: active ? "#3b82f6" : "#cbd5e1",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: active ? "#fff" : "#374151",
                    textAlign: "center",
                  }}
                >
                  {pill.name}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: active ? "#bfdbfe" : "#94a3b8",
                    marginTop: 2,
                    textAlign: "center",
                  }}
                >
                  {pill.sub}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* CTA */}
      <View
        style={{
          backgroundColor: "#cce3f5",
          paddingHorizontal: 24,
          paddingBottom: 32,
          paddingTop: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 15, color: "#111827", fontWeight: "600" }}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={onLogin}>
            <Text style={{ fontSize: 15, color: "#3b82f6", fontWeight: "600" }}>
              Log in
            </Text>
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
          <Text style={{ color: "#ffffff", fontSize: 17, fontWeight: "600" }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
