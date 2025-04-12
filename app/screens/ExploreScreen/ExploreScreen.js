import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, View, Animated, ActivityIndicator, Image, Text, Alert } from 'react-native';
import { Card, Title, Paragraph, Appbar, Badge, Button } from 'react-native-paper';
import MultiSelectDropdown from '../../components/MultiSelectDropdown';
import SingleSelectDropdown from '../../components/SingleSelectDropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const hardCodedAthletes = [
  { name: 'Ryan', location: 'Ann Arbor', disciplines: ['run', 'swim'], image: require('../../images/ryan.jpg') },
  { name: 'Carolina', location: 'Ann Arbor', disciplines: ['run'], image: require('../../images/caro.jpg') },
  { name: 'Isaac', location: 'Dexter', disciplines: ['bike', 'swim'], image: require('../../images/isak.jpg') },
  { name: 'Ethan Smith', location: 'Canton', disciplines: ['bike'], image: require('../../images/antishu.jpg') },
];

const disciplineIcons = {
  run: 'run',
  swim: 'swim',
  bike: 'bike',
  triathlon: 'bike', // Use a relevant icon for triathlon
};

export default function ExploreScreen() {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [range, setRange] = useState(null);
  const [gender, setGender] = useState(null);
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [expertise, setExpertise] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const [loading, setLoading] = useState(false);
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const handleNotificationPress = () => {
    console.log('Notifications icon pressed');
    // Handle notification logic here
  };

  const handleSearchPress = () => {
    setLoading(true);
    setShowCards(false);
    setTimeout(() => {
      setLoading(false);
      setShowCards(true);
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 2000);
  };

  const handleClearPress = () => {
    setShowCards(false);
    cardOpacity.setValue(0);
    setRange(null);
    setGender(null);
    setSelectedDisciplines([]);
    setExpertise(null);
  };

  return (
    <>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="Explore" titleStyle={styles.appBarTitle} />
        <View>
          <Appbar.Action
            icon="bell"
            color="white"
            onPress={handleNotificationPress}
          />
          {hasNotifications && (
            <Badge style={styles.badge} size={8} />
          )}
        </View>
      </Appbar.Header>
      <View style={styles.dropdownContainer}>
        <View style={styles.row}>
          <SingleSelectDropdown
            options={[{label: 'Select Range (mi)', value: 'range'}, { label: '5 mi', value: '5' }, { label: '10 mi', value: '10' }, { label: '20 mi', value: '20' }, { label: '30 mi', value: '30' }, { label: '40 mi', value: '40' }, { label: '50 mi', value: '50' }]}
            selectedValue={range}
            setSelectedValue={setRange}
            zIndex={1000}
            label="Select Range (mi)"
          />
          <SingleSelectDropdown
            options={[{label: 'Select Gender', value: 'gender'}, { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'Non-binary', value: 'non-binary' }]}
            selectedValue={gender}
            setSelectedValue={setGender}
            zIndex={1000}
            label="Select Gender"
          />
        </View>
        <View style={styles.row}>
          <MultiSelectDropdown
            selectedDisciplines={selectedDisciplines}
            setSelectedDisciplines={setSelectedDisciplines}
            label="Select Disciplines"
          />
          <SingleSelectDropdown
            options={[{label: 'Select Expertise', value: 'expertise'}, {label: 'Novice', value: 'novice'}, { label: 'Beginner', value: '1' }, { label: 'Intermediate', value: '2' }, { label: 'Advanced', value: '3' }]}
            selectedValue={expertise}
            setSelectedValue={setExpertise}
            zIndex={999}
            label="Select Expertise"
          />
        </View>
        <Button mode="contained" onPress={handleSearchPress} style={styles.searchButton}>
          Search
        </Button>
        <Button mode="outlined" onPress={handleClearPress} style={styles.clearButton}>
          Clear
        </Button>
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2F6569" />
        </View>
      )}
      {showCards && (
        <Animated.ScrollView style={[styles.container, { opacity: cardOpacity }]}>
          {hardCodedAthletes.map((athlete, index) => (
            <Card key={index} style={styles.card}>
              <View style={styles.cardContent}>
                <Image source={athlete.image} style={styles.cardImage} />
                <View style={styles.cardText}>
                  <Title>{athlete.name}</Title>
                  <Paragraph>Location: {athlete.location}</Paragraph>
                  <View style={styles.disciplinesContainer}>
                    <Text style={styles.disciplinesLabel}>Disciplines:</Text>
                    {athlete.disciplines.map((discipline) => (
                      <MaterialCommunityIcons
                        key={discipline}
                        name={disciplineIcons[discipline]}
                        size={24}
                        color="black"
                        style={styles.disciplineIcon}
                      />
                    ))}
                  </View>
                </View>
                <View style={styles.cardButtons}>
                <Button mode="contained" style={styles.followButton} onPress={() => Alert.alert('You are now following Ryan Foster!')}>
                    Follow
                  </Button>
                  <Button mode="contained" style={styles.messageButton} onPress={() => router.navigate('../RyanProfileScreen/RyanProfileScreen')}>
                    Profile
                  </Button>
                </View>
              </View>
            </Card>
          ))}
        </Animated.ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardText: {
    flex: 1,
    justifyContent: 'center',
  },
  cardButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  followButton: {
    backgroundColor: '#541743',
    marginBottom: 5,
  },
  messageButton: {
    backgroundColor: '#43939A',
  },
  appBar: {
    backgroundColor: 'orange',
    elevation: 4, // Adds elevation for the shadow effect
  },
  appBarTitle: {
    color: 'white', // Set the title color to white
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
  },
  dropdownContainer: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#2F6569',
    marginBottom: 10,
  },
  clearButton: {
    borderColor: '#2F6569',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disciplinesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  disciplinesLabel: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  disciplineIcon: {
    marginRight: 5,
  },
});