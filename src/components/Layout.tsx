import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'events' | 'clubs' | 'calendar' | 'create';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  notificationCount: number;
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'events', label: 'Афиша', icon: 'CalendarDays' },
  { id: 'clubs', label: 'Кружки', icon: 'BookOpen' },
  { id: 'calendar', label: 'Мой календарь', icon: 'CalendarCheck' },
  { id: 'create', label: 'Создать', icon: 'PlusCircle' },
];

export default function Layout({ children, currentPage, onNavigate, notificationCount }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'Лекция «ИИ в образовании» — завтра в 15:00', time: '1 ч назад', read: false },
    { id: 2, text: 'Занятие по робототехнике через 2 дня', time: '3 ч назад', read: false },
    { id: 3, text: 'Весенний концерт — напоминание за 3 дня', time: '5 ч назад', read: true },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
                <Icon name="GraduationCap" size={18} className="text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-semibold tracking-wide hidden sm:block">
                Учебный портал
              </span>
              <span className="font-display text-xl font-semibold tracking-wide sm:hidden">
                Портал
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-white/15 text-white'
                    : 'text-primary-foreground/75 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded hover:bg-white/10 transition-colors"
            >
              <Icon name="Bell" size={20} />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-xl z-50 animate-scale-in">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-sm">Уведомления</h3>
                  <button onClick={() => setNotifOpen(false)}>
                    <Icon name="X" size={16} className="text-muted-foreground" />
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-4 ${n.read ? 'opacity-60' : ''}`}
                    >
                      <div className="flex gap-3 items-start">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-muted-foreground' : 'bg-accent'}`} />
                        <div>
                          <p className="text-sm text-foreground leading-snug">{n.text}</p>
                          <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <button className="text-xs text-primary hover:underline w-full text-center font-medium">
                    Отметить все прочитанными
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary text-primary-foreground border-t border-white/10 animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 w-full px-6 py-3 text-sm font-medium transition-colors ${
                currentPage === item.id ? 'bg-white/15' : 'hover:bg-white/10'
              }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Main */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground/60 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-center text-xs">
          © 2026 Учебный портал. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
