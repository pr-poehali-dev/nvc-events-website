import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { events, categoryColors, categoryLabels, type EventCategory } from '@/data/mockData';

const allCategories: EventCategory[] = ['science', 'art', 'sport', 'culture', 'tech'];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [enrolled, setEnrolled] = useState<Set<number>>(new Set());

  const filtered = events.filter((e) => {
    const matchCat = selectedCategory === 'all' || e.category === selectedCategory;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleEnroll = (id: number) => {
    setEnrolled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-3xl font-semibold text-foreground mb-1">Афиша мероприятий</h1>
        <p className="text-muted-foreground text-sm">Предстоящие события, лекции и конкурсы</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in delay-100">
        <div className="relative flex-1 max-w-sm">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по названию или месту..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Все
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Events grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((event, i) => (
          <div
            key={event.id}
            className={`bg-card border border-border rounded-lg overflow-hidden card-hover animate-fade-in delay-${Math.min(i * 100, 500)}`}
          >
            <div className={`h-1 ${
              event.category === 'science' ? 'bg-blue-500' :
              event.category === 'art' ? 'bg-purple-500' :
              event.category === 'sport' ? 'bg-green-500' :
              event.category === 'culture' ? 'bg-amber-500' : 'bg-slate-500'
            }`} />
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-center shrink-0 min-w-[52px]">
                  <div className="text-xl font-display font-bold leading-none">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide opacity-80 mt-0.5">
                    {new Date(event.date).toLocaleDateString('ru-RU', { month: 'short' })}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[event.category]}`}>
                      {categoryLabels[event.category]}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
                    {event.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{event.description}</p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="MapPin" size={12} />
                  {event.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="User" size={12} />
                  {event.organizer}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Users" size={12} />
                  {event.enrolled} из {event.maxParticipants} записано
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Заполненность</span>
                  <span>{Math.round((event.enrolled / event.maxParticipants) * 100)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div
                    className="bg-accent h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min((event.enrolled / event.maxParticipants) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => handleEnroll(event.id)}
                className={`w-full py-2 rounded text-sm font-medium transition-colors ${
                  enrolled.has(event.id)
                    ? 'bg-secondary text-secondary-foreground hover:bg-destructive/10 hover:text-destructive'
                    : 'bg-primary text-primary-foreground hover:opacity-90'
                }`}
              >
                {enrolled.has(event.id) ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="CheckCircle" size={14} /> Вы записаны
                  </span>
                ) : (
                  'Записаться'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground animate-fade-in">
          <Icon name="CalendarX" size={40} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">Ничего не найдено</p>
          <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
        </div>
      )}
    </div>
  );
}
