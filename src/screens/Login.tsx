import { useApp } from '../context';

export default function Login() {
  const { navigate, setRole } = useApp();

  function handleLogin(role: 'seller' | 'buyer' | 'admin') {
    setRole(role);
    if (role === 'admin') navigate('admin-dashboard');
    else if (role === 'seller') navigate('seller-dashboard');
    else navigate('buyer-dashboard');
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-[#15572A] flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" fill="white" fillOpacity="0.9"/>
              <circle cx="7" cy="7" r="2" fill="white"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-white/90" style={{ fontFamily: 'var(--font-heading)' }}>CarbonConnect</span>
        </div>

        <div>
          <blockquote className="text-2xl font-medium text-white leading-relaxed mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            "We secured 18,000 tonnes of verified food-grade CO₂ in under 72 hours — with full compliance documentation ready for our auditor."
          </blockquote>
          <div>
            <div className="text-white/90 text-sm font-medium">Dr. Amara Osei-Mensah</div>
            <div className="text-green-300 text-xs">Head of Procurement, Nordic Food Systems AS</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { v: '4.2M t', l: 'CO₂ Traded' },
            { v: '340+', l: 'Verified Orgs' },
            { v: '28', l: 'Countries' },
            { v: '99.4%', l: 'Delivery SLA' },
          ].map((s, i) => (
            <div key={i} className="bg-white/10 rounded p-3">
              <div className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{s.v}</div>
              <div className="text-xs text-green-300 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-zinc-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Welcome back</h1>
            <p className="text-zinc-500 text-sm">Sign in to your Carbon-Connect account</p>
          </div>

          <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleLogin('buyer'); }}>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Work email</label>
              <input
                type="email"
                defaultValue="a.osei@nordificfood.no"
                className="w-full px-3 py-2.5 text-sm border border-zinc-300 rounded bg-white text-zinc-900 focus:outline-none focus:border-[#15572A] focus:ring-1 focus:ring-[#15572A]/20 transition-colors"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-zinc-700">Password</label>
                <a href="#" className="text-xs text-[#15572A] hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                defaultValue="••••••••••"
                className="w-full px-3 py-2.5 text-sm border border-zinc-300 rounded bg-white text-zinc-900 focus:outline-none focus:border-[#15572A] transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="mfa" className="rounded border-zinc-300" />
              <label htmlFor="mfa" className="text-xs text-zinc-500">Remember this device for MFA (30 days)</label>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-[#15572A] text-white text-sm font-medium rounded hover:bg-[#0E3F1E] transition-colors"
            >
              Sign in
            </button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-xs text-zinc-400">or sign in as</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'CO₂ Seller', role: 'seller' as const },
              { label: 'CO₂ Buyer', role: 'buyer' as const },
              { label: 'Admin', role: 'admin' as const },
            ].map(opt => (
              <button
                key={opt.role}
                onClick={() => handleLogin(opt.role)}
                className="py-2 text-xs font-medium text-zinc-600 border border-zinc-200 rounded hover:border-[#15572A] hover:text-[#15572A] transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="mt-8 text-xs text-zinc-400 text-center">
            Don't have an account?{' '}
            <button onClick={() => navigate('role-selection')} className="text-[#15572A] font-medium hover:underline">
              Apply for access
            </button>
          </p>

          <div className="mt-6 border-t border-zinc-100 pt-6">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="w-3 h-3 text-zinc-300">🔒</span>
              <span>Protected by ISO 27001 security. All sessions are encrypted and logged.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
