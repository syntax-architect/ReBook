import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between py-margin px-gutter">
      <div className="flex flex-col gap-space-xl">
        <div className="flex items-center gap-space-sm">
          <img
            alt="Rebook Brand Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm-3KhIc3fEcmirBioz2OtSRUYWGPmU-0eOnq97rsZBOf_X-e9SnJfGH8YnWiF5oZ569mLBQMhMosApAeytlqP9bMr_ONO4NuhwapQU2S54CrAH8B5bfHv2regjlZam7IsKrNIgLJhILqRarSNZ3hgxkdsPRzVWyKOo7WXinqWjM_-Z7TuDlBjMY6D5pLh7U2MyXQ-pumRyF7D7sf3ZLyiLBPGQvF6r_TQKY0uGIozxaH_Y1vSenJhzg"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
              Rebook
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              WhatsApp Reminders
            </span>
          </div>
        </div>
        <nav className="flex flex-col gap-space-xs">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-space-sm px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-label-lg rounded-lg'
                : 'flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-lg text-label-lg transition-colors'
            }
          >
            <span className="material-symbols-outlined">calendar_today</span>
            Dashboard
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-space-sm px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-label-lg rounded-lg'
                : 'flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-lg text-label-lg transition-colors'
            }
          >
            <span className="material-symbols-outlined">spa</span>
            Services
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-space-sm px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-label-lg rounded-lg'
                : 'flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-lg text-label-lg transition-colors'
            }
          >
            <span className="material-symbols-outlined">tune</span>
            Settings
          </NavLink>
        </nav>
      </div>
      <div className="flex flex-col gap-space-md">
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-sm">support_agent</span>
            <span className="font-label-sm text-label-sm text-on-surface">Automated Dispatch</span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            99.8% prompt rate over WhatsApp Gateway
          </span>
        </div>
      </div>
    </aside>
  );
}
