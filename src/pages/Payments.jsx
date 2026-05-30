import { useState } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { PAYMENTS, CLIENTS, SUBSCRIPTIONS, PLATFORMS } from '../data/mockData';

function getPlatform(id) { return PLATFORMS.find(p => p.id === id); }
function getClient(id) { return CLIENTS.find(c => c.id === id); }

const METHOD_ICONS = {
  yape: '💜',
  plin: '💛',
  transferencia: '🏦',
  efectivo: '💵',
  visa: '💳',
  paypal: '🅿️',
};

const METHOD_LABELS = {
  yape: 'Yape',
  plin: 'Plin',
  transferencia: 'Transferencia',
  efectivo: 'Efectivo',
  visa: 'Visa',
  paypal: 'PayPal',
};

const EXTENDED_PAYMENTS = [
  ...PAYMENTS,
  { id: 'PAG-006', clientId: 1, subscriptionId: 2, amount: 20.00, method: 'yape', date: '2024-05-10', status: 'completado' },
  { id: 'PAG-007', clientId: 3, subscriptionId: 7, amount: 25.00, method: 'plin', date: '2024-05-09', status: 'completado' },
  { id: 'PAG-008', clientId: 5, subscriptionId: 10, amount: 30.00, method: 'transferencia', date: '2024-05-08', status: 'completado' },
  { id: 'PAG-009', clientId: 6, subscriptionId: 12, amount: 20.00, method: 'yape', date: '2024-05-07', status: 'completado' },
  { id: 'PAG-010', clientId: 2, subscriptionId: 5, amount: 20.00, method: 'plin', date: '2024-05-06', status: 'pendiente' },
  { id: 'PAG-011', clientId: 7, subscriptionId: 14, amount: 12.00, method: 'yape', date: '2024-05-05', status: 'fallido' },
  { id: 'PAG-012', clientId: 8, subscriptionId: 16, amount: 15.00, method: 'yape', date: '2024-05-04', status: 'completado' },
];

export default function Payments() {
  const [payments] = useState(EXTENDED_PAYMENTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('todos');
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const filtered = payments.filter(p => {
    const c = getClient(p.clientId);
    const matchSearch = !search || c?.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'todos' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const totalAmount = filtered.reduce((t, p) => t + p.amount, 0);
  const completedTotal = payments.filter(p => p.status === 'completado').reduce((t, p) => t + p.amount, 0);

  const counts = {
    todos: payments.length,
    completado: payments.filter(p => p.status === 'completado').length,
    pendiente: payments.filter(p => p.status === 'pendiente').length,
    fallido: payments.filter(p => p.status === 'fallido').length,
  };

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        {/* Stats */}
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
          {[
            { label: 'Total cobrado', value: `S/ ${completedTotal.toFixed(2)}`, color: 'var(--green)' },
            { label: 'Pagos completados', value: counts.completado, color: 'var(--green)' },
            { label: 'Pendientes', value: counts.pendiente, color: 'var(--orange)' },
            { label: 'Fallidos', value: counts.fallido, color: 'var(--red)' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ fontSize: 20, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div className="filter-tabs" style={{ flex: 1, margin: 0 }}>
            {[['todos', 'Todos'], ['completado', 'Completados'], ['pendiente', 'Pendientes'], ['fallido', 'Fallidos']].map(([k, l]) => (
              <button key={k} className={`filter-tab${filter === k ? ' active' : ''}`} onClick={() => { setFilter(k); setPage(1); }}>
                {l} {counts[k]}
              </button>
            ))}
          </div>
          <button className="btn-primary"><Plus size={14} /> Registrar pago</button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Download size={14} /> Exportar
          </button>
        </div>

        {/* Search */}
        <div className="topbar-search" style={{ maxWidth: '100%', marginBottom: 16 }}>
          <Search size={14} className="search-icon" />
          <input placeholder="Buscar pago, cliente, ID..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Método</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(payment => {
                const client = getClient(payment.clientId);
                const sub = SUBSCRIPTIONS.find(s => s.id === payment.subscriptionId);
                const platform = sub ? getPlatform(sub.platformId) : null;

                return (
                  <tr key={payment.id}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--purple-light)', fontWeight: 700 }}>
                        #{payment.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="user-avatar" style={{ width: 28, height: 28, fontSize: 12 }}>
                          {client?.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>{client?.name}</div>
                          {platform && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{platform.icon} {platform.name}</div>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--green)' }}>
                        S/ {payment.amount.toFixed(2)}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 18 }}>{METHOD_ICONS[payment.method]}</span>
                        <span style={{ fontSize: 13 }}>{METHOD_LABELS[payment.method]}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      {new Date(payment.date).toLocaleDateString('es-PE')}
                    </td>
                    <td>
                      <span className={`status-badge ${
                        payment.status === 'completado' ? 'status-activa' :
                        payment.status === 'pendiente' ? 'status-por_vencer' : 'status-vencida'
                      }`}>
                        {payment.status === 'completado' ? 'Completado' : payment.status === 'pendiente' ? 'Pendiente' : 'Fallido'}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn" title="Ver comprobante">🧾</button>
                        {payment.status === 'pendiente' && (
                          <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px' }}>
                            Marcar pagado
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <span>
              Mostrando {Math.min((page-1)*PER_PAGE+1, filtered.length)}–{Math.min(page*PER_PAGE, filtered.length)} de {filtered.length} ·
              Total: <strong style={{ color: 'var(--green)' }}>S/ {totalAmount.toFixed(2)}</strong>
            </span>
            <div className="page-btns">
              <button className="page-btn" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>
                <ChevronLeft size={13} />
              </button>
              {Array.from({ length: Math.min(4, totalPages) }, (_, i) => i+1).map(n => (
                <button key={n} className={`page-btn${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page >= totalPages}>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div style={{ width: 260, padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        <div className="card">
          <div className="card-title">Métodos de pago</div>
          {Object.entries(METHOD_LABELS).map(([key, label]) => {
            const count = payments.filter(p => p.method === key).length;
            const total = payments.filter(p => p.method === key).reduce((t, p) => t + p.amount, 0);
            if (!count) return null;
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 20 }}>{METHOD_ICONS[key]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{count} pagos</div>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--green)', fontSize: 13 }}>S/ {total.toFixed(2)}</span>
              </div>
            );
          })}
        </div>

        <div className="card">
          <div className="card-title">Resumen del mes</div>
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Total cobrado</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--green)' }}>
              S/ {completedTotal.toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 4 }}>+20% vs. mes anterior</div>
          </div>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 10, marginTop: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Pendiente de cobrar</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--orange)' }}>
              S/ {payments.filter(p => p.status === 'pendiente').reduce((t, p) => t + p.amount, 0).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Pagos recientes</div>
          {payments.slice(0, 5).map(p => {
            const c = getClient(p.clientId);
            return (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 16 }}>{METHOD_ICONS[p.method]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{c?.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{new Date(p.date).toLocaleDateString('es-PE')}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: p.status === 'completado' ? 'var(--green)' : p.status === 'pendiente' ? 'var(--orange)' : 'var(--red)' }}>
                  S/ {p.amount.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
