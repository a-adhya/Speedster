import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { Stack } from 'expo-router';
import ExploreScreen from './screens/ExploreScreen/ExploreScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import MessagesScreen from './screens/MessagesScreen/MessagesScreen';

const ExploreRoute = () => (
  <Stack>
    <Stack.Screen options={{ headerShown: false }} name="ExploreScreen" />
    <Stack.Screen options={{ headerShown: false }} name="ExploreScreen/RyanProfileScreen" />
  </Stack>
);

const ProfileRoute = () => <ProfileScreen />;
const MessagesRoute = () => <MessagesScreen />;

export default function RootLayout() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'explore', title: 'Explore', focusedIcon: 'compass', unfocusedIcon: 'compass' },
    { key: 'messages', title: 'Messages', focusedIcon: 'message', unfocusedIcon: 'message' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    explore: ExploreRoute,
    messages: MessagesRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

