import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ProductGrid } from "./components";
import { DISPLAY_LIMIT } from "./config";
import { useProducts } from "./hooks/useProducts";

export default function App() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.subtitle}>Loading…</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>No products to show.</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  const listData = products.slice(0, DISPLAY_LIMIT);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Products</Text>
      <Text style={styles.subtitle}>React Native – same shared module as web apps.</Text>
      <ProductGrid products={listData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: 56,
    paddingHorizontal: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 16,
  },
  error: {
    fontSize: 16,
    color: "#dc2626",
  },
});
