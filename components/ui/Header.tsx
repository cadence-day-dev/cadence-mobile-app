/* eslint-disable react-native/no-unused-styles */
import { View, Text } from "react-native";
import Arrow from "@/components/ui/Arrow";
import { ThemedText } from "@/components/ThemedText";

interface HeaderProps {
  title: string;
  subTitle: string;
  rightElement?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, subTitle, rightElement }) => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 14,
        paddingLeft: 12,
        paddingRight: 10,
        position: "relative",
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              color: "#575453",
              letterSpacing: 1.2,
            }}
          >
            Your{" "}
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: "black",
              letterSpacing: 1.2,
            }}
          >
            {title}
          </Text>  
          <View style={{ marginTop: 3, marginLeft: 4 }}>
            <Arrow/>
          </View>
        </View>
        <View style={{ position: 'absolute', right: -2, top: 0 }}>
          {rightElement}
        </View>
      </View>
      <ThemedText
        style={{
          fontSize: 12,
          color: "black",
        }}
      >
        {subTitle}
      </ThemedText>
    </View>
  );
};

export default Header;
