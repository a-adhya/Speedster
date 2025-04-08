import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { useAuth } from '../context/AuthContext';
import SignUpFormStep1 from './SignUpFormStep1';
import SignUpFormStep2 from './SignUpFormStep2';

export default function Auth() {
  const [step, setStep] = useState(0); // 0 for sign-in, 1 for sign-up step 1, 2 for sign-up step 2
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleNext = (data) => {
    setFormData(data);
    setStep(2);
  };

  const handleSubmitSignUp = async (additionalData) => {
    const completeData = { ...formData, ...additionalData };
    setLoading(true);
    try {
      const data = await signUp(completeData);
      if (!data.session) {
        Alert.alert('Verification email sent', 'Please check your inbox for email verification!');
        setStep(0); // Reset to the initial sign-in form
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      return Alert.alert('Missing fields', 'Please fill in all fields');
    }
    
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Speedster</Text>
      {step === 0 ? (
        <>
          <Input
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => setFormData({ ...formData, email: value })}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            placeholder="Password"
            value={formData.password}
            onChangeText={(value) => setFormData({ ...formData, password: value })}
            secureTextEntry
          />
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button 
              title="Sign in" 
              disabled={loading} 
              onPress={handleSignIn}
              buttonStyle={styles.button}
            />
          </View>
          <Text style={styles.newToSpeedster}>New to Speedster?</Text>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button 
              title="Sign Up" 
              onPress={() => setStep(1)} // Navigate to the first sign-up form
              buttonStyle={styles.button}
            />
          </View>
        </>
      ) : step === 1 ? (
        <SignUpFormStep1 onNext={handleNext} />
      ) : (
        <SignUpFormStep2 onSubmit={handleSubmitSignUp} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
  },
  newToSpeedster: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
}); 