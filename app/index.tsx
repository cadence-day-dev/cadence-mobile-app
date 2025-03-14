import { SafeAreaView, View } from "react-native";
import Header from "@/components/ui/Header";
import Timeline from "@/components/ui/Timeline";
import { useState } from "react";
import ActivityContainer from "@/components/ui/ActivityContainer";
import NoteDialog from "@/components/DialogNote";
import { supabase } from "@/components/utils/client";
import StateModal from "@/components/modals/stateModal";

export default function HomeScreen() {
  const [showNote, setShowNote] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <StateModal supabase={supabase} />
      <View style={{height: "10%" , marginBottom: 9, marginTop: 6}}>
        <Header title={"Daily Cadence"} subTitle={"12/11/24 at 13:15"} />
      </View>
      <View style={{height: "58%", borderWidth: 1, borderColor: "red" }}>
        <Timeline toggleNote={() => setShowNote(!showNote)} supabase={supabase} />
      </View>
      <View style={{height: "25%" }}>
        <ActivityContainer />
      </View>
      <NoteDialog
        visible={showNote}
          toggleVisibility={() => setShowNote(!showNote)}
        />
    </SafeAreaView>
  );
} 