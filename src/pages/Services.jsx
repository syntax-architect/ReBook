import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialServices = [
  {
    id: 1,
    name: "HydraFacial Glow Treatment",
    category: "Facials & Skin",
    duration: "45m",
    price: "2,000",
    bookingsThisWeek: 18,
    status: "active",
    icon: "water_drop",
    bgClass: "bg-primary-fixed/40 text-primary",
    tag: "Popular"
  },
  {
    id: 2,
    name: "Deep Tissue Massage",
    category: "Body Therapy",
    duration: "60m+",
    price: "1,500",
    bookingsThisWeek: 12,
    status: "active",
    icon: "self_improvement",
    bgClass: "bg-surface-container-high text-primary"
  },
  {
    id: 3,
    name: "Keratin Hair Spa & Cut",
    category: "Hair Styling",
    duration: "60m+", // Mocked as 75 in ui, let's use 60m+ category
    price: "4,800",
    bookingsThisWeek: 8,
    status: "active",
    icon: "content_cut",
    bgClass: "bg-surface-container-high text-primary"
  },
  {
    id: 4,
    name: "Swedish Full Body Massage",
    category: "Body Therapy",
    duration: "60m+",
    price: "2,200",
    bookingsThisWeek: 5,
    status: "active",
    icon: "hot_tub",
    bgClass: "bg-surface-container-high text-primary"
  },
  {
    id: 5,
    name: "Bridal Makeup & Skin Prep (VIP)",
    category: "Bridal & Event",
    duration: "60m+", // Mocked 120
    price: "6,000",
    bookingsThisWeek: 0,
    status: "paused",
    icon: "diamond",
    bgClass: "bg-surface-container text-outline",
    tag: "Seasonal"
  }
];

const emptyForm = {
  id: null,
  name: "",
  category: "Body Therapy",
  duration: "45m",
  price: "",
  description: ""
};

export default function Services() {
  const [services, setServices] = useState(initialServices);
  const [filterTab, setFilterTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState(emptyForm);
  const [toast, setToast] = useState({ show: false, message: '', icon: 'check_circle' });

  // Auto-hide toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ ...toast, show: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message, icon = 'check_circle') => {
    setToast({ show: true, message, icon });
  };

  const handleToggleStatus = (id) => {
    setServices(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = s.status === 'active' ? 'paused' : 'active';
        showToast(`Service ${newStatus}`);
        return { ...s, status: newStatus };
      }
      return s;
    }));
  };

  const handleDelete = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
    showToast('Service deleted', 'delete');
    if (formData.id === id) {
      setFormData(emptyForm);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      id: service.id,
      name: service.name,
      category: service.category,
      duration: service.duration,
      price: service.price.replace(/,/g, ''),
      description: service.description || ''
    });
    // Scroll to top mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Service name is required', 'error');
      return;
    }

    const priceFormatted = Number(formData.price).toLocaleString('en-IN');
    
    if (formData.id) {
      // Update
      setServices(prev => prev.map(s => s.id === formData.id ? {
        ...s,
        name: formData.name,
        category: formData.category,
        duration: formData.duration,
        price: priceFormatted,
        description: formData.description
      } : s));
      showToast('Service updated successfully');
    } else {
      // Add
      const newService = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        duration: formData.duration,
        price: priceFormatted,
        bookingsThisWeek: 0,
        status: "active",
        icon: "spa", // generic icon
        bgClass: "bg-primary-container text-primary",
        description: formData.description
      };
      setServices(prev => [...prev, newService]);
      showToast('New service added');
    }
    setFormData(emptyForm);
  };

  const filteredServices = services.filter(s => {
    if (filterTab !== 'All' && s.category !== filterTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!s.name.toLowerCase().includes(q) && !s.category.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const activeCount = services.filter(s => s.status === 'active').length;
  const totalBooked = services.reduce((sum, s) => sum + s.bookingsThisWeek, 0);

  // Derive unique categories for tabs based on current services data, or use static
  const tabs = ['All', 'Facials & Skin', 'Body Therapy', 'Hair Styling', 'Bridal & Event'];

  return (
    <>
      <div className="flex flex-col w-full pb-margin relative">
        
        {/* Top Action & Title Bar */}
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
            <button onClick={() => window.open('https://wa.me/c/your_business_id', '_blank')} className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary font-label-lg text-label-lg shadow-sm transition-colors">
              <span>Preview WhatsApp Catalog</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
            <button onClick={() => setFormData(emptyForm)} className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg shadow-sm hover:opacity-95 active:scale-[0.99] transition-all">
              <span className="material-symbols-outlined text-base">add</span>
              <span>+ Add New Service</span>
            </button>
          </div>
        </div>

        {/* Summary Metric Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md mb-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Configured Services</span>
              <span className="font-headline-md text-headline-md text-on-surface mt-0.5">{services.length} Items</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">spa</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Live On WhatsApp</span>
              <span className="font-headline-md text-headline-md text-secondary mt-0.5">{activeCount} Active</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-xl">chat_bubble</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Weekly Dispatches</span>
              <span className="font-headline-md text-headline-md text-on-surface mt-0.5">{totalBooked} Booked</span>
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

        {/* Main 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          
          {/* LEFT COLUMN: Service List (7 cols ~ 58%) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            
            {/* Filters & Search Toolbar */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div className="relative flex-1 max-w-sm">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">search</span>
                <input 
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20" 
                  placeholder="Search treatment or package..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                {tabs.map(t => (
                  <button 
                    key={t}
                    onClick={() => setFilterTab(t)}
                    className={`filter-pill px-3 py-1 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
                      filterTab === t 
                        ? 'bg-primary-container text-on-primary active font-bold' 
                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {t === 'All' ? `All (${services.length})` : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Cards Stack */}
            <div className="flex flex-col gap-space-sm">
              <AnimatePresence initial={false}>
              {filteredServices.map(service => {
                const isActive = service.status === 'active';
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    key={service.id} 
                    className={`service-item bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all relative overflow-hidden group ${!isActive ? 'opacity-70 bg-surface-container-lowest/80' : ''}`}>
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${isActive ? 'bg-secondary' : 'bg-outline-variant'}`}></div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pl-space-xs">
                      
                      <div className="flex items-start gap-space-md">
                        <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${isActive ? service.bgClass : 'bg-surface-container text-outline'}`}>
                          <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-space-xs flex-wrap">
                            <span className="font-headline-sm text-headline-sm text-on-surface">{service.name}</span>
                            {service.tag && (
                              <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${isActive ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-highest text-on-surface-variant'}`}>{service.tag}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1 font-body-sm text-body-sm text-on-surface-variant">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">schedule</span>
                              {service.duration}
                            </span>
                            <span>•</span>
                            <span>{service.category}</span>
                            <span>•</span>
                            {service.bookingsThisWeek > 0 ? (
                              <span className="text-secondary font-label-sm text-label-sm">{service.bookingsThisWeek} bookings this week</span>
                            ) : (
                              <span className="text-outline font-label-sm text-label-sm">No bookings yet</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-space-lg pt-2 sm:pt-0">
                        <span className="font-headline-sm text-headline-sm text-on-surface tabular-nums">₹{service.price}</span>
                        <div className="flex items-center gap-space-sm">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={isActive} 
                              onChange={() => handleToggleStatus(service.id)} 
                            />
                            <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
                            <span className={`ml-2 font-label-sm text-label-sm ${isActive ? 'text-secondary' : 'text-outline'}`}>
                              {isActive ? 'Active' : 'Paused'}
                            </span>
                          </label>
                          <div className="flex items-center gap-1 text-on-surface-variant ml-1">
                            <button onClick={() => handleEdit(service)} className="p-1.5 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant hover:text-primary" title="Edit Service">
                              <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                            <button onClick={() => handleDelete(service.id)} className="p-1.5 hover:bg-error-container/50 rounded-lg transition-colors text-on-surface-variant hover:text-error" title="Delete">
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              </AnimatePresence>
              {filteredServices.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-on-surface-variant font-label-lg">
                  No services found.
                </motion.div>
              )}
            </div>

            {/* Bulk Sync Alert Banner */}
            <div className="bg-surface-container-high rounded-xl p-space-md flex items-center justify-between gap-space-md mt-2">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-xl">cloud_sync</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface">Auto-sync with WhatsApp Business Catalog</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Last synchronized automatically 4 minutes ago.</span>
                </div>
              </div>
              <button onClick={() => showToast('Forced sync initiated...', 'sync')} className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm hover:bg-white transition-all whitespace-nowrap">
                Force Resync
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Add/Edit Service Panel (5 cols ~ 42%) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30">
              {/* Header */}
              <div className="flex items-center justify-between pb-space-sm mb-space-md">
                <div className="flex flex-col">
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    {formData.id ? 'Edit Service' : 'Add New Service'}
                  </h2>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Changes update your WhatsApp catalog immediately</span>
                </div>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center ${formData.id ? 'bg-secondary-container text-secondary' : 'bg-surface-container text-primary'}`}>
                  <span className="material-symbols-outlined text-lg">{formData.id ? 'edit' : 'add_circle'}</span>
                </span>
              </div>
              
              <form className="flex flex-col gap-space-md" onSubmit={handleFormSubmit}>
                {/* Service Name */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface">Service Name</label>
                  <input 
                    required 
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20" 
                    placeholder="e.g., Aromatherapy Massage" 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                {/* Category */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface">Category</label>
                  <div className="relative">
                    <select 
                      className="w-full h-10 px-3 pr-8 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="Body Therapy">Body Therapy</option>
                      <option value="Facials & Skin">Facials & Skin</option>
                      <option value="Hair Styling">Hair Styling</option>
                      <option value="Bridal & Event">Bridal & Event</option>
                      <option value="Wellness Packages">Wellness Packages</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-lg">expand_more</span>
                  </div>
                </div>

                {/* Duration Interactive Selector */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface">Duration</label>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Slot time required</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {['15m', '30m', '45m', '60m+'].map(dur => (
                      <button 
                        key={dur}
                        type="button" 
                        onClick={() => setFormData({...formData, duration: dur})}
                        className={`h-9 rounded-lg font-label-md text-label-md transition-all ${
                          formData.duration === dur 
                            ? 'bg-primary-container text-on-primary shadow-sm font-bold' 
                            : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Input with Symbol */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface">Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-headline-sm text-headline-sm text-outline">₹</span>
                    <input 
                      required
                      type="number" 
                      className="w-full h-10 pl-8 pr-3 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface tabular-nums placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20" 
                      placeholder="2500" 
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>

                {/* Optional Description */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface">Description <span className="text-on-surface-variant font-normal text-body-sm">(Optional)</span></label>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Shown in WhatsApp</span>
                  </div>
                  <textarea 
                    className="w-full p-2.5 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline resize-none focus:outline-none focus:ring-2 focus:ring-primary/20" 
                    placeholder="Brief description visible to clients during WhatsApp booking..." 
                    rows="2"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>

                {/* Real-Time WhatsApp Message Preview Box */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-secondary text-sm">smartphone</span>
                      WhatsApp Customer View
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold animate-pulse">Live Preview</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#DCF8C6]/50 shadow-inner flex flex-col gap-1">
                    <div className="flex items-start justify-between">
                      <span className="font-label-md text-label-md text-on-surface font-semibold break-words">
                        ✨ {formData.name || 'Service Name'}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant tabular-nums ml-2 shrink-0">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant break-words">
                      {formData.description || 'Description of the service...'}
                    </p>
                    <div className="flex items-center gap-2 mt-1 font-label-sm text-label-sm text-primary-container font-semibold">
                      <span>₹{formData.price ? Number(formData.price).toLocaleString('en-IN') : '0'}</span>
                      <span>•</span>
                      <span>{formData.duration}</span>
                      <span className="material-symbols-outlined text-sm text-secondary ml-auto">done_all</span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <button type="submit" className="w-full h-10 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-base">check</span>
                    <span>{formData.id ? 'Update & Sync Service' : 'Save & Sync Service'}</span>
                  </button>
                  <button type="button" onClick={() => setFormData(emptyForm)} className="w-full h-9 rounded-lg hover:bg-surface-container text-on-surface-variant font-label-md text-label-md transition-colors text-center">
                    Clear / Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Dynamic Toast Notification */}
        <div className={`fixed bottom-6 right-6 transform transition-all duration-300 z-50 flex items-center gap-2 bg-on-surface text-surface px-4 py-3 rounded-xl shadow-xl font-label-md text-label-md ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
          <span className="material-symbols-outlined text-secondary text-lg">{toast.icon}</span>
          <span>{toast.message}</span>
        </div>
      </div>
    </>
  );
}