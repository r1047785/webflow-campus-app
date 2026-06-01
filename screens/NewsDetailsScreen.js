import React from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

export default function NewsDetailsScreen({ route }) {
  const article = route.params;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Image source={{ uri: article.image }} style={styles.image} />
      <Text style={styles.meta}>{article.category} | {article.date}</Text>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.intro}>{article.intro}</Text>
      <Text style={styles.body}>{article.body}</Text>
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
    height: 250,
    borderRadius: 9,
    marginBottom: 18
  },
  meta: {
    color: colors.primary,
    fontWeight: "900",
    marginBottom: 8
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900"
  },
  intro: {
    color: colors.ink,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "800",
    marginTop: 14
  },
  body: {
    color: colors.muted,
    lineHeight: 23,
    marginTop: 14
  }
});
