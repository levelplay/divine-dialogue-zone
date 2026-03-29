import { NavLink, useNavigate } from "react-router-dom";
import { Home, ShoppingBag, MessageSquare, Music, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-context";

const mainLinks = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/store", icon: ShoppingBag, label: "Store" },
  { to: "/feed", icon: MessageSquare, label: "Feed" },
  { to: "/hymns", icon: Music, label: "Hymns" },
];

export default function BottomNav() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, isLeadership, signOut } = useAuth();
  const navigate = useNavigate();

  const moreLinks = [
    { to: "/about", label: "About" },
    { to: "/events", label: "Events" },
    { to: "/prayer-wall", label: "Prayer Wall" },
    ...(isAdmin ? [{ to: "/admin", label: "Admin" }] : []),
    ...(isLeadership ? [{ to: "/leadership", label: "Leadership" }] : []),
    ...(!user ? [{ to: "/login", label: "Sign In" }] : []),
  ];

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-card border-t border-border shadow-[0_-2px_12px_hsl(0_0%_0%/0.06)] md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {mainLinks.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === "/"}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs transition-colors active:scale-95",
              isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
            )}>
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors active:scale-95">
              <Menu className="w-5 h-5" />
              <span>More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl pb-8">
            <SheetTitle className="sr-only">More navigation options</SheetTitle>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {moreLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} onClick={() => setOpen(false)}
                  className="flex items-center justify-center h-14 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 active:scale-[0.97] transition-all">
                  {label}
                </NavLink>
              ))}
              {user && (
                <button onClick={handleSignOut}
                  className="flex items-center justify-center gap-1.5 h-14 rounded-xl bg-destructive/10 text-destructive font-medium text-sm active:scale-[0.97] transition-all">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
