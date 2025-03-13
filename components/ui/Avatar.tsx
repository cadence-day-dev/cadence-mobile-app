import { View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";

const Avatar = () => {
  return (
    <View
      style={{
        width: "95%",
        height: "20%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        alignSelf: "center",
        borderColor: "#6646EC",
      }}
    >
      <Image
        source={require("@/assets/images/Andrea.png")}
        style={{
          position: "absolute",
          top: 56,
          width: 80,
          height: 80,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#6646EC",
        }}
      />
      <ThemedText
        style={{
          position: "absolute",
          top: 160,
          fontSize: 11,
          color: "#575453",
          textAlign: "center",
          letterSpacing: 1.3,
          textTransform: "uppercase",
        }}
      >
        Edit profile photo
      </ThemedText>
      <View
        style={{
          top: 16,
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#6646EC",
          backgroundColor: "",
        }}
      />
    </View>
  );
};

export default Avatar;
