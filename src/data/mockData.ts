export type EventCategory = 'science' | 'art' | 'sport' | 'culture' | 'tech';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  organizer: string;
  maxParticipants: number;
  enrolled: number;
}

export interface Club {
  id: number;
  name: string;
  description: string;
  category: EventCategory;
  schedule: string;
  teacher: string;
  ageGroup: string;
  participants: number;
  maxParticipants: number;
}

export interface CalendarEntry {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'event' | 'club';
  reminder: boolean;
  categoryColor: EventCategory;
}

export const categoryLabels: Record<EventCategory, string> = {
  science: 'Наука',
  art: 'Искусство',
  sport: 'Спорт',
  culture: 'Культура',
  tech: 'Технологии',
};

export const categoryColors: Record<EventCategory, string> = {
  science: 'bg-blue-100 text-blue-800',
  art: 'bg-purple-100 text-purple-800',
  sport: 'bg-green-100 text-green-800',
  culture: 'bg-amber-100 text-amber-800',
  tech: 'bg-slate-100 text-slate-800',
};

export const events: Event[] = [
  {
    id: 1,
    title: 'Открытая лекция: Искусственный интеллект в образовании',
    description: 'Профессор Иванов расскажет о применении ИИ в современном образовательном процессе и перспективах развития.',
    date: '2026-05-20',
    time: '15:00',
    location: 'Актовый зал, корп. А',
    category: 'tech',
    organizer: 'Кафедра информатики',
    maxParticipants: 150,
    enrolled: 87,
  },
  {
    id: 2,
    title: 'Весенний концерт хорового ансамбля',
    description: 'Ежегодный весенний концерт с программой из классической и современной хоровой музыки.',
    date: '2026-05-24',
    time: '18:30',
    location: 'Концертный зал',
    category: 'art',
    organizer: 'Музыкальный отдел',
    maxParticipants: 200,
    enrolled: 162,
  },
  {
    id: 3,
    title: 'Олимпиада по математике — финальный тур',
    description: 'Финальный тур школьной олимпиады по математике среди учащихся 8–11 классов.',
    date: '2026-05-28',
    time: '10:00',
    location: 'Кабинет 214',
    category: 'science',
    organizer: 'Математический клуб',
    maxParticipants: 40,
    enrolled: 38,
  },
  {
    id: 4,
    title: 'День открытых дверей',
    description: 'Экскурсии по учреждению, встречи с педагогами, презентация кружков и секций.',
    date: '2026-06-05',
    time: '11:00',
    location: 'Главный вход',
    category: 'culture',
    organizer: 'Администрация',
    maxParticipants: 500,
    enrolled: 124,
  },
  {
    id: 5,
    title: 'Турнир по шахматам',
    description: 'Ежемесячный внутренний турнир по классическим шахматам. Все уровни подготовки.',
    date: '2026-06-10',
    time: '14:00',
    location: 'Читальный зал',
    category: 'sport',
    organizer: 'Шахматный клуб',
    maxParticipants: 32,
    enrolled: 20,
  },
  {
    id: 6,
    title: 'Выставка научных проектов',
    description: 'Ежегодная выставка исследовательских и проектных работ учащихся всех возрастов.',
    date: '2026-06-15',
    time: '09:00',
    location: 'Фойе, корп. Б',
    category: 'science',
    organizer: 'Научное общество',
    maxParticipants: 300,
    enrolled: 0,
  },
];

export const clubs: Club[] = [
  {
    id: 1,
    name: 'Робототехника и электроника',
    description: 'Проектирование и сборка роботов, основы Arduino и программирования микроконтроллеров.',
    category: 'tech',
    schedule: 'Вт, Чт — 16:00–18:00',
    teacher: 'Петров А.В.',
    ageGroup: '12–17 лет',
    participants: 18,
    maxParticipants: 20,
  },
  {
    id: 2,
    name: 'Театральная студия',
    description: 'Сценическая речь, актёрское мастерство, постановка спектаклей. Выступления на школьных праздниках.',
    category: 'art',
    schedule: 'Пн, Ср — 17:00–19:00',
    teacher: 'Смирнова О.К.',
    ageGroup: '10–18 лет',
    participants: 24,
    maxParticipants: 30,
  },
  {
    id: 3,
    name: 'Юный исследователь',
    description: 'Научные эксперименты по физике и химии, подготовка к олимпиадам, исследовательские проекты.',
    category: 'science',
    schedule: 'Пт — 15:00–17:30',
    teacher: 'Козлов Д.М.',
    ageGroup: '13–17 лет',
    participants: 15,
    maxParticipants: 20,
  },
  {
    id: 4,
    name: 'Спортивная секция: Волейбол',
    description: 'Техника игры в волейбол, тактические занятия, участие в соревнованиях районного уровня.',
    category: 'sport',
    schedule: 'Пн, Ср, Пт — 18:00–19:30',
    teacher: 'Новиков С.П.',
    ageGroup: '14–18 лет',
    participants: 16,
    maxParticipants: 18,
  },
  {
    id: 5,
    name: 'Медиастудия и журналистика',
    description: 'Создание школьной газеты и видеоблога, основы фотографии, интервью и текстовая журналистика.',
    category: 'culture',
    schedule: 'Вт, Чт — 17:00–18:30',
    teacher: 'Федотова Е.Л.',
    ageGroup: '11–17 лет',
    participants: 12,
    maxParticipants: 15,
  },
  {
    id: 6,
    name: 'Хоровой ансамбль',
    description: 'Вокальная подготовка, постановка голоса, ансамблевое пение. Концерты и фестивали.',
    category: 'art',
    schedule: 'Пн, Чт — 16:30–18:00',
    teacher: 'Орлова М.С.',
    ageGroup: '10–18 лет',
    participants: 28,
    maxParticipants: 30,
  },
];

export const calendarEntries: CalendarEntry[] = [
  {
    id: 1,
    title: 'Лекция: ИИ в образовании',
    date: '2026-05-20',
    time: '15:00',
    type: 'event',
    reminder: true,
    categoryColor: 'tech',
  },
  {
    id: 2,
    title: 'Занятие: Робототехника',
    date: '2026-05-21',
    time: '16:00',
    type: 'club',
    reminder: true,
    categoryColor: 'tech',
  },
  {
    id: 3,
    title: 'Занятие: Театральная студия',
    date: '2026-05-22',
    time: '17:00',
    type: 'club',
    reminder: false,
    categoryColor: 'art',
  },
  {
    id: 4,
    title: 'Весенний концерт',
    date: '2026-05-24',
    time: '18:30',
    type: 'event',
    reminder: true,
    categoryColor: 'art',
  },
];
