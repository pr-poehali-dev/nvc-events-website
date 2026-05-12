import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { calendarEntries } from '@/data/mockData';

const DAYS_OF_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export default function CalendarPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [reminders, setReminders] = useState<Set<number>>(
    new Set(calendarEntries.filter((e) => e.reminder).map((e) => e.id))
  );

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const eventsByDate: Record<string, typeof calendarEntries> = {};
  calendarEntries.forEach((entry) => {
    if (!eventsByDate[entry.date]) eventsByDate[entry.date] = [];
    eventsByDate[entry.date].push(entry);
  });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  const toggleReminder = (id: number) => {
    setReminders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const sortedEntries = [...calendarEntries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">Личный календарь</h1>
        <p className="text-sm text-muted-foreground">Ваши записи на события и занятия кружков</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2 border border-border rounded p-5 animate-fade-in delay-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-foreground">
              {MONTHS[viewMonth]} {viewYear}
            </h2>
            <div className="flex gap-0.5">
              <button onClick={prevMonth} className="p-1.5 rounded hover:bg-secondary transition-colors text-muted-foreground">
                <Icon name="ChevronLeft" size={15} />
              </button>
              <button onClick={nextMonth} className="p-1.5 rounded hover:bg-secondary transition-colors text-muted-foreground">
                <Icon name="ChevronRight" size={15} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="text-center text-[11px] text-muted-foreground py-1.5">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const hasEvents = eventsByDate[dateStr];
              const isToday =
                day === today.getDate() &&
                viewMonth === today.getMonth() &&
                viewYear === today.getFullYear();

              return (
                <div
                  key={day}
                  className={`relative aspect-square flex flex-col items-center justify-center text-sm rounded transition-colors ${
                    isToday
                      ? 'bg-foreground text-background font-semibold'
                      : hasEvents
                      ? 'bg-secondary/60 text-foreground'
                      : 'text-foreground hover:bg-secondary/40'
                  }`}
                >
                  {day}
                  {hasEvents && !isToday && (
                    <div className="absolute bottom-1">
                      <div className="w-1 h-1 rounded-full bg-foreground/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-3 animate-fade-in delay-200">
          <h3 className="text-sm font-semibold text-foreground">Мои записи</h3>

          {sortedEntries.map((entry) => (
            <div key={entry.id} className="border border-border rounded p-3.5 accent-border">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    {entry.type === 'event' ? 'Мероприятие' : 'Кружок'}
                  </p>
                  <p className="text-sm font-medium text-foreground leading-snug">{entry.title}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span>{new Date(entry.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</span>
                    <span>{entry.time}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleReminder(entry.id)}
                  className={`p-1 rounded transition-colors shrink-0 ${
                    reminders.has(entry.id)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title={reminders.has(entry.id) ? 'Напоминание включено' : 'Включить напоминание'}
                >
                  <Icon name={reminders.has(entry.id) ? 'BellRing' : 'BellOff'} size={14} />
                </button>
              </div>
            </div>
          ))}

          <div className="border border-border rounded p-3.5 bg-secondary/30">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Нажмите на колокольчик, чтобы получить напоминание за 24 часа до события.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
