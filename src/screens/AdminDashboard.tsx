import { useApp } from '../context';
import { Card, StatCard, Badge, Btn, SectionHeader, Table, StatusDot, ProgressBar } from '../components/ui';
import Nav from '../components/Nav';

const monthlyVol = [
  { m: 'Apr', v: 280 }, { m: 'May', v: 410 }, { m: 'Jun', v: 350 },
  { m: 'Jul', v: 520 }, { m: 'Aug', v: 680 }, { m: 'Sep', v: 590 },
];
const maxV = 680;

const pending = [
  { org: 'Global Energy Solutions GmbH', type: 'Seller', country: 'DE', submitted: 'Sep 10', docs: '5/6', risk: 'low' },
  { org: 'Pacific Algae Corp', type: 'Buyer', country: 'AU', submitted: 'Sep 11', docs: '4/5', risk: 'low' },
  { org: 'Nafta Carbon LLC', type: 'Seller', country: 'KZ', submitted: 'Sep 08', docs: '4/6', risk: 'elevated' },
  { org: 'BioFuel Partners AS', type: 'Buyer', country: 'NO', submitted: 'Sep 12', docs: '5/5', risk: 'low' },
];

const recent = [
  { id: 'CC-O-9014', seller: 'BASF SE', buyer: 'CarbonCure Tech', vol: '800 t', value: '$67,200', status: 'active' },
  { id: 'CC-O-9013', seller: 'RWE Power AG', buyer: 'Vertis Greenhouse', vol: '1,400 t', value: '$126,000', status: 'contract' },
  { id: 'CC-O-9012', seller: 'Heidelberg Mat.', buyer: 'CarbonCure Tech', vol: '500 t', value: '$56,890', status: 'in-transit' },
  { id: 'CC-O-9011', seller: 'Tata Steel EU', buyer: 'Nordic Food', vol: '300 t', value: '$44,700', status: 'delivered' },
];

export default function AdminDashboard() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <SectionHeader
          title="Admin Dashboard"
          sub="Carbon-Connect Platform Administration · Sep 12, 2026"
          action={
            <div className="flex gap-2">
              <Btn variant="outline" onClick={() => navigate('anomaly-monitoring')}>Anomaly Monitor</Btn>
              <Btn variant="outline" onClick={() => navigate('compliance')}>Compliance center</Btn>
            </div>
          }
        />

        {/* KPIs */}
        <div className="grid grid-cols-6 gap-4 mb-8">
          <StatCard label="Registered Orgs" value="342" trend="+8" color="green" />
          <StatCard label="Active Listings" value="94" sub="12 pending review" />
          <StatCard label="Open Orders" value="47" />
          <StatCard label="Volume (Sep)" value="590K t" trend="+19%" color="green" />
          <StatCard label="GMV (Sep)" value="$41.2M" trend="+22%" color="green" />
          <StatCard label="Anomalies" value="3" color="red" sub="2 high priority" />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Volume chart */}
          <Card className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-sm font-semibold text-zinc-900">Platform Volume (GMV)</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">Apr – Sep 2026 · USD millions</div>
              </div>
              <Badge variant="green">+19% MoM</Badge>
            </div>
            <div className="flex items-end gap-3 h-36">
              {monthlyVol.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs text-zinc-400 font-mono">${d.v}K</div>
                  <div
                    className={`w-full rounded-t ${i === monthlyVol.length - 1 ? 'bg-[#15572A]' : 'bg-zinc-200'}`}
                    style={{ height: `${(d.v / maxV) * 100}%` }}
                  />
                  <div className="text-xs text-zinc-400">{d.m}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Platform health */}
          <Card className="p-6">
            <div className="text-sm font-semibold text-zinc-900 mb-4">Platform Health</div>
            <div className="space-y-3">
              {[
                { label: 'KYB approval rate', v: 94, color: 'green' },
                { label: 'Compliance coverage', v: 89, color: 'green' },
                { label: 'Delivery SLA', v: 98, color: 'green' },
                { label: 'Dispute rate', v: 1.2, max: 10, color: 'green', inv: true },
                { label: 'Anomaly resolution', v: 78, color: 'amber' },
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-500">{m.label}</span>
                    <span className={`font-mono font-medium ${m.color === 'green' ? 'text-green-700' : 'text-amber-600'}`}>
                      {m.v}%
                    </span>
                  </div>
                  <ProgressBar value={m.inv ? (m.max || 100) - m.v : m.v} color={m.color} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* KYB queue */}
          <Card className="col-span-2 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900">KYB / KYC Review Queue</h3>
              <Badge variant="yellow">4 pending</Badge>
            </div>
            <Table
              headers={['Organization', 'Type', 'Country', 'Submitted', 'Docs', 'Risk', 'Action']}
              rows={pending.map(p => [
                p.org,
                <Badge variant={p.type === 'Seller' ? 'blue' : 'default'}>{p.type.toUpperCase()}</Badge>,
                <span className="font-mono">{p.country}</span>,
                p.submitted,
                <span className="font-mono">{p.docs}</span>,
                <Badge variant={p.risk === 'low' ? 'green' : 'yellow'}>{p.risk.toUpperCase()}</Badge>,
                <div className="flex gap-1">
                  <button className="text-[10px] px-2 py-1 bg-[#15572A] text-white rounded hover:bg-green-800 transition-colors">Approve</button>
                  <button className="text-[10px] px-2 py-1 border border-zinc-300 rounded hover:border-zinc-500 text-zinc-600 transition-colors">Review</button>
                </div>,
              ])}
            />
          </Card>

          {/* Anomaly summary */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-zinc-900">Active Anomalies</div>
              <button onClick={() => navigate('anomaly-monitoring')} className="text-xs text-[#15572A] hover:underline">View all →</button>
            </div>
            <div className="space-y-3">
              {[
                { id: 'ANO-089', type: 'Pricing spike', severity: 'high', desc: 'Food grade price +42% in 3h' },
                { id: 'ANO-088', type: 'Volume surge', severity: 'high', desc: 'Nafta Carbon: 5× avg order' },
                { id: 'ANO-087', type: 'KYB mismatch', severity: 'medium', desc: 'Doc inconsistency flagged' },
              ].map((a, i) => (
                <div key={i} className="border border-zinc-200 rounded p-3 hover:border-zinc-300 cursor-pointer transition-all" onClick={() => navigate('anomaly-monitoring')}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-zinc-500">{a.id}</span>
                    <Badge variant={a.severity === 'high' ? 'red' : 'yellow'}>{a.severity.toUpperCase()}</Badge>
                  </div>
                  <div className="text-xs font-medium text-zinc-900">{a.type}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{a.desc}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent orders */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-900">Recent Platform Orders</h3>
            <Btn variant="ghost" className="text-xs">Export CSV</Btn>
          </div>
          <Table
            headers={['Order ID', 'Seller', 'Buyer', 'Volume', 'Value', 'Status']}
            rows={recent.map(o => [
              <span className="font-mono text-zinc-500">{o.id}</span>,
              o.seller, o.buyer,
              <span className="font-mono">{o.vol}</span>,
              <span className="font-mono">{o.value}</span>,
              <Badge variant={o.status === 'in-transit' ? 'blue' : o.status === 'delivered' ? 'green' : o.status === 'contract' ? 'yellow' : 'default'}>
                {o.status.toUpperCase()}
              </Badge>,
            ])}
          />
        </Card>
      </div>
    </div>
  );
}
