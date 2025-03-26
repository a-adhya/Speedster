import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const disciplines = ['run', 'swim', 'bike', 'triathlon'];

export default function DisciplineDropdown({ selectedDisciplines, setSelectedDisciplines }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDiscipline = (discipline) => {
    if (selectedDisciplines.includes(discipline)) {
      setSelectedDisciplines(selectedDisciplines.filter((d) => d !== discipline));
    } else {
      setSelectedDisciplines([...selectedDisciplines, discipline]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.dropdownButtonText}>Select Disciplines</Text>
        <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} color="black" />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownContent}>
          {disciplines.map((discipline) => (
            <TouchableOpacity
              key={discipline}
              style={styles.checkboxContainer}
              onPress={() => toggleDiscipline(discipline)}
            >
              <Ionicons
                name={selectedDisciplines.includes(discipline) ? 'checkbox' : 'square-outline'}
                size={24}
                color="black"
              />
              <Text style={styles.checkboxText}>{discipline}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  dropdownContent: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
  },
}); 