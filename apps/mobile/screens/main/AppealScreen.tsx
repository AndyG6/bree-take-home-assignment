import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DemoUser } from "../../data/testData";

interface Props {
  visible: boolean;
  user: DemoUser;
  onClose: () => void;
}

// Format a raw filename into a display name: "pay_stub_weak.pdf" → "pay_stub.pdf"
// Strips the middle quality adjective for demo cleanliness
function formatDocName(raw: string): string {
  return raw
    .replace("_strong", "")
    .replace("_weak", "")
    .replace("_healthy", "")
    .replace("_risky", "");
}

function LockIcon() {
  return (
    <View
      style={{
        width: 16,
        height: 16,
        borderRadius: 3,
        borderWidth: 1.5,
        borderColor: "#94a3b8",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 6,
      }}
    >
      <View
        style={{
          width: 6,
          height: 5,
          backgroundColor: "#94a3b8",
          borderRadius: 1,
        }}
      />
    </View>
  );
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: "#0f172a",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "700", color: "#fff" }}>{number}</Text>
      </View>
      <Text style={{ fontSize: 15, fontWeight: "700", color: "#0f172a" }}>{title}</Text>
    </View>
  );
}

function buildAmountOptions(requested: number): number[] {
  const presets = [300, 500, 750, 1000, 1500, 2000, 2500, 3000];
  const filtered = presets.filter((n) => n <= requested);
  if (!filtered.includes(requested)) filtered.push(requested);
  return filtered;
}

export default function AppealScreen({ visible, user, onClose }: Props) {
  const amountOptions = buildAmountOptions(user.loanAmount);
  const [selectedAmount, setSelectedAmount] = useState(user.loanAmount);
  const [context, setContext] = useState("");

  // Mock upload date — in a real app this would come from the submission record
  const uploadDate = "Jan 15, 2026";

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
            Appeal Your Application
          </Text>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={{ fontSize: 20, color: "#64748b" }}>✕</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 48 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* ── What we already have ── */}
            <View
              style={{
                backgroundColor: "#f8fafc",
                borderRadius: 16,
                padding: 18,
                marginBottom: 28,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                  color: "#64748b",
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                What we have on file
              </Text>

              {/* Application line */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={{ fontSize: 13, color: "#64748b" }}>Application</Text>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#0f172a" }}>
                  #{user.id}
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={{ fontSize: 13, color: "#64748b" }}>Amount requested</Text>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#0f172a" }}>
                  ${user.loanAmount.toLocaleString()}
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={{ fontSize: 13, color: "#64748b" }}>Submitted</Text>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#0f172a" }}>{uploadDate}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 14 }}>
                <Text style={{ fontSize: 13, color: "#64748b" }}>Decision</Text>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#dc2626" }}>Not approved</Text>
              </View>

              {/* Divider */}
              <View style={{ height: 1, backgroundColor: "#e2e8f0", marginBottom: 14 }} />

              {/* Documents submitted */}
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#64748b", marginBottom: 10 }}>
                Documents submitted
              </Text>
              {user.documents.map((doc) => (
                <View
                  key={doc}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    padding: 12,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: "#e2e8f0",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                    <Text style={{ fontSize: 16, marginRight: 10 }}>📄</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 13, fontWeight: "600", color: "#0f172a" }} numberOfLines={1}>
                        {formatDocName(doc)}
                      </Text>
                      <Text style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>
                        Uploaded {uploadDate}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

              {/* Divider */}
              <View style={{ height: 1, backgroundColor: "#e2e8f0", marginTop: 6, marginBottom: 14 }} />

              {/* Locked income */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 13, color: "#64748b" }}>Monthly income</Text>
                  <LockIcon />
                </View>
                <Text style={{ fontSize: 13, fontWeight: "600", color: "#94a3b8" }}>
                  ${user.monthlyIncome.toLocaleString()}/mo
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: "#94a3b8", marginTop: 6, lineHeight: 17 }}>
                To demonstrate a higher income, upload an updated pay stub or bank statement above.
              </Text>
            </View>

            {/* ── Section 1: Upload new documents ── */}
            <SectionHeader number="1" title="Upload new or updated documents" />
            <Text style={{ fontSize: 14, color: "#64748b", lineHeight: 21, marginBottom: 14 }}>
              If your situation has changed — a recent pay stub, a newer bank statement — upload a more current snapshot. We'll include it in the re-review.
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                borderWidth: 1.5,
                borderColor: "#cbd5e1",
                borderStyle: "dashed",
                borderRadius: 14,
                paddingVertical: 20,
                alignItems: "center",
                backgroundColor: "#f8fafc",
                marginBottom: 32,
              }}
            >
              <Text style={{ fontSize: 22, marginBottom: 6 }}>📎</Text>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#0f172a" }}>Add a document</Text>
              <Text style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>PDF, JPG or PNG</Text>
            </TouchableOpacity>

            {/* ── Section 2: Request a lower amount ── */}
            <SectionHeader number="2" title="Request a different amount" />
            <Text style={{ fontSize: 14, color: "#64748b", lineHeight: 21, marginBottom: 14 }}>
              You may qualify for a lower advance with your current documents. Adjusting your request doesn't require re-uploading anything.
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
              {amountOptions.map((amt) => {
                const active = amt === selectedAmount;
                return (
                  <TouchableOpacity
                    key={amt}
                    onPress={() => setSelectedAmount(amt)}
                    activeOpacity={0.7}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: active ? "#3b82f6" : "#e2e8f0",
                      backgroundColor: active ? "#eff6ff" : "#f8fafc",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "700",
                        color: active ? "#1d4ed8" : "#374151",
                      }}
                    >
                      ${amt.toLocaleString()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {selectedAmount < user.loanAmount && (
              <Text style={{ fontSize: 12, color: "#16a34a", fontWeight: "500", marginBottom: 32 }}>
                ✓ Requesting ${selectedAmount.toLocaleString()} instead of ${user.loanAmount.toLocaleString()}
              </Text>
            )}
            {selectedAmount === user.loanAmount && (
              <Text style={{ fontSize: 12, color: "#94a3b8", marginBottom: 32 }}>
                Same as your original request
              </Text>
            )}

            {/* ── Section 3: Add context ── */}
            <SectionHeader number="3" title="Add context (optional)" />
            <Text style={{ fontSize: 14, color: "#64748b", lineHeight: 21, marginBottom: 12 }}>
              Is there anything else you'd like our review team to know? For example: a recent change in employment, a one-time expense that affected your balance, or anything the documents don't reflect.
            </Text>
            <TextInput
              value={context}
              onChangeText={setContext}
              multiline
              placeholder="Optional — add any context that may help our review team..."
              placeholderTextColor="#94a3b8"
              style={{
                borderWidth: 1.5,
                borderColor: context.length > 0 ? "#3b82f6" : "#e2e8f0",
                borderRadius: 14,
                padding: 14,
                fontSize: 14,
                color: "#0f172a",
                lineHeight: 21,
                minHeight: 100,
                textAlignVertical: "top",
                backgroundColor: "#fff",
                marginBottom: 6,
              }}
            />
            <Text style={{ fontSize: 12, color: "#94a3b8", marginBottom: 36, textAlign: "right" }}>
              {context.length}/500
            </Text>

            {/* Submit */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={{
                backgroundColor: "#0f172a",
                borderRadius: 16,
                paddingVertical: 18,
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>Submit Appeal</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", lineHeight: 18 }}>
              Submitting an appeal won't affect your credit score.{"\n"}Most appeals are reviewed within 1–2 business days.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
