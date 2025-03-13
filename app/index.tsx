import { SafeAreaView } from "react-native";
import Header from "@/components/ui/Header";
import Timeline from "@/components/ui/Timeline";
import { useState } from "react";
import ActivityContainer from "@/components/ui/ActivityContainer";
import NoteDialog from "@/components/DialogNote";

export default function HomeScreen() {
  const [showNote, setShowNote] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <Header title={"Day"} subTitle={"12/11/24 at 13:15"} />
      <Timeline toggleNote={() => setShowNote(!showNote)} />
      <ActivityContainer />
      <NoteDialog
        visible={showNote}
        toggleVisibility={() => setShowNote(!showNote)}
      />
    </SafeAreaView>
  );
} 