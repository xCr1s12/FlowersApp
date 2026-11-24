import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Check from "../../assets/iconos-svg/formularios/check.svg";
import DivisorDecorativo from "../../assets/iconos-svg/decorativos/divisor-decorativo.svg";
import NoDisponible from "../../assets/iconos-svg/formularios/no-disponible.svg";
import Ojo from "../../assets/iconos-svg/formularios/ojo.svg";
import { Colores } from "../../constants/colors";
import fuentePixel from "../../constants/fonts";

const reglasContrasena = [
  {
    etiqueta: "8 O MÁS CARACTERES",
    cumple: (valor) => valor.length >= 8,
  },
  {
    etiqueta: "UNA LETRA MAYÚSCULA",
    cumple: (valor) => /[A-ZÁÉÍÓÚÜÑ]/.test(valor),
  },
  {
    etiqueta: "UN NÚMERO",
    cumple: (valor) => /\d/.test(valor),
  },
  {
    etiqueta: "UN SÍMBOLO (!@#$?)",
    cumple: (valor) => /[^A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ]/.test(valor),
  },
];

export default function RegisterScreen() {
  const router = useRouter();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const formatoUsuarioValido = /^[a-zA-Z0-9._-]{3,16}$/.test(nombreUsuario);
  const resultadosContrasena = reglasContrasena.map(({ cumple }) =>
    cumple(contrasena),
  );
  const reglasCumplidas = resultadosContrasena.filter(Boolean).length;
  const contrasenaValida = reglasCumplidas === reglasContrasena.length;
  const puedeCrearCuenta =
    formatoUsuarioValido && contrasenaValida && aceptaTerminos;

  const nivelContrasena =
    reglasCumplidas === reglasContrasena.length
      ? "FUERTE"
      : reglasCumplidas >= 2
        ? "MEDIA"
        : "DÉBIL";

  return (
    <SafeAreaView
      className="flex-1"
      style={styles.safeArea}
      edges={["top"]}
    >
      <StatusBar style="light" backgroundColor={Colores.marronOscuro} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colores.fondo,
  },

});