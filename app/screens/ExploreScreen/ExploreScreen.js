import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import SingleSelectDropdown from '../../components/SingleSelectDropdown';
import MultiSelectDropdown from '../../components/MultiSelectDropdown';
import { supabase } from '../../utils/supabaseClient';

const AthleteView = ({ athlete }) => (
  <View style={styles.athleteContainer}>
    <Image source={{ uri: athlete.profilePic }} style={styles.profilePic} />
    <View style={styles.athleteInfo}>
      <Text style={styles.athleteName}>{athlete.name}</Text>
      <Text style={styles.athleteDetail}>
        Disciplines: {athlete.disciplines.map((d, index) => (
          <Text key={index}>
            <Ionicons name={d.icon} size={16} /> ({d.expertise})
          </Text>
        ))}
      </Text>
      <Text style={styles.athleteDetail}>Current Location: {athlete.location}</Text>
    </View>
    <View style={styles.athleteActions}>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionText}>Follow</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionText}>Message</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const fetchLatLong = async (location) => {

  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${process.env.EXPO_PUBLIC_OPENCAGE_API_KEY}`);
  const data = await response.json();
  if (data.results.length > 0) {
    return {
      lat: data.results[0].geometry.lat,
      lng: data.results[0].geometry.lng,
    };
  }
  throw new Error('Location not found');
};

const fetchCitiesWithinRange = async (lat, lng, range) => {
  const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${lat}${lng}/nearbyCities?radius=${range}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_GEODB_API_KEY,
      'X-RapidAPI-Host': process.env.EXPO_PUBLIC_GEODB_URL,
    },
  });
  const data = await response.json();
  return data.data.map(city => city.city);
};

export default function ExploreScreen() {
  const [range, setRange] = useState('5');
  const [expertise, setExpertise] = useState('1');
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [gender, setGender] = useState('male');
  const [athletes, setAthletes] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const sessionEmail = user.email.trim();
        const { data, error } = await supabase
          .from('users')
          .select('current_location')
          .eq('email', sessionEmail)
          .single();

        if (error) throw error;
        setUserLocation(data.current_location);
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };

    if (user) {
      fetchUserLocation();
    }
  }, [user]);

  const fetchAthletes = async () => {
    try {
      if (!userLocation) {
        Alert.alert('Error', 'User location not found');
        return;
      }

      const { lat, lng } = await fetchLatLong(userLocation);
      const cities = await fetchCitiesWithinRange(lat, lng, range);

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .in('current_location', cities)
        .eq('expertise', expertise)
        .eq('gender', gender)
        .limit(10);

      if (error) throw error;
      setAthletes(data);
    } catch (error) {
      console.error('Error fetching athletes:', error);
      Alert.alert('No results found');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.headerText}>EXPLORE</Text>
        </View>
        <View style={styles.filterRow}>
          <View style={styles.filterItem}>
            <Text>Range:</Text>
            <SingleSelectDropdown
              options={[
                { label: '5', value: '5' },
                { label: '10', value: '10' },
                { label: '20', value: '20' },
                { label: '30', value: '30' },
                { label: '40', value: '40' },
              ]}
              selectedValue={range}
              setSelectedValue={setRange}
              zIndex={1000}
            />
          </View>
          <View style={styles.filterItem}>
            <Text>Expertise:</Text>
            <SingleSelectDropdown
              options={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
              ]}
              selectedValue={expertise}
              setSelectedValue={setExpertise}
              zIndex={1000}
            />
          </View>
        </View>
        <View style={styles.filterRow}>
          <View style={styles.filterItem}>
            <Text>Discipline:</Text>
            <MultiSelectDropdown
              selectedDisciplines={selectedDisciplines}
              setSelectedDisciplines={setSelectedDisciplines}
            />
          </View>
          <View style={styles.filterItem}>
            <Text>Gender:</Text>
            <SingleSelectDropdown
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Nonbinary', value: 'nonbinary' },
              ]}
              selectedValue={gender}
              setSelectedValue={setGender}
              zIndex={999}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={fetchAthletes}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        {athletes.map((athlete, index) => (
          <AthleteView key={index} athlete={athlete} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 20,
  },
  header: {
    backgroundColor: 'orange',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  athleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  athleteInfo: {
    flex: 1,
  },
  athleteName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  athleteDetail: {
    fontSize: 14,
    color: 'gray',
  },
  athleteActions: {
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 5,
    marginVertical: 2,
  },
  actionText: {
    color: 'white',
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
  },
});