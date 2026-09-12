import { useState } from 'react';
import { useApp } from '../context';
import { Card, Badge, Btn } from '../components/ui';
import Nav from '../components/Nav';

export default function Payment() {
  const { navigate } = useApp();
  const [method, setMethod] = useState<'bank' | 'lc' | 'escrow'>('bank');
  const [paid, setPaid] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <button onClick={() => navigate('contract')} className="text-sm text-zinc-500 hover:text-zinc-900 mb-6 block">← Back to contract</button>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Payment</h1>
            <p className="text-zinc-500 text-sm">Invoice CC-INV-2026-09-0847 · Contract CC-C-2026-09-0847</p>
          </div>
          <Badge variant={paid ? 'green' : 'yellow'}>{paid ? 'PAID' : 'PAYMENT PENDING'}</Badge>
        </div>

        {paid ? (
          <Card className="p-10 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl text-green-700">✓</span>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Payment Received</h2>
            <p className="text-zinc-500 text-sm mb-1">$56,890 · Wire transfer confirmed</p>
            <p className="text-zinc-500 text-sm mb-6">Funds held in escrow until delivery confirmed.</p>
            <div className="flex justify-center gap-3">
              <Btn onClick={() => navigate('logistics')}>Track logistics →</Btn>
              <Btn variant="outline" onClick={() => navigate('buyer-dashboard')}>Dashboard</Btn>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              {/* Invoice summary */}
              <Card className="p-6">
                <div className="text-sm font-semibold text-zinc-900 mb-4">Invoice Summary</div>
                <div className="space-y-2 text-sm">
                  {[
                    ['Product', 'Industrial Grade CO₂ (liquid) — 500 t'],
                    ['Supplier', 'Heidelberg Materials AG'],
                    ['Ex-works (500 t × $89)', '$44,500.00'],
                    ['Logistics (estimated)', '$11,500.00'],
                    ['Platform fee (2%)', '$890.00'],
                    ['Subtotal', '$56,890.00'],
                    ['VAT / GST', '$0.00 (B2B cross-border, zero-rated)'],
                  ].map(([k, v], i) => (
                    <div key={i} className={`flex justify-between py-2 border-b border-zinc-100 last:border-0 ${k === 'Subtotal' ? 'font-semibold text-zinc-900' : 'text-zinc-600'}`}>
                      <span>{k}</span>
                      <span className="font-mono">{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3 text-lg font-semibold text-zinc-900 border-t-2 border-zinc-300 mt-2">
                    <span>Total Due</span>
                    <span className="font-mono text-[#15572A]">$56,890.00 USD</span>
                  </div>
                  <div className="text-xs text-zinc-400">Due date: October 12, 2026 (Net 30 from contract execution)</div>
                </div>
              </Card>

              {/* Payment method */}
              <Card className="p-6">
                <div className="text-sm font-semibold text-zinc-900 mb-4">Payment Method</div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { id: 'bank' as const, label: 'Bank Wire Transfer', sub: 'SWIFT / SEPA' },
                    { id: 'lc' as const, label: 'Letter of Credit', sub: 'Confirmed LC (irrevocable)' },
                    { id: 'escrow' as const, label: 'Platform Escrow', sub: 'Funds released on delivery' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setMethod(opt.id)}
                      className={`p-3 text-left rounded border-2 transition-all ${method === opt.id ? 'border-[#15572A] bg-green-50' : 'border-zinc-200 hover:border-zinc-300'}`}
                    >
                      <div className="text-xs font-semibold text-zinc-900">{opt.label}</div>
                      <div className="text-xs text-zinc-400 mt-0.5">{opt.sub}</div>
                    </button>
                  ))}
                </div>

                {method === 'bank' && (
                  <div className="bg-zinc-50 border border-zinc-200 rounded p-4 space-y-2 text-sm">
                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Bank Transfer Instructions</div>
                    {[
                      ['Beneficiary', 'Carbon-Connect Payments Ltd.'],
                      ['Bank', 'Deutsche Bank AG, Frankfurt'],
                      ['IBAN', 'DE89 3704 0044 0532 0130 00'],
                      ['BIC / SWIFT', 'DEUTDEDB'],
                      ['Amount', 'USD 56,890.00'],
                      ['Reference', 'CC-INV-2026-09-0847'],
                    ].map(([k, v], i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-zinc-500 text-xs">{k}</span>
                        <span className="font-mono text-xs text-zinc-900">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                {method === 'escrow' && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-4 text-xs text-blue-800">
                    <strong>Platform Escrow:</strong> Funds are held by Carbon-Connect Payments until Buyer confirms delivery and quality acceptance. Funds are automatically released to Seller within 2 business days of acceptance, or per dispute resolution terms.
                  </div>
                )}

                {method === 'lc' && (
                  <div className="bg-zinc-50 border border-zinc-200 rounded p-4 text-xs text-zinc-700">
                    <strong>Letter of Credit:</strong> Submit your confirmed irrevocable LC details via secure upload below. Our trade finance team will verify within 24 hours.
                    <button className="mt-3 block w-full py-2 border border-zinc-300 rounded text-zinc-600 hover:border-[#15572A] transition-colors">
                      Upload LC document
                    </button>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card className="p-5">
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Payment Status</div>
                <div className="space-y-3">
                  {[
                    { l: 'Contract executed', done: true },
                    { l: 'Invoice issued', done: true },
                    { l: 'Payment received', done: paid },
                    { l: 'Funds to escrow', done: false },
                    { l: 'Dispatch authorised', done: false },
                    { l: 'Delivery confirmed', done: false },
                    { l: 'Funds released', done: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] border ${s.done ? 'bg-[#15572A] border-[#15572A] text-white' : 'bg-white border-zinc-300'}`}>
                        {s.done ? '✓' : ''}
                      </div>
                      <span className={`text-xs ${s.done ? 'text-zinc-700' : 'text-zinc-400'}`}>{s.l}</span>
                    </div>
                  ))}
                </div>
                <Btn className="w-full mt-5 justify-center" onClick={() => setPaid(true)}>
                  Confirm payment →
                </Btn>
              </Card>

              <Card className="p-5">
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Escrow Protection</div>
                <div className="text-xs text-zinc-600 leading-relaxed">
                  Buyer funds are protected in escrow until delivery is confirmed and quality checks pass. Funds are only released on Buyer acceptance.
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
