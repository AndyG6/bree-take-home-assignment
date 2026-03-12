import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DemoUser } from "../data/testData";

interface Props {
  user: DemoUser;
  onNext: () => void;
  onBack: () => void;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: "#64748b",
          letterSpacing: 0.5,
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          backgroundColor: "#f8fafc",
          borderWidth: 1.5,
          borderColor: "#e2e8f0",
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 14,
        }}
      >
        <Text style={{ fontSize: 16, color: "#0f172a", fontWeight: "500" }}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const EMPLOYMENT_LABELS: Record<string, string> = {
  employed: "Employed",
  "self-employed": "Self-Employed",
  unemployed: "Unemployed",
};

export default function PersonalInfoScreen({ user, onNext, onBack }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#e2e8f0",
          backgroundColor: "#fff",
        }}
      >
        <TouchableOpacity onPress={onBack} style={{ padding: 8, marginRight: 4 }}>
          <Text style={{ fontSize: 18, color: "#3b82f6" }}>←</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: "700", color: "#0f172a" }}>
          Your Information
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Step indicator */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          {["Info", "Documents", "Review"].map((step, i) => (
            <React.Fragment key={step}>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: i === 0 ? "#3b82f6" : "#e2e8f0",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                      color: i === 0 ? "#fff" : "#94a3b8",
                    }}
                  >
                    {i + 1}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    color: i === 0 ? "#3b82f6" : "#94a3b8",
                    marginTop: 4,
                    fontWeight: i === 0 ? "600" : "400",
                  }}
                >
                  {step}
                </Text>
              </View>
              {i < 2 && (
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: "#e2e8f0",
                    marginBottom: 16,
                    marginHorizontal: 6,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: 6,
          }}
        >
          Tell us about yourself
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#64748b",
            marginBottom: 28,
            lineHeight: 20,
          }}
        >
          We'll use this to verify your identity and assess your application.
        </Text>

        <Field label="Full Name" value={user.name} />
        <Field label="Email Address" value={user.email} />
        <Field
          label="Loan Amount Requested"
          value={`$${user.loanAmount.toLocaleString()}`}
        />
        <Field
          label="Monthly Income (Stated)"
          value={`$${user.monthlyIncome.toLocaleString()} / month`}
        />
        <Field
          label="Employment Status"
          value={EMPLOYMENT_LABELS[user.employmentStatus]}
        />

        <View
          style={{
            backgroundColor: "#eff6ff",
            borderRadius: 12,
            padding: 14,
            marginTop: 8,
            marginBottom: 8,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16, marginRight: 8 }}>🔒</Text>
          <Text style={{ fontSize: 13, color: "#3b82f6", flex: 1, lineHeight: 18 }}>
            Your information is encrypted and never shared with third parties.
          </Text>
        </View>
      </ScrollView>

      {/* CTA */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingBottom: 32,
          paddingTop: 12,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onNext}
          style={{
            backgroundColor: "#3b82f6",
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600" }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
