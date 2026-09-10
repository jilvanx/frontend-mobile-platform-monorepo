import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { buildProductImageUrl } from "@repo/shared";
import type { Product } from "@repo/shared";

export function ProductCard({ product }: { product: Product }) {
  const [, setImgError] = useState(false);
  const rawSrc = product.thumbnail || product.urlToken;
  const uri = buildProductImageUrl(rawSrc);
  const accessibilityLabel = product.name
    ? `Product photo for ${product.name}`
    : `Product ${product.urlToken}`;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri }}
        style={styles.image}
        resizeMode="cover"
        accessibilityLabel={accessibilityLabel}
        onError={() => setImgError(true)}
      />
      {product.name ? (
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
      ) : null}
    </View>
  );
}

export const ProfileCard = ProductCard;

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
