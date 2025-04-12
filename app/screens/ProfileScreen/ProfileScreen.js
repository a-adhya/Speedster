import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

export default function ProfileScreen() {
  const handleFollowOnStrava = () => {
    Alert.alert('Navigating to your Strava profile...');
  };

  const disciplineIcons = {
    run: 'run',
    swim: 'swim',
    bike: 'bike',
    triathlon: 'bike', // Use a relevant icon for triathlon
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../images/banner.jpeg')}
        style={styles.banner}
        resizeMode="cover"
      />
      <View style={styles.profileSection}>
        <Image source={require('../../images/shu2.jpg')} style={styles.profilePic} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Shu Adhya</Text>
          <Text style={styles.location}>Ann Arbor</Text>
          <View style={styles.followContainer}>
            <TouchableOpacity style={styles.followBox}>
              <Text style={styles.followCount}>120</Text>
              <Text style={styles.followText}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followBox}>
              <Text style={styles.followCount}>150</Text>
              <Text style={styles.followText}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.detailsSection}>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Disciplines</Text>
          <View style={styles.disciplinesContainer}>
            <MaterialCommunityIcons name="run" size={24} color="black" style={styles.disciplineIcon} />
            <MaterialCommunityIcons name="swim" size={24} color="black" style={styles.disciplineIcon} />
            <MaterialCommunityIcons name="bike" size={24} color="black" style={styles.disciplineIcon} />
          </View>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Expertise</Text>
          <Text style={styles.detailText}>Beginner</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Upcoming Races</Text>
          <Text style={styles.detailText}>Big House 5K</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Availability</Text>
          <Text style={styles.detailText}>Monday, Tuesday, Saturday</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Current Goal</Text>
          <Text style={styles.detailText}>Complete an Olympic-Distance Triathlon</Text>
        </View>
      </View>
      <Button mode="contained" onPress={handleFollowOnStrava} style={styles.stravaButton}>
        Your Strava Profile
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 200,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: 'gray',
  },
  followContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  followBox: {
    alignItems: 'center',
    marginRight: 20,
  },
  followCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  followText: {
    fontSize: 16,
    color: 'gray',
  },
  detailsSection: {
    padding: 20,
  },
  detailItem: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
  },
  disciplinesContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  disciplineIcon: {
    marginRight: 10,
  },
  stravaButton: {
    backgroundColor: 'orange',
    margin: 20,
  },
});