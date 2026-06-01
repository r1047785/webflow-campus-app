import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export default function CampusDetailsScreen({ route }) {
  const campus = route.params;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Image source={{ uri: campus.image }} style={styles.image} />
      <Text style={styles.city}>{campus.city}</Text>
      <Text style={styles.title}>{campus.name}</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{campus.focus}</Text>
      </View>

      {campus.description ? (
        <View style={styles.introBox}>
          <Text style={styles.introText}>{campus.description}</Text>
        </View>
      ) : null}

      {campus.body ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Over deze campus</Text>
          <Text style={styles.description}>{campus.body}</Text>
        </View>
      ) : null}

      {campus.quote ? (
        <View style={styles.quoteBox}>
          <Text style={styles.quoteMark}>"</Text>
          <Text style={styles.quoteText}>{campus.quote.replace(/"/g, "")}</Text>
        </View>
      ) : null}

      {campus.address ? (
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Adres</Text>
            <Text style={styles.infoText}>{campus.address}</Text>
          </View>
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
    padding: 18
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 9,
    marginBottom: 18
  },
  city: {
    color: colors.primary,
    fontWeight: "900",
    marginBottom: 6
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900"
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.soft,
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 14
  },
  badgeText: {
    color: colors.primaryDark,
    fontWeight: "900"
  },
  introBox: {
    backgroundColor: colors.soft,
    borderLeftWidth: 8,
    borderLeftColor: colors.primary,
    borderRadius: 9,
    padding: 16,
    marginTop: 18
  },
  introText: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900",
    lineHeight: 24
  },
  section: {
    marginTop: 22
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10
  },
  description: {
    color: colors.muted,
    lineHeight: 24
  },
  quoteBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 9,
    padding: 18,
    marginTop: 22,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 3,
    elevation: 3
  },
  quoteMark: {
    color: colors.primary,
    fontSize: 36,
    fontWeight: "900",
    lineHeight: 34
  },
  quoteText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 23
  },
  infoGrid: {
    marginTop: 22,
    marginBottom: 12
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 9,
    padding: 14,
    marginBottom: 10
  },
  infoLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 5
  },
  infoText: {
    color: colors.ink,
    fontWeight: "800",
    lineHeight: 21
  }
});
