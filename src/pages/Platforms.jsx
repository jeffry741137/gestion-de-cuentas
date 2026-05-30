import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, TrendingUp } from 'lucide-react';
import { PLATFORMS, SUBSCRIPTIONS, CLIENTS } from '../data/mockData';

export default function Platforms() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(PLATFORMS[0]);

  const filtered = PLATFORMS.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));

  const getPlatformStats = (pid) => {
    const subs = SUBSCRIPTIONS.filter(s => s.platformId === pid);
    const revenue = subs.reduce((t, s) => t + s.price, 0);
    const active = subs.filter(s => s.status === 'activa').length;
    const clients = [...new Set(subs.map(s => s.clientId))];
    return { subs, revenue, active, clients };
  };

  const selStats = selected ? getPlatformStats(selected.id) : null;
  const maxSlots = selected?.slots || 5;
  const occupancy = selStats ? Math.round((selStats.subs.length / (maxSlots * 3)) * 100) : 0;

  const totalRevenue = SUBSCRIPTIONS.reduce((t, s) => t + s.price, 0);

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        {/* Stats */}
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: 20 }}>
          {[
            { label: 'Total plataformas', value: PLATFORMS.length },
            { label: 'Total suscripciones', value: SUBSCRIPTIONS.length },
            { label: 'Cupos ocupados', value: SUBSCRIPTIONS.length },
            { label: 'Ingresos / mes', value: `S/ ${totalRevenue.toFixed(2)}` },
            { label: 'Ganancia neta', value: `S/ ${(totalRevenue * 0.62).toFixed(2)}` },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ fontSize: 18 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="topbar-search" style={{ maxWidth: '100%', marginBottom: 16 }}>
          <Search size={14} className="search-icon" />
          <input placeholder="Buscar plataforma..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
          {filtered.map(p => {
            const stats = getPlatformStats(p.id);
            const pct = Math.min(100, Math.round((stats.subs.length / (p.slots * 2 || 10)) * 100));
            const isSelected = selected?.id === p.id;

            return (
              <div
                key={p.id}
                className="card"
                onClick={() => setSelected(p)}
                style={{
                  cursor: 'pointer',
                  border: isSelected ? `1px solid ${p.color}44` : '1px solid var(--border)',
                  background: isSelected ? `${p.color}08` : 'var(--bg-card)',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: 10, right: 10 }}>
                  <span className="status-badge status-activa" style={{ fontSize: 10 }}>Activa</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ fontSize: 32 }}>{p.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: p.color }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{stats.subs.length} suscripciones</div>
                  </div>
                </div>

                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>
                    <span>{stats.subs.length}/{p.slots * 2} cupos</span>
                    <span style={{ fontWeight: 700, color: p.color }}>{pct}%</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: p.color, borderRadius: 2, transition: 'width 0.4s' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Ingresos</div>
                    <div style={{ fontWeight: 700, color: 'var(--green)' }}>S/ {stats.revenue.toFixed(2)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--text-muted)' }}>Ganancia</div>
                    <div style={{ fontWeight: 700, color: 'var(--purple-light)' }}>S/ {(stats.revenue * 0.62).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add platform card */}
          <div className="card" style={{ border: '2px dashed var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: 160, transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--purple)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <Plus size={24} color="var(--purple-light)" style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--purple-light)' }}>Agregar plataforma</div>
          </div>
        </div>
      </div>

      {/* Side detail */}
      {selected && (
        <div style={{ width: 280, borderLeft: '1px solid var(--border)', background: 'var(--bg-secondary)', overflowY: 'auto', padding: 20 }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{selected.icon}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: selected.color }}>{selected.name}</div>
            <span className="status-badge status-activa">Activa</span>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
            {['Rendimiento', 'Clientes'].map(t => (
              <button key={t} style={{ flex: 1, padding: '8px 0', border: 'none', background: 'none', color: 'var(--text-secondary)', fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{t}</button>
            ))}
          </div>

          {selStats && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                {[
                  { label: 'Ingresos este mes', value: `S/ ${selStats.revenue.toFixed(2)}`, color: 'var(--green)' },
                  { label: 'Ganancia este mes', value: `S/ ${(selStats.revenue * 0.62).toFixed(2)}`, color: 'var(--purple-light)' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 10 }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{label}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <div className="card-title">Ocupación de cupos</div>
                <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 12px' }}>
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="10" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke={selected.color} strokeWidth="10"
                      strokeDasharray={`${Math.min(100, selStats.subs.length * 12)} 252`} strokeLinecap="round"
                      transform="rotate(-90 50 50)" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{selStats.subs.length}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>subs</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div className="card-title">Top clientes</div>
                {selStats.clients.slice(0, 4).map((cid, i) => {
                  const c = CLIENTS.find(cl => cl.id === cid);
                  const csubs = selStats.subs.filter(s => s.clientId === cid);
                  return (
                    <div key={cid} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 700, width: 14 }}>{i + 1}</span>
                      <div className="user-avatar" style={{ width: 24, height: 24, fontSize: 11 }}>{c?.name.charAt(0)}</div>
                      <span style={{ flex: 1 }}>{c?.name}</span>
                      <span style={{ fontWeight: 700, color: 'var(--green)' }}>S/ {csubs.reduce((t, s) => t + s.price, 0).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {['Agregar cuenta', 'Ver cuentas', 'Editar plataforma', 'Ver clientes'].map(a => (
                  <button key={a} className="btn-secondary" style={{ fontSize: 11, padding: '7px 8px' }}>{a}</button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
