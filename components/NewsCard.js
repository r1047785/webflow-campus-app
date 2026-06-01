import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";

export default function NewsCard({ article, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.accentBar} />
      <Image source={{ uri: article.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.meta}>{article.category} | {article.date}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.intro}>{article.intro}</Text>
        <Text style={styles.arrow}>-></Text>
      </View>
    </TouchableOpacity>
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
    height: 140
  },
  content: {
    padding: 16,
    paddingLeft: 20
  },
  meta: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "900",
    marginBottom: 5
  },
  title: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: "900"
  },
  intro: {
    color: colors.muted,
    marginTop: 6,
    lineHeight: 20
  },
  arrow: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "300",
    marginTop: 10,
    alignSelf: "flex-end"
  }
});
