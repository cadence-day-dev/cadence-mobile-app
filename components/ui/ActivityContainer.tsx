import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import useActivityStore from "@/stores/useActivityStore";

const ActivityContainer = ({ toggleActivity }: { toggleActivity: () => void }) => {
  // Store hooks
  const activities = useActivityStore((state) => state.activities);
  const setSelectedActivityId = useActivityStore((state) => state.setSelectedActivityId);


  const toggleActivityDialogVisibility = () => {
    toggleActivity();
  };


  return (
    <View
      style={{
        width: "100%",
        height: 176,
        marginVertical: 2,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: "center",
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 12,
          justifyContent: "space-between",
        }}
      >
        <ThemedText style={{ fontSize: 17, color: "black" }}>
          Activities
        </ThemedText>
        <TouchableOpacity onPress={toggleActivityDialogVisibility}>
          <ThemedText
            style={{
              fontSize: 12,
              color: "black",
              textDecorationLine: "underline",
              marginLeft: 20,
            }}
          >
            edit
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Activities Grid */}
      <ScrollView style={{ marginTop: 6}}>
        <View 
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}
        >
          {activities.map((activity) => (
            <View 
              key={activity.activity_id.toString()}
              style={{ 
                alignItems: "center", 
              }}
            >
              <TouchableOpacity
                style={{
                  width: 74,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: activity.color,
                  marginBottom: 6,
                }}
                onPress={() => {
                  setSelectedActivityId(activity.activity_id.toString());
                  console.log(
                    `Selected activity: ${activity.name}, ID: ${activity.activity_id}`,
                  );  
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "black",
                  textAlign: "left",
                  width: 70,
                  marginBottom: 10,
                  textTransform: "capitalize"
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {activity.name}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ActivityContainer;
