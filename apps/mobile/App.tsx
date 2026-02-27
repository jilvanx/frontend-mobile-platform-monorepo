import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ProfileGrid } from "./components";
import { DISPLAY_LIMIT } from "./config";
import { useProfiles } from "./hooks/useProfiles";

export default function App() {
  const { profiles, loading, error } = useProfiles();

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

  if (profiles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>No profiles to show.</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  const listData = profiles.slice(0, DISPLAY_LIMIT);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Profiles</Text>
      <Text style={styles.subtitle}>React Native – same shared module as web apps.</Text>
      <ProfileGrid profiles={listData} />
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
