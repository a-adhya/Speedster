import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import styles from './ProfileScreenStyles';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const userEmail = user?.email || 'No email';
  const userName = user?.user_metadata?.name || userEmail.split('@')[0] || 'User';

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
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.profilePic}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{userName}</Text>
          <View style={styles.followContainer}>
            <TouchableOpacity style={styles.followBox} onPress={handleFollowersPress}>
              <Text style={styles.followText}>Followers</Text>
              <Text style={styles.followCount}>123</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followBox} onPress={handleFollowingPress}>
              <Text style={styles.followText}>Following</Text>
              <Text style={styles.followCount}>456</Text>
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
          <Text style={styles.detailText}>Marathon</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Based in:</Text>
          <Text style={styles.detailText}>New York City</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Goal:</Text>
          <Text style={styles.detailText}>Run a sub-3 hour marathon</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.signOutButton} 
        onPress={handleSignOut}
      >
        <Ionicons name="log-out-outline" size={24} color="red" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}