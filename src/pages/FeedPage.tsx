import { useState, useEffect } from "react";
import { MessageSquare, Calendar, LinkIcon, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  id: string;
  title: string;
  content: string;
  category: string;
  link_url: string | null;
  link_label: string | null;
  created_at: string;
};

const categoryIcon: Record<string, typeof MessageSquare> = { announcement: MessageSquare, event: Calendar, link: LinkIcon };
const categoryColor: Record<string, string> = {
  announcement: "bg-primary/10 text-primary",
  event: "bg-accent/15 text-accent-foreground",
  link: "bg-muted text-muted-foreground",
};

export default function FeedPage() {
  const { user, isAdmin } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [draft, setDraft] = useState({ title: "", content: "", category: "announcement", linkUrl: "", linkLabel: "" });
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.content.trim()) {
      toast({ title: "Title and content are required", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("posts").insert({
      author_id: user!.id,
      title: draft.title,
      content: draft.content,
      category: draft.category,
      link_url: draft.linkUrl || null,
      link_label: draft.linkLabel || null,
    });
    if (error) {
      toast({ title: "Failed to publish", description: error.message, variant: "destructive" });
    } else {
      setDraft({ title: "", content: "", category: "announcement", linkUrl: "", linkLabel: "" });
      setShowAdmin(false);
      toast({ title: "Post published" });
      fetchPosts();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Communication Feed</h1>
          <p className="text-sm text-muted-foreground">Announcements and updates</p>
        </div>
        {isAdmin && (
          <button onClick={() => setShowAdmin(!showAdmin)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95",
              showAdmin ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
            )}>
            {showAdmin ? <><X className="w-3.5 h-3.5" /> Close</> : <><Plus className="w-3.5 h-3.5" /> New Post</>}
          </button>
        )}
      </div>

      {showAdmin && isAdmin && (
        <form onSubmit={handlePost} className="p-5 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 space-y-3">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">Admin — New Post</p>
          <input type="text" placeholder="Post Title" value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <textarea placeholder="Post content..." value={draft.content}
            onChange={(e) => setDraft({ ...draft, content: e.target.value })} rows={3}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
          <div className="flex gap-2">
            {(["announcement", "event", "link"] as const).map((cat) => (
              <button key={cat} type="button" onClick={() => setDraft({ ...draft, category: cat })}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors",
                  draft.category === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
                )}>
                {cat}
              </button>
            ))}
          </div>
          {draft.category === "link" && (
            <div className="flex gap-2">
              <input type="url" placeholder="Link URL" value={draft.linkUrl}
                onChange={(e) => setDraft({ ...draft, linkUrl: e.target.value })}
                className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <input type="text" placeholder="Link label" value={draft.linkLabel}
                onChange={(e) => setDraft({ ...draft, linkLabel: e.target.value })}
                className="w-32 h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          )}
          <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98] transition-all">
            Publish Post
          </button>
        </form>
      )}

      <div className="space-y-3">
        {loading ? (
          <p className="text-center text-muted-foreground py-8">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No announcements yet.</p>
        ) : (
          posts.map((post) => {
            const Icon = categoryIcon[post.category] || MessageSquare;
            return (
              <article key={post.id} className="p-5 rounded-xl border border-border bg-card shadow-sm">
                <div className="flex items-start gap-3">
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", categoryColor[post.category] || categoryColor.announcement)}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-sm text-foreground">{post.title}</h3>
                      <time className="text-[11px] text-muted-foreground shrink-0 tabular-nums">
                        {new Date(post.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}
                      </time>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1.5 whitespace-pre-line">{post.content}</p>
                    {post.link_url && (
                      <a href={post.link_url} className="inline-block mt-2 text-sm font-medium text-primary hover:underline">
                        {post.link_label || "View link"} →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
