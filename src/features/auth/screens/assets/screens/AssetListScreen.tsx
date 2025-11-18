import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { assetService } from '../../../services/assetService';
import { Asset } from '../../../types/asset';

export const AssetListScreen = () => {
  // React Query ile veriyi çekiyoruz
  const {
    data: assets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['assets'],
    queryFn: assetService.getAssets,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#005eb8" />
        <Text style={{ marginTop: 10 }}>Veriler Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Bir hata oluştu!</Text>
      </View>
    );
  }

  // Liste Elemanı Tasarımı (Kart)
  const renderItem = ({ item }: { item: Asset }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.assetName}>{item.name}</Text>
        <Text
          style={[
            styles.statusBadge,
            item.status === 'OPERATIONAL'
              ? styles.statusOk
              : item.status === 'MAINTENANCE'
                ? styles.statusWarning
                : styles.statusError,
          ]}
        >
          {item.status}
        </Text>
      </View>
      <Text style={styles.location}>📍 {item.location}</Text>
      <Text style={styles.type}>Tip: {item.type}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    // Gölge efekti
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  assetName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  statusBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  statusOk: { backgroundColor: '#d1fae5', color: '#065f46' }, // Yeşil
  statusWarning: { backgroundColor: '#fef3c7', color: '#b45309' }, // Turuncu
  statusError: { backgroundColor: '#fee2e2', color: '#991b1b' }, // Kırmızı
  location: { color: '#666', marginBottom: 4 },
  type: { color: '#888', fontSize: 12 },
});
