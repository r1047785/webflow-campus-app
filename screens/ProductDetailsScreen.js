import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";

export default function ProductDetailsScreen({ route }) {
  const product = route.params;
  const [amount, setAmount] = useState(1);
  const total = amount * product.price;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.priceBox}>
        <Text style={styles.price}>EUR {product.price.toFixed(2)}</Text>
        <View style={styles.counter}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setAmount((current) => Math.max(1, current - 1))}
          >
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.amount}>{amount}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setAmount((current) => current + 1)}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Totaal</Text>
        <Text style={styles.total}>EUR {total.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    padding: 18
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 8,
    marginBottom: 18
  },
  category: {
    color: colors.primary,
    fontWeight: "900",
    marginBottom: 6
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900"
  },
  description: {
    color: colors.muted,
    lineHeight: 22,
    marginTop: 12
  },
  priceBox: {
    backgroundColor: colors.surface,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3
  },
  price: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  counter: {
    flexDirection: "row",
    alignItems: "center"
  },
  counterButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  counterText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900"
  },
  amount: {
    minWidth: 42,
    textAlign: "center",
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  totalBox: {
    backgroundColor: colors.primary,
    borderRadius: 9,
    padding: 16,
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  totalLabel: {
    color: "#fff",
    fontWeight: "800"
  },
  total: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900"
  }
});
