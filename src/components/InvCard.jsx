import React from 'react'
import { Image, View, StyleSheet, Text } from 'react-native'
import { Colores, EstilosTexto } from '../constants/tema'

const REF_SIZE = 150
const REF_COLOR = '#FFF7E8'   // fondo de la card
const REF_ACCENT = '#F3E3B5'  // fondo de la imagen 

export default function Card({
  title,
  date,
  text,
  size = REF_SIZE,
  color = REF_COLOR,
  accent = REF_ACCENT,
  image,
}) {
  return (
    <View
      className="border-2 rounded-md p-2 overflow-hidden"
      style={[styles.card, { width: size, height: size + 15, backgroundColor: color }]}
    >
      {/* Imagen con fondo de color */}
      <View
        className="flex-1 rounded-lg overflow-hidden"
        style={{ backgroundColor: accent }}
      >
        {image ? (
          <Image source={image} className="w-full h-full" resizeMode="cover" />
        ) : null}
      </View>

      {/* Título o nombre del remitente */}
      <Text
        className="text-center tracking-widest mt-2.5"
        style={styles.title}
        numberOfLines={1}
      >
        {String(title).toUpperCase()}
      </Text>

      {/* Fecha */}
      <Text
        className="text-center mt-2"
        style={styles.date}
        numberOfLines={1}
      >
        {date}
      </Text>

      {/* Texto */}
      <View
        className="mt-2 rounded-md px-2 py-1.5 items-center justify-center"
        style={{ backgroundColor: accent }}
      >
        <Text className="text-center" style={styles.text} numberOfLines={1}>
          {text}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderColor: '#4A3A2A',
  },
  title: {
    ...EstilosTexto.cardTitulo,
    color: Colores.marronOscuro,
  },
  date: {
    ...EstilosTexto.meta,
    color: Colores.marronOscuro,
  },
  text: {
    ...EstilosTexto.cuerpo,
    color: Colores.marronOscuro,
  },
})
