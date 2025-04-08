import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabaseClient';
import styles from './ProfileScreenStyles';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //console.log('Fetching user data for email:', user);
        const sessionEmail = user.email.trim();

        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', sessionEmail)
          .single();
        
        // console.log('Fetched user data:', data);

        if (error) throw error;
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        //Alert.alert('Error fetching user data', error.message);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('Error signing out', error.message);
    }
  };

  const handleFollowersPress = () => {
    Alert.alert('Followers', 'Navigate to Followers List');
  };

  const handleFollowingPress = () => {
    Alert.alert('Following', 'Navigate to Following List');
  };

  return (
    <SafeAreaView style={styles.container}>
      {userData ? (
        <>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.profilePic}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{userData.username}</Text>
              <View style={styles.followContainer}>
                <TouchableOpacity style={styles.followBox} onPress={handleFollowersPress}>
                  <Text style={styles.followText}>Followers</Text>
                  <Text style={styles.followCount}>{userData.followers}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.followBox} onPress={handleFollowingPress}>
                  <Text style={styles.followText}>Following</Text>
                  <Text style={styles.followCount}>{userData.following}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.detailsSection}>
            <View style={styles.detailItem}>
              <Text style={styles.detailTitle}>Activities:</Text>
              <View style={styles.iconsContainer}>
                <Ionicons name="walk" size={24} color="black" />
                <Ionicons name="bicycle" size={24} color="black" />
                <Ionicons name="swim" size={24} color="black" />
              </View>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailTitle}>Training for:</Text>
              <Text style={styles.detailText}>{userData.training_for ? userData.training_for : 'Not set'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailTitle}>Based in:</Text>
              <Text style={styles.detailText}>{userData.current_location ? userData.current_location : 'Not set'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailTitle}>Goal:</Text>
              <Text style={styles.detailText}>{userData.goal ? userData.goal : 'Not set'}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.signOutButton} 
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={24} color="red" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
}