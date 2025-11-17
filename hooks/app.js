import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập nội dung…"
        value={text}
        onChangeText={setText}
      />
      <Text style={styles.displayText}>
        {text.length > 0 ? text : 'Chưa có nội dung'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: '#888',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 8,
  },
  displayText: {
    marginTop: 20,
    fontSize: 20,
    color: '#333',
  },
});
