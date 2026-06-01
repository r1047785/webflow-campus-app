import React from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../CartContext";
import { colors } from "../theme/colors";

export default function CartScreen() {
  const { cartItems, cartTotal, changeAmount, removeFromCart, clearCart } = useCart();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Winkelmandje</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Je winkelmandje is leeg.</Text>
          <Text style={styles.emptyText}>Voeg een product toe vanuit de webshop.</Text>
        </View>
      ) : null}

      {cartItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>EUR {item.price.toFixed(2)}</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => changeAmount(item.id, -1)}
              >
                <Text style={styles.smallButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.amount}>{item.amount}</Text>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => changeAmount(item.id, 1)}
              >
                <Text style={styles.smallButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={styles.removeText}>Verwijderen</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {cartItems.length > 0 ? (
        <View style={styles.totalBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Totaal</Text>
            <Text style={styles.total}>EUR {cartTotal.toFixed(2)}</Text>
          </View>
          <Button title="Winkelmandje leegmaken" color={colors.coral} onPress={clearCart} />
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    padding: 18,
    paddingBottom: 40
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 18
  },
  emptyBox: {
    backgroundColor: colors.soft,
    borderRadius: 9,
    padding: 18,
    borderLeftWidth: 8,
    borderLeftColor: colors.primary
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  emptyText: {
    color: colors.muted,
    marginTop: 6
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 9,
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3
  },
  image: {
    width: 105,
    height: 125
  },
  content: {
    flex: 1,
    padding: 12
  },
  productName: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  price: {
    color: colors.primary,
    fontWeight: "900",
    marginTop: 5
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  smallButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  smallButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900"
  },
  amount: {
    minWidth: 36,
    textAlign: "center",
    color: colors.ink,
    fontWeight: "900"
  },
  removeText: {
    color: colors.coral,
    fontWeight: "900",
    marginTop: 10
  },
  totalBox: {
    backgroundColor: colors.soft,
    borderRadius: 9,
    padding: 16,
    marginTop: 4
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  totalLabel: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  total: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  }
});
