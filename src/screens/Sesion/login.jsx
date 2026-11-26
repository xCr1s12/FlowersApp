import React, { useState } from "react";
import {
  Alert,
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

import Ojo from "../../assets/iconos-svg/formularios/ojo.svg";
import DivisorDecorativo from "../../assets/iconos-svg/decorativos/divisor-decorativo.svg";
import { Colores, EstilosTexto } from "../../constants/tema";
import { loginMockUser } from "../../data/mockData";

export default function LoginScreen() {
  const router = useRouter();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [recordarDispositivo, setRecordarDispositivo] = useState(true);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const iniciarSesion = () => {
    const user = loginMockUser(nombreUsuario, contrasena);
    if (!user) {
      Alert.alert(
        "No se pudo iniciar sesión",
        "Revisa tu nombre de usuario o correo y tu contraseña.",
      );
      return;
    }

    router.replace("/(tabs)");
  };

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
            className="h-28 w-28 rounded-sm border"
            style={styles.logoFrame}
            accessibilityLabel="Logo de FlowersApp"
          />
          <Text className="mt-2" style={styles.brand}>
            FlowersApp
          </Text>
          <Text
            className="mt-1.5 text-center"
            style={styles.subtitle}
          >
            Inicia sesión para volver a tu jardín.
          </Text>
          <DivisorDecorativo width={170} height={10} />

          <View className="mt-6 w-full max-w-xs">
            <Text className="mb-1" style={styles.label}>
              USUARIO O CORREO
            </Text>
            <TextInput
              accessibilityLabel="Nombre de usuario o correo"
              autoCapitalize="none"
              autoComplete="username"
              placeholder="Tu usuario o correo"
              placeholderTextColor={Colores.placeholder}
              returnKeyType="next"
              className="h-11 rounded-sm border px-2.5"
              style={styles.input}
              value={nombreUsuario}
              onChangeText={setNombreUsuario}
            />

            <Text
              className="mb-1 mt-3"
              style={styles.label}
            >
              CONTRASEÑA
            </Text>
            <View
              className="h-11 flex-row items-center rounded-sm border"
              style={styles.passwordInput}
            >
              <TextInput
                accessibilityLabel="Contraseña"
                autoComplete="current-password"
                placeholder="Tu contraseña"
                placeholderTextColor={Colores.placeholder}
                returnKeyType="done"
                secureTextEntry={!mostrarContrasena}
                className="h-full flex-1 px-2.5"
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
                className="h-full w-10 items-center justify-center"
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
              className="min-h-9 flex-row items-center self-start gap-2"
            >
              <View
                className={
                  recordarDispositivo
                    ? "h-3.5 w-3.5 items-center justify-center rounded-sm border border-[#4E7A33] bg-[#4E7A33]"
                    : "h-3.5 w-3.5 items-center justify-center rounded-sm border border-[#6B4530] bg-[#FFFAF0]"
                }
              >
                {recordarDispositivo ? (
                  <Text
                    className="text-xs leading-3"
                    style={styles.checkmark}
                  >
                    ✓
                  </Text>
                ) : null}
              </View>
              <Text style={styles.rememberLabel}>
                RECORDARME EN ESTE DISPOSITIVO
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              className="mt-0.5 h-11 items-center justify-center rounded-sm border active:opacity-[0.85]"
              style={styles.loginButton}
              onPress={iniciarSesion}
            >
              <Text style={styles.loginButtonLabel}>
                ENTRAR
              </Text>
            </Pressable>

            <View className="mt-3 items-center">
              <View className="mb-3 h-px w-2" style={styles.separatorLine} />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Crear cuenta"
                onPress={() => router.replace("/register")}
              >
                <Text
                  className="text-center"
                  style={styles.accountPromptText}
                >
                  ¿AÚN NO TIENES CUENTA?{" "}
                  <Text className="underline" style={styles.createAccount}>
                    CREAR CUENTA
                  </Text>
                </Text>
              </Pressable>
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
    ...EstilosTexto.display,
    textTransform: "none",
    color: Colores.marronOscuro,
  },
  subtitle: {
    ...EstilosTexto.cuerpo,
    color: Colores.marronTexto,
  },
  demo: {
    ...EstilosTexto.meta,
    textTransform: "none",
    color: Colores.marronTexto,
  },
  label: {
    ...EstilosTexto.cardTitulo,
    color: Colores.marronTexto,
  },
  input: {
    ...EstilosTexto.cuerpo,
    borderColor: Colores.verdeOscuro,
    backgroundColor: Colores.superficie,
    color: Colores.marronOscuro,
  },
  passwordInput: {
    borderColor: Colores.verdeOscuro,
    backgroundColor: Colores.superficie,
  },
  passwordTextInput: {
    ...EstilosTexto.cuerpo,
    color: Colores.marronOscuro,
  },
  checkmark: {
    color: Colores.superficie,
  },
  rememberLabel: {
    ...EstilosTexto.meta,
    color: Colores.marronTexto,
  },
  loginButton: {
    borderColor: Colores.marronOscuro,
    backgroundColor: Colores.verdeOscuro,
  },
  loginButtonLabel: {
    ...EstilosTexto.boton,
    color: Colores.superficie,
  },
  separatorLine: {
    backgroundColor: Colores.navInactivo,
  },
  accountPromptText: {
    ...EstilosTexto.meta,
    color: Colores.marronTexto,
  },
  createAccount: {
    color: Colores.marronOscuro,
  },
});
