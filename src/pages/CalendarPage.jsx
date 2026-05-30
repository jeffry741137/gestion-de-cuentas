import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { SUBSCRIPTIONS, CLIENTS, PLATFORMS } from '../data/mockData';

const today = new Date();

function getPlatform(id) { return PLATFORMS.find(p => p.id === id); }
function getClient(id) { return CLIENTS.find(c => c.id === id); }

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAYS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let startDow = firstDay.getDay(); // 0=Sun
  startDow = startDow === 0 ? 6 : startDow - 1; // make Mon=0

  const days = [];
  for (let i = 0; i < startDow; i++) {
    const d = new Date(year, month, -startDow + i + 1);
    days.push({ date: d, currentMonth: false });
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: new Date(year, month, d), currentMonth: true });
  }
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ date: new Date(year, month + 1, d), currentMonth: false });
  }
  return days;
}

function getSubsForDate(date) {
  const dateStr = date.toISOString().split('T')[0];
  return SUBSCRIPTIONS.filter(s => s.renewalDate === dateStr);
}

function statusColor(status) {
  if (status === 'activa') return '#10b981';
  if (status === 'por_vencer') return '#f59e0b';
  if (status === 'vencida') return '#ef4444';
  return '#7c3aed';
}

export default function CalendarPage() {
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState(null);

  const days = getMonthDays(viewDate.getFullYear(), viewDate.getMonth());

  const prevMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const selectedSubs = selectedDay ? getSubsForDate(selectedDay) : [];
  const totalToCollect = selectedSubs.reduce((t, s) => t + s.price, 0);

  // Month totals
  const monthSubs = SUBSCRIPTIONS.filter(s => {
    const d = new Date(s.renewalDate);
    return d.getFullYear() === viewDate.getFullYear() && d.getMonth() === viewDate.getMonth();
  });
  const paid = monthSubs.filter(s => s.status === 'activa').length;
  const porVencer = monthSubs.filter(s => s.status === 'por_vencer').length;
  const vencidas = monthSubs.filter(s => s.status === 'vencida').length;

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div className="filter-tabs" style={{ margin: 0, flex: 1 }}>
            {[
              { label: `Todos ${monthSubs.length}`, color: 'var(--text-primary)' },
              { label: `Pagados ${paid}`, color: 'var(--green)' },
              { label: `Por vencer ${porVencer}`, color: 'var(--orange)' },
              { label: `Vencidos ${vencidas}`, color: 'var(--red)' },
            ].map(({ label, color }) => (
              <div key={label} className="filter-tab" style={{ color }}>{label}</div>
            ))}
          </div>
          <button className="btn-primary"><Plus size={14} /> Nuevo evento</button>
        </div>

        {/* Month navigation */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <button className="icon-btn" onClick={prevMonth}><ChevronLeft size={16} /></button>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </div>
            <button className="icon-btn" onClick={nextMonth}><ChevronRight size={16} /></button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, marginBottom: 1 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', padding: '4px 0', textTransform: 'uppercase' }}>{d}</div>
            ))}
          </div>

          <div className="calendar-grid">
            {days.map(({ date, currentMonth }, i) => {
              const daySubs = getSubsForDate(date);
              const isToday = date.toDateString() === today.toDateString();
              const isSelected = selectedDay?.toDateString() === date.toDateString();

              return (
                <div
                  key={i}
                  className={`cal-cell${isToday ? ' today' : ''}${!currentMonth ? ' other-month' : ''}`}
                  style={{ background: isSelected ? 'rgba(124,58,237,0.15)' : '' }}
                  onClick={() => setSelectedDay(date)}
                >
                  <div className="cal-day-num">{date.getDate()}</div>
                  {daySubs.slice(0, 2).map(sub => {
                    const p = getPlatform(sub.platformId);
                    return (
                      <div
                        key={sub.id}
                        className="cal-event"
                        style={{ background: `${statusColor(sub.status)}22`, color: statusColor(sub.status), border: `1px solid ${statusColor(sub.status)}44` }}
                        title={`${p?.name} - ${getClient(sub.clientId)?.name}`}
                      >
                        {p?.icon} {p?.name?.slice(0,8)}
                      </div>
                    );
                  })}
                  {daySubs.length > 2 && (
                    <div style={{ fontSize: 10, color: 'var(--purple-light)', fontWeight: 700, padding: '1px 4px' }}>
                      +{daySubs.length - 2} más
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div style={{ width: 280, borderLeft: '1px solid var(--border)', background: 'var(--bg-secondary)', overflowY: 'auto', padding: 20 }}>
        {selectedDay ? (
          <>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
              {selectedDay.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
              {selectedSubs.length} eventos · Total a cobrar: <strong style={{ color: 'var(--green)' }}>S/ {totalToCollect.toFixed(2)}</strong>
            </div>
            {selectedSubs.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 20, fontSize: 13 }}>
                No hay vencimientos este día
              </div>
            ) : selectedSubs.map(sub => {
              const p = getPlatform(sub.platformId);
              const c = getClient(sub.clientId);
              return (
                <div key={sub.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12, marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 22 }}>{p?.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{p?.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c?.name}</div>
                    </div>
                    <span className={`status-badge status-${sub.status}`} style={{ marginLeft: 'auto', fontSize: 10 }}>
                      {sub.status === 'activa' ? 'Pagado' : sub.status === 'por_vencer' ? 'Por vencer' : 'Vencido'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{c?.whatsapp}</span>
                    <span style={{ fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--font-display)' }}>S/ {sub.price.toFixed(2)}</span>
                  </div>
                  {c?.whatsapp && (
                    <a
                      href={`https://wa.me/${c.whatsapp.replace(/\D/g,'')}?text=Hola ${c.name}, te recuerdo que tu suscripción de ${p?.name} vence hoy. Por favor realiza tu pago. ¡Gracias!`}
                      target="_blank" rel="noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366', borderRadius: 6, padding: '5px 10px', textDecoration: 'none', fontSize: 12, fontWeight: 700 }}
                    >
                      📱 Enviar recordatorio WA
                    </a>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Selecciona un día para ver los vencimientos</div>
            <div className="card-title">Resumen del mes</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Pagados', count: paid, color: 'var(--green)' },
                { label: 'Por vencer', count: porVencer, color: 'var(--orange)' },
                { label: 'Vencidos', count: vencidas, color: 'var(--red)' },
                { label: 'Total', count: monthSubs.length, color: 'var(--purple-light)' },
              ].map(({ label, count, color }) => (
                <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color }}>{count}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <div className="card-title">Próximos vencimientos</div>
              {SUBSCRIPTIONS.filter(s => {
                const d = new Date(s.renewalDate);
                const diff = Math.round((d - today) / (1000*60*60*24));
                return diff >= 0 && diff <= 7;
              }).slice(0, 5).map(sub => {
                const p = getPlatform(sub.platformId);
                const c = getClient(sub.clientId);
                const days = Math.round((new Date(sub.renewalDate) - today) / (1000*60*60*24));
                return (
                  <div key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 18 }}>{p?.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{c?.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p?.name}</div>
                    </div>
                    <span className="days-chip days-orange">{days === 0 ? 'Hoy' : `${days}d`}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
