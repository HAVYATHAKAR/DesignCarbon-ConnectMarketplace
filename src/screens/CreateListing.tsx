import { useState } from 'react';
import { useApp } from '../context';
import { Card, Btn, SectionHeader, Input, Select, FormRow, Badge } from '../components/ui';
import Nav from '../components/Nav';

const steps = ['CO₂ Specs', 'Certifications', 'Pricing', 'Logistics', 'Review'];

export default function CreateListing() {
  const { navigate } = useApp();
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <SectionHeader
          title="Create CO₂ Listing"
          sub="Define your CO₂ product specifications, pricing and logistics terms."
          action={<Btn variant="outline" onClick={() => navigate('seller-dashboard')}>← Back to dashboard</Btn>}
        />

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-8 max-w-2xl">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => setStep(i)}
                className={`flex flex-col items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors ${
                  step > i ? 'bg-[#15572A] border-[#15572A] text-white' :
                  step === i ? 'bg-white border-[#15572A] text-[#15572A]' :
                  'bg-white border-zinc-300 text-zinc-400'
                }`}>
                  {step > i ? '✓' : i + 1}
                </div>
                <span className={`text-xs mt-1 whitespace-nowrap ${step >= i ? 'text-zinc-700' : 'text-zinc-400'}`}>{s}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-1 mb-4 ${step > i ? 'bg-[#15572A]' : 'bg-zinc-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card>
              {step === 0 && (
                <div>
                  <div className="px-8 py-5 border-b border-zinc-100">
                    <h3 className="text-sm font-semibold text-zinc-900">CO₂ Specifications</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Physical and chemical properties of your CO₂ product.</p>
                  </div>
                  <div className="px-8 py-2">
                    <FormRow label="Product name / grade">
                      <Input value="Industrial Grade CO₂ — Heidelberg Plant" />
                    </FormRow>
                    <FormRow label="CO₂ purity (% vol)" hint="Minimum guaranteed purity">
                      <div className="flex gap-2 items-center">
                        <Input value="99.51" className="w-28" />
                        <span className="text-sm text-zinc-500">% vol minimum</span>
                      </div>
                    </FormRow>
                    <FormRow label="Physical state">
                      <Select options={['Liquid (cryogenic)', 'Gas (compressed)', 'Supercritical']} value="Liquid (cryogenic)" />
                    </FormRow>
                    <FormRow label="Pressure" hint="At point of delivery">
                      <div className="flex gap-2">
                        <Input value="18.5" className="w-28" />
                        <Select options={['bar(g)', 'bar(a)', 'psi', 'MPa']} value="bar(g)" />
                      </div>
                    </FormRow>
                    <FormRow label="Temperature" hint="Storage / delivery temperature">
                      <div className="flex gap-2">
                        <Input value="-20" className="w-28" />
                        <Select options={['°C', '°F', 'K']} value="°C" />
                      </div>
                    </FormRow>
                    <div className="py-4 border-b border-zinc-100">
                      <div className="text-sm font-medium text-zinc-700 mb-3">Contaminant limits (ppm vol)</div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { name: 'H₂O (water)', val: '10' },
                          { name: 'O₂ (oxygen)', val: '5' },
                          { name: 'SO₂ (sulfur dioxide)', val: '0.1' },
                          { name: 'NOₓ (nitrogen oxides)', val: '2.5' },
                          { name: 'CO (carbon monoxide)', val: '10' },
                          { name: 'H₂S (hydrogen sulfide)', val: '0.1' },
                          { name: 'NH₃ (ammonia)', val: '2.5' },
                          { name: 'Total hydrocarbons', val: '50' },
                          { name: 'CH₄ (methane)', val: '20' },
                        ].map((c, i) => (
                          <div key={i}>
                            <label className="text-xs text-zinc-500 mb-1 block">{c.name}</label>
                            <div className="flex items-center gap-1">
                              <Input value={c.val} className="w-20" />
                              <span className="text-xs text-zinc-400">ppm</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <FormRow label="CO₂ source" hint="Industrial process generating this CO₂">
                      <Select options={['Cement kiln flue gas (captured)', 'Ammonia synthesis off-gas', 'Steel blast furnace', 'Power plant flue gas', 'Ethylene oxide process', 'Fermentation / biogas']} value="Cement kiln flue gas (captured)" />
                    </FormRow>
                    <FormRow label="Annual volume available" hint="Firm supply commitment">
                      <div className="flex gap-2">
                        <Input value="85,000" className="w-32" />
                        <Select options={['tonnes/year', 'tonnes/month']} />
                      </div>
                    </FormRow>
                    <FormRow label="Availability" hint="Supply start date">
                      <div className="flex gap-3">
                        <Input value="2026-10-01" type="date" className="w-48" />
                        <span className="text-sm text-zinc-500 self-center">→</span>
                        <Input value="2027-09-30" type="date" className="w-48" />
                      </div>
                    </FormRow>
                    <FormRow label="Source location">
                      <Input value="Heidelberg Cement Plant, Baden-Württemberg, Germany (49.4°N 8.7°E)" />
                    </FormRow>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <div className="px-8 py-5 border-b border-zinc-100">
                    <h3 className="text-sm font-semibold text-zinc-900">Certifications &amp; Analysis</h3>
                  </div>
                  <div className="px-8 py-6 space-y-5">
                    {[
                      { name: 'EN 13279 / EIGA Doc 70 Quality Standard', uploaded: true },
                      { name: 'ISO 9001:2015 Quality Management Certificate', uploaded: true },
                      { name: 'ISCC PLUS Sustainability Certificate', uploaded: true },
                      { name: 'Third-party gas analysis report (< 90 days)', uploaded: false },
                      { name: 'Batch purity certificate (per delivery)', uploaded: false },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="text-sm text-zinc-700">{c.name}</div>
                        {c.uploaded
                          ? <Badge variant="green">✓ Uploaded</Badge>
                          : <button className="text-xs px-3 py-1.5 border border-zinc-300 rounded hover:border-[#15572A] text-zinc-500 hover:text-[#15572A] transition-colors">Upload PDF</button>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="px-8 py-5 border-b border-zinc-100">
                    <h3 className="text-sm font-semibold text-zinc-900">Pricing</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">All price components are displayed transparently to buyers. No hidden fees.</p>
                  </div>
                  <div className="px-8 py-2">
                    <FormRow label="Base price (ex-works)" hint="CO₂ production cost + margin">
                      <div className="flex gap-2 items-center">
                        <Input value="62.00" className="w-28" />
                        <span className="text-sm text-zinc-500">USD / tonne</span>
                      </div>
                    </FormRow>
                    <FormRow label="Liquefaction cost" hint="If applicable">
                      <div className="flex gap-2 items-center">
                        <Input value="12.50" className="w-28" />
                        <span className="text-sm text-zinc-500">USD / tonne</span>
                      </div>
                    </FormRow>
                    <FormRow label="Storage cost" hint="Tank / depot fee">
                      <div className="flex gap-2 items-center">
                        <Input value="4.00" className="w-28" />
                        <span className="text-sm text-zinc-500">USD / tonne</span>
                      </div>
                    </FormRow>
                    <FormRow label="Handling / loading" hint="Plant gate operations">
                      <div className="flex gap-2 items-center">
                        <Input value="3.50" className="w-28" />
                        <span className="text-sm text-zinc-500">USD / tonne</span>
                      </div>
                    </FormRow>
                    <FormRow label="Platform fee" hint="Carbon-Connect fee (auto-calculated)">
                      <div className="flex gap-2 items-center">
                        <Input value="1.70" className="w-28" />
                        <span className="text-sm text-zinc-400">USD / tonne (read-only)</span>
                      </div>
                    </FormRow>
                    <div className="py-4 border-t border-zinc-200 mt-2">
                      <div className="flex items-center justify-between text-sm font-semibold text-zinc-900">
                        <span>Ex-works total (excl. logistics)</span>
                        <span className="font-mono">$83.70 / tonne</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">Logistics costs are calculated separately by route and mode.</p>
                    </div>
                    <FormRow label="Pricing model">
                      <Select options={['Fixed price', 'Index-linked (EUA benchmark)', 'Negotiated / RFQ']} value="Fixed price" />
                    </FormRow>
                    <FormRow label="Minimum order quantity">
                      <div className="flex gap-2 items-center">
                        <Input value="50" className="w-28" />
                        <span className="text-sm text-zinc-500">tonnes</span>
                      </div>
                    </FormRow>
                    <FormRow label="Payment terms">
                      <Select options={['Net 30 (invoice)', 'Net 15', 'Prepayment', 'Letter of Credit', 'Open account']} value="Net 30 (invoice)" />
                    </FormRow>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="px-8 py-5 border-b border-zinc-100">
                    <h3 className="text-sm font-semibold text-zinc-900">Logistics Terms</h3>
                  </div>
                  <div className="px-8 py-2">
                    <FormRow label="Delivery terms (Incoterms 2020)">
                      <Select options={['EXW (Ex Works)', 'FCA (Free Carrier)', 'DAP (Delivered at Place)', 'DDP (Delivered Duty Paid)', 'FOB (tank truck)']} value="DAP (Delivered at Place)" />
                    </FormRow>
                    <FormRow label="Transport modes" hint="Select all applicable">
                      <div className="flex flex-wrap gap-2">
                        {['Cryogenic road tanker', 'ISO tank container', 'Rail tank car', 'Pipeline', 'Vessel / ISO tank'].map(m => (
                          <label key={m} className="flex items-center gap-2 text-xs text-zinc-600 cursor-pointer">
                            <input type="checkbox" defaultChecked={m.includes('Cryogenic') || m.includes('ISO tank container')} className="rounded border-zinc-300" />
                            {m}
                          </label>
                        ))}
                      </div>
                    </FormRow>
                    <FormRow label="Max delivery radius" hint="Leave blank for any distance">
                      <div className="flex gap-2 items-center">
                        <Input value="800" className="w-28" />
                        <Select options={['km', 'miles']} />
                      </div>
                    </FormRow>
                    <FormRow label="Lead time" hint="From order confirmation to dispatch">
                      <div className="flex gap-2 items-center">
                        <Input value="5" className="w-20" />
                        <span className="text-sm text-zinc-500">business days</span>
                      </div>
                    </FormRow>
                    <FormRow label="Logistics partner">
                      <Select options={['Self-managed', 'Messer Transport GmbH', 'Linde Gas Logistics', 'Air Liquide Transport', 'Third-party (buyer arranges)']} value="Messer Transport GmbH" />
                    </FormRow>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className="px-8 py-5 border-b border-zinc-100">
                    <h3 className="text-sm font-semibold text-zinc-900">Review &amp; Publish</h3>
                  </div>
                  <div className="px-8 py-6 space-y-4">
                    {[
                      { label: 'Grade', v: 'Industrial Grade CO₂ (99.51% min)' },
                      { label: 'Physical state', v: 'Liquid (cryogenic, -20°C, 18.5 bar)' },
                      { label: 'Volume', v: '85,000 t/year — from 2026-10-01' },
                      { label: 'Source', v: 'Cement kiln flue gas capture' },
                      { label: 'Location', v: 'Heidelberg, Baden-Württemberg, Germany' },
                      { label: 'Ex-works price', v: '$83.70 / tonne' },
                      { label: 'Delivery terms', v: 'DAP — road tanker or ISO container' },
                      { label: 'Certifications', v: 'ISO 9001, ISCC PLUS, EIGA Doc 70' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0 text-sm">
                        <span className="text-zinc-500">{row.label}</span>
                        <span className="text-zinc-900 font-medium">{row.v}</span>
                      </div>
                    ))}
                    <div className="mt-4 bg-green-50 border border-green-200 rounded p-4 text-xs text-green-800">
                      Your listing will be reviewed by the Carbon-Connect quality team before going live. Expected review time: 1–2 business days.
                    </div>
                  </div>
                </div>
              )}

              <div className="px-8 py-5 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
                <button
                  onClick={() => step > 0 ? setStep(s => s - 1) : navigate('seller-dashboard')}
                  className="text-sm text-zinc-500 hover:text-zinc-900"
                >
                  ← Back
                </button>
                <div className="flex gap-2">
                  <Btn variant="outline">Save draft</Btn>
                  <Btn onClick={() => step < 4 ? setStep(s => s + 1) : navigate('seller-dashboard')}>
                    {step === 4 ? 'Submit for review' : 'Continue →'}
                  </Btn>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar hints */}
          <div className="space-y-4">
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">CO₂ Grade Reference</div>
              <div className="space-y-2.5">
                {[
                  { g: 'Food Grade', p: '≥ 99.9%', note: 'EIGA Doc 70 / FDA' },
                  { g: 'Industrial Grade', p: '≥ 99.5%', note: 'EN 13279' },
                  { g: 'Technical Grade', p: '≥ 98.0%', note: 'General industrial' },
                  { g: 'Captured (utilization)', p: '≥ 95.0%', note: 'Mineralization / fuels' },
                ].map((g, i) => (
                  <div key={i} className="text-xs border-b border-zinc-100 pb-2 last:border-0">
                    <div className="font-medium text-zinc-900">{g.g}</div>
                    <div className="text-zinc-500">Purity: <span className="font-mono">{g.p}</span> · {g.note}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Pricing Guidance</div>
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between"><span>Food grade</span><span className="font-mono">$130–180/t</span></div>
                <div className="flex justify-between"><span>Industrial grade</span><span className="font-mono">$75–110/t</span></div>
                <div className="flex justify-between"><span>Technical grade</span><span className="font-mono">$45–70/t</span></div>
                <div className="flex justify-between"><span>Captured CO₂</span><span className="font-mono">$50–85/t</span></div>
              </div>
              <div className="mt-3 text-xs text-zinc-400">Market prices as of Sep 2026. Logistics excluded.</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
