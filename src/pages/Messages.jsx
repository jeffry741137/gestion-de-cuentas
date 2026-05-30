import { useState } from 'react';
import { Search, Send, MessageCircle } from 'lucide-react';
import { CLIENTS, SUBSCRIPTIONS, PLATFORMS } from '../data/mockData';

const today = new Date();
function getDays(dateStr) {
  return Math.round((new Date(dateStr) - today) / (1000 * 60 * 60 * 24));
}
function getPlatform(id) { return PLATFORMS.find(p => p.id === id); }

const QUICK_TEMPLATES = [
  { label: '7 días antes', text: (c, p, d) => `¡Hola ${c}! 👋 Te recordamos que tu suscripción a ${p} vence el ${d}. ¡Gracias por tu confianza! 😊` },
  { label: '3 días antes', text: (c, p, d) => `Hola ${c}, tu suscripción a ${p} vence en 3 días (${d}). Asegura tu continuidad realizando tu pago. ¡Gracias! 🙌` },
  { label: 'Vence hoy', text: (c, p, d) => `Hola ${c}, tu suscripción a ${p} vence hoy (${d}). Por favor realiza tu pago para evitar interrupciones. ⚠️` },
  { label: 'Pago vencido', text: (c, p, d) => `Hola ${c}, notamos que tu pago de ${p} está vencido desde ${d}. Por favor regulariza tu pago. 🙏` },
  { label: 'Bienvenida', text: (c, p, d) => `¡Bienvenido/a ${c}! 🎉 Tu suscripción a ${p} ha sido activada. Cualquier consulta, estamos aquí para ayudarte.` },
  { label: 'Confirmación de pago', text: (c, p, d) => `¡Hola ${c}! ✅ Hemos confirmado tu pago de ${p}. Tu suscripción está activa hasta ${d}. ¡Gracias!` },
];

export default function Messages() {
  const [selectedClient, setSelectedClient] = useState(CLIENTS[0]);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

  const urgentClients = CLIENTS.filter(c => {
    const cs = SUBSCRIPTIONS.filter(s => s.clientId === c.id);
    return cs.some(s => {
      const d = getDays(s.renewalDate);
      return d >= -3 && d <= 7;
    });
  });

  const filteredClients = CLIENTS.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.whatsapp?.includes(search)
  );

  const clientSubs = selectedClient
    ? SUBSCRIPTIONS.filter(s => s.clientId === selectedClient.id)
    : [];

  const applyTemplate = (t) => {
    if (!selectedClient || !clientSubs[0]) return;
    const p = getPlatform(clientSubs[0].platformId);
    const d = new Date(clientSubs[0].renewalDate).toLocaleDateString('es-PE');
    setMsg(t.text(selectedClient.name, p?.name || '', d));
  };

  const sendWA = () => {
    if (!selectedClient || !msg.trim()) return;
    const phone = selectedClient.whatsapp?.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    setSentMessages(prev => [...prev, { to: selectedClient.name, text: msg, time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }) }]);
    setMsg('');
  };

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Client list */}
      <div style={{ width: 240, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
        <div style={{ padding: '14px 12px 10px' }}>
          <div className="topbar-search">
            <Search size={13} className="search-icon" />
            <input placeholder="Buscar cliente..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {urgentClients.length > 0 && !search && (
          <div style={{ padding: '0 12px 8px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>⚠️ Urgentes</div>
            {urgentClients.slice(0, 3).map(c => {
              const cs = SUBSCRIPTIONS.filter(s => s.clientId === c.id);
              const d = Math.min(...cs.map(s => getDays(s.renewalDate)));
              return (
                <button key={c.id} onClick={() => setSelectedClient(c)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
                  borderRadius: 8, border: selectedClient?.id === c.id ? '1px solid var(--purple)' : '1px solid rgba(245,158,11,0.2)',
                  background: selectedClient?.id === c.id ? 'rgba(124,58,237,0.15)' : 'rgba(245,158,11,0.05)',
                  cursor: 'pointer', marginBottom: 4, textAlign: 'left'
                }}>
                  <div className="user-avatar" style={{ width: 28, height: 28, fontSize: 12, flexShrink: 0 }}>{c.name.charAt(0)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                    <div style={{ fontSize: 10, color: d < 0 ? 'var(--red)' : 'var(--orange)' }}>
                      {d < 0 ? `Vencida ${Math.abs(d)}d` : d === 0 ? 'Vence hoy' : `En ${d}d`}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, padding: '4px 12px 6px' }}>Todos los clientes</div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredClients.map(c => (
            <button key={c.id} onClick={() => setSelectedClient(c)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
              border: 'none', background: selectedClient?.id === c.id ? 'rgba(124,58,237,0.12)' : 'none',
              cursor: 'pointer', textAlign: 'left', borderLeft: selectedClient?.id === c.id ? '3px solid var(--purple)' : '3px solid transparent',
              transition: 'all 0.15s'
            }}>
              <div className="user-avatar" style={{ width: 30, height: 30, fontSize: 13, flexShrink: 0 }}>{c.name.charAt(0)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.whatsapp}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main message area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {selectedClient ? (
          <>
            {/* Header */}
            <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-secondary)' }}>
              <div className="user-avatar" style={{ width: 36, height: 36, fontSize: 15 }}>{selectedClient.name.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{selectedClient.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {selectedClient.whatsapp} · {clientSubs.length} suscripción{clientSubs.length !== 1 ? 'es' : ''}
                </div>
              </div>
              <a
                href={`https://wa.me/${selectedClient.whatsapp?.replace(/\D/g,'')}`}
                target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366', borderRadius: 8, padding: '6px 12px', textDecoration: 'none', fontSize: 13, fontWeight: 700 }}
              >
                <MessageCircle size={14} /> Abrir WhatsApp
              </a>
            </div>

            {/* Subscriptions summary */}
            <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {clientSubs.map(sub => {
                const p = getPlatform(sub.platformId);
                const d = getDays(sub.renewalDate);
                return (
                  <div key={sub.id} style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px',
                    background: d < 0 ? 'rgba(239,68,68,0.1)' : d <= 7 ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)',
                    border: `1px solid ${d < 0 ? 'rgba(239,68,68,0.3)' : d <= 7 ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)'}`,
                    borderRadius: 20, fontSize: 12
                  }}>
                    <span>{p?.icon}</span>
                    <span style={{ fontWeight: 600 }}>{p?.name}</span>
                    <span style={{ color: d < 0 ? 'var(--red)' : d <= 7 ? 'var(--orange)' : 'var(--green)', fontWeight: 700 }}>
                      {d < 0 ? `Vencida ${Math.abs(d)}d` : d === 0 ? '¡Hoy!' : `${d}d`}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Message history */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {sentMessages.filter(m => m.to === selectedClient.name).length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  <MessageCircle size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Sin mensajes enviados</div>
                  <div style={{ fontSize: 12 }}>Usa las plantillas de abajo para enviar un mensaje rápido</div>
                </div>
              ) : sentMessages.filter(m => m.to === selectedClient.name).map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ maxWidth: '70%', background: 'var(--purple)', borderRadius: '12px 12px 2px 12px', padding: '10px 14px' }}>
                    <div style={{ fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{m.text}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 4, textAlign: 'right' }}>✓✓ {m.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick templates */}
            <div style={{ padding: '10px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Plantillas rápidas</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                {QUICK_TEMPLATES.map(t => (
                  <button key={t.label} onClick={() => applyTemplate(t)} className="filter-tab" style={{ padding: '4px 10px', fontSize: 11 }}>
                    {t.label}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <textarea
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder="Escribe o selecciona una plantilla..."
                  rows={3}
                  style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 10, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 13, resize: 'none', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = 'var(--purple)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <a
                    href={msg.trim() ? `https://wa.me/${selectedClient.whatsapp?.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}` : '#'}
                    target={msg.trim() ? '_blank' : '_self'}
                    rel="noreferrer"
                    onClick={sendWA}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px',
                      background: msg.trim() ? '#25D366' : 'var(--bg-card)', border: `1px solid ${msg.trim() ? '#25D366' : 'var(--border)'}`,
                      borderRadius: 10, color: msg.trim() ? 'white' : 'var(--text-muted)', textDecoration: 'none',
                      fontWeight: 700, fontSize: 13, cursor: msg.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.2s'
                    }}
                  >
                    <MessageCircle size={16} /> WA
                  </a>
                  <button className="btn-primary" style={{ padding: '10px 14px' }} onClick={() => alert('Función de email próximamente')}>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <div style={{ textAlign: 'center' }}>
              <MessageCircle size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
              <div>Selecciona un cliente para enviar mensajes</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
