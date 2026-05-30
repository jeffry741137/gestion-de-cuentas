import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MessageCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { SUBSCRIPTIONS, CLIENTS, PLATFORMS } from '../data/mockData';

const today = new Date();

function getDaysUntil(dateStr) {
  const d = new Date(dateStr);
  return Math.round((d - today) / (1000 * 60 * 60 * 24));
}

function getPlatform(id) { return PLATFORMS.find(p => p.id === id); }
function getClient(id) { return CLIENTS.find(c => c.id === id); }

function DaysChip({ days }) {
  if (days < 0) return <span className="days-chip days-red">Vencida {Math.abs(days)}d</span>;
  if (days === 0) return <span className="days-chip days-orange">Vence hoy</span>;
  if (days <= 7) return <span className="days-chip days-orange">En {days} días</span>;
  return <span className="days-chip days-green">En {days} días</span>;
}

function AddModal({ onClose, onAdd, clients, platforms }) {
  const [form, setForm] = useState({
    clientId: '', platformId: '', plan: 'Premium', price: '',
    renewalDate: '', status: 'activa', accountType: 'perfil', email: ''
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.clientId || !form.platformId || !form.price || !form.renewalDate) return;
    onAdd({ ...form, clientId: +form.clientId, price: +form.price });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">+ Nueva Suscripción</div>
          <button className="action-btn" onClick={onClose}><X size={14} /></button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Cliente</label>
              <select className="form-select" value={form.clientId} onChange={e => set('clientId', e.target.value)}>
                <option value="">Seleccionar cliente</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Plataforma</label>
              <select className="form-select" value={form.platformId} onChange={e => {
                const p = platforms.find(pl => pl.id === e.target.value);
                set('platformId', e.target.value);
                if (p) set('price', p.price / (p.slots || 5));
              }}>
                <option value="">Seleccionar plataforma</option>
                {platforms.map(p => <option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
              </select>
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Plan</label>
              <select className="form-select" value={form.plan} onChange={e => set('plan', e.target.value)}>
                {['Premium', 'Estándar', 'Familiar', 'Individual', 'Pro', 'Fan', 'Plus'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Precio (S/)</label>
              <input className="form-input" type="number" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} placeholder="0.00" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Correo de la cuenta</label>
            <input className="form-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="cuenta@plataforma.com" />
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Fecha de renovación</label>
              <input className="form-input" type="date" value={form.renewalDate} onChange={e => set('renewalDate', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Tipo de cuenta</label>
              <select className="form-select" value={form.accountType} onChange={e => set('accountType', e.target.value)}>
                <option value="perfil">Perfil</option>
                <option value="cuenta_completa">Cuenta completa</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Estado</label>
            <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
              <option value="activa">Activa</option>
              <option value="por_vencer">Por vencer</option>
              <option value="vencida">Vencida</option>
              <option value="pausada">Pausada</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleSubmit}><Plus size={14} /> Agregar</button>
        </div>
      </div>
    </div>
  );
}

export default function Subscriptions() {
  const [subs, setSubs] = useState(SUBSCRIPTIONS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const addSub = (data) => {
    const newId = Math.max(...subs.map(s => s.id)) + 1;
    setSubs(prev => [...prev, { ...data, id: newId }]);
  };

  const deleteSub = (id) => setSubs(prev => prev.filter(s => s.id !== id));

  const filtered = subs.filter(s => {
    const client = getClient(s.clientId);
    const platform = getPlatform(s.platformId);
    const matchSearch = !search || client?.name.toLowerCase().includes(search.toLowerCase()) || platform?.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'todos' || s.status === filter;
    return matchSearch && matchFilter;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const counts = {
    todos: subs.length,
    activa: subs.filter(s => s.status === 'activa').length,
    por_vencer: subs.filter(s => s.status === 'por_vencer').length,
    vencida: subs.filter(s => s.status === 'vencida').length,
  };

  const totalRevenue = filtered.reduce((s, sub) => s + sub.price, 0);

  return (
    <div className="page-content" style={{ padding: 0 }}>
      <div style={{ display: 'flex', gap: 20, height: '100%' }}>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div className="filter-tabs" style={{ flex: 1, margin: 0 }}>
              {[['todos', 'Todas'], ['activa', 'Activas'], ['por_vencer', 'Por vencer'], ['vencida', 'Vencidas']].map(([k, l]) => (
                <button key={k} className={`filter-tab${filter === k ? ' active' : ''}`} onClick={() => { setFilter(k); setPage(1); }}>
                  {l} {counts[k]}
                </button>
              ))}
            </div>
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              <Plus size={14} /> Nueva suscripción
            </button>
          </div>

          {/* Search */}
          <div className="topbar-search" style={{ maxWidth: '100%', marginBottom: 16 }}>
            <Search size={14} className="search-icon" />
            <input placeholder="Buscar suscripción, cliente, plataforma..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>

          {/* Table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Plataforma</th>
                  <th>Cliente</th>
                  <th>Plan</th>
                  <th>Email cuenta</th>
                  <th>Renovación</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>No hay suscripciones</td></tr>
                ) : paginated.map(sub => {
                  const platform = getPlatform(sub.platformId);
                  const client = getClient(sub.clientId);
                  const days = getDaysUntil(sub.renewalDate);
                  return (
                    <tr key={sub.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="platform-icon" style={{ background: platform?.bgColor || '#111', fontSize: 18 }}>{platform?.icon}</div>
                          <div>
                            <div style={{ fontWeight: 700 }}>{platform?.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sub.accountType === 'cuenta_completa' ? 'Cuenta completa' : 'Perfil'}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>{client?.name}</td>
                      <td><span style={{ fontSize: 12, background: 'rgba(124,58,237,0.1)', color: 'var(--purple-light)', padding: '2px 8px', borderRadius: 10 }}>{sub.plan}</span></td>
                      <td style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{sub.email || '—'}</td>
                      <td>
                        <div style={{ fontSize: 12 }}>{new Date(sub.renewalDate).toLocaleDateString('es-PE')}</div>
                        <DaysChip days={days} />
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--font-display)', fontSize: 14 }}>
                        S/ {sub.price.toFixed(2)}
                      </td>
                      <td>
                        <span className={`status-badge status-${sub.status}`}>
                          {sub.status === 'activa' ? 'Activa' : sub.status === 'por_vencer' ? 'Por vencer' : sub.status === 'vencida' ? 'Vencida' : 'Pausada'}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          {client?.whatsapp && (
                            <a href={`https://wa.me/${client.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="action-btn" style={{ color: '#25D366' }} title="WhatsApp">
                              <MessageCircle size={13} />
                            </a>
                          )}
                          <button className="action-btn" title="Editar"><Edit2 size={13} /></button>
                          <button className="action-btn danger" title="Eliminar" onClick={() => deleteSub(sub.id)}><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination">
              <span>Mostrando {Math.min((page-1)*PER_PAGE+1, filtered.length)}-{Math.min(page*PER_PAGE, filtered.length)} de {filtered.length} · Total: <strong style={{color:'var(--green)'}}>S/ {totalRevenue.toFixed(2)}</strong></span>
              <div className="page-btns">
                <button className="page-btn" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}><ChevronLeft size={13} /></button>
                {Array.from({ length: Math.min(4, totalPages) }, (_, i) => i+1).map(n => (
                  <button key={n} className={`page-btn${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                ))}
                <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}><ChevronRight size={13} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div style={{ width: 260, padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
          <div className="card">
            <div className="card-title">Resumen</div>
            {[
              { label: 'Activas', count: counts.activa, color: 'var(--green)' },
              { label: 'Por vencer', count: counts.por_vencer, color: 'var(--orange)' },
              { label: 'Vencidas', count: counts.vencida, color: 'var(--red)' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                <span style={{ fontWeight: 700, color: s.color }}>{s.count}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title">Ingresos mensuales</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--purple-light)', marginBottom: 4 }}>
              S/ {subs.reduce((s, sub) => s + sub.price, 0).toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--green)' }}>+18% vs. mes anterior</div>
          </div>
          <div className="card">
            <div className="card-title">Plataformas más rentables</div>
            {PLATFORMS.slice(0, 5).map(p => {
              const rev = subs.filter(s => s.platformId === p.id).reduce((t, s) => t + s.price, 0);
              if (!rev) return null;
              return (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 16 }}>{p.icon}</span>
                  <span style={{ flex: 1, fontSize: 13 }}>{p.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>S/ {rev.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showModal && <AddModal onClose={() => setShowModal(false)} onAdd={addSub} clients={CLIENTS} platforms={PLATFORMS} />}
    </div>
  );
}
