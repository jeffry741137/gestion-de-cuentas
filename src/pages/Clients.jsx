import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MessageCircle, ChevronLeft, ChevronRight, X, ChevronRight as Arrow } from 'lucide-react';
import { CLIENTS, SUBSCRIPTIONS, PLATFORMS, PAYMENTS } from '../data/mockData';

function getPlatform(id) { return PLATFORMS.find(p => p.id === id); }

const today = new Date();
function getDaysUntil(dateStr) {
  const d = new Date(dateStr);
  return Math.round((d - today) / (1000 * 60 * 60 * 24));
}

function ClientDetail({ client, subs, payments, onClose }) {
  const clientSubs = subs.filter(s => s.clientId === client.id);
  const totalMonthly = clientSubs.reduce((t, s) => t + s.price, 0);
  const totalPaid = payments.filter(p => p.clientId === client.id).reduce((t, p) => t + p.amount, 0);
  const hasExpired = clientSubs.some(s => s.status === 'vencida');
  const hasPorVencer = clientSubs.some(s => s.status === 'por_vencer');

  const overallStatus = hasExpired ? 'vencida' : hasPorVencer ? 'por_vencer' : 'activa';

  return (
    <div style={{
      width: 280, borderLeft: '1px solid var(--border)',
      background: 'var(--bg-secondary)', overflowY: 'auto', padding: 20
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="user-avatar" style={{ width: 44, height: 44, fontSize: 20 }}>
            {client.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{client.name}</div>
            <span className={`status-badge status-${overallStatus}`} style={{ fontSize: 10 }}>
              {overallStatus === 'activa' ? '● Activo' : overallStatus === 'por_vencer' ? '● Por vencer' : '● Vencido'}
            </span>
          </div>
        </div>
        <button className="action-btn" onClick={onClose}><X size={14} /></button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <a href={`https://wa.me/${client.whatsapp?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
          className="btn-secondary" style={{ flex: 1, textAlign: 'center', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <MessageCircle size={12} color="#25D366" /> WhatsApp
        </a>
        <button className="btn-secondary" style={{ flex: 1, fontSize: 12 }}>✏️ Editar</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Información personal</div>
        {[
          { label: 'WhatsApp', value: client.whatsapp },
          { label: 'Correo', value: client.email },
          { label: 'Desde', value: new Date(client.since).toLocaleDateString('es-PE') },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
            <span style={{ color: 'var(--text-muted)' }}>{label}</span>
            <span style={{ color: 'var(--text-secondary)', maxWidth: 160, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</span>
          </div>
        ))}
        {client.notes && (
          <div style={{ marginTop: 8, background: 'rgba(124,58,237,0.08)', borderRadius: 6, padding: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
            📝 {client.notes}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
          Suscripciones activas ({clientSubs.length})
        </div>
        {clientSubs.map(sub => {
          const p = getPlatform(sub.platformId);
          const days = getDaysUntil(sub.renewalDate);
          return (
            <div key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 18 }}>{p?.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{p?.name}</div>
                <div style={{ fontSize: 11, color: days < 0 ? 'var(--red)' : days <= 7 ? 'var(--orange)' : 'var(--text-muted)' }}>
                  {days < 0 ? `Vencida ${Math.abs(days)}d` : `Vence en ${days}d`}
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>S/ {sub.price.toFixed(2)}</div>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ background: 'var(--bg-card)', marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
          {[
            { label: 'Mensual', value: `S/ ${totalMonthly.toFixed(2)}` },
            { label: 'Total pagado', value: `S/ ${totalPaid.toFixed(2)}` },
            { label: 'Deuda', value: 'S/ 0.00' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AddClientModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', whatsapp: '', email: '', notes: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">+ Nuevo Cliente</div>
          <button className="action-btn" onClick={onClose}><X size={14} /></button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Nombre completo</label>
            <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ej: Juan Pérez" />
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">WhatsApp</label>
              <input className="form-input" value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="+51 987 654 321" />
            </div>
            <div className="form-group">
              <label className="form-label">Correo electrónico</label>
              <input className="form-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="correo@gmail.com" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Notas</label>
            <textarea className="form-input" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Notas sobre el cliente..." rows={3} style={{ resize: 'vertical' }} />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={() => {
            if (!form.name) return;
            onAdd({ ...form, id: Date.now(), since: new Date().toISOString().split('T')[0] });
            onClose();
          }}>
            <Plus size={14} /> Agregar cliente
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Clients() {
  const [clients, setClients] = useState(CLIENTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('todos');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const subs = SUBSCRIPTIONS;

  const getClientStatus = (clientId) => {
    const cs = subs.filter(s => s.clientId === clientId);
    if (cs.some(s => s.status === 'vencida')) return 'vencida';
    if (cs.some(s => s.status === 'por_vencer')) return 'por_vencer';
    return 'activa';
  };

  const filtered = clients.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.whatsapp?.includes(search) || c.email?.toLowerCase().includes(search.toLowerCase());
    if (filter === 'todos') return matchSearch;
    return matchSearch && getClientStatus(c.id) === filter;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div className="filter-tabs" style={{ flex: 1, margin: 0 }}>
            {[['todos', 'Todos', clients.length], ['activa', 'Activos', clients.filter(c => getClientStatus(c.id) === 'activa').length], ['por_vencer', 'Por vencer', clients.filter(c => getClientStatus(c.id) === 'por_vencer').length], ['vencida', 'Vencidos', clients.filter(c => getClientStatus(c.id) === 'vencida').length]].map(([k, l, n]) => (
              <button key={k} className={`filter-tab${filter === k ? ' active' : ''}`} onClick={() => { setFilter(k); setPage(1); }}>
                {l} {n}
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={14} /> Nuevo cliente
          </button>
        </div>

        <div className="topbar-search" style={{ maxWidth: '100%', marginBottom: 16 }}>
          <Search size={14} className="search-icon" />
          <input placeholder="Buscar cliente, WhatsApp, correo..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Contacto</th>
                <th>Plataformas</th>
                <th>Próx. vencimiento</th>
                <th>Monto mensual</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(client => {
                const cs = subs.filter(s => s.clientId === client.id);
                const total = cs.reduce((t, s) => t + s.price, 0);
                const status = getClientStatus(client.id);
                const nextSub = cs.filter(s => s.status !== 'activa').sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate))[0] || cs[0];
                const daysLeft = nextSub ? getDaysUntil(nextSub.renewalDate) : null;

                return (
                  <tr key={client.id} onClick={() => setSelected(selected?.id === client.id ? null : client)} style={{ cursor: 'pointer', background: selected?.id === client.id ? 'rgba(124,58,237,0.08)' : '' }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="user-avatar">{client.name.charAt(0)}</div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{client.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Desde {new Date(client.since).toLocaleDateString('es-PE')}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: 13 }}>{client.whatsapp}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {cs.slice(0, 3).map(s => {
                          const p = getPlatform(s.platformId);
                          return <span key={s.id} style={{ fontSize: 16 }} title={p?.name}>{p?.icon}</span>;
                        })}
                        {cs.length > 3 && <span style={{ fontSize: 11, color: 'var(--text-muted)', alignSelf: 'center' }}>+{cs.length - 3}</span>}
                      </div>
                    </td>
                    <td>
                      {nextSub ? (
                        <>
                          <div style={{ fontSize: 12 }}>{new Date(nextSub.renewalDate).toLocaleDateString('es-PE')}</div>
                          <span className={`days-chip ${daysLeft < 0 ? 'days-red' : daysLeft <= 7 ? 'days-orange' : 'days-green'}`}>
                            {daysLeft < 0 ? `Vencida ${Math.abs(daysLeft)}d` : `En ${daysLeft} días`}
                          </span>
                        </>
                      ) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--font-display)', fontSize: 14 }}>
                      S/ {total.toFixed(2)}
                    </td>
                    <td>
                      <span className={`status-badge status-${status}`}>
                        {status === 'activa' ? 'Activo' : status === 'por_vencer' ? 'Por vencer' : 'Vencido'}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns" onClick={e => e.stopPropagation()}>
                        <a href={`https://wa.me/${client.whatsapp?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="action-btn" style={{ color: '#25D366' }}>
                          <MessageCircle size={13} />
                        </a>
                        <button className="action-btn"><Edit2 size={13} /></button>
                        <button className="action-btn danger" onClick={() => setClients(prev => prev.filter(c => c.id !== client.id))}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <span>Mostrando {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, filtered.length)} de {filtered.length} clientes</span>
            <div className="page-btns">
              <button className="page-btn" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}><ChevronLeft size={13} /></button>
              {Array.from({ length: Math.min(4, Math.ceil(filtered.length / PER_PAGE)) }, (_, i) => i+1).map(n => (
                <button key={n} className={`page-btn${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="page-btn" onClick={() => setPage(p => Math.min(Math.ceil(filtered.length / PER_PAGE), p+1))}><ChevronRight size={13} /></button>
            </div>
            <span>10 por página</span>
          </div>
        </div>
      </div>

      {selected && (
        <ClientDetail
          client={selected}
          subs={subs}
          payments={PAYMENTS}
          onClose={() => setSelected(null)}
        />
      )}

      {showModal && <AddClientModal onClose={() => setShowModal(false)} onAdd={(c) => setClients(prev => [...prev, c])} />}
    </div>
  );
}
