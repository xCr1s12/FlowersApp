import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import DestelloInventario from "../../assets/iconos-svg/inventario-y-jardin/destello-inventario-1.svg";
import DivisorDecorativo from "../../assets/iconos-svg/decorativos/divisor-decorativo.svg";
import { Colores } from "../../constants/colors";
import InvList from "../../components/invList";

const fuentePixel = "PixelifySans_600SemiBold";
const filtros = ["Todas", "Recientes", "Favoritos"];

const destellosGrandes = [
  { top: "29%", left: "48%" },
  { top: "40%", left: "90%" },
  { top: "44%", left: "4%" },
  { top: "3%", left: "9%" },
  { top: "9%", left: "61%" },
  { top: "11%", left: "93%" },
  { top: "15.5%", left: "27%" },
  { top: "19%", left: "78%" },
  { top: "24%", left: "3%" },
  { top: "33.5%", left: "34%" },
  { top: "37%", left: "69%" },
  { top: "51%", left: "17%" },
  { top: "54%", left: "55%" },
  { top: "60%", left: "94%" },
  { top: "66%", left: "8%" },
  { top: "71%", left: "37%" },
  { top: "76.5%", left: "73%" },
  { top: "84%", left: "22%" },
  { top: "91%", left: "58%" },
  { top: "95%", left: "89%" },
];

const hoy = new Date();
const formato = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`;

const CardData = [
  {
    id: "1",
    title: "Rosa",
    date: formato,
    text: "Felicidades",
    favorite: false,
  },
  {
    id: "2",
    title: "Lirio",
    date: "10/8/2020",
    text: "Felicidades",
    favorite: true,
    accent: "#F4B99A",
  },
];

function parsearFecha(fecha) {
  const m =
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(fecha) ||
    /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha);
  if (!m) return null;

  const [a, b, c] = m.slice(1).map(Number);
  const esIso = m[1].length === 4;
  const [ano, mes, dia] = esIso ? [a, b, c] : [c, b, a];

  return new Date(ano, mes - 1, dia);
}

function esReciente(fecha, dias = 3) {
  const f = parsearFecha(fecha);
  if (!f) return false;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const limite = new Date(hoy);
  limite.setDate(hoy.getDate() - dias);

  return f >= limite && f <= hoy;
}

const favorites = CardData.filter((item) => item.favorite);

export default function InventarioScreen() {
  const [filtroActivo, setFiltroActivo] = useState("Todas");
  const cardsVisibles =
    filtroActivo === "Recientes"
      ? CardData.filter((card) => esReciente(card.date))
      : filtroActivo === "Favoritos"
        ? favorites
        : CardData
  
        return (
    <SafeAreaView style={styles.safeArea} className="flex-1" edges={["top"]}>
      <StatusBar style="light" backgroundColor={Colores.marronOscuro} />

      <View style={styles.screen}>
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

        <View style={styles.header}>
          <Text style={styles.heading}>Inventario de Recuerdos</Text>
          <DivisorDecorativo width={238} height={14} />
          <View style={styles.filters}>
            {filtros.map((filtro, index) => {
              const isActive = filtro === filtroActivo;
              return (
                <Pressable
                  key={filtro}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isActive }}
                  onPress={() => {
                    setFiltroActivo(filtro);
                  }}
                  style={[
                    styles.filterButton,
                    index === 0
                      ? styles.firstFilterButton
                      : styles.otherFilterButton,
                    isActive && styles.activeFilterButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterLabel,
                      isActive && styles.activeFilterLabel,
                    ]}
                  >
                    {filtro}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <InvList data={cardsVisibles} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colores.marronOscuro,
  },
  screen: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: Colores.fondo,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 27,
  },
  heading: {
    color: Colores.marronOscuro,
    fontFamily: fuentePixel,
    fontSize: 16,
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  filters: {
    flexDirection: "row",
    gap: 8,
    marginTop: 7,
  },
  filterButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 26,
    borderWidth: 2,
    borderColor: Colores.marronTexto,
    borderRadius: 4,
    backgroundColor: Colores.crema,
  },
  firstFilterButton: {
    width: 62,
  },
  otherFilterButton: {
    width: 84,
  },
  activeFilterButton: {
    borderColor: Colores.verdeOscuro,
    backgroundColor: Colores.verdeOscuro,
  },
  filterLabel: {
    color: Colores.marronOscuro,
    fontFamily: fuentePixel,
    fontSize: 10,
  },
  activeFilterLabel: {
    color: Colores.superficie,
  },
});
