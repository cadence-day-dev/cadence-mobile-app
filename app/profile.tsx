import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Avatar from "@/components/ui/Avatar";
import { signOut } from "@/components/utils/client";
import {LineItem, LineItemWithButton} from "@/components/ui/ProfileLineItems";

interface LineItemProps {
  title: any;
  value: any;
}


export default function Profile() {
  const sections = {
    Name: "User Name",
    Username: "@user",
    Password: "********",
    'Phone number': "+11111111111",
    Email: "user@cadence.day",
    Notifications: ">",
    'Subscription plan': "Free >",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <Avatar />
      <View
        style={{
          top: 60,
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {Object.entries(sections).map(([title, value]) => (
          <LineItem key={title} title={title} value={value} />
        ))}
        <View
          style={{
            width: "90%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <ThemedText
            style={{
              fontSize: 11,
              marginTop: 10,
              color: "#575453",
              alignSelf: "flex-start",
              letterSpacing: 2,
            }}
          >
            SECURITY
          </ThemedText>
        </View>
        <LineItem key="two-factor" title={"Two factor authentication"} value={"Enabled >"} />
        <LineItemWithButton key="sign-out" title={"Account"} value={"Sign out"} callBack={signOut} />
      </View>
    </SafeAreaView>
  );
}
