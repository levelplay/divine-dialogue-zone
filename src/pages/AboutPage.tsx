export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">About CHG Church</h1>
        <p className="text-sm text-muted-foreground mt-1">Our story, mission, and leadership</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Our Mission</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          CHG Church exists to build a vibrant, faith-filled community rooted in the Word of God. We are committed to nurturing spiritual growth, empowering the youth, and serving our communities with compassion and purpose.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Our Vision</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          To be a beacon of hope and transformation, raising a generation that walks boldly in faith and impacts the world through love and service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Leadership</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { name: "Pastor M. Dlamini", role: "Senior Pastor", initials: "MD" },
            { name: "Rev. T. Mokoena", role: "Associate Pastor", initials: "TM" },
            { name: "Sister N. Khumalo", role: "Youth Director", initials: "NK" },
            { name: "Brother S. Naidoo", role: "Worship Leader", initials: "SN" },
          ].map((leader) => (
            <div key={leader.name} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card shadow-sm">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                {leader.initials}
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{leader.name}</p>
                <p className="text-xs text-muted-foreground">{leader.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-2">
        <h2 className="text-lg font-semibold text-foreground">Contact</h2>
        <p className="text-sm text-muted-foreground">For enquiries, reach us at the church office or visit our help desk on Sundays.</p>
        <p className="text-sm text-muted-foreground">📧 info@chgchurch.org · 📞 +27 12 345 6789</p>
      </section>
    </div>
  );
}
