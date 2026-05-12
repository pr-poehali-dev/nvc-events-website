import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { clubs, categoryColors, categoryLabels, type EventCategory } from '@/data/mockData';

const allCategories: EventCategory[] = ['science', 'art', 'sport', 'culture', 'tech'];

export default function ClubsPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [joined, setJoined] = useState<Set<number>>(new Set());

  const filtered = clubs.filter((c) => {
    const matchCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
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

  const categoryIcons: Record<EventCategory, string> = {
    science: 'FlaskConical',
    art: 'Palette',
    sport: 'Trophy',
    culture: 'Newspaper',
    tech: 'Cpu',
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-3xl font-semibold text-foreground mb-1">Каталог кружков</h1>
        <p className="text-muted-foreground text-sm">Найдите занятие по душе и присоединитесь к сообществу</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in delay-100">
        <div className="relative flex-1 max-w-sm">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск кружка..."
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
            Все направления
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <Icon name={categoryIcons[cat]} size={11} />
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Clubs list */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((club, i) => {
          const isFull = club.participants >= club.maxParticipants;
          const fillPercent = Math.round((club.participants / club.maxParticipants) * 100);

          return (
            <div
              key={club.id}
              className={`bg-card border border-border rounded-lg overflow-hidden card-hover flex flex-col animate-fade-in delay-${Math.min(i * 100, 500)}`}
            >
              <div className="p-6 flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon name={categoryIcons[club.category]} size={18} className="text-primary" />
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[club.category]}`}>
                      {categoryLabels[club.category]}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground leading-snug mt-1">
                      {club.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{club.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    {club.schedule}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="GraduationCap" size={12} />
                    Педагог: {club.teacher}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Users" size={12} />
                    Возраст: {club.ageGroup}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Мест занято</span>
                    <span className={`font-medium ${isFull ? 'text-destructive' : 'text-foreground'}`}>
                      {club.participants} / {club.maxParticipants}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${isFull ? 'bg-destructive' : 'bg-accent'}`}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                {isFull && !joined.has(club.id) ? (
                  <div className="w-full py-2 rounded text-sm font-medium text-center bg-muted text-muted-foreground">
                    Мест нет — список ожидания
                  </div>
                ) : (
                  <button
                    onClick={() => handleJoin(club.id)}
                    className={`w-full py-2 rounded text-sm font-medium transition-colors ${
                      joined.has(club.id)
                        ? 'bg-secondary text-secondary-foreground hover:bg-destructive/10 hover:text-destructive'
                        : 'bg-primary text-primary-foreground hover:opacity-90'
                    }`}
                  >
                    {joined.has(club.id) ? (
                      <span className="flex items-center justify-center gap-2">
                        <Icon name="CheckCircle" size={14} /> Вы в кружке
                      </span>
                    ) : (
                      'Вступить в кружок'
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground animate-fade-in">
          <Icon name="BookOpen" size={40} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">Кружков не найдено</p>
          <p className="text-sm mt-1">Попробуйте изменить фильтры или поисковый запрос</p>
        </div>
      )}
    </div>
  );
}
