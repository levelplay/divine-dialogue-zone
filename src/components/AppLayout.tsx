import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

export default function AppLayout() {
  const location = useLocation();
  const hideNav = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pb-20 md:pb-4">
        <Outlet />
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
