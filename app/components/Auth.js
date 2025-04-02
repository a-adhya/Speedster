import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  async function handleSignIn() {
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
  }

  async function handleSignUp() {
    if (!email || !password) {
      return Alert.alert('Missing fields', 'Please fill in all fields');
    }
    
    setLoading(true);
    try {
        const data = await signUp(email, password);
        if (!data.session) {
          Alert.alert('Verification email sent', 'Please check your inbox for email verification!');
        }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Speedster</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button 
          title="Sign in" 
          disabled={loading} 
          onPress={handleSignIn}
          buttonStyle={styles.button}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button 
          title="Sign up" 
          disabled={loading} 
          onPress={handleSignUp}
          buttonStyle={styles.button}
          type="outline"
        />
      </View>
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
  }
}); 