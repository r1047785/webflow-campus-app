import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import NewsDetailsScreen from "./screens/NewsDetailsScreen";
import CampusDetailsScreen from "./screens/CampusDetailsScreen";
import BookGameScreen from "./screens/BookGameScreen";
import { colors } from "./theme/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.ink,
          headerTitleStyle: { fontWeight: "900" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "BA Busleyden Atheneum" }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ title: "Product" }}
        />
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetailsScreen}
          options={{ title: "Nieuws" }}
        />
        <Stack.Screen
          name="CampusDetails"
          component={CampusDetailsScreen}
          options={{ title: "Campus" }}
        />
        <Stack.Screen
          name="BookGame"
          component={BookGameScreen}
          options={{ title: "Mini game" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
