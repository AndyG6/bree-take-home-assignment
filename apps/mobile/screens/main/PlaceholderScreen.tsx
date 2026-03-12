import React from "react";
import { SafeAreaView, Text, View } from "react-native";

interface Props {
  title: string;
}

export default function PlaceholderScreen({ title }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#cce3f5" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#0f172a", marginBottom: 8 }}>
          {title}
        </Text>
        <Text style={{ fontSize: 15, color: "#64748b" }}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
