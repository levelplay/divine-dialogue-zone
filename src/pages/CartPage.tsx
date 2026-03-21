import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderRef, setOrderRef] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    const ref = "CHG-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
    setOrderRef(ref);
    clearCart();
  };

  if (orderRef) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-foreground">Order Confirmed</h1>
        <p className="text-muted-foreground">Present this reference number at the church help desk to collect your items.</p>
        <div className="inline-block px-6 py-3 rounded-xl bg-primary/10 text-primary font-mono text-lg font-bold tracking-wider">
          {orderRef}
        </div>
        <p className="text-xs text-muted-foreground">Save or screenshot this reference number.</p>
        <Link to="/" className="inline-block mt-4 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.97] transition-all">
          Back to Home
        </Link>
      </div>
    );
  }

  if (items.length === 0 && !checkingOut) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto" />
        <h1 className="text-xl font-bold text-foreground">Your cart is empty</h1>
        <p className="text-muted-foreground text-sm">Browse the store to add items.</p>
        <Link to="/store" className="inline-block mt-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.97] transition-all">
          Browse Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/store" className="p-2 rounded-lg hover:bg-muted transition-colors"><ArrowLeft className="w-4 h-4" /></Link>
        <h1 className="text-2xl font-bold text-foreground">{checkingOut ? "Checkout" : "Shopping Cart"}</h1>
      </div>

      {!checkingOut ? (
        <>
          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card shadow-sm">
                <div className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg bg-muted shrink-0">{product.image}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">R{product.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-7 h-7 rounded-md bg-muted flex items-center justify-center hover:bg-muted-foreground/10 active:scale-95 transition-all">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-semibold tabular-nums w-5 text-center">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-7 h-7 rounded-md bg-muted flex items-center justify-center hover:bg-muted-foreground/10 active:scale-95 transition-all">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => removeItem(product.id)} className="ml-2 p-1.5 rounded-md text-destructive hover:bg-destructive/10 active:scale-95 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
            <span className="font-semibold text-foreground">Total</span>
            <span className="text-xl font-bold text-foreground">R{totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setCheckingOut(true)}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all"
          >
            Proceed to Checkout
          </button>
        </>
      ) : (
        <form onSubmit={handleCheckout} className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Your Details</p>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
            <span className="font-semibold text-foreground">Total</span>
            <span className="text-xl font-bold text-foreground">R{totalPrice.toFixed(2)}</span>
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all">
            Confirm Order
          </button>
          <button type="button" onClick={() => setCheckingOut(false)} className="w-full py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Cart
          </button>
        </form>
      )}
    </div>
  );
}
