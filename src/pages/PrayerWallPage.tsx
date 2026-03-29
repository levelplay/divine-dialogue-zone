import { useState, useEffect } from "react";
import { Heart, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

type Prayer = {
  id: string;
  content: string;
  author_name: string;
  is_anonymous: boolean;
  support_count: number;
  created_at: string;
  status: string;
};

export default function PrayerWallPage() {
  const { user } = useAuth();
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPrayers = async () => {
    const { data } = await supabase.from("prayer_requests").select("*").order("support_count", { ascending: true });
    if (data) setPrayers(data);
    setLoading(false);
  };

  useEffect(() => { fetchPrayers(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Please sign in to submit a prayer", variant: "destructive" });
      return;
    }
    if (!content.trim()) {
      toast({ title: "Please enter a prayer request", variant: "destructive" });
      return;
    }
    const isAnon = !author.trim();
    const { error } = await supabase.from("prayer_requests").insert({
      user_id: user.id,
      content: content.trim(),
      author_name: author.trim() || "Anonymous",
      is_anonymous: isAnon,
    });
    if (error) {
      toast({ title: "Failed to submit", description: error.message, variant: "destructive" });
    } else {
      setContent("");
      setAuthor("");
      toast({ title: "Prayer submitted 🙏" });
      fetchPrayers();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Prayer Wall</h1>
        <p className="text-sm text-muted-foreground mt-1">Share a prayer request or support others in prayer</p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
        <textarea placeholder="Share your prayer request..." value={content} onChange={(e) => setContent(e.target.value)} rows={3}
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
        <div className="flex gap-2">
          <input type="text" placeholder="Your name (optional)" value={author} onChange={(e) => setAuthor(e.target.value)}
            className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <button type="submit" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.97] transition-all">
            <Send className="w-4 h-4" /> Submit
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {loading ? (
          <p className="text-center text-muted-foreground py-8">Loading prayers...</p>
        ) : prayers.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No prayer requests yet. Be the first to share.</p>
        ) : prayers.map((prayer) => (
          <div key={prayer.id} className="p-4 rounded-xl border border-border bg-card shadow-sm">
            <p className="text-sm text-foreground">{prayer.content}</p>
            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-muted-foreground">
                {prayer.is_anonymous ? "Anonymous" : prayer.author_name} · {new Date(prayer.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Heart className="w-3.5 h-3.5" />
                <span className="tabular-nums">{prayer.support_count}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
