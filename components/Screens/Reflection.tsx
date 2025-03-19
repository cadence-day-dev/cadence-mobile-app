import { SafeAreaView, View } from "react-native";
import ScheduleGrid from "@/components/ui/ReflectionGrid";
import Header from "@/components/ui/Header";
import { fetchUserTimeSlicesNew } from "../utils/client";
import { useEffect, useState } from "react";

export default function ReflectionScreen() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <View style={{height: "10%" , marginBottom: 0, marginTop: 6}}>
        <Header title={"Weekly Cadence"} subTitle={"02/11/24 to 08/11/24"} />
      </View>
      <View
        style={{
          height: "88%",
          width: "100%",
        }}
      >
        <ScheduleGrid />
      </View>
    </SafeAreaView>
  );
}