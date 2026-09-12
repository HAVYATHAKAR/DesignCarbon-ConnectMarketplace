import { useApp } from '../context';
import { Card, Badge, Btn, SectionHeader, ProgressBar } from '../components/ui';
import Nav from '../components/Nav';

const monthlyData = [
  { m: 'Apr', utilized: 1200, verified: 900 },
  { m: 'May', utilized: 1800, verified: 1800 },
  { m: 'Jun', utilized: 1400, verified: 1200 },
  { m: 'Jul', utilized: 2200, verified: 2200 },
  { m: 'Aug', utilized: 3100, verified: 2800 },
  { m: 'Sep', utilized: 2700, verified: 0 },
];

const maxVal = 3100;

const applications = [
  { name: 'Concrete mineralization', pct: 78, tonnes: 14352, color: 'green' },
  { name: 'Chemical synthesis', pct: 12, tonnes: 2208, color: 'blue' },
  { name: 'Food carbonation', pct: 6, tonnes: 1104, color: 'amber' },
  { name: 'Greenhouse horticulture', pct: 4, tonnes: 736, color: 'zinc' },
];

const batches = [
  { id: 'CC-DP-2026-09-0847', date: 'Sep 21, 2026', qty: '499.4 t', app: 'Concrete mineralization', status: 'verified', verifier: 'Bureau Veritas' },
  { id: 'CC-DP-2026-08-0712', date: 'Aug 14, 2026', qty: '1,200 t', app: 'Concrete mineralization', status: 'verified', verifier: 'SGS Group' },
  { id: 'CC-DP-2026-08-0698', date: 'Aug 05, 2026', qty: '800 t', app: 'Chemical synthesis', status: 'verified', verifier: 'Bureau Veritas' },
  { id: 'CC-DP-2026-07-0612', date: 'Jul 19, 2026', qty: '1,400 t', app: 'Concrete mineralization', status: 'verified', verifier: 'DNV GL' },
  { id: 'CC-DP-2026-09-0861', date: 'Sep 25, 2026 (est)', qty: '600 t', app: 'Concrete mineralization', status: 'pending', verifier: 'Pending' },
];

export default function ImpactMRV() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <SectionHeader
          title="Impact & MRV Dashboard"
          sub="Monitoring, Reporting and Verification · ISO 14064-2 aligned · CarbonCure Technologies Inc."
          action={
            <div className="flex gap-2">
              <Btn variant="outline">Export MRV report</Btn>
              <Btn onClick={() => navigate('digital-passport')}>CO₂ Passports →</Btn>
            </div>
          }
        />

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-6 flex items-start gap-3">
          <span className="text-amber-600 shrink-0 text-sm">⚠</span>
          <div className="text-xs text-amber-800 leading-relaxed">
            <strong>MRV data vs. carbon credits are distinct.</strong> This dashboard shows CO₂ utilization metrics verified under ISO 14064-2. These records support but do not constitute carbon credit issuance. Any carbon credits or removal units must be separately certified by accredited verification bodies (e.g., Verra, Gold Standard, ISO 14065 verifiers) and registered on separate registries.
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {[
            { label: 'CO₂ Procured (YTD)', value: '18,400 t', sub: 'Physical CO₂ purchased' },
            { label: 'CO₂ Utilized (YTD)', value: '18,400 t', sub: 'Confirmed utilization' },
            { label: 'MRV Verified', value: '12,900 t', sub: '70% of total' },
            { label: 'Verification Pending', value: '5,500 t', sub: '30% of total' },
            { label: 'CO₂ Permanently Stored', value: '18,400 t', sub: 'In concrete matrix' },
          ].map((s, i) => (
            <Card key={i} className="p-4">
              <div className="text-xs text-zinc-500 mb-1.5">{s.label}</div>
              <div className="text-xl font-semibold text-zinc-900 font-mono">{s.value}</div>
              <div className="text-xs text-zinc-400 mt-0.5">{s.sub}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Monthly CO2 chart */}
          <Card className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm font-semibold text-zinc-900">Monthly CO₂ Utilization</div>
                <div className="text-xs text-zinc-400 mt-0.5 font-mono">Apr – Sep 2026 · tonnes · ISO 14064-2</div>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-[#15572A]" /><span className="text-zinc-500">Utilized</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-400" /><span className="text-zinc-500">MRV Verified</span></div>
              </div>
            </div>
            <div className="flex items-end gap-4 h-40">
              {monthlyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="flex items-end gap-0.5 w-full">
                    <div
                      className="flex-1 rounded-t bg-[#15572A] opacity-30"
                      style={{ height: `${(d.utilized / maxVal) * 140}px` }}
                    />
                    <div
                      className="flex-1 rounded-t bg-[#15572A]"
                      style={{ height: `${(d.verified / maxVal) * 140}px` }}
                    />
                  </div>
                  <div className="text-xs text-zinc-400">{d.m}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Application breakdown */}
          <Card className="p-6">
            <div className="text-sm font-semibold text-zinc-900 mb-4">Utilization by Application</div>
            <div className="space-y-4">
              {applications.map((a, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-zinc-700">{a.name}</span>
                    <span className="font-mono text-zinc-500">{a.tonnes.toLocaleString()} t</span>
                  </div>
                  <ProgressBar value={a.pct} color={a.color} />
                  <div className="text-xs text-zinc-400 mt-0.5 font-mono">{a.pct}% of total</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* MRV status & batches */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-2 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900">CO₂ Batch Utilization Records</h3>
              <Badge variant="blue">ISO 14064-2</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-200">
                    {['Passport ID', 'Date', 'Quantity', 'Application', 'MRV Status', 'Verifier'].map((h, i) => (
                      <th key={i} className="text-left text-zinc-500 font-medium py-2.5 px-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {batches.map((b, i) => (
                    <tr key={i} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 cursor-pointer" onClick={() => navigate('digital-passport')}>
                      <td className="py-3 px-4 font-mono text-zinc-500">{b.id}</td>
                      <td className="py-3 px-4 text-zinc-700">{b.date}</td>
                      <td className="py-3 px-4 font-mono">{b.qty}</td>
                      <td className="py-3 px-4 text-zinc-700">{b.app}</td>
                      <td className="py-3 px-4">
                        <Badge variant={b.status === 'verified' ? 'green' : 'yellow'}>
                          {b.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-zinc-500">{b.verifier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="space-y-4">
            {/* MRV score */}
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Climate Score</div>
              <div className="text-center mb-4">
                <div className="text-5xl font-semibold text-[#15572A]" style={{ fontFamily: 'var(--font-heading)' }}>88</div>
                <div className="text-xs text-zinc-400 mt-1">out of 100</div>
              </div>
              <ProgressBar value={88} />
              <div className="mt-4 space-y-2 text-xs text-zinc-500">
                <div className="flex justify-between"><span>CO₂ utilization rate</span><span className="font-mono text-green-700">100%</span></div>
                <div className="flex justify-between"><span>MRV verification %</span><span className="font-mono text-amber-600">70%</span></div>
                <div className="flex justify-between"><span>Reporting timeliness</span><span className="font-mono text-green-700">96%</span></div>
                <div className="flex justify-between"><span>Chain of custody</span><span className="font-mono text-green-700">100%</span></div>
              </div>
            </Card>

            {/* Verifiers */}
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Accredited Verifiers</div>
              <div className="space-y-2 text-xs text-zinc-600">
                {['Bureau Veritas — ISO 14065 accredited', 'SGS Group — ISCC PLUS & ISO 14065', 'DNV GL — ISO 14064 & 14065'].map((v, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>{v}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
