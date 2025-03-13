import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { supabase } from "@/components/utils/client";

const StateModal: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    fetchActivities();
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

  return (
    <View
      style={{
        height: 200,
        width: 300,
        // backgroundColor: "#141F2C",
        padding: 16,
        // borderRadius: 8,
        // borderWidth: 1,
        borderColor: "#6646EC",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {activities.map((activity, index) => (
        <Text key={index}>{activity.name}</Text>
      ))}
    </View>
  );
};

export default StateModal;
