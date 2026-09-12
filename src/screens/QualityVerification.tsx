import { useState } from 'react';
import { useApp } from '../context';
import { Card, Badge, Btn, SectionHeader } from '../components/ui';
import Nav from '../components/Nav';

const tests = [
  { name: 'CO₂ purity (GC analysis)', spec: '≥ 99.51%', measured: '99.63%', status: 'pass' },
  { name: 'H₂O (Karl Fischer)', spec: '≤ 10 ppm', measured: '5.2 ppm', status: 'pass' },
  { name: 'O₂ (galvanic sensor)', spec: '≤ 5 ppm', measured: '1.8 ppm', status: 'pass' },
  { name: 'SO₂ (UV fluorescence)', spec: '≤ 0.1 ppm', measured: '<0.05 ppm', status: 'pass' },
  { name: 'NOₓ (chemiluminescence)', spec: '≤ 2.5 ppm', measured: '0.9 ppm', status: 'pass' },
  { name: 'CO (NDIR)', spec: '≤ 10 ppm', measured: '3.4 ppm', status: 'pass' },
  { name: 'H₂S (electrochemical)', spec: '≤ 0.1 ppm', measured: '<0.05 ppm', status: 'pass' },
  { name: 'NH₃ (colorimetric)', spec: '≤ 2.5 ppm', measured: '0.3 ppm', status: 'pass' },
  { name: 'Total hydrocarbons (FID)', spec: '≤ 50 ppm', measured: '15.2 ppm', status: 'pass' },
  { name: 'Volume delivered', spec: '500 t ±2%', measured: '499.4 t', status: 'pass' },
  { name: 'Delivery temperature', spec: '-20°C ±3°C', measured: '-19.2°C', status: 'pass' },
  { name: 'Delivery pressure', spec: '18.5 bar ±0.5', measured: '18.4 bar', status: 'pass' },
];

export default function QualityVerification() {
  const { navigate } = useApp();
  const [accepted, setAccepted] = useState(false);
  const [disputed, setDisputed] = useState(false);

  if (accepted) {
    return (
      <div className="min-h-screen bg-[#F8F8F6]">
        <Nav />
        <div className="max-w-xl mx-auto px-6 py-24 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl text-green-700">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-zinc-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Delivery Accepted</h2>
          <p className="text-zinc-500 text-sm mb-2">All quality parameters verified. CO₂ Digital Passport has been issued.</p>
          <p className="text-zinc-500 text-sm mb-6">Payment funds will be released to Heidelberg Materials AG within 2 business days.</p>
          <div className="flex justify-center gap-3">
            <Btn onClick={() => navigate('digital-passport')}>View CO₂ Passport →</Btn>
            <Btn variant="outline" onClick={() => navigate('impact-mrv')}>Impact report →</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <SectionHeader
          title="Quality Verification"
          sub="Batch CC-B-2026-09-0847 · Order CC-O-9012 · Delivered Sep 21, 2026"
          action={
            <div className="flex gap-2">
              <Btn variant="danger" onClick={() => { setDisputed(true); navigate('dispute-resolution'); }}>Raise dispute</Btn>
              <Btn onClick={() => setAccepted(true)}>Accept delivery ✓</Btn>
            </div>
          }
        />

        {/* Overall result */}
        <div className="bg-green-50 border border-green-200 rounded p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-lg">✓</div>
            <div>
              <div className="text-sm font-semibold text-green-900">All quality checks passed</div>
              <div className="text-xs text-green-700">12 of 12 parameters within specification · Verified by Bureau Veritas on Sep 21, 2026</div>
            </div>
          </div>
          <Badge variant="green">QUALITY PASSED</Badge>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Analysis results */}
            <Card className="overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-900">Quality Analysis Results</h3>
                <span className="text-xs text-zinc-400">Bureau Veritas · Sep 21, 2026 · EN 13279 + ISO 8573</span>
              </div>
              <div className="divide-y divide-zinc-100">
                <div className="px-6 py-2 grid grid-cols-4 gap-4">
                  {['Parameter', 'Specification', 'Measured', 'Result'].map((h, i) => (
                    <div key={i} className="text-xs font-medium text-zinc-400">{h}</div>
                  ))}
                </div>
                {tests.map((t, i) => (
                  <div key={i} className="px-6 py-3 grid grid-cols-4 gap-4 items-center hover:bg-zinc-50">
                    <div className="text-xs text-zinc-700 font-medium">{t.name}</div>
                    <div className="text-xs font-mono text-zinc-500">{t.spec}</div>
                    <div className="text-xs font-mono font-semibold text-zinc-900">{t.measured}</div>
                    <div>
                      <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200 font-mono">✓ PASS</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Receiver notes */}
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-zinc-900 mb-4">Receiver Notes</h3>
              <textarea
                defaultValue="Delivery arrived on schedule. Tank TK-4921 in good condition. Product meets all specifications. Cryogenic offloading completed without incident. Ready for utilization in concrete batching."
                className="w-full px-3 py-2 text-sm border border-zinc-300 rounded bg-white text-zinc-700 focus:outline-none focus:border-[#15572A] transition-colors h-24 resize-none"
              />
              <div className="mt-3 flex gap-3">
                <Btn variant="danger" onClick={() => { setDisputed(true); navigate('dispute-resolution'); }}>
                  Raise dispute
                </Btn>
                <Btn onClick={() => setAccepted(true)}>
                  Accept delivery & release payment ✓
                </Btn>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Batch Details</div>
              <div className="space-y-2.5 text-xs">
                {[
                  { k: 'Batch ID', v: 'CC-B-2026-09-0847' },
                  { k: 'Order ID', v: 'CC-O-9012' },
                  { k: 'Product', v: 'Industrial Grade CO₂' },
                  { k: 'Net delivered', v: '499.4 tonnes' },
                  { k: 'CO₂ purity', v: '99.63% vol' },
                  { k: 'Delivery date', v: 'Sep 21, 2026' },
                  { k: 'Analysis lab', v: 'Bureau Veritas' },
                  { k: 'Standard', v: 'EN 13279' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between border-b border-zinc-100 pb-1.5 last:border-0">
                    <span className="text-zinc-500">{row.k}</span>
                    <span className="font-mono text-zinc-900">{row.v}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">On Acceptance</div>
              <div className="space-y-2 text-xs text-zinc-600 leading-relaxed">
                <div>• CO₂ Digital Passport is issued on the platform</div>
                <div>• Payment funds released to seller (2 business days)</div>
                <div>• Batch record locked for MRV reporting</div>
                <div>• Impact metrics updated in your dashboard</div>
              </div>
              <button
                onClick={() => navigate('digital-passport')}
                className="mt-3 text-xs text-[#15572A] hover:underline"
              >
                Preview CO₂ Digital Passport →
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
