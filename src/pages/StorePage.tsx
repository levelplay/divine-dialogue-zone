import { useState } from "react";
import { Link } from "react-router-dom";
import { themes, products, Product } from "@/lib/store-data";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, ArrowLeft, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function StorePage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const { addItem, totalItems } = useCart();

  const theme = themes.find((t) => t.id === selectedTheme);
  const themeProducts = selectedTheme ? products.filter((p) => p.themeId === selectedTheme) : [];

  const handleAdd = (product: Product) => {
    addItem(product);
    toast({ title: "Added to cart", description: `${product.name} added.` });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          {selectedTheme ? (
            <button onClick={() => setSelectedTheme(null)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-1">
              <ArrowLeft className="w-4 h-4" /> All Themes
            </button>
          ) : null}
          <h1 className="text-2xl font-bold text-foreground">{theme ? theme.name : "Online Store"}</h1>
          {!selectedTheme && <p className="text-sm text-muted-foreground mt-1">Browse merchandise by conference theme</p>}
        </div>
        <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors active:scale-95 md:hidden">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[11px] font-bold flex items-center justify-center">{totalItems}</span>
          )}
        </Link>
      </div>

      {!selectedTheme ? (
        <div className="grid gap-4 md:grid-cols-3">
          {themes.map((t) => {
            const count = products.filter((p) => p.themeId === t.id).length;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTheme(t.id)}
                className="text-left p-5 rounded-xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/20 active:scale-[0.97] transition-all"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-3" style={{ backgroundColor: t.color + "18", color: t.color }}>
                  ✦
                </div>
                <h3 className="font-semibold text-foreground">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{count} items · {t.year}</p>
              </button>
            );
          })}
        </div>
      ) : (
        <>
          {theme && <p className="text-sm text-muted-foreground">{theme.description}</p>}
          <div className="space-y-6">
            {["ticket", "merch"].map((cat) => {
              const items = themeProducts.filter((p) => p.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                    {cat === "ticket" ? "Conference Tickets" : "Youth First Merchandise"}
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {items.map((p) => (
                      <div key={p.id} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card shadow-sm">
                        <div className="text-3xl shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-muted">{p.image}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-foreground">{p.name}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="font-bold text-foreground">R{p.price.toFixed(2)}</span>
                            <button
                              onClick={() => handleAdd(p)}
                              className={cn(
                                "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95",
                                "bg-primary text-primary-foreground hover:bg-primary/90"
                              )}
                            >
                              <Plus className="w-3.5 h-3.5" /> Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
