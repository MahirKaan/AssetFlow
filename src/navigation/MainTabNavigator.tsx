import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AssetListScreen } from '../features/assets/screens/AssetListScreen';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

// Geçici QR Ekranı
const QRPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>QR Tarayıcı Yakında...</Text>
  </View>
);

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      id={undefined} // <--- İŞTE BU SATIRI EKLEDİK, HATA GİDECEK
      screenOptions={{
        tabBarActiveTintColor: '#005eb8', // SOCAR Mavisi
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Assets"
        component={AssetListScreen}
        options={{ title: 'Varlıklar', tabBarIcon: () => <Text>📦</Text> }}
      />
      <Tab.Screen
        name="QRScan"
        component={QRPlaceholder}
        options={{ title: 'QR Tara', tabBarIcon: () => <Text>📷</Text> }}
      />
    </Tab.Navigator>
  );
};
