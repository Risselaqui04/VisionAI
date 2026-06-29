import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
};

type TaskItemProps = {
  item: Task;
  onToggle: (item: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ item, onToggle, onDelete }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.left} onPress={() => onToggle(item)}>
        <MaterialIcons
          name={item.completed ? "check-circle" : "radio-button-unchecked"}
          size={24}
          color={item.completed ? "#2E5BBA" : "#ccc"}
        />
        <Text style={[styles.title, item.completed && styles.completed]}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <MaterialIcons name="delete-outline" size={22} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
    color: "#1F2A44",
    flex: 1,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
});
