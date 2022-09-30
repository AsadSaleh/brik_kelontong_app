import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { Product } from './services/product';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ProductListScreen from './screens/ProductListScreen';
import AddProductScreen from './screens/AddProductScreen';

export type RootStackParamList = {
  ProductListScreen: undefined;
  ProductDetailScreen: { product: Product };
  AddProductScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductListScreen">
        <Stack.Screen
          name="ProductListScreen"
          component={ProductListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={({ route }) => ({
            title: `Detail ${route.params.product.name}`,
          })}
        />
        <Stack.Screen
          name="AddProductScreen"
          component={AddProductScreen}
          options={() => ({ title: 'Add New Product' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
