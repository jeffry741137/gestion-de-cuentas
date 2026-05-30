import { LayoutDashboard, RefreshCw, Users, Calendar, CreditCard, Bell, BarChart2, Settings, TrendingUp, MessageSquare, Layers, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'subscriptions', label: 'Suscripciones', icon: RefreshCw },
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'calendar', label: 'Calendario', icon: Calendar },
  { id: 'payments', label: 'Pagos', icon: CreditCard },
  { id: 'reminders', label: 'Recordatorios', icon: Bell },
  { id: 'reports', label: 'Reportes', icon: BarChart2 },
  { id: 'stats', label: 'Estadísticas', icon: TrendingUp },
  { id: 'platforms', label: 'Plataformas', icon: Layers },
  { id: 'messages', label: 'Mensajes', icon: MessageSquare, badge: 12 },
  { id: 'settings', label: 'Configuración', icon: Settings },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-img">
          <span style={{ fontSize: 22 }}>⚡</span>
        </div>
        <div className="sidebar-logo-text">
          <h2>Itachi<span>Peru</span></h2>
          <small>うちはイタチ</small>
          <div className="sidebar-role">PREMIUM</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            className={`nav-item${activePage === id ? ' active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={16} />
            {label}
            {badge && <span className="nav-badge">{badge}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-plan">
        <div className="plan-label">Plan actual</div>
        <div className="plan-name">
          Plan Ninja
          <span className="plan-badge">PREMIUM</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
          Vence el 21/06/2025
        </div>
        <div className="plan-bar">
          <div className="plan-bar-fill" />
        </div>
        <div className="plan-pct">78%</div>
        <button className="plan-btn">👑 Ver mi plan</button>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">⚡</div>
        <div className="user-info">
          <div className="user-name">ItachiPeru</div>
          <div className="user-role">Administrador</div>
        </div>
        <ChevronDown size={14} color="var(--text-muted)" />
      </div>
    </aside>
  );
}
