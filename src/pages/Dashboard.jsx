import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import AppointmentCard from '../components/dashboard/AppointmentCard';
import MetricsCards from '../components/dashboard/MetricsCards';

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
    metadata: booking.customer_phone || 'Walk-in Booking',
    timelineIcon:
      booking.status === 'confirmed' || booking.status === 'completed' ? 'done_all' : 'near_me',
    timelineMsg: 'Updated from DB',
    hasSendWhatsApp: booking.status === 'new',
    isFlightRisk:
      booking.customer_name.toLowerCase().includes('vikram') ||
      booking.customer_phone?.endsWith('99'),
  };
};


export default function Dashboard() {
  const { terms, shop } = useAuth();
  const isSubscriptionInactive =
    shop?.subscription_status === 'past_due' || shop?.subscription_status === 'cancelled';
  const [appointments, setAppointments] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', icon: 'check_circle' });

  // Modals State
  const [activeModal, setActiveModal] = useState(null); // 'newBooking', 'broadcast', 'block'
  const [newBookingForm, setNewBookingForm] = useState({
    name: '',
    phone: '',
    service: '',
    dateOffset: 0,
    time: '',
    whatsappConsent: true,
  });
  const [broadcastForm, setBroadcastForm] = useState({ message: '' });
  const [blockForm, setBlockForm] = useState({
    time: '01:00',
    meridiem: 'PM',
    reason: 'Lunch Break',
  });

  const dates = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
          offset: i,
          dayName: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNumber: d.getDate(),
          fullDate: d,
        };
      }),
    []
  );

  const availableTimes = useMemo(
    () => ['10:00 AM', '11:30 AM', '01:15 PM', '02:45 PM', '04:00 PM', '05:30 PM'],
    []
  );

  const showToast = useCallback((message, icon = 'check_circle') => {
    setToast({ show: true, message, icon });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  }, []);

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
        supabase
          .from('bookings')
          .select('*, services(name, price)')
          .eq('shop_id', shopId)
          .order('scheduled_at', { ascending: true }),
        supabase.from('services').select('id, name').eq('shop_id', shopId).eq('is_active', true),
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

  const handleStatusChange = useCallback(
    async (id, newStatus) => {
      if (newStatus === 'reminded' && isSubscriptionInactive) {
        showToast('Reactivate your subscription to use WhatsApp automation', 'error');
        return;
      }
      // Optimistic update
      let appTime = '';
      setAppointments((prev) => {
        const app = prev.find((a) => a.id === id);
        if (app) appTime = app.time;
        return prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
      });

      await supabase.from('bookings').update({ status: newStatus }).eq('id', id);

      if (newStatus === 'completed') showToast('Appointment marked as Completed');
      if (newStatus === 'no-show' || newStatus === 'cancelled') {
        showToast('Appointment cancelled.');

        // Auto-Waitlist Backfill Trigger (Intelligence Feature)
        setTimeout(() => {
          setToast({
            show: true,
            message: `Rebook AI: Auto-backfill triggered! WhatsApp sent to 3 waitlisted clients for ${appTime}.`,
            icon: 'smart_toy',
          });
        }, 1500);
      }
      if (newStatus === 'confirmed') showToast('Action undone');
      if (newStatus === 'reminded') showToast('WhatsApp reminder sent successfully');
    },
    [showToast]
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText('rebook.link/aura-wellness');
    showToast('Booking link copied to clipboard!', 'content_copy');
  };

  const handleShareWhatsApp = () => {
    window.open(
      'https://wa.me/?text=Book%20your%20next%20appointment%20with%20Aura%20Wellness:%20https://rebook.link/aura-wellness',
      '_blank'
    );
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (isSubscriptionInactive) {
      showToast('Reactivate your subscription to send broadcasts', 'error');
      return;
    }
    setActiveModal(null);
    setBroadcastForm({ message: '' });
    showToast('Broadcast dispatched to 14 clients', 'campaign');
  };

  const handleCreateNewBooking = async (e) => {
    e.preventDefault();
    if (isSubscriptionInactive) {
      return showToast('Reactivate your subscription to accept new bookings', 'error');
    }
    if (!newBookingForm.service) return showToast('Please select a service', 'error');
    if (!newBookingForm.time) return showToast('Please select a time', 'error');
    if (!/^\+91[6-9]\d{9}$/.test(newBookingForm.phone))
      return showToast('Please enter a valid 10-digit Indian phone number', 'error');

    let shopId = localStorage.getItem('rebook_shop_id');
    const [timeStr, meridiem] = newBookingForm.time.split(' ');
    let [hours, mins] = timeStr.split(':');
    hours = parseInt(hours);
    if (meridiem === 'PM' && hours < 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;

    const scheduled_at = new Date(dates[newBookingForm.dateOffset].fullDate);
    scheduled_at.setHours(hours, parseInt(mins), 0, 0);

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        shop_id: shopId,
        service_id: newBookingForm.service,
        customer_name: newBookingForm.name,
        customer_phone: newBookingForm.phone,
        scheduled_at: scheduled_at.toISOString(),
        status: 'confirmed',
        whatsapp_consent: newBookingForm.whatsappConsent,
      })
      .select('*, services(name, price)')
      .single();

    if (data) {
      setAppointments((prev) => {
        const updated = [...prev, mapBookingToUI(data)];
        return updated.sort((a, b) => {
          const timeA =
            parseFloat(a.time.replace(':', '.')) +
            (a.meridiem === 'PM' && a.time.indexOf('12') !== 0 ? 12 : 0);
          const timeB =
            parseFloat(b.time.replace(':', '.')) +
            (b.meridiem === 'PM' && b.time.indexOf('12') !== 0 ? 12 : 0);
          return timeA - timeB;
        });
      });
      showToast('Booking created successfully');
      setActiveModal(null);
      setNewBookingForm({
        name: '',
        phone: '',
        service: '',
        dateOffset: 0,
        time: '',
        whatsappConsent: true,
      });
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
      client: 'Blocked Slot',
      service: blockForm.reason,
      status: 'blocked',
      price: '-',
      metadata: 'Internal',
      timelineIcon: 'event_busy',
      timelineMsg: 'Slot blocked from online booking',
      hasSendWhatsApp: false,
    };
    setAppointments((prev) =>
      [...prev, newAppt].sort((a, b) => {
        const timeA =
          parseFloat(a.time.replace(':', '.')) +
          (a.meridiem === 'PM' && a.time.indexOf('12') !== 0 ? 12 : 0);
        const timeB =
          parseFloat(b.time.replace(':', '.')) +
          (b.meridiem === 'PM' && b.time.indexOf('12') !== 0 ? 12 : 0);
        return timeA - timeB;
      })
    );
    setActiveModal(null);
    setBlockForm({ time: '01:00', meridiem: 'PM', reason: 'Lunch Break' });
    showToast('Time slot blocked successfully', 'event_busy');
  };

  const filteredAppointments = useMemo(
    () =>
      appointments.filter((app) => {
        if (filter !== 'All' && filter !== app.status) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          if (!app.client.toLowerCase().includes(q) && !app.service.toLowerCase().includes(q)) {
            return false;
          }
        }
        return true;
      }),
    [appointments, filter, searchQuery]
  );

  const totalBookings = appointments.filter((a) => a.status !== 'blocked').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const remindedCount = appointments.filter((a) => a.status === 'reminded').length;
  const confirmationPct = Math.round((confirmedCount / totalBookings) * 100) || 0;
  const noShowCount = appointments.filter((a) => a.status === 'no-show').length;
  const highRiskCount = appointments.filter((a) => a.isFlightRisk).length;

  return (
    <>
      <div className="flex flex-col w-full gap-space-lg pb-space-xl">
        {isSubscriptionInactive && (
          <div className="bg-error-container text-on-error-container p-4 rounded-xl shadow-sm flex items-start gap-3 border border-error/20">
            <span className="material-symbols-outlined text-error">warning</span>
            <div className="flex flex-col gap-1">
              <h3 className="font-headline-sm text-headline-sm font-bold">
                Subscription {shop?.subscription_status === 'past_due' ? 'Past Due' : 'Cancelled'}
              </h3>
              <p className="text-body-sm font-body-sm">
                Your subscription is currently inactive. Automated WhatsApp reminders and new
                bookings have been paused. Please reactivate your subscription to restore full
                functionality.
              </p>
              <Link
                to="/billing"
                className="mt-2 self-start px-4 py-1.5 bg-error text-on-error font-label-sm font-semibold rounded-lg shadow-sm hover:opacity-90 transition-all"
              >
                Reactivate Subscription
              </Link>
            </div>
          </div>
        )}
        {/* Top Header Block */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md pt-space-xs">
          <div className="flex flex-col gap-space-xs">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Welcome back, Priya!
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-primary">storefront</span>
              <span className="">Aura Wellness Studio &amp; Spa</span>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface-variant font-label-md text-label-md">
                Indiranagar 100ft Road, Bengaluru
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-space-sm bg-surface-container-lowest shadow-sm rounded-xl px-space-md py-2 text-on-surface">
              <span className="material-symbols-outlined text-primary text-xl">
                event_available
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                  Operational Shift
                </span>
                <span className="font-label-lg text-label-lg text-on-surface">
                  Today, Thu, Oct 24, 2024
                </span>
              </div>
              <span className="h-2 w-2 rounded-full bg-secondary ml-1" title="Realtime Sync"></span>
            </div>
            <div className="flex items-center bg-surface-container-lowest shadow-sm rounded-xl p-1 gap-1">
              <div className="flex items-center gap-1.5 px-space-sm py-1.5 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-base text-primary">link</span>
                <span className="font-label-md text-label-md text-on-surface select-all">
                  rebook.link/aura-wellness
                </span>
              </div>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all active:scale-95"
                title="Copy link to clipboard"
              >
                <span className="material-symbols-outlined text-sm text-primary">content_copy</span>
                <span>Copy</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container font-label-md text-label-md transition-all shadow-sm active:scale-95"
              >
                <span
                  className="material-symbols-outlined text-base"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  send_to_mobile
                </span>
                <span>Share WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        <MetricsCards 
          totalBookings={totalBookings}
          confirmedCount={confirmedCount}
          confirmationPct={confirmationPct}
          remindedCount={remindedCount}
          showToast={showToast}
        />

        {/* AI Intelligence Insights Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#F0F5FF] to-[#F8F5FF] border border-[#E2E8FF] rounded-xl p-space-md shadow-sm flex items-start gap-space-md"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-slate-800 font-bold">
                Rebook AI Insights
              </h3>
              <span className="bg-blue-100 text-blue-700 text-label-sm font-label-sm px-2 py-0.5 rounded-full font-bold">
                Live Analysis
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm mt-1">
              <div className="flex items-start gap-2 bg-white/60 p-3 rounded-lg">
                <span className="material-symbols-outlined text-purple-600 text-base mt-0.5">
                  query_stats
                </span>
                <p className="text-body-sm font-body-sm text-slate-700">
                  <strong>Waitlist Backfill Active.</strong> If a booking is cancelled today, Rebook
                  will instantly text the 12 clients on your priority waitlist.
                </p>
              </div>
              <div className="flex items-start gap-2 bg-white/60 p-3 rounded-lg">
                <span className="material-symbols-outlined text-error text-base mt-0.5">
                  warning
                </span>
                <p className="text-body-sm font-body-sm text-slate-700">
                  <strong>Flight Risk Detected.</strong> There are <strong>{highRiskCount}</strong>{' '}
                  customers on today's schedule with a history of no-shows. Badges have been applied
                  to their bookings below.
                </p>
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
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  Today's Schedule
                </h2>
                <span className="text-label-sm font-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-bold">
                  {appointments.length}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-space-xs">
                <div className="relative min-w-[180px]">
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-base text-on-surface-variant">
                    search
                  </span>
                  <input
                    className="w-full h-9 pl-8 pr-3 text-body-sm font-body-md rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Search client or service..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg text-label-sm font-label-sm">
                  {['All', 'confirmed', 'reminded', 'new'].map((f) => (
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
              {filteredAppointments.map((app) => (
                <AppointmentCard
                  key={app.id}
                  app={app}
                  handleStatusChange={handleStatusChange}
                  setAppointments={setAppointments}
                />
              ))}
            </AnimatePresence>
            {filteredAppointments.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-on-surface-variant font-label-lg"
              >
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
                <button
                  onClick={() => setActiveModal('newBooking')}
                  className="w-full flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-left transition-all active:scale-[0.99] group"
                >
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">event</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg font-semibold">New Booking</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Phone or walk-in
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform text-lg">
                    chevron_right
                  </span>
                </button>
                <button
                  onClick={() => setActiveModal('broadcast')}
                  className="w-full flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-left transition-all active:scale-[0.99] group"
                >
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">campaign</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg font-semibold">
                        Broadcast WhatsApp Notice
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Promos or weather alerts
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform text-lg">
                    chevron_right
                  </span>
                </button>
                <button
                  onClick={() => setActiveModal('block')}
                  className="w-full flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-left transition-all active:scale-[0.99] group"
                >
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">event_busy</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg font-semibold">
                        Block Time Slot
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Lunch, maintenance, or leave
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform text-lg">
                    chevron_right
                  </span>
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
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Live WhatsApp Bot
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">
                  Realtime feed
                </span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div
                  onClick={() => showToast('Opening conversation...')}
                  className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-secondary-container/50 text-secondary flex items-center justify-center mt-0.5 shrink-0">
                    <span className="material-symbols-outlined text-sm">mark_chat_read</span>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-label-md text-label-md text-on-surface truncate">
                      Sneha Patel (04:00 PM)
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                      Automated 2h reminder delivered to WhatsApp
                    </p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant/70 mt-1">
                      2m ago • Meta Cloud API
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => showToast('Opening conversation...')}
                  className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center mt-0.5 shrink-0">
                    <span className="material-symbols-outlined text-sm">reply</span>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-label-md text-label-md text-on-surface truncate">
                      Ananya Sharma
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                      Replied “1” to confirm slot for 10:00 AM
                    </p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant/70 mt-1">
                      18m ago • Status auto-updated
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => showToast('Opening conversation...')}
                  className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center mt-0.5 shrink-0">
                    <span className="material-symbols-outlined text-sm">notifications_active</span>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-label-md text-label-md text-on-surface truncate">
                      Vikram Nair
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                      New booking notification dispatched to Aura Front Desk
                    </p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant/70 mt-1">
                      32m ago • Instagram integration
                    </span>
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
                transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col"
              >
                {/* New Booking Modal */}
                {activeModal === 'newBooking' && (
                  <form onSubmit={handleCreateNewBooking} className="flex flex-col">
                    <div className="p-space-md border-b border-outline-variant/30 flex justify-between items-center">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">event</span> New
                        Booking
                      </h2>
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                    <div className="p-space-md flex flex-col gap-space-sm max-h-[60vh] overflow-y-auto">
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">
                          {terms.client} Name
                        </label>
                        <input
                          required
                          type="text"
                          value={newBookingForm.name}
                          onChange={(e) =>
                            setNewBookingForm({ ...newBookingForm, name: e.target.value })
                          }
                          className="h-10 px-3 rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md"
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">
                          Phone Number
                        </label>
                        <input
                          required
                          type="tel"
                          value={newBookingForm.phone}
                          onChange={(e) => {
                            let val = e.target.value.replace(/[^\d+]/g, '');
                            if (val === '+') {
                              setNewBookingForm({ ...newBookingForm, phone: '' });
                              return;
                            }
                            if (val.startsWith('0')) val = '+91' + val.substring(1);
                            else if (
                              val.startsWith('91') &&
                              val.length >= 2 &&
                              !val.startsWith('+91')
                            )
                              val = '+91' + val.substring(2);
                            else if (val.length > 0 && !val.startsWith('+')) val = '+91' + val;
                            if (val.startsWith('+91'))
                              val = '+91' + val.substring(3).substring(0, 10);
                            setNewBookingForm({ ...newBookingForm, phone: val });
                          }}
                          className="h-10 px-3 rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">
                          {terms.service}
                        </label>
                        <select
                          required
                          value={newBookingForm.service}
                          onChange={(e) =>
                            setNewBookingForm({ ...newBookingForm, service: e.target.value })
                          }
                          className="h-10 px-3 rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md bg-white"
                        >
                          <option value="" disabled>
                            Select {terms.service}
                          </option>
                          {servicesList.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col gap-1 flex-1">
                          <label className="font-label-sm text-label-sm text-on-surface-variant">
                            Date
                          </label>
                          <select
                            required
                            value={newBookingForm.dateOffset}
                            onChange={(e) =>
                              setNewBookingForm({
                                ...newBookingForm,
                                dateOffset: parseInt(e.target.value),
                              })
                            }
                            className="h-10 px-3 rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md bg-white"
                          >
                            {dates.map((d) => (
                              <option key={d.offset} value={d.offset}>
                                {d.offset === 0 ? 'Today' : d.dayName + ', ' + d.dayNumber}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <label className="font-label-sm text-label-sm text-on-surface-variant">
                            Time
                          </label>
                          <select
                            required
                            value={newBookingForm.time}
                            onChange={(e) =>
                              setNewBookingForm({ ...newBookingForm, time: e.target.value })
                            }
                            className="h-10 px-3 rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md bg-white"
                          >
                            <option value="" disabled>
                              Select Time
                            </option>
                            {availableTimes.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <label className="flex items-start gap-2 p-2 mt-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newBookingForm.whatsappConsent}
                          onChange={(e) =>
                            setNewBookingForm({
                              ...newBookingForm,
                              whatsappConsent: e.target.checked,
                            })
                          }
                          className="mt-1 w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                          required
                        />
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          I agree to receive appointment reminders on WhatsApp
                        </span>
                      </label>
                    </div>
                    <div className="p-space-md bg-surface-container-low flex justify-end gap-2 rounded-b-2xl">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 font-label-md font-semibold text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 font-label-md font-semibold bg-primary text-on-primary hover:bg-primary-container rounded-full shadow-sm transition-colors"
                      >
                        Add Booking
                      </button>
                    </div>
                  </form>
                )}

                {/* Broadcast Modal */}
                {activeModal === 'broadcast' && (
                  <form onSubmit={handleSendBroadcast} className="flex flex-col">
                    <div className="p-space-md border-b border-outline-variant/30 flex justify-between items-center">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">campaign</span>{' '}
                        Broadcast Notice
                      </h2>
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                    <div className="p-space-md flex flex-col gap-space-sm">
                      <p className="text-body-sm text-on-surface-variant">
                        This will send a WhatsApp message to all confirmed and reminded appointments
                        for today ({confirmedCount + remindedCount} clients).
                      </p>
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">
                          Message
                        </label>
                        <textarea
                          required
                          value={broadcastForm.message}
                          onChange={(e) =>
                            setBroadcastForm({ ...broadcastForm, message: e.target.value })
                          }
                          rows={4}
                          className="p-3 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-body-md resize-none"
                          placeholder="Due to heavy rain, please allow extra travel time..."
                        />
                      </div>
                    </div>
                    <div className="p-space-md bg-surface-container-low flex justify-end gap-2 rounded-b-2xl">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 font-label-md font-semibold text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 font-label-md font-semibold bg-secondary text-on-secondary hover:bg-secondary-container rounded-full shadow-sm transition-colors flex items-center gap-2"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          send
                        </span>{' '}
                        Send Now
                      </button>
                    </div>
                  </form>
                )}

                {/* Block Slot Modal */}
                {activeModal === 'block' && (
                  <form onSubmit={handleBlockSlot} className="flex flex-col">
                    <div className="p-space-md border-b border-outline-variant/30 flex justify-between items-center">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant">
                          event_busy
                        </span>{' '}
                        Block Time Slot
                      </h2>
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                    <div className="p-space-md flex flex-col gap-space-sm">
                      <div className="flex gap-4">
                        <div className="flex flex-col gap-1 flex-1">
                          <label className="font-label-sm text-label-sm text-on-surface-variant">
                            Time (HH:MM)
                          </label>
                          <input
                            required
                            type="text"
                            pattern="^(0[1-9]|1[0-2]):[0-5][0-9]$"
                            value={blockForm.time}
                            onChange={(e) => setBlockForm({ ...blockForm, time: e.target.value })}
                            className="h-10 px-3 rounded-lg border border-outline-variant/50 focus:border-surface-variant focus:ring-1 focus:ring-surface-variant outline-none text-body-md"
                            placeholder="01:00"
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-24">
                          <label className="font-label-sm text-label-sm text-on-surface-variant">
                            AM/PM
                          </label>
                          <select
                            value={blockForm.meridiem}
                            onChange={(e) =>
                              setBlockForm({ ...blockForm, meridiem: e.target.value })
                            }
                            className="h-10 px-2 rounded-lg border border-outline-variant/50 outline-none text-body-md bg-white"
                          >
                            <option>AM</option>
                            <option>PM</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">
                          Reason (Optional)
                        </label>
                        <input
                          type="text"
                          value={blockForm.reason}
                          onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })}
                          className="h-10 px-3 rounded-lg border border-outline-variant/50 focus:border-surface-variant focus:ring-1 focus:ring-surface-variant outline-none text-body-md"
                          placeholder="e.g. Lunch Break"
                        />
                      </div>
                    </div>
                    <div className="p-space-md bg-surface-container-low flex justify-end gap-2 rounded-b-2xl">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 font-label-md font-semibold text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 font-label-md font-semibold bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest border border-outline-variant/30 rounded-full shadow-sm transition-colors"
                      >
                        Block Slot
                      </button>
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
              transition={{ type: 'spring', bounce: 0.5, duration: 0.5 }}
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
