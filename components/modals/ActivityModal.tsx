import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useActivityStore from "../../stores/useActivityStore";

interface Activity {
  name: string;
  user_id: string;
  activity_id: string;
  encrypted_name: string;
  weight: number;
  color: string;
}

interface ActivityModalProps {
  supabase: any;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ supabase }) => {
  const activities = useActivityStore((state) => state.activities);

  const disableActivity = async (activity_id: string) => {
    console.log("Deleting activity:", activity_id);
    const { data, error } = await supabase
      .from("activities")
      .delete()
      .eq("activity_id", activity_id);

    if (error) {
      console.error("Error deleting activity:", error);
      alert("An error occurred while deleting the activity. Please try again.");
    } else {
      console.log("Activity deleted successfully:", data);
      useActivityStore.setState((state) => ({
        activities: state.activities.filter(
          (activity) => activity.activity_id !== activity_id,
        ),
      }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>
      <ScrollView style={styles.scrollView}>
        {activities
          .slice()
          .reverse()
          .map((activity) => (
            <View key={activity.activity_id} style={styles.activityItem}>
              <Text style={styles.activityText}>{activity.name}</Text>
              <TouchableOpacity
                onPress={() => disableActivity(activity.activity_id)}
              >
                <Text style={styles.deleteButton}>x</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 300,
    backgroundColor: "#141F2C",
    padding: 16,
    borderRadius: 8,
    borderColor: "#6646EC",
    borderWidth: 1,
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    marginBottom: 16,
    fontSize: 12,
  },
  scrollView: {
    width: 280,
    paddingRight: 10,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  activityText: {
    color: "white",
    fontSize: 12,
  },
  deleteButton: {
    marginLeft: 8,
    color: "red",
    fontSize: 12,
  },
});

export default ActivityModal;
