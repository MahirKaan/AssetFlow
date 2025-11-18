import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../core/store/authStore';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { MainTabNavigator } from './MainTabNavigator'; // Yeni oluşturduğun Tab Navigator'ı ekledik

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  // Zustand store'dan kullanıcının giriş durumunu dinliyoruz
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // KULLANICI GİRİŞ YAPMIŞSA -> Ana Tab Menüsü (Varlıklar, QR vb.)
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        ) : (
          // KULLANICI GİRİŞ YAPMAMIŞSA -> Login Ekranı
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
