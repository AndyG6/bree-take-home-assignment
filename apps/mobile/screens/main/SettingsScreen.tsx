import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DemoUser, DemoUserKey } from "../../data/testData";

interface Props {
  user: DemoUser;
  selectedUserKey: DemoUserKey;
  onSwitchUser: (key: DemoUserKey) => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const DEMO_OPTIONS: { key: DemoUserKey; label: string; sub: string }[] = [
  { key: "jane", label: "Jane Doe", sub: "$1,500 · Approved" },
  { key: "bob", label: "Bob Smith", sub: "$2,000 · Denied" },
  { key: "bob_flagged", label: "Bob Smith", sub: "$300 · Flagged" },
];

const GRID_ITEMS = [
  { icon: "👤", label: "Personal info" },
  { icon: "🏦", label: "Bank account" },
  { icon: "💳", label: "Debit card" },
  { icon: "💬", label: "Support" },
];

export default function SettingsScreen({ user, selectedUserKey, onSwitchUser }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Blue header */}
      <View
        style={{
          backgroundColor: "#3b82f6",
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 32,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: "#1d4ed8",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 26, fontWeight: "700", color: "#fff" }}>
            {getInitials(user.name)}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fbbf24",
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 3,
            marginBottom: 8,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "700", color: "#78350f" }}>Silver</Text>
        </View>

        <Text style={{ fontSize: 20, fontWeight: "700", color: "#fff" }}>{user.name}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Referral card */}
        <View
          style={{
            backgroundColor: "#eff6ff",
            borderRadius: 16,
            padding: 18,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: "#bfdbfe",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, marginRight: 12 }}>🎁</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#1d4ed8" }}>
              Get a $20 boost
            </Text>
            <Text style={{ fontSize: 13, color: "#3b82f6" }}>Refer a friend to earn rewards</Text>
          </View>
        </View>

        {/* 2×2 grid */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          {GRID_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.7}
              style={{
                width: "47%",
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 18,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</Text>
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#374151", textAlign: "center" }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Membership row */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 18,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginRight: 12 }}>⭐</Text>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "#0f172a" }}>Membership</Text>
          </View>
          <Text style={{ color: "#94a3b8", fontSize: 16 }}>›</Text>
        </TouchableOpacity>

        {/* Face ID row */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 18,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginRight: 12 }}>🔒</Text>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "#0f172a" }}>Face ID</Text>
          </View>
          <Text style={{ color: "#94a3b8", fontSize: 16 }}>›</Text>
        </TouchableOpacity>

        {/* Demo User section */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 18,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: "700",
              color: "#64748b",
              letterSpacing: 0.8,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Demo User
          </Text>
          <View style={{ gap: 8 }}>
            {DEMO_OPTIONS.map((opt) => {
              const active = opt.key === selectedUserKey;
              return (
                <TouchableOpacity
                  key={opt.key}
                  activeOpacity={0.7}
                  onPress={() => onSwitchUser(opt.key)}
                  style={{
                    borderRadius: 12,
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    backgroundColor: active ? "#eff6ff" : "#f8fafc",
                    borderWidth: 1.5,
                    borderColor: active ? "#3b82f6" : "#e2e8f0",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 14, fontWeight: "700", color: active ? "#1d4ed8" : "#0f172a" }}>
                      {opt.label}
                    </Text>
                    <Text style={{ fontSize: 12, color: active ? "#3b82f6" : "#64748b", marginTop: 2 }}>
                      {opt.sub}
                    </Text>
                  </View>
                  {active && (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: "#3b82f6",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
