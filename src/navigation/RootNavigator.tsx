import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../core/store/authStore';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { View, Text, Button } from 'react-native';

const Stack = createNativeStackNavigator();

// Geçici Ana Sayfa (Login sonrası göreceğimiz yer)
const PlaceholderHomeScreen = () => {
  const logout = useAuthStore(state => state.logout);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hoşgeldin Mühendis!</Text>
      <Text style={{ marginBottom: 20 }}>AssetFlow Dashboard</Text>
      <Button title="Çıkış Yap" onPress={logout} />
    </View>
  );
};

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // Giriş Yapılmışsa -> Ana Uygulama
          <Stack.Screen name="Home" component={PlaceholderHomeScreen} />
        ) : (
          // Giriş Yapılmamışsa -> Login Ekranı
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
