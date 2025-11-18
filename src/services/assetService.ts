import { Asset } from '../types/asset';

// SAHTE VERİ TABANI
const MOCK_ASSETS: Asset[] = [
  {
    id: '1',
    name: 'Ham Petrol Pompası P-101',
    type: 'PUMP',
    status: 'OPERATIONAL',
    location: 'Rafineri Bölge A',
    qrCode: 'asset-101',
    lastMaintenanceDate: '2023-10-15',
  },
  {
    id: '2',
    name: 'Depolama Tankı T-500',
    type: 'TANK',
    status: 'MAINTENANCE',
    location: 'Depolama Sahası Batı',
    qrCode: 'asset-500',
    lastMaintenanceDate: '2023-09-01',
  },
  {
    id: '3',
    name: 'Basınç Valvi V-22',
    type: 'VALVE',
    status: 'STOPPED',
    location: 'Boru Hattı 3',
    qrCode: 'asset-022',
    lastMaintenanceDate: '2023-11-20',
  },
];

export const assetService = {
  // Tüm varlıkları getir (API isteğini simüle ediyoruz)
  getAssets: async (): Promise<Asset[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(MOCK_ASSETS);
      }, 1000); // 1 saniye gecikme ekledik ki "Yükleniyor..." ikonunu görebilelim
    });
  },

  // Tek bir varlığı ID ile getir
  getAssetById: async (id: string): Promise<Asset | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const asset = MOCK_ASSETS.find(a => a.id === id);
        resolve(asset);
      }, 500);
    });
  },
};
