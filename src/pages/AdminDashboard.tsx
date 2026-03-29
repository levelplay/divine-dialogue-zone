import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Navigate } from "react-router-dom";
import { MessageSquare, Eye, Plus, X, Bell, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<"posts" | "preview" | "support">("posts");
  const [posts, setPosts] = useState<any[]>([]);
  const [draft, setDraft] = useState({ title: "", content: "", category: "announcement", linkUrl: "", linkLabel: "" });
  const [previewing, setPreviewing] = useState(false);

  useEffect(() => {
    if (isAdmin) fetchPosts();
  }, [isAdmin]);

  const fetchPosts = async () => {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data);
  };

  const handlePublish = async () => {
    if (!draft.title.trim() || !draft.content.trim()) {
      toast({ title: "Title and content required", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("posts").insert({
      author_id: user!.id, title: draft.title, content: draft.content,
      category: draft.category, link_url: draft.linkUrl || null, link_label: draft.linkLabel || null,
    });
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
    } else {
      setDraft({ title: "", content: "", category: "announcement", linkUrl: "", linkLabel: "" });
      setPreviewing(false);
      toast({ title: "Published!" });
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("posts").delete().eq("id", id);
    toast({ title: "Post deleted" });
    fetchPosts();
  };

  if (authLoading) return <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground">Loading...</div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  const tabs = [
    { key: "posts" as const, label: "Manage Posts", icon: MessageSquare },
    { key: "preview" as const, label: "Create & Preview", icon: Eye },
    { key: "support" as const, label: "Support", icon: Headphones },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage content, notifications, and support</p>
      </div>

      <div className="flex gap-2 border-b border-border pb-1">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key)}
            className={cn("flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors",
              tab === key ? "bg-primary/10 text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground")}>
            <Icon className="w-4 h-4" />{label}
          </button>
        ))}
      </div>

      {tab === "posts" && (
        <div className="space-y-3">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No posts yet.</p>
          ) : posts.map((post) => (
            <div key={post.id} className="p-4 rounded-xl border border-border bg-card flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-sm text-foreground">{post.title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{post.content}</p>
                <span className="text-[11px] text-muted-foreground mt-1 inline-block capitalize">{post.category} · {new Date(post.created_at).toLocaleDateString()}</span>
              </div>
              <button onClick={() => handleDelete(post.id)} className="text-destructive text-xs hover:underline shrink-0">Delete</button>
            </div>
          ))}
        </div>
      )}

      {tab === "preview" && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-border bg-card space-y-3">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold">Create Post</p>
            <input type="text" placeholder="Post Title" value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <textarea placeholder="Post content..." value={draft.content}
              onChange={(e) => setDraft({ ...draft, content: e.target.value })} rows={4}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
            <div className="flex gap-2">
              {["announcement", "event", "link"].map((cat) => (
                <button key={cat} type="button" onClick={() => setDraft({ ...draft, category: cat })}
                  className={cn("px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors",
                    draft.category === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPreviewing(true)} className="flex-1 py-2.5 rounded-lg bg-muted text-foreground font-semibold text-sm">
                <Eye className="w-4 h-4 inline mr-1" /> Preview
              </button>
              <button onClick={handlePublish} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
                Publish
              </button>
            </div>
          </div>

          {previewing && draft.title && (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Preview</p>
              <article className="p-5 rounded-xl border border-border bg-card shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{draft.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 whitespace-pre-line">{draft.content}</p>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      )}

      {tab === "support" && (
        <div className="text-center py-12 space-y-3">
          <Headphones className="w-12 h-12 text-muted-foreground mx-auto" />
          <h3 className="font-semibold text-foreground">Support Inbox</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Member support requests will appear here. This feature will be fully connected with real-time messaging soon.
          </p>
        </div>
      )}
    </div>
  );
}
