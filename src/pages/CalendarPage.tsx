import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { calendarEntries, categoryColors, categoryLabels } from '@/data/mockData';

const DAYS_OF_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
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
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
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
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-3xl font-semibold text-foreground mb-1">Личный календарь</h1>
        <p className="text-muted-foreground text-sm">Ваши записи на события и занятия кружков</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar widget */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 animate-fade-in delay-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-semibold text-foreground">
              {MONTHS[viewMonth]} {viewYear}
            </h2>
            <div className="flex gap-1">
              <button
                onClick={prevMonth}
                className="p-2 rounded hover:bg-secondary transition-colors"
              >
                <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded hover:bg-secondary transition-colors"
              >
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Day of week headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="text-center text-xs text-muted-foreground font-medium py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const hasEvents = eventsByDate[dateStr];
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

              return (
                <div
                  key={day}
                  className={`relative aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-colors cursor-default ${
                    isToday
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : hasEvents
                      ? 'bg-accent/15 text-foreground hover:bg-accent/25'
                      : 'hover:bg-secondary text-foreground'
                  }`}
                >
                  {day}
                  {hasEvents && !isToday && (
                    <div className="absolute bottom-1 flex gap-0.5">
                      {hasEvents.slice(0, 3).map((e) => (
                        <div
                          key={e.id}
                          className={`w-1 h-1 rounded-full ${
                            e.categoryColor === 'tech' ? 'bg-slate-500' :
                            e.categoryColor === 'art' ? 'bg-purple-500' :
                            e.categoryColor === 'science' ? 'bg-blue-500' :
                            e.categoryColor === 'culture' ? 'bg-amber-500' : 'bg-green-500'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {hasEvents && isToday && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-accent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: upcoming entries */}
        <div className="space-y-4 animate-fade-in delay-200">
          <h3 className="font-display text-lg font-semibold text-foreground">Мои записи</h3>
          {sortedEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-card border border-border rounded-lg p-4 accent-border"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon
                      name={entry.type === 'event' ? 'CalendarDays' : 'BookOpen'}
                      size={12}
                      className="text-muted-foreground"
                    />
                    <span className="text-xs text-muted-foreground capitalize">
                      {entry.type === 'event' ? 'Мероприятие' : 'Кружок'}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground leading-snug">{entry.title}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="Calendar" size={11} />
                      {new Date(entry.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="Clock" size={11} />
                      {entry.time}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleReminder(entry.id)}
                  className={`p-1.5 rounded transition-colors ${
                    reminders.has(entry.id)
                      ? 'text-accent bg-accent/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                  title={reminders.has(entry.id) ? 'Напоминание включено' : 'Включить напоминание'}
                >
                  <Icon name={reminders.has(entry.id) ? 'BellRing' : 'BellOff'} size={14} />
                </button>
              </div>
            </div>
          ))}

          {sortedEntries.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="CalendarCheck" size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">Записей пока нет</p>
            </div>
          )}

          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Bell" size={14} className="text-accent" />
              <span className="text-xs font-semibold text-foreground">Система напоминаний</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Включите напоминание — и вы получите уведомление за 24 часа до начала события или занятия.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
