<>
<div className=""><main className="w-full bg-surface min-h-screen px-margin"><div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 flex flex-col items-center justify-between">
  {/*  Header Navigation / Brand Bar  */}
  <header className="w-full max-w-2xl mb-6 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
        <span className="material-symbols-outlined text-[20px]">spa</span>
      </div>
      <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">Aura Wellness</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="hidden sm:inline-flex items-center gap-1 text-label-sm font-label-sm text-secondary bg-secondary-container/40 px-3 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Instant WhatsApp Booking
      </span>
      <button type="button" className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" title="Share Link">
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
              <h1 className="font-headline-md text-headline-md text-on-surface">Aura Wellness</h1>
              <span className="material-symbols-outlined text-secondary text-[18px]" title="Verified Merchant">verified</span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Studio &amp; Aesthetic Spa</span>
            <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant mt-1">
              <span className="material-symbols-outlined text-primary text-[16px]">location_on</span>
              <span className="">100ft Rd, Indiranagar, Bengaluru</span>
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
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">1 service selected</span>
        </div>
        <div className="space-y-3">
          {/*  HydraFacial Glow (Selected)  */}
          <div className="relative p-4 rounded-2xl bg-surface-container-low border-2 border-primary shadow-sm transition-all cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">HydraFacial Glow Treatment</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[10px] tracking-wide font-medium">POPULAR</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Deep pore suction, hyaluronic hydration booster, and lymphatic radiance finish.</p>
                <div className="flex items-center gap-4 pt-1">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">₹2,000</span>
                  <span className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> 45 mins
                  </span>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
            </div>
          </div>
          {/*  Deep Tissue Massage  */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low/60 border border-outline-variant/60 shadow-sm transition-all cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Deep Tissue Massage</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Therapeutic muscle relief using organic eucalyptus oils &amp; herbal hot stone compress.</p>
                <div className="flex items-center gap-4 pt-1">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">₹1,500</span>
                  <span className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> 60 mins
                  </span>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center flex-shrink-0"></div>
            </div>
          </div>
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
            <span className="material-symbols-outlined text-[16px]">calendar_month</span> October 2024
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          <button className="flex flex-col items-center py-3 px-2 rounded-xl bg-primary-container text-on-primary shadow-sm transition-transform active:scale-95" type="button">
            <span className="px-2 py-0.5 rounded-full bg-white/20 font-label-sm text-[10px] mb-1 font-medium">Today</span>
            <span className="font-label-sm text-label-sm text-primary-fixed font-medium">Thu</span>
            <span className="font-headline-md text-headline-md leading-none mt-1 font-bold">24</span>
          </button>
          <button className="flex flex-col items-center py-3 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-transform active:scale-95 border border-transparent hover:border-outline-variant/40" type="button">
            <span className="h-4"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Fri</span>
            <span className="font-headline-md text-headline-md leading-none mt-1 font-bold">25</span>
          </button>
          <button className="flex flex-col items-center py-3 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-transform active:scale-95 border border-transparent hover:border-outline-variant/40" type="button">
            <span className="h-4"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Sat</span>
            <span className="font-headline-md text-headline-md leading-none mt-1 font-bold">26</span>
          </button>
          <button className="flex flex-col items-center py-3 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-transform active:scale-95 border border-transparent hover:border-outline-variant/40" type="button">
            <span className="h-4"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Sun</span>
            <span className="font-headline-md text-headline-md leading-none mt-1 font-bold">27</span>
          </button>
        </div>
        <div className="pt-2">
          <div className="flex items-center justify-between pb-2.5">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Available Afternoon &amp; Evening Slots</span>
            <span className="font-label-sm text-label-sm text-secondary font-semibold">6 open</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <button className="py-2.5 px-2 rounded-xl bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm" type="button">
              <span className="material-symbols-outlined text-[15px]">done</span> 10:00 AM
            </button>
            <button className="py-2.5 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-medium border border-transparent hover:border-outline-variant/40" type="button">
              11:30 AM
            </button>
            <button className="py-2.5 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-medium border border-transparent hover:border-outline-variant/40" type="button">
              01:15 PM
            </button>
            <button className="py-2.5 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-medium border border-transparent hover:border-outline-variant/40" type="button">
              02:45 PM
            </button>
            <button className="py-2.5 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-medium border border-transparent hover:border-outline-variant/40" type="button">
              04:00 PM
            </button>
            <button className="py-2.5 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-medium border border-transparent hover:border-outline-variant/40" type="button">
              05:30 PM
            </button>
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
              <input className="w-full h-11 pl-10 pr-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. Ananya Sharma" type="text" value="Ananya Sharma" />
            </div>
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant font-medium mb-1.5">WhatsApp Phone Number</label>
            <div className="flex items-center rounded-xl bg-surface-container-low border border-outline-variant/50 overflow-hidden focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary/20">
              <div className="h-11 px-3 bg-surface-container flex items-center gap-1.5 flex-shrink-0 text-on-surface font-label-sm text-label-sm font-semibold">
                <span className="">🇮🇳</span>
                <span className="">+91</span>
              </div>
              <input className="w-full h-11 px-3 bg-transparent text-on-surface font-body-md text-body-md focus:outline-none" placeholder="98765 43210" type="tel" value="98450 12890" />
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
          <span className="font-label-md text-label-md text-on-surface font-semibold">HydraFacial Glow Treatment</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Thu, 24 Oct • 10:00 AM (45 mins)</span>
        </div>
        <div className="text-right">
          <span className="font-headline-sm text-headline-sm text-primary font-bold block">₹2,000</span>
          <span className="font-body-sm text-[11px] text-secondary font-medium">Pay at venue</span>
        </div>
      </div>

      <button className="w-full py-4 px-6 rounded-xl bg-secondary hover:bg-[#005a3e] active:scale-[0.99] text-on-secondary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-secondary/25 transition-all" id="confirm-booking-btn" type="button">
        <span className="material-symbols-outlined text-[22px]">check_circle</span>
        <span className="">Confirm Booking via WhatsApp</span>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-on-surface-variant text-center">
        <span className="material-symbols-outlined text-secondary text-[14px]">verified_user</span>
        <span className="font-label-sm text-[12px]">Protected by</span>
        <span className="font-label-sm text-[12px] font-semibold text-primary">Rebook Instant Dispatch</span>
      </div>
    </div>

    {/*  Success Tray Overlay  */}
    <div className="hidden absolute inset-0 bg-surface-container-lowest z-30 p-6 sm:p-8 flex-col justify-between transition-opacity duration-300" id="booking-success-tray">
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
            <span className="font-medium text-on-surface">Aura Wellness, Indiranagar</span>
          </div>
          <div className="flex justify-between text-body-sm font-body-sm">
            <span className="text-on-surface-variant">Service</span>
            <span className="font-medium text-on-surface">HydraFacial Glow (45m)</span>
          </div>
          <div className="flex justify-between text-body-sm font-body-sm">
            <span className="text-on-surface-variant">Time Slot</span>
            <span className="font-medium text-secondary font-semibold">Today • 10:00 AM</span>
          </div>
          <div className="flex justify-between text-body-sm font-body-sm">
            <span className="text-on-surface-variant">Recipient</span>
            <span className="font-medium text-on-surface">+91 98450 12890</span>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#DCF8C6] text-left border border-[#DCF8C6]">
          <div className="flex items-center gap-1.5 text-secondary mb-1">
            <span className="material-symbols-outlined text-[16px]">mark_chat_read</span>
            <span className="font-label-sm text-[12px] font-semibold">WhatsApp Message Sent</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface">"Hi Ananya! Your slot is locked for 10:00 AM today at Aura Wellness. Reply CANCEL if plans change."</p>
        </div>
      </div>
      <button className="w-full max-w-md mx-auto py-3 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors" id="reset-booking-btn" type="button">
        Back to booking flow
      </button>
    </div>
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