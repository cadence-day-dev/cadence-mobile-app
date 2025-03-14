import { SafeAreaView, View } from "react-native";
import Header from "@/components/ui/Header";
import Timeline from "@/components/ui/Timeline";
import { useState } from "react";
import ActivityContainer from "@/components/ui/ActivityContainer";
import ActivityDialog from "@/components/DialogActivity";
import NoteDialog from "@/components/DialogNote";
import { supabase } from "@/components/utils/client";
import StateModal from "@/components/modals/stateModal";

export default function HomeScreen() {
  const [showNote, setShowNote] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <StateModal supabase={supabase} />
      <View style={{height: "10%" , marginBottom: 9, marginTop: 6}}>
        <Header title={"Daily Cadence"} subTitle={new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} />
      </View>
      <View style={{height: "58%" }}>
        <Timeline toggleNote={() => setShowNote(!showNote)} supabase={supabase} />
      </View>
      <View style={{height: "25%" }}>
        <ActivityContainer toggleActivity={() => setShowActivity(!showActivity)} />
      </View>
      <NoteDialog
        visible={showNote}
          toggleVisibility={() => setShowNote(!showNote)}
      />
      <ActivityDialog
        visible={showActivity}
        toggleVisibility={() => setShowActivity(!showActivity)}
      />
    </SafeAreaView>
  );
} 