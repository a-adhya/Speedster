import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "./context/AuthContext";
import Auth from "./screens/AuthScreen/Auth";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { user, loading } = useAuth();
  
  // Show loading indicator while checking auth
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  // If user is authenticated, redirect to home
  if (user) {
    return <Redirect href="/(authenticated)/home" />;
  }
  
  // Otherwise, show the Auth component
  return <Auth />;
}
