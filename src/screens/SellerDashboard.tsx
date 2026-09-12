import { useApp } from '../context';
import { Card, StatCard, Badge, Btn, SectionHeader, Table, ProgressBar, StatusDot, ScorePill } from '../components/ui';
import Nav from '../components/Nav';

const listings = [
  { id: 'CC-L-4821', grade: 'Food Grade CO₂', purity: '99.92%', vol: '1,200 t', price: '$148/t', status: 'active', inquiries: 7 },
  { id: 'CC-L-4820', grade: 'Industrial Grade CO₂', purity: '99.51%', vol: '8,400 t', price: '$89/t', status: 'active', inquiries: 14 },
  { id: 'CC-L-4815', grade: 'Captured CO₂ (flue gas)', purity: '98.10%', vol: '24,000 t', price: '$67/t', status: 'active', inquiries: 22 },
  { id: 'CC-L-4801', grade: 'Technical Grade CO₂', purity: '98.40%', vol: '6,000 t', price: '$54/t', status: 'draft', inquiries: 0 },
];

const orders = [
  { id: 'CC-O-9012', buyer: 'Nordic Food Systems AS', product: 'Food Grade CO₂', qty: '400 t', value: '$59,200', status: 'in-transit', eta: 'Sep 14' },
  { id: 'CC-O-9008', buyer: 'CarbonCure Technologies', product: 'Captured CO₂', qty: '1,800 t', value: '$120,600', status: 'delivered', eta: 'Sep 10' },
  { id: 'CC-O-8994', buyer: 'Vertis Greenhouse BV', product: 'Industrial Grade CO₂', qty: '2,200 t', value: '$195,800', status: 'contract', eta: 'Sep 20' },
];

const revenueData = [
  { month: 'Apr', v: 38 }, { month: 'May', v: 52 }, { month: 'Jun', v: 44 },
  { month: 'Jul', v: 61 }, { month: 'Aug', v: 78 }, { month: 'Sep', v: 65 },
];

export default function SellerDashboard() {
  const { navigate } = useApp();
  const maxRev = Math.max(...revenueData.map(d => d.v));

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <SectionHeader
          title="Seller Dashboard"
          sub="Heidelberg Materials AG · Cement Plant Heidelberg, Germany"
          action={
            <div className="flex gap-2">
              <Btn variant="outline" onClick={() => navigate('compliance')}>Compliance</Btn>
              <Btn onClick={() => navigate('create-listing')}>+ New Listing</Btn>
            </div>
          }
        />

        {/* KPI row */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <StatCard label="Active Listings" value="3" sub="1 draft" />
          <StatCard label="Open Inquiries" value="43" trend="+12" color="green" />
          <StatCard label="Revenue (Sep)" value="$375K" trend="+18%" color="green" />
          <StatCard label="CO₂ Sold (Sep)" value="4,400 t" sub="of 9,600 t available" />
          <StatCard label="Avg. Delivery SLA" value="98.7%" color="green" />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Revenue chart */}
          <Card className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm font-semibold text-zinc-900">Monthly Revenue</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">Apr – Sep 2026 · USD thousands</div>
              </div>
              <Badge variant="green">+18% MoM</Badge>
            </div>
            <div className="flex items-end gap-3 h-36">
              {revenueData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs text-zinc-400 font-mono">${d.v}K</div>
                  <div
                    className={`w-full rounded-t transition-all ${i === revenueData.length - 1 ? 'bg-[#15572A]' : 'bg-zinc-200'}`}
                    style={{ height: `${(d.v / maxRev) * 100}%` }}
                  />
                  <div className="text-xs text-zinc-400">{d.month}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Scores */}
          <Card className="p-6">
            <div className="text-sm font-semibold text-zinc-900 mb-4">Performance Scores</div>
            <div className="space-y-4">
              <ScorePill label="Commercial Score" score={82} />
              <ScorePill label="Climate Score" score={74} />
              <ScorePill label="Compliance Score" score={76} />
              <ScorePill label="Delivery Reliability" score={98} />
              <ScorePill label="Documentation Quality" score={91} />
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-100 text-xs text-zinc-400 leading-relaxed">
              Scores are computed from verified transaction data, third-party audits, and platform activity. Updated weekly.
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Active listings */}
          <Card className="col-span-2 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900">Active CO₂ Listings</h3>
              <Btn variant="ghost" onClick={() => navigate('create-listing')}>+ Add listing</Btn>
            </div>
            <Table
              headers={['Listing ID', 'Grade', 'Purity', 'Volume', 'Price', 'Status', 'Inquiries']}
              rows={listings.map(l => [
                <span className="font-mono text-zinc-500">{l.id}</span>,
                l.grade,
                <span className="font-mono">{l.purity}</span>,
                l.vol,
                <span className="font-mono font-medium text-zinc-900">{l.price}</span>,
                <Badge variant={l.status === 'active' ? 'green' : 'default'}>{l.status.toUpperCase()}</Badge>,
                <span className="font-mono">{l.inquiries}</span>,
              ])}
              onRowClick={() => navigate('product-detail')}
            />
          </Card>

          {/* Seller flow */}
          <Card className="p-6">
            <div className="text-sm font-semibold text-zinc-900 mb-4">Seller Workflow</div>
            <div className="space-y-0">
              {[
                { step: 'Create listing', done: true },
                { step: 'CO₂ specifications', done: true },
                { step: 'Pricing & logistics', done: true },
                { step: 'Publish & matching', done: true },
                { step: 'Receive inquiry', done: true },
                { step: 'Issue quote', done: false, active: true },
                { step: 'Contract signing', done: false },
                { step: 'Payment', done: false },
                { step: 'Dispatch & delivery', done: false },
                { step: 'Settlement', done: false },
              ].map((s, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs border ${
                      s.done ? 'bg-[#15572A] border-[#15572A] text-white' :
                      s.active ? 'bg-white border-[#15572A] text-[#15572A]' :
                      'bg-white border-zinc-300 text-zinc-400'
                    }`}>
                      {s.done ? '✓' : i + 1}
                    </div>
                    {i < 9 && <div className={`w-px flex-1 my-0.5 ${s.done ? 'bg-[#15572A]' : 'bg-zinc-200'}`} />}
                  </div>
                  <div className={`pb-3 text-xs pt-0.5 ${s.active ? 'text-zinc-900 font-medium' : s.done ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {s.step}
                    {s.active && <div className="text-[#15572A] font-medium mt-0.5">→ 3 quotes pending</div>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Orders */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-900">Recent Orders</h3>
            <Btn variant="ghost" onClick={() => navigate('logistics')}>View logistics →</Btn>
          </div>
          <Table
            headers={['Order ID', 'Buyer', 'Product', 'Quantity', 'Value', 'Status', 'ETA']}
            rows={orders.map(o => [
              <span className="font-mono text-zinc-500">{o.id}</span>,
              o.buyer,
              o.product,
              <span className="font-mono">{o.qty}</span>,
              <span className="font-mono font-medium">{o.value}</span>,
              <Badge variant={o.status === 'in-transit' ? 'blue' : o.status === 'delivered' ? 'green' : 'yellow'}>
                {o.status.toUpperCase().replace('-', ' ')}
              </Badge>,
              o.eta,
            ])}
            onRowClick={() => navigate('logistics')}
          />
        </Card>
      </div>
    </div>
  );
}
