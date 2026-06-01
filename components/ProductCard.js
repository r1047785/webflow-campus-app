import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export default function ProductCard({ product, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.accentBar} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>EUR {product.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 9,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 3
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 10,
    backgroundColor: colors.primary,
    zIndex: 1
  },
  image: {
    width: "100%",
    height: 150
  },
  content: {
    padding: 16,
    paddingLeft: 20
  },
  category: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 4
  },
  title: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: "900"
  },
  price: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 8
  }
});
