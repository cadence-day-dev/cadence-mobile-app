import { SafeAreaView, View } from "react-native";
import Header from "@/components/ui/Header";
import Timeline from "@/components/ui/Timeline";
import { useState } from "react";
import ActivityContainer from "@/components/ui/ActivityContainer";
import NoteDialog from "@/components/DialogNote";

export default function HomeScreen() {
  const [showNote, setShowNote] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <View style={{height: "10%" }}>
        <Header title={"Daily Cadence"} subTitle={"12/11/24 at 13:15"} />
      </View>
      <View style={{height: "60%" }}>
        <Timeline toggleNote={() => setShowNote(!showNote)} />
      </View>
      <View style={{height: "24%" }}>
        <ActivityContainer />
      </View>
      <NoteDialog
        visible={showNote}
          toggleVisibility={() => setShowNote(!showNote)}
        />
    </SafeAreaView>
  );
} 