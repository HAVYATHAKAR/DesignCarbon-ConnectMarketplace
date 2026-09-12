import type { ReactNode } from 'react';

export function Badge({ children, variant = 'default', className = '' }: { children: ReactNode; variant?: 'default' | 'green' | 'yellow' | 'red' | 'blue' | 'outline'; className?: string }) {
  const styles: Record<string, string> = {
    default: 'bg-zinc-100 text-zinc-700 border-zinc-200',
    green: 'bg-green-50 text-green-800 border-green-200',
    yellow: 'bg-amber-50 text-amber-800 border-amber-200',
    red: 'bg-red-50 text-red-800 border-red-200',
    blue: 'bg-blue-50 text-blue-800 border-blue-200',
    outline: 'bg-transparent text-zinc-600 border-zinc-300',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border font-mono tracking-wide ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      className={`bg-white border border-zinc-200 rounded ${onClick ? 'cursor-pointer hover:border-zinc-400 hover:shadow-sm transition-all' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function StatCard({ label, value, sub, trend, color = 'zinc' }: {
  label: string; value: string; sub?: string; trend?: string; color?: string;
}) {
  const colors: Record<string, string> = {
    green: 'text-green-700',
    red: 'text-red-600',
    zinc: 'text-zinc-900',
  };
  return (
    <Card className="p-5">
      <div className="text-xs text-zinc-500 mb-2">{label}</div>
      <div className={`text-2xl font-semibold ${colors[color] || colors.zinc}`} style={{ fontFamily: 'var(--font-heading)' }}>{value}</div>
      {sub && <div className="text-xs text-zinc-400 mt-1">{sub}</div>}
      {trend && <div className={`text-xs mt-1 font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{trend} vs last month</div>}
    </Card>
  );
}

export function Btn({ children, variant = 'primary', onClick, className = '', type = 'button' }: {
  children: ReactNode; variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  onClick?: () => void; className?: string; type?: 'button' | 'submit';
}) {
  const styles: Record<string, string> = {
    primary: 'bg-[#15572A] text-white hover:bg-[#0E3F1E] border-transparent',
    secondary: 'bg-zinc-900 text-white hover:bg-zinc-700 border-transparent',
    outline: 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500 hover:bg-zinc-50',
    ghost: 'bg-transparent text-zinc-600 border-transparent hover:bg-zinc-100 hover:text-zinc-900',
    danger: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded border transition-all ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function SectionHeader({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h2>
        {sub && <p className="text-sm text-zinc-500 mt-0.5">{sub}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function Table({ headers, rows, onRowClick }: {
  headers: string[];
  rows: (string | ReactNode)[][];
  onRowClick?: (i: number) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200">
            {headers.map((h, i) => (
              <th key={i} className="text-left text-xs font-medium text-zinc-500 py-2.5 px-3 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-zinc-100 last:border-0 ${onRowClick ? 'cursor-pointer hover:bg-zinc-50' : ''}`}
              onClick={() => onRowClick?.(i)}
            >
              {row.map((cell, j) => (
                <td key={j} className="py-3 px-3 text-zinc-700 text-xs">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProgressBar({ value, max = 100, color = 'green' }: { value: number; max?: number; color?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  const colors: Record<string, string> = {
    green: 'bg-[#15572A]',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    zinc: 'bg-zinc-400',
  };
  return (
    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ${colors[color] || colors.green}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function ScorePill({ label, score, max = 100 }: { label: string; score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color = pct >= 80 ? 'text-green-700' : pct >= 60 ? 'text-amber-700' : 'text-red-600';
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">{label}</span>
        <span className={`text-xs font-semibold font-mono ${color}`}>{score}</span>
      </div>
      <ProgressBar value={score} max={max} color={pct >= 80 ? 'green' : pct >= 60 ? 'amber' : 'red'} />
    </div>
  );
}

export function FormRow({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div className="grid grid-cols-3 gap-4 items-start py-4 border-b border-zinc-100 last:border-0">
      <div>
        <label className="text-sm font-medium text-zinc-700">{label}</label>
        {hint && <p className="text-xs text-zinc-400 mt-0.5">{hint}</p>}
      </div>
      <div className="col-span-2">{children}</div>
    </div>
  );
}

export function Input({ placeholder, value, type = 'text', className = '' }: {
  placeholder?: string; value?: string; type?: string; className?: string;
}) {
  return (
    <input
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      className={`w-full px-3 py-2 text-sm border border-zinc-300 rounded bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#15572A] focus:ring-1 focus:ring-[#15572A]/20 transition-colors ${className}`}
    />
  );
}

export function Select({ options, value }: { options: string[]; value?: string }) {
  return (
    <select
      defaultValue={value}
      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded bg-white text-zinc-900 focus:outline-none focus:border-[#15572A] transition-colors appearance-none"
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

export function Chip({ label, active = false, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium rounded border transition-all ${
        active
          ? 'bg-[#15572A] text-white border-[#15572A]'
          : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
      }`}
    >
      {label}
    </button>
  );
}

export function StatusDot({ status }: { status: 'active' | 'pending' | 'inactive' | 'error' }) {
  const colors = {
    active: 'bg-green-500',
    pending: 'bg-amber-400',
    inactive: 'bg-zinc-300',
    error: 'bg-red-500',
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status]}`} />;
}

export function FlowStep({ number, title, desc, active = false, done = false }: {
  number: number; title: string; desc?: string; active?: boolean; done?: boolean;
}) {
  return (
    <div className={`flex gap-4 ${!active && !done ? 'opacity-50' : ''}`}>
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
          done ? 'bg-[#15572A] border-[#15572A] text-white' :
          active ? 'bg-white border-[#15572A] text-[#15572A]' :
          'bg-white border-zinc-300 text-zinc-400'
        }`}>
          {done ? '✓' : number}
        </div>
        <div className="w-px flex-1 bg-zinc-200 mt-1" />
      </div>
      <div className="pb-6">
        <div className={`text-sm font-medium ${active ? 'text-zinc-900' : done ? 'text-zinc-700' : 'text-zinc-400'}`}>{title}</div>
        {desc && <div className="text-xs text-zinc-400 mt-0.5">{desc}</div>}
      </div>
    </div>
  );
}
