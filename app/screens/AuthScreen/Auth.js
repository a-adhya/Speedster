import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { useAuth } from '../../context/AuthContext';
import SignUpFormStep1 from '../../components/SignUpFormStep1';
import SignUpFormStep2 from '../../components/SignUpFormStep2';
import SignUp from '../../components/SignUp';

export default function Auth() {
  const [step, setStep] = useState(0); // 0 for sign-in, 1 for sign-up
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

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
    <View style={[styles.container, { backgroundColor: '#FE7743' }]}>
      {step === 0 ? (
        <>
        <Text style={[styles.title, { color: 'white' }]}>Welcome to Speedster</Text>
          <Input
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => setFormData({ ...formData, email: value })}
            autoCapitalize="none"
            keyboardType="email-address"
            inputStyle={{ color: 'white' }}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
          />
          <Input
            placeholder="Password"
            value={formData.password}
            onChangeText={(value) => setFormData({ ...formData, password: value })}
            secureTextEntry
            inputStyle={{ color: 'white' }}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
          />
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button 
              title="Sign in" 
              disabled={loading} 
              onPress={handleSignIn}
              buttonStyle={styles.button}
            />
          </View>
          <Text style={[styles.newToSpeedster, { color: 'white' }]}>New to Speedster?</Text>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button 
              title="Sign Up" 
              onPress={() => setStep(1)} // Navigate to the first sign-up form
              buttonStyle={styles.button}
            />
          </View>
        </>
      ) : (
        <SignUp />
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
    backgroundColor: '#219ebc'
  },
  newToSpeedster: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
}); 