import Navbar from "../layout/Navbar";
import UserNavBar from "../layout/UserNavBar";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "react-day-picker/locale";
import { useEffect, useState } from "react";
import { isSameDay, parseLocalDate } from "@/lib/utils";
import axios from "axios";

function Meetings() {
  const [date, setDate] = useState(new Date());
  const [googleEvents, setGoogleEvents] = useState([]);

  const token = localStorage.getItem("jwt");

  const events = googleEvents.map((event) => {
    const isAllDay = !!event.start.date;

    const start = isAllDay
      ? parseLocalDate(event.start.date)
      : new Date(event.start.dateTime);

    const end = isAllDay
      ? parseLocalDate(event.end.date)
      : new Date(event.end.dateTime);

    return {
      id: event.id,
      title: event.summary ?? "Sem título",
      start,
      end,
      allDay: isAllDay,
      location: event.location ?? null,
    };
  });

  const eventsOfDay = events.filter((event) => isSameDay(event.start, date));

  const daysWithEvents = events.map((event) => event.start);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/${import.meta.env.VITE_GOOGLE_ID_CALENDAR}/events?key=${import.meta.env.VITE_GOOGLE_API_KEY}&singleEvents=true&orderBy=startTime&maxResults=10&timeMin=2025-12-01T00%3A00%3A00Z`
        );

        setGoogleEvents(response.data.items);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex min-h-screen flex-col text-white">
      {token ? <UserNavBar /> : <Navbar />}

      <section className="mt-8 flex flex-1 flex-col pb-4">
        <div className="mx-auto flex size-full max-w-[94.8vw] justify-between">
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
            locale={ptBR}
            modifiers={{
              hasEvent: daysWithEvents,
            }}
            modifiersClassNames={{
              hasEvent:
                "after:absolute after:left-2 after:size-1.5 after:top-2 after:animate-pulse after:rounded-full after:bg-lime-400",
            }}
            className="rounded-sm bg-slate-500/10 text-white shadow-lg backdrop-blur-lg"
          />

          <div className="card w-full max-w-[45vw] rounded-sm bg-slate-500/10 text-white shadow-lg backdrop-blur-lg">
            <div className="p-5">
              <h2 className="text-3xl">Eventos</h2>

              <p className="mb-4 text-sm text-zinc-300">
                {date.toLocaleDateString("pt-BR")}
              </p>

              {eventsOfDay.length === 0 ? (
                <p className="text-zinc-400">Nenhum evento para este dia.</p>
              ) : (
                <ul className="space-y-3">
                  {eventsOfDay.map((event) => (
                    <li
                      key={event.id}
                      className="list-none rounded-md bg-lime-800/50 p-3"
                    >
                      <p className="font-medium">{event.title}</p>

                      {/* 👇 AQUI */}
                      <p className="text-sm text-lime-400">
                        {event.allDay ? (
                          <span className="italic">Dia inteiro</span>
                        ) : (
                          <>
                            {new Date(event.start).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {" - "}
                            {new Date(event.end).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </>
                        )}
                      </p>
                      {event.location && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block text-sm text-blue-400 hover:underline"
                        >
                          📍 {event.location}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Meetings;
