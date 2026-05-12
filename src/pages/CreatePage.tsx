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
      <div className="flex flex-col items-center justify-center py-24 text-center animate-scale-in max-w-sm mx-auto">
        <div className="w-10 h-10 border-2 border-foreground rounded-full flex items-center justify-center mb-5">
          <Icon name="Check" size={18} className="text-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Заявка отправлена</h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Администрация рассмотрит заявку в течение 2–3 рабочих дней и свяжется с вами по email.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ title: '', description: '', category: '', date: '', time: '', location: '', maxParticipants: '', schedule: '', ageGroup: '', contactEmail: '' });
          }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  const inputClass = "w-full px-3 py-2 text-sm border border-border rounded bg-white focus:outline-none focus:ring-1 focus:ring-foreground/20 placeholder:text-muted-foreground";
  const labelClass = "block text-xs font-medium text-foreground mb-1.5";

  return (
    <div className="space-y-8 max-w-xl">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">Создать событие или кружок</h1>
        <p className="text-sm text-muted-foreground">Заполните форму — мы рассмотрим вашу заявку</p>
      </div>

      {/* Type toggle */}
      <div className="flex gap-2 animate-fade-in delay-100">
        {(['event', 'club'] as FormType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFormType(type)}
            className={`flex-1 py-2.5 rounded text-sm font-medium transition-colors ${
              formType === type
                ? 'bg-foreground text-background'
                : 'border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {type === 'event' ? 'Мероприятие' : 'Кружок'}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in delay-200">
        <div>
          <label className={labelClass}>Название *</label>
          <input
            required
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder={formType === 'event' ? 'Открытая лекция по физике' : 'Кружок программирования'}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Описание *</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Подробное описание..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Направление *</label>
            <select
              required
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className={inputClass}
            >
              <option value="">Выберите...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{categoryLabels[cat]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Макс. участников</label>
            <input
              type="number"
              min="1"
              value={form.maxParticipants}
              onChange={(e) => update('maxParticipants', e.target.value)}
              placeholder="30"
              className={inputClass}
            />
          </div>
        </div>

        {formType === 'event' ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Дата *</label>
              <input required type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Время *</label>
              <input required type="time" value={form.time} onChange={(e) => update('time', e.target.value)} className={inputClass} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Расписание *</label>
              <input required value={form.schedule} onChange={(e) => update('schedule', e.target.value)} placeholder="Пн, Ср — 16:00" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Возрастная группа</label>
              <input value={form.ageGroup} onChange={(e) => update('ageGroup', e.target.value)} placeholder="10–16 лет" className={inputClass} />
            </div>
          </div>
        )}

        <div>
          <label className={labelClass}>{formType === 'event' ? 'Место проведения *' : 'Место занятий'}</label>
          <input
            required={formType === 'event'}
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            placeholder="Кабинет 214"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Контактный email *</label>
          <input
            required
            type="email"
            value={form.contactEmail}
            onChange={(e) => update('contactEmail', e.target.value)}
            placeholder="organizer@school.ru"
            className={inputClass}
          />
        </div>

        <div className="border-t border-border pt-4 flex items-start gap-2">
          <Icon name="Info" size={14} className="text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Заявка поступит администратору. Ответ придёт на указанный email в течение 2–3 рабочих дней.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-foreground text-background py-2.5 rounded text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Отправить заявку
        </button>
      </form>
    </div>
  );
}
