import { useState } from 'react';
import { AppContext } from './context';
import type { Screen, Role } from './types';

import Landing from './screens/Landing';
import Login from './screens/Login';
import RoleSelection from './screens/RoleSelection';
import Registration from './screens/Registration';
import Compliance from './screens/Compliance';
import SellerDashboard from './screens/SellerDashboard';
import CreateListing from './screens/CreateListing';
import BuyerDashboard from './screens/BuyerDashboard';
import BuyerRequirement from './screens/BuyerRequirement';
import Marketplace from './screens/Marketplace';
import SupplierDetails from './screens/SupplierDetails';
import ProductDetail from './screens/ProductDetail';
import PricingBreakdown from './screens/PricingBreakdown';
import QuoteOrder from './screens/QuoteOrder';
import Contract from './screens/Contract';
import Payment from './screens/Payment';
import Logistics from './screens/Logistics';
import QualityVerification from './screens/QualityVerification';
import DigitalPassport from './screens/DigitalPassport';
import DisputeResolution from './screens/DisputeResolution';
import ImpactMRV from './screens/ImpactMRV';
import AdminDashboard from './screens/AdminDashboard';
import AnomalyMonitoring from './screens/AnomalyMonitoring';

function renderScreen(screen: Screen) {
  switch (screen) {
    case 'landing': return <Landing />;
    case 'login': return <Login />;
    case 'role-selection': return <RoleSelection />;
    case 'registration': return <Registration />;
    case 'compliance': return <Compliance />;
    case 'seller-dashboard': return <SellerDashboard />;
    case 'create-listing': return <CreateListing />;
    case 'buyer-dashboard': return <BuyerDashboard />;
    case 'buyer-requirement': return <BuyerRequirement />;
    case 'marketplace': return <Marketplace />;
    case 'supplier-details': return <SupplierDetails />;
    case 'product-detail': return <ProductDetail />;
    case 'pricing-breakdown': return <PricingBreakdown />;
    case 'quote-order': return <QuoteOrder />;
    case 'contract': return <Contract />;
    case 'payment': return <Payment />;
    case 'logistics': return <Logistics />;
    case 'quality-verification': return <QualityVerification />;
    case 'digital-passport': return <DigitalPassport />;
    case 'dispute-resolution': return <DisputeResolution />;
    case 'impact-mrv': return <ImpactMRV />;
    case 'admin-dashboard': return <AdminDashboard />;
    case 'anomaly-monitoring': return <AnomalyMonitoring />;
    default: return <Landing />;
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [role, setRole] = useState<Role>(null);

  function navigate(s: Screen) {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <AppContext.Provider value={{ screen, navigate, role, setRole }}>
      <div className="animate-fade-in-up">
        {renderScreen(screen)}
      </div>
    </AppContext.Provider>
  );
}
