export interface Asset {
  id: string;
  name: string; // Örn: Pompa P-102
  type: 'PUMP' | 'TANK' | 'VALVE' | 'SENSOR';
  status: 'OPERATIONAL' | 'MAINTENANCE' | 'STOPPED';
  location: string; // Örn: Bölge A, Kat 2
  qrCode: string; // QR kodun içindeki değer
  lastMaintenanceDate: string;
  imageUrl?: string; // Ekipmanın resmi
}
