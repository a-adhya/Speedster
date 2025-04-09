import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../utils/supabaseClient';

export default function SignUpFormStep3({ onSubmit }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = `profile_${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(fileName, blob, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    return data.Key;
  };

  const handleSubmit = async () => {
    if (!image) {
      return Alert.alert('Error', 'Please upload an image of yourself.');
    }

    try {
      const imagePath = await uploadImage(image);
      const imageUrl = supabase.storage.from('profile-images').getPublicUrl(imagePath).publicURL;
      onSubmit({ profileImage: imageUrl });
    } catch (error) {
      Alert.alert('Error', 'Failed to upload image.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.plusSign}>+</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.instructionText}>Upload an image of yourself above.</Text>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  plusSign: {
    fontSize: 50,
    color: '#fff',
  },
  instructionText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
