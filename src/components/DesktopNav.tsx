import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

const links = [
  { to: "/", label: "Home" },
  { to: "/store", label: "Store" },
  { to: "/feed", label: "Feed" },
  { to: "/hymns", label: "Hymns" },
  { to: "/events", label: "Events" },
  { to: "/prayer-wall", label: "Prayer Wall" },
  { to: "/about", label: "About" },
];

export default function DesktopNav() {
  const { totalItems } = useCart();
  const { user, isAdmin, isLeadership, signOut, profile } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="hidden md:flex items-center justify-between h-16 px-8 bg-card border-b border-border sticky top-0 z-40">
      <NavLink to="/" className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
          CHG
        </div>
        <span className="font-semibold text-foreground tracking-tight">CHG Church</span>
      </NavLink>
      <nav className="flex items-center gap-1">
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === "/"}
            className={({ isActive }) => cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-colors active:scale-[0.97]",
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}>
            {label}
          </NavLink>
        ))}
        {isAdmin && (
          <NavLink to="/admin" className={({ isActive }) => cn(
            "px-3 py-2 rounded-lg text-sm font-medium transition-colors active:scale-[0.97]",
            isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}>Admin</NavLink>
        )}
        {isLeadership && (
          <NavLink to="/leadership" className={({ isActive }) => cn(
            "px-3 py-2 rounded-lg text-sm font-medium transition-colors active:scale-[0.97]",
            isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}>Leadership</NavLink>
        )}
      </nav>
      <div className="flex items-center gap-3">
        <NavLink to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors active:scale-95">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[11px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </NavLink>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{profile?.full_name || user.email}</span>
            <button onClick={handleSignOut} className="p-2 rounded-lg hover:bg-muted transition-colors active:scale-95" title="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <NavLink to="/login"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:scale-[0.97] transition-all">
            Sign In
          </NavLink>
        )}
      </div>
    </header>
  );
}
