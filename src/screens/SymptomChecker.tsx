import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Symptom {
  id: string;
  name: string;
  severity: number;
  duration: string;
}

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [severity, setSeverity] = useState(5);

  const addSymptom = () => {
    if (currentSymptom.trim()) {
      const newSymptom: Symptom = {
        id: Date.now().toString(),
        name: currentSymptom.trim(),
        severity,
        duration: '1-2 days' // We'll make this dynamic later
      };
      setSymptoms([...symptoms, newSymptom]);
      setCurrentSymptom('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Symptom Checker</Text>
        
        <View style={styles.inputSection}>
          <Text style={styles.label}>Describe your symptom:</Text>
          <TextInput
            style={styles.input}
            value={currentSymptom}
            onChangeText={setCurrentSymptom}
            placeholder="e.g., headache, fever, cough..."
            multiline
          />
          
          <Text style={styles.label}>Severity (1-10):</Text>
          <View style={styles.severityContainer}>
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.severityButton,
                  severity === num && styles.severityButtonActive
                ]}
                onPress={() => setSeverity(num)}
              >
                <Text style={[
                  styles.severityText,
                  severity === num && styles.severityTextActive
                ]}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity style={styles.addButton} onPress={addSymptom}>
            <Text style={styles.addButtonText}>Add Symptom</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.symptomsSection}>
          <Text style={styles.sectionTitle}>Your Symptoms:</Text>
          {symptoms.map(symptom => (
            <View key={symptom.id} style={styles.symptomCard}>
              <Text style={styles.symptomName}>{symptom.name}</Text>
              <Text style={styles.symptomDetails}>
                Severity: {symptom.severity}/10 | Duration: {symptom.duration}
              </Text>
            </View>
          ))}
        </View>

        {symptoms.length > 0 && (
          <TouchableOpacity style={styles.analyzeButton}>
            <Text style={styles.analyzeButtonText}>Analyze Symptoms</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 60,
  },
  severityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  severityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  severityButtonActive: {
    backgroundColor: '#3498db',
  },
  severityText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  severityTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  symptomsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  symptomCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  symptomName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  symptomDetails: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  analyzeButton: {
    backgroundColor: '#e74c3c',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});