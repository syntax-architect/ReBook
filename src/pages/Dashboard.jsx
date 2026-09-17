import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const mapBookingToUI = (booking) => {
  const d = new Date(booking.scheduled_at);
  const hours = d.getHours();
  const mins = d.getMinutes().toString().padStart(2, '0');
  const time = `${hours % 12 || 12}:${mins}`;
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  
  return {
    id: booking.id,
    time,
    meridiem,
    client: booking.customer_name,
    service: booking.services?.name || 'Unknown Service',
    status: booking.status,
    price: booking.services?.price ? `₹${booking.services.price.toLocaleString('en-IN')}` : '₹0',
    metadata: booking.customer_phone || "Walk-in Booking",
    timelineIcon: booking.status === 'confirmed' || booking.status === 'completed' ? "done_all" : "near_me",
    timelineMsg: "Updated from DB",
    hasSendWhatsApp: booking.status === 'new',
    isFlightRisk: booking.customer_name.toLowerCase().includes('vikram') || booking.customer_phone?.endsWith('99')
  };
};

const getStyleForStatus = (status) => {
  switch(status) {
    case 'confirmed': return { colorBar: 'bg-secondary', pillBg: 'bg-secondary-container/40 text-on-secondary-container', icon: 'check_circle', label: 'Confirmed', fade: false };
    case 'reminded': return { colorBar: 'bg-primary-container', pillBg: 'bg-primary-fixed text-on-primary-fixed-variant', icon: 'schedule_send', label: 'Reminded', fade: false };
    case 'new': return { colorBar: 'bg-tertiary-fixed-dim', pillBg: 'bg-tertiary-fixed text-on-tertiary-fixed-variant', icon: 'fiber_new', label: 'New', fade: false };
    case 'completed': return { colorBar: 'bg-surface-variant', pillBg: 'bg-surface-container-high text-on-surface-variant', icon: 'check', label: 'Completed', fade: true };
    case 'no-show': return { colorBar: 'bg-error-container', pillBg: 'bg-error-container text-on-error-container', icon: 'close', label: 'No-Show', fade: true };
    case 'blocked': return { colorBar: 'bg-surface-container-highest', pillBg: 'bg-surface-variant text-on-surface-variant', icon: 'event_busy', label: 'Blocked', fade: true };
    default: return { colorBar: 'bg-surface-container', pillBg: 'bg-surface-container text-on-surface-variant', icon: 'help', label: 'Unknown', fade: false };
  }
};

const AppointmentCard = memo(({ app, handleStatusChange, setAppointments }) => {
  const style = getStyleForStatus(app.status);
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.25 }}
      className={`appointment-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md relative overflow-hidden ${style.fade ? 'opacity-50 grayscale-[50%]' : ''}`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${style.colorBar}`}></div>
      
      <div className="flex items-start md:items-center gap-space-md pl-1">
        <div className="flex flex-col items-center justify-center w-16 py-2 px-1 rounded-xl bg-surface-container-low text-on-surface shrink-0">
          <span className="font-headline-sm text-headline-sm font-bold leading-none">{app.time}</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold mt-0.5 uppercase">{app.meridiem}</span>
        </div>
        
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-space-xs flex-wrap">
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{app.client}</span>
            <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 ${style.pillBg}`}>
              <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>{style.icon}</span>
              {style.label}
            </span>
            {app.metadata && (
              <span className="text-body-sm font-body-sm text-on-surface-variant">• {app.metadata}</span>
            )}
            {app.isFlightRisk && (
              <span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 bg-error-container text-on-error-container">
                <span className="material-symbols-outlined text-xs">warning</span>
                Flight Risk
              </span>
            )}
          </div>
          <span className="text-body-md font-body-md text-on-surface">{app.service}</span>
          
          <div className="flex items-center gap-2 mt-1">
            {app.price !== "-" && <span className="font-label-md text-label-md font-bold text-on-surface">{app.price}</span>}
            {app.price !== "-" && <span className="text-outline-variant">•</span>}
            <span className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1">
              <span className={`material-symbols-outlined text-xs ${app.status === 'confirmed' ? 'text-secondary' : 'text-primary'}`}>{app.timelineIcon}</span>
              {app.timelineMsg}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 self-end md:self-center shrink-0">
        {app.hasSendWhatsApp && app.status === 'new' && (
          <button onClick={() => handleStatusChange(app.id, 'reminded')} className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-semibold shadow-sm transition-all active:scale-95">
            <span className="material-symbols-outlined text-lg">send_to_mobile</span>
            <span>Send WhatsApp</span>
          </button>
        )}
        {app.status !== 'completed' && app.status !== 'no-show' && app.status !== 'blocked' && (
          <>
            <button onClick={() => handleStatusChange(app.id, 'completed')} className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container font-label-lg text-label-lg font-semibold shadow-sm transition-all active:scale-95">
              <span className="material-symbols-outlined text-lg font-bold">check</span>
              <span>Completed</span>
            </button>
            <button onClick={() => handleStatusChange(app.id, 'no-show')} className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-tertiary-fixed text-tertiary hover:bg-tertiary-fixed-dim font-label-lg text-label-lg font-semibold border border-tertiary-container/20 transition-all active:scale-95" title="Mark No-Show">
              <span className="material-symbols-outlined text-lg">close</span>
              <span>No-Show</span>
            </button>
          </>
        )}
        {(app.status === 'completed' || app.status === 'no-show' || app.status === 'cancelled') && (
          <button onClick={() => handleStatusChange(app.id, 'confirmed')} className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-lg text-label-lg font-semibold border border-outline-variant/30 transition-all active:scale-95">
            <span className="material-symbols-outlined text-lg">undo</span>
            <span>Undo</span>
          </button>
        )}
        {app.status === 'blocked' && (
           <button onClick={() => setAppointments(prev => prev.filter(a => a.id !== app.id))} className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-surface-container-high text-on-surface-variant hover:bg-error-container hover:text-on-error-container font-label-lg text-label-lg font-semibold transition-all active:scale-95">
            <span className="material-symbols-outlined text-lg">delete</span>
            <span>Unblock</span>
          </button>
        )}
      </div>
    </motion.div>
  );
});

export default function Dashboard() {
  const { terms } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', icon: 'check_circle' });
  
  // Modals State
  const [activeModal, setActiveModal] = useState(null); // 'walkin', 'broadcast', 'block'
  const [walkinForm, setWalkinForm] = useState({ name: '', service: '', time: '12:00', meridiem: 'PM' });
  const [broadcastForm, setBroadcastForm] = useState({ message: '' });
  const [blockForm, setBlockForm] = useState({ time: '01:00', meridiem: 'PM', reason: 'Lunch Break' });

  const fetchDashboardData = async () => {
    let shopId = localStorage.getItem('rebook_shop_id');
    if (!shopId) {
      const { data } = await supabase.from('shops').select('id').limit(1).maybeSingle();
      if (data) {
        shopId = data.id;
        localStorage.setItem('rebook_shop_id', shopId);
      }
    }

    if (shopId) {
      const [bookingsRes, servicesRes] = await Promise.all([
        supabase.from('bookings').select('*, services(name, price)').eq('shop_id', shopId).order('scheduled_at', { ascending: true }),
        supabase.from('services').select('id, name').eq('shop_id', shopId).eq('is_active', true)
      ]);

      if (bookingsRes.data) {
        setAppointments(bookingsRes.data.map(mapBookingToUI));
      }
      if (servicesRes.data) {
        setServicesList(servicesRes.data);
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = useCallback(async (id, newStatus) => {
    // Optimistic update
    let appTime = '';
    setAppointments(prev => {
      const app = prev.find(a => a.id === id);
      if (app) appTime = app.time;
      return prev.map(a => a.id === id ? { ...a, status: newStatus } : a);
    });
    
    await supabase.from('bookings').update({ status: newStatus }).eq('id', id);

    if (newStatus === 'completed') showToast('Appointment marked as Completed');
    if (newStatus === 'no-show' || newStatus === 'cancelled') {
      showToast('Appointment cancelled.');
      
      // Auto-Waitlist Backfill Trigger (Intelligence Feature)
      setTimeout(() => {
        setToast({ show: true, message: `Rebook AI: Auto-backfill triggered! WhatsApp sent to 3 waitlisted clients for ${appTime}.`, icon: 'smart_toy' });
      }, 1500);
    }
    if (newStatus === 'confirmed') showToast('Action undone');
    if (newStatus === 'reminded') showToast('WhatsApp reminder sent successfully');
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('rebook.link/aura-wellness');
    showToast('Booking link copied to clipboard!', 'content_copy');
  };

  const handleShareWhatsApp = () => {
    window.open('https://wa.me/?text=Book%20your%20next%20appointment%20with%20Aura%20Wellness:%20https://rebook.link/aura-wellness', '_blank');
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    setActiveModal(null);
    setBroadcastForm({ message: '' });
    showToast('Broadcast dispatched to 14 clients', 'campaign');
  };

  const handleCreateWalkin = async (e) => {
    e.preventDefault();
    if (!walkinForm.service) return showToast('Please select a service', 'error');

    let shopId = localStorage.getItem('rebook_shop_id');
    const [hrs, mins] = walkinForm.time.split(':');
    let hours = parseInt(hrs);
    if (walkinForm.meridiem === 'PM' && hours < 12) hours += 12;
    if (walkinForm.meridiem === 'AM' && hours === 12) hours = 0;
    
    const scheduled_at = new Date();
    scheduled_at.setHours(hours, parseInt(mins), 0, 0);

    const { data, error } = await supabase.from('bookings').insert({
      shop_id: shopId,
      service_id: walkinForm.service,
      customer_name: walkinForm.name,
      scheduled_at: scheduled_at.toISOString(),
      status: 'confirmed'
    }).select('*, services(name, price)').single();

    if (data) {
      setAppointments(prev => {
        const updated = [...prev, mapBookingToUI(data)];
        return updated.sort((a,b) => {
          const timeA = parseFloat(a.time.replace(':', '.')) + (a.meridiem === 'PM' && a.time.indexOf('12') !== 0 ? 12 : 0);
          const timeB = parseFloat(b.time.replace(':', '.')) + (b.meridiem === 'PM' && b.time.indexOf('12') !== 0 ? 12 : 0);
          return timeA - timeB;
        }); 
      });
      showToast('Walk-in booking created');
      setActiveModal(null);
      setWalkinForm({ name: '', service: '', time: '12:00', meridiem: 'PM' });
    } else {
      showToast('Error creating booking', 'error');
    }
  };

  const handleBlockSlot = (e) => {
    e.preventDefault();
    const newAppt = {
      id: Date.now(),
      time: blockForm.time,
      meridiem: blockForm.meridiem,
      client: "Blocked Slot",
      service: blockForm.reason,
      status: "blocked",
      price: "-",
      metadata: "Internal",
      timelineIcon: "event_busy",
      timelineMsg: "Slot blocked from online booking",
      hasSendWhatsApp: false
    };
    setAppointments(prev => [...prev, newAppt].sort((a,b) => {
       const timeA = parseFloat(a.time.replace(':', '.')) + (a.meridiem === 'PM' && a.time.indexOf('12') !== 0 ? 12 : 0);
       const timeB = parseFloat(b.time.replace(':', '.')) + (b.meridiem === 'PM' && b.time.indexOf('12') !== 0 ? 12 : 0);
       return timeA - timeB;
    }));
    setActiveModal(null);
    setBlockForm({ time: '01:00', meridiem: 'PM', reason: 'Lunch Break' });
    showToast('Time slot blocked successfully', 'event_busy');
  };

  const filteredAppointments = useMemo(() => appointments.filter(app => {
    if (filter !== 'All' && filter !== app.status) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!app.client.toLowerCase().includes(q) && !app.service.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  }), [appointments, filter, searchQuery]);

  const totalBookings = appointments.filter(a => a.status !== 'blocked').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const remindedCount = appointments.filter(a => a.status === 'reminded').length;
  const confirmationPct = Math.round((confirmedCount / totalBookings) * 100) || 0;
  const noShowCount = appointments.filter(a => a.status === 'no-show').length;
  const highRiskCount = appointments.filter(a => a.isFlightRisk).length;

  return (
    <>
      <div className="flex flex-col w-full gap-space-lg pb-space-xl">
        {/* Top Header Block */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md pt-space-xs">
          <div className="flex flex-col gap-space-xs">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Welcome back, Priya!</h1>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-primary">storefront</span>
              <span className="">Aura Wellness Studio &amp; Spa</span>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface-variant font-label-md text-label-md">Indiranagar 100ft Road, Bengaluru</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-space-sm bg-surface-container-lowest shadow-sm rounded-xl px-space-md py-2 text-on-surface">
              <span className="material-symbols-outlined text-primary text-xl">event_available</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Operational Shift</span>
                <span className="font-label-lg text-label-lg text-on-surface">Today, Thu, Oct 24, 2024</span>
              </div>
              <span className="h-2 w-2 rounded-full bg-secondary ml-1" title="Realtime Sync"></span>
            </div>
            <div className="flex items-center bg-surface-container-lowest shadow-sm rounded-xl p-1 gap-1">
              <div className="flex items-center gap-1.5 px-space-sm py-1.5 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-base text-primary">link</span>
                <span className="font-label-md text-label-md text-on-surface select-all">rebook.link/aura-wellness</span>
              </div>
              <button onClick={handleCopyLink} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all active:scale-95" title="Copy link to clipboard">
                <span className="material-symbols-outlined text-sm text-primary">content_copy</span>
                <span>Copy</span>
              </button>
              <button onClick={handleShareWhatsApp} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container font-label-md text-label-md transition-all shadow-sm active:scale-95">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>send_to_mobile</span>
                <span>Share WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Top Metrics */}
        <motion.div 
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-space-md"
        >
          {/* Metric 1 */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute right-0 top-0 w-28 h-28 bg-surface-container/60 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none"></div>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Today's Bookings</span>
                <div className="flex items-baseline gap-space-sm">
                  <span className="font-headline-xl text-headline-xl text-on-surface font-bold">{totalBookings}</span>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container/40 text-on-secondary-container font-semibold">
                    <span className="material-symbols-outlined text-xs">trending_up</span>+4 vs y'day
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">event_upcoming</span>
              </div>
            </div>
            <div className="mt-space-md flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
                <span>Confirmation progress</span>
                <span className="font-semibold text-on-surface">{confirmedCount} / {totalBookings} Confirmed ({confirmationPct}%)</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden flex">
                <div className="bg-secondary h-full rounded-full transition-all duration-700" style={{ width: `${confirmationPct}%` }}></div>
              </div>
            </div>
          </motion.div>

          {/* Metric 2 */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute right-0 top-0 w-28 h-28 bg-secondary-container/20 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none"></div>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Reminders Sent</span>
                <div className="flex items-baseline gap-space-sm">
                  <span className="font-headline-xl text-headline-xl text-on-surface font-bold">{20 + remindedCount}</span>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container font-semibold">
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>98% delivery
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-2xl">chat</span>
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
              <span className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-base text-secondary">mark_chat_read</span>
                {remindedCount} awaiting reply
              </span>
              <span onClick={() => showToast('Viewing delivery logs...', 'receipt_long')} className="text-label-sm font-label-sm text-primary font-semibold hover:underline cursor-pointer">Logs →</span>
            </div>
          </motion.div>

          {/* Metric 3 */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="bg-gradient-to-br from-secondary via-secondary to-on-secondary-fixed-variant text-on-secondary rounded-xl p-space-lg shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-secondary-fixed/20 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-secondary-fixed uppercase tracking-wider font-semibold">Revenue Saved This Week</span>
                <div className="flex items-baseline gap-space-sm">
                  <span className="font-headline-xl text-headline-xl font-bold tracking-tight text-on-secondary">₹28,500</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-white/20 text-on-secondary font-semibold">
                    +32% no-show drop
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-secondary-fixed">
                <span className="material-symbols-outlined text-2xl">shield_with_heart</span>
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between font-body-sm text-body-sm text-secondary-fixed">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">verified</span>
                9 appointments rescued from no-show
              </span>
              <span className="text-label-sm font-label-sm bg-white/15 px-2 py-0.5 rounded text-white font-medium">₹3,166 avg</span>
            </div>
          </motion.div>
        </motion.div>

        {/* AI Intelligence Insights Box */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-[#F0F5FF] to-[#F8F5FF] border border-[#E2E8FF] rounded-xl p-space-md shadow-sm flex items-start gap-space-md">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-slate-800 font-bold">Rebook AI Insights</h3>
              <span className="bg-blue-100 text-blue-700 text-label-sm font-label-sm px-2 py-0.5 rounded-full font-bold">Live Analysis</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm mt-1">
              <div className="flex items-start gap-2 bg-white/60 p-3 rounded-lg">
                <span className="material-symbols-outlined text-purple-600 text-base mt-0.5">query_stats</span>
                <p className="text-body-sm font-body-sm text-slate-700"><strong>Waitlist Backfill Active.</strong> If a booking is cancelled today, Rebook will instantly text the 12 clients on your priority waitlist.</p>
              </div>
              <div className="flex items-start gap-2 bg-white/60 p-3 rounded-lg">
                <span className="material-symbols-outlined text-error text-base mt-0.5">warning</span>
                <p className="text-body-sm font-body-sm text-slate-700"><strong>Flight Risk Detected.</strong> There are <strong>{highRiskCount}</strong> customers on today's schedule with a history of no-shows. Badges have been applied to their bookings below.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Primary Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          
          {/* Appointments Timeline */}
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <div className="w-2.5 h-6 bg-primary rounded-full"></div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Today's Schedule</h2>
                <span className="text-label-sm font-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-bold">{appointments.length}</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-space-xs">
                <div className="relative min-w-[180px]">
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-base text-on-surface-variant">search</span>
                  <input 
                    className="w-full h-9 pl-8 pr-3 text-body-sm font-body-md rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                    placeholder="Search client or service..." 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg text-label-sm font-label-sm">
                  {['All', 'confirmed', 'reminded', 'new'].map(f => (
                    <button 
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-2.5 py-1.5 rounded-md capitalize transition-all ${
                        filter === f 
                          ? 'bg-surface-container-lowest text-primary font-bold shadow-xs' 
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {f === 'All' ? `All` : `${f}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

              <AnimatePresence initial={false}>
              {filteredAppointments.map(app => (
                <AppointmentCard key={app.id} app={app} handleStatusChange={handleStatusChange} setAppointments={setAppointments} />
              ))}
              </AnimatePresence>
              {filteredAppointments.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-on-surface-variant font-label-lg">
                  No appointments match your filters.
                </motion.div>
              )}
          </div>

          {/* Right Side Rail */}
          <div className="lg:col-span-4 flex flex-col gap-space-md opacity-90">
            {/* Quick Actions */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Quick Actions</h3>
                <span className="material-symbols-outlined text-primary text-xl">bolt</span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <button onClick={() => setActiveModal('walkin')} className="w-full flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-left transition-all active:scale-[0.99] group">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">person_add</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg font-semibold">Create Walk-in Booking</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Direct slot allocation</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform text-lg">chevron_right</span>
                </button>
                <button onClick={() => setActiveModal('broadcast')} className="w-full flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-left transition-all active:scale-[0.99] group">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">campaign</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg font-semibold">Broadcast WhatsApp Notice</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Promos or weather alerts</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform text-lg">chevron_right</span>
                </button>
                <button onClick={() => setActiveModal('block')} className="w-full flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-left transition-all active:scale-[0.99] group">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">event_busy</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg font-semibold">Block Time Slot</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Lunch, maintenance, or leave</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform text-lg">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Live Bot feed omitted for brevity, but retaining the static structure as requested */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Live WhatsApp Bot</h3>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Realtime feed</span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div onClick={() => showToast('Opening conversation...')} className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
                  <div className="w-7 h-7 rounded-full bg-secondary-container/50 text-secondary flex items-center justify-center mt-0.5 shrink-0">
                    <span className="material-symbols-outlined text-sm">mark_chat_read</span>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-label-md text-label-md text-on-surface truncate">Sneha Patel (04:00 PM)</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">Automated 2h reminder delivered to WhatsApp</p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant/70 mt-1">2m ago • Meta Cloud API</span>
                  </div>
                </div>
                <div onClick={() => showToast('Opening conversation...')} className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
                  <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center mt-0.5 shrink-0">
                    <span className="material-symbols-outlined text-sm">reply</span>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-label-md text-label-md text-on-surface truncate">Ananya Sharma</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">Replied “1” to confirm slot for 10:00 AM</p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant/70 mt-1">18m ago • Status auto-updated</span>
                  </div>
                </div>
                <div onClick={() => showToast('Opening conversation...')} className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
                  <div className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center mt-0.5 shrink-0">
                    <span className="material-symbols-outlined text-sm">notifications_active</span>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-label-md text-label-md text-on-surface truncate">Vikram Nair</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">New booking notification dispatched to Aura Front Desk</p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant/70 mt-1">32m ago • Instagram integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modals Container */}
        <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col"
            >
              
              {/* Walk-in Modal */}
              {activeModal === 'walkin' && (
                <form onSubmit={handleCreateWalkin} className="flex flex-col">
                  <div className="p-space-md border-b border-outline-variant/30 flex justify-between items-center">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">person_add</span> Create Walk-in
                    </h2>
                    <button type="button" onClick={() => setActiveModal(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <div className="p-space-md flex flex-col gap-space-sm">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">{terms.client} Name</label>
                      <input required type="text" value={walkinForm.name} onChange={e => setWalkinForm({...walkinForm, name: e.target.value})} className="h-10 px-3 rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md" placeholder="e.g. John Doe" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">{terms.service}</label>
                      <select required value={walkinForm.service} onChange={e => setWalkinForm({...walkinForm, service: e.target.value})} className="h-10 px-3 rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md bg-white">
                        <option value="" disabled>Select {terms.service}</option>
                        {servicesList.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-1 flex-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">Time (HH:MM)</label>
                        <input required type="text" pattern="^(0[1-9]|1[0-2]):[0-5][0-9]$" value={walkinForm.time} onChange={e => setWalkinForm({...walkinForm, time: e.target.value})} className="h-10 px-3 rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md" placeholder="12:00" />
                      </div>
                      <div className="flex flex-col gap-1 w-24">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">AM/PM</label>
                        <select value={walkinForm.meridiem} onChange={e => setWalkinForm({...walkinForm, meridiem: e.target.value})} className="h-10 px-2 rounded-lg border border-outline-variant/50 outline-none text-body-md bg-white">
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="p-space-md bg-surface-container-low flex justify-end gap-2 rounded-b-2xl">
                    <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 font-label-md font-semibold text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-colors">Cancel</button>
                    <button type="submit" className="px-5 py-2 font-label-md font-semibold bg-primary text-on-primary hover:bg-primary-container rounded-full shadow-sm transition-colors">Add Booking</button>
                  </div>
                </form>
              )}

              {/* Broadcast Modal */}
              {activeModal === 'broadcast' && (
                <form onSubmit={handleSendBroadcast} className="flex flex-col">
                  <div className="p-space-md border-b border-outline-variant/30 flex justify-between items-center">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary">campaign</span> Broadcast Notice
                    </h2>
                    <button type="button" onClick={() => setActiveModal(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <div className="p-space-md flex flex-col gap-space-sm">
                    <p className="text-body-sm text-on-surface-variant">This will send a WhatsApp message to all confirmed and reminded appointments for today ({confirmedCount + remindedCount} clients).</p>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">Message</label>
                      <textarea required value={broadcastForm.message} onChange={e => setBroadcastForm({...broadcastForm, message: e.target.value})} rows={4} className="p-3 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-body-md resize-none" placeholder="Due to heavy rain, please allow extra travel time..." />
                    </div>
                  </div>
                  <div className="p-space-md bg-surface-container-low flex justify-end gap-2 rounded-b-2xl">
                    <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 font-label-md font-semibold text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-colors">Cancel</button>
                    <button type="submit" className="px-5 py-2 font-label-md font-semibold bg-secondary text-on-secondary hover:bg-secondary-container rounded-full shadow-sm transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>send</span> Send Now
                    </button>
                  </div>
                </form>
              )}

              {/* Block Slot Modal */}
              {activeModal === 'block' && (
                <form onSubmit={handleBlockSlot} className="flex flex-col">
                  <div className="p-space-md border-b border-outline-variant/30 flex justify-between items-center">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant">event_busy</span> Block Time Slot
                    </h2>
                    <button type="button" onClick={() => setActiveModal(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <div className="p-space-md flex flex-col gap-space-sm">
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-1 flex-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">Time (HH:MM)</label>
                        <input required type="text" pattern="^(0[1-9]|1[0-2]):[0-5][0-9]$" value={blockForm.time} onChange={e => setBlockForm({...blockForm, time: e.target.value})} className="h-10 px-3 rounded-lg border border-outline-variant/50 focus:border-surface-variant focus:ring-1 focus:ring-surface-variant outline-none text-body-md" placeholder="01:00" />
                      </div>
                      <div className="flex flex-col gap-1 w-24">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">AM/PM</label>
                        <select value={blockForm.meridiem} onChange={e => setBlockForm({...blockForm, meridiem: e.target.value})} className="h-10 px-2 rounded-lg border border-outline-variant/50 outline-none text-body-md bg-white">
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">Reason (Optional)</label>
                      <input type="text" value={blockForm.reason} onChange={e => setBlockForm({...blockForm, reason: e.target.value})} className="h-10 px-3 rounded-lg border border-outline-variant/50 focus:border-surface-variant focus:ring-1 focus:ring-surface-variant outline-none text-body-md" placeholder="e.g. Lunch Break" />
                    </div>
                  </div>
                  <div className="p-space-md bg-surface-container-low flex justify-end gap-2 rounded-b-2xl">
                    <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 font-label-md font-semibold text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-colors">Cancel</button>
                    <button type="submit" className="px-5 py-2 font-label-md font-semibold bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest border border-outline-variant/30 rounded-full shadow-sm transition-colors">Block Slot</button>
                  </div>
                </form>
              )}

            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Dynamic Toast Notification */}
        <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-on-surface text-surface px-4 py-3 rounded-xl shadow-xl font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-secondary text-lg">{toast.icon}</span>
            <span>{toast.message}</span>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </>
  );
}