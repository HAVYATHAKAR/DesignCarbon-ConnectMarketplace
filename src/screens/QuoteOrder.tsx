import { useState } from 'react';
import { useApp } from '../context';
import { Card, Badge, Btn, Input, Select } from '../components/ui';
import Nav from '../components/Nav';

export default function QuoteOrder() {
  const { navigate } = useApp();
  const [mode, setMode] = useState<'quote' | 'order'>('quote');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F8F6]">
        <Nav />
        <div className="max-w-xl mx-auto px-6 py-24 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl text-green-700">✓</span>
          </div>
          <h2 className="text-2xl font-semibold text-zinc-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            {mode === 'quote' ? 'Quote Request Sent' : 'Order Placed'}
          </h2>
          <p className="text-zinc-500 mb-2">Reference: <span className="font-mono font-medium">CC-Q-{Math.floor(Math.random() * 9000) + 1000}</span></p>
          <p className="text-zinc-500 text-sm mb-8">
            {mode === 'quote'
              ? 'Heidelberg Materials AG has been notified and will respond within 24 hours.'
              : 'Your order has been placed. Proceed to contract signing to complete the transaction.'}
          </p>
          <div className="flex justify-center gap-3">
            {mode === 'quote'
              ? <Btn onClick={() => navigate('buyer-dashboard')}>Back to dashboard</Btn>
              : <Btn onClick={() => navigate('contract')}>Sign contract →</Btn>
            }
            <Btn variant="outline" onClick={() => setSubmitted(false)}>View details</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <button onClick={() => navigate('product-detail')} className="text-sm text-zinc-500 hover:text-zinc-900 mb-6 block">← Back to product</button>

        <h1 className="text-2xl font-semibold text-zinc-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          {mode === 'quote' ? 'Request Quote' : 'Place Order'}
        </h1>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('quote')}
            className={`px-4 py-2 text-sm font-medium rounded border transition-all ${mode === 'quote' ? 'bg-[#15572A] text-white border-[#15572A]' : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500'}`}
          >
            Request Quote (RFQ)
          </button>
          <button
            onClick={() => setMode('order')}
            className={`px-4 py-2 text-sm font-medium rounded border transition-all ${mode === 'order' ? 'bg-[#15572A] text-white border-[#15572A]' : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500'}`}
          >
            Direct Order
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            {/* Product summary */}
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-900">Industrial Grade CO₂ — Liquid</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Heidelberg Materials AG · CC-L-4820</div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="green">VERIFIED</Badge>
                  <Badge variant="outline">ISO 9001</Badge>
                </div>
              </div>
            </Card>

            {/* Order details */}
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-zinc-900 mb-5">{mode === 'quote' ? 'Quote Request Details' : 'Order Details'}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Quantity (tonnes)</label>
                    <Input value="500" />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Required delivery date</label>
                    <Input value="2026-10-15" type="date" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Delivery address</label>
                  <Input value="CarbonCure Plant, 1465 Hammonds Plains Rd, Halifax, NS B4B 1P4, Canada" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Preferred delivery mode</label>
                    <Select options={['Cryogenic road tanker', 'ISO tank container', 'Any']} value="Cryogenic road tanker" />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Payment terms</label>
                    <Select options={['Net 30', 'Net 15', 'Prepayment', 'Letter of Credit']} value="Net 30" />
                  </div>
                </div>
                {mode === 'quote' && (
                  <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Target price (optional)</label>
                    <div className="flex gap-2 items-center">
                      <Input value="105" className="w-32" />
                      <span className="text-sm text-zinc-500">USD / tonne delivered</span>
                    </div>
                  </div>
                )}
                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Additional requirements / notes</label>
                  <textarea
                    defaultValue="CO₂ will be injected into ready-mix concrete. ISCC PLUS chain-of-custody required for MRV reporting. Batch certificate required with each delivery."
                    className="w-full px-3 py-2 text-sm border border-zinc-300 rounded bg-white focus:outline-none focus:border-[#15572A] transition-colors h-20 resize-none text-zinc-700"
                  />
                </div>

                <div className="border-t border-zinc-100 pt-4">
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Required Documents from Seller</div>
                  <div className="space-y-2">
                    {['Batch purity certificate (per delivery)', 'Chain-of-custody documentation (ISCC PLUS)', 'Third-party gas analysis report', 'Delivery note / CMR waybill'].map(d => (
                      <label key={d} className="flex items-center gap-2 text-xs text-zinc-600 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-zinc-300" />
                        {d}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Price summary */}
          <div className="space-y-4">
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Price Summary</div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span>500 t × $89/t</span><span className="font-mono">$44,500</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Logistics est.</span><span className="font-mono">$11,500</span>
                </div>
                <div className="flex justify-between text-zinc-500 text-xs border-b border-zinc-100 pb-2">
                  <span>Platform fee (2%)</span><span className="font-mono">$890</span>
                </div>
                <div className="flex justify-between font-semibold text-zinc-900">
                  <span>Total estimated</span><span className="font-mono text-[#15572A]">$56,890</span>
                </div>
                <div className="text-xs text-zinc-400">Prices confirmed in seller's formal quote response.</div>
              </div>

              <div className="mt-5 space-y-2">
                <Btn className="w-full justify-center" onClick={() => setSubmitted(true)}>
                  {mode === 'quote' ? 'Send quote request' : 'Place order'} →
                </Btn>
                <Btn variant="outline" className="w-full justify-center" onClick={() => navigate('pricing-breakdown')}>
                  Review pricing detail
                </Btn>
              </div>
            </Card>

            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">What happens next</div>
              <div className="space-y-2.5 text-xs text-zinc-600">
                {(mode === 'quote' ? [
                  '1. RFQ sent to Heidelberg Materials AG',
                  '2. Seller reviews and responds (≤24h)',
                  '3. You receive formal quote by email',
                  '4. Accept quote to place order',
                  '5. Contract signing and payment',
                ] : [
                  '1. Order confirmed to seller',
                  '2. Proceed to contract signing',
                  '3. Payment processed on platform',
                  '4. Seller dispatches; logistics tracked',
                  '5. Delivery, quality check, CO₂ Passport issued',
                ]).map((s, i) => <div key={i} className="leading-relaxed">{s}</div>)}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
