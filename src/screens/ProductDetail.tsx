import { useApp } from '../context';
import { Card, Badge, Btn, ScorePill, ProgressBar } from '../components/ui';
import Nav from '../components/Nav';

const specs = [
  { label: 'CO₂ Purity', value: '99.51% vol minimum', highlight: true },
  { label: 'Physical state', value: 'Liquid (cryogenic)' },
  { label: 'Temperature', value: '-20 °C (storage & delivery)' },
  { label: 'Pressure', value: '18.5 bar(g)' },
  { label: 'CO₂ Source', value: 'Cement kiln flue gas — post-combustion amine capture' },
  { label: 'Annual volume', value: '85,000 tonnes / year' },
  { label: 'Minimum order', value: '50 tonnes' },
  { label: 'Delivery terms', value: 'DAP (Delivered at Place) — Incoterms 2020' },
  { label: 'Lead time', value: '5 business days from order confirmation' },
  { label: 'Available from', value: 'October 1, 2026' },
  { label: 'Max delivery radius', value: '800 km from Heidelberg' },
];

const contaminants = [
  { name: 'H₂O (water)', max: '10 ppm', typical: '4–6 ppm', status: 'pass' },
  { name: 'O₂ (oxygen)', max: '5 ppm', typical: '1–2 ppm', status: 'pass' },
  { name: 'SO₂ (sulfur dioxide)', max: '0.1 ppm', typical: '<0.05 ppm', status: 'pass' },
  { name: 'NOₓ (nitrogen oxides)', max: '2.5 ppm', typical: '0.8–1.2 ppm', status: 'pass' },
  { name: 'CO (carbon monoxide)', max: '10 ppm', typical: '3–5 ppm', status: 'pass' },
  { name: 'H₂S (hydrogen sulfide)', max: '0.1 ppm', typical: '<0.05 ppm', status: 'pass' },
  { name: 'NH₃ (ammonia)', max: '2.5 ppm', typical: '0.3–0.5 ppm', status: 'pass' },
  { name: 'Total hydrocarbons', max: '50 ppm', typical: '12–18 ppm', status: 'pass' },
];

export default function ProductDetail() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <button onClick={() => navigate('marketplace')} className="text-sm text-zinc-500 hover:text-zinc-900 mb-6 block">← Back to marketplace</button>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Header */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl font-semibold text-zinc-900" style={{ fontFamily: 'var(--font-heading)' }}>Industrial Grade CO₂ — Liquid</h1>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="green">VERIFIED</Badge>
                    <Badge variant="blue">ISO 9001</Badge>
                    <Badge variant="outline">ISCC PLUS</Badge>
                    <Badge variant="outline">EU ETS</Badge>
                  </div>
                  <div className="text-sm text-zinc-500">
                    Listing ID: <span className="font-mono">CC-L-4820</span> · Heidelberg Materials AG · Heidelberg, Germany
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-semibold text-zinc-900 font-mono">$89</div>
                  <div className="text-xs text-zinc-400">per tonne ex-works</div>
                  <div className="text-xs text-zinc-500 mt-1">Est. delivered: <span className="font-mono font-medium">$112/t</span></div>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-zinc-100">
                <Btn onClick={() => navigate('pricing-breakdown')}>View full pricing breakdown</Btn>
                <Btn variant="outline" onClick={() => navigate('quote-order')}>Request quote</Btn>
                <Btn variant="ghost" onClick={() => navigate('supplier-details')}>View supplier →</Btn>
              </div>
            </Card>

            {/* Specs */}
            <Card className="overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100">
                <h3 className="text-sm font-semibold text-zinc-900">CO₂ Product Specifications</h3>
              </div>
              <div className="divide-y divide-zinc-100">
                {specs.map((s, i) => (
                  <div key={i} className={`px-6 py-3 flex items-center justify-between ${s.highlight ? 'bg-green-50/50' : ''}`}>
                    <span className="text-xs text-zinc-500">{s.label}</span>
                    <span className={`text-xs font-medium font-mono ${s.highlight ? 'text-green-800' : 'text-zinc-900'}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contaminant analysis */}
            <Card className="overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">Contaminant Analysis</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Third-party analysis — Bureau Veritas, Sep 2026 · EN 13279 standard</p>
                </div>
                <Badge variant="green">ALL PASS</Badge>
              </div>
              <div className="divide-y divide-zinc-100">
                {contaminants.map((c, i) => (
                  <div key={i} className="px-6 py-3 grid grid-cols-4 gap-4 items-center">
                    <span className="text-xs text-zinc-700 font-medium">{c.name}</span>
                    <span className="text-xs text-zinc-400 font-mono">Max: {c.max}</span>
                    <span className="text-xs text-zinc-600 font-mono">Typical: {c.typical}</span>
                    <div className="flex justify-end">
                      <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200 font-mono">✓ PASS</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Certifications */}
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-zinc-900 mb-4">Certifications &amp; Documentation</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'ISO 9001:2015 Certificate', issuer: 'TÜV SÜD', date: '2027-03-15' },
                  { name: 'ISO 14001:2015 Certificate', issuer: 'Bureau Veritas', date: '2027-03-15' },
                  { name: 'ISCC PLUS Chain of Custody', issuer: 'ISCC System GmbH', date: '2026-11-30' },
                  { name: 'EU ETS Installation Permit', issuer: 'German Federal Authority', date: '2027-01-01' },
                  { name: 'EIGA Doc 70 Compliance', issuer: 'EIGA', date: '2027-06-01' },
                  { name: 'Gas Analysis Report', issuer: 'Bureau Veritas', date: 'Sep 2026' },
                ].map((cert, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 border border-zinc-200 rounded hover:border-zinc-300 transition-colors cursor-pointer">
                    <div className="text-lg">📄</div>
                    <div>
                      <div className="text-xs font-medium text-zinc-900">{cert.name}</div>
                      <div className="text-xs text-zinc-400 mt-0.5">{cert.issuer} · {cert.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Supplier Scores</div>
              <div className="space-y-3.5">
                <ScorePill label="Commercial Score" score={82} />
                <ScorePill label="Climate Score" score={74} />
                <ScorePill label="Compliance Score" score={76} />
                <ScorePill label="Delivery Reliability" score={98} />
              </div>
            </Card>

            <Card className="p-5 bg-[#15572A] border-[#15572A]">
              <div className="text-xs font-semibold text-green-200 uppercase tracking-widest mb-3">Quick order</div>
              <div className="mb-3">
                <label className="text-xs text-green-300 mb-1 block">Quantity (tonnes)</label>
                <input
                  type="number"
                  defaultValue="500"
                  className="w-full px-3 py-2 text-sm border border-green-700 rounded bg-green-900/50 text-white placeholder-green-400 focus:outline-none focus:border-green-300"
                />
              </div>
              <div className="border-t border-green-700 pt-3 mb-4">
                <div className="flex justify-between text-sm text-green-200 mb-1">
                  <span>500 t × $89/t ex-works</span>
                  <span className="font-mono">$44,500</span>
                </div>
                <div className="flex justify-between text-xs text-green-300 mb-1">
                  <span>Est. logistics (road, 600 km)</span>
                  <span className="font-mono">$11,500</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white border-t border-green-700 pt-2 mt-2">
                  <span>Estimated total</span>
                  <span className="font-mono">$56,000</span>
                </div>
              </div>
              <button
                onClick={() => navigate('quote-order')}
                className="w-full py-2.5 bg-white text-[#15572A] text-sm font-semibold rounded hover:bg-green-50 transition-colors"
              >
                Request formal quote →
              </button>
            </Card>

            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Digital Passport</div>
              <p className="text-xs text-zinc-500 mb-3 leading-relaxed">Each delivered batch comes with an immutable CO₂ Digital Passport recording purity, contaminants, chain of custody, and certification.</p>
              <button onClick={() => navigate('digital-passport')} className="text-xs text-[#15572A] hover:underline">
                View sample passport →
              </button>
            </Card>

            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="text-xs text-amber-800 leading-relaxed">
                <strong>Note:</strong> This listing covers physical CO₂ molecules only. Climate impact reporting and MRV documentation are provided separately and do not constitute carbon credit issuance.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
