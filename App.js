import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*
 * Configuración de estilos instalada:
 * - NativeWind 4.2.7 integra Tailwind CSS 3 con componentes nativos de iOS y Android.
 *   Se eligió porque Tailwind CSS estándar solo aplica directamente a web.
 * - tailwind.config.js indica qué archivos debe analizar Tailwind para encontrar clases.
 * - babel.config.js transforma className y metro.config.js procesa global.css.
 * - index.js importa global.css y app.json usa Metro para la plataforma web.
 * - package.json y package-lock.json incluyen NativeWind, Tailwind, sus dependencias
 *   nativas compatibles con Expo SDK 57 y react-native-web/react-dom para web.
 *
 * Desde ahora, usa className en View, Text y otros componentes React Native
 * compatibles. Escribe las clases como cadenas completas en archivos incluidos
 * por tailwind.config.js; evita construir nombres de clase dinámicamente.
 * Puedes conservar style para valores calculados en tiempo de ejecución.
 *
 * Ejemplo:
 *
 * <View className="flex-1 items-center justify-center bg-white px-6">
 *   <Text className="text-2xl font-bold text-pink-700">Mis flores</Text>
 * </View>
 */
