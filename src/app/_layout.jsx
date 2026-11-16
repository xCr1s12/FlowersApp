import { useFonts, PixelifySans_600SemiBold } from "@expo-google-fonts/pixelify-sans";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ PixelifySans_600SemiBold });

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
