import { useState } from "react";
import { samplePosts, FeedPost } from "@/lib/store-data";
import { MessageSquare, Calendar, LinkIcon, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const categoryIcon = { announcement: MessageSquare, event: Calendar, link: LinkIcon };
const categoryColor = { announcement: "bg-primary/10 text-primary", event: "bg-accent/15 text-accent-foreground", link: "bg-muted text-muted-foreground" };

export default function FeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>(samplePosts);
  const [showAdmin, setShowAdmin] = useState(false);
  const [draft, setDraft] = useState({ title: "", content: "", category: "announcement" as FeedPost["category"], linkUrl: "", linkLabel: "" });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.content.trim()) {
      toast({ title: "Title and content are required", variant: "destructive" });
      return;
    }
    const newPost: FeedPost = {
      id: Date.now().toString(),
      title: draft.title,
      content: draft.content,
      category: draft.category,
      date: new Date().toISOString().slice(0, 10),
      linkUrl: draft.linkUrl || undefined,
      linkLabel: draft.linkLabel || undefined,
    };
    setPosts([newPost, ...posts]);
    setDraft({ title: "", content: "", category: "announcement", linkUrl: "", linkLabel: "" });
    setShowAdmin(false);
    toast({ title: "Post published" });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Communication Feed</h1>
          <p className="text-sm text-muted-foreground">Announcements and updates</p>
        </div>
        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95",
            showAdmin ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
          )}
        >
          {showAdmin ? <><X className="w-3.5 h-3.5" /> Close</> : <><Plus className="w-3.5 h-3.5" /> New Post</>}
        </button>
      </div>

      {showAdmin && (
        <form onSubmit={handlePost} className="p-5 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 space-y-3">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">Admin — New Post</p>
          <input
            type="text"
            placeholder="Post Title"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            placeholder="Post content..."
            value={draft.content}
            onChange={(e) => setDraft({ ...draft, content: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex gap-2">
            {(["announcement", "event", "link"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setDraft({ ...draft, category: cat })}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors",
                  draft.category === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          {draft.category === "link" && (
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Link URL"
                value={draft.linkUrl}
                onChange={(e) => setDraft({ ...draft, linkUrl: e.target.value })}
                className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                placeholder="Link label"
                value={draft.linkLabel}
                onChange={(e) => setDraft({ ...draft, linkLabel: e.target.value })}
                className="w-32 h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          )}
          <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98] transition-all">
            Publish Post
          </button>
        </form>
      )}

      <div className="space-y-3">
        {posts.map((post) => {
          const Icon = categoryIcon[post.category];
          return (
            <article key={post.id} className="p-5 rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-start gap-3">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", categoryColor[post.category])}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm text-foreground">{post.title}</h3>
                    <time className="text-[11px] text-muted-foreground shrink-0 tabular-nums">
                      {new Date(post.date).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1.5 whitespace-pre-line">{post.content}</p>
                  {post.linkUrl && (
                    <a href={post.linkUrl} className="inline-block mt-2 text-sm font-medium text-primary hover:underline">
                      {post.linkLabel || "View link"} →
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
