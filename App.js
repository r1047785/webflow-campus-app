import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import NewsDetailsScreen from "./screens/NewsDetailsScreen";
import CampusDetailsScreen from "./screens/CampusDetailsScreen";
import BookGameScreen from "./screens/BookGameScreen";
import CartScreen from "./screens/CartScreen";
import { CartProvider, useCart } from "./CartContext";
import { colors } from "./theme/colors";
import { Text, TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

function CartButton({ navigation }) {
  const { cartCount } = useCart();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
      <Text style={{ color: colors.primaryDark, fontWeight: "900" }}>
        Mandje ({cartCount})
      </Text>
    </TouchableOpacity>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.ink,
          headerTitleStyle: { fontWeight: "900" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
          headerRight: () => <CartButton navigation={navigation} />
        })}
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
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: "Winkelmandje" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}
