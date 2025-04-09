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

export default function ExploreScreen() {
  const [range, setRange] = useState('5');
  const [expertise, setExpertise] = useState('1');
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [gender, setGender] = useState('male');
  const [athletes, setAthletes] = useState([]);

  const fetchAthletes = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('range', range)
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
    height: '25%', // Takes up the top 25% of the screen
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
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});