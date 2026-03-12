import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { DEMO_USERS, DemoUserKey } from "./data/testData";
import LandingScreen from "./screens/LandingScreen";
import PersonalInfoScreen from "./screens/PersonalInfoScreen";
import DocumentUploadScreen from "./screens/DocumentUploadScreen";
import ProcessingScreen from "./screens/ProcessingScreen";
import ResultScreen from "./screens/ResultScreen";
import BottomNav, { TabName } from "./components/BottomNav";
import HomeScreen from "./screens/main/HomeScreen";
import PlaceholderScreen from "./screens/main/PlaceholderScreen";
import SettingsScreen from "./screens/main/SettingsScreen";

type OnboardingScreen =
  | "landing"
  | "personal-info"
  | "document-upload"
  | "processing"
  | "result";

function MainAppShell({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: DemoUserKey;
  setSelectedUser: (key: DemoUserKey) => void;
}) {
  const [activeTab, setActiveTab] = useState<TabName>("home");
  const user = DEMO_USERS[selectedUser];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {activeTab === "home" && <HomeScreen user={user} />}
        {activeTab === "activity" && <PlaceholderScreen title="Activity" />}
        {activeTab === "insights" && <PlaceholderScreen title="Insights" />}
        {activeTab === "earn" && <PlaceholderScreen title="Earn" />}
        {activeTab === "settings" && (
          <SettingsScreen
            user={user}
            selectedUserKey={selectedUser}
            onSwitchUser={setSelectedUser}
          />
        )}
      </View>
      <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
    </View>
  );
}

export default function App() {
  const [appPhase, setAppPhase] = useState<"onboarding" | "mainApp">("onboarding");
  const [screen, setScreen] = useState<OnboardingScreen>("landing");
  const [selectedUser, setSelectedUser] = useState<DemoUserKey>("jane");

  const user = DEMO_USERS[selectedUser];
  const navigate = (s: OnboardingScreen) => setScreen(s);

  if (appPhase === "mainApp") {
    return (
      <>
        <StatusBar style="dark" />
        <MainAppShell selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </>
    );
  }

  return (
    <>
      <StatusBar style="dark" />

      {screen === "landing" && (
        <LandingScreen
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
          onSignUp={() => navigate("personal-info")}
          onLogin={() => {}}
        />
      )}

      {screen === "personal-info" && (
        <PersonalInfoScreen
          user={user}
          onNext={() => navigate("document-upload")}
          onBack={() => navigate("landing")}
        />
      )}

      {screen === "document-upload" && (
        <DocumentUploadScreen
          user={user}
          onSubmit={() => navigate("processing")}
          onBack={() => navigate("personal-info")}
        />
      )}

      {screen === "processing" && (
        <ProcessingScreen onComplete={() => navigate("result")} />
      )}

      {screen === "result" && (
        <ResultScreen
          user={user}
          onStartOver={() => navigate("landing")}
          onEnterApp={() => setAppPhase("mainApp")}
        />
      )}
    </>
  );
}
