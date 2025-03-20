import { SafeAreaView, TouchableOpacity, View } from "react-native";
import ScheduleGrid from "@/components/ui/ReflectionGrid";
import Header from "@/components/ui/Header";
import { useEffect, useState } from "react";
import Star from "@/components/ui/Star";
import EchoDialog from "../ui/EchoDialog";

export default function ReflectionScreen() {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showEcho, setShowEcho] = useState(false);
  useEffect(() => {
    // Set initial date range
    const end = new Date(); // Today
    const start = new Date();
    start.setDate(end.getDate() - 7); // 7 days ago
    
    setFromDate(start);
    setToDate(end);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <View style={{height: "10%" , marginBottom: 0, marginTop: 6}}>
        <Header title={"Weekly Cadence"} subTitle={`${fromDate.toLocaleDateString()} to ${toDate.toLocaleDateString()}`} rightElement={
            <TouchableOpacity onPress={() => setShowEcho(!showEcho)}>
              <Star />
            </TouchableOpacity>
          }/>
      </View>
      <View
        style={{
          height: "88%",
          width: "100%",
        }}
      >
        <ScheduleGrid fromDate={fromDate} toDate={toDate} />
      </View>
      <EchoDialog
        isVisible={showEcho}
        onClose={() => setShowEcho(false)}
      />
    </SafeAreaView>
  );
}