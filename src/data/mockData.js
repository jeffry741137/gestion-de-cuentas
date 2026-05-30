export const PLATFORMS = [
  { id: 'netflix', name: 'Netflix', color: '#E50914', bgColor: '#1a0000', icon: '🎬', category: 'streaming', price: 49.90, slots: 5 },
  { id: 'disney', name: 'Disney+', color: '#0063E5', bgColor: '#000a1a', icon: '✨', category: 'streaming', price: 39.90, slots: 4 },
  { id: 'prime', name: 'Prime Video', color: '#00A8E1', bgColor: '#001a22', icon: '📺', category: 'streaming', price: 44.90, slots: 5 },
  { id: 'crunchyroll', name: 'Crunchyroll', color: '#F47521', bgColor: '#1a0b00', icon: '⚡', category: 'streaming', price: 27.90, slots: 4 },
  { id: 'max', name: 'Max', color: '#002BE7', bgColor: '#000514', icon: '🎭', category: 'streaming', price: 29.90, slots: 3 },
  { id: 'spotify', name: 'Spotify', color: '#1DB954', bgColor: '#001a09', icon: '🎵', category: 'music', price: 24.90, slots: 6 },
  { id: 'youtube', name: 'YouTube Premium', color: '#FF0000', bgColor: '#1a0000', icon: '▶️', category: 'streaming', price: 29.90, slots: 5 },
  { id: 'chatgpt', name: 'ChatGPT Plus', color: '#10A37F', bgColor: '#001a14', icon: '🤖', category: 'ia', price: 79.90, slots: 2 },
  { id: 'canva', name: 'Canva Pro', color: '#00C4CC', bgColor: '#001a1b', icon: '🎨', category: 'productividad', price: 35.90, slots: 5 },
  { id: 'capcut', name: 'CapCut Pro', color: '#FF3D77', bgColor: '#1a0010', icon: '✂️', category: 'productividad', price: 25.90, slots: 2 },
  { id: 'adobe', name: 'Adobe CC', color: '#FF0000', bgColor: '#1a0000', icon: '🅐', category: 'productividad', price: 89.90, slots: 1 },
  { id: 'paramount', name: 'Paramount+', color: '#0064FF', bgColor: '#000d1a', icon: '⭐', category: 'streaming', price: 22.90, slots: 3 },
  { id: 'deezer', name: 'Deezer', color: '#A238FF', bgColor: '#0d001a', icon: '🎶', category: 'music', price: 18.90, slots: 5 },
  { id: 'duolingo', name: 'Duolingo Plus', color: '#58CC02', bgColor: '#081a00', icon: '🦉', category: 'productividad', price: 15.90, slots: 1 },
  { id: 'tidal', name: 'Tidal', color: '#FFFFFF', bgColor: '#0a0a0a', icon: '🌊', category: 'music', price: 24.90, slots: 5 },
  { id: 'office', name: 'Office 365', color: '#D83B01', bgColor: '#1a0700', icon: '📋', category: 'productividad', price: 35.90, slots: 5 },
];

export const CLIENTS = [
  { id: 1, name: 'Juan Pérez', whatsapp: '+51 987 654 321', email: 'juanperez@gmail.com', avatar: null, since: '2024-03-15', notes: 'Cliente confiable, siempre paga antes de la fecha.' },
  { id: 2, name: 'María García', whatsapp: '+51 912 345 678', email: 'maria.garcia@gmail.com', avatar: null, since: '2024-03-10', notes: '' },
  { id: 3, name: 'Carlos López', whatsapp: '+51 923 456 789', email: 'carlos.lopez@gmail.com', avatar: null, since: '2024-02-05', notes: '' },
  { id: 4, name: 'Ana Torres', whatsapp: '+51 934 567 890', email: 'ana.torres@gmail.com', avatar: null, since: '2024-02-28', notes: '' },
  { id: 5, name: 'Luis Ramírez', whatsapp: '+51 945 678 901', email: 'luis.ramirez@gmail.com', avatar: null, since: '2024-03-12', notes: '' },
  { id: 6, name: 'Sofía Mendoza', whatsapp: '+51 956 789 012', email: 'sofia.mendoza@gmail.com', avatar: null, since: '2024-04-03', notes: '' },
  { id: 7, name: 'Diego Soto', whatsapp: '+51 967 890 123', email: 'diego.soto@gmail.com', avatar: null, since: '2024-03-22', notes: '' },
  { id: 8, name: 'Valeria Castro', whatsapp: '+51 978 901 234', email: 'valeria.castro@gmail.com', avatar: null, since: '2024-04-18', notes: '' },
  { id: 9, name: 'Andrés Rojas', whatsapp: '+51 989 012 345', email: 'andres.rojas@gmail.com', avatar: null, since: '2024-01-30', notes: '' },
  { id: 10, name: 'Camila Herrera', whatsapp: '+51 990 123 456', email: 'camila.herrera@gmail.com', avatar: null, since: '2024-02-14', notes: '' },
];

// Generate subscriptions with dates relative to today
const today = new Date();
const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export const SUBSCRIPTIONS = [
  { id: 1, clientId: 1, platformId: 'netflix', plan: 'Premium', price: 20.00, renewalDate: addDays(today, 2), status: 'por_vencer', accountType: 'cuenta_completa', email: 'itachi98@netflix.com' },
  { id: 2, clientId: 1, platformId: 'spotify', plan: 'Individual', price: 15.00, renewalDate: addDays(today, 2), status: 'por_vencer', accountType: 'perfil', email: 'zoro@spotify.com' },
  { id: 3, clientId: 1, platformId: 'chatgpt', plan: 'Plus', price: 10.00, renewalDate: addDays(today, 2), status: 'por_vencer', accountType: 'perfil', email: 'kakashi@openai.com' },
  { id: 4, clientId: 2, platformId: 'disney', plan: 'Estándar', price: 20.00, renewalDate: addDays(today, 4), status: 'por_vencer', accountType: 'perfil', email: 'todoroki@disneyplus.com' },
  { id: 5, clientId: 2, platformId: 'spotify', plan: 'Individual', price: 20.00, renewalDate: addDays(today, 4), status: 'por_vencer', accountType: 'perfil', email: 'zoro@spotify.com' },
  { id: 6, clientId: 3, platformId: 'prime', plan: 'Estándar', price: 15.00, renewalDate: addDays(today, 34), status: 'activa', accountType: 'cuenta_completa', email: 'law@primevideo.com' },
  { id: 7, clientId: 3, platformId: 'netflix', plan: 'Premium', price: 20.00, renewalDate: addDays(today, 34), status: 'activa', accountType: 'perfil', email: 'itachi98@netflix.com' },
  { id: 8, clientId: 4, platformId: 'spotify', plan: 'Individual', price: 18.00, renewalDate: addDays(today, -1), status: 'vencida', accountType: 'perfil', email: 'zoro@spotify.com' },
  { id: 9, clientId: 4, platformId: 'deezer', plan: 'Premium', price: 12.00, renewalDate: addDays(today, -1), status: 'vencida', accountType: 'perfil', email: 'killua@deezer.com' },
  { id: 10, clientId: 5, platformId: 'youtube', plan: 'Premium', price: 20.00, renewalDate: addDays(today, 6), status: 'por_vencer', accountType: 'cuenta_completa', email: 'luffy@youtube.com' },
  { id: 11, clientId: 5, platformId: 'chatgpt', plan: 'Plus', price: 10.00, renewalDate: addDays(today, 6), status: 'por_vencer', accountType: 'perfil', email: 'kakashi@openai.com' },
  { id: 12, clientId: 6, platformId: 'netflix', plan: 'Premium', price: 20.00, renewalDate: addDays(today, 31), status: 'activa', accountType: 'perfil', email: 'itachi98@netflix.com' },
  { id: 13, clientId: 6, platformId: 'disney', plan: 'Estándar', price: 15.00, renewalDate: addDays(today, 31), status: 'activa', accountType: 'perfil', email: 'todoroki@disneyplus.com' },
  { id: 14, clientId: 7, platformId: 'crunchyroll', plan: 'Fan', price: 12.00, renewalDate: addDays(today, -2), status: 'vencida', accountType: 'perfil', email: 'naruto@crunchyroll.com' },
  { id: 15, clientId: 7, platformId: 'prime', plan: 'Estándar', price: 10.00, renewalDate: addDays(today, -2), status: 'vencida', accountType: 'cuenta_completa', email: 'law@primevideo.com' },
  { id: 16, clientId: 8, platformId: 'spotify', plan: 'Individual', price: 15.00, renewalDate: addDays(today, 12), status: 'activa', accountType: 'perfil', email: 'zoro@spotify.com' },
  { id: 17, clientId: 8, platformId: 'deezer', plan: 'Premium', price: 13.00, renewalDate: addDays(today, 12), status: 'activa', accountType: 'perfil', email: 'killua@deezer.com' },
  { id: 18, clientId: 9, platformId: 'netflix', plan: 'Premium', price: 25.00, renewalDate: addDays(today, 1), status: 'por_vencer', accountType: 'cuenta_completa', email: 'itachi98@netflix.com' },
  { id: 19, clientId: 9, platformId: 'disney', plan: 'Estándar', price: 20.00, renewalDate: addDays(today, 1), status: 'por_vencer', accountType: 'perfil', email: 'todoroki@disneyplus.com' },
  { id: 20, clientId: 9, platformId: 'prime', plan: 'Estándar', price: 10.00, renewalDate: addDays(today, 1), status: 'por_vencer', accountType: 'perfil', email: 'law@primevideo.com' },
  { id: 21, clientId: 10, platformId: 'chatgpt', plan: 'Plus', price: 10.00, renewalDate: addDays(today, 41), status: 'activa', accountType: 'perfil', email: 'kakashi@openai.com' },
  { id: 22, clientId: 10, platformId: 'canva', plan: 'Pro', price: 10.00, renewalDate: addDays(today, 41), status: 'activa', accountType: 'perfil', email: 'nami@canva.com' },
];

export const PAYMENTS = [
  { id: 'PAG-001', clientId: 1, subscriptionId: 1, amount: 45.00, method: 'yape', date: '2024-05-01', status: 'completado' },
  { id: 'PAG-002', clientId: 2, subscriptionId: 4, amount: 29.90, method: 'yape', date: '2024-05-01', status: 'completado' },
  { id: 'PAG-003', clientId: 3, subscriptionId: 6, amount: 39.90, method: 'plin', date: '2024-05-01', status: 'pendiente' },
  { id: 'PAG-004', clientId: 4, subscriptionId: 8, amount: 59.90, method: 'yape', date: '2024-04-30', status: 'completado' },
  { id: 'PAG-005', clientId: 5, subscriptionId: 10, amount: 49.90, method: 'transferencia', date: '2024-04-30', status: 'fallido' },
];
