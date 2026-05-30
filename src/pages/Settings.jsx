import { useState } from 'react';
import { Save, Shield, Bell, Globe, Palette, Clock, DollarSign, Lock, Smartphone, Eye, ChevronRight } from 'lucide-react';

const TABS = ['General', 'Perfil', 'Seguridad', 'Notificaciones', 'Facturación', 'Integraciones', 'Preferencias'];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General');
  const [theme, setTheme] = useState('oscuro');
  const [primaryColor, setPrimaryColor] = useState('#7c3aed');
  const [currency, setCurrency] = useState('PEN');
  const [language, setLanguage] = useState('Español');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeFormat, setTimeFormat] = useState('24 horas');
  const [saved, setSaved] = useState(false);

  const [notifs, setNotifs] = useState({
    email: true,
    push: true,
    pagos: true,
    resumen: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const COLORS = ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 28, borderBottom: '1px solid var(--border)' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer',
              color: activeTab === t ? 'var(--purple-light)' : 'var(--text-muted)',
              fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-body)',
              borderBottom: activeTab === t ? '2px solid var(--purple-light)' : '2px solid transparent',
              marginBottom: -1, transition: 'all 0.2s', whiteSpace: 'nowrap'
            }}>{t}</button>
          ))}
        </div>

        {activeTab === 'General' && (
          <>
            {/* Business info */}
            <div className="card" style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Información del negocio</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Actualiza la información básica de tu negocio.</div>

              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ position: 'relative' }}>
                  <div className="user-avatar" style={{ width: 72, height: 72, fontSize: 32 }}>⚡</div>
                  <button style={{ position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, background: 'var(--purple)', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11 }}>✏️</button>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Nombre del negocio</label>
                      <input className="form-input" defaultValue="ItachiPeru" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Correo electrónico</label>
                      <input className="form-input" defaultValue="admin@itachiperu.com" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Teléfono</label>
                      <input className="form-input" defaultValue="+51 987 654 321" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Zona horaria</label>
                      <select className="form-select" defaultValue="GMT-5">
                        <option>(GMT-05:00) Lima, Perú</option>
                        <option>(GMT-06:00) México</option>
                        <option>(GMT-03:00) Buenos Aires</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Dirección del negocio</label>
                    <input className="form-input" defaultValue="Lima, Perú" />
                  </div>
                </div>
              </div>
            </div>

            {/* General preferences */}
            <div className="card" style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Preferencias generales</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Configura las preferencias generales de tu cuenta.</div>

              {[
                { icon: <DollarSign size={16} />, label: 'Moneda predeterminada', desc: 'Selecciona la moneda principal para transacciones.', value: currency, options: ['PEN (S/)', 'USD ($)', 'EUR (€)'], onChange: setCurrency },
                { icon: <Globe size={16} />, label: 'Idioma', desc: 'Selecciona el idioma de la plataforma.', value: language, options: ['Español', 'English', 'Português'], onChange: setLanguage },
                { icon: <Clock size={16} />, label: 'Formato de fecha', desc: 'Elige cómo se muestran las fechas.', value: dateFormat, options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'], onChange: setDateFormat },
                { icon: <Clock size={16} />, label: 'Formato de hora', desc: 'Elige cómo se muestran las horas.', value: timeFormat, options: ['24 horas', '12 horas (AM/PM)'], onChange: setTimeFormat },
              ].map(({ icon, label, desc, value, options, onChange }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ color: 'var(--text-muted)', marginRight: 12 }}>{icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{desc}</div>
                  </div>
                  <select className="form-select" value={value} onChange={e => onChange(e.target.value)} style={{ width: 220 }}>
                    {options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {/* Personalization */}
            <div className="card">
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Personalización</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Personaliza la apariencia de tu plataforma.</div>

              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--text-muted)', marginRight: 12 }}><Palette size={16} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Tema</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Elige el tema de la interfaz.</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Claro', 'Oscuro', 'Sistema'].map(t => (
                    <button key={t} onClick={() => setTheme(t.toLowerCase())} style={{
                      padding: '6px 14px', borderRadius: 20, border: '1px solid var(--border)',
                      background: theme === t.toLowerCase() ? 'var(--purple)' : 'var(--bg-secondary)',
                      color: theme === t.toLowerCase() ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-body)', fontWeight: 600, transition: 'all 0.2s'
                    }}>{t}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0' }}>
                <div style={{ color: 'var(--text-muted)', marginRight: 12 }}><Palette size={16} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Color principal</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Personaliza la apariencia de tu plataforma.</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {COLORS.map(c => (
                    <button key={c} onClick={() => setPrimaryColor(c)} style={{
                      width: 28, height: 28, borderRadius: '50%', background: c, border: primaryColor === c ? '3px solid white' : '2px solid transparent',
                      cursor: 'pointer', transition: 'border 0.2s', outline: primaryColor === c ? `3px solid ${c}` : 'none', outlineOffset: 2
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Notificaciones' && (
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Preferencias de notificaciones</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Controla qué notificaciones recibes.</div>

            {[
              { key: 'email', icon: '📧', label: 'Correo electrónico', desc: 'Recibe notificaciones por correo.' },
              { key: 'push', icon: '🔔', label: 'Notificaciones push', desc: 'Recibe notificaciones en la plataforma.' },
              { key: 'pagos', icon: '💳', label: 'Recordatorios de pagos', desc: 'Recibe recordatorios de pagos y vencimientos.' },
              { key: 'resumen', icon: '📊', label: 'Resumen diario', desc: 'Recibe un resumen diario de tu negocio.' },
            ].map(n => (
              <div key={n.key} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 20, marginRight: 12 }}>{n.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{n.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{n.desc}</div>
                </div>
                <button onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                  style={{
                    width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
                    background: notifs[n.key] ? 'var(--green)' : 'var(--border)',
                  }}>
                  <div style={{
                    position: 'absolute', top: 3, left: notifs[n.key] ? 22 : 3, width: 18, height: 18,
                    background: 'white', borderRadius: '50%', transition: 'left 0.2s'
                  }} />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Seguridad' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: <Lock size={18} />, title: 'Cambiar contraseña', desc: 'Actualiza tu contraseña regularmente.' },
              { icon: <Shield size={18} />, title: 'Autenticación en dos pasos', desc: 'Protege tu cuenta con 2FA.', badge: 'Activada', color: 'var(--green)' },
              { icon: <Smartphone size={18} />, title: 'Sesiones activas', desc: 'Administra tus dispositivos.' },
              { icon: <Eye size={18} />, title: 'Historial de actividad', desc: 'Revisa la actividad de tu cuenta.' },
            ].map(item => (
              <div key={item.title} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ color: 'var(--purple-light)', padding: 10, background: 'rgba(124,58,237,0.1)', borderRadius: 10 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
                {item.badge && <span style={{ fontSize: 12, color: item.color, fontWeight: 700 }}>{item.badge}</span>}
                <ChevronRight size={16} color="var(--text-muted)" />
              </div>
            ))}

            <div className="card" style={{ borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.05)' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--red)', marginBottom: 6 }}>Zona de peligro</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Estas acciones son irreversibles. Procede con cuidado.</div>
              <button className="btn-danger">🚪 Cerrar todas las sesiones</button>
            </div>
          </div>
        )}

        {!['General', 'Notificaciones', 'Seguridad'].includes(activeTab) && (
          <div style={{ textAlign: 'center', padding: 80, color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>⚙️</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{activeTab}</div>
            <div style={{ fontSize: 13 }}>Configuración de {activeTab.toLowerCase()} disponible próximamente.</div>
          </div>
        )}
      </div>

      {/* Side panel */}
      <div style={{ width: 280, borderLeft: '1px solid var(--border)', background: 'var(--bg-secondary)', overflowY: 'auto', padding: 20 }}>
        {/* Plan */}
        <div className="card" style={{ marginBottom: 16, background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(91,33,182,0.1) 100%)', borderColor: 'rgba(124,58,237,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Plan actual</div>
            <span className="plan-badge">PREMIUM</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--purple-light)', marginBottom: 4 }}>Plan Ninja Premium</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>S/ 89.90 <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--text-muted)' }}>/ mes</span></div>
          <button style={{ background: 'none', border: 'none', color: 'var(--purple-light)', fontSize: 12, cursor: 'pointer', padding: 0 }}>Ver detalles del plan →</button>
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Uso actual · Vence el 21/06/2025</div>
            <div className="plan-bar"><div className="plan-bar-fill" /></div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>78%</div>
          </div>
        </div>

        {/* Security summary */}
        <div className="card">
          <div className="card-title">Seguridad de la cuenta</div>
          {[
            { label: 'Cambiar contraseña', desc: 'Actualiza tu contraseña regularmente.' },
            { label: 'Autenticación en dos pasos', desc: 'Activada', badge: true },
            { label: 'Sesiones activas', desc: 'Administra tus dispositivos.' },
            { label: 'Historial de actividad', desc: 'Revisa la actividad de tu cuenta.' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: item.badge ? 'var(--green)' : 'var(--text-muted)' }}>{item.desc}</div>
              </div>
              <ChevronRight size={14} color="var(--text-muted)" />
            </div>
          ))}
        </div>

        {/* Save button */}
        <button
          className="btn-primary"
          style={{ width: '100%', marginTop: 16, justifyContent: 'center', background: saved ? 'var(--green)' : 'var(--purple)', transition: 'background 0.3s' }}
          onClick={handleSave}
        >
          <Save size={14} /> {saved ? '✓ Guardado!' : 'Guardar cambios'}
        </button>
      </div>
    </div>
  );
}
