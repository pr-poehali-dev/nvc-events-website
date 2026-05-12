import Icon from '@/components/ui/icon';
import { events, clubs, categoryLabels } from '@/data/mockData';

type Page = 'home' | 'events' | 'clubs' | 'calendar' | 'create';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const upcomingEvents = events.slice(0, 3);
  const featuredClubs = clubs.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="pt-6 animate-fade-in">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
          Образовательный портал
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground leading-tight tracking-tight max-w-xl mb-5">
          Единое пространство для учёбы и развития
        </h1>
        <p className="text-muted-foreground text-base max-w-lg mb-8 leading-relaxed">
          Записывайтесь на мероприятия, вступайте в кружки по интересам и управляйте своим расписанием.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('events')}
            className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Смотреть афишу
          </button>
          <button
            onClick={() => onNavigate('clubs')}
            className="border border-border text-foreground px-4 py-2 rounded text-sm font-medium hover:bg-secondary transition-colors"
          >
            Каталог кружков
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border animate-fade-in delay-100">
        {[
          { value: '6', label: 'Кружков' },
          { value: '6', label: 'Событий в мае' },
          { value: '113', label: 'Участников' },
          { value: '5', label: 'Направлений' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white px-6 py-5">
            <div className="text-3xl font-semibold tracking-tight text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Upcoming Events */}
      <section className="animate-fade-in delay-200">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-foreground">Ближайшие события</h2>
          <button
            onClick={() => onNavigate('events')}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Все <Icon name="ArrowRight" size={12} />
          </button>
        </div>
        <div className="divide-y divide-border border-t border-b border-border">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="py-4 flex items-center gap-4 hover:bg-secondary/40 -mx-1 px-1 transition-colors cursor-default rounded">
              <div className="w-10 text-center shrink-0">
                <div className="text-xl font-semibold leading-none text-foreground">
                  {new Date(event.date).getDate()}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">
                  {new Date(event.date).toLocaleDateString('ru-RU', { month: 'short' })}
                </div>
              </div>
              <div className="w-px h-8 bg-border shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{event.location} · {event.time}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
                {categoryLabels[event.category]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Clubs */}
      <section className="animate-fade-in delay-300">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-foreground">Популярные кружки</h2>
          <button
            onClick={() => onNavigate('clubs')}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Все <Icon name="ArrowRight" size={12} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredClubs.map((club) => (
            <div key={club.id} className="border-t-2 border-foreground pt-4 cursor-default">
              <p className="text-xs text-muted-foreground mb-1.5">{categoryLabels[club.category]}</p>
              <h3 className="text-sm font-semibold text-foreground leading-snug mb-2">{club.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{club.description}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon name="Clock" size={11} />
                {club.schedule}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border border-border rounded p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in delay-400">
        <div>
          <h2 className="text-base font-semibold text-foreground mb-1">Хотите создать кружок или событие?</h2>
          <p className="text-sm text-muted-foreground">Заполните заявку — администрация рассмотрит её в течение 2–3 дней.</p>
        </div>
        <button
          onClick={() => onNavigate('create')}
          className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
        >
          Создать
        </button>
      </section>
    </div>
  );
}
