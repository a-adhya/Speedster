import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import DisciplineDropdown from '../../components/DisciplineDropdown';

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

  const athletes = [
    {
      profilePic: 'https://via.placeholder.com/50',
      name: 'Athlete 1',
      disciplines: [
        { icon: 'walk', expertise: 3 },
        { icon: 'bicycle', expertise: 2 },
      ],
      location: 'New York',
    },
    {
      profilePic: 'https://via.placeholder.com/50',
      name: 'Athlete 2',
      disciplines: [
        { icon: 'swim', expertise: 4 },
        { icon: 'bicycle', expertise: 5 },
      ],
      location: 'Los Angeles',
    },
    {
      profilePic: 'https://via.placeholder.com/50',
      name: 'Athlete 3',
      disciplines: [
        { icon: 'walk', expertise: 1 },
        { icon: 'swim', expertise: 3 },
        { icon: 'bicycle', expertise: 2 },
      ],
      location: 'Chicago',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>EXPLORE</Text>
      <View style={styles.filterRow}>
        <View style={styles.filterItem}>
          <Text>Range:</Text>
          <Picker selectedValue={range} onValueChange={(itemValue) => setRange(itemValue)}>
            {[5, 10, 20, 30, 40].map((value) => (
              <Picker.Item key={value} label={String(value)} value={String(value)} />
            ))}
          </Picker>
        </View>
        <View style={styles.filterItem}>
          <Text>Expertise:</Text>
          <Picker selectedValue={expertise} onValueChange={(itemValue) => setExpertise(itemValue)}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Picker.Item key={value} label={String(value)} value={String(value)} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.filterRow}>
        <View style={styles.filterItem}>
          <Text>Discipline:</Text>
          <DisciplineDropdown
            selectedDisciplines={selectedDisciplines}
            setSelectedDisciplines={setSelectedDisciplines}
          />
        </View>
        <View style={styles.filterItem}>
          <Text>Gender:</Text>
          <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)}>
            {['male', 'female', 'nonbinary'].map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
        </View>
      </View>
      {athletes.map((athlete, index) => (
        <AthleteView key={index} athlete={athlete} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
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
});