import { SafeAreaView } from "react-native";
import ActivityModal from "@/components/modals/activityModal";
import { supabase } from "@/components/utils/client";
import StateModal from "@/components/modals/stateModal";
// eslint-disable-next-line import/no-unresolved
import TimelineModal from "@/components/modals/TimelineModal";
import { View } from "react-native";
import NotesModal from "@/components/modals/notesModal";
import Accordion from "@/components/Accordian";

export default function SandboxScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <View
        style={{
          flex: 0.3,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View style={{ height: 10 }} />
        <StateModal supabase={supabase} />
      </View>
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <View style={{ height: 10 }} />
        <Accordion title="Activity Modal">
          <ActivityModal supabase={supabase} />
        </Accordion>
        <View style={{ height: 0 }} />
        <Accordion title="Notes Modal">
          <NotesModal supabase={supabase} />
        </Accordion>
        <View style={{ height: 0 }} />
        <Accordion title="Timeline Modal">
          <TimelineModal supabase={supabase} />
        </Accordion>
      </View>
    </SafeAreaView>
  );
}
