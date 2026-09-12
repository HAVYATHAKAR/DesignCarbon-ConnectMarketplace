import { useState } from 'react';
import { useApp } from '../context';
import { Card, Badge, Btn, SectionHeader, Input, Select, Chip, ScorePill, ProgressBar } from '../components/ui';
import Nav from '../components/Nav';

const grades = ['All grades', 'Food Grade (≥99.9%)', 'Industrial Grade (≥99.5%)', 'Technical Grade (≥98%)', 'Captured CO₂ (≥95%)'];
const sources = ['All sources', 'Cement / kiln capture', 'Steel blast furnace', 'Power generation', 'Chemical synthesis', 'Fermentation'];
const locations = ['Any location', 'Europe', 'North America', 'Asia-Pacific', 'Middle East'];

const suppliers = [
  {
    id: 'CC-S-101',
    name: 'Heidelberg Materials AG',
    location: 'Heidelberg, Germany',
    grade: 'Industrial Grade',
    purity: '99.51%',
    volume: '85,000 t/yr',
    price: '$89/t',
    delivered: '$112/t',
    source: 'Cement kiln capture',
    certs: ['ISO 9001', 'ISCC PLUS', 'EU ETS'],
    commercial: 82,
    climate: 74,
    compliance: 76,
    state: 'Liquid',
    pressure: '18.5 bar',
    available: 'Oct 2026',
  },
  {
    id: 'CC-S-089',
    name: 'BASF SE — Verbund Ludwigshafen',
    location: 'Ludwigshafen, Germany',
    grade: 'Industrial Grade',
    purity: '99.68%',
    volume: '120,000 t/yr',
    price: '$84/t',
    delivered: '$107/t',
    source: 'Chemical synthesis off-gas',
    certs: ['ISO 9001', 'ISO 14001', 'ISCC PLUS'],
    commercial: 91,
    climate: 69,
    compliance: 95,
    state: 'Liquid',
    pressure: '20.0 bar',
    available: 'Immediate',
  },
  {
    id: 'CC-S-134',
    name: 'Tata Steel Europe BV',
    location: 'IJmuiden, Netherlands',
    grade: 'Captured CO₂',
    purity: '97.80%',
    volume: '200,000 t/yr',
    price: '$62/t',
    delivered: '$89/t',
    source: 'Steel blast furnace capture',
    certs: ['ISO 9001', 'EU ETS'],
    commercial: 78,
    climate: 85,
    compliance: 82,
    state: 'Gas / Liquid',
    pressure: '12.0 bar',
    available: 'Oct 2026',
  },
  {
    id: 'CC-S-067',
    name: 'RWE Power AG',
    location: 'Cologne, Germany',
    grade: 'Captured CO₂',
    purity: '96.20%',
    volume: '500,000 t/yr',
    price: '$48/t',
    delivered: '$78/t',
    source: 'Power plant flue gas (CCUS)',
    certs: ['ISO 14001', 'EU ETS', 'CCS certification'],
    commercial: 73,
    climate: 92,
    compliance: 88,
    state: 'Gas (compressed)',
    pressure: '150 bar',
    available: 'Q1 2027',
  },
  {
    id: 'CC-S-201',
    name: 'Covestro AG',
    location: 'Leverkusen, Germany',
    grade: 'Food Grade',
    purity: '99.92%',
    volume: '15,000 t/yr',
    price: '$148/t',
    delivered: '$171/t',
    source: 'Chemical process (EIGA compliant)',
    certs: ['ISO 9001', 'EIGA Doc 70', 'FDA approved'],
    commercial: 88,
    climate: 62,
    compliance: 94,
    state: 'Liquid',
    pressure: '18.5 bar',
    available: 'Immediate',
  },
];

export default function Marketplace() {
  const { navigate } = useApp();
  const [grade, setGrade] = useState('All grades');
  const [source, setSource] = useState('All sources');
  const [location, setLocation] = useState('Any location');
  const [view, setView] = useState<'list' | 'compare'>('list');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = suppliers.filter(s => {
    if (grade !== 'All grades' && !s.grade.includes(grade.split(' ')[0])) return false;
    return true;
  });

  function toggleSelect(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev);
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <SectionHeader
          title="CO₂ Marketplace"
          sub={`${filtered.length} verified suppliers available`}
          action={
            <div className="flex gap-2">
              <Btn variant={view === 'list' ? 'secondary' : 'outline'} onClick={() => setView('list')}>List view</Btn>
              <Btn variant={view === 'compare' ? 'secondary' : 'outline'} onClick={() => setView('compare')}>Compare ({selected.length})</Btn>
            </div>
          }
        />

        {/* Filters */}
        <div className="bg-white border border-zinc-200 rounded p-4 mb-6 grid grid-cols-5 gap-3">
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">CO₂ Grade</label>
            <select
              value={grade}
              onChange={e => setGrade(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-zinc-300 rounded bg-white focus:outline-none focus:border-[#15572A] transition-colors"
            >
              {grades.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">CO₂ Source</label>
            <select
              value={source}
              onChange={e => setSource(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-zinc-300 rounded bg-white focus:outline-none focus:border-[#15572A] transition-colors"
            >
              {sources.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">Location</label>
            <select
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-zinc-300 rounded bg-white focus:outline-none focus:border-[#15572A] transition-colors"
            >
              {locations.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">Min. Purity (%)</label>
            <input type="number" defaultValue="95" className="w-full px-2 py-1.5 text-xs border border-zinc-300 rounded bg-white focus:outline-none focus:border-[#15572A] transition-colors" />
          </div>
          <div>
            <label className="text-xs text-zinc-500 mb-1.5 block">Max. Price ($/t)</label>
            <input type="number" defaultValue="120" className="w-full px-2 py-1.5 text-xs border border-zinc-300 rounded bg-white focus:outline-none focus:border-[#15572A] transition-colors" />
          </div>
        </div>

        {view === 'list' ? (
          <div className="space-y-4">
            {filtered.map(s => (
              <Card key={s.id} className="p-0 overflow-hidden hover:shadow-md transition-all">
                <div className="p-5 grid grid-cols-6 gap-4">
                  <div className="col-span-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-zinc-900">{s.name}</span>
                          <Badge variant="green">VERIFIED</Badge>
                        </div>
                        <div className="text-xs text-zinc-500 mb-2">📍 {s.location}</div>
                        <div className="flex flex-wrap gap-1">
                          {s.certs.map(c => (
                            <span key={c} className="text-[10px] px-1.5 py-0.5 bg-zinc-100 text-zinc-600 rounded border border-zinc-200 font-mono">{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-zinc-400 mb-0.5">Grade</div>
                      <div className="font-medium text-zinc-900">{s.grade}</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 mb-0.5">Purity</div>
                      <div className="font-mono font-medium text-zinc-900">{s.purity}</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 mb-0.5">Volume</div>
                      <div className="font-mono text-zinc-700">{s.volume}</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 mb-0.5">State / Pressure</div>
                      <div className="text-zinc-700">{s.state} · {s.pressure}</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 mb-0.5">Source</div>
                      <div className="text-zinc-700">{s.source}</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 mb-0.5">Available</div>
                      <div className="text-zinc-700">{s.available}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-zinc-400 mb-1">Ex-works</div>
                    <div className="text-xl font-semibold text-zinc-900 font-mono">{s.price}</div>
                    <div className="text-xs text-zinc-400 mt-1">Delivered est. <span className="font-mono text-zinc-600">{s.delivered}</span></div>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex gap-1.5 items-center text-xs">
                        <span className="text-zinc-400 w-20">Commercial</span>
                        <ProgressBar value={s.commercial} color={s.commercial >= 80 ? 'green' : 'amber'} />
                        <span className="font-mono text-zinc-600 w-6">{s.commercial}</span>
                      </div>
                      <div className="flex gap-1.5 items-center text-xs">
                        <span className="text-zinc-400 w-20">Climate</span>
                        <ProgressBar value={s.climate} color={s.climate >= 80 ? 'green' : 'amber'} />
                        <span className="font-mono text-zinc-600 w-6">{s.climate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <label className="flex items-center gap-2 text-xs text-zinc-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selected.includes(s.id)}
                        onChange={() => toggleSelect(s.id)}
                        className="rounded border-zinc-300"
                      />
                      Compare
                    </label>
                    <div className="flex flex-col gap-2">
                      <Btn onClick={() => navigate('supplier-details')} variant="outline" className="text-xs">View supplier</Btn>
                      <Btn onClick={() => navigate('product-detail')} className="text-xs">View listing →</Btn>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Compare view */
          <div>
            {selected.length === 0 ? (
              <div className="text-center py-16 text-zinc-400">
                <div className="text-lg mb-2">No suppliers selected</div>
                <div className="text-sm">Switch to list view and check up to 3 suppliers to compare.</div>
                <Btn variant="outline" className="mt-4" onClick={() => setView('list')}>← Back to list</Btn>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-zinc-500 py-3 px-4 border-b border-zinc-200 w-40">Attribute</th>
                      {selected.map(id => {
                        const sup = suppliers.find(s => s.id === id)!;
                        return (
                          <th key={id} className="text-left border-b border-zinc-200 px-4 py-3">
                            <div className="text-sm font-semibold text-zinc-900">{sup.name}</div>
                            <div className="text-xs text-zinc-400 font-normal">{sup.location}</div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Grade', key: 'grade' },
                      { label: 'Purity', key: 'purity' },
                      { label: 'Volume', key: 'volume' },
                      { label: 'Physical state', key: 'state' },
                      { label: 'Pressure', key: 'pressure' },
                      { label: 'Source', key: 'source' },
                      { label: 'Available', key: 'available' },
                      { label: 'Ex-works price', key: 'price' },
                      { label: 'Est. delivered', key: 'delivered' },
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-zinc-100 ${i % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}`}>
                        <td className="px-4 py-3 text-xs text-zinc-500 font-medium">{row.label}</td>
                        {selected.map(id => {
                          const sup = suppliers.find(s => s.id === id)!;
                          const val = sup[row.key as keyof typeof sup] as string;
                          return (
                            <td key={id} className="px-4 py-3 text-xs text-zinc-800 font-mono">{val}</td>
                          );
                        })}
                      </tr>
                    ))}
                    {['commercial', 'climate', 'compliance'].map(score => (
                      <tr key={score} className="border-b border-zinc-100">
                        <td className="px-4 py-3 text-xs text-zinc-500 font-medium capitalize">{score} score</td>
                        {selected.map(id => {
                          const sup = suppliers.find(s => s.id === id)!;
                          const val = sup[score as keyof typeof sup] as number;
                          return (
                            <td key={id} className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <ProgressBar value={val} color={val >= 80 ? 'green' : 'amber'} />
                                <span className="text-xs font-mono text-zinc-700 w-6">{val}</span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    <tr>
                      <td className="px-4 py-4" />
                      {selected.map(id => (
                        <td key={id} className="px-4 py-4">
                          <Btn onClick={() => navigate('product-detail')} className="text-xs">Request quote →</Btn>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
