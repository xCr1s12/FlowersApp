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
  Linking
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Check from "../../assets/iconos-svg/formularios/check.svg";
import CheckBlanco from "../../assets/iconos-svg/formularios/check-blanco.svg";
import DestelloInventario from "../../assets/iconos-svg/inventario-y-jardin/destello-inventario-1.svg";
import DivisorDecorativo from "../../assets/iconos-svg/decorativos/divisor-decorativo.svg";
import NoDisponible from "../../assets/iconos-svg/formularios/no-disponible.svg";
import Ojo from "../../assets/iconos-svg/formularios/ojo.svg";
import OjoCerrado from "../../assets/iconos-svg/formularios/ojo-cerrado.svg";
import Button from "../../components/Button";
import PasswordStrength from "../../components/PasswordStrength";
import { Colores, EstilosTexto, fuentePixelBold } from "../../constants/tema";
import {
  getMockUsers,
  isMockEmailAvailable,
  isMockUsernameAvailable,
  registerMockUser,
} from "../../data/mockData";

const destellosGrandes = [
  { top: "29%", left: "70%" },
  { top: "60%", left: "90%" },
  { top: "44%", left: "4%" },
  { top: "1%", left: "9%" },
  { top: "12%", left: "61%" },
  { top: "11%", left: "93%" },
  { top: "20%", left: "27%" },
  { top: "19%", left: "78%" },
  { top: "24%", left: "3%" },
  { top: "33.5%", left: "34%" },
  { top: "37%", left: "69%" },
  { top: "51%", left: "17%" },
  { top: "54%", left: "55%" },
  { top: "60%", left: "70%" },
  { top: "66%", left: "8%" },
  { top: "71%", left: "37%" },
  { top: "76.5%", left: "73%" },
  { top: "84%", left: "22%" },
  { top: "91%", left: "58%" },
  { top: "95%", left: "89%" },
];

const crearSugerenciasUsuario = (nombre, usuariosOcupados) => {
  const nombreLimpio = nombre.replace(/[^a-zA-Z0-9._-]/g, "").toLowerCase();
  const base = nombreLimpio.length >= 2 ? nombreLimpio : "usuario";
  const ocupados = new Set(usuariosOcupados.map((usuario) => usuario.toLowerCase()));
  const sugerencias = [];
  const sufijos = ["2", "26", ...Array.from({ length: 98 }, (_, i) => `${i + 3}`)];

  for (const sufijo of sufijos) {
    const nombreSugerido = `${base.slice(0, 16 - sufijo.length)}${sufijo}`;
    if (
      nombreSugerido.length >= 3 &&
      /^[a-zA-Z0-9._-]{3,16}$/.test(nombreSugerido) &&
      !ocupados.has(nombreSugerido) &&
      !sugerencias.includes(nombreSugerido)
    ) {
      sugerencias.push(nombreSugerido);
    }

    if (sugerencias.length === 2) {
      break;
    }
  }

  return sugerencias;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] =
    useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const formatoUsuarioValido = /^[a-zA-Z0-9._-]{3,16}$/.test(nombreUsuario);
  const usuariosOcupados = getMockUsers().map((usuario) => usuario.username);
  const usuarioExiste = !isMockUsernameAvailable(nombreUsuario);
  const usuarioDisponible = formatoUsuarioValido && !usuarioExiste;
  const mostrarEstadoUsuario = nombreUsuario.length > 0;
  const sugerenciasUsuario =
    mostrarEstadoUsuario && !usuarioDisponible
      ? crearSugerenciasUsuario(nombreUsuario, usuariosOcupados)
      : [];
  const correoNormalizado = correo.trim().toLowerCase();
  const formatoCorreoValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
    correoNormalizado,
  );
  const correoExiste = !isMockEmailAvailable(correoNormalizado);
  const correoDisponible = formatoCorreoValido && !correoExiste;
  const mostrarEstadoCorreo = correo.length > 0;
  const mostrarEstadoConfirmacion = confirmarContrasena.length > 0;
  const contrasenasCoinciden =
    mostrarEstadoConfirmacion && confirmarContrasena === contrasena;
  const contrasenaValida =
    contrasena.length >= 8 &&
    /[A-Z]/.test(contrasena) &&
    /\d/.test(contrasena) &&
    /[@$%&!?^~]/.test(contrasena);
  const puedeCrearCuenta =
    usuarioDisponible &&
    correoDisponible &&
    contrasenaValida &&
    contrasenasCoinciden &&
    aceptaTerminos;
  const crearCuenta = () => {
    try {
      registerMockUser({
        username: nombreUsuario,
        email: correoNormalizado,
        password: contrasena,
      });
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("No se pudo crear la cuenta", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={styles.safeArea} edges={["top"]}>
      <StatusBar style="dark" backgroundColor={Colores.fondo} />
      <KeyboardAvoidingView
        className="flex-1"
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          {destellosGrandes.map((position, index) => (
            <DestelloInventario
              key={`large-${index}`}
              width={10}
              height={10}
              style={{ ...position, position: "absolute" }}
            />
          ))}
        </View>
        <ScrollView
          className="flex-1 w-full"
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Volver al inicio de sesión"
            onPress={() => router.back()}
            className="min-h-6 flex-row items-center self-stretch gap-2"
          >
            <Text className="text-xl" style={styles.backArrow}>
              ‹
            </Text>
            <Text style={[styles.text, styles.BackLabel]}>VOLVER AL LOGIN</Text>
          </Pressable>
          <View className="w-full h-auto items-center pt-2">
            <Text className="mb-2" style={styles.title}>Crear Cuenta</Text>
            <DivisorDecorativo  width={170} height={10} />
          </View>

          <View style={styles.form}>
            <View style={styles.campo}>
              <Text style={styles.etiqueta}>NOMBRE DE USUARIO</Text>
              <View
                style={[
                  styles.recuadro,
                  usuarioDisponible && styles.recuadroValido,
                  mostrarEstadoUsuario &&
                    !usuarioDisponible &&
                    styles.recuadroError,
                ]}
              >
                <TextInput
                  accessibilityLabel="Nombre de usuario"
                  style={styles.input}
                  value={nombreUsuario}
                  onChangeText={setNombreUsuario}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="username"
                  maxLength={16}
                  placeholder="tu_usuario"
                  placeholderTextColor={Colores.placeholder}
                  returnKeyType="next"
                />
                {usuarioDisponible ? <Check width={14} height={10} /> : null}
                {mostrarEstadoUsuario && !usuarioDisponible ? (
                  <NoDisponible width={14} height={10} />
                ) : null}
              </View>
              {mostrarEstadoUsuario ? (
                <View style={styles.estadoUsuario}>
                  {usuarioDisponible ? (
                    <Check width={14} height={10} />
                  ) : (
                    <NoDisponible width={14} height={10} />
                  )}
                  <Text
                    style={[
                      styles.textoEstadoUsuario,
                      usuarioDisponible && styles.textoDisponible,
                    ]}
                  >
                    {usuarioDisponible
                      ? "DISPONIBLE"
                      : formatoUsuarioValido
                        ? "NO DISPONIBLE"
                        : "El formato valido: A-Z, a-z, 0-9, . , _ ,-, de longitud al menos 3 "}
                  </Text>
                </View>
              ) : null}
              {sugerenciasUsuario.length > 0 ? (
                <View
                  accessibilityLabel="Nombres de usuario sugeridos"
                  style={styles.sugerenciasUsuario}
                >
                  <Text style={styles.etiquetaSugerencias}>PRUEBA CON</Text>
                  {sugerenciasUsuario.map((sugerencia) => (
                    <Pressable
                      key={sugerencia}
                      accessibilityRole="button"
                      accessibilityLabel={`Usar nombre sugerido ${sugerencia}`}
                      onPress={() => setNombreUsuario(sugerencia)}
                      style={styles.sugerenciaUsuario}
                    >
                      <Text style={styles.textoSugerencia}>{sugerencia}</Text>
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </View>

            <View style={styles.campo}>
              <Text style={styles.etiqueta}>CORREO ELECTRÓNICO</Text>
              <View
                style={[
                  styles.recuadro,
                  correoDisponible && styles.recuadroValido,
                  mostrarEstadoCorreo &&
                    !correoDisponible &&
                    styles.recuadroError,
                ]}
              >
                <TextInput
                  accessibilityLabel="Correo electrónico"
                  style={styles.input}
                  value={correo}
                  onChangeText={setCorreo}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  keyboardType="email-address"
                  placeholder="tu@correo.com"
                  placeholderTextColor={Colores.placeholder}
                  returnKeyType="next"
                />
                {correoDisponible ? <Check width={14} height={10} /> : null}
                {mostrarEstadoCorreo && !correoDisponible ? (
                  <NoDisponible width={14} height={10} />
                ) : null}
              </View>
              {mostrarEstadoCorreo ? (
                <View style={styles.estadoUsuario}>
                  {correoDisponible ? (
                    <Check width={14} height={10} />
                  ) : (
                    <NoDisponible width={14} height={10} />
                  )}
                  <Text
                    style={[
                      styles.textoEstadoUsuario,
                      correoDisponible && styles.textoDisponible,
                    ]}
                  >
                    {!formatoCorreoValido
                      ? "FORMATO DE CORREO NO VÁLIDO"
                      : correoExiste
                        ? "CORREO NO DISPONIBLE"
                        : "CORREO DISPONIBLE"}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.campo}>
              <Text style={styles.etiqueta}>CONTRASEÑA</Text>
              <View style={[styles.recuadro, styles.recuadroContrasena]}>
                <TextInput
                  accessibilityLabel="Contraseña"
                  style={styles.input}
                  value={contrasena}
                  onChangeText={setContrasena}
                  secureTextEntry={!mostrarContrasena}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  returnKeyType="done"
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    mostrarContrasena
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                  accessibilityState={{ selected: mostrarContrasena }}
                  onPress={() => setMostrarContrasena((visible) => !visible)}
                  hitSlop={10}
                  style={styles.botonOjo}
                >
                  {mostrarContrasena ? (
                    <Ojo width={24} height={24} />
                  ) : (
                    <OjoCerrado width={24} height={24} />
                  )}
                </Pressable>
              </View>
              <PasswordStrength password={contrasena} />
            </View>
            <View style={styles.campo}>
              <Text style={styles.etiqueta}>REPETIR CONTRASEÑA</Text>
              <View
                style={[
                  styles.recuadro,
                  styles.recuadroContrasena,
                  contrasenasCoinciden && styles.recuadroValido,
                  mostrarEstadoConfirmacion &&
                    !contrasenasCoinciden &&
                    styles.recuadroError,
                ]}
              >
                <TextInput
                  accessibilityLabel="Repetir contraseña"
                  style={styles.input}
                  value={confirmarContrasena}
                  onChangeText={setConfirmarContrasena}
                  secureTextEntry={!mostrarConfirmarContrasena}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  returnKeyType="done"
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    mostrarConfirmarContrasena
                      ? "Ocultar contraseña repetida"
                      : "Mostrar contraseña repetida"
                  }
                  accessibilityState={{
                    selected: mostrarConfirmarContrasena,
                  }}
                  onPress={() =>
                    setMostrarConfirmarContrasena((visible) => !visible)
                  }
                  hitSlop={10}
                  style={styles.botonOjo}
                >
                  {mostrarConfirmarContrasena ? (
                    <Ojo width={24} height={24} />
                  ) : (
                    <OjoCerrado width={24} height={24} />
                  )}
                </Pressable>
              </View>
              {mostrarEstadoConfirmacion ? (
                <View style={styles.estadoUsuario}>
                  {contrasenasCoinciden ? (
                    <Check width={14} height={10} />
                  ) : (
                    <NoDisponible width={14} height={10} />
                  )}
                  <Text
                    style={[
                      styles.textoEstadoUsuario,
                      contrasenasCoinciden && styles.textoDisponible,
                    ]}
                  >
                    {contrasenasCoinciden
                      ? "LAS CONTRASEÑAS COINCIDEN"
                      : "LAS CONTRASEÑAS NO COINCIDEN"}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.pieFormulario}>
            <Pressable
              accessibilityRole="checkbox"
              accessibilityLabel="Aceptar términos de uso y política de privacidad"
              accessibilityState={{ checked: aceptaTerminos }}
              onPress={() => setAceptaTerminos((acepta) => !acepta)}
              style={styles.aceptarTerminos}
            >
              <View
                style={[
                  styles.casillaTerminos,
                  aceptaTerminos && styles.casillaTerminosActiva,
                ]}
              >
                {aceptaTerminos ? <CheckBlanco width={11} height={8} /> : null}
              </View>
              <Text style={styles.textoTerminos}>
                Acepto los{" "}
                <Text
                  className="underline text-black"
                  onPress={() =>
                    Linking.openURL("https://flowersapp-terminos.vercel.app/")
                  }
                >
                  Términos y la política de privacidad
                </Text>
              </Text>
            </Pressable>

            <Button
              label="CREAR CUENTA"
              disabled={!puedeCrearCuenta}
              backgroundColor={Colores.verde}
              disabledBackgroundColor={Colores.verdeDeshabilitado}
              disabledOpacity={1}
              onPress={crearCuenta}
            />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Entrar a una cuenta existente"
              onPress={() => router.replace("/login")}
              style={styles.iniciarSesion}
            >
              <Text style={styles.textoIniciarSesion}>¿YA TIENES CUENTA? </Text>
              <Text style={[styles.textoIniciarSesion, styles.enlaceTerminos]}>
                ENTRAR
              </Text>
            </Pressable>
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
  container: {
  },
  text: EstilosTexto.meta,
  BackLabel: {
    color: Colores.marronTexto,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 22,
    paddingBottom: 32,
  },
  title: {
    ...EstilosTexto.tituloPantalla,
    textTransform: "none",
    color: Colores.marronOscuro,
    lineHeight: 36,
  },
  backArrow: {
    fontFamily: fuentePixelBold,
  },
  form: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    marginTop: 24,
  },
  pieFormulario: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    gap: 16,
    marginTop: 2,
  },
  aceptarTerminos: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingHorizontal: 2,
  },
  casillaTerminos: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colores.marronOscuro,
    borderRadius: 2,
    backgroundColor: Colores.superficie,
  },
  casillaTerminosActiva: {
    backgroundColor: Colores.verdeOscuro,
  },
  textoTerminos: {
    ...EstilosTexto.cuerpo,
    flex: 1,
    color: Colores.marronOscuro,
    lineHeight: 17,
  },
  enlaceTerminos: {
    textDecorationLine: "underline",
  },
  iniciarSesion: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 1,
  },
  textoIniciarSesion: {
    ...EstilosTexto.meta,
    color: Colores.marronTexto,
  },
  campo: {
    width: "100%",
    marginBottom: 18,
  },
  etiqueta: {
    ...EstilosTexto.cardTitulo,
    marginBottom: 8,
    color: Colores.marronTexto,
    lineHeight: 13,
  },
  recuadro: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colores.marronTexto,
    borderRadius: 4,
    backgroundColor: Colores.superficie,
    paddingHorizontal: 12,
  },
  recuadroValido: {
    borderColor: Colores.verdeOscuro,
  },
  recuadroError: {
    borderColor: Colores.aviso,
  },
  recuadroContrasena: {
    borderColor: Colores.marronOscuro,
  },
  input: {
    ...EstilosTexto.cuerpo,
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    color: Colores.marronOscuro,
  },
  estadoUsuario: {
    minHeight: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 1,
    paddingTop: 6,
  },
  textoEstadoUsuario: {
    ...EstilosTexto.meta,
    color: Colores.aviso,
    lineHeight: 13,
  },
  textoDisponible: {
    color: Colores.verdeOscuro,
  },
  sugerenciasUsuario: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 7,
  },
  etiquetaSugerencias: {
    ...EstilosTexto.boton,
    color: Colores.marronTexto,
    textTransform: "none",
    lineHeight: 13,
  },
  sugerenciaUsuario: {
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colores.marronTexto,
    borderRadius: 5,
    backgroundColor: Colores.superficie,
    paddingHorizontal: 10,
  },
  textoSugerencia: {
    ...EstilosTexto.meta,
    color: Colores.marronOscuro,
  },
  botonOjo: {
    width: 30,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: -6,
  },
});
