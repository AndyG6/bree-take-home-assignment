import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { DEMO_USERS } from "./data/testData";
import LandingScreen from "./screens/LandingScreen";
import PersonalInfoScreen from "./screens/PersonalInfoScreen";
import DocumentUploadScreen from "./screens/DocumentUploadScreen";
import ProcessingScreen from "./screens/ProcessingScreen";
import ResultScreen from "./screens/ResultScreen";

type Screen =
  | "landing"
  | "personal-info"
  | "document-upload"
  | "processing"
  | "result";

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedUser, setSelectedUser] = useState<"jane" | "bob">("jane");

  const user = DEMO_USERS[selectedUser];
  const navigate = (s: Screen) => setScreen(s);

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
          onEnterApp={() => {
            // Placeholder — will navigate to main app home screen
          }}
        />
      )}
    </>
  );
}
