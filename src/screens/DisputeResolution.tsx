import { useState } from 'react';
import { useApp } from '../context';
import { Card, Badge, Btn, SectionHeader } from '../components/ui';
import Nav from '../components/Nav';

const timeline = [
  { date: 'Sep 21, 14:30', action: 'Dispute raised by buyer', actor: 'CarbonCure Technologies', status: 'done' },
  { date: 'Sep 21, 14:31', action: 'Dispute ID assigned — CC-D-2026-09-001', actor: 'Platform', status: 'done' },
  { date: 'Sep 21, 15:00', action: 'Notification sent to Heidelberg Materials AG', actor: 'Platform', status: 'done' },
  { date: 'Sep 22, 09:00', action: 'Seller response received', actor: 'Heidelberg Materials AG', status: 'active' },
  { date: 'Up to Sep 30', action: 'Carbon-Connect mediation (30-day window)', actor: 'Platform Mediator', status: 'pending' },
  { date: 'If unresolved', action: 'ICC arbitration — Geneva, Switzerland', actor: 'ICC', status: 'pending' },
];

export default function DisputeResolution() {
  const { navigate } = useApp();
  const [resolved, setResolved] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <SectionHeader
          title="Dispute Resolution Centre"
          sub="Dispute CC-D-2026-09-001 · Order CC-O-9012 · Filed Sep 21, 2026"
          action={<Badge variant={resolved ? 'green' : 'yellow'}>{resolved ? 'RESOLVED' : 'IN MEDIATION'}</Badge>}
        />

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Dispute summary */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm font-semibold text-zinc-900 mb-1">Dispute CC-D-2026-09-001</div>
                  <div className="flex gap-2">
                    <Badge variant="yellow">IN MEDIATION</Badge>
                    <Badge variant="outline">QUALITY DISPUTE</Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs border-t border-zinc-100 pt-4">
                {[
                  { k: 'Raised by', v: 'CarbonCure Technologies Inc.' },
                  { k: 'Against', v: 'Heidelberg Materials AG' },
                  { k: 'Order', v: 'CC-O-9012' },
                  { k: 'Dispute type', v: 'Quality — measured H₂O exceeds spec' },
                  { k: 'Amount in dispute', v: '$2,845 (quality penalty per contract)' },
                  { k: 'Status', v: 'Mediation — Platform Mediator assigned' },
                ].map((r, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-zinc-400 w-28 shrink-0">{r.k}</span>
                    <span className="text-zinc-900 font-medium">{r.v}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Buyer claim */}
            <Card className="p-6">
              <div className="text-sm font-semibold text-zinc-900 mb-3">Buyer's Claim</div>
              <div className="text-sm text-zinc-600 leading-relaxed mb-4">
                The delivered batch (CC-B-2026-09-0847) measured H₂O at 18.4 ppm against the contracted maximum of 10 ppm (EN 13279). The purity certificate from Bureau Veritas shows a measurement of 5.2 ppm which contradicts our on-site Karl Fischer analysis at 18.4 ppm. We believe either the certificate is not representative of the delivered batch or moisture ingress occurred during transport.
              </div>
              <div className="bg-red-50 border border-red-200 rounded p-3 text-xs text-red-800">
                <strong>Claimed defect:</strong> H₂O measured at 18.4 ppm (spec: ≤ 10 ppm) · Potential contamination during transit
              </div>
              <div className="mt-4">
                <div className="text-xs font-semibold text-zinc-500 mb-2">Evidence uploaded by buyer:</div>
                <div className="space-y-1">
                  {['Karl Fischer analysis report — SGS Halifax lab — Sep 21, 2026', 'Tank seal photo — arrival condition', 'Temperature log — transit data'].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-600">
                      <span>📄</span><span className="hover:underline cursor-pointer text-[#15572A]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Seller response */}
            <Card className="p-6">
              <div className="text-sm font-semibold text-zinc-900 mb-3">Seller Response</div>
              <div className="text-sm text-zinc-600 leading-relaxed mb-4">
                We dispute the buyer's claim. The Bureau Veritas analysis was conducted at point of loading and showed 5.2 ppm H₂O, well within specification. The responsibility for moisture ingress during transit rests with the logistics operator (Messer Transport). The tank seal was intact on arrival, suggesting the issue arose during the offloading process at the buyer's facility. We accept no liability for post-delivery contamination.
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800">
                <strong>Seller position:</strong> Product met specification at loading. Transit/offloading contamination is buyer's risk under DAP Incoterms.
              </div>
            </Card>

            {/* Mediator analysis */}
            <Card className="p-6">
              <div className="text-sm font-semibold text-zinc-900 mb-3">Mediator Preliminary Analysis</div>
              <div className="text-sm text-zinc-600 leading-relaxed mb-4">
                Both parties have submitted evidence. Preliminary analysis suggests moisture ingress is most likely attributable to the tanker valve maintenance history (Messer Transport TK-4921 service log requested). A joint re-analysis by SGS at both buyer site and retained sample is proposed within 5 business days.
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800">
                <strong>Proposed resolution:</strong> Joint independent re-analysis at ICC-accredited lab. If H₂O confirmed above spec, seller reimburses quality penalty ($2,845) and logistics cost pro-rated. Decision binding per contract clause 7.
              </div>
              <div className="mt-4 flex gap-3">
                <Btn onClick={() => setResolved(true)} className="text-xs">Accept proposed resolution</Btn>
                <Btn variant="outline" className="text-xs">Counter-propose</Btn>
                <Btn variant="ghost" className="text-xs">Escalate to ICC arbitration</Btn>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Timeline */}
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Dispute Timeline</div>
              <div className="space-y-0">
                {timeline.map((e, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                        e.status === 'done' ? 'bg-[#15572A] border-[#15572A] text-white' :
                        e.status === 'active' ? 'bg-amber-500 border-amber-500 text-white' :
                        'bg-white border-zinc-300 text-zinc-400'
                      }`}>
                        {e.status === 'done' ? '✓' : e.status === 'active' ? '●' : '○'}
                      </div>
                      {i < timeline.length - 1 && <div className={`w-px flex-1 my-0.5 ${e.status === 'done' ? 'bg-[#15572A]' : 'bg-zinc-200'}`} />}
                    </div>
                    <div className={`pb-4 text-xs ${e.status === 'pending' ? 'opacity-50' : ''}`}>
                      <div className="font-medium text-zinc-900">{e.action}</div>
                      <div className="text-zinc-400 mt-0.5">{e.date} · {e.actor}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {resolved && (
              <Card className="p-5 bg-green-50 border-green-200">
                <div className="text-sm font-semibold text-green-900 mb-2">✓ Dispute Resolved</div>
                <div className="text-xs text-green-800">
                  Joint re-analysis confirmed H₂O at 7.8 ppm (within spec). Transit moisture attributed to offloading equipment at buyer site. No penalty applied. Case closed.
                </div>
                <button onClick={() => navigate('buyer-dashboard')} className="mt-3 text-xs text-[#15572A] hover:underline">Return to dashboard</button>
              </Card>
            )}

            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Dispute Process</div>
              <div className="text-xs text-zinc-600 space-y-1.5 leading-relaxed">
                <div>1. Platform mediation (up to 30 days)</div>
                <div>2. If unresolved: ICC arbitration, Geneva</div>
                <div>3. Governing law: Swiss law</div>
                <div>4. Payment held in escrow during dispute</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
