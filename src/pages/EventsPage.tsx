import { sampleEvents } from "@/lib/store-data";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function EventsPage() {
  const sorted = [...sampleEvents].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Events</h1>
        <p className="text-sm text-muted-foreground mt-1">Upcoming church events and gatherings</p>
      </div>

      <div className="space-y-3">
        {sorted.map((event) => {
          const d = new Date(event.date);
          return (
            <article key={event.id} className="p-5 rounded-xl border border-border bg-card shadow-sm">
              <div className="flex gap-4">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                  <span className="text-xs font-semibold text-primary uppercase">{d.toLocaleDateString("en-ZA", { month: "short" })}</span>
                  <span className="text-lg font-bold text-primary leading-none">{d.getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.venue}</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
