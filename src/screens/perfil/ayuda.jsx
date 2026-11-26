import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

import DivisorDecorativo from "../../assets/iconos-svg/decorativos/divisor-decorativo.svg";
import {
  Colores,
  EstilosTexto,
  fuentePixelBold,
} from "../../constants/tema";

const preguntas = [
  {
    pregunta: "¿CÓMO ESCANEO UNA FLOR?",
    respuesta:
      "Ve a la pestaña Escáner, apunta la cámara a la flor y espera a que se reconozca. Se guardará en tu Inventario.",
  },
  {
    pregunta: "¿CÓMO PLANTO UNA FLOR?",
    respuesta:
      "Abre tu Inventario, elige una flor y selecciona la opción para plantarla. Después podrás verla crecer en tu Jardín.",
  },
  {
    pregunta: "¿QUÉ ES EL HOGAR?",
    respuesta:
      "Es tu espacio principal: desde allí puedes ver tu progreso y acceder a las secciones de FlowersApp.",
  },
  {
    pregunta: "¿CÓMO CAMBIO MI AVATAR?",
    respuesta:
      "Entra a tu Perfil y selecciona Editar perfil para elegir otro avatar.",
  },
  {
    pregunta: "¿CÓMO CAMBIO EL IDIOMA?",
    respuesta:
      "Ve a Perfil > Ajustes y toca Idioma para seleccionar el idioma que prefieras.",
  },
];

export default function AyudaScreen() {
  const router = useRouter();
  const [preguntaAbierta, setPreguntaAbierta] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar style="light" backgroundColor={Colores.marronOscuro} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver al perfil"
          onPress={() => router.push("/perfil/ajustes")}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backLabel}>VOLVER A AJUSTES</Text>
        </Pressable>

        <Text style={styles.heading}>AYUDA</Text>
        <DivisorDecorativo width={238} height={14} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PREGUNTAS FRECUENTES</Text>
          <View style={styles.faqCard}>
            {preguntas.map(({ pregunta, respuesta }, index) => {
              const isOpen = preguntaAbierta === index;

              return (
                <View
                  key={pregunta}
                  style={[
                    styles.faqItem,
                    index < preguntas.length - 1 && styles.faqDivider,
                  ]}
                >
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ expanded: isOpen }}
                    onPress={() => setPreguntaAbierta(isOpen ? null : index)}
                    style={styles.questionRow}
                  >
                    <Text style={styles.question} numberOfLines={2}>
                      {pregunta}
                    </Text>
                    <View
                      style={[
                        styles.expandIcon,
                        isOpen && styles.expandIconOpen,
                      ]}
                    >
                      <Text style={styles.expandIconText}>
                        {isOpen ? "−" : "+"}
                      </Text>
                    </View>
                  </Pressable>
                  {isOpen ? (
                    <Text style={styles.answer}>{respuesta}</Text>
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.supportCard}>
          <Text style={styles.supportTitle}>¿NECESITAS MÁS AYUDA?</Text>
          <Text style={styles.supportMessage}>
            Escríbenos y te ayudaremos con tu jardín.
          </Text>
          <View style={styles.supportButton}>
            <Text style={styles.supportButtonText}>CONTACTAR SOPORTE</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colores.fondo,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 22,
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
    fontFamily: fuentePixelBold,
    fontSize: 17,
    lineHeight: 18,
  },
  backLabel: {
    ...EstilosTexto.boton,
    textTransform: "none",
    color: Colores.marronTexto,
    marginLeft: 2,
  },
  heading: {
    ...EstilosTexto.tituloPantalla,
    color: Colores.marronOscuro,
    letterSpacing: 0.6,
    marginTop: 8,
    marginBottom: 8,
  },
  section: {
    alignSelf: "stretch",
    marginTop: 14,
  },
  sectionLabel: {
    ...EstilosTexto.cardTitulo,
    color: Colores.marronTexto,
    marginBottom: 6,
  },
  faqCard: {
    alignSelf: "stretch",
    backgroundColor: Colores.crema,
    borderColor: Colores.marronOscuro,
    borderRadius: 4,
    borderWidth: 2,
    overflow: "hidden",
  },
  faqItem: {
    backgroundColor: Colores.crema,
  },
  faqDivider: {
    borderBottomColor: Colores.navInactivo,
    borderBottomWidth: 1,
  },
  questionRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 36,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  question: {
    ...EstilosTexto.cardTitulo,
    color: Colores.marronOscuro,
    flex: 1,
    paddingRight: 8,
  },
  expandIcon: {
    alignItems: "center",
    backgroundColor: Colores.superficie,
    borderColor: Colores.marronOscuro,
    borderRadius: 1,
    borderWidth: 2,
    height: 16,
    justifyContent: "center",
    width: 16,
  },
  expandIconOpen: {
    backgroundColor: Colores.verdeOscuro,
  },
  expandIconText: {
    color: Colores.marronOscuro,
    fontFamily: fuentePixelBold,
    fontSize: 12,
    lineHeight: 13,
  },
  answer: {
    ...EstilosTexto.cuerpo,
    backgroundColor: Colores.superficie,
    color: Colores.marronTexto,
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  supportCard: {
    alignSelf: "stretch",
    backgroundColor: Colores.crema,
    borderColor: Colores.marronOscuro,
    borderRadius: 4,
    borderWidth: 2,
    marginTop: 12,
    padding: 12,
  },
  supportTitle: {
    ...EstilosTexto.cardTitulo,
    color: Colores.marronOscuro,
  },
  supportMessage: {
    ...EstilosTexto.cuerpo,
    color: Colores.marronTexto,
    marginTop: 8,
  },
  supportButton: {
    alignItems: "center",
    borderColor: Colores.marronOscuro,
    borderRadius: 3,
    borderWidth: 2,
    justifyContent: "center",
    marginTop: 8,
    minHeight: 36,
    paddingHorizontal: 8,
  },
  supportButtonText: {
    ...EstilosTexto.boton,
    color: Colores.marronOscuro,
  },
});