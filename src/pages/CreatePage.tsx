import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { categoryLabels, type EventCategory } from '@/data/mockData';

type FormType = 'event' | 'club';

const categories: EventCategory[] = ['science', 'art', 'sport', 'culture', 'tech'];

export default function CreatePage() {
  const [formType, setFormType] = useState<FormType>('event');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '' as EventCategory | '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '',
    schedule: '',
    ageGroup: '',
    contactEmail: '',
  });

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-scale-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Icon name="CheckCircle" size={32} className="text-green-600" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">Заявка отправлена!</h2>
        <p className="text-muted-foreground text-sm max-w-md mb-6">
          Ваша заявка на {formType === 'event' ? 'создание мероприятия' : 'открытие кружка'} принята.
          Администрация рассмотрит её в течение 2–3 рабочих дней и свяжется с вами по указанному email.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ title: '', description: '', category: '', date: '', time: '', location: '', maxParticipants: '', schedule: '', ageGroup: '', contactEmail: '' }); }}
          className="bg-primary text-primary-foreground px-5 py-2 rounded font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Создать ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="animate-fade-in">
        <h1 className="font-display text-3xl font-semibold text-foreground mb-1">Создать событие или кружок</h1>
        <p className="text-muted-foreground text-sm">Заполните форму — мы рассмотрим вашу заявку</p>
      </div>

      {/* Type selector */}
      <div className="flex gap-3 animate-fade-in delay-100">
        {(['event', 'club'] as FormType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFormType(type)}
            className={`flex-1 flex items-center gap-3 p-4 rounded-lg border-2 transition-colors text-left ${
              formType === type
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/40'
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              formType === type ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}>
              <Icon name={type === 'event' ? 'CalendarDays' : 'BookOpen'} size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {type === 'event' ? 'Мероприятие' : 'Кружок'}
              </p>
              <p className="text-xs text-muted-foreground">
                {type === 'event' ? 'Разовое событие' : 'Регулярные занятия'}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-5 animate-fade-in delay-200">
        <div>
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">
            Название *
          </label>
          <input
            required
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder={formType === 'event' ? 'Например: Открытая лекция по физике' : 'Например: Кружок программирования'}
            className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">
            Описание *
          </label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Подробное описание..."
            className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">
              Направление *
            </label>
            <select
              required
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Выберите...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{categoryLabels[cat]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">
              Макс. участников
            </label>
            <input
              type="number"
              min="1"
              value={form.maxParticipants}
              onChange={(e) => update('maxParticipants', e.target.value)}
              placeholder="30"
              className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {formType === 'event' ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">
                Дата *
              </label>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">
                Время *
              </label>
              <input
                required
                type="time"
                value={form.time}
                onChange={(e) => update('time', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">
                Расписание *
              </label>
              <input
                required
                value={form.schedule}
                onChange={(e) => update('schedule', e.target.value)}
                placeholder="Пн, Ср — 16:00–18:00"
                className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">
                Возрастная группа
              </label>
              <input
                value={form.ageGroup}
                onChange={(e) => update('ageGroup', e.target.value)}
                placeholder="10–16 лет"
                className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">
            {formType === 'event' ? 'Место проведения *' : 'Место занятий'}
          </label>
          <input
            required={formType === 'event'}
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            placeholder="Кабинет 214 / Актовый зал"
            className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 block">
            Контактный email *
          </label>
          <input
            required
            type="email"
            value={form.contactEmail}
            onChange={(e) => update('contactEmail', e.target.value)}
            placeholder="organizer@school.ru"
            className="w-full px-3 py-2.5 text-sm border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <Icon name="Info" size={16} className="text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800 leading-relaxed">
            После отправки заявка поступит администратору. Вы получите ответ на указанный email в течение 2–3 рабочих дней.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-3 rounded font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Icon name="Send" size={15} />
          Отправить заявку
        </button>
      </form>
    </div>
  );
}
