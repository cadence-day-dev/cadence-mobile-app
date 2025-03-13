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
      }}
    >
      <Image
        source={require("@/assets/images/Profile.png")}
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          borderRadius: 50,
        }}
      />
       <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#6646EC",
          backgroundColor: "",
        }}
      />
      <ThemedText
        style={{
          position: "absolute",
          top: 140,
          fontSize: 10,
          color: "#575453",
          textAlign: "center",
          letterSpacing: 1.3,
          textTransform: "uppercase",
        }}
      >
        Edit profile photo
      </ThemedText>
    </View>
  );
};

export default Avatar;
