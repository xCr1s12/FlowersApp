import { Image, StyleSheet, Text, View } from "react-native";

import Button from "./Button";
import { Colores, EstilosTexto } from "../constants/tema";

export default function Aviso({
  titulo,
  cuerpo,
  imagen,
  botones = [],
  accessibilityLabelImagen,
}) {
  return (
    <View style={styles.container}>
      {imagen ? (
        <Image
          accessibilityLabel={accessibilityLabelImagen}
          source={imagen}
          resizeMode="contain"
          style={styles.image}
        />
      ) : null}

      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.body}>{cuerpo}</Text>

      {botones.length > 0 ? (
        <View style={styles.buttons}>
          {botones.map(({ label, onPress, variant = "primary", disabled }, index) => (
            <Button
              key={`${label}-${index}`}
              label={label}
              onPress={onPress}
              variant={variant}
              disabled={disabled}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colores.marronOscuro,
    borderRadius: 5,
    backgroundColor: Colores.superficie,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 120,
    marginBottom: 12,
  },
  title: {
    ...EstilosTexto.subtitulo,
    color: Colores.marronOscuro,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  body: {
    ...EstilosTexto.cuerpo,
    color: Colores.marronTexto,
    textAlign: "center",
  },
  buttons: {
    width: "100%",
    gap: 10,
    marginTop: 12,
  },
});
