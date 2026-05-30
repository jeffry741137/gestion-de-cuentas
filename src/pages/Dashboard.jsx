import { TrendingUp, Users, RefreshCw, CreditCard, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { SUBSCRIPTIONS, CLIENTS, PLATFORMS, PAYMENTS } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

const today = new Date();

function getDaysUntil(dateStr) {
  const d = new Date(dateStr);
  const diff = Math.round((d - today) / (1000 * 60 * 60 * 24));
  return diff;
}

function getPlatform(id) { return PLATFORMS.find(p => p.id === id); }
function getClient(id) { return CLIENTS.find(c => c.id === id); }

const revenueData = [
  { date: '01 May', value: 180 },
  { date: '03 May', value: 220 },
  { date: '05 May', value: 195 },
  { date: '07 May', value: 260 },
  { date: '09 May', value: 280 },
  { date: '11 May', value: 245 },
  { date: '13 May', value: 270 },
  { date: '15 May', value: 290 },
  { date: '16 May', value: 310 },
];

const platformRevenue = [
  { name: 'Netflix', value: 40, color: '#E50914' },
  { name: 'Spotify', value: 20, color: '#1DB954' },
  { name: 'Disney+', value: 17, color: '#0063E5' },
  { name: 'YouTube', value: 11, color: '#FF0000' },
  { name: 'Otros', value: 12, color: '#7c3aed' },
];

export default function Dashboard({ onNavigate }) {
  const totalRevenue = SUBSCRIPTIONS.reduce((s, sub) => s + sub.price, 0);
  const activeCount = SUBSCRIPTIONS.filter(s => s.status === 'activa').length;
  const expiringCount = SUBSCRIPTIONS.filter(s => s.status === 'por_vencer').length;
  const expiredCount = SUBSCRIPTIONS.filter(s => s.status === 'vencida').length;

  const urgent = SUBSCRIPTIONS
    .filter(s => s.status === 'por_vencer' || s.status === 'vencida')
    .sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate))
    .slice(0, 5);

  const recentPayments = PAYMENTS.slice(0, 4);

  return (
    <div className="page-content">
      {expiredCount > 0 && (
        <div className="alert-banner">
          <AlertCircle size={16} />
          ¡Atención! Hay {expiredCount} suscripciones vencidas que requieren tu atención.
          <button onClick={() => onNavigate('subscriptions')} style={{ marginLeft: 'auto', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
            Ver ahora
          </button>
        </div>
      )}

      {expiringCount > 0 && (
        <div className="alert-banner orange">
          <Clock size={16} />
          {expiringCount} suscripciones próximas a vencer. Contacta a tus clientes.
          <button onClick={() => onNavigate('reminders')} style={{ marginLeft: 'auto', background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', color: '#fcd34d', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
            Enviar recordatorios
          </button>
        </div>
      )}

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <TrendingUp size={12} /> Ingresos totales
          </div>
          <div className="stat-value" style={{ color: 'var(--green)' }}>S/ {totalRevenue.toFixed(2)}</div>
          <div className="stat-change">+18% vs. mes anterior</div>
        </div>
        <div className="stat-card">
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RefreshCw size={12} /> Suscripciones
          </div>
          <div className="stat-value">{SUBSCRIPTIONS.length}</div>
          <div className="stat-change">+16% vs. mes anterior</div>
        </div>
        <div className="stat-card">
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Users size={12} /> Clientes
          </div>
          <div className="stat-value">{CLIENTS.length}</div>
          <div className="stat-change">+14% vs. mes anterior</div>
        </div>
        <div className="stat-card">
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CreditCard size={12} /> Pagos recibidos
          </div>
          <div className="stat-value">98</div>
          <div className="stat-change">+20% vs. mes anterior</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Revenue chart */}
        <div className="card">
          <div className="card-title">Ingresos en el tiempo</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={revenueData}>
              <XAxis dataKey="date" tick={{ fill: '#555570', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#555570', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `S/${v}`} />
              <Tooltip contentStyle={{ background: '#13131f', border: '1px solid #1e1e35', borderRadius: 8, fontSize: 12 }} formatter={v => [`S/ ${v}`, 'Ingresos']} />
              <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2} dot={{ fill: '#7c3aed', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Platform distribution */}
        <div className="card">
          <div className="card-title">Ingresos por plataforma</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <PieChart width={120} height={120}>
              <Pie data={platformRevenue} cx={55} cy={55} innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>
                {platformRevenue.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
            <div style={{ flex: 1 }}>
              {platformRevenue.map(p => (
                <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Urgent subscriptions */}
        <div className="card">
          <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            Suscripciones urgentes
            <button onClick={() => onNavigate('subscriptions')} style={{ background: 'none', border: 'none', color: 'var(--purple-light)', fontSize: 12, cursor: 'pointer' }}>Ver todas →</button>
          </div>
          {urgent.map(sub => {
            const platform = getPlatform(sub.platformId);
            const client = getClient(sub.clientId);
            const days = getDaysUntil(sub.renewalDate);
            return (
              <div key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div className="platform-icon" style={{ background: platform?.bgColor || '#111', fontSize: 18 }}>{platform?.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{client?.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{platform?.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`days-chip ${days < 0 ? 'days-red' : days <= 3 ? 'days-orange' : 'days-green'}`}>
                    {days < 0 ? `${Math.abs(days)}d vencido` : days === 0 ? 'Hoy' : `En ${days}d`}
                  </span>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>S/ {sub.price.toFixed(2)}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status summary */}
        <div className="card">
          <div className="card-title">Estado de suscripciones</div>
          {[
            { label: 'Activas', count: activeCount, icon: <CheckCircle size={14} />, color: 'var(--green)' },
            { label: 'Por vencer (1-7 días)', count: expiringCount, icon: <Clock size={14} />, color: 'var(--orange)' },
            { label: 'Vencidas', count: expiredCount, icon: <XCircle size={14} />, color: 'var(--red)' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ color: s.color }}>{s.icon}</div>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontFamily: 'var(--font-display)', fontWeight: 700, color: s.color }}>{s.count}</div>
            </div>
          ))}
          <div style={{ marginTop: 12, padding: '10px', background: 'rgba(124,58,237,0.1)', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Total mensual</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--purple-light)' }}>
              S/ {totalRevenue.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
