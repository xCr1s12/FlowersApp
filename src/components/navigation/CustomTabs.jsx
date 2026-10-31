import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  PixelifySans_600SemiBold,
} from "@expo-google-fonts/pixelify-sans";

import HomeIcon from "../../assets/iconos-svg/navegacion/hogar.svg";
import UserIcon from "../../assets/iconos-svg/navegacion/perfil.svg";
import ChestIcon from "../../assets/iconos-svg/navegacion/inventario.svg";
import SproutIcon from "../../assets/iconos-svg/navegacion/jardin.svg";
import ScanIcon from "../../assets/iconos-svg/navegacion/escaner.svg";

// screens
import homeScreen from "../../screens/hogar/home";
import inventarioScreen from "../../screens/inventario/inventario";
import jardinScreen from "../../screens/jardin/jardin";
import scannerScreen from "../../screens/scaner/scanner";
import perfilScreen from "../../screens/usuario/perfil";

const Tab = createBottomTabNavigator();

const COLORS = {
  barBg: "#4A2F21",
  barBorder: "#8F5F40", // franja superior clara
  barShine: "#6E4631", // franja de brillo/transición
  inactive: "#E8D0A0", // crema
  activeBg: "#5DA84B", // verde
  activeBorder: "#2F6B2A",
  activeText: "#FFF3D6",
};

const iconos = {
  Inventario: ChestIcon,
  Jardin: SproutIcon,
  hogar: HomeIcon,
  Perfil: UserIcon,
  Escaner: ScanIcon,
};

const etiquetas = {
  Inventario: "Inventario",
  Jardin: "Jardín",
  hogar: "Hogar",
  Perfil: "Perfil",
  Escaner: "Escáner",
};

function PixelTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.barContainer}>
      {/* Las dos franjas superiores */}
      <View style={styles.stripeTop} />
      <View style={styles.stripeShine} />

      <View
        style={[
          styles.bar,
          { paddingBottom: Math.max(insets.bottom, 10) },
        ]}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const Icon = iconos[route.name];
          const color = focused ? COLORS.activeText : COLORS.inactive;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={etiquetas[route.name]}
              style={styles.tabWrapper}
            >
              <View style={[styles.tab, focused && styles.tabActive]}>
                <Icon
                  width={32}
                  height={32}
                  opacity={focused ? 1 : 0.8}
                />
                <Text
                  style={[styles.label, { color }]}
                  numberOfLines={1}
                >
                  {etiquetas[route.name]}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function CustomTabNavigator() {
  const [fontsLoaded] = useFonts({ PixelifySans_600SemiBold });
  if (!fontsLoaded) return null;

  return (
    <Tab.Navigator
      initialRouteName="hogar"
      tabBar={(props) => <PixelTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Inventario" component={inventarioScreen} />
      <Tab.Screen name="Jardin" component={jardinScreen} />
      <Tab.Screen name="hogar" component={homeScreen} />
      <Tab.Screen name="Perfil" component={perfilScreen} />
      <Tab.Screen name="Escaner" component={scannerScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    backgroundColor: COLORS.barBg,
  },
  stripeTop: {
    height: 3,
    backgroundColor: COLORS.barBorder,
  },
  stripeShine: {
    height: 2,
    backgroundColor: COLORS.barShine,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.barBg,
    paddingTop: 8,
    paddingHorizontal: 6,
  },
  tabWrapper: {
    flex: 1,
    alignItems: "center",
  },
  tab: {
    minWidth: 64,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "transparent",
  },
  tabActive: {
    backgroundColor: COLORS.activeBg,
    borderColor: COLORS.activeBorder,
  },
  label: {
    fontFamily: "PixelifySans_600SemiBold",
    fontSize: 11,
    letterSpacing: 0.3,
  },
});