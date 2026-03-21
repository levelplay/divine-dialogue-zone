import { useState } from "react";
import { samplePrayers, PrayerRequest } from "@/lib/store-data";
import { Heart, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function PrayerWallPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(samplePrayers);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast({ title: "Please enter a prayer request", variant: "destructive" });
      return;
    }
    const newPrayer: PrayerRequest = {
      id: Date.now().toString(),
      content: content.trim(),
      author: author.trim() || "Anonymous",
      date: new Date().toISOString().slice(0, 10),
      supportCount: 0,
    };
    setPrayers([newPrayer, ...prayers]);
    setContent("");
    setAuthor("");
    toast({ title: "Prayer submitted 🙏" });
  };

  const handleSupport = (id: string) => {
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, supportCount: p.supportCount + 1 } : p))
    );
  };

  const sorted = [...prayers].sort((a, b) => a.supportCount - b.supportCount);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Prayer Wall</h1>
        <p className="text-sm text-muted-foreground mt-1">Share a prayer request or support others in prayer</p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
        <textarea
          placeholder="Share your prayer request..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button type="submit" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.97] transition-all">
            <Send className="w-4 h-4" /> Submit
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {sorted.map((prayer) => (
          <div key={prayer.id} className="p-4 rounded-xl border border-border bg-card shadow-sm">
            <p className="text-sm text-foreground">{prayer.content}</p>
            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-muted-foreground">
                {prayer.author} · {new Date(prayer.date).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}
              </div>
              <button
                onClick={() => handleSupport(prayer.id)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors active:scale-95"
              >
                <Heart className="w-3.5 h-3.5" />
                <span className="tabular-nums">{prayer.supportCount}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
