import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingPage() {
  const { shopSlug } = useParams();
  const [shop, setShop] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const dates = useMemo(() => Array.from({ length: 4 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      offset: i,
      dayName: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      fullDate: d
    };
  }), []);
  
  const availableTimes = useMemo(() => ['10:00 AM', '11:30 AM', '01:15 PM', '02:45 PM', '04:00 PM', '05:30 PM'], []);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const { data: shopData, error: shopError } = await supabase
          .from('shops')
          .select('*')
          .eq('slug', shopSlug)
          .single();
          
        if (shopError || !shopData) {
          setLoading(false);
          return;
        }
        
        setShop(shopData);
        
        const { data: servicesData } = await supabase
          .from('services')
          .select('*')
          .eq('shop_id', shopData.id)
          .eq('is_active', true);
          
        setServices(servicesData || []);
        if (servicesData?.length > 0) setSelectedService(servicesData[0]);
      } catch (err) {
        console.error("Error fetching shop data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchShopData();
  }, [shopSlug]);

  const handleBookAppointment = async () => {
    if (!selectedService || !selectedTime || !customerName || !customerPhone || isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const [timeStr, meridiem] = selectedTime.split(' ');
      let [hours, mins] = timeStr.split(':');
      hours = parseInt(hours);
      if (meridiem === 'PM' && hours < 12) hours += 12;
      if (meridiem === 'AM' && hours === 12) hours = 0;
      
      const scheduled_at = new Date(dates[selectedDate].fullDate);
      scheduled_at.setHours(hours, parseInt(mins), 0, 0);

      const { error } = await supabase.from('bookings').insert({
        shop_id: shop.id,
        service_id: selectedService.id,
        customer_name: customerName,
        customer_phone: customerPhone,
        scheduled_at: scheduled_at.toISOString(),
        status: 'new'
      });
      
      if (!error) {
        setShowSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-surface flex items-center justify-center font-label-md text-on-surface">Loading booking portal...</div>;
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">search_off</span>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Shop Not Found</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md">The booking link you followed doesn't seem to exist. Please verify the link with the business owner.</p>
      </div>
    );
  }

  return (
    <>
<div className=""><main className="w-full bg-surface min-h-screen px-margin"><div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 flex flex-col items-center justify-between">
  {/*  Header Navigation / Brand Bar  */}
  <header className="w-full max-w-2xl mb-6 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
        <span className="material-symbols-outlined text-[20px]">spa</span>
      </div>
      <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">{shop.name}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="hidden sm:inline-flex items-center gap-1 text-label-sm font-label-sm text-secondary bg-secondary-container/40 px-3 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Instant WhatsApp Booking
      </span>
      <button type="button" onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }} className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" title="Share Link">
        <span className="material-symbols-outlined text-[18px]">share</span>
      </button>
    </div>
  </header>

  {/*  Main Booking Card  */}
  <main className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/60 overflow-hidden relative">
    {/*  Spa Merchant Banner Info  */}
    <div className="p-6 bg-surface-container-low border-b border-outline-variant/60">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shadow-md flex-shrink-0">
            <span className="material-symbols-outlined text-[28px]">spa</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="font-headline-md text-headline-md text-on-surface">{shop.name}</h1>
              <span className="material-symbols-outlined text-secondary text-[18px]" title="Verified Merchant">verified</span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant capitalize">{shop.industry} • Verified Partner</span>
            <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant mt-1">
              <span className="material-symbols-outlined text-primary text-[16px]">location_on</span>
              <span className="">{shop.city || 'Location unavailable'}</span>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
          <div className="flex items-center gap-1 bg-surface-container-lowest px-3 py-1 rounded-full shadow-sm">
            <span className="material-symbols-outlined text-[#F59E0B] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">4.9</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">(120+ reviews)</span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1 bg-secondary-container/30 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span> Open Today
          </span>
        </div>
      </div>
      <div className="mt-4 bg-secondary-container/30 px-3 py-2 rounded-xl flex items-center gap-2">
        <span className="material-symbols-outlined text-secondary text-[18px]">bolt</span>
        <span className="font-label-sm text-label-sm text-on-secondary-container font-medium">Instant WhatsApp confirmation • Pay zero advance at booking</span>
      </div>
    </div>

    {/*  Interactive Steps Form  */}
    <div className="p-6 sm:p-8 space-y-8">
      {/*  Step 1: Services  */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">1</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Select Service</h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">{selectedService ? '1 service selected' : '0 selected'}</span>
        </div>
        <div className="space-y-3">
          {services.map(service => {
            const isSelected = selectedService?.id === service.id;
            return (
              <div key={service.id} onClick={() => setSelectedService(service)} className={`relative p-4 rounded-2xl transition-all cursor-pointer ${isSelected ? 'bg-surface-container-low border-2 border-primary shadow-sm' : 'bg-surface-container-lowest hover:bg-surface-container-low/60 border border-outline-variant/60 shadow-sm'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-4 pt-1">
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">₹{service.price?.toLocaleString('en-IN') || 0}</span>
                      <span className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">schedule</span> {service.duration_minutes} mins
                      </span>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-primary text-on-primary shadow-sm' : 'border-2 border-outline-variant'}`}>
                    {isSelected && <span className="material-symbols-outlined text-[16px]">check</span>}
                  </div>
                </div>
              </div>
            );
          })}
          {services.length === 0 && (
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 text-center text-on-surface-variant font-body-sm">
              No active services found for this shop.
            </div>
          )}
        </div>
      </div>

      {/*  Step 2: Date & Time  */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">2</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Select Date &amp; Time</h2>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">calendar_month</span> {dates[selectedDate].fullDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {dates.map(dateObj => {
            const isSelected = selectedDate === dateObj.offset;
            return (
              <button key={dateObj.offset} onClick={() => setSelectedDate(dateObj.offset)} className={`flex flex-col items-center py-3 px-2 rounded-xl transition-transform active:scale-95 border ${isSelected ? 'bg-primary-container text-on-primary shadow-sm border-transparent' : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-transparent hover:border-outline-variant/40'}`} type="button">
                {dateObj.offset === 0 ? <span className="px-2 py-0.5 rounded-full bg-white/20 font-label-sm text-[10px] mb-1 font-medium">Today</span> : <span className="h-4 mb-1"></span>}
                <span className={`font-label-sm text-label-sm font-medium ${isSelected ? 'text-primary-fixed' : 'text-on-surface-variant'}`}>{dateObj.offset === 0 && !isSelected ? 'Today' : dateObj.dayName}</span>
                <span className="font-headline-md text-headline-md leading-none mt-1 font-bold">{dateObj.dayNumber}</span>
              </button>
            );
          })}
        </div>
        <div className="pt-2">
          <div className="flex items-center justify-between pb-2.5">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Available Open Slots</span>
            <span className="font-label-sm text-label-sm text-secondary font-semibold">{availableTimes.length} open</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {availableTimes.map(time => {
              const isSelected = selectedTime === time;
              return (
                <button key={time} onClick={() => setSelectedTime(time)} className={`py-2.5 px-2 rounded-xl font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 ${isSelected ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-low hover:bg-surface-container text-on-surface border border-transparent hover:border-outline-variant/40'}`} type="button">
                  {isSelected && <span className="material-symbols-outlined text-[15px]">done</span>} {time}
                </button>
              );
            })}
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#DCF8C6]/60 border border-[#DCF8C6] flex items-start gap-2.5 shadow-xs">
          <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0 mt-0.5">chat</span>
          <p className="font-body-sm text-body-sm text-[#0F172A]">
            <strong className="font-label-sm font-semibold">Automated WhatsApp Reminder:</strong> A dispatch alert will arrive 2 hours prior to your slot with 1-click reschedule.
          </p>
        </div>
      </div>

      {/*  Step 3: Contact Details  */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">3</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Your Details</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium mb-1.5">Full Name</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-on-surface-variant absolute left-3 text-[18px]">person</span>
              <input value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full h-11 pl-10 pr-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. Ananya Sharma" type="text" />
            </div>
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium mb-1.5">WhatsApp Phone Number</label>
            <div className="flex items-center rounded-xl bg-surface-container-low border border-outline-variant/50 overflow-hidden focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary/20">
              <div className="h-11 px-3 bg-surface-container flex items-center gap-1.5 flex-shrink-0 text-on-surface font-label-sm text-label-sm font-semibold">
                <span className="">🇮🇳</span>
                <span className="">+91</span>
              </div>
              <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} className="w-full h-11 px-3 bg-transparent text-on-surface font-body-md text-body-md focus:outline-none" placeholder="98765 43210" type="tel" />
              <div className="pr-3 text-secondary flex items-center">
                <span className="material-symbols-outlined text-[20px]">sms</span>
              </div>
            </div>
          </div>
        </div>
        <p className="font-body-sm text-[12px] text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px] text-secondary">lock</span> Zero promotional spam. Solely for calendar pass and appointment arrival updates.
        </p>
      </div>
    </div>

    {/*  Order Summary & Checkout Footer  */}
    <div className="p-6 sm:p-8 bg-surface-container-low/50 border-t border-outline-variant/60 space-y-4">
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/60">
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-on-surface font-semibold">{selectedService?.name || 'Select a service'}</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">{dates[selectedDate].dayName}, {dates[selectedDate].dayNumber} {dates[selectedDate].fullDate.toLocaleString('default', { month: 'short' })} • {selectedTime || 'Select time'} ({selectedService?.duration_minutes || 0} mins)</span>
        </div>
        <div className="text-right">
          <span className="font-headline-sm text-headline-sm text-primary font-bold block">₹{selectedService?.price?.toLocaleString('en-IN') || 0}</span>
          <span className="font-body-sm text-[11px] text-secondary font-medium">Pay at venue</span>
        </div>
      </div>

      <button onClick={handleBookAppointment} disabled={!selectedService || !selectedTime || !customerName || !customerPhone || isSubmitting} className="w-full py-4 px-6 rounded-xl bg-secondary hover:bg-[#005a3e] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary active:scale-[0.99] text-on-secondary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-secondary/25 transition-all" id="confirm-booking-btn" type="button">
        {isSubmitting ? (
          <span className="animate-pulse">Confirming...</span>
        ) : (
          <>
            <span className="material-symbols-outlined text-[22px]">check_circle</span>
            <span className="">Confirm Booking via WhatsApp</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-on-surface-variant text-center">
        <span className="material-symbols-outlined text-secondary text-[14px]">verified_user</span>
        <span className="font-label-sm text-[12px]">Protected by</span>
        <span className="font-label-sm text-[12px] font-semibold text-primary">Rebook Instant Dispatch</span>
      </div>
    </div>

    {/*  Success Tray Overlay  */}
    {showSuccess && (
      <div className="absolute inset-0 bg-surface-container-lowest z-30 p-6 sm:p-8 flex-col justify-between transition-opacity duration-300 flex" id="booking-success-tray">
        <div className="space-y-6 pt-4 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container mx-auto flex items-center justify-center shadow-md animate-bounce">
            <span className="material-symbols-outlined text-[36px]">done_all</span>
          </div>
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Appointment Reserved!</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">We dispatched your confirmation ticket to WhatsApp</p>
          </div>
          <div className="p-4 rounded-2xl bg-surface-container-low text-left space-y-2.5 border border-outline-variant/60">
            <div className="flex justify-between text-body-sm font-body-sm">
              <span className="text-on-surface-variant">Studio</span>
              <span className="font-medium text-on-surface">{shop.name}, {shop.city?.split(',')[0]}</span>
            </div>
            <div className="flex justify-between text-body-sm font-body-sm">
              <span className="text-on-surface-variant">Service</span>
              <span className="font-medium text-on-surface">{selectedService?.name} ({selectedService?.duration_minutes}m)</span>
            </div>
            <div className="flex justify-between text-body-sm font-body-sm">
              <span className="text-on-surface-variant">Time Slot</span>
              <span className="font-medium text-secondary font-semibold">{dates[selectedDate].offset === 0 ? 'Today' : dates[selectedDate].dayName} • {selectedTime}</span>
            </div>
            <div className="flex justify-between text-body-sm font-body-sm">
              <span className="text-on-surface-variant">Recipient</span>
              <span className="font-medium text-on-surface">+91 {customerPhone}</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#DCF8C6] text-left border border-[#DCF8C6]">
            <div className="flex items-center gap-1.5 text-secondary mb-1">
              <span className="material-symbols-outlined text-[16px]">mark_chat_read</span>
              <span className="font-label-sm text-[12px] font-semibold">WhatsApp Message Sent</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface">"Hi {customerName.split(' ')[0]}! Your slot is locked for {selectedTime} {dates[selectedDate].offset === 0 ? 'today' : 'on ' + dates[selectedDate].dayName} at {shop.name}. Reply CANCEL if plans change."</p>
          </div>
        </div>
        <button onClick={() => { setShowSuccess(false); setSelectedTime(''); setCustomerName(''); setCustomerPhone(''); }} className="w-full max-w-md mx-auto py-3 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">
          Book Another Slot
        </button>
      </div>
    )}
  </main>

  {/*  Subtle Web Footer  */}
  <footer className="w-full max-w-2xl mt-8 pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between text-on-surface-variant font-body-sm text-body-sm gap-2">
    <div className="flex items-center gap-1.5">
      <span className="material-symbols-outlined text-secondary text-[16px]">bolt</span>
      <span className="">Powered by <strong className="font-semibold text-primary">Rebook</strong></span>
    </div>
    <div className="flex items-center gap-4 text-[12px]">
      <span className="flex items-center gap-1">
        <span className="material-symbols-outlined text-primary text-[15px]">sync_saved_locally</span> Auto-sync with Front Desk
      </span>
      <span className="">•</span>
      <span className="">Instant WhatsApp confirmation</span>
    </div>
  </footer>
</div></main></div>
    </>
  );
}