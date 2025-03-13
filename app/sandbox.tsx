import React from "react";
import LoginComponent from "@/components/Screens/Login";
import { useUserStore } from "@/stores/useUserStore";
import SandboxScreen from "@/components/Screens/Sandbox";
const HomeScreen: React.FC = () => {
  const user = useUserStore((state) => state.user);
  if (!user) {
    return <LoginComponent />;
  }
  return <SandboxScreen />;
};

export default HomeScreen;
