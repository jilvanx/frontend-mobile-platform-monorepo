import { FlatList, StyleSheet, View } from "react-native";
import type { Product } from "@repo/shared";
import { ProductCard } from "./ProductCard";

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
});

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.urlToken}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => <ProductCard product={item} />}
    />
  );
}

export const ProfileGrid = ProductGrid;
