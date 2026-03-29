import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Navigate } from "react-router-dom";
import { Heart, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type PrayerRequest = {
  id: string;
  author_name: string;
  content: string;
  is_anonymous: boolean;
  support_count: number;
  status: string;
  created_at: string;
};

export default function LeadershipDashboard() {
  const { isLeadership, isAdmin, loading: authLoading } = useAuth();
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "acknowledged">("all");

  useEffect(() => {
    if (isLeadership || isAdmin) fetchPrayers();
  }, [isLeadership, isAdmin]);

  const fetchPrayers = async () => {
    const { data } = await supabase.from("prayer_requests").select("*").order("created_at", { ascending: false });
    if (data) setPrayers(data);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("prayer_requests").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `Marked as ${status}` });
      fetchPrayers();
    }
  };

  if (authLoading) return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground">Loading...</div>;
  if (!isLeadership && !isAdmin) return <Navigate to="/" replace />;

  const filtered = filter === "all" ? prayers : prayers.filter((p) => p.status === filter);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Leadership Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage prayer requests and member inquiries</p>
      </div>

      <div className="flex gap-2">
        {(["all", "pending", "acknowledged"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors",
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No prayer requests found.</p>
        ) : filtered.map((prayer) => (
          <div key={prayer.id} className="p-4 rounded-xl border border-border bg-card space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {prayer.is_anonymous ? "Anonymous" : prayer.author_name}
              </span>
              <div className="flex items-center gap-2">
                <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full",
                  prayer.status === "pending" ? "bg-accent/15 text-accent-foreground" : "bg-primary/10 text-primary")}>
                  {prayer.status === "pending" ? <><Clock className="w-3 h-3 inline mr-0.5" />Pending</> : <><CheckCircle className="w-3 h-3 inline mr-0.5" />Acknowledged</>}
                </span>
              </div>
            </div>
            <p className="text-sm text-foreground">{prayer.content}</p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Heart className="w-3 h-3" /> {prayer.support_count} supporters
              </span>
              {prayer.status === "pending" && (
                <button onClick={() => updateStatus(prayer.id, "acknowledged")}
                  className="text-xs font-medium text-primary hover:underline">
                  Mark Acknowledged
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
