import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function RootLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: '#6646EC',
        tabBarIconStyle: { display: "none" },
        tabBarStyle: {
          backgroundColor: '#D9D9D9',
          borderTopWidth: 1,
          borderTopColor: '#FFFFFF',
          height: 76,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarLabel: ({ focused, color }) => (
            <TabLabel focused={focused} color={color} label="TODAY" />
          ),
        }}
      />
      <Tabs.Screen
        name="reflection"
        options={{
          title: 'REFLECTION',
          tabBarLabel: ({ focused, color }) => (
            <TabLabel focused={focused} color={color} label="REFLECTION" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarLabel: ({ focused, color }) => (
            <TabLabel focused={focused} color={color} label="PROFILE" />
          ),
        }}
      />
      <Tabs.Screen
        name="sandbox"
        options={{
          title: 'SANDBOX',
          tabBarLabel: ({ focused, color }) => (
            <TabLabel focused={focused} color={color} label="SANDBOX" />
          ),
        }}
      />
    </Tabs>
  );
}

// Custom TabLabel component to have more control over the appearance
function TabLabel({ focused, color, label }: { focused: boolean; color: string; label: string }) {
  return (
    <Text 
      style={{ 
        fontSize: 9,
        marginTop: 16,
        letterSpacing: 1,
        borderBottomWidth: focused ? 1 : 0,
        borderBottomColor: "black",
        paddingBottom: 10,
      }}
    >
      {label}
    </Text>
  );
}