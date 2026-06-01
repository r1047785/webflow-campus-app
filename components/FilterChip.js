import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

export default function FilterChip({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.activeChip]}
    >
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 7,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: colors.surface,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.28,
    shadowRadius: 2,
    elevation: 2
  },
  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  label: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "800"
  },
  activeLabel: {
    color: "#fff"
  }
});
