import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function SignUpFormStep2({ onSubmit, setStep }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [trainingFor, setTrainingFor] = useState('');
  const [runSkill, setRunSkill] = useState('1');
  const [swimSkill, setSwimSkill] = useState('1');
  const [bikeSkill, setBikeSkill] = useState('1');
  const [goal, setGoal] = useState('');

  const handleSubmit = () => {
    if (!name || !location) {
      return Alert.alert('Error', 'Name and Location are required');
    }
    onSubmit({ name, location, trainingFor, runSkill, swimSkill, bikeSkill, goal });
  };

  return (
    <View style={styles.container}>
      <Text>Name *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
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
      <RNPickerSelect
        onValueChange={setRunSkill}
        items={[1, 2, 3, 4, 5].map(value => ({ label: String(value), value: String(value) }))}
        value={runSkill}
      />
      <Text>Swimming Skill Level</Text>
      <RNPickerSelect
        onValueChange={setSwimSkill}
        items={[1, 2, 3, 4, 5].map(value => ({ label: String(value), value: String(value) }))}
        value={swimSkill}
      />
      <Text>Biking Skill Level</Text>
      <RNPickerSelect
        onValueChange={setBikeSkill}
        items={[1, 2, 3, 4, 5].map(value => ({ label: String(value), value: String(value) }))}
        value={bikeSkill}
      />
      <Text>Goal</Text>
      <TextInput
        style={styles.input}
        value={goal}
        onChangeText={setGoal}
        placeholder="Your goal"
      />
      <Button title="Submit" onPress={handleSubmit} />
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
  },
}); 