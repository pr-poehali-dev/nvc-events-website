import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { clubs, categoryLabels, type EventCategory } from '@/data/mockData';

const allCategories: EventCategory[] = ['science', 'art', 'sport', 'culture', 'tech'];

export default function ClubsPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [joined, setJoined] = useState<Set<number>>(new Set());

  const filtered = clubs.filter((c) => {
    const matchCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleJoin = (id: number) => {
    setJoined((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">Каталог кружков</h1>
        <p className="text-sm text-muted-foreground">Найдите занятие по душе и присоединитесь</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in delay-100">
        <div className="relative max-w-xs">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск кружка..."
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

      {/* Clubs grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 animate-fade-in delay-200">
        {filtered.map((club) => {
          const isFull = club.participants >= club.maxParticipants;
          const fillPercent = Math.round((club.participants / club.maxParticipants) * 100);

          return (
            <div key={club.id} className="border border-border rounded p-5 flex flex-col gap-4 hover:bg-secondary/30 transition-colors">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{categoryLabels[club.category]}</p>
                <h3 className="text-sm font-semibold text-foreground leading-snug mb-2">{club.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{club.description}</p>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Icon name="Clock" size={11} /> {club.schedule}
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="GraduationCap" size={11} /> {club.teacher}
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="Users" size={11} /> {club.ageGroup}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Заполненность</span>
                  <span className={isFull ? 'text-destructive' : ''}>{club.participants} / {club.maxParticipants}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1">
                  <div
                    className={`h-1 rounded-full ${isFull ? 'bg-destructive' : 'bg-foreground'}`}
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => !isFull && handleJoin(club.id)}
                disabled={isFull && !joined.has(club.id)}
                className={`w-full py-2 rounded text-xs font-medium transition-colors ${
                  isFull && !joined.has(club.id)
                    ? 'border border-border text-muted-foreground cursor-default'
                    : joined.has(club.id)
                    ? 'border border-border text-muted-foreground hover:border-destructive hover:text-destructive'
                    : 'bg-foreground text-background hover:opacity-80'
                }`}
              >
                {isFull && !joined.has(club.id) ? 'Мест нет' : joined.has(club.id) ? 'Вы вступили' : 'Вступить'}
              </button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground animate-fade-in">
          <p className="text-sm">Кружков не найдено</p>
        </div>
      )}
    </div>
  );
}
