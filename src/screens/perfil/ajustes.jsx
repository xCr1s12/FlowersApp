import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

import DivisorDecorativo from "../../assets/iconos-svg/decorativos/divisor-decorativo.svg";
import { Colores } from "../../constants/colors";
import { ToggleRow, LinkRow} from "../../components/ajustes";

const fuentePixel = "PixelifySans_600SemiBold";


export default function AjustesScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [ambienceEnabled, setAmbienceEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar style="light" backgroundColor={Colores.marronOscuro} />
      <View style={styles.content}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver al perfil"
          onPress={() => router.push("/perfil")}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backLabel}>VOLVER AL PERFIL</Text>
        </Pressable>

        <Text style={styles.heading}>AJUSTES</Text>
        <DivisorDecorativo width={238} height={14} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PREFERENCIAS</Text>
          <View style={styles.card}>
            <ToggleRow
              label="NOTIFICACIONES"
              value={notificationsEnabled}
              onPress={() => setNotificationsEnabled((enabled) => !enabled)}
            />
            <ToggleRow
              label="SONIDOS"
              value={soundsEnabled}
              onPress={() => setSoundsEnabled((enabled) => !enabled)}
            />
            <ToggleRow
              label="MÚSICA AMBIENTE"
              value={ambienceEnabled}
              onPress={() => setAmbienceEnabled((enabled) => !enabled)}
              last
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CUENTA</Text>
          <View style={styles.card}>
            <LinkRow label="IDIOMA" value="Español" />
            <LinkRow label="TÉRMINOS Y PRIVACIDAD" />
            <LinkRow label="AYUDA" last />
          </View>
        </View>

        <Text style={styles.version}>VERSIÓN 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colores.fondo,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 12,
    paddingBottom: 24,
  },
  backButton: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 20,
  },
  backArrow: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
    fontSize: 17,
    lineHeight: 18,
  },
  backLabel: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
    fontSize: 9,
    marginLeft: 2,
  },
  heading: {
    color: Colores.marronOscuro,
    fontFamily: fuentePixel,
    fontSize: 16,
    letterSpacing: 0.6,
    marginTop: 8,
    marginBottom: 8,
  },
  section: {
  
    alignSelf: "stretch",
    marginTop: 14,
  },
  sectionLabel: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
    fontSize: 9,
    marginBottom: 6,
  },
  card: {
    alignSelf: "stretch",
    backgroundColor: Colores.crema,
    borderColor: Colores.marronOscuro,
    borderRadius: 4,
    borderWidth: 2,
    minHeight: 52,
    width: "100%",
    flexDirection: "column",
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
    backgroundColor: Colores.superficie,
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
    justifyContent: "flex-start",
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
  version: {
    color: Colores.placeholder,
    fontFamily: fuentePixel,
    fontSize: 9,
    marginTop: 14,
  },
});