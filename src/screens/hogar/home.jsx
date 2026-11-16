import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#4A2F21]"  edges={["top"]}>
      <StatusBar style="dark"  />
      <ImageBackground
        source={require("../../assets/fondo/Fondo.png")}
        resizeMode="cover"
        style={styles.Fondo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Fondo: {
    flex: 1
  },
});
