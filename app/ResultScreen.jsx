import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { analyzeImage, ANALYSIS_PROMPT } from '../lib/gemini';

export default function ResultScreen() {
  const { base64Image } = useLocalSearchParams();
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function analyze() {
      try {
        const response = await analyzeImage(base64Image, ANALYSIS_PROMPT);
        console.log('Gemini response:', JSON.stringify(response));
        const text = response.candidates[0].content.parts[0].text;
        const clean = text.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(clean);
        setResult(parsed);
      } catch (err) {
        setError('Failed to analyze image. Please try again.');
        console.log('Analysis error:', err);
      } finally {
        setLoading(false);
      }
    }
    analyze();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#5B3FA3" />
        <Text style={styles.loadingText}>Analyzing image...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Analysis Result</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Objects</Text>
        {result.objects.map((obj, i) => (
          <Text key={i} style={styles.item}>• {obj}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Context</Text>
        <Text style={styles.item}>{result.context}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Activities</Text>
        <Text style={styles.item}>{result.activities}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Recommendations</Text>
        <Text style={styles.item}>{result.recommendations}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Take Another Photo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#1F2A44', marginBottom: 20, marginTop: 10 },
  section: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#5B3FA3', marginBottom: 6 },
  item: { fontSize: 15, color: '#333', marginBottom: 4 },
  loadingText: { marginTop: 12, fontSize: 16, color: '#555' },
  errorText: { fontSize: 16, color: 'red', marginBottom: 16, textAlign: 'center' },
  button: { backgroundColor: '#5B3FA3', padding: 14, borderRadius: 8, alignItems: 'center', marginVertical: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});