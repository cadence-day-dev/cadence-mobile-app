import { SafeAreaView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Avatar from "@/components/ui/Avatar";

interface LineItemProps {
  title: any;
  value: any;
}

const LineItem: React.FC<LineItemProps> = ({ title, value }) => {
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

export default function AccountScreen() {
  const sections = {
    Name: "Oleg Moshkovich",
    Username: "@oleg",
    Password: "********",
    'Phone number': "+13473244776",
    Email: "oleg@cadence.day",
    Notifications: ">",
    'Subscription plan': "Free >",
    // Two_factor_authentication: "Enabled >",
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
              marginTop: 20,
              color: "#575453",
              alignSelf: "flex-start",
              letterSpacing: 2,
            }}
          >
            SECURITY
          </ThemedText>
        </View>
        <LineItem key="two-factor" title={"Two factor authentication"} value={"Enabled >"} />
      </View>
    </SafeAreaView>
  );
}
