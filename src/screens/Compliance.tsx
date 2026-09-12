import { useApp } from '../context';
import { Card, Badge, Btn, SectionHeader, ProgressBar, StatusDot } from '../components/ui';
import Nav from '../components/Nav';

const checks = [
  { name: 'Identity Verification (KYC)', status: 'complete', detail: 'Director ID verified — Klaus Weber, DOB verified', updated: '2026-09-08' },
  { name: 'Business Registration (KYB)', status: 'complete', detail: 'Registered DE811708516 · Amtsgericht Heidelberg HRB 330082', updated: '2026-09-08' },
  { name: 'Beneficial Ownership', status: 'complete', detail: 'HeidelbergCement AG (100% direct ownership) declared', updated: '2026-09-09' },
  { name: 'Sanctions Screening (EU/OFAC/UN)', status: 'complete', detail: 'No matches — Dow Jones Risk & Compliance, Sep 2026', updated: '2026-09-10' },
  { name: 'PEP Screening', status: 'complete', detail: 'No politically exposed persons identified', updated: '2026-09-10' },
  { name: 'Environmental Permit Verification', status: 'complete', detail: 'EU ETS installation permit DE-9-0001234 confirmed active', updated: '2026-09-09' },
  { name: 'Financial Soundness Check', status: 'review', detail: 'Annual report 2025 under review — credit assessment in progress', updated: '2026-09-11' },
  { name: 'Trade Finance Pre-Approval', status: 'pending', detail: 'Pending financial check completion', updated: '—' },
];

const certs = [
  { name: 'ISO 9001:2015 Quality Management', issuer: 'TÜV SÜD', expiry: '2027-03-15', status: 'valid' },
  { name: 'ISO 14001:2015 Environmental Management', issuer: 'Bureau Veritas', expiry: '2027-03-15', status: 'valid' },
  { name: 'ISCC PLUS (Sustainability)', issuer: 'ISCC System GmbH', expiry: '2026-11-30', status: 'valid' },
  { name: 'EU ETS Compliance Certificate', issuer: 'German Emissions Authority', expiry: '2027-01-01', status: 'valid' },
  { name: 'ADR 2023 (Dangerous Goods Transport)', issuer: 'DEKRA', expiry: '2025-12-31', status: 'expiring' },
];

const notice = [
  '⚠ Physical CO₂ Passports are batch-level records of physical gas/liquid molecules, not financial instruments.',
  '⚠ Carbon-Connect does not issue, broker, or redeem carbon credits, VCUs, or GOs.',
  '⚠ CO₂ utilization records generated on this platform may support but do not constitute carbon credit claims.',
  '⚠ Any carbon accounting must be performed separately by accredited verification bodies.',
];

export default function Compliance() {
  const { navigate, role } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <SectionHeader
          title="Compliance Center"
          sub="All regulatory checks, certifications and compliance status for your organization."
          action={
            <div className="flex gap-2">
              <Btn variant="outline">Download report</Btn>
              <Btn onClick={() => navigate(role === 'seller' ? 'seller-dashboard' : 'buyer-dashboard')}>
                Go to Dashboard →
              </Btn>
            </div>
          }
        />

        {/* Overall status */}
        <div className="bg-amber-50 border border-amber-200 rounded p-5 mb-8 flex items-start gap-4">
          <div className="text-2xl">⚡</div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-amber-900 mb-1">Compliance Status: Partially Verified</div>
            <div className="text-xs text-amber-800 mb-3">6 of 8 checks complete. Financial review in progress. You may browse the marketplace but cannot execute contracts until all checks are complete.</div>
            <ProgressBar value={75} />
            <div className="text-xs text-amber-700 mt-1.5 font-mono">75% complete · Est. 2–3 business days to full verification</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            {/* Verification checks */}
            <Card className="overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100">
                <h3 className="text-sm font-semibold text-zinc-900">Verification Checks</h3>
              </div>
              <div className="divide-y divide-zinc-100">
                {checks.map((c, i) => (
                  <div key={i} className="px-6 py-4 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <StatusDot status={c.status === 'complete' ? 'active' : c.status === 'review' ? 'pending' : 'inactive'} />
                      <div>
                        <div className="text-sm font-medium text-zinc-900">{c.name}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">{c.detail}</div>
                      </div>
                    </div>
                    <div className="text-right ml-4 shrink-0">
                      <Badge variant={c.status === 'complete' ? 'green' : c.status === 'review' ? 'yellow' : 'default'}>
                        {c.status === 'complete' ? 'VERIFIED' : c.status === 'review' ? 'IN REVIEW' : 'PENDING'}
                      </Badge>
                      <div className="text-xs text-zinc-400 mt-1 font-mono">{c.updated}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Certifications */}
            <Card className="overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-900">Certifications &amp; Permits</h3>
                <Btn variant="ghost" className="text-xs">+ Upload certificate</Btn>
              </div>
              <div className="divide-y divide-zinc-100">
                {certs.map((c, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-zinc-900">{c.name}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">Issued by {c.issuer} · Expires {c.expiry}</div>
                    </div>
                    <Badge variant={c.status === 'valid' ? 'green' : 'yellow'}>
                      {c.status === 'valid' ? 'VALID' : 'EXPIRING SOON'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Important notice */}
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Important Distinction</div>
              <div className="space-y-3">
                {notice.map((n, i) => (
                  <div key={i} className="text-xs text-zinc-600 leading-relaxed border-l-2 border-amber-300 pl-3">
                    {n}
                  </div>
                ))}
              </div>
            </Card>

            {/* Compliance score */}
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Compliance Score</div>
              <div className="text-center mb-4">
                <div className="text-5xl font-semibold text-[#15572A]" style={{ fontFamily: 'var(--font-heading)' }}>76</div>
                <div className="text-xs text-zinc-400 mt-1">out of 100</div>
              </div>
              <ProgressBar value={76} />
              <div className="mt-4 space-y-2 text-xs text-zinc-500">
                <div className="flex justify-between"><span>KYB / KYC</span><span className="font-mono text-green-700">100%</span></div>
                <div className="flex justify-between"><span>Certifications</span><span className="font-mono text-green-700">80%</span></div>
                <div className="flex justify-between"><span>Financial</span><span className="font-mono text-amber-600">50%</span></div>
                <div className="flex justify-between"><span>Trade Finance</span><span className="font-mono text-zinc-400">0%</span></div>
              </div>
            </Card>

            {/* Next actions */}
            <Card className="p-5">
              <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Required Actions</div>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-xs text-zinc-700">
                  <span className="text-amber-500 mt-0.5 shrink-0">○</span>
                  Renew ADR 2023 certificate before Dec 31, 2025
                </div>
                <div className="flex items-start gap-2 text-xs text-zinc-700">
                  <span className="text-amber-500 mt-0.5 shrink-0">○</span>
                  Await financial review completion (ETA Sep 14)
                </div>
              </div>
              <button
                onClick={() => navigate(role === 'seller' ? 'seller-dashboard' : 'buyer-dashboard')}
                className="mt-4 w-full py-2 text-xs font-medium text-[#15572A] border border-[#15572A]/30 rounded hover:bg-green-50 transition-colors"
              >
                Go to Dashboard →
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
