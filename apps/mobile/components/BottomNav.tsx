import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export type TabName = "home" | "activity" | "insights" | "earn" | "settings";

interface Props {
  activeTab: TabName;
  onSelectTab: (tab: TabName) => void;
}

interface TabConfig {
  key: TabName;
  label: string;
  renderIcon: (active: boolean) => React.ReactNode;
}

const TABS: TabConfig[] = [
  {
    key: "home",
    label: "Home",
    renderIcon: (active) => (
      <Ionicons name={active ? "home" : "home-outline"} size={24} color={active ? "#3b82f6" : "#94a3b8"} />
    ),
  },
  {
    key: "activity",
    label: "Activity",
    renderIcon: (active) => (
      <Ionicons name="pulse" size={24} color={active ? "#3b82f6" : "#94a3b8"} />
    ),
  },
  {
    key: "insights",
    label: "Insights",
    renderIcon: (active) => (
      <Ionicons name={active ? "globe" : "globe-outline"} size={24} color={active ? "#3b82f6" : "#94a3b8"} />
    ),
  },
  {
    key: "earn",
    label: "Earn",
    renderIcon: (active) => (
      <MaterialCommunityIcons
        name={active ? "piggy-bank" : "piggy-bank-outline"}
        size={24}
        color={active ? "#3b82f6" : "#94a3b8"}
      />
    ),
  },
  {
    key: "settings",
    label: "Settings",
    renderIcon: (active) => (
      <Ionicons name={active ? "settings" : "settings-outline"} size={24} color={active ? "#3b82f6" : "#94a3b8"} />
    ),
  },
];

export default function BottomNav({ activeTab, onSelectTab }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        paddingBottom: 24,
        paddingTop: 10,
      }}
    >
      {TABS.map((tab) => {
        const active = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onSelectTab(tab.key)}
            style={{ flex: 1, alignItems: "center", gap: 4 }}
            activeOpacity={0.7}
          >
            {tab.renderIcon(active)}
            <Text
              style={{
                fontSize: 11,
                fontWeight: "600",
                color: active ? "#3b82f6" : "#94a3b8",
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
