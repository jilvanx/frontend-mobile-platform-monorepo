import { Image, StyleSheet, Text, View } from "react-native";
import { buildProfileImageUrl } from "@repo/shared";
import type { Profile } from "@repo/shared";

export function ProfileCard({ profile }: { profile: Profile }) {
  const uri = buildProfileImageUrl(profile.urlToken);
  const accessibilityLabel = profile.name
    ? `Profile photo for ${profile.name}`
    : `Profile ${profile.urlToken}`;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri }}
        style={styles.image}
        resizeMode="cover"
        accessibilityLabel={accessibilityLabel}
      />
      {profile.name ? (
        <Text style={styles.name} numberOfLines={1}>
          {profile.name}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  name: {
    padding: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#334155",
  },
});
