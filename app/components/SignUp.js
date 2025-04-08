import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import SignUpFormStep1 from './SignUpFormStep1';
import SignUpFormStep2 from './SignUpFormStep2';
import { supabase } from '../utils/supabaseClient';

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData(data);
    setStep(2);
  };

  const handleSubmit = async (additionalData) => {
    const completeData = { ...formData, ...additionalData };
    try {
      const { error, data } = await supabase.auth.signUp({
        email: completeData.email,
        password: completeData.password,
      });
      if (error) throw error;

      // Insert user data into the "users" table
      const { insertError } = await supabase
        .from('users')
        .insert([{
          username: completeData.name,
          training_for: completeData.trainingFor || 'None',
          run_skill: parseInt(completeData.runSkill, 10),
          swim_skill: parseInt(completeData.swimSkill, 10),
          bike_skill: parseInt(completeData.bikeSkill, 10),
          current_location: completeData.location,
          goal: completeData.goal || 'None',
        }]);

      if (insertError) throw insertError;

      Alert.alert('Success', 'Verification email sent. Please check your inbox.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      {step === 1 ? (
        <SignUpFormStep1 onNext={handleNext} setStep={setStep} />
      ) : (
        <SignUpFormStep2 onSubmit={handleSubmit} setStep={setStep} />
      )}
    </View>
  );
} 