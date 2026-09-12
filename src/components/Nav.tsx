import { useApp } from '../context';
import type { Screen, Role } from '../types';

interface NavItem { label: string; screen: Screen }

const sellerNav: NavItem[] = [
  { label: 'Dashboard', screen: 'seller-dashboard' },
  { label: 'Create Listing', screen: 'create-listing' },
  { label: 'Marketplace', screen: 'marketplace' },
  { label: 'Logistics', screen: 'logistics' },
  { label: 'Impact / MRV', screen: 'impact-mrv' },
];

const buyerNav: NavItem[] = [
  { label: 'Dashboard', screen: 'buyer-dashboard' },
  { label: 'Requirements', screen: 'buyer-requirement' },
  { label: 'Marketplace', screen: 'marketplace' },
  { label: 'Logistics', screen: 'logistics' },
  { label: 'Impact / MRV', screen: 'impact-mrv' },
];

const adminNav: NavItem[] = [
  { label: 'Admin Dashboard', screen: 'admin-dashboard' },
  { label: 'Anomaly Monitoring', screen: 'anomaly-monitoring' },
  { label: 'Compliance', screen: 'compliance' },
  { label: 'Marketplace', screen: 'marketplace' },
];

function getNav(role: Role): NavItem[] {
  if (role === 'seller') return sellerNav;
  if (role === 'buyer') return buyerNav;
  if (role === 'admin') return adminNav;
  return [];
}

export default function Nav() {
  const { screen, navigate, role } = useApp();
  if (!role) return null;

  const nav = getNav(role);
  const roleLabel = role === 'seller' ? 'Seller' : role === 'buyer' ? 'Buyer' : 'Admin';
  const orgName = role === 'seller' ? 'Heidelberg Materials' : role === 'buyer' ? 'CarbonCure Tech' : 'Platform Admin';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="max-w-screen-xl mx-auto px-6 flex items-center h-14 gap-8">
        <button
          onClick={() => navigate(role === 'admin' ? 'admin-dashboard' : role === 'seller' ? 'seller-dashboard' : 'buyer-dashboard')}
          className="flex items-center gap-2 shrink-0"
        >
          <div className="w-7 h-7 bg-[#15572A] rounded flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" fill="white" fillOpacity="0.9"/>
              <circle cx="7" cy="7" r="2" fill="white"/>
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-zinc-900" style={{ fontFamily: 'var(--font-heading)' }}>
            Carbon<span className="text-[#15572A]">Connect</span>
          </span>
        </button>

        <nav className="flex items-center gap-1 flex-1">
          {nav.map(item => (
            <button
              key={item.screen}
              onClick={() => navigate(item.screen)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                screen === item.screen
                  ? 'bg-zinc-100 text-zinc-900'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs px-2 py-0.5 rounded-full border border-zinc-200 text-zinc-500 font-mono">{roleLabel}</span>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-medium text-zinc-600">
              {orgName.charAt(0)}
            </div>
            <span className="text-xs text-zinc-600 group-hover:text-zinc-900">{orgName}</span>
          </div>
          <button
            onClick={() => navigate('landing')}
            className="text-xs text-zinc-400 hover:text-zinc-600 ml-1"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
