<>
<aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between py-margin px-gutter"><div className="flex flex-col gap-space-xl"><div className="flex items-center gap-space-sm"><img alt="Rebook Brand Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm-3KhIc3fEcmirBioz2OtSRUYWGPmU-0eOnq97rsZBOf_X-e9SnJfGH8YnWiF5oZ569mLBQMhMosApAeytlqP9bMr_ONO4NuhwapQU2S54CrAH8B5bfHv2regjlZam7IsKrNIgLJhILqRarSNZ3hgxkdsPRzVWyKOo7WXinqWjM_-Z7TuDlBjMY6D5pLh7U2MyXQ-pumRyF7D7sf3ZLyiLBPGQvF6r_TQKY0uGIozxaH_Y1vSenJhzg"/><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-primary tracking-tight">Rebook</span><span className="font-label-sm text-label-sm text-on-surface-variant">WhatsApp Reminders</span></div></div><nav className="flex flex-col gap-space-xs" data-active-classes="bg-primary-container text-on-primary font-label-lg rounded-lg"><a aria-current="page" className="flex items-center gap-space-sm px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-label-lg rounded-lg" data-path="dashboard" href="#"><span className="material-symbols-outlined text-primary">calendar_today</span>Dashboard</a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-lg text-label-lg transition-colors" data-path="services" href="#"><span className="material-symbols-outlined text-primary">spa</span>Services</a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-lg text-label-lg transition-colors" data-path="settings" href="#"><span className="material-symbols-outlined text-primary">tune</span>Settings</a></nav></div><div className="flex flex-col gap-space-md"><div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs"><div className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-secondary text-sm">support_agent</span><span className="font-label-sm text-label-sm text-on-surface">Automated Dispatch</span></div><span className="font-body-sm text-body-sm text-on-surface-variant">99.8% prompt rate over WhatsApp Gateway</span></div></div></aside><div className="pl-64"><header className="fixed top-0 left-64 right-0 z-40 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 w-full px-margin flex items-center justify-between"><div className="flex items-center gap-space-md"><div className="flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-secondary-container/40"><span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span></span><span className="font-label-sm text-label-sm text-on-secondary-container">WhatsApp API Connected</span></div></div><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-sm"><div className="flex flex-col text-right"><span className="font-label-lg text-label-lg text-on-surface">Aura Wellness Studio & Salon</span><span className="font-body-sm text-body-sm text-on-surface-variant">Front Desk Manager</span></div><img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6PbbzewuogXQPM7GBB0BQfz9iI8xs02VHnkoEsJljiNIx2YmR3VGO6yziNIq3T2uH_47TLKxYBIJxztOhJ1VxirZHFnGFgORpN12PkvMp4SX8Y1-J6VqHBmOMALQQ9sXvNCGqWRKiFgrQ8NcwL1Z12GCj7st_VCgxD3mwF82YJATfz3MHBdp5wT1wBQi7fRE8VdcDrBN87YP43AwXG_3V-BbNCMUGBkSV0lhHUAU2Cnv5oVKJ5jwNVg"/></div></div></div></header><main className="w-full pt-16 bg-surface min-h-screen px-margin"><div className="flex flex-col w-full pb-margin">
<script>
    // Ensure Services link in sidebar is highlighted appropriately
    (function highlightActiveNav() {
      const navLinks = document.querySelectorAll('aside nav a');
      navLinks.forEach(link => {
        if (link.getAttribute('data-path') === 'services') {
          link.className = "flex items-center gap-space-sm px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm transition-all";
          const icon = link.querySelector('.material-symbols-outlined');
          if (icon) icon.className = "material-symbols-outlined text-white";
        } else {
          link.className = "flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-lg text-label-lg transition-colors";
          const icon = link.querySelector('.material-symbols-outlined');
          if (icon) icon.className = "material-symbols-outlined text-primary";
        }
      });
    })();
  </script>
{/*  Top Action & Title Bar  */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md mb-space-lg pt-space-md">
<div className="flex flex-col">
<div className="flex items-center gap-space-sm mb-space-xs">
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Manage Services</h1>
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm">
<span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
          Sync status: Live
        </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
        Configure treatments, durations, and pricing synced directly to your WhatsApp instant booking catalog.
      </p>
</div>
<div className="flex items-center gap-space-sm">
<a className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary font-label-lg text-label-lg shadow-sm transition-colors" href="#">
<span>Preview WhatsApp Catalog</span>
<span className="material-symbols-outlined text-sm">open_in_new</span>
</a>
<button className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg shadow-sm hover:opacity-95 active:scale-[0.99] transition-all" id="quick-add-btn">
<span className="material-symbols-outlined text-base">add</span>
<span>+ Add New Service</span>
</button>
</div>
</div>
{/*  Summary Metric Strip  */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-space-md mb-space-lg">
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Configured Services</span>
<span className="font-headline-md text-headline-md text-on-surface mt-0.5">5 Items</span>
</div>
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-xl">spa</span>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Live On WhatsApp</span>
<span className="font-headline-md text-headline-md text-secondary mt-0.5">4 Active</span>
</div>
<div className="w-10 h-10 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-xl">chat_bubble</span>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Weekly Dispatches</span>
<span className="font-headline-md text-headline-md text-on-surface mt-0.5">43 Booked</span>
</div>
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-xl">trending_up</span>
</div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Treatment Time</span>
<span className="font-headline-md text-headline-md text-on-surface mt-0.5">60 Mins</span>
</div>
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-xl">schedule</span>
</div>
</div>
</div>
{/*  Main 2-Column Responsive Workspace  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
{/*  LEFT COLUMN: Service List (7 cols ~ 58%)  */}
<div className="lg:col-span-7 flex flex-col gap-space-md">
{/*  Filters & Search Toolbar  */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div className="relative flex-1 max-w-sm">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">search</span>
<input className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20" id="serviceSearch" placeholder="Search treatment or package..." type="text"/>
</div>
<div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
<button className="filter-pill active px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm whitespace-nowrap">All (5)</button>
<button className="filter-pill px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm whitespace-nowrap transition-colors">Facials & Skin</button>
<button className="filter-pill px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm whitespace-nowrap transition-colors">Body Therapy</button>
<button className="filter-pill px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm whitespace-nowrap transition-colors">Hair</button>
</div>
</div>
{/*  Service Cards Stack  */}
<div className="flex flex-col gap-space-sm" id="servicesList">
{/*  Service Card 1  */}
<div className="service-item bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pl-space-xs">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-xl bg-primary-fixed/40 flex-shrink-0 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-2xl">water_drop</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="font-headline-sm text-headline-sm text-on-surface">HydraFacial Glow Treatment</span>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">Popular</span>
</div>
<div className="flex items-center gap-3 mt-1 font-body-sm text-body-sm text-on-surface-variant">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm">schedule</span>
                    45 mins
                  </span>
<span>•</span>
<span>Facial & Skin</span>
<span>•</span>
<span className="text-secondary font-label-sm text-label-sm">18 bookings this week</span>
</div>
</div>
</div>
<div className="flex items-center justify-between sm:justify-end gap-space-lg pt-2 sm:pt-0">
<span className="font-headline-sm text-headline-sm text-on-surface tabular-nums">₹2,000</span>
<div className="flex items-center gap-space-sm">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
<span className="ml-2 font-label-sm text-label-sm text-secondary peer-checked:block">Active</span>
</label>
<div className="flex items-center gap-1 text-on-surface-variant ml-1">
<button className="p-1.5 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant hover:text-primary" title="Edit Service">
<span className="material-symbols-outlined text-lg">edit</span>
</button>
<button className="p-1.5 hover:bg-error-container/50 rounded-lg transition-colors text-on-surface-variant hover:text-error" title="Delete">
<span className="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
</div>
</div>
{/*  Service Card 2  */}
<div className="service-item bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pl-space-xs">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-xl bg-surface-container-high flex-shrink-0 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-2xl">self_improvement</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Deep Tissue Massage</span>
<div className="flex items-center gap-3 mt-1 font-body-sm text-body-sm text-on-surface-variant">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm">schedule</span>
                    60 mins
                  </span>
<span>•</span>
<span>Body Therapy</span>
<span>•</span>
<span className="text-secondary font-label-sm text-label-sm">12 bookings this week</span>
</div>
</div>
</div>
<div className="flex items-center justify-between sm:justify-end gap-space-lg pt-2 sm:pt-0">
<span className="font-headline-sm text-headline-sm text-on-surface tabular-nums">₹1,500</span>
<div className="flex items-center gap-space-sm">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
<span className="ml-2 font-label-sm text-label-sm text-secondary peer-checked:block">Active</span>
</label>
<div className="flex items-center gap-1 text-on-surface-variant ml-1">
<button className="p-1.5 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant hover:text-primary" title="Edit Service">
<span className="material-symbols-outlined text-lg">edit</span>
</button>
<button className="p-1.5 hover:bg-error-container/50 rounded-lg transition-colors text-on-surface-variant hover:text-error" title="Delete">
<span className="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
</div>
</div>
{/*  Service Card 3  */}
<div className="service-item bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pl-space-xs">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-xl bg-surface-container-high flex-shrink-0 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-2xl">content_cut</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Keratin Hair Spa & Cut</span>
<div className="flex items-center gap-3 mt-1 font-body-sm text-body-sm text-on-surface-variant">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm">schedule</span>
                    75 mins
                  </span>
<span>•</span>
<span>Hair Styling</span>
<span>•</span>
<span className="text-secondary font-label-sm text-label-sm">8 bookings this week</span>
</div>
</div>
</div>
<div className="flex items-center justify-between sm:justify-end gap-space-lg pt-2 sm:pt-0">
<span className="font-headline-sm text-headline-sm text-on-surface tabular-nums">₹4,800</span>
<div className="flex items-center gap-space-sm">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
<span className="ml-2 font-label-sm text-label-sm text-secondary peer-checked:block">Active</span>
</label>
<div className="flex items-center gap-1 text-on-surface-variant ml-1">
<button className="p-1.5 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant hover:text-primary" title="Edit Service">
<span className="material-symbols-outlined text-lg">edit</span>
</button>
<button className="p-1.5 hover:bg-error-container/50 rounded-lg transition-colors text-on-surface-variant hover:text-error" title="Delete">
<span className="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
</div>
</div>
{/*  Service Card 4  */}
<div className="service-item bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pl-space-xs">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-xl bg-surface-container-high flex-shrink-0 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-2xl">hot_tub</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Swedish Full Body Massage</span>
<div className="flex items-center gap-3 mt-1 font-body-sm text-body-sm text-on-surface-variant">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm">schedule</span>
                    60 mins
                  </span>
<span>•</span>
<span>Body Therapy</span>
<span>•</span>
<span className="text-secondary font-label-sm text-label-sm">5 bookings this week</span>
</div>
</div>
</div>
<div className="flex items-center justify-between sm:justify-end gap-space-lg pt-2 sm:pt-0">
<span className="font-headline-sm text-headline-sm text-on-surface tabular-nums">₹2,200</span>
<div className="flex items-center gap-space-sm">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
<span className="ml-2 font-label-sm text-label-sm text-secondary peer-checked:block">Active</span>
</label>
<div className="flex items-center gap-1 text-on-surface-variant ml-1">
<button className="p-1.5 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant hover:text-primary" title="Edit Service">
<span className="material-symbols-outlined text-lg">edit</span>
</button>
<button className="p-1.5 hover:bg-error-container/50 rounded-lg transition-colors text-on-surface-variant hover:text-error" title="Delete">
<span className="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
</div>
</div>
{/*  Service Card 5 (Paused)  */}
<div className="service-item bg-surface-container-lowest/80 rounded-xl p-space-md shadow-sm hover:shadow-md transition-all relative overflow-hidden group opacity-85">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-outline-variant"></div>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pl-space-xs">
<div className="flex items-start gap-space-md">
<div className="w-12 h-12 rounded-xl bg-surface-container flex-shrink-0 flex items-center justify-center text-outline">
<span className="material-symbols-outlined text-2xl">diamond</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-on-surface">Bridal Makeup & Skin Prep (VIP)</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">Seasonal</span>
</div>
<div className="flex items-center gap-3 mt-1 font-body-sm text-body-sm text-on-surface-variant">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm">schedule</span>
                    120 mins
                  </span>
<span>•</span>
<span>Bridal & Event</span>
<span>•</span>
<span className="text-outline font-label-sm text-label-sm">Paused</span>
</div>
</div>
</div>
<div className="flex items-center justify-between sm:justify-end gap-space-lg pt-2 sm:pt-0">
<span className="font-headline-sm text-headline-sm text-on-surface tabular-nums">₹6,000</span>
<div className="flex items-center gap-space-sm">
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox"/>
<div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
<span className="ml-2 font-label-sm text-label-sm text-outline">Paused</span>
</label>
<div className="flex items-center gap-1 text-on-surface-variant ml-1">
<button className="p-1.5 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant hover:text-primary" title="Edit Service">
<span className="material-symbols-outlined text-lg">edit</span>
</button>
<button className="p-1.5 hover:bg-error-container/50 rounded-lg transition-colors text-on-surface-variant hover:text-error" title="Delete">
<span className="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
</div>
</div>
</div>
{/*  Bulk Sync Alert Banner  */}
<div className="bg-surface-container-high rounded-xl p-space-md flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-xl">cloud_sync</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">Auto-sync with WhatsApp Business Catalog</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Last synchronized automatically 4 minutes ago.</span>
</div>
</div>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm hover:bg-white transition-all whitespace-nowrap">
          Force Resync
        </button>
</div>
</div>
{/*  RIGHT COLUMN: Add/Edit Service Panel (5 cols ~ 42%)  */}
<div className="lg:col-span-5 sticky top-24">
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
{/*  Header  */}
<div className="flex items-center justify-between pb-space-sm mb-space-md">
<div className="flex flex-col">
<h2 className="font-headline-md text-headline-md text-on-surface" id="panelTitle">Add New Service</h2>
<span className="font-body-sm text-body-sm text-on-surface-variant">Changes update your WhatsApp catalog immediately</span>
</div>
<span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-lg">add_circle</span>
</span>
</div>
<form className="flex flex-col gap-space-md" id="serviceForm" onsubmit="event.preventDefault();">
{/*  Service Name  */}
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface" htmlFor="serviceName">Service Name</label>
<input className="w-full h-10 px-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20" id="serviceName" placeholder="e.g., Aromatherapy Relaxation Massage" type="text" value="Aromatherapy Relaxation Massage"/>
</div>
{/*  Category  */}
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface" htmlFor="serviceCategory">Category</label>
<div className="relative">
<select className="w-full h-10 px-3 pr-8 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20" id="serviceCategory">
<option selected="" value="Body Therapy">Body Therapy</option>
<option value="Facials & Skin">Facials & Skin</option>
<option value="Hair Styling">Hair Styling</option>
<option value="Bridal & Event">Bridal & Event</option>
<option value="Wellness Packages">Wellness Packages</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-lg">expand_more</span>
</div>
</div>
{/*  Duration Interactive Selector  */}
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface">Duration</label>
<span className="font-body-sm text-body-sm text-on-surface-variant">Slot time required</span>
</div>
<div className="grid grid-cols-4 gap-2 pt-1">
<button className="duration-btn h-9 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-on-surface-variant transition-all" type="button">15m</button>
<button className="duration-btn h-9 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-on-surface-variant transition-all" type="button">30m</button>
<button className="duration-btn active h-9 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all" type="button">45m</button>
<button className="duration-btn h-9 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-on-surface-variant transition-all" type="button">60m+</button>
</div>
</div>
{/*  Price Input with Symbol  */}
<div className="flex flex-col gap-1">
<label className="font-label-md text-label-md text-on-surface" htmlFor="servicePrice">Price (₹)</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 font-headline-sm text-headline-sm text-outline">₹</span>
<input className="w-full h-10 pl-8 pr-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface tabular-nums placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20" id="servicePrice" placeholder="2,500" type="text" value="2,500"/>
</div>
</div>
{/*  Optional Description  */}
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface" htmlFor="serviceDesc">Description <span className="text-on-surface-variant font-normal text-body-sm">(Optional)</span></label>
<span className="font-body-sm text-body-sm text-on-surface-variant">Shown in WhatsApp</span>
</div>
<textarea className="w-full p-2.5 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline resize-none focus:outline-none focus:ring-2 focus:ring-primary/20" id="serviceDesc" placeholder="Brief description visible to clients during WhatsApp booking..." rows="2">Full body gentle tension relief using organic soothing essential oils.</textarea>
</div>
{/*  Real-Time WhatsApp Message Preview Box  */}
<div className="flex flex-col gap-1.5 pt-1">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
<span className="material-symbols-outlined text-secondary text-sm">smartphone</span>
                WhatsApp Customer View
              </span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">Live Preview</span>
</div>
<div className="p-3.5 rounded-xl bg-[#DCF8C6]/50 shadow-inner flex flex-col gap-1">
<div className="flex items-start justify-between">
<span className="font-label-md text-label-md text-on-surface font-semibold" id="previewTitle">✨ Aromatherapy Relaxation Massage</span>
<span className="font-label-sm text-label-sm text-on-surface-variant tabular-nums ml-2">10:42 AM</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant" id="previewDesc">Full body gentle tension relief using organic soothing essential oils.</p>
<div className="flex items-center gap-2 mt-1 font-label-sm text-label-sm text-primary-container font-semibold">
<span id="previewPrice">₹2,500</span>
<span>•</span>
<span id="previewDuration">45 mins</span>
<span className="material-symbols-outlined text-sm text-secondary ml-auto">done_all</span>
</div>
</div>
</div>
{/*  Buttons  */}
<div className="flex flex-col gap-2 pt-2">
<button className="w-full h-10 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2" id="saveServiceBtn" type="button">
<span className="material-symbols-outlined text-base">check</span>
<span>Save & Sync Service</span>
</button>
<button className="w-full h-9 rounded-lg hover:bg-surface-container text-on-surface-variant font-label-md text-label-md transition-colors text-center" id="resetFormBtn" type="button">
              Clear / Cancel
            </button>
</div>
</form>
</div>
</div>
</div>
<script>
    // Live update of WhatsApp preview
    const nameInput = document.getElementById('serviceName');
    const priceInput = document.getElementById('servicePrice');
    const descInput = document.getElementById('serviceDesc');
    
    const previewTitle = document.getElementById('previewTitle');
    const previewPrice = document.getElementById('previewPrice');
    const previewDesc = document.getElementById('previewDesc');
    const previewDuration = document.getElementById('previewDuration');

    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        previewTitle.textContent = '✨ ' + (e.target.value.trim() || 'Custom Treatment');
      });
    }

    if (priceInput) {
      priceInput.addEventListener('input', (e) => {
        previewPrice.textContent = '₹' + (e.target.value.trim() || '0');
      });
    }

    if (descInput) {
      descInput.addEventListener('input', (e) => {
        previewDesc.textContent = e.target.value.trim() || 'No description provided';
      });
    }

    // Duration pills selector
    const durationBtns = document.querySelectorAll('.duration-btn');
    durationBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        durationBtns.forEach(b => {
          b.className = "duration-btn h-9 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-on-surface-variant transition-all";
        });
        btn.className = "duration-btn active h-9 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all";
        previewDuration.textContent = btn.textContent.replace('+', '') + ' mins';
      });
    });

    // Quick Add Button focus
    const quickAddBtn = document.getElementById('quick-add-btn');
    if (quickAddBtn && nameInput) {
      quickAddBtn.addEventListener('click', () => {
        nameInput.focus();
        nameInput.select();
      });
    }

    // Simple search filter simulation
    const searchInput = document.getElementById('serviceSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.service-item');
        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(query) ? 'block' : 'none';
        });
      });
    }

    // Save notification toast feedback
    const saveBtn = document.getElementById('saveServiceBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<span className="material-symbols-outlined text-base">done_all</span><span>Synced to WhatsApp!</span>';
        saveBtn.classList.remove('bg-primary-container');
        saveBtn.classList.add('bg-secondary');
        setTimeout(() => {
          saveBtn.innerHTML = originalText;
          saveBtn.classList.remove('bg-secondary');
          saveBtn.classList.add('bg-primary-container');
        }, 2200);
      });
    }
  </script>
</div></main></div>
</>