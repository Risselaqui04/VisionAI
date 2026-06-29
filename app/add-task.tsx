import { StyleSheet, Text, View } from "react-native";

export default function AddTaskScreen() {
  return (
    <View style={styles.container}>
      <Text>Add Task</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
});
