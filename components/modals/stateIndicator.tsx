import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import useActivityStore from "../../stores/useActivityStore";
import useNotesStore from "../../stores/useNotesStore";
// import useNotesStore from "../stores/useNotesStore";
// import usePrivateActivityStore from "../../stores/usePrivateActivityStore";
// import useProfileStore from "../../stores/useProfileStore";
// import useTimeslicesStore from "../../stores/useTimeslicesStore";
import useTimeslicesStore from "@/stores/useTimelineStore";

interface StateModalProps {
  supabase: any;
}
const StateModal: React.FC<StateModalProps> = ({ supabase }) => {
  const setActivities = useActivityStore((state) => state.setActivities);
  const activities = useActivityStore((state) => state.activities);
  const setNotes = useNotesStore((state) => state.setNotes);
  const notes = useNotesStore((state) => state.notes);
  // const setProfile = useProfileStore((state) => state.setProfile);
  // const profile = useProfileStore((state) => state.profile);
  const setTimeslices = useTimeslicesStore((state) => state.setTimeslices);
  const timeslices = useTimeslicesStore((state) => state.timeslices);

  useEffect(() => {
    fetchActivities();
    fetchNotes();
    // fetchProfile();
    // fetchUserTimeSlicesOld();
    fetchTodayTimeslices();
  }, []);

  const fetchActivities = async (): Promise<any[] | null> => {
    let { data: activities, error } = await supabase
      .from("activities")
      .select("*");

    if (activities) {
      setActivities(activities);
    }
    if (error) {
      console.error("Error fetching activities:", error);
      return null;
    } else {
      return activities;
    }
  };

  const fetchNotes = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id || "<default_user_id>"; // Replace with actual user ID logic

    const { data: notes, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching notes:", error);
      alert("An error occurred while fetching notes. Please try again.");
    } else {
      setNotes(notes);
    }
  };

  const fetchProfile = async () => {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("full_name, email")
      .single();

    if (error) {
      console.error("Error fetching profiles:", error);
    } else {
      // setProfile({
      //   photo_url: null,
      //   full_name: profiles.full_name || null,
      //   email: profiles.email || null,
      // });
    }
  };

  const fetchUserTimeSlicesOld = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id || "<default_user_id>";

    const { data: fetchedTimeslices, error } = await supabase
      .from("timeslices")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching timeslices:", error);
    } else {
      setTimeslices(fetchedTimeslices || []);
    }
  };

  const fetchUserTimeSlicesNew = async ({
    from_time,
    to_time,
  }: {
    from_time: string;
    to_time: string;
  }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id || "<default_user_id>";
    let { data, error } = await supabase.rpc("get_timeslices_for_user", {
      from_time: from_time,
      p_user_id: userId,
      to_time: to_time,
    });
    if (error) {
      console.error("Error fetching new timeslices:", error);
      alert(
        "An error occurred while fetching new timeslices. Please try again.",
      );
    } else {
      setTimeslices(data.data || []);
    }
  };

  const fetchTodayTimeslices = async () => {
    const from_time = new Date(new Date().setHours(1, 0, 0, 0)).toISOString();
    // console.log('From Time:', new Date(from_time).toLocaleString());
    const to_time = new Date(new Date().setHours(23, 30, 0, 0)).toISOString();
    // console.log('To Time:', new Date(to_time).toLocaleString());
    const timeslices = await fetchUserTimeSlicesNew({ from_time, to_time });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>State container status</Text>
        <View style={[styles.statusContainer, { flexDirection: "column" }]}>
          {activities.length > 0 ? (
            <Text style={styles.success}>Activities Fetched</Text>
          ) : (
            <Text style={styles.error}>Activities not fetched</Text>
          )}
          {notes.length > 0 ? (
            <Text style={styles.success}>Notes Fetched</Text>
          ) : (
            <Text style={styles.error}>Notes not fetched</Text>
          )}
          {/* {profile.email ? (
            <Text style={styles.success}>Profile Fetched</Text>
          ) : (
            <Text style={styles.error}>Profile not fetched</Text>
          )} */}
          {timeslices.length > 0 ? (
            <Text style={styles.success}>Timeslices Fetched</Text>
          ) : (
            <Text style={styles.error}>Timeslices not fetched</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    backgroundColor: "#141F2C",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6646EC",
    justifyContent: "space-between",
  },
  innerContainer: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    color: "white",
    fontSize: 12,
  },
  statusContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  success: {
    color: "green",
    fontSize: 12,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});

export default StateModal;
