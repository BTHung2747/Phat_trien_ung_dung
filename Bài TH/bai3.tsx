import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Map tên Việt -> tên quốc tế
  const cityMap = {
    'hà nội': 'Hanoi',
    'thành phố hồ chí minh': 'Ho Chi Minh',
    'đà nẵng': 'Da Nang',
    'cần thơ': 'Can Tho',
    'hải phòng': 'Hai Phong',
    'nha trang': 'Nha Trang',
    // Thêm các thành phố khác nếu muốn
  };

  // Lấy tọa độ từ Nominatim
  const fetchCoordinates = async (cityName) => {
    try {
      const query = cityMap[cityName.toLowerCase()] || cityName;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data || data.length === 0) return null;
      return { lat: data[0].lat, lon: data[0].lon };
    } catch (err) {
      console.log('Error fetching coordinates:', err);
      return null;
    }
  };

  // Lấy dữ liệu thời tiết từ Open-Meteo
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Vui lòng nhập tên thành phố!');
      setWeather(null);
      return;
    }

    setError('');
    setWeather(null);
    setLoading(true);

    try {
      const coords = await fetchCoordinates(city);
      if (!coords) {
        setError('Không tìm thấy thành phố!');
        setLoading(false);
        return;
      }

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;
      const res = await fetch(weatherUrl);
      const data = await res.json();

      console.log('Weather API data:', data);

      if (data && data.current_weather) {
        setWeather({
          temperature: data.current_weather.temperature ?? 'N/A',
          windspeed: data.current_weather.windspeed ?? 'N/A',
        });
      } else {
        setError('Không thể lấy dữ liệu thời tiết!');
      }
    } catch (err) {
      console.log('Error fetching weather:', err);
      setError('Lỗi khi lấy dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên thành phố"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Xem thời tiết" onPress={fetchWeather} />

      {loading && (
        <View style={{ marginTop: 10 }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loading}>Đang tải…</Text>
        </View>
      )}

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {weather && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Nhiệt độ hiện tại: {weather.temperature}°C</Text>
          <Text style={styles.resultText}>Tốc độ gió: {weather.windspeed} km/h</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  input: {
    height: 50,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  loading: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginTop: 5,
  },
  error: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
