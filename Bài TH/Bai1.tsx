import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Hiển Thị Nội Dung Nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập nội dung..."
        value={text}
        onChangeText={setText}
      />

      <View style={styles.displayBox}>
        <Text style={styles.displayText}>
          {text.trim() !== '' ? text : 'Chưa có nội dung'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f7',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  displayBox: {
    minHeight: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  displayText: {
    fontSize: 18,
    color: '#555',
  },
});
