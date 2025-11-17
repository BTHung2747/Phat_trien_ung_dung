import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  LogBox,
  StyleSheet,
  Switch,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';


LogBox.ignoreAllLogs();

export default function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

 
  const addTask = () => {
    if (!task.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên công việc!');
      return;
    }
    const now = new Date();
    const newTask = {
      id: Date.now().toString(),
      title: task,
      createdAt: now,
      completed: false,
      completedAt: null,
    };
    setTodos([newTask, ...todos]);
    setTask('');
  };

  // Xóa việc
  const removeTask = (id) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa công việc này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => setTodos(todos.filter(t => t.id !== id)) }
      ]
    );
  };

 
  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          const now = new Date();
          return {
            ...t,
            completed: !t.completed,
            completedAt: !t.completed ? now : null,
          };
        }
        return t;
      })
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => removeTask(item.id)}>
      <View style={[styles.item, item.completed && styles.completedItem]}>
        <View style={styles.itemRow}>
          <Text style={[styles.itemText, item.completed && styles.completedText]}>
            {item.title}
          </Text>
          <Switch
            value={item.completed}
            onValueChange={() => toggleComplete(item.id)}
          />
        </View>
        <Text style={styles.timeText}>
          Thêm: {item.createdAt.toLocaleString()}
        </Text>
        {item.completed && (
          <Text style={styles.timeText}>
            Hoàn thành: {item.completedAt.toLocaleString()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập việc cần làm..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Thêm</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Chưa có công việc nào</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 50,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  completedItem: {
    backgroundColor: '#d3f9d8',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});
