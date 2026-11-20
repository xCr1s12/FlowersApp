import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colores } from "../constants/colors";

const fuentePixel = "PixelifySans_600SemiBold";

export default function Toggle({ label, value, onPress }) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={onPress}
      style={[styles.toggle, value && styles.toggleOn]}
    >
      <View style={[styles.toggleThumb, value && styles.toggleThumbOn]} />
    </Pressable>
  );
}

export  function ToggleRow({ label, value, onPress, last = false }) {
  return (
    <View style={[styles.row, !last && styles.rowDivider]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Toggle label={label} value={value} onPress={onPress} />
    </View>
  );
}

export function LinkRow({ label, value, last = false, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.row, styles.linkRow, !last && styles.rowDivider]}
    >
      <Text style={styles.rowLabel}>{label}</Text>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      <Text style={styles.chevron} accessibilityElementsHidden>
        ›
      </Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  row: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  rowDivider: {
    borderBottomColor: Colores.navInactivo,
    borderBottomWidth: 1,
  },
  rowLabel: {
    color: Colores.marronOscuro,
    flexShrink: 1,
    fontFamily: fuentePixel,
    fontSize: 10,
  },
  toggle: {
    width: 48,
    height: 26,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 3,
    borderColor: Colores.marronOscuro,
    borderRadius: 2,
    borderWidth: 2,
    backgroundColor: Colores.crema,
  },
  toggleOn: {
    alignItems: "flex-end",
    backgroundColor: Colores.verde,
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderColor: Colores.marronOscuro,
    borderRadius: 1,
    borderWidth: 1,
    backgroundColor: Colores.superficie,
  },
  toggleThumbOn: {
    backgroundColor: Colores.superficie,
  },
  linkRow: {
    justifyContent: "space-between",
  },
  rowValue: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
    fontSize: 9,
    marginLeft: "auto",
    marginRight: 8,
  },
  chevron: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
    fontSize: 20,
    lineHeight: 22,
  },
});