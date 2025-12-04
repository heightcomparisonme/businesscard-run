import React, { useState } from 'react';
import { CardData, CardTheme } from '../types';

interface CardFormProps {
  data: CardData;
  onChange: (field: keyof CardData, value: string) => void;
  onGenerateAI: () => void;
  onMagicDesign: (description: string) => void;
  isGenerating: boolean;
}

const CardForm: React.FC<CardFormProps> = ({ data, onChange, onGenerateAI, onMagicDesign, isGenerating }) => {
  const [designPrompt, setDesignPrompt] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof CardData, value);
  };

  const handleMagicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (designPrompt.trim()) {
      onMagicDesign(designPrompt);
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      
      {/* AI Magic Design Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-5 rounded-xl text-white shadow-lg">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
          <i className="fas fa-wand-magic-sparkles text-yellow-300"></i> AI Magic Designer
        </h3>
        <p className="text-xs text-indigo-100 mb-3">
          Describe your business vibe (e.g., "A modern coffee shop with rustic vibes" or "High-end corporate law firm"). We'll pick the style and colors for you.
        </p>
        <form onSubmit={handleMagicSubmit} className="flex gap-2">
          <input 
            type="text" 
            value={designPrompt}
            onChange={(e) => setDesignPrompt(e.target.value)}
            placeholder="Describe your business style..."
            aria-label="Describe your business style"
            className="flex-grow px-3 py-2 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button 
            type="submit"
            disabled={isGenerating || !designPrompt}
            className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isGenerating ? <i className="fas fa-spinner fa-spin"></i> : 'Create'}
          </button>
        </form>
      </div>

      <div className="border-t border-slate-100 my-4"></div>

      {/* Personal Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <i className="fas fa-user-circle text-blue-500"></i> Personal Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={data.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-slate-600 mb-1">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              value={data.jobTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Product Manager"
            />
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <i className="fas fa-building text-blue-500"></i> Company Info
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-slate-600 mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              value={data.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Acme Corp"
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <i className="fas fa-address-book text-blue-500"></i> Contact Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-600 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={data.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-slate-600 mb-1">Website</label>
            <input
              type="text"
              name="website"
              id="website"
              value={data.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="www.example.com"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-600 mb-1">Address (Optional)</label>
            <input
              type="text"
              name="address"
              id="address"
              value={data.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="City, Country"
            />
          </div>
        </div>
      </div>

      {/* Text Enhancements */}
      <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <i className="fas fa-pen-nib text-slate-500"></i> Text & Bio
          </h3>
          <button
            onClick={onGenerateAI}
            disabled={isGenerating || !data.fullName}
            className="text-xs bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1 rounded shadow-sm transition-all"
          >
            {isGenerating ? 'Generating...' : 'Refine Text Only'}
          </button>
        </div>
        <div>
          <label htmlFor="tagline" className="block text-xs font-medium text-slate-600 mb-1">Tagline</label>
          <textarea
            name="tagline"
            id="tagline"
            value={data.tagline}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-sm"
            placeholder="A short, catchy phrase about you..."
          />
        </div>
      </div>

      {/* Appearance */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <i className="fas fa-paint-brush text-blue-500"></i> Appearance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-slate-600 mb-1">Theme</label>
            <select
              name="theme"
              id="theme"
              value={data.theme}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              {Object.values(CardTheme).map((theme) => (
                <option key={theme} value={theme}>
                  {theme.charAt(0) + theme.slice(1).toLowerCase().replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="primaryColor" className="block text-sm font-medium text-slate-600 mb-1">Primary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                name="primaryColor"
                id="primaryColor"
                value={data.primaryColor}
                onChange={handleChange}
                className="h-10 w-10 p-1 rounded cursor-pointer border border-slate-300"
              />
              <span className="text-sm text-slate-500 font-mono">{data.primaryColor}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CardForm;
