import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { events, categoryLabels, type EventCategory } from '@/data/mockData';

const allCategories: EventCategory[] = ['science', 'art', 'sport', 'culture', 'tech'];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [enrolled, setEnrolled] = useState<Set<number>>(new Set());

  const filtered = events.filter((e) => {
    const matchCat = selectedCategory === 'all' || e.category === selectedCategory;
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
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
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">Афиша мероприятий</h1>
        <p className="text-sm text-muted-foreground">Предстоящие события, лекции и конкурсы</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in delay-100">
        <div className="relative max-w-xs">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-border rounded bg-white focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded text-xs transition-colors ${
              selectedCategory === 'all'
                ? 'bg-foreground text-background'
                : 'border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Все
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                selectedCategory === cat
                  ? 'bg-foreground text-background'
                  : 'border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Events list */}
      <div className="divide-y divide-border border-t border-b border-border animate-fade-in delay-200">
        {filtered.map((event) => (
          <div key={event.id} className="py-5 flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Date */}
            <div className="w-14 shrink-0 text-center sm:pt-0.5">
              <div className="text-2xl font-semibold leading-none text-foreground">
                {new Date(event.date).getDate()}
              </div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-0.5">
                {new Date(event.date).toLocaleDateString('ru-RU', { month: 'short' })}
              </div>
            </div>

            <div className="w-px bg-border self-stretch hidden sm:block shrink-0" />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">{categoryLabels[event.category]}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground leading-snug mb-1.5">{event.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{event.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="Clock" size={11} /> {event.time}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="MapPin" size={11} /> {event.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="Users" size={11} /> {event.enrolled} / {event.maxParticipants}
                </span>
              </div>
            </div>

            {/* Action */}
            <div className="shrink-0">
              <button
                onClick={() => handleEnroll(event.id)}
                className={`px-4 py-1.5 rounded text-xs font-medium transition-colors ${
                  enrolled.has(event.id)
                    ? 'border border-border text-muted-foreground hover:border-destructive hover:text-destructive'
                    : 'bg-foreground text-background hover:opacity-80'
                }`}
              >
                {enrolled.has(event.id) ? 'Записан' : 'Записаться'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground animate-fade-in">
          <p className="text-sm">Ничего не найдено</p>
        </div>
      )}
    </div>
  );
}
