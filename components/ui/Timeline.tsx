/* eslint-disable react-native/no-unused-styles */
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import NoteIcon from "@/components/ui/NoteIcon";

interface timeLineProps {
  toggleNote: () => void;
}

const Timeline: React.FC<timeLineProps> = ({ toggleNote }) => {
  const [, setPressedStates] = useState(Array(48).fill(false));
  const [selectedColor] = useState<string | null>(null);
  const [, setSliceColors] = useState<string[]>(Array(48).fill("transparent"));

  const handlePress = (index: number) => {
    setPressedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
    setSliceColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = selectedColor || "#E9942F";
      return newColors;
    });
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
        }}
      >
        {Array.from({ length: 48 }).map((_, index) => {
          const hours = String(Math.floor(index / 2)).padStart(2, "0");
          const minutes = index % 2 === 0 ? "00" : "30";
          const timeLabel = `${hours}:${minutes}`;
          return (
            <View
              key={`timeline-slot-${index}`}
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <ThemedText
                style={{
                  width: 40,
                  fontSize: 11,
                  color: "black",
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                {timeLabel}
              </ThemedText>
              <TouchableOpacity
                onPress={() => handlePress(index)}
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
                }}
              />
              <TouchableOpacity
                onPress={toggleNote}
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  bottom: 20,
                }}
              >
                <NoteIcon />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Timeline;
