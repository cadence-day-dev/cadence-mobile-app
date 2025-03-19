import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface LineItemProps {
  title: any;
  value: any;
}
interface LineItemWithButtonProps extends LineItemProps {
    callBack: () => void;
  }

export const LineItem: React.FC<LineItemProps> = ({ title, value }) => {
  return (
    <View
      style={{
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        borderBottomWidth: 0.5,
        borderColor: "#6646EC",
        marginBottom: 26,
      }}
    >
      <ThemedText style={{ fontSize: 14, color: "#575453" }}>
        {title}
      </ThemedText>
      <ThemedText style={{ fontSize: 14, color: "black" }}>{value}</ThemedText>
    </View>
  );
};

export const LineItemWithButton: React.FC<LineItemWithButtonProps> = ({ title, value, callBack }) => {
  return (
    <View
      style={{
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        borderBottomWidth: 0.5,
        borderColor: "#6646EC",
        marginBottom: 26,
      }}
    >
      <ThemedText style={{ fontSize: 14, color: "#575453" }}>
        {title}
      </ThemedText>
      <TouchableOpacity onPress={callBack}>
        <ThemedText style={{ fontSize: 14, color: "black" }}>
          {value}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};
