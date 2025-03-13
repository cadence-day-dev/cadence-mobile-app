import { SafeAreaView, View } from "react-native";
import ScheduleGrid from "@/components/ui/ReflectionGrid";
import Header from "@/components/ui/Header";

export default function ReflectionScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <Header title={"Weekly Cadence"} subTitle={"02/11/24 to 08/11/24"} />
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