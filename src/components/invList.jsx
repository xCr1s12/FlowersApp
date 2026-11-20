import React, { memo, useCallback } from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'

import Card from './InvCard'
import { Colores } from '../constants/colors'

const GAP = 16
const CardMemo = memo(Card)


export default function InvList({ data}) {

  const inventarioVacio = data && data.length > 0
  const cardSize = 160;
  const rowHeight = cardSize + GAP 

  
  const renderItem = useCallback(
    ({ item }) => (
      <CardMemo
        size={cardSize}
        title={item.title}
        date={item.date}
        text={item.text}
        image={item.image}
      />
    ),
    [cardSize]
  ) 

  return (
    <View className="w-full flex-1">
        {inventarioVacio ?      
      // valores por verdadero 
      // Flatlist que muestra los objetos en coleccion
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(item.id ?? index)}
        numColumns={2}
        columnWrapperStyle={styles.wrap}
        contentContainerStyle={styles.content}
        getItemLayout={(_, index) => ({
          length: rowHeight,
          offset: rowHeight * Math.floor(index / 2),
          index,
        })}
        initialNumToRender={8}
        windowSize={7}
        removeClippedSubviews
      /> : 

      //valores por falso 
      // contenedor con texto que describe que el inventario esta vacio
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Inventario Vacío</Text>
          <Text style={styles.emptyDescription}>
            Cuando hayan recuerdos en el inventario aparecerán acá
          </Text>
        </View>}
    </View>
  )
}


const styles = StyleSheet.create({
    content: {
        justifyContent: "space-between",
    },
    wrap: {
        paddingHorizontal: 16,
        paddingTop:20,
        gap:8, 
    },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  emptyTitle: {
    color: Colores.marronTexto,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    color: Colores.placeholder,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
});
