import React from "react";
import { StatusBar, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JardinScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#4A2F21]"  edges={["top"]}>
      <StatusBar  />
      <ImageBackground
        source={require("../../assets/fondo/Jardin.jpeg")}
        resizeMode="cover"
        style={Styles.Fondo}
      ></ImageBackground>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  Fondo: { flex: 1 },
});
