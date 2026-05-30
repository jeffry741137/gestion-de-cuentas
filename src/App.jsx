import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Clients from './pages/Clients';
import CalendarPage from './pages/CalendarPage';
import Payments from './pages/Payments';
import Reminders from './pages/Reminders';
import Reports from './pages/Reports';
import Stats from './pages/Stats';
import Platforms from './pages/Platforms';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import { Bell, TrendingUp, Plus } from 'lucide-react';
import { SUBSCRIPTIONS, CLIENTS as CLIENTS_ALL, PLATFORMS as PLATFORMS_ALL } from './data/mockData';

const PAGE_TITLES = {
  dashboard: { title: 'Dashboard', sub: 'Resumen de tu negocio de suscripciones.' },
  subscriptions: { title: 'Suscripciones', sub: 'Gestiona todas tus plataformas y suscripciones activas.' },
  clients: { title: 'Clientes', sub: 'Administra todos tus clientes y suscripciones.' },
  calendar: { title: 'Calendario de vencimientos', sub: 'Visualiza y organiza todos los vencimientos de tus suscripciones y pagos.' },
  payments: { title: 'Pagos', sub: 'Registra y gestiona todos los pagos de tus clientes.' },
  reminders: { title: 'Recordatorios', sub: 'Configura y automatiza recordatorios de pagos para tus clientes.' },
  reports: { title: 'Reportes', sub: 'Genera y exporta reportes de tu negocio.' },
  stats: { title: 'Estadísticas', sub: 'Analiza el rendimiento y crecimiento de tu negocio.' },
  platforms: { title: 'Plataformas', sub: 'Gestiona todas las plataformas disponibles y sus cuentas.' },
  messages: { title: 'Mensajes', sub: 'Envía recordatorios y mensajes a tus clientes via WhatsApp.' },
  settings: { title: 'Configuración', sub: 'Personaliza y configura tu cuenta y las preferencias de tu negocio.' },
};

const today = new Date();
function getDays(dateStr) {
  return Math.round((new Date(dateStr) - today) / (1000 * 60 * 60 * 24));
}

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [showNotifs, setShowNotifs] = useState(false);

  const urgentCount = SUBSCRIPTIONS.filter(s => {
    const d = getDays(s.renewalDate);
    return d >= -3 && d <= 3;
  }).length;

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onNavigate={setPage} />;
      case 'subscriptions': return <Subscriptions />;
      case 'clients': return <Clients />;
      case 'calendar': return <CalendarPage />;
      case 'payments': return <Payments />;
      case 'reminders': return <Reminders />;
      case 'reports': return <Reports />;
      case 'stats': return <Stats />;
      case 'platforms': return <Platforms />;
      case 'messages': return <Messages />;
      case 'settings': return <Settings />;
      default: return <Dashboard onNavigate={setPage} />;
    }
  };

  const pageInfo = PAGE_TITLES[page];

  const PAGE_ACTIONS = {
    subscriptions: 'Nueva suscripción',
    clients: 'Nuevo cliente',
    calendar: 'Nuevo evento',
    payments: 'Registrar pago',
    reminders: 'Crear recordatorio',
    platforms: 'Agregar plataforma',
    settings: 'Guardar cambios',
  };
  const pageAction = PAGE_ACTIONS[page];

  return (
    <>
      <Sidebar activePage={page} onNavigate={setPage} />
      <div className="main-content">
        {/* Top bar */}
        <div className="topbar">
          <div className="topbar-title">
            <h1>{pageInfo?.title}</h1>
            <p>{pageInfo?.sub}</p>
          </div>

          <div style={{ flex: 1 }} />

          <div className="topbar-actions">
            <div className="icon-btn" style={{ position: 'relative' }} onClick={() => setShowNotifs(!showNotifs)}>
              <Bell size={16} />
              {urgentCount > 0 && <div className="notif-dot" />}
            </div>
            <div className="icon-btn">
              <TrendingUp size={16} />
            </div>
            {pageAction && (
              <button className="btn-primary">
                <Plus size={14} />
                {pageAction}
              </button>
            )}
          </div>
        </div>

        {/* Notification dropdown */}
        {showNotifs && (
          <div style={{
            position: 'fixed', top: 62, right: 16, width: 320, background: 'var(--bg-card)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius)', zIndex: 100,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
          }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
              Notificaciones
              <button onClick={() => setShowNotifs(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16 }}>×</button>
            </div>
            <div style={{ maxHeight: 360, overflowY: 'auto' }}>
              {SUBSCRIPTIONS.filter(s => {
                const d = getDays(s.renewalDate);
                return d >= -7 && d <= 7;
              }).slice(0, 8).map(sub => {
                const d = getDays(sub.renewalDate);
                const c = CLIENTS_ALL.find(cl => cl.id === sub.clientId);
                const p = PLATFORMS_ALL.find(pl => pl.id === sub.platformId);
                return (
                  <div key={sub.id} style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 20 }}>{p?.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{c?.name} — {p?.name}</div>
                      <div style={{ fontSize: 11, color: d < 0 ? 'var(--red)' : d <= 3 ? 'var(--orange)' : 'var(--text-muted)' }}>
                        {d < 0 ? `Vencida hace ${Math.abs(d)} día${Math.abs(d) !== 1 ? 's' : ''}` : d === 0 ? 'Vence hoy' : `Vence en ${d} día${d !== 1 ? 's' : ''}`}
                      </div>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>S/ {sub.price.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: '10px 16px', textAlign: 'center' }}>
              <button onClick={() => { setPage('calendar'); setShowNotifs(false); }} style={{ background: 'none', border: 'none', color: 'var(--purple-light)', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
                Ver todos en el calendario →
              </button>
            </div>
          </div>
        )}

        {/* Page content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {renderPage()}
        </div>
      </div>
    </>
  );
}
