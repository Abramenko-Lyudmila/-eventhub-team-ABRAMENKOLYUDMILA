/**
 * Заготовка фронтенду EventHub.
 *
 * Лабораторна № 1, крок 5: замінити блок-заглушку на <EventList />
 * з features/catalog/EventList.tsx — компонент, який отримує дані
 * через типізований клієнт, згенерований зі специфікації OpenAPI.
 */
import { EventList } from "./features/catalog/EventList";

export function App() {
  return (
    <main className="page">
      <header className="page__header">
        <h1>EventHub</h1>
        <p className="page__subtitle">Квитки на події</p>
      </header>

      <section>
        <h2>Каталог подій</h2>
        <EventList />
      </section>
    </main>
  );
}
