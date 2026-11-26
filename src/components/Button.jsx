import { Pressable, StyleSheet, Text, View } from "react-native";

import Google from "../assets/iconos-svg/formularios/google.svg";
import { Colores, EstilosTexto } from "../constants/tema";

const variantStyles = {
  primary: {
    backgroundColor: Colores.verdeOscuro,
    borderColor: Colores.marronOscuro,
    color: Colores.superficie,
  },
  neutral: {
    backgroundColor: Colores.crema,
    borderColor: Colores.marronOscuro,
    color: Colores.marronOscuro,
  },
  secondary: {
    backgroundColor: Colores.crema,
    borderColor: Colores.marronOscuro,
    color: Colores.marronOscuro,
  },
  danger: {
    backgroundColor: Colores.aviso,
    borderColor: Colores.marronOscuro,
    color: Colores.superficie,
  },
  google: {
    backgroundColor: Colores.superficie,
    borderColor: Colores.marronOscuro,
    color: Colores.marronOscuro,
  },
};

export default function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  accessibilityLabel,
  backgroundColor,
  disabledBackgroundColor,
  disabledOpacity = 0.5,
}) {
  const colors = variantStyles[variant] ?? variantStyles.primary;
  const buttonBackgroundColor = backgroundColor ?? colors.backgroundColor;
  const resolvedBackgroundColor = disabled
    ? disabledBackgroundColor ?? buttonBackgroundColor
    : buttonBackgroundColor;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={styles.pressable}
    >
      <View
        style={[
          styles.button,
          {
            backgroundColor: resolvedBackgroundColor,
            borderColor: colors.borderColor,
          },
          disabled && { opacity: disabledOpacity },
        ]}
      >
        {variant === "google" ? (
          <View style={styles.content}>
            <Google width={18} height={18} />
            <Text style={[styles.label, { color: colors.color }]}>{label}</Text>
          </View>
        ) : (
          <Text style={[styles.label, { color: colors.color }]}>{label}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
  },
  button: {
    minHeight: 52,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  label: {
    ...EstilosTexto.boton,
    textAlign: "center",
  },
});
