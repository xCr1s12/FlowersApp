import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeIcon from "../../assets/iconos-svg/navegacion/hogar.svg";
import UserIcon from "../../assets/iconos-svg/navegacion/perfil.svg";
import ChestIcon from "../../assets/iconos-svg/navegacion/inventario.svg";
import SproutIcon from "../../assets/iconos-svg/navegacion/jardin.svg";
import ScanIcon from "../../assets/iconos-svg/navegacion/escaner.svg";

const COLORS = {
  barBg: "#4A2F21",
  barBorder: "#8F5F40",
  barShine: "#6E4631",
  inactive: "#E8D0A0",
  activeBg: "#5DA84B",
  activeBorder: "#2F6B2A",
  activeText: "#FFF3D6",
};

const iconos = {
  inventario: ChestIcon,
  jardin: SproutIcon,
  index: HomeIcon,
  perfil: UserIcon,
  escaner: ScanIcon,
};

const etiquetas = {
  inventario: "Inventario",
  jardin: "Jardín",
  index: "Hogar",
  perfil: "Perfil",
  escaner: "Escáner",
};

function PixelTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.barContainer}>
      <View style={styles.stripeTop} />
      <View style={styles.stripeShine} />

      <View
        style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const routeNavigation = descriptors[route.key].navigation;
          const Icon = iconos[route.name];
          const color = focused ? COLORS.activeText : COLORS.inactive;
          const onPress = () => {
            const event = routeNavigation?.emit?.({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event?.defaultPrevented) {
              routeNavigation.navigate(route.name);
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
                <Icon width={32} height={32} opacity={focused ? 1 : 0.8} />
                <Text style={[styles.label, { color }]} numberOfLines={1}>
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

export default function CustomTabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <PixelTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="inventario" options={{ title: "Inventario" }} />
      <Tabs.Screen name="jardin" options={{ title: "Jardín" }} />
      <Tabs.Screen name="index" options={{ title: "Hogar" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
      <Tabs.Screen name="escaner" options={{ title: "Escáner" }} />
    </Tabs>
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
