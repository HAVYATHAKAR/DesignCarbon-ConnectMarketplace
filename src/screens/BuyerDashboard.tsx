import { useApp } from '../context';
import { Card, StatCard, Badge, Btn, SectionHeader, Table, ScorePill } from '../components/ui';
import Nav from '../components/Nav';

const reqs = [
  { id: 'CC-R-2041', name: 'Q4 2026 Concrete Mineralization', grade: 'Captured CO₂ (≥95%)', vol: '3,200 t', budget: '$67–80/t', status: 'active', matches: 8 },
  { id: 'CC-R-2039', name: 'Food Carbonation — Winter Stock', grade: 'Food Grade (≥99.9%)', vol: '400 t', budget: '$140–165/t', status: 'active', matches: 3 },
];

const orders = [
  { id: 'CC-O-9012', supplier: 'Heidelberg Materials AG', product: 'Food Grade CO₂', qty: '400 t', value: '$59,200', status: 'in-transit', eta: 'Sep 14' },
  { id: 'CC-O-9008', supplier: 'BASF SE — Ludwigshafen', product: 'Industrial Grade CO₂', qty: '1,800 t', value: '$164,700', status: 'quality-check', eta: 'Sep 10' },
  { id: 'CC-O-8976', supplier: 'Tata Steel Europe', product: 'Captured CO₂', qty: '2,600 t', value: '$174,200', status: 'delivered', eta: 'Sep 02' },
];

const flowData = [
  { month: 'Apr', v: 1200 }, { month: 'May', v: 1800 }, { month: 'Jun', v: 1400 },
  { month: 'Jul', v: 2200 }, { month: 'Aug', v: 3100 }, { month: 'Sep', v: 2700 },
];

export default function BuyerDashboard() {
  const { navigate } = useApp();
  const maxFlow = Math.max(...flowData.map(d => d.v));

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <SectionHeader
          title="Buyer Dashboard"
          sub="CarbonCure Technologies Inc. · Halifax, Nova Scotia, Canada"
          action={
            <div className="flex gap-2">
              <Btn variant="outline" onClick={() => navigate('compliance')}>Compliance</Btn>
              <Btn onClick={() => navigate('buyer-requirement')}>+ New requirement</Btn>
            </div>
          }
        />

        <div className="grid grid-cols-5 gap-4 mb-8">
          <StatCard label="Active Requirements" value="2" sub="8 supplier matches" />
          <StatCard label="CO₂ Procured (Sep)" value="2,700 t" trend="+22%" color="green" />
          <StatCard label="Avg. Delivered Cost" value="$74/t" trend="-5%" color="green" />
          <StatCard label="CO₂ Utilized (YTD)" value="18,400 t" sub="in concrete mineralization" />
          <StatCard label="CO₂ Avoided (YTD)" value="9,200 t" color="green" sub="measured & verified" />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* CO2 intake chart */}
          <Card className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm font-semibold text-zinc-900">CO₂ Intake Volume</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">Apr – Sep 2026 · tonnes</div>
              </div>
              <Badge variant="green">+22% MoM</Badge>
            </div>
            <div className="flex items-end gap-3 h-36">
              {flowData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs text-zinc-400 font-mono">{(d.v / 1000).toFixed(1)}K</div>
                  <div
                    className={`w-full rounded-t ${i === flowData.length - 1 ? 'bg-[#15572A]' : 'bg-zinc-200'}`}
                    style={{ height: `${(d.v / maxFlow) * 100}%` }}
                  />
                  <div className="text-xs text-zinc-400">{d.month}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Buyer scores */}
          <Card className="p-6">
            <div className="text-sm font-semibold text-zinc-900 mb-4">Platform Scores</div>
            <div className="space-y-4">
              <ScorePill label="Commercial Score" score={79} />
              <ScorePill label="Climate Score" score={88} />
              <ScorePill label="Compliance Score" score={82} />
              <ScorePill label="Payment Reliability" score={96} />
              <ScorePill label="Utilization Verified" score={91} />
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-100 text-xs text-zinc-400">
              Climate score reflects verified CO₂ utilization and MRV reporting. Updated weekly.
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Active requirements */}
          <Card className="col-span-2 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900">Active Requirements</h3>
              <Btn variant="ghost" onClick={() => navigate('buyer-requirement')}>+ Post requirement</Btn>
            </div>
            <Table
              headers={['Req. ID', 'Name', 'Grade', 'Volume', 'Budget', 'Status', 'Matches']}
              rows={reqs.map(r => [
                <span className="font-mono text-zinc-500">{r.id}</span>,
                r.name,
                r.grade,
                <span className="font-mono">{r.vol}</span>,
                <span className="font-mono">{r.budget}</span>,
                <Badge variant={r.status === 'active' ? 'green' : 'default'}>{r.status.toUpperCase()}</Badge>,
                <button onClick={() => navigate('marketplace')} className="text-xs font-mono text-[#15572A] hover:underline">{r.matches} suppliers →</button>,
              ])}
            />
          </Card>

          {/* Buyer workflow */}
          <Card className="p-6">
            <div className="text-sm font-semibold text-zinc-900 mb-4">Buyer Workflow</div>
            <div className="space-y-0">
              {[
                { step: 'Post requirement', done: true },
                { step: 'Define utilization & specs', done: true },
                { step: 'Marketplace search', done: true },
                { step: 'Compare suppliers', done: true },
                { step: 'Request quote', done: true },
                { step: 'Place order', done: false, active: true },
                { step: 'Contract signing', done: false },
                { step: 'Payment', done: false },
                { step: 'Logistics & tracking', done: false },
                { step: 'Quality check & accept', done: false },
                { step: 'Impact reporting (MRV)', done: false },
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
                    {i < 10 && <div className={`w-px flex-1 my-0.5 ${s.done ? 'bg-[#15572A]' : 'bg-zinc-200'}`} />}
                  </div>
                  <div className={`pb-2.5 text-xs pt-0.5 ${s.active ? 'text-zinc-900 font-medium' : s.done ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {s.step}
                    {s.active && <div className="text-[#15572A] font-medium mt-0.5">→ 2 quotes received</div>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Orders */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-900">Active &amp; Recent Orders</h3>
            <Btn variant="ghost" onClick={() => navigate('logistics')}>Logistics tracker →</Btn>
          </div>
          <Table
            headers={['Order ID', 'Supplier', 'Product', 'Quantity', 'Value', 'Status', 'ETA']}
            rows={orders.map(o => [
              <span className="font-mono text-zinc-500">{o.id}</span>,
              o.supplier,
              o.product,
              <span className="font-mono">{o.qty}</span>,
              <span className="font-mono font-medium">{o.value}</span>,
              <Badge variant={o.status === 'in-transit' ? 'blue' : o.status === 'delivered' ? 'green' : o.status === 'quality-check' ? 'yellow' : 'default'}>
                {o.status.toUpperCase().replace(/-/g, ' ')}
              </Badge>,
              o.eta,
            ])}
            onRowClick={(i) => {
              if (i === 1) navigate('quality-verification');
              else navigate('logistics');
            }}
          />
        </Card>
      </div>
    </div>
  );
}
