import Icon from '@/components/ui/icon';
import { events, clubs, categoryColors, categoryLabels } from '@/data/mockData';

type Page = 'home' | 'events' | 'clubs' | 'calendar' | 'create';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const upcomingEvents = events.slice(0, 3);
  const featuredClubs = clubs.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative bg-primary rounded-xl overflow-hidden px-8 py-12 md:px-14 md:py-16">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 text-primary-foreground/80 text-xs px-3 py-1.5 rounded-full mb-4 font-body">
            <Icon name="Sparkles" size={12} />
            Добро пожаловать на портал
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white font-semibold leading-tight mb-4 animate-fade-in">
            Единое пространство<br />для учёбы и развития
          </h1>
          <p className="text-primary-foreground/75 text-base md:text-lg font-body mb-8 animate-fade-in delay-100">
            Записывайтесь на мероприятия, вступайте в кружки по интересам и управляйте своим расписанием в одном месте.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-in delay-200">
            <button
              onClick={() => onNavigate('events')}
              className="bg-accent text-accent-foreground px-5 py-2.5 rounded font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Смотреть афишу
            </button>
            <button
              onClick={() => onNavigate('clubs')}
              className="bg-white/15 text-white px-5 py-2.5 rounded font-medium text-sm hover:bg-white/25 transition-colors"
            >
              Каталог кружков
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in delay-300">
        {[
          { value: '6', label: 'Кружков', icon: 'BookOpen' },
          { value: '6', label: 'Событий в мае', icon: 'CalendarDays' },
          { value: '113', label: 'Участников', icon: 'Users' },
          { value: '5', label: 'Направлений', icon: 'Layers' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-5 text-center">
            <div className="w-9 h-9 bg-primary/8 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name={stat.icon} size={18} className="text-primary" />
            </div>
            <div className="font-display text-3xl font-semibold text-primary">{stat.value}</div>
            <div className="text-muted-foreground text-xs mt-0.5 font-body">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl font-semibold text-foreground">Ближайшие события</h2>
          <button
            onClick={() => onNavigate('events')}
            className="text-sm text-primary hover:underline flex items-center gap-1 font-medium"
          >
            Все события <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {upcomingEvents.map((event, i) => (
            <div
              key={event.id}
              className={`bg-card border border-border rounded-lg overflow-hidden card-hover cursor-pointer animate-fade-in delay-${(i + 1) * 100}`}
            >
              <div className="h-1 bg-primary" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[event.category]}`}>
                    {categoryLabels[event.category]}
                  </span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{event.time}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-2">
                  {event.title}
                </h3>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={12} />
                    {new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} />
                    {event.location}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {event.enrolled} / {event.maxParticipants} мест
                  </div>
                  <div className="w-24 bg-secondary rounded-full h-1.5">
                    <div
                      className="bg-accent h-1.5 rounded-full"
                      style={{ width: `${Math.min((event.enrolled / event.maxParticipants) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Clubs */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl font-semibold text-foreground">Популярные кружки</h2>
          <button
            onClick={() => onNavigate('clubs')}
            className="text-sm text-primary hover:underline flex items-center gap-1 font-medium"
          >
            Все кружки <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {featuredClubs.map((club, i) => (
            <div
              key={club.id}
              className={`bg-card border border-border rounded-lg p-5 card-hover cursor-pointer accent-border animate-fade-in delay-${(i + 1) * 100}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[club.category]}`}>
                  {categoryLabels[club.category]}
                </span>
                <span className="text-xs text-muted-foreground">{club.participants}/{club.maxParticipants}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-1">
                {club.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{club.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                {club.schedule}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Create */}
      <section className="bg-secondary border border-border rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-1">Хотите создать кружок или событие?</h2>
          <p className="text-muted-foreground text-sm">Предложите свою инициативу — заполните форму, и мы рассмотрим заявку.</p>
        </div>
        <button
          onClick={() => onNavigate('create')}
          className="bg-primary text-primary-foreground px-6 py-3 rounded font-medium text-sm whitespace-nowrap hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0"
        >
          <Icon name="PlusCircle" size={16} />
          Создать
        </button>
      </section>
    </div>
  );
}
