import { Download, FileText, TrendingUp, Users, RefreshCw, CreditCard } from 'lucide-react';
import { SUBSCRIPTIONS, CLIENTS, PLATFORMS, PAYMENTS } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts';

const monthlyData = [
  { mes: 'Dic 23', ingresos: 1250 },
  { mes: 'Ene 24', ingresos: 1500 },
  { mes: 'Feb 24', ingresos: 1620 },
  { mes: 'Mar 24', ingresos: 1800 },
  { mes: 'Abr 24', ingresos: 1980 },
  { mes: 'May 24', ingresos: 2075 },
  { mes: 'May 24', ingresos: 2450 },
];

const platformData = PLATFORMS.map(p => ({
  name: p.name.slice(0, 8),
  icon: p.icon,
  subs: SUBSCRIPTIONS.filter(s => s.platformId === p.id).length,
  revenue: SUBSCRIPTIONS.filter(s => s.platformId === p.id).reduce((t, s) => t + s.price, 0),
})).filter(p => p.subs > 0).sort((a, b) => b.revenue - a.revenue);

export default function Reports() {
  const totalRevenue = SUBSCRIPTIONS.reduce((t, s) => t + s.price, 0);
  const totalClients = CLIENTS.length;
  const totalSubs = SUBSCRIPTIONS.length;
  const avgRevPerClient = totalRevenue / totalClients;

  const REPORT_TYPES = [
    { icon: <TrendingUp size={20} />, title: 'Reporte de ingresos', desc: 'Detalle de todos los ingresos por período', color: 'var(--green)' },
    { icon: <RefreshCw size={20} />, title: 'Reporte de suscripciones', desc: 'Estado y detalle de todas las suscripciones', color: 'var(--purple-light)' },
    { icon: <Users size={20} />, title: 'Reporte de clientes', desc: 'Información completa de todos tus clientes', color: 'var(--blue)' },
    { icon: <CreditCard size={20} />, title: 'Reporte de pagos', desc: 'Historial de pagos y cobros', color: 'var(--orange)' },
    { icon: <FileText size={20} />, title: 'Reporte de plataformas', desc: 'Rendimiento por plataforma', color: 'var(--cyan)' },
    { icon: <TrendingUp size={20} />, title: 'Reporte de vencimientos', desc: 'Suscripciones que vencen por período', color: 'var(--red)' },
  ];

  return (
    <div className="page-content">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Revenue trend */}
        <div className="card">
          <div className="card-title">Tendencia de ingresos</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="mes" tick={{ fill: '#555570', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#555570', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `S/${v}`} />
              <Tooltip contentStyle={{ background: '#13131f', border: '1px solid #1e1e35', borderRadius: 8, fontSize: 12 }} formatter={v => [`S/ ${v}`, 'Ingresos']} />
              <Line type="monotone" dataKey="ingresos" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: '#7c3aed', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Platform revenue */}
        <div className="card">
          <div className="card-title">Ingresos por plataforma</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={platformData.slice(0, 6)} layout="vertical">
              <XAxis type="number" tick={{ fill: '#555570', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `S/${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#8888aa', fontSize: 10 }} axisLine={false} tickLine={false} width={55} />
              <Tooltip contentStyle={{ background: '#13131f', border: '1px solid #1e1e35', borderRadius: 8, fontSize: 12 }} formatter={v => [`S/ ${v}`, 'Ingresos']} />
              <Bar dataKey="revenue" fill="#7c3aed" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPIs */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        {[
          { label: 'Ingreso mensual', value: `S/ ${totalRevenue.toFixed(2)}`, sub: '+18% vs. anterior' },
          { label: 'Promedio por cliente', value: `S/ ${avgRevPerClient.toFixed(2)}`, sub: `${totalClients} clientes` },
          { label: 'Suscripciones activas', value: totalSubs, sub: `${PLATFORMS.length} plataformas` },
          { label: 'Tasa de retención', value: '94%', sub: '+2% vs. anterior' },
        ].map(k => (
          <div key={k.label} className="stat-card">
            <div className="stat-label">{k.label}</div>
            <div className="stat-value" style={{ fontSize: 20 }}>{k.value}</div>
            <div className="stat-change">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Report types */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, marginBottom: 14, color: 'var(--text-secondary)' }}>GENERAR REPORTES</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {REPORT_TYPES.map(rt => (
            <div key={rt.title} className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = rt.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div style={{ color: rt.color, padding: 8, background: `${rt.color}15`, borderRadius: 8 }}>
                  {rt.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{rt.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{rt.desc}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-secondary" style={{ flex: 1, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <FileText size={12} /> Vista previa
                </button>
                <button className="btn-primary" style={{ flex: 1, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <Download size={12} /> Exportar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform breakdown table */}
      <div className="card">
        <div className="card-title" style={{ marginBottom: 14 }}>Detalle por plataforma</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Plataforma', 'Suscripciones', 'Clientes', 'Ingresos', 'Ganancia', 'Participación'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {platformData.map(p => {
              const platform = PLATFORMS.find(pl => pl.name.startsWith(p.name));
              const pct = ((p.revenue / totalRevenue) * 100).toFixed(1);
              const clients = [...new Set(SUBSCRIPTIONS.filter(s => platform && s.platformId === platform.id).map(s => s.clientId))].length;
              return (
                <tr key={p.name} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20 }}>{p.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 13 }}>{p.subs}</td>
                  <td style={{ padding: '10px 12px', fontSize: 13 }}>{clients}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--font-display)', fontSize: 13 }}>S/ {p.revenue.toFixed(2)}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--purple-light)', fontSize: 13 }}>S/ {(p.revenue * 0.62).toFixed(2)}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', maxWidth: 80 }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--purple)', borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{pct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
