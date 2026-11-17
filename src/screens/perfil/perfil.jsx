import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import Avatar from "../../assets/iconos-svg/sprites/avatar-1.svg";
import DivisorDecorativo from "../../assets/iconos-svg/decorativos/divisor-decorativo.svg";
import AjustesIcon from "../../assets/iconos-svg/formularios/ajustes.svg";
import { Colores } from "../../constants/colors";
import { useRouter } from "expo-router";



const fuentePixel = "PixelifySans_600SemiBold";


export default function PerfilScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar style="light" backgroundColor={Colores.marronOscuro} />
      <View style={styles.content}>
        <Text style={styles.heading}>PERFIL</Text>

        <DivisorDecorativo width={196} height={12} />

        <View style={styles.profileCard}>
          <View style={styles.avatarFrame}>
            <Avatar width={64} height={64} />
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>N3</Text>
            </View>
          </View>

          <Text style={styles.name}>ANA</Text>
          <Text style={styles.description}>
            Cuidando cada recuerdo, una flor a la vez.
          </Text>

          <View style={styles.levelRow}>
            <Text style={styles.levelText}>NIVEL 3 · JARDINERA</Text>
            <Text style={styles.levelText}>120 / 200 XP</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <Pressable accessibilityRole="button" style={styles.editButton}>
            <Text style={styles.editButtonText}>EDITAR PERFIL</Text>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>RECUERDOS</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>EN JARDÍN</Text>
          </View>
        </View>

        <Pressable 
        accessibilityRole="button" 
        style={styles.settingsRow}
        onPress={() => router.push("/perfil/ajustes")}
        >
          <View style={styles.settingsIconFrame}>
            <AjustesIcon width={24} height={24} />
          </View>
          <Text style={styles.settingsLabel}>AJUSTES</Text>
          <Text style={styles.chevronPlaceholder} accessibilityLabel="Abrir">
            ›
          </Text>
        </Pressable>
        <Pressable accessibilityRole="button" style={styles.logout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colores.marronOscuro,
  },
  content: {
    height: "100%",
    backgroundColor: Colores.fondo,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  heading: {
    color: Colores.marronOscuro,
    fontFamily: fuentePixel,
    fontSize: 16,
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  profileCard: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: Colores.crema,
    borderColor: Colores.marronOscuro,
    borderRadius: 4,
    borderWidth: 2,
    marginTop: 14,
    padding: 12,
  },
  avatarFrame: {
    alignItems: "center",
    backgroundColor: Colores.superficie,
    borderColor: Colores.marronOscuro,
    borderRadius: 3,
    borderWidth: 2,
    height: 80,
    justifyContent: "center",
    position: "relative",
    width: 80,
  },
  levelBadge: {
    alignItems: "center",
    backgroundColor: Colores.dorado,
    borderColor: Colores.marronOscuro,
    borderRadius: 2,
    borderWidth: 1,
    bottom: 0,
    minWidth: 24,
    paddingHorizontal: 3,
    position: "absolute",
    right: 0,
  },
  levelBadgeText: {
    color: Colores.marronOscuro,
    fontFamily: fuentePixel,
    fontSize: 9,
  },
  name: {
    color: Colores.marronOscuro,
    fontFamily: fuentePixel,
    fontSize: 13,
    marginTop: 8,
  },
  description: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
    fontSize: 9,
    marginTop: 8,
    textAlign: "center",
  },
  levelRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  levelText: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
    fontSize: 8,
  },
  progressTrack: {
    alignSelf: "stretch",
    backgroundColor: Colores.fondo,
    borderColor: Colores.marronOscuro,
    borderWidth: 1,
    height: 9,
    marginTop: 4,
    padding: 1,
  },
  progressFill: {
    backgroundColor: Colores.verde,
    height: "100%",
    width: "60%",
  },
  editButton: {
    alignItems: "center",
    borderColor: Colores.marronOscuro,
    borderRadius: 3,
    borderWidth: 2,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    color: Colores.marronOscuro,
    fontFamily: fuentePixel,
    fontSize: 10,
  },
  statsRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    gap: 6,
    marginTop: 12,
  },
  statCard: {
    alignItems: "center",
    backgroundColor: Colores.crema,
    borderColor: Colores.marronOscuro,
    borderRadius: 4,
    borderWidth: 2,
    flex: 1,
    justifyContent: "center",
    minHeight: 54,
  },
  statValue: {
    fontFamily: fuentePixel,
    color: Colores.marronOscuro,
    fontSize: 13,
  },
  statLabel: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
    fontSize: 8,
    marginTop: 2,
  },
  settingsRow: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: Colores.crema,
    borderColor: Colores.marronOscuro,
    borderRadius: 4,
    borderWidth: 2,
    flexDirection: "row",
    marginTop: 12,
    minHeight: 56,
    paddingHorizontal: 12,
  },
  settingsIconFrame: {
    alignItems: "center",
    backgroundColor: Colores.fondo,
    borderColor: Colores.marronOscuro,
    borderRadius: 3,
    borderWidth: 2,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  settingsLabel: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
    fontSize: 10,
    marginLeft: 10,
  },
  chevronPlaceholder: {
    color: Colores.marronTexto,
    fontFamily: fuentePixel,
    fontSize: 22,
    marginLeft: "auto",
  },
  logout: {
    alignItems: "center",
    alignSelf: "stretch",
    borderColor: Colores.aviso,
    borderRadius: 4,
    borderWidth: 2,
    marginTop: 12,
    paddingVertical: 10,
  },
  logoutText: {
    color: Colores.aviso,
    fontFamily: fuentePixel,
    fontSize: 10,
  },
});
