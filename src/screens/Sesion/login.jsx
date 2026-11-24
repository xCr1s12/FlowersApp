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

import Ojo from "../../assets/iconos-svg/formularios/ojo.svg";
import DivisorDecorativo from "../../assets/iconos-svg/decorativos/divisor-decorativo.svg";
import { Colores } from "../../constants/colors";
import fuentePixel from "../../constants/fonts";

export default function LoginScreen() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [recordarDispositivo, setRecordarDispositivo] = useState(true);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  return (
    <SafeAreaView
      className="flex-1"
      style={styles.safeArea}
      edges={["top", "bottom"]}
    >
      <StatusBar style="dark" backgroundColor={Colores.fondo} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View
            className="h-28 w-28 rounded-[3px] border-[1.5px]"
            style={styles.logoFrame}
            accessibilityLabel="Logo de FlowersApp"
          />
          <Text className="mt-2 text-[13px]" style={styles.brand}>
            FlowersApp
          </Text>
          <Text
            className="mt-1.5 text-center text-[9px]" 
            style={styles.subtitle}
          >
            Inicia sesión para volver a tu jardín.
          </Text>
          <DivisorDecorativo width={170} height={10} />

          <View className="mt-[22px] w-full max-w-[340px]">
            <Text className="mb-[5px] text-[8px]" style={styles.label}>
              NOMBRE DE USUARIO
            </Text>
            <TextInput
              accessibilityLabel="Nombre de usuario"
              autoCapitalize="none"
              autoComplete="username"
              placeholder="Tu nombre de usuario"
              placeholderTextColor={Colores.placeholder}
              returnKeyType="next"
              className="h-[42px] rounded-[3px] border-[1.5px] px-[10px] text-[10px]"
              style={styles.input}
              value={nombreUsuario}
              onChangeText={setNombreUsuario}
            />

            <Text
              className="mb-[5px] mt-3 text-[8px]"
              style={styles.label}
            >
              CONTRASEÑA
            </Text>
            <View
              className="h-[42px] flex-row items-center rounded-[3px] border-[1.5px]"
              style={styles.passwordInput}
            >
              <TextInput
                accessibilityLabel="Contraseña"
                autoComplete="current-password"
                placeholder="Tu contraseña"
                placeholderTextColor={Colores.placeholder}
                returnKeyType="done"
                secureTextEntry={!mostrarContrasena}
                className="h-full flex-1 px-[10px] text-[10px]"
                style={styles.passwordTextInput}
                value={contrasena}
                onChangeText={setContrasena}
              />
              <Pressable
                accessibilityLabel={
                  mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                accessibilityRole="button"
                accessibilityState={{ selected: mostrarContrasena }}
                hitSlop={8}
                onPress={() => setMostrarContrasena((visible) => !visible)}
                className="h-full w-[38px] items-center justify-center"
              >
                <Ojo width={18} height={18} />
              </Pressable>
            </View>

            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: recordarDispositivo }}
              onPress={() =>
                setRecordarDispositivo((recordar) => !recordar)
              }
              className="min-h-[34px] flex-row items-center self-start gap-[7px]"
            >
              <View
                className={
                  recordarDispositivo
                    ? "h-[14px] w-[14px] items-center justify-center rounded-[2px] border border-[#4E7A33] bg-[#4E7A33]"
                    : "h-[14px] w-[14px] items-center justify-center rounded-[2px] border border-[#6B4530] bg-[#FFFAF0]"
                }
              >
                {recordarDispositivo ? (
                  <Text
                    className="text-[10px] leading-3"
                    style={styles.checkmark}
                  >
                    ✓
                  </Text>
                ) : null}
              </View>
              <Text className="text-[8px]" style={styles.rememberLabel}>
                RECORDARME EN ESTE DISPOSITIVO
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              className="mt-[2px] h-11 items-center justify-center rounded-[3px] border-[1.5px] active:opacity-[0.85]"
              style={styles.loginButton}
            >
              <Text className="text-[10px]" style={styles.loginButtonLabel}>
                ENTRAR
              </Text>
            </Pressable>

            <View className="mt-3 items-center">
              <View className="mb-3 h-px w-2" style={styles.separatorLine} />
              <Text
                className="text-center text-[8px]"
                style={styles.accountPromptText}
              >
                ¿AÚN NO TIENES CUENTA?{" "}
                <Text className="underline" style={styles.createAccount}>
                  CREAR CUENTA
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colores.fondo,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 26,
    paddingTop: 22,
    paddingBottom: 28,
  },
  logoFrame: {
    borderColor: Colores.marronOscuro,
    backgroundColor: Colores.crema,
  },
  brand: {
    color: Colores.marronOscuro,
    fontFamily: fuentePixel,
  },
  subtitle: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
  },
  label: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
  },
  input: {
    borderColor: Colores.verdeOscuro,
    backgroundColor: Colores.superficie,
    color: Colores.marronOscuro,
    fontFamily: fuentePixel,
  },
  passwordInput: {
    borderColor: Colores.verdeOscuro,
    backgroundColor: Colores.superficie,
  },
  passwordTextInput: {
    color: Colores.marronOscuro,
    fontFamily: fuentePixel,
  },
  checkmark: {
    color: Colores.superficie,
  },
  rememberLabel: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
  },
  loginButton: {
    borderColor: Colores.marronOscuro,
    backgroundColor: Colores.verdeOscuro,
  },
  loginButtonLabel: {
    color: Colores.superficie,
    fontFamily: fuentePixel,
  },
  separatorLine: {
    backgroundColor: Colores.navInactivo,
  },
  accountPromptText: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
  },
  createAccount: {
    color: Colores.marronOscuro,
  },
});
