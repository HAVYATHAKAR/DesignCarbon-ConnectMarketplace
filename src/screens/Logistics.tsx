import { useApp } from '../context';
import { Card, Badge, Btn, SectionHeader } from '../components/ui';
import Nav from '../components/Nav';

const events = [
  { time: 'Sep 12, 09:14', event: 'Order confirmed by seller', location: 'Heidelberg, Germany', status: 'done' },
  { time: 'Sep 12, 11:30', event: 'Payment escrow confirmed', location: 'Platform', status: 'done' },
  { time: 'Sep 13, 07:00', event: 'CO₂ loaded into tanker TK-4921', location: 'Heidelberg Plant, Germany', status: 'done' },
  { time: 'Sep 13, 08:15', event: 'Purity analysis completed — 99.63% CO₂', location: 'Bureau Veritas lab, Heidelberg', status: 'done' },
  { time: 'Sep 13, 09:00', event: 'Dispatch — truck departed plant gate', location: 'Heidelberg, Germany', status: 'done' },
  { time: 'Sep 13, 14:30', event: 'Border crossing — DE/FR (Kehl)', location: 'Kehl, Germany', status: 'done' },
  { time: 'Sep 14, 06:00', event: 'Antwerp port — tank loaded onto vessel', location: 'Port of Antwerp, Belgium', status: 'active' },
  { time: 'Sep 14, 18:00 (est)', event: 'Vessel departure — Halifax', location: 'Atlantic — ETA Sep 21', status: 'pending' },
  { time: 'Sep 21, 14:00 (est)', event: 'Arrival Halifax port', location: 'Halifax, NS, Canada', status: 'pending' },
  { time: 'Sep 21, 18:00 (est)', event: 'Final delivery — CarbonCure plant', location: '1465 Hammonds Plains Rd, Halifax', status: 'pending' },
  { time: 'Sep 22 (est)', event: 'Quality acceptance & CO₂ Passport issued', location: 'CarbonCure Plant', status: 'pending' },
];

const routePoints = [
  { name: 'Heidelberg, DE', x: 52, y: 38, done: true },
  { name: 'Kehl (border)', x: 50, y: 40, done: true },
  { name: 'Antwerp, BE', x: 47, y: 33, done: false, active: true },
  { name: 'Atlantic Ocean', x: 30, y: 40, done: false },
  { name: 'Halifax, NS, CA', x: 14, y: 35, done: false },
];

export default function Logistics() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <SectionHeader
          title="Logistics Tracking"
          sub="Order CC-O-9012 · Heidelberg Materials AG → CarbonCure Technologies"
          action={
            <div className="flex gap-2">
              <Btn variant="outline" onClick={() => navigate('digital-passport')}>CO₂ Passport</Btn>
              <Btn onClick={() => navigate('quality-verification')}>Quality Check →</Btn>
            </div>
          }
        />

        {/* Status banner */}
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6 flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
          <div>
            <div className="text-sm font-semibold text-blue-900">In Transit — Antwerp Port Loading</div>
            <div className="text-xs text-blue-700 mt-0.5">Tank TK-4921 · 500 t Industrial Grade CO₂ (liquid) · ETA Halifax: Sep 21, 2026</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-xs text-blue-700">Progress</div>
            <div className="font-mono text-sm font-semibold text-blue-900">55%</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Route map (SVG schematic) */}
            <Card className="p-6 overflow-hidden">
              <div className="text-sm font-semibold text-zinc-900 mb-4">Route Map</div>
              <div className="relative bg-zinc-50 rounded border border-zinc-200 h-52 overflow-hidden">
                <svg viewBox="0 0 100 60" className="w-full h-full">
                  {/* Ocean background */}
                  <rect x="0" y="0" width="100" height="60" fill="#EFF6FF" />
                  {/* Europe land */}
                  <path d="M44 20 L58 20 L62 30 L60 45 L50 50 L44 44 L40 35 Z" fill="#F4F4F2" stroke="#E4E4E7" strokeWidth="0.3" />
                  {/* North America */}
                  <path d="M0 20 L20 20 L22 45 L12 50 L0 45 Z" fill="#F4F4F2" stroke="#E4E4E7" strokeWidth="0.3" />
                  {/* Route line */}
                  <polyline
                    points={routePoints.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#15572A"
                    strokeWidth="0.8"
                    strokeDasharray="2,1"
                  />
                  {/* Completed route */}
                  <polyline
                    points="52,38 50,40 47,33"
                    fill="none"
                    stroke="#15572A"
                    strokeWidth="1.2"
                  />
                  {/* Points */}
                  {routePoints.map((p, i) => (
                    <g key={i}>
                      <circle
                        cx={p.x} cy={p.y} r={p.active ? 2.5 : 1.5}
                        fill={p.done ? '#15572A' : p.active ? '#2563EB' : '#D4D4D8'}
                        stroke="white" strokeWidth="0.5"
                      />
                      <text x={p.x} y={p.y - 3} textAnchor="middle" fontSize="2" fill="#52525B">{p.name}</text>
                    </g>
                  ))}
                  {/* Ship icon at current position */}
                  <text x="47" y="32" fontSize="4" textAnchor="middle">🚢</text>
                </svg>
              </div>
            </Card>

            {/* Event timeline */}
            <Card className="overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100">
                <h3 className="text-sm font-semibold text-zinc-900">Shipment Timeline</h3>
              </div>
              <div className="p-6">
                <div className="space-y-0">
                  {events.map((e, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border flex-shrink-0 ${
                          e.status === 'done' ? 'bg-[#15572A] border-[#15572A] text-white' :
                          e.status === 'active' ? 'bg-blue-500 border-blue-500 text-white animate-pulse' :
                          'bg-white border-zinc-300 text-zinc-400'
                        }`}>
                          {e.status === 'done' ? '✓' : e.status === 'active' ? '●' : '○'}
                        </div>
                        {i < events.length - 1 && (
                          <div className={`w-px flex-1 my-1 ${e.status === 'done' ? 'bg-[#15572A]' : 'bg-zinc-200'}`} />
                        )}
                      </div>
                      <div className={`pb-4 ${e.status === 'pending' ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-xs font-medium ${e.status === 'active' ? 'text-blue-700' : 'text-zinc-900'}`}>{e.event}</span>
                          {e.status === 'active' && <Badge variant="blue">CURRENT</Badge>}
                        </div>
                        <div className="text-xs text-zinc-400 font-mono">{e.time} · {e.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Shipment details */}
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Shipment Details</div>
              <div className="space-y-2.5">
                {[
                  { k: 'Order ID', v: 'CC-O-9012' },
                  { k: 'Tank ID', v: 'TK-4921' },
                  { k: 'Product', v: 'Industrial Grade CO₂' },
                  { k: 'Quantity', v: '500 t' },
                  { k: 'Purity (certified)', v: '99.63% vol' },
                  { k: 'Temperature', v: '-20°C' },
                  { k: 'Carrier', v: 'Messer Transport' },
                  { k: 'Vessel', v: 'MV Atlantic Crest' },
                  { k: 'Bill of Lading', v: 'ATL-2026-09-4821' },
                  { k: 'ETA Halifax', v: 'Sep 21, 2026' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between text-xs border-b border-zinc-100 pb-1.5 last:border-0">
                    <span className="text-zinc-500">{row.k}</span>
                    <span className="font-mono text-zinc-900 font-medium">{row.v}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Documents */}
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Shipping Documents</div>
              <div className="space-y-2">
                {[
                  { name: 'Bill of Lading', status: 'Available' },
                  { name: 'CMR Waybill', status: 'Available' },
                  { name: 'Batch Purity Certificate', status: 'Available' },
                  { name: 'ISCC PLUS Chain of Custody', status: 'Available' },
                  { name: 'Delivery Note', status: 'Pending' },
                  { name: 'CO₂ Digital Passport', status: 'On delivery' },
                ].map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-zinc-700">📄 {d.name}</span>
                    <span className={d.status === 'Available' ? 'text-green-700 hover:underline cursor-pointer' : 'text-zinc-400'}>{d.status}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Btn className="w-full justify-center" variant="outline" onClick={() => navigate('quality-verification')}>
              Quality check (on arrival) →
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
