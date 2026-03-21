import { Link } from "react-router-dom";
import { ShoppingBag, MessageSquare, Music, Calendar, Heart, Info, ShoppingCart } from "lucide-react";
import { sampleEvents } from "@/lib/store-data";
import { useCart } from "@/lib/cart-context";

const quickLinks = [
  { to: "/store", icon: ShoppingBag, label: "Online Store", desc: "Browse themes & merch", color: "bg-primary/10 text-primary" },
  { to: "/feed", icon: MessageSquare, label: "Feed", desc: "Announcements & updates", color: "bg-accent/15 text-accent-foreground" },
  { to: "/hymns", icon: Music, label: "Hymns & Memos", desc: "Search the hymn book", color: "bg-primary/10 text-primary" },
  { to: "/events", icon: Calendar, label: "Events", desc: "View upcoming events", color: "bg-accent/15 text-accent-foreground" },
  { to: "/prayer-wall", icon: Heart, label: "Prayer Wall", desc: "Share & support prayers", color: "bg-primary/10 text-primary" },
  { to: "/about", icon: Info, label: "About Us", desc: "Our story & leadership", color: "bg-accent/15 text-accent-foreground" },
];

export default function HomePage() {
  const { totalItems } = useCart();
  const nextEvent = sampleEvents.sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Header bar (mobile) */}
      <div className="flex items-center justify-between md:hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            CHG
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-foreground">CHG Church</h1>
            <p className="text-xs text-muted-foreground">Welcome home</p>
          </div>
        </div>
        <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors active:scale-95">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[11px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Welcome Banner */}
      <section className="rounded-2xl bg-primary p-6 md:p-10 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 opacity-10 text-[120px] leading-none select-none pointer-events-none">✝</div>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight" style={{ lineHeight: "1.15" }}>
          Welcome to<br />CHG Church
        </h2>
        <p className="mt-3 text-primary-foreground/80 max-w-md text-sm md:text-base">
          Stay connected with your church community. Browse announcements, shop conference gear, and grow in faith together.
        </p>
        <Link
          to="/feed"
          className="inline-block mt-5 px-5 py-2.5 rounded-lg bg-primary-foreground text-primary text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all"
        >
          Latest Updates
        </Link>
      </section>

      {/* Upcoming Event */}
      {nextEvent && (
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Upcoming Event</p>
          <h3 className="text-base font-semibold text-foreground">{nextEvent.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date(nextEvent.date).toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" })} · {nextEvent.time}
          </p>
          <p className="text-sm text-muted-foreground">{nextEvent.venue}</p>
          <Link to="/events" className="inline-block mt-3 text-sm font-medium text-primary hover:underline">
            View all events →
          </Link>
        </section>
      )}

      {/* Quick Navigation Grid */}
      <section>
        <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-4">Explore</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickLinks.map(({ to, icon: Icon, label, desc, color }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col gap-3 p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/20 active:scale-[0.97] transition-all"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
