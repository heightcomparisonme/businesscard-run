import React from 'react';
import { CardData, CardTheme } from '../types';

type TemplateVariant =
  | 'split'
  | 'stripe'
  | 'gradient'
  | 'terminal'
  | 'frame'
  | 'block'
  | 'diagonal'
  | 'classic'
  | 'horizon'
  | 'monogram'
  | 'neon'
  | 'grid';

export interface TemplatePreset {
  id: CardTheme;
  title: string;
  description: string;
  primaryColor: string;
  accentColor?: string;
  variant: TemplateVariant;
  sample?: Partial<CardData>;
}

const baseSample: Partial<CardData> = {
  fullName: 'Taylor Lee',
  jobTitle: 'Brand Strategist',
  companyName: 'Northwind Studio',
  email: 'hello@northwind.studio',
  phone: '+1 (555) 010-1212',
  website: 'northwind.studio',
  address: 'Austin, TX',
  tagline: 'Design that moves people.',
};

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: CardTheme.MODERN,
    title: 'Modern Split',
    description: 'Bold bar with clean layout',
    primaryColor: '#0ea5e9',
    variant: 'split',
    sample: { ...baseSample, tagline: 'Digital-first brand systems.' },
  },
  {
    id: CardTheme.MINIMALIST,
    title: 'Minimal Stripe',
    description: 'Lightweight, lots of air',
    primaryColor: '#111827',
    variant: 'stripe',
    sample: { ...baseSample, jobTitle: 'Product Designer', tagline: 'Less, but better.' },
  },
  {
    id: CardTheme.CREATIVE,
    title: 'Gradient Aura',
    description: 'Playful color blend',
    primaryColor: '#6366f1',
    accentColor: '#22d3ee',
    variant: 'gradient',
    sample: { ...baseSample, jobTitle: 'Creative Director', tagline: 'Stories in every pixel.' },
  },
  {
    id: CardTheme.TECH,
    title: 'Terminal',
    description: 'Code-forward look',
    primaryColor: '#22d3ee',
    variant: 'terminal',
    sample: { ...baseSample, jobTitle: 'Solutions Engineer', tagline: 'Shipping reliable systems.' },
  },
  {
    id: CardTheme.ELEGANT,
    title: 'Luxe Frame',
    description: 'Serif and gilded border',
    primaryColor: '#d97706',
    variant: 'frame',
    sample: { ...baseSample, jobTitle: 'Principal Consultant', tagline: 'Discretion, rigor, results.' },
  },
  {
    id: CardTheme.BOLD,
    title: 'Poster',
    description: 'Loud color, big type',
    primaryColor: '#ef4444',
    variant: 'block',
    sample: { ...baseSample, jobTitle: 'Art Director', tagline: 'Make the first look unforgettable.' },
  },
  {
    id: CardTheme.GEOMETRIC,
    title: 'Diagonal',
    description: 'Architectural shapes',
    primaryColor: '#0ea5e9',
    variant: 'diagonal',
    sample: baseSample,
  },
  {
    id: CardTheme.CLASSIC,
    title: 'Classic Line',
    description: 'Grounded and familiar',
    primaryColor: '#475569',
    variant: 'classic',
    sample: { ...baseSample, jobTitle: 'Managing Partner' },
  },
  {
    id: CardTheme.HORIZON,
    title: 'Horizon',
    description: 'Calm gradient band',
    primaryColor: '#22c55e',
    variant: 'horizon',
    sample: { ...baseSample, jobTitle: 'Sustainability Lead', tagline: 'Greener strategies, brighter futures.' },
  },
  {
    id: CardTheme.MONOGRAM,
    title: 'Monogram',
    description: 'Initial-first identity',
    primaryColor: '#0ea5e9',
    variant: 'monogram',
    sample: { ...baseSample, jobTitle: 'Account Executive', tagline: 'Clear, human-first deals.' },
  },
  {
    id: CardTheme.NEON,
    title: 'Neon Grid',
    description: 'Night-drive glow',
    primaryColor: '#06b6d4',
    variant: 'neon',
    sample: { ...baseSample, jobTitle: 'Tech Evangelist', tagline: 'Signal over noise.' },
  },
  {
    id: CardTheme.GRID,
    title: 'Blueprint',
    description: 'Structured grid system',
    primaryColor: '#2563eb',
    variant: 'grid',
    sample: { ...baseSample, jobTitle: 'Product Architect', tagline: 'Build with intention.' },
  },
];

const MiniCard: React.FC<{ preset: TemplatePreset }> = ({ preset }) => {
  const color = preset.primaryColor;
  const accent = preset.accentColor || '#0f172a';

  switch (preset.variant) {
    case 'split':
      return (
        <div className="absolute inset-1 rounded-md overflow-hidden bg-white">
          <div className="absolute inset-y-0 left-0 w-[38%]" style={{ backgroundColor: color }}></div>
          <div className="absolute right-2 top-3 h-2 w-12 bg-slate-300/80 rounded"></div>
          <div className="absolute right-2 top-6 h-2 w-8 bg-slate-200 rounded"></div>
          <div className="absolute bottom-3 left-[40%] right-2 h-2 bg-slate-200 rounded"></div>
        </div>
      );

    case 'stripe':
      return (
        <div className="absolute inset-1 rounded-md overflow-hidden bg-white border border-slate-200">
          <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: color }}></div>
          <div className="absolute inset-2 flex flex-col justify-between">
            <div className="h-2 w-16 bg-slate-400/80 rounded"></div>
            <div className="h-2 w-12 bg-slate-200 rounded"></div>
          </div>
        </div>
      );

    case 'gradient':
      return (
        <div
          className="absolute inset-1 rounded-md overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${color}, ${accent})` }}
        >
          <div className="absolute inset-2 rounded-md border border-white/30"></div>
          <div className="absolute bottom-2 left-2 right-2 h-2 bg-white/60 rounded"></div>
        </div>
      );

    case 'terminal':
      return (
        <div className="absolute inset-1 rounded-md overflow-hidden bg-slate-900 border border-slate-800">
          <div className="absolute top-2 left-2 h-2 w-12" style={{ backgroundColor: color }}></div>
          <div className="absolute top-5 left-2 h-2 w-16 bg-green-300/50 rounded"></div>
          <div className="absolute bottom-3 left-2 h-2 w-10 bg-slate-500 rounded"></div>
          <div className="absolute inset-1 rounded-md border border-slate-800/70"></div>
        </div>
      );

    case 'frame':
      return (
        <div className="absolute inset-1 rounded-md overflow-hidden bg-slate-900">
          <div className="absolute inset-2 rounded-md" style={{ border: `2px solid ${color}` }}></div>
          <div className="absolute inset-4 rounded-md border border-amber-200/30"></div>
          <div className="absolute top-4 left-4 h-2 w-12 bg-white/70 rounded"></div>
          <div className="absolute bottom-4 left-4 h-2 w-16 bg-white/30 rounded"></div>
        </div>
      );

    case 'block':
      return (
        <div className="absolute inset-1 rounded-md overflow-hidden" style={{ backgroundColor: color }}>
          <div className="absolute top-3 left-3 h-3 w-14 bg-white/90 rounded-sm"></div>
          <div className="absolute top-7 left-3 h-2 w-10 bg-white/70 rounded"></div>
          <div className="absolute bottom-3 left-3 h-2 w-16 bg-black/20 rounded"></div>
        </div>
      );

    case 'diagonal':
      return (
        <div className="absolute inset-1 rounded-md overflow-hidden bg-slate-100">
          <div
            className="absolute -top-4 -right-10 w-[75%] h-[140%] rotate-6 origin-top-right"
            style={{ backgroundColor: color, opacity: 0.9 }}
          ></div>
          <div className="absolute top-3 left-3 h-3 w-12 bg-slate-800/80 rounded"></div>
          <div className="absolute bottom-3 left-3 h-2 w-10 bg-slate-500/60 rounded"></div>
        </div>
      );

    case 'classic':
      return (
        <div className="absolute inset-1 rounded-md overflow-hidden bg-[#fdfbf7] border border-slate-200">
          <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: color }}></div>
          <div className="absolute inset-3">
            <div className="h-2 w-16 bg-slate-500/80 rounded mb-1"></div>
            <div className="h-2 w-12 bg-slate-400/60 rounded"></div>
          </div>
        </div>
      );

    case 'horizon':
      return (
        <div className="absolute inset-1 rounded-md overflow-hidden bg-white">
          <div
            className="absolute top-0 left-0 right-0 h-1/2"
            style={{ background: `linear-gradient(180deg, ${color}55, transparent)` }}
          ></div>
          <div className="absolute top-2 right-2 h-2 w-10 bg-slate-400/70 rounded"></div>
          <div className="absolute bottom-3 left-3 h-2 w-16 bg-slate-300 rounded"></div>
        </div>
      );

    case 'monogram':
      return (
        <div className="absolute inset-1 rounded-md overflow-hidden bg-white border border-slate-200 flex items-center gap-2 px-2">
          <div className="w-6 h-6 rounded-full border-2" style={{ borderColor: color }}></div>
          <div className="flex-1 h-2 bg-slate-300 rounded"></div>
        </div>
      );

    case 'neon':
      return (
        <div
          className="absolute inset-1 rounded-md overflow-hidden bg-slate-950"
          style={{ boxShadow: `0 0 0 2px ${color}, 0 0 12px ${color}66, inset 0 0 12px ${color}44` }}
        >
          <div className="absolute top-2 left-2 h-2 w-12 bg-white/80 rounded"></div>
          <div className="absolute bottom-2 left-2 h-2 w-10 bg-white/40 rounded"></div>
          <div className="absolute bottom-2 right-2 h-2 w-8" style={{ backgroundColor: color, opacity: 0.8 }}></div>
        </div>
      );

    case 'grid':
      return (
        <div className="absolute inset-1 rounded-md overflow-hidden bg-white border border-slate-200">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `linear-gradient(to right, ${color}15 1px, transparent 1px), linear-gradient(to bottom, ${color}15 1px, transparent 1px)`,
              backgroundSize: '14px 14px'
            }}
          ></div>
          <div className="absolute top-2 left-2 h-2 w-14 bg-slate-600/80 rounded"></div>
          <div className="absolute bottom-2 left-2 h-2 w-10 bg-slate-400/70 rounded"></div>
        </div>
      );

    default:
      return <div className="absolute inset-1 rounded-md bg-white border border-slate-200"></div>;
  }
};

interface TemplateGalleryProps {
  selectedTheme: CardTheme;
  onSelect: (preset: TemplatePreset) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ selectedTheme, onSelect }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <i className="fas fa-layer-group text-blue-500"></i> Template Gallery
          </h3>
          <p className="text-xs text-slate-500">Pick a style to instantly preview and apply.</p>
        </div>
        <span className="text-xs text-slate-400">{TEMPLATE_PRESETS.length} styles</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
        {TEMPLATE_PRESETS.map((preset) => {
          const isActive = preset.id === selectedTheme;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelect(preset)}
              className={`group relative aspect-[3/2] rounded-lg border-2 transition-all bg-slate-50 overflow-hidden ${
                isActive
                  ? 'border-slate-900 shadow-lg shadow-slate-200'
                  : 'border-rose-300/80 hover:border-slate-500 hover:-translate-y-0.5'
              }`}
            >
              <MiniCard preset={preset} />
              <div className="absolute inset-x-2 bottom-2">
                <div className="text-xs font-semibold text-slate-800 truncate">{preset.title}</div>
                <div className="text-[10px] text-slate-500 truncate">{preset.description}</div>
              </div>
              {isActive && (
                <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-full shadow">
                  Active
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateGallery;
