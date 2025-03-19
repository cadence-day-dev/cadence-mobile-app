// React and React Native imports
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { useState } from "react";

// Dialog Components
import ActivityDialog from "@/components/DialogActivity";
import NoteDialog from "@/components/DialogNote";

// Modal Components
import StateModal from "@/components/modals/stateModal";

// UI Components
import ActivityContainer from "@/components/ui/ActivityContainer";
import EchoDialog from "@/components/ui/EchoDialog";
import Header from "@/components/ui/Header";
import Star from "@/components/ui/Star";
import Timeline from "@/components/ui/Timeline";

// Utils
import { supabase } from "@/components/utils/client";

export default function HomeScreen() {
  const [showNote, setShowNote] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showEcho, setShowEcho] = useState(false); // Show Echo dialog by default

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <StateModal supabase={supabase} />
      <View style={{height: "10%" , marginBottom: 9, marginTop: 6}}>
        <Header 
          title={"Daily Cadence"} 
          subTitle={new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          rightElement={
            <TouchableOpacity onPress={() => setShowEcho(!showEcho)}>
              <Star />
            </TouchableOpacity>
          }
        />
      </View>
      <View style={{height: "62%"}}>
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
      <EchoDialog
        isVisible={showEcho}
        onClose={() => setShowEcho(false)}
      />
    </SafeAreaView>
  );
} 