import { FlatList, StyleSheet, View } from "react-native";
import type { Profile } from "@repo/shared";
import { ProfileCard } from "./ProfileCard";

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
});

type ProfileGridProps = {
  profiles: Profile[];
};

export function ProfileGrid({ profiles }: ProfileGridProps) {
  return (
    <FlatList
      data={profiles}
      keyExtractor={(item) => item.urlToken}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => <ProfileCard profile={item} />}
    />
  );
}
