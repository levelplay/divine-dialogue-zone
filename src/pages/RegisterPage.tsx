import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Users, Shield, Settings } from "lucide-react";

type UserRole = "member" | "leadership" | "admin";

const roles: { value: UserRole; label: string; description: string; icon: typeof Users }[] = [
  { value: "member", label: "Church Member", description: "Access all features, submit prayers & requests", icon: Users },
  { value: "leadership", label: "Church Leadership", description: "Receive & manage prayer requests and member inquiries", icon: Shield },
  { value: "admin", label: "Administrator", description: "Post announcements, manage content, push notifications & support", icon: Settings },
];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", branch: "", password: "" });
  const [role, setRole] = useState<UserRole>("member");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Registration not yet connected", description: "Enable Lovable Cloud to add real auth." });
  };

  const update = (key: string, val: string) => setForm({ ...form, [key]: val });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
            CHG
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join the CHG Church community</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Role selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">I am a</label>
            <RadioGroup value={role} onValueChange={(v) => setRole(v as UserRole)} className="grid gap-2">
              {roles.map(({ value, label, description, icon: Icon }) => (
                <label
                  key={value}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    role === value
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-input bg-card hover:border-primary/30"
                  }`}
                >
                  <RadioGroupItem value={value} className="mt-0.5" />
                  <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => update("name", e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => update("email", e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => update("phone", e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <input type="text" placeholder="Church Branch" value={form.branch} onChange={(e) => update("branch", e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => update("password", e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
        <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
