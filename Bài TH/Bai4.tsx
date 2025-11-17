import { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');       
  const [todos, setTodos] = useState([]);     

  
  const addTask = () => {
    if (task.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập công việc!');
      return;
    }
    setTodos([...todos, { id: Date.now().toString(), title: task }]);
    setTask('');
  };


  const removeTask = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => removeTask(item.id)}>
      <Text style={styles.item}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập công việc..."
        value={task}
        onChangeText={setTask}
      />
      <Button title="Thêm việc" onPress={addTask} />

      <FlatList
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
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    marginBottom: 10,
  },
  item: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  empty: {
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
