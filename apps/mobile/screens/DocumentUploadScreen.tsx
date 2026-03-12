import React, { useState } from "react";
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
  onSubmit: () => void;
  onBack: () => void;
}

interface UploadCardProps {
  title: string;
  description: string;
  filename: string;
  uploaded: boolean;
  onUpload: () => void;
}

function UploadCard({
  title,
  description,
  filename,
  uploaded,
  onUpload,
}: UploadCardProps) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: uploaded ? "#22c55e" : "#e2e8f0",
        padding: 18,
        marginBottom: 16,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 12 }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            backgroundColor: uploaded ? "#f0fdf4" : "#eff6ff",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Text style={{ fontSize: 22 }}>{uploaded ? "✅" : "📄"}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 15, fontWeight: "700", color: "#0f172a", marginBottom: 3 }}
          >
            {title}
          </Text>
          <Text style={{ fontSize: 13, color: "#64748b", lineHeight: 18 }}>
            {description}
          </Text>
        </View>
      </View>

      {uploaded ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f0fdf4",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <Text style={{ fontSize: 13, color: "#16a34a", flex: 1, fontWeight: "500" }}>
            {filename}
          </Text>
          <Text style={{ fontSize: 12, color: "#22c55e", fontWeight: "600" }}>
            Uploaded ✓
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onUpload}
          style={{
            borderRadius: 10,
            borderWidth: 1.5,
            borderColor: "#3b82f6",
            borderStyle: "dashed",
            paddingVertical: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14, color: "#3b82f6", fontWeight: "600" }}>
            + Tap to upload
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function DocumentUploadScreen({ user, onSubmit, onBack }: Props) {
  const [payStubUploaded, setPayStubUploaded] = useState(false);
  const [bankStatementUploaded, setBankStatementUploaded] = useState(false);

  const allUploaded = payStubUploaded && bankStatementUploaded;

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
          Upload Documents
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Step indicator */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 28 }}
        >
          {["Info", "Documents", "Review"].map((step, i) => (
            <React.Fragment key={step}>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor:
                      i === 0 ? "#22c55e" : i === 1 ? "#3b82f6" : "#e2e8f0",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                      color: i < 2 ? "#fff" : "#94a3b8",
                    }}
                  >
                    {i === 0 ? "✓" : i + 1}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    color: i === 1 ? "#3b82f6" : i === 0 ? "#22c55e" : "#94a3b8",
                    marginTop: 4,
                    fontWeight: i <= 1 ? "600" : "400",
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
                    backgroundColor: i === 0 ? "#22c55e" : "#e2e8f0",
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
          Verify your income
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#64748b",
            marginBottom: 28,
            lineHeight: 20,
          }}
        >
          Upload your documents so we can confirm your income and account
          health. Our AI reviews them instantly.
        </Text>

        <UploadCard
          title="Pay Stub"
          description="Most recent pay stub or proof of income (PDF or image)"
          filename={user.documents[0]}
          uploaded={payStubUploaded}
          onUpload={() => setPayStubUploaded(true)}
        />

        <UploadCard
          title="Bank Statement"
          description="Last 3 months of bank statements (PDF)"
          filename={user.documents[1]}
          uploaded={bankStatementUploaded}
          onUpload={() => setBankStatementUploaded(true)}
        />

        {!allUploaded && (
          <View
            style={{
              backgroundColor: "#fefce8",
              borderRadius: 12,
              padding: 14,
              flexDirection: "row",
              marginTop: 4,
            }}
          >
            <Text style={{ fontSize: 16, marginRight: 8 }}>⚠️</Text>
            <Text style={{ fontSize: 13, color: "#854d0e", flex: 1, lineHeight: 18 }}>
              Both documents are required to process your application.
            </Text>
          </View>
        )}
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
          activeOpacity={allUploaded ? 0.85 : 1}
          onPress={allUploaded ? onSubmit : undefined}
          style={{
            backgroundColor: allUploaded ? "#3b82f6" : "#cbd5e1",
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: allUploaded ? "#fff" : "#94a3b8",
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            Submit Application
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
