import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export default function CampusCard({ campus, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.accentBar} />
      <Image source={{ uri: campus.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.city}>{campus.city}</Text>
        <Text style={styles.title}>{campus.name}</Text>
        <Text style={styles.focus}>{campus.focus}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 9,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.32,
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
    height: 135
  },
  content: {
    padding: 16,
    paddingLeft: 20
  },
  city: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900"
  },
  title: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 4
  },
  focus: {
    color: colors.muted,
    marginTop: 6
  }
});
