import React, { useEffect } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Auth from "./screens/Auth";
import { View, ActivityIndicator } from "react-native";
import { BottomNavigation } from 'react-native-paper';
import AuthGuard from './AuthGuard';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen/MessagesScreen';

// This is a separate component that handles authentication logic
function AuthGuard() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  
  useEffect(() => {
    // Skip this effect when still loading
    if (loading) return;
    
    // Define which segments are protected (require authentication)
    const inAuthGroup = segments[0] === "(authenticated)";
    
    if (!user && inAuthGroup) {
      // Redirect to the auth screen if user is not authenticated
      // and trying to access a protected route
      router.replace("/");
    } else if (user && !inAuthGroup) {
      // Redirect to the home screen if user is authenticated
      // and trying to access an unprotected route
      router.replace("/(authenticated)/home");
    }
  }, [user, loading, segments]);
  
  return null;
}

const HomeRoute = () => <HomeScreen />;
const ExploreRoute = () => <ExploreScreen />;
const ProfileRoute = () => <ProfileScreen />;
const MessagesRoute = () => <MessagesScreen />;

// Root layout always renders a Slot
export default function AuthenticatedLayout() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'explore', title: 'Explore', icon: 'compass' },
    { key: 'messages', title: 'Messages', icon: 'chatbubbles' },
    { key: 'profile', title: 'Profile', icon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    explore: ExploreRoute,
    messages: MessagesRoute,
    profile: ProfileRoute,
  });

  return (
    <AuthProvider>
      <AuthGuard />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </AuthProvider>
  );
}

