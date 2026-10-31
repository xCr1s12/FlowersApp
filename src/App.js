import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import CustomTabNavigator from "./components/navigation/CustomTabs"

export default function App() {
  return (
    <NavigationContainer>
      <CustomTabNavigator />
    </NavigationContainer>
  )
}
