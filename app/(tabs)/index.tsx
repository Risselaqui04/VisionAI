import React, { useEffect, useState } from "react";
import {
  StyleSheet
} from "react-native";
import Toast from "react-native-toast-message";
import { supabase } from "../../lib/supabase";
import CameraScreen from "../CameraScreen";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  async function loadTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log("Error loading tasks:", error.message);
      return;
    }
    setTasks(data);
  }

  async function handleSubmitTask(title: string) {
    const { error } = await supabase
      .from("tasks")
      .insert([{ title, completed: false }]);
    if (error) {
      Toast.show({
        type: "error",
        text1: "Could not add task",
        text2: error.message,
      });
      return;
    }
    setModalVisible(false);
    loadTasks();
    Toast.show({ type: "success", text1: "Task added" });
  }

  async function toggleTask(item: any) {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !item.completed })
      .eq("id", item.id);
    if (error) {
      console.log("Error updating task:", error.message);
      return;
    }
    loadTasks();
  }

  async function handleDeleteTask(id: any) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      Toast.show({ type: "error", text1: "Could not delete task" });
      return;
    }
    loadTasks();
    Toast.show({ type: "success", text1: "Task deleted" });
  }

  function handleAddTask() {
    handleSubmitTask(task);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return <CameraScreen />;
}

const headerStyles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#1F2A44" },
});

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: "#fff" },
});
