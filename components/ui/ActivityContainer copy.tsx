import { View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import useActivityStore from "@/stores/useActivityStore";

const ActivityContainer = () => {
  const activities = useActivityStore((state) => state.activities);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isActivityDialogVisible, setActivityDialogVisible] = useState(false);

  const handleColorPress = (color: string) => {
    setSelectedColor(color);
    // Find the activity with the matching color
    const selectedActivity = activities.find(activity => activity.color === color);
    if (selectedActivity) {
      console.log(`Selected activity: ${selectedActivity.name}`);
      // You can add additional logic here to handle the selected activity
    }
  };

  const toggleActivityDialogVisibility = () => {
    setActivityDialogVisible(!isActivityDialogVisible);
  };
  const colorLabels1 = {
    work: "#E9942F",
    sports: "#024886",
    family: "#8AB3DB",
    admin: "#FFF4A0",
  };
  const colorLabels2 = {
    food: "#758A61",
    friends: "#9D8266",
    errands: "#141F2C",
    rest: "#DAEBFD",
  };
  return (
    <View
      style={{
        width: "100%",
        marginVertical: 2,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 5,
        alignSelf: "center",
      }}
    >
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
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 16,
          justifyContent: "space-between",
        }}
      >
        {Object.entries(colorLabels1).map(([label, color], index) => (
          <View key={color} style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => handleColorPress(color)}
              key={label}
              style={{
                width: 70,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: color,
              }}
            />
            <ThemedText
              style={{
                fontSize: 12,
                color: "black",
                textAlign: "left",
                width: 70,
                marginBottom: 10,
                textTransform: "capitalize",
              }}
            >
              {label}
            </ThemedText>
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {Object.entries(colorLabels2).map(([label, color], index) => (
          <View style={{ alignItems: "center" }} key={label}>
            <TouchableOpacity
              onPress={() => handleColorPress(color)}
              key={label}
              style={{
                width: 70,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: color,
              }}
            />
            <ThemedText
              style={{
                fontSize: 12,
                color: "black",
                textAlign: "left",
                width: 70,
                marginBottom: 10,
                textTransform: "capitalize",
              }}
            >
              {label}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ActivityContainer;
