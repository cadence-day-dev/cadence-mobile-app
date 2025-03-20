import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { useUserStore } from '@/stores/useUserStore';
import LoginComponent from '@/components/Screens/Login';
import { useEffect } from 'react';
import { supabase } from '@/components/utils/client';


export default function RootLayout() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.name || '',
          email: session.user.email || '',
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.name || '',
          email: session.user.email || '',
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // If no user is logged in, show the login screen
  if (!user) {
    return (
      <View style={{ flex: 1 }}>
        <LoginComponent />
      </View>
    );
  }

  // If user is logged in, show the main app
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
          zIndex: 1000,
          elevation: 1000, // for Android
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