import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  SafeAreaView,
  Text,
  View,
} from "react-native";

interface Props {
  onComplete: () => void;
}

const STEPS = [
  { label: "Uploading documents securely", delay: 600 },
  { label: "Verifying income documents", delay: 1400 },
  { label: "Analyzing account stability", delay: 2400 },
  { label: "Running credit assessment", delay: 3200 },
  { label: "Finalizing decision", delay: 4000 },
];

export default function ProcessingScreen({ onComplete }: Props) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse animation for the icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.12,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Sequence through steps
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, i]);
      }, step.delay);
      timers.push(t);
    });

    // Navigate to result after all steps
    const finalTimer = setTimeout(() => {
      onComplete();
    }, 5000);
    timers.push(finalTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#cce3f5",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Animated icon */}
      <Animated.View
        style={{
          transform: [{ scale: pulseAnim }],
          width: 96,
          height: 96,
          borderRadius: 48,
          backgroundColor: "#3b82f6",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 32,
          shadowColor: "#3b82f6",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.35,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        <Text style={{ fontSize: 40 }}>🔍</Text>
      </Animated.View>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "800",
          color: "#0f172a",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        Reviewing your application
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: "#475569",
          marginBottom: 40,
          textAlign: "center",
          lineHeight: 22,
          paddingHorizontal: 32,
        }}
      >
        Our AI is analyzing your documents. This only takes a moment.
      </Text>

      {/* Steps list */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          paddingVertical: 8,
          paddingHorizontal: 24,
          width: "85%",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        {STEPS.map((step, i) => {
          const done = completedSteps.includes(i);
          const active =
            !done &&
            (i === 0 || completedSteps.includes(i - 1)) &&
            !completedSteps.includes(STEPS.length - 1);
          return (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: i < STEPS.length - 1 ? 1 : 0,
                borderBottomColor: "#f1f5f9",
              }}
            >
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: done
                    ? "#22c55e"
                    : active
                    ? "#3b82f6"
                    : "#e2e8f0",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                {done ? (
                  <Text style={{ fontSize: 12, color: "#fff", fontWeight: "700" }}>
                    ✓
                  </Text>
                ) : active ? (
                  <Text style={{ fontSize: 10, color: "#fff" }}>●</Text>
                ) : (
                  <Text style={{ fontSize: 10, color: "#94a3b8" }}>○</Text>
                )}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: done ? "#16a34a" : active ? "#0f172a" : "#94a3b8",
                  fontWeight: done || active ? "600" : "400",
                  flex: 1,
                }}
              >
                {step.label}
              </Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
