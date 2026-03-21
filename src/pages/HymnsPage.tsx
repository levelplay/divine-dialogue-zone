import { useState } from "react";
import { sampleHymns } from "@/lib/store-data";
import { Search, Music } from "lucide-react";

export default function HymnsPage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = sampleHymns.filter(
    (h) =>
      h.title.toLowerCase().includes(query.toLowerCase()) ||
      h.id.toString().includes(query)
  );

  const selected = sampleHymns.find((h) => h.id === selectedId);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hymns & Memos</h1>
        <p className="text-sm text-muted-foreground mt-1">Search by hymn number or title</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search hymns..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelectedId(null); }}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
        />
      </div>

      {selected ? (
        <div className="space-y-4">
          <button onClick={() => setSelectedId(null)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to list
          </button>
          <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {selected.id}
              </div>
              <h2 className="text-lg font-bold text-foreground">{selected.title}</h2>
            </div>
            <pre className="text-sm text-foreground whitespace-pre-wrap leading-relaxed font-sans">{selected.lyrics}</pre>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Music className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No hymns found for "{query}"</p>
            </div>
          )}
          {filtered.map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedId(h.id)}
              className="w-full text-left flex items-center gap-3 p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/20 active:scale-[0.98] transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                {h.id}
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{h.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{h.lyrics.split("\n")[0]}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
