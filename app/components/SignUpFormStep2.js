import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import SingleSelectDropdown from './SingleSelectDropdown';

export default function SignUpFormStep2({ onNext }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('Select Gender');
  const [trainingFor, setTrainingFor] = useState('');
  const [runSkill, setRunSkill] = useState('1');
  const [swimSkill, setSwimSkill] = useState('1');
  const [bikeSkill, setBikeSkill] = useState('1');
  const [goal, setGoal] = useState('');

  const handleNext = () => {
    if (!name || !location) {
      return Alert.alert('Error', 'Name and Location are required');
    }
    // Combine previous form data with current form data
    const currentFormData = {
      name,
      location,
      gender,
      trainingFor,
      runSkill,
      swimSkill,
      bikeSkill,
      goal,
    };
    onNext({ ...currentFormData });
  };

  return (
    <View style={styles.container}>
      <Text>Name *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text>Gender *</Text>
      <SingleSelectDropdown
        options={[
          { label: 'Select Gender', value: 'Select Gender' },
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Nonbinary', value: 'nonbinary' },
        ]}
        selectedValue={gender}
        setSelectedValue={setGender}
        zIndex={999}
      />
      <Text>Location *</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="City, State"
      />
      <Text>Training for</Text>
      <TextInput
        style={styles.input}
        value={trainingFor}
        onChangeText={setTrainingFor}
        placeholder="Marathon, Ironman Triathlon, etc"
      />
      <Text>Running Skill Level</Text>
      <SingleSelectDropdown
        options={[
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
        ]}
        selectedValue={runSkill}
        setSelectedValue={setRunSkill}
        zIndex={1001}
      />
      <Text>Swimming Skill Level</Text>
      <SingleSelectDropdown
        options={[
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
        ]}
        selectedValue={swimSkill}
        setSelectedValue={setSwimSkill}
        zIndex={1000}
      />
      <Text>Biking Skill Level</Text>
      <SingleSelectDropdown
        options={[
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
        ]}
        selectedValue={bikeSkill}
        setSelectedValue={setBikeSkill}
        zIndex={999}
      />
      <Text>Goal</Text>
      <TextInput
        style={styles.input}
        value={goal}
        onChangeText={setGoal}
        placeholder="Your goal"
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
}); 