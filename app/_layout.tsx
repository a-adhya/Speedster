import React, { useEffect } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Auth from "./screens/Auth";
import { View, ActivityIndicator } from "react-native";

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

// Root layout always renders a Slot
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(authenticated)" />
      </Stack>
      <AuthGuard />
    </AuthProvider>
  );
}

