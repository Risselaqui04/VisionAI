import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { imageToBase64 } from '../lib/gemini';

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams();
  const router = useRouter();

  async function handleAnalyze(promptKey) {
    const base64Image = await imageToBase64(photoUri);
    router.push({ pathname: '/ResultScreen', params: { base64Image, promptKey } });
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.preview} resizeMode="contain" />
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.retakeButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.analyzeRow}>
        <TouchableOpacity style={styles.academicButton} onPress={() => handleAnalyze('academic')}>
          <Text style={styles.buttonText}>🎓 Academic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.safetyButton} onPress={() => handleAnalyze('safety')}>
          <Text style={styles.buttonText}>⚠️ Safety</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inventoryButton} onPress={() => handleAnalyze('inventory')}>
          <Text style={styles.buttonText}>📋 Inventory</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  preview: { flex: 1 },
  actionRow: { flexDirection: 'row', justifyContent: 'center', paddingTop: 16, paddingHorizontal: 20 },
  analyzeRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, paddingBottom: 30 },
  retakeButton: { backgroundColor: '#5A6472', padding: 14, borderRadius: 8, paddingHorizontal: 30 },
  academicButton: { backgroundColor: '#5B3FA3', padding: 12, borderRadius: 8, flex: 1, marginHorizontal: 4, alignItems: 'center' },
  safetyButton: { backgroundColor: '#B3261E', padding: 12, borderRadius: 8, flex: 1, marginHorizontal: 4, alignItems: 'center' },
  inventoryButton: { backgroundColor: '#2E5BBA', padding: 12, borderRadius: 8, flex: 1, marginHorizontal: 4, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});