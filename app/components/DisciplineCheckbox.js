import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const disciplines = ['run', 'swim', 'bike', 'triathlon'];

export default function DisciplineCheckbox({ selectedDisciplines, setSelectedDisciplines }) {
  const toggleDiscipline = (discipline) => {
    if (selectedDisciplines.includes(discipline)) {
      setSelectedDisciplines(selectedDisciplines.filter((d) => d !== discipline));
    } else {
      setSelectedDisciplines([...selectedDisciplines, discipline]);
    }
  };

  return (
    <View style={styles.container}>
      {disciplines.map((discipline) => (
        <TouchableOpacity
          key={discipline}
          style={[
            styles.checkbox,
            selectedDisciplines.includes(discipline) && styles.selectedCheckbox,
          ]}
          onPress={() => toggleDiscipline(discipline)}
        >
          <Text style={styles.checkboxText}>{discipline}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedCheckbox: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  checkboxText: {
    color: '#000',
  },
}); 