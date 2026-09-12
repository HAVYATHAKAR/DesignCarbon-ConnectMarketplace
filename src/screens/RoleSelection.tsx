import { useApp } from '../context';
import type { Role } from '../types';

const roles = [
  {
    role: 'seller' as Role,
    title: 'CO₂ Seller',
    subtitle: 'Industrial CO₂ Producer',
    desc: 'You generate industrial CO₂ from cement, steel, power, chemicals, or refining and want to sell verified batches to utilization buyers.',
    items: ['List CO₂ batches with full specs', 'Receive RFQs and issue quotes', 'Manage logistics and delivery', 'Generate Digital CO₂ Passports', 'Access MRV and impact analytics'],
    examples: 'Cement plants · Steel mills · Power stations · Refineries · Chemical plants',
    badge: 'Seller',
    color: 'border-zinc-300 hover:border-[#15572A]',
    badgeColor: 'bg-zinc-100 text-zinc-700',
  },
  {
    role: 'buyer' as Role,
    title: 'CO₂ Buyer',
    subtitle: 'CO₂ Utilization Offtaker',
    desc: 'You require industrial CO₂ for concrete mineralization, chemical synthesis, food carbonation, greenhouse operations, algae cultivation, or fuel production.',
    items: ['Post detailed requirements', 'Search and compare suppliers', 'Request quotes and negotiate', 'Track logistics and delivery', 'Verify quality and receive CO₂ Passport', 'Report utilization for ESG/MRV'],
    examples: 'Concrete producers · Food manufacturers · Greenhouses · Algae farms · E-fuel plants',
    badge: 'Buyer',
    color: 'border-zinc-300 hover:border-[#15572A]',
    badgeColor: 'bg-zinc-100 text-zinc-700',
  },
];

export default function RoleSelection() {
  const { navigate, setRole } = useApp();

  function select(role: Role) {
    setRole(role);
    navigate('registration');
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex flex-col">
      <header className="border-b border-zinc-200 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate('landing')} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#15572A] rounded flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" fill="white" fillOpacity="0.9"/><circle cx="7" cy="7" r="2" fill="white"/></svg>
            </div>
            <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>Carbon<span className="text-[#15572A]">Connect</span></span>
          </button>
          <button onClick={() => navigate('login')} className="text-sm text-zinc-500 hover:text-zinc-900">Sign in instead →</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-3">Step 1 of 4</div>
          <h1 className="text-3xl font-semibold text-zinc-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>What is your role?</h1>
          <p className="text-zinc-500 max-w-md">Select the role that best describes your organization's activity on the platform.</p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-2xl w-full mb-8">
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => select(r.role)}
              className={`bg-white border-2 rounded-lg p-7 text-left transition-all group ${r.color} hover:shadow-md`}
            >
              <div className={`inline-block text-xs font-medium px-2 py-0.5 rounded mb-4 ${r.badgeColor}`}>{r.badge}</div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{r.title}</h3>
              <p className="text-xs text-zinc-500 mb-4">{r.subtitle}</p>
              <p className="text-sm text-zinc-600 mb-5 leading-relaxed">{r.desc}</p>
              <ul className="space-y-1.5 mb-5">
                {r.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-zinc-600">
                    <span className="text-[#15572A] text-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-zinc-400 border-t border-zinc-100 pt-4">{r.examples}</p>
              <div className="mt-4 text-sm font-medium text-[#15572A] group-hover:underline">
                Continue as {r.badge} →
              </div>
            </button>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded p-4 max-w-2xl w-full">
          <div className="flex gap-3">
            <span className="text-amber-600 shrink-0">⚠</span>
            <div className="text-xs text-amber-800">
              <strong>Physical CO₂ only.</strong> Carbon-Connect is exclusively a marketplace for physical industrial CO₂ gas and liquid. It does not trade carbon credits, voluntary emissions units (VCUs), guarantees of origin (GOs), or any other financial carbon instruments. Those are traded on separate regulated registries.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
