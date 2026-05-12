import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'events' | 'clubs' | 'calendar' | 'create';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  notificationCount: number;
}

const navItems: { id: Page; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'events', label: 'Афиша' },
  { id: 'clubs', label: 'Кружки' },
  { id: 'calendar', label: 'Мой календарь' },
  { id: 'create', label: 'Создать' },
];

const notifications = [
  { id: 1, text: 'Лекция «ИИ в образовании» — завтра в 15:00', time: '1 ч назад', read: false },
  { id: 2, text: 'Занятие по робототехнике через 2 дня', time: '3 ч назад', read: false },
  { id: 3, text: 'Весенний концерт — напоминание за 3 дня', time: '5 ч назад', read: true },
];

export default function Layout({ children, currentPage, onNavigate, notificationCount }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-sm font-semibold tracking-tight text-foreground shrink-0"
          >
            Учебный портал
          </button>

          <nav className="hidden md:flex items-center gap-0.5 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  currentPage === item.id
                    ? 'bg-foreground text-background font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <Icon name="Bell" size={17} />
                {notificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-foreground rounded-full" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-1 w-72 bg-white border border-border rounded-lg shadow-lg z-50 animate-scale-in">
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Уведомления</span>
                    <button onClick={() => setNotifOpen(false)} className="text-muted-foreground hover:text-foreground">
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                  <div className="divide-y divide-border">
                    {notifications.map((n) => (
                      <div key={n.id} className={`px-4 py-3 ${n.read ? 'opacity-50' : ''}`}>
                        <div className="flex gap-2.5 items-start">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-border' : 'bg-foreground'}`} />
                          <div>
                            <p className="text-sm leading-snug">{n.text}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t border-border">
                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      Отметить все прочитанными
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              className="md:hidden p-2 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={17} />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-white animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
              className={`flex w-full px-5 py-3 text-sm transition-colors ${
                currentPage === item.id
                  ? 'font-medium text-foreground bg-secondary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <main className="flex-1 max-w-6xl w-full mx-auto px-5 py-10">
        {children}
      </main>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 py-4 text-xs text-muted-foreground">
          © 2026 Учебный портал
        </div>
      </footer>
    </div>
  );
}
