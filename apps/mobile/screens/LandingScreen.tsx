import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  selectedUser: "jane" | "bob";
  onSelectUser: (user: "jane" | "bob") => void;
  onSignUp: () => void;
  onLogin: () => void;
}

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
          style={{ width: "80%", height: 240 }}
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
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={() => onSelectUser("jane")}
            style={{
              flex: 1,
              borderRadius: 12,
              paddingVertical: 10,
              paddingHorizontal: 12,
              backgroundColor: selectedUser === "jane" ? "#3b82f6" : "#fff",
              borderWidth: 1.5,
              borderColor: selectedUser === "jane" ? "#3b82f6" : "#cbd5e1",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: selectedUser === "jane" ? "#fff" : "#374151",
              }}
            >
              Jane Doe
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: selectedUser === "jane" ? "#bfdbfe" : "#94a3b8",
                marginTop: 2,
              }}
            >
              $1,500 · Auto-approved
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSelectUser("bob")}
            style={{
              flex: 1,
              borderRadius: 12,
              paddingVertical: 10,
              paddingHorizontal: 12,
              backgroundColor: selectedUser === "bob" ? "#3b82f6" : "#fff",
              borderWidth: 1.5,
              borderColor: selectedUser === "bob" ? "#3b82f6" : "#cbd5e1",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: selectedUser === "bob" ? "#fff" : "#374151",
              }}
            >
              Bob Smith
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: selectedUser === "bob" ? "#bfdbfe" : "#94a3b8",
                marginTop: 2,
              }}
            >
              $2,000 · Auto-denied
            </Text>
          </TouchableOpacity>
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
