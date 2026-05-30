import { useState } from 'react';
import { Plus, Bell, Send, Edit2, Trash2, MessageCircle, ToggleLeft, ToggleRight } from 'lucide-react';
import { SUBSCRIPTIONS, CLIENTS, PLATFORMS } from '../data/mockData';

const today = new Date();

function getDays(dateStr) {
  return Math.round((new Date(dateStr) - today) / (1000 * 60 * 60 * 24));
}

const RULES = [
  { id: 1, days: 7, when: 'antes', event: 'Próximo vencimiento', desc: 'Aviso preventivo', channel: 'WhatsApp', freq: 'Una vez', active: true },
  { id: 2, days: 3, when: 'antes', event: 'Próximo vencimiento', desc: 'Segundo aviso', channel: 'WhatsApp', freq: 'Una vez', active: true },
  { id: 3, days: 1, when: 'antes', event: 'Próximo vencimiento', desc: 'Último aviso', channel: 'WhatsApp', freq: 'Una vez', active: true },
  { id: 4, days: 0, when: 'hoy', event: 'Vencimiento hoy', desc: 'Pago vence hoy', channel: 'WhatsApp', freq: 'Una vez', active: true },
  { id: 5, days: 1, when: 'después', event: 'Pago vencido', desc: 'Recordatorio de pago', channel: 'WhatsApp', freq: 'Cada 2 días', active: true },
  { id: 6, days: 3, when: 'después', event: 'Pago vencido', desc: 'Segundo recordatorio', channel: 'WhatsApp', freq: 'Cada 3 días', active: true },
  { id: 7, days: 7, when: 'después', event: 'Pago vencido', desc: 'Último recordatorio', channel: 'WhatsApp', freq: 'Semanal', active: true },
];

const TEMPLATES = [
  {
    title: '7 días antes',
    color: '#3b82f6',
    text: '¡Hola {cliente}! 👋\nTe recordamos que tu suscripción a {plataforma} vence el {fecha_vencimiento}.\n¡Gracias por tu confianza! 😊'
  },
  {
    title: '3 días antes',
    color: '#f59e0b',
    text: 'Hola {cliente},\nTu suscripción a {plataforma} vence en 3 días ({fecha_vencimiento}).\nAsegura tu continuidad realizando tu pago.\n¡Gracias! 🙌'
  },
  {
    title: 'Día de vencimiento',
    color: '#ef4444',
    text: 'Hola {cliente},\nTu suscripción a {plataforma} vence hoy ({fecha_vencimiento}).\nPor favor realiza tu pago para evitar interrupciones. ⚠️'
  },
  {
    title: 'Pago vencido',
    color: '#ef4444',
    text: 'Hemos notado que tu pago de {plataforma} está vencido desde {fecha_vencimiento}.\nPor favor regulariza tu pago. 🙏'
  },
];

function generateWhatsAppMsg(template, client, platformName, renewalDate) {
  return template
    .replace(/{cliente}/g, client?.name || '')
    .replace(/{plataforma}/g, platformName || '')
    .replace(/{fecha_vencimiento}/g, new Date(renewalDate).toLocaleDateString('es-PE'));
}

export default function Reminders() {
  const [rules, setRules] = useState(RULES);
  const [activeTab, setActiveTab] = useState('rules');

  const toggleRule = (id) => setRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));

  // Get subscriptions that need reminders
  const urgentSubs = SUBSCRIPTIONS.filter(s => {
    const days = getDays(s.renewalDate);
    return days >= -3 && days <= 7;
  }).sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate));

  const sentCount = 24;
  const scheduledCount = 15;

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '1px solid var(--border)' }}>
          {[['rules', 'Reglas de recordatorios'], ['templates', 'Plantillas de mensajes'], ['history', 'Historial de envíos']].map(([k, l]) => (
            <button key={k} onClick={() => setActiveTab(k)} style={{
              padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer',
              color: activeTab === k ? 'var(--purple-light)' : 'var(--text-muted)',
              fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-body)',
              borderBottom: activeTab === k ? '2px solid var(--purple-light)' : '2px solid transparent',
              marginBottom: -1, transition: 'all 0.2s'
            }}>{l}</button>
          ))}
        </div>

        {activeTab === 'rules' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Reglas de recordatorios automáticos</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Define cuándo y cómo se enviarán los recordatorios</div>
              </div>
              <button className="btn-primary"><Plus size={14} /> Nueva regla</button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Días antes/después</th>
                    <th>Evento</th>
                    <th>Canal</th>
                    <th>Frecuencia</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map(rule => (
                    <tr key={rule.id}>
                      <td>
                        <span style={{
                          fontWeight: 700, fontSize: 13,
                          color: rule.when === 'antes' ? 'var(--blue)' : rule.when === 'hoy' ? 'var(--orange)' : 'var(--red)'
                        }}>
                          {rule.days === 0 ? 'El día de vencimiento' : `${rule.days} día${rule.days > 1 ? 's' : ''} ${rule.when}`}
                        </span>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>del vencimiento</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{rule.event}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{rule.desc}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 16 }}>💬</span>
                          <span style={{ fontSize: 13 }}>{rule.channel}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{rule.freq}</td>
                      <td>
                        <span className={`status-badge ${rule.active ? 'status-activa' : 'status-pausada'}`}>
                          {rule.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button onClick={() => toggleRule(rule.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: rule.active ? 'var(--green)' : 'var(--text-muted)' }}>
                            {rule.active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                          </button>
                          <button className="action-btn"><Edit2 size={13} /></button>
                          <button className="action-btn danger"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Templates preview */}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Plantillas de mensajes</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Mensajes que serán enviados automáticamente según la regla.</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {TEMPLATES.map(t => (
                  <div key={t.title} className="card" style={{ borderTop: `3px solid ${t.color}` }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginBottom: 8 }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{t.text}</div>
                    <button className="btn-secondary" style={{ width: '100%', marginTop: 10, fontSize: 12 }}>Ver plantilla</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgent actions */}
            {urgentSubs.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Envíos urgentes</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Clientes que necesitan recordatorio ahora mismo.</div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Cliente</th>
                        <th>Plataforma</th>
                        <th>Vencimiento</th>
                        <th>Estado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {urgentSubs.map(sub => {
                        const p = PLATFORMS.find(pl => pl.id === sub.platformId);
                        const c = CLIENTS.find(cl => cl.id === sub.clientId);
                        const days = getDays(sub.renewalDate);
                        const template = days >= 0 ? TEMPLATES[days <= 1 ? 2 : days <= 3 ? 1 : 0] : TEMPLATES[3];
                        const msg = generateWhatsAppMsg(template.text, c, p?.name, sub.renewalDate);
                        return (
                          <tr key={sub.id}>
                            <td>
                              <div style={{ fontWeight: 700 }}>{c?.name}</div>
                              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c?.whatsapp}</div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ fontSize: 18 }}>{p?.icon}</span>
                                <span style={{ fontSize: 13 }}>{p?.name}</span>
                              </div>
                            </td>
                            <td>
                              <div style={{ fontSize: 12 }}>{new Date(sub.renewalDate).toLocaleDateString('es-PE')}</div>
                              <span className={`days-chip ${days < 0 ? 'days-red' : days <= 3 ? 'days-orange' : 'days-green'}`}>
                                {days < 0 ? `${Math.abs(days)}d vencido` : days === 0 ? 'Hoy' : `En ${days}d`}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge status-${sub.status}`}>
                                {sub.status === 'por_vencer' ? 'Por vencer' : 'Vencida'}
                              </span>
                            </td>
                            <td>
                              <a
                                href={`https://wa.me/${c?.whatsapp?.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`}
                                target="_blank" rel="noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366', borderRadius: 6, padding: '6px 12px', textDecoration: 'none', fontSize: 12, fontWeight: 700 }}
                              >
                                <MessageCircle size={12} /> Enviar WA
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'templates' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {TEMPLATES.map(t => (
              <div key={t.title} className="card" style={{ borderLeft: `4px solid ${t.color}` }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.color, marginBottom: 12 }}>{t.title}</div>
                <textarea
                  defaultValue={t.text}
                  rows={6}
                  style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8, padding: 10, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 13, resize: 'vertical', lineHeight: 1.6 }}
                />
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button className="btn-primary" style={{ fontSize: 12 }}><Edit2 size={12} /> Editar</button>
                  <button className="btn-secondary" style={{ fontSize: 12 }}>Vista previa</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
            <Bell size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Historial de envíos</div>
            <div style={{ fontSize: 13 }}>Se mostrará el historial de todos los recordatorios enviados</div>
          </div>
        )}
      </div>

      {/* Side panel */}
      <div style={{ width: 260, borderLeft: '1px solid var(--border)', background: 'var(--bg-secondary)', overflowY: 'auto', padding: 20 }}>
        <div className="card-title">Resumen de recordatorios</div>
        {[
          { label: 'Reglas activas', value: rules.filter(r => r.active).length, sub: '100% activas', color: 'var(--green)' },
          { label: 'Enviados este mes', value: sentCount, sub: '+18% vs. mes anterior', color: 'var(--blue)' },
          { label: 'Pendientes de enviar', value: 23, sub: 'Próximas 24h', color: 'var(--orange)' },
          { label: 'Tasa de respuesta', value: '68%', sub: '+12% vs. mes anterior', color: 'var(--purple-light)' },
        ].map(({ label, value, sub, color }) => (
          <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sub}</div>
          </div>
        ))}

        <div style={{ marginTop: 16 }}>
          <div className="card-title">Acciones rápidas</div>
          {['Crear nueva regla', 'Crear plantilla de mensaje', 'Enviar recordatorio manual', 'Importar desde plantillas'].map(action => (
            <button key={action} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, marginBottom: 6, cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 13, transition: 'all 0.2s' }}>
              {action}
              <span style={{ color: 'var(--purple-light)' }}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
