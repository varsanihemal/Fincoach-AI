import Link from "next/link";

const FinCoachLogo = () => (
  <svg width="160" height="44" viewBox="0 0 160 44" xmlns="http://www.w3.org/2000/svg">
    {/* Icon mark */}
    <rect width="40" height="40" x="0" y="2" rx="10" fill="#06090f" stroke="#1e3a5f" strokeWidth="1"/>

    {/* Rising bars */}
    <rect x="8"  y="28" width="6" height="10" rx="1.5" fill="#185FA5" opacity="0.4"/>
    <rect x="17" y="22" width="6" height="16" rx="1.5" fill="#185FA5" opacity="0.7"/>
    <rect x="26" y="15" width="6" height="23" rx="1.5" fill="#5ba8e8"/>

    {/* Trend line */}
    <polyline points="11,26 20,20 29,13"
      stroke="#5dcaa5" strokeWidth="2"
      fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="29" cy="13" r="2.5" fill="#5dcaa5"/>

    {/* Wordmark */}
    <text x="48" y="30"
      fontFamily="system-ui, sans-serif"
      fontSize="22" fontWeight="500" fill="#ffffff">
      Fin
    </text>
    <text x="76" y="30"
      fontFamily="system-ui, sans-serif"
      fontSize="22" fontWeight="400" fill="#5ba8e8">
      Coach
    </text>

    {/* AI badge */}
    <rect x="48" y="34" width="18" height="10" rx="3" fill="#185FA5" fillOpacity="0.2" stroke="#185FA5" strokeWidth="0.8"/>
    <text x="57" y="42"
      fontFamily="system-ui, sans-serif"
      fontSize="8" fontWeight="500" fill="#5ba8e8"
      textAnchor="middle">
      AI
    </text>
  </svg>
);

const links = {
  Product: [
    { label: "Dashboard", href: "/dashboard" },
  ],

  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  Legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
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