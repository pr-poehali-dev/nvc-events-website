import { useState } from 'react';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import EventsPage from '@/pages/EventsPage';
import ClubsPage from '@/pages/ClubsPage';
import CalendarPage from '@/pages/CalendarPage';
import CreatePage from '@/pages/CreatePage';

type Page = 'home' | 'events' | 'clubs' | 'calendar' | 'create';

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const notificationCount = 2;

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'events': return <EventsPage />;
      case 'clubs': return <ClubsPage />;
      case 'calendar': return <CalendarPage />;
      case 'create': return <CreatePage />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      notificationCount={notificationCount}
    >
      {renderPage()}
    </Layout>
  );
}
