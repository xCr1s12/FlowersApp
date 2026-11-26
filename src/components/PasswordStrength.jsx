import { StyleSheet, Text, View } from "react-native";

import Check from "../assets/iconos-svg/formularios/check-blanco.svg";
import { Colores, EstilosTexto } from "../constants/tema";

export default function PasswordStrength({ password }) {
  if (!password) {
    return null;
  }

  const checks = [
    { label: "8 O MÁS CARACTERES", valid: password.length >= 8 },
    { label: "UNA LETRA MAYÚSCULA", valid: /[A-Z]/.test(password) },
    { label: "UN NÚMERO", valid: /\d/.test(password) },
    {
      label: "UN SÍMBOLO (@ $ % & ! ? ^ ~)",
      valid: /[@$%&!?^~]/.test(password),
    },
  ];
  const passedChecks = checks.filter((check) => check.valid).length;
  const strength =
    passedChecks === checks.length
      ? { label: "FUERTE", bars: 4, color: Colores.verde }
      : passedChecks >= 2
        ? { label: "MEDIA", bars: 2, color: Colores.dorado }
        : { label: "DÉBIL", bars: 1, color: Colores.aviso };

  return (
    <View
      accessibilityLabel={`Seguridad de la contraseña: ${strength.label.toLowerCase()}`}
      style={styles.container}
    >
      <View style={styles.labels}>
        <Text style={styles.label}>SEGURIDAD</Text>
        <Text style={styles.label}>{strength.label}</Text>
      </View>
      <View style={styles.bars}>
        {Array.from({ length: 4 }, (_, index) => (
          <View
            key={index}
            style={[
              styles.bar,
              { backgroundColor: index < strength.bars ? strength.color : Colores.crema },
            ]}
          />
        ))}
      </View>
      <View style={styles.checks}>
        {checks.map(({ label, valid }) => (
          <View
            key={label}
            accessibilityRole="checkbox"
            accessibilityLabel={label}
            accessibilityState={{ checked: valid }}
            style={styles.checkRow}
          >
            <View style={[styles.checkbox, valid && styles.checkboxValid]}>
              {valid ? <Check width={14} height={10} /> : null}
            </View>
            <Text style={styles.checkLabel}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    ...EstilosTexto.cardTitulo,
    color: Colores.marronTexto,
    lineHeight: 13,
  },
  bars: {
    width: "100%",
    flexDirection: "row",
    gap: 5,
  },
  bar: {
    flex: 1,
    height: 12,
    borderWidth: 2,
    borderColor: Colores.marronOscuro,
  },
  checks: {
    gap: 5,
    marginTop: 10,
  },
  checkRow: {
    minHeight: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colores.marronTexto,
    borderRadius: 2,
  },
  checkboxValid: {
    borderColor: Colores.verdeOscuro,
    backgroundColor: Colores.verdeOscuro,
  },
  checkLabel: {
    ...EstilosTexto.cardTitulo,
    color: Colores.marronTexto,
    lineHeight: 17,
  },
});
