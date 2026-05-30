import { SUBSCRIPTIONS, CLIENTS, PLATFORMS, PAYMENTS } from '../data/mockData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { date: '01 May', ingresos: 180, gastos: 60 },
  { date: '03 May', ingresos: 220, gastos: 75 },
  { date: '05 May', ingresos: 195, gastos: 65 },
  { date: '07 May', ingresos: 260, gastos: 85 },
  { date: '09 May', ingresos: 280, gastos: 90 },
  { date: '11 May', ingresos: 245, gastos: 80 },
  { date: '13 May', ingresos: 270, gastos: 88 },
  { date: '15 May', ingresos: 290, gastos: 92 },
  { date: '16 May', ingresos: 310, gastos: 95 },
];

const growthData = [
  { week: '15-21 Abr', activos: 80, nuevos: 8 },
  { week: '22-28 Abr', activos: 95, nuevos: 12 },
  { week: '29-05 May', activos: 108, nuevos: 15 },
  { week: '06-12 May', activos: 120, nuevos: 18 },
  { week: '13-16 May', activos: 128, nuevos: 10 },
];

const weekdayData = [
  { day: 'Lunes', value: 320 },
  { day: 'Martes', value: 380 },
  { day: 'Miércoles', value: 450 },
  { day: 'Jueves', value: 420 },
  { day: 'Viernes', value: 380 },
  { day: 'Sábado', value: 240 },
  { day: 'Domingo', value: 260 },
];

const platformDist = [
  { name: 'Netflix', value: 90, pct: 38.5, color: '#E50914' },
  { name: 'Spotify', value: 46, pct: 19.7, color: '#1DB954' },
  { name: 'Disney+', value: 41, pct: 17.5, color: '#0063E5' },
  { name: 'YouTube', value: 28, pct: 12.0, color: '#FF0000' },
  { name: 'Otras', value: 29, pct: 12.4, color: '#7c3aed' },
];

const comparisonRows = [
  { metric: 'Ingresos', prev: 2075, curr: 2450, change: +375, pct: +18 },
  { metric: 'Suscripciones', prev: 202, curr: 234, change: +32, pct: +16 },
  { metric: 'Clientes', prev: 112, curr: 128, change: +16, pct: +14 },
  { metric: 'Nuevos clientes', prev: 22, curr: 28, change: +6, pct: +27 },
  { metric: 'Pagos recibidos', prev: 82, curr: 98, change: +16, pct: +20 },
  { metric: 'Clientes morosos', prev: 8, curr: 7, change: -1, pct: -12 },
  { metric: 'Ingreso/suscripción', prev: 10.27, curr: 10.47, change: +0.20, pct: +1.9 },
];

const subStatus = [
  { name: 'Activas', value: 178, pct: 76.1, color: '#10b981' },
  { name: 'Por vencer (1-3 días)', value: 28, pct: 12.0, color: '#f59e0b' },
  { name: 'Vencidas', value: 18, pct: 7.7, color: '#ef4444' },
  { name: 'Pausadas', value: 10, pct: 4.3, color: '#7c3aed' },
];

const clientStatus = [
  { name: 'Activos', value: 98, pct: 76.6, color: '#10b981' },
  { name: 'Morosos', value: 7, pct: 5.5, color: '#f59e0b' },
  { name: 'Inactivos', value: 15, pct: 11.7, color: '#6b7280' },
  { name: 'Cancelados', value: 8, pct: 6.2, color: '#ef4444' },
];

export default function Stats() {
  return (
    <div className="page-content" style={{ padding: 0 }}>
      <div style={{ display: 'flex', gap: 20, height: '100%' }}>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '1px solid var(--border)' }}>
            {['Resumen general', 'Suscripciones', 'Clientes', 'Ingresos', 'Pagos', 'Plataformas', 'Crecimiento'].map((t, i) => (
              <button key={t} style={{
                padding: '8px 14px', border: 'none', background: 'none', cursor: 'pointer',
                color: i === 0 ? 'var(--purple-light)' : 'var(--text-muted)',
                fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-body)',
                borderBottom: i === 0 ? '2px solid var(--purple-light)' : '2px solid transparent',
                marginBottom: -1, whiteSpace: 'nowrap'
              }}>{t}</button>
            ))}
          </div>

          {/* KPIs */}
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: 20 }}>
            {[
              { label: 'Ingresos totales', value: 'S/ 2,450.00', change: '+18%', icon: '💰' },
              { label: 'Total clientes', value: '128', change: '+14%', icon: '👥' },
              { label: 'Total suscripciones', value: '234', change: '+16%', icon: '🔄' },
              { label: 'Nuevos clientes', value: '28', change: '+27%', icon: '✨' },
              { label: 'Clientes morosos', value: '7', change: '-12%', icon: '⚠️', neg: true },
            ].map(k => (
              <div key={k.label} className="stat-card">
                <div className="stat-label">{k.label}</div>
                <div className="stat-value" style={{ fontSize: 18 }}>{k.value}</div>
                <div className={`stat-change${k.neg ? ' neg' : ''}`}>{k.change} vs. período anterior</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div className="card">
              <div className="card-title">Ingresos en el tiempo</div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueData}>
                  <XAxis dataKey="date" tick={{ fill: '#555570', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#555570', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `S/${v}`} />
                  <Tooltip contentStyle={{ background: '#13131f', border: '1px solid #1e1e35', borderRadius: 8, fontSize: 11 }} />
                  <Line type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={2} dot={false} name="Ingresos" />
                  <Line type="monotone" dataKey="gastos" stroke="#7c3aed" strokeWidth={2} dot={false} name="Gastos" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <div className="card-title">Distribución por plataforma</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <PieChart width={130} height={130}>
                  <Pie data={platformDist} cx={60} cy={60} innerRadius={38} outerRadius={60} dataKey="value" strokeWidth={0}>
                    {platformDist.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
                <div style={{ flex: 1 }}>
                  {platformDist.map(p => (
                    <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 11, color: 'var(--text-secondary)' }}>{p.name}</span>
                      <span style={{ fontSize: 11, fontWeight: 700 }}>{p.value}</span>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>({p.pct}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div className="card">
              <div className="card-title">Crecimiento de clientes</div>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={growthData}>
                  <XAxis dataKey="week" tick={{ fill: '#555570', fontSize: 8 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#13131f', border: '1px solid #1e1e35', borderRadius: 8, fontSize: 11 }} />
                  <Bar dataKey="activos" fill="#7c3aed" radius={[2,2,0,0]} name="Activos" />
                  <Bar dataKey="nuevos" fill="#10b981" radius={[2,2,0,0]} name="Nuevos" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <div className="card-title">Estado de suscripciones</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <PieChart width={90} height={90}>
                  <Pie data={subStatus} cx={40} cy={40} innerRadius={25} outerRadius={40} dataKey="value" strokeWidth={0}>
                    {subStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
                <div style={{ flex: 1 }}>
                  {subStatus.map(s => (
                    <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />
                      <span style={{ fontSize: 10, color: 'var(--text-secondary)', flex: 1 }}>{s.name}</span>
                      <span style={{ fontSize: 10, fontWeight: 700 }}>{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Clientes por estado</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <PieChart width={90} height={90}>
                  <Pie data={clientStatus} cx={40} cy={40} innerRadius={25} outerRadius={40} dataKey="value" strokeWidth={0}>
                    {clientStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
                <div style={{ flex: 1 }}>
                  {clientStatus.map(s => (
                    <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />
                      <span style={{ fontSize: 10, color: 'var(--text-secondary)', flex: 1 }}>{s.name}</span>
                      <span style={{ fontSize: 10, fontWeight: 700 }}>{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <div className="card">
            <div className="card-title">Comparativo de períodos</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Métrica', 'Período anterior', 'Período actual', 'Variación', 'Variación %'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(row => (
                  <tr key={row.metric} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '8px 12px', fontSize: 13 }}>{row.metric}</td>
                    <td style={{ padding: '8px 12px', fontSize: 13, color: 'var(--text-muted)' }}>
                      {typeof row.prev === 'number' && row.prev > 100 ? `S/ ${row.prev.toFixed(2)}` : row.prev}
                    </td>
                    <td style={{ padding: '8px 12px', fontSize: 13, fontWeight: 700 }}>
                      {typeof row.curr === 'number' && row.curr > 100 ? `S/ ${row.curr.toFixed(2)}` : row.curr}
                    </td>
                    <td style={{ padding: '8px 12px', fontSize: 13, color: row.change >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>
                      {row.change >= 0 ? '+' : ''}{typeof row.change === 'number' && Math.abs(row.change) > 10 ? `S/ ${row.change.toFixed(2)}` : row.change}
                    </td>
                    <td style={{ padding: '8px 12px', fontSize: 13, color: row.pct >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>
                      {row.pct >= 0 ? '↑' : '↓'}{Math.abs(row.pct)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side panel */}
        <div style={{ width: 260, padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
          <div className="card">
            <div className="card-title">Resumen del período</div>
            {[
              { label: 'Período seleccionado', value: '01 May - 16 May 2024' },
              { label: 'Días en el período', value: '16 días' },
              { label: 'Ingreso promedio diario', value: 'S/ 153.13' },
              { label: 'Suscripciones por día', value: '14.6' },
              { label: 'Clientes por día', value: '8.0' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontWeight: 600, maxWidth: 120, textAlign: 'right' }}>{value}</span>
              </div>
            ))}
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Plataforma más rentable</div>
              <div style={{ fontWeight: 700, color: 'var(--red)' }}>🎬 Netflix — S/ 980.00</div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Ingresos por día de la semana</div>
            {weekdayData.map(({ day, value }) => (
              <div key={day} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 60 }}>{day}</span>
                <div style={{ flex: 1, height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(value / 500) * 100}%`, background: 'var(--purple)', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, width: 45, textAlign: 'right' }}>S/{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
