import axios from 'axios';

// İleride buraya gerçek API adresini yazacağız (şimdilik localhost veya mock)
const BASE_URL = 'https://api.mock-socar-assetflow.com';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 saniye içinde cevap gelmezse iptal et
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST INTERCEPTOR (İstek gitmeden önce araya gir)
// Burada ileride "Her isteğe JWT token ekle" diyeceğiz.
api.interceptors.request.use(
  async config => {
    // TODO: Zustand store'dan token'ı alıp buraya ekleyeceğiz
    // const token = useAuthStore.getState().token;
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log(`[API Request] ${config.method?.toUpperCase()} - ${config.url}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR (Cevap geldikten sonra araya gir)
// Burada 401 (Unauthorized) hatalarını yakalayıp kullanıcıyı logout yapacağız.
api.interceptors.response.use(
  response => response,
  error => {
    console.error('[API Error]', error.response?.status, error.message);
    return Promise.reject(error);
  },
);
