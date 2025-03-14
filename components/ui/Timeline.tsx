import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useActivityStore from "../../stores/useActivityStore";
import useTimeslicesStore from "../../stores/useTimelineStore";

interface TimesliceModalProps {
  toggleNote: () => void;
  supabase: any;
}

const Timeline: React.FC<TimesliceModalProps> = ({ supabase, toggleNote }) => {
  const activities = useActivityStore((state) => state.activities);
  const selectedActivityId = useActivityStore((state) => state.selectedActivityId);
  const setSelectedActivityId = useActivityStore((state) => state.setSelectedActivityId);
  const timeslices = useTimeslicesStore((state) => state.timeslices);
  const setTimeslices = useTimeslicesStore((state) => state.setTimeslices);
  const today = new Date();
  const initializeTimeSliceComponents = (date: Date) => {
    const components = [];
    for (let i = 0; i < 48; i++) {
      const startTime = new Date(date);
      startTime.setHours(0, 0, 0, 0);
      startTime.setMinutes(startTime.getMinutes() + i * 30);
      const endTime = new Date(startTime.getTime() + 30 * 60000);
      components.push({
        timeslice_id: null as string | null,
        activityName: null as string | null,
        activityColor: null as string | null,
        startTime,
        endTime,
      });
    }
    return components;
  };
  const [timeSliceComponents, setTimeSliceComponents] = useState(() =>
    initializeTimeSliceComponents(today),
  );
  const updateTimeSliceComponents = (
    timeslices: any[],
    timeSliceComponents: any[],
  ) => {
    const updatedTimeSliceComponents = timeSliceComponents.map((component) => {
      const matchingTimeslice = timeslices.find(
        (timeslice) =>
          new Date(timeslice.start_time).getTime() ===
            component.startTime.getTime() &&
          new Date(timeslice.end_time).getTime() ===
            component.endTime.getTime(),
      );
      if (matchingTimeslice) {
        return {
          ...component,
          activityName: matchingTimeslice.activity.name,
          activityColor: matchingTimeslice.activity.color,
          timeslice_id: matchingTimeslice.timeslice_id,
        };
      }
      return component;
    });
    return updatedTimeSliceComponents;
  };

  useEffect(() => {
    const updatedTimeSliceComponents = updateTimeSliceComponents(
      timeslices,
      timeSliceComponents,
    );
    setTimeSliceComponents(updatedTimeSliceComponents);
  }, [timeslices]);

  const insertTimeSlice = async (
    startTime: Date,
    endTime: Date,
    timeSliceComponent: any,
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id || "<default_user_id>";

    const { data, error } = await supabase
      .from("timeslices")
      .insert([
        {
          user_id: userId,
          activity_id: selectedActivityId,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
        },
      ])
      .select();

    if (error) {
      if (error.code === "23505") {
        alert(
          "A timeslice for this time already exists. Please choose a different time.",
        );
      } else {
        console.error("Error inserting timeslice:", error);
        alert(
          "An error occurred while inserting the timeslice. Please try again.",
        );
      }
    } else {
      const selectedActivity = activities.find(
        (activity) => activity.activity_id === data[0].activity_id,
      );
      const newTimeslice = {
        timeslice_id: data[0].timeslice_id,
        activityId: data[0].activity_id,
        activityName: selectedActivity?.name || null,
        activityColor: selectedActivity?.color || "#6646EC",
        startTime: startTime,
        endTime: endTime,
      };
      const updatedTimeSliceComponents = timeSliceComponents.map(
        (component, index) => {
          if (
            component.startTime.getTime() ===
              timeSliceComponent.startTime.getTime() &&
            component.endTime.getTime() === timeSliceComponent.endTime.getTime()
          ) {
            return newTimeslice;
          }
          return component;
        },
      );
      setTimeSliceComponents(updatedTimeSliceComponents);
    }
  };
  const deleteTimeslice = async (timeslice_id: string) => {
    const { data, error: deleteError } = await supabase
      .from("timeslices")
      .delete()
      .eq("timeslice_id", timeslice_id);

    if (deleteError) {
      console.error("Error deleting timeslice:", deleteError);
      alert(
        "An error occurred while deleting the timeslice. Please try again.",
      );
    } else {
      setTimeSliceComponents(
        timeSliceComponents.map((ts) =>
          ts.timeslice_id === timeslice_id
            ? {
                ...ts,
                activityName: null,
                activityColor: null,
                timeslice_id: null,
              }
            : ts,
        ),
      );
    }
  };
  const clickTimesliceComponent = async (timeSliceComponent: any) => {
    if (timeSliceComponent.timeslice_id === null) {
      console.log("empty timeslice");
      insertTimeSlice(
        timeSliceComponent.startTime,
        timeSliceComponent.endTime,
        timeSliceComponent,
      );
    } else {
      deleteTimeslice(timeSliceComponent.timeslice_id);
      console.log("timeslice not empty");
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
    console.log("From Time:", from_time);
    console.log("To Time:", to_time);
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
      console.log("Fetched Timeslices:", data.data);
      return data.data;
    }
  };

  return (
    <View
      style={{
        width: "100%",
        marginVertical: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 0,
      }}
    >
     <ScrollView
        horizontal
        contentContainerStyle={{
          flexDirection: "row",
          paddingHorizontal: 10,
          height: 400,
        }}
      >
        {timeSliceComponents.map((timeSliceComponent, index) => (
          <TouchableOpacity
            key={`rectangle-${index}`}
            onPress={() => clickTimesliceComponent(timeSliceComponent)}
            activeOpacity={1}
            style={{
              width: 45,
              height: '90%',
              borderWidth: 1,
              borderColor: "#6646EC",
              marginHorizontal: 2,
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 0,
              backgroundColor:
              timeSliceComponent.activityColor || "transparent",
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Timeline;
