import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

export default function SignUpFormStep1({ onNext, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = () => {
    if (!email || !password || !confirmPassword) {
      return Alert.alert('Error', 'All fields are required');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }
    onNext({ email, password });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Some Basic Information...</Text>
      
      <TextInput
        label="Email *"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      
      <TextInput
        label="Password *"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      
      <TextInput
        label="Confirm Password *"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined" 
          onPress={onBack}
          style={styles.button}
        >
          Back
        </Button>
        <Button 
          mode="contained" 
          onPress={handleNext}
          style={styles.button}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFA500',
    flex: 1,
  },
  title: {
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
}); 