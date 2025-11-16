import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

// === AI ANALISIS SEDERHANA === //
const simpleAI = (price) => {
  if (!price) return "Masukkan harga terlebih dahulu.";

  const p = parseFloat(price);

  if (p < 20) return "AI: Harga sangat murah → POTENSI NAIK 📈";
  if (p >= 20 && p < 50) return "AI: Harga dalam fase stabil → HOLD ⚖️";
  if (p >= 50 && p < 80) return "AI: Waspada! Harga mulai mahal → MUNGKIN TURUN 📉";

  return "AI: Harga terlalu tinggi → RISIKO BESAR ❗";
};

// === INDIKATOR TRADING === //
const movingAverage = (prices) => {
  if (prices.length < 3) return "Data kurang (minimal 3)";
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
  return "MA (Rata-rata): " + avg.toFixed(2);
};

const rsiIndicator = (prices) => {
  if (prices.length < 3) return "Data kurang (minimal 3)";
  const last = prices[prices.length - 1];
  const prev = prices[prices.length - 2];

  if (last > prev) return "RSI: Tren Naik (Bullish) 🟢";
  if (last < prev) return "RSI: Tren Turun (Bearish) 🔴";
  return "RSI: Sideways ⚪";
};

export default function App() {
  const [price, setPrice] = useState("");
  const [history, setHistory] = useState([]);

  const handleAddPrice = () => {
    if (!price) return;
    setHistory([...history, parseFloat(price)]);
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>📈 Trading AI Pro Max</Text>

      <Text style={styles.label}>Masukkan Harga</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="contoh: 35.5"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddPrice}>
        <Text style={styles.buttonText}>Tambahkan Harga</Text>
      </TouchableOpacity>

      {/* AI ANALISIS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🤖 Analisis AI</Text>
        <Text style={styles.cardText}>{simpleAI(price)}</Text>
      </View>

      {/* Indikator Trading */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Indikator Trading</Text>
        <Text style={styles.cardText}>{movingAverage(history)}</Text>
        <Text style={styles.cardText}>{rsiIndicator(history)}</Text>
      </View>

      {/* Riwayat Harga */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📘 Riwayat Harga</Text>
        {history.map((h, i) => (
          <Text key={i} style={styles.cardText}>• {h}</Text>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#121212" },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 15 },
  label: { color: "#fff", marginBottom: 5, fontSize: 16 },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: "#00a8ff", padding: 15, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  card: { backgroundColor: "#1f1f1f", padding: 15, borderRadius: 10, marginTop: 15 },
  cardTitle: { color: "#00e6e6", fontSize: 20, marginBottom: 10, fontWeight: "bold" },
  cardText: { color: "#fff", fontSize: 16, marginTop: 3 },
});