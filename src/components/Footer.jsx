import Link from "next/link";

const FinCoachLogo = () => (
  <svg width="140" height="36" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" x="0" y="2" rx="7" fill="#185FA5" />
    <rect x="6" y="24" width="6" height="10" fill="#fff" opacity="0.5" />
    <rect x="15" y="18" width="6" height="16" fill="#fff" opacity="0.75" />
    <rect x="24" y="12" width="6" height="22" fill="#fff" />
    <polyline points="6,24 15,16 24,10 30,7" stroke="#FAC775" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <text x="44" y="28" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="600" fill="#fff">Fin</text>
    <text x="72" y="28" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="400" fill="#5ba8e8">Coach</text>
  </svg>
);

const links = {
  Product: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Add transaction", href: "/transaction/create" },
    { label: "Goals", href: "/goals" },
    { label: "Insights", href: "/insights" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
    { label: "Cookie policy", href: "/cookies" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative bg-[#06090f] overflow-hidden">

      {/* Top ambient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-blue-700/10 blur-[80px] pointer-events-none" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-700/40 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-5 gap-12 mb-16">

          {/* Brand col */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <FinCoachLogo />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[260px] mb-6">
              AI-powered finance coaching that helps you track, plan, and grow
              your wealth — personalised to you.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Twitter",
                  href: "#",
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  label: "GitHub",
                  href: "#",
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "#",
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-600 mb-4">
                {group}
              </div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        {/* <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 mb-12 flex items-center justify-between gap-6 flex-wrap">
          <div>
            <div className="text-sm font-semibold text-slate-200 mb-1">Stay in the loop</div>
            <div className="text-sm text-slate-500">Weekly finance tips and product updates.</div>
          </div>
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 placeholder:text-slate-600 outline-none focus:border-blue-700/50 focus:bg-white/[0.07] transition-all"
            />
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0"
              style={{
                background: "linear-gradient(135deg,#185FA5,#1a7cc7)",
                boxShadow: "0 0 0 1px rgba(91,168,232,0.25)",
              }}
            >
              Subscribe
            </button>
          </div>
        </div> */}

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-6 border-t border-white/[0.05] flex-wrap gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} FinCoach AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span>Built with</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mx-0.5">
              <path d="M6 10.5S1 7.5 1 4a2.5 2.5 0 015-1 2.5 2.5 0 015 1c0 3.5-5 6.5-5 6.5z" fill="#185FA5"/>
            </svg>
            <span>for better finances</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;