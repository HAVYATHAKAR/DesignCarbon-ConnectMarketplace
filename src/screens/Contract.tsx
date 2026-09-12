import { useState } from 'react';
import { useApp } from '../context';
import { Card, Badge, Btn } from '../components/ui';
import Nav from '../components/Nav';

export default function Contract() {
  const { navigate } = useApp();
  const [signed, setSigned] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <button onClick={() => navigate('quote-order')} className="text-sm text-zinc-500 hover:text-zinc-900 mb-6 block">← Back to order</button>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Sales Contract</h1>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 text-sm">Contract ID: </span>
              <span className="font-mono text-sm text-zinc-700">CC-C-2026-09-0847</span>
              <Badge variant={signed ? 'green' : 'yellow'}>{signed ? 'FULLY EXECUTED' : 'PENDING SIGNATURE'}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Btn variant="outline">Download PDF</Btn>
            {!signed && <Btn onClick={() => setSigned(true)}>Sign contract →</Btn>}
            {signed && <Btn onClick={() => navigate('payment')}>Proceed to payment →</Btn>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card className="p-8">
              {/* Contract header */}
              <div className="text-center border-b border-zinc-200 pb-6 mb-6">
                <div className="text-xs font-mono text-zinc-400 mb-2">CARBON-CONNECT PLATFORM · INDUSTRIAL CO₂ SUPPLY AGREEMENT</div>
                <h2 className="text-lg font-semibold text-zinc-900" style={{ fontFamily: 'var(--font-heading)' }}>CO₂ Physical Supply Agreement</h2>
                <div className="text-sm text-zinc-500 mt-1">Version 2.1 · Carbon-Connect Standard Terms</div>
              </div>

              {/* Parties */}
              <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-zinc-100">
                <div>
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Seller</div>
                  <div className="text-sm font-semibold text-zinc-900">Heidelberg Materials AG</div>
                  <div className="text-xs text-zinc-500 mt-1">Berliner Str. 6, 69120 Heidelberg, Germany</div>
                  <div className="text-xs text-zinc-500">VAT: DE811708516</div>
                  <div className="text-xs text-zinc-500">Represented by: Klaus Weber, CO₂ Sales Manager</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Buyer</div>
                  <div className="text-sm font-semibold text-zinc-900">CarbonCure Technologies Inc.</div>
                  <div className="text-xs text-zinc-500 mt-1">1465 Hammonds Plains Rd, Halifax, NS B4B 1P4, Canada</div>
                  <div className="text-xs text-zinc-500">BN: 123456789</div>
                  <div className="text-xs text-zinc-500">Represented by: Dr. Amara Osei-Mensah, Head of Procurement</div>
                </div>
              </div>

              {/* Contract terms */}
              <div className="space-y-5 text-sm text-zinc-700">
                {[
                  {
                    title: '1. Subject of Contract',
                    body: 'Seller agrees to supply, and Buyer agrees to purchase, physical liquid CO₂ (hereinafter "the Product") as specified in Schedule A of this Agreement. This contract governs the physical delivery of CO₂ molecules only and does not constitute the transfer of any carbon credits, voluntary emissions units (VCUs), guarantees of origin (GOs), or other environmental financial instruments.',
                  },
                  {
                    title: '2. Product Specifications',
                    table: [
                      ['Grade', 'Industrial Grade CO₂ (liquid)'],
                      ['Minimum purity', '99.51% vol CO₂'],
                      ['Physical state', 'Liquid (cryogenic, -20°C, 18.5 bar)'],
                      ['Max H₂O', '10 ppm'],
                      ['Max SO₂', '0.1 ppm'],
                      ['Standard', 'EN 13279 / EIGA Doc 70'],
                      ['Certifications', 'ISO 9001, ISCC PLUS, EU ETS'],
                    ],
                  },
                  {
                    title: '3. Quantity and Delivery',
                    body: 'Total quantity: 500 (five hundred) metric tonnes, tolerance ±2%. Delivery: DAP CarbonCure Plant, Halifax, Nova Scotia, Canada (Incoterms 2020). Delivery date: October 15, 2026 ±3 business days. Mode: Cryogenic road tanker via approved logistics partner.',
                  },
                  {
                    title: '4. Price and Payment',
                    table: [
                      ['Ex-works price', '$89.00 / tonne'],
                      ['Logistics', '$23.00 / tonne (est.)'],
                      ['Platform fee', '$1.78 / tonne'],
                      ['Total delivered est.', '$113.78 / tonne'],
                      ['Total order value', '$56,890'],
                      ['Payment terms', 'Net 30 from invoice date'],
                      ['Currency', 'USD'],
                    ],
                  },
                  {
                    title: '5. Quality Assurance and Verification',
                    body: 'Seller shall provide a third-party batch purity certificate (Bureau Veritas or equivalent) and ISCC PLUS chain-of-custody documentation with each delivery. Buyer has the right to reject delivery if purity falls below 99.51% vol. Samples shall be retained by both parties for 90 days. A CO₂ Digital Passport will be issued on the Carbon-Connect platform upon confirmed delivery.',
                  },
                  {
                    title: '6. CO₂ Passport and MRV',
                    body: 'An immutable CO₂ Digital Passport will be issued on the Carbon-Connect platform recording: batch ID, purity, contaminants, source, chain of custody, logistics data, and utilization site. Utilization reporting for MRV purposes is the Buyer\'s responsibility. The platform records do not constitute carbon credit issuance or verification.',
                  },
                  {
                    title: '7. Dispute Resolution',
                    body: 'Disputes shall first be submitted to Carbon-Connect\'s Dispute Resolution Centre for mediation (up to 30 days). Unresolved disputes shall be referred to ICC arbitration under ICC Rules in Geneva, Switzerland. Governing law: Swiss law.',
                  },
                ].map((section, i) => (
                  <div key={i} className="border-b border-zinc-100 pb-5 last:border-0">
                    <div className="text-sm font-semibold text-zinc-900 mb-2">{section.title}</div>
                    {section.body && <div className="text-sm text-zinc-600 leading-relaxed">{section.body}</div>}
                    {section.table && (
                      <table className="w-full mt-2">
                        <tbody>
                          {section.table.map(([k, v], j) => (
                            <tr key={j} className="border-b border-zinc-100 last:border-0">
                              <td className="py-1.5 text-xs text-zinc-500 w-48">{k}</td>
                              <td className="py-1.5 text-xs font-mono text-zinc-900">{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                ))}
              </div>

              {/* Signature area */}
              <div className="mt-8 pt-6 border-t-2 border-zinc-200">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { party: 'Seller', name: 'Klaus Weber', org: 'Heidelberg Materials AG', date: '2026-09-12', signed: true },
                    { party: 'Buyer', name: 'Dr. Amara Osei-Mensah', org: 'CarbonCure Technologies Inc.', date: signed ? '2026-09-12' : '—', signed },
                  ].map((sig, i) => (
                    <div key={i}>
                      <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">{sig.party}</div>
                      <div className={`h-12 border-b-2 border-zinc-300 mb-2 flex items-end pb-1 ${sig.signed ? 'border-[#15572A]' : ''}`}>
                        {sig.signed && (
                          <span className="text-[#15572A] italic" style={{ fontFamily: 'Georgia, serif', fontSize: '18px' }}>
                            {sig.name}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-900 font-medium">{sig.name}</div>
                      <div className="text-xs text-zinc-400">{sig.org}</div>
                      <div className="text-xs text-zinc-400 mt-0.5 font-mono">{sig.date}</div>
                      {sig.signed && <Badge variant="green" className="mt-1">SIGNED</Badge>}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Contract Status</div>
              <div className="space-y-3">
                {[
                  { label: 'Seller signature', done: true, date: 'Sep 12, 2026' },
                  { label: 'Buyer signature', done: signed, date: signed ? 'Sep 12, 2026' : 'Pending' },
                  { label: 'Platform countersigned', done: signed, date: signed ? 'Sep 12, 2026' : 'Auto on execution' },
                  { label: 'Contract ID assigned', done: true, date: 'CC-C-2026-09-0847' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs border ${s.done ? 'bg-[#15572A] border-[#15572A] text-white' : 'bg-white border-zinc-300 text-zinc-400'}`}>
                      {s.done ? '✓' : '○'}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-zinc-900">{s.label}</div>
                      <div className="text-xs text-zinc-400 font-mono">{s.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              {!signed && (
                <Btn className="w-full mt-5 justify-center" onClick={() => setSigned(true)}>
                  Sign contract →
                </Btn>
              )}
              {signed && (
                <Btn className="w-full mt-5 justify-center" onClick={() => navigate('payment')}>
                  Proceed to payment →
                </Btn>
              )}
            </Card>

            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="text-xs text-amber-800 leading-relaxed">
                <strong>Important:</strong> This contract governs the sale of physical CO₂ molecules only. No carbon credits or environmental certificates are transferred under this agreement.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
