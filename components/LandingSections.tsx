import React from 'react';

export const HeroSection = ({ onStart }: { onStart: () => void }) => (
  <section className="relative pt-20 pb-32 overflow-hidden bg-white">
    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-6 border border-blue-100">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        Powered by Gemini AI
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
        Make a Business Card that <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Actually Gets Kept.</span>
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
        Stop using generic templates. Let AI write your tagline, polish your job title, and design a card that commands authority.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onStart}
          className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          Design My Card Now
        </button>
        <a href="#how-it-works" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
          How it Works
        </a>
      </div>
      <div className="mt-12 flex justify-center gap-8 text-slate-400 grayscale opacity-60">
        <i className="fab fa-google text-2xl"></i>
        <i className="fab fa-react text-2xl"></i>
        <i className="fab fa-aws text-2xl"></i>
        <i className="fab fa-stripe text-2xl"></i>
        <i className="fab fa-figma text-2xl"></i>
      </div>
    </div>
  </section>
);

export const LossAversionSection = () => (
  <section className="py-20 bg-slate-900 text-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Most Business Cards End Up in the Trash.</h2>
      <p className="text-lg text-slate-300 mb-12">
        88% of business cards are thrown away within a week. Why? Because they are forgettable, cluttered, or poorly designed. Don't let your first impression be your last.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
          <i className="fas fa-ban text-red-400 text-3xl mb-4"></i>
          <h3 className="font-bold text-xl mb-2">Generic Templates</h3>
          <p className="text-slate-400 text-sm">Using the same Canva template as everyone else makes you look interchangeable.</p>
        </div>
        <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
          <i className="fas fa-eye-slash text-red-400 text-3xl mb-4"></i>
          <h3 className="font-bold text-xl mb-2">Weak Copy</h3>
          <p className="text-slate-400 text-sm">"CEO at MyCompany" tells me nothing about how you can help me.</p>
        </div>
        <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
          <i className="fas fa-palette text-red-400 text-3xl mb-4"></i>
          <h3 className="font-bold text-xl mb-2">Bad Color Theory</h3>
          <p className="text-slate-400 text-sm">Clashing colors signal unprofessionalism before you even speak.</p>
        </div>
      </div>
    </div>
  </section>
);

export const BenefitsSection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900">Why GemCard is Different</h2>
        <p className="text-slate-600 mt-4">We don't just put text on paper. We engineer your professional identity.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: 'fa-wand-magic-sparkles', title: 'AI Copywriting', desc: 'Our AI generates catchy taglines that summarize your value proposition instantly.' },
          { icon: 'fa-layer-group', title: 'Smart Themes', desc: 'Switch between Modern, Elegant, or Tech styles with one click. No design skills needed.' },
          { icon: 'fa-bolt', title: 'Instant Preview', desc: 'See changes in real-time. No loading screens, no watermarks, no frustration.' },
          { icon: 'fa-download', title: 'High-Res Export', desc: 'Download print-ready PNG files that look crisp on screen and on paper.' },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4">
              <i className={`fas ${item.icon}`}></i>
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ProcessSection = () => (
  <section id="how-it-works" className="py-24 bg-slate-50 border-y border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900">3 Steps to Professional Authority</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-slate-300 -z-10 border-t-2 border-dashed border-slate-300"></div>
        {[
          { step: '01', title: 'Enter Your Details', desc: 'Input your name, role, and contact info. Don’t worry about wording yet.' },
          { step: '02', title: 'Click "Magic Design"', desc: 'Describe your vibe (e.g. "Luxury Real Estate") and let AI pick fonts, colors, and taglines.' },
          { step: '03', title: 'Download & Print', desc: 'Export your high-quality card instantly. No sign-up required.' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="text-5xl font-black text-slate-100 absolute top-4 right-4">{item.step}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{item.title}</h3>
            <p className="text-slate-600 relative z-10">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const TestimonialsSection = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Trusted by 10,000+ Professionals</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { text: "I suck at design. I told the AI I wanted a 'cyberpunk hacker' vibe and it nailed the colors perfectly. Got 3 job offers this week.", name: "Sarah Jenkins", role: "Software Engineer" },
          { text: "The tagline generator is scary good. It turned 'Consultant' into 'Strategic Growth Architect'. My clients take me way more seriously.", name: "David Chen", role: "Business Consultant" },
          { text: "Free, fast, and no watermark? This is better than the paid tools I've used in the past. Highly recommend.", name: "Elena Rodriguez", role: "Freelance Designer" },
        ].map((t, i) => (
          <div key={i} className="bg-slate-50 p-8 rounded-2xl relative">
            <div className="text-blue-200 text-4xl font-serif absolute top-6 left-6">"</div>
            <p className="text-slate-700 italic mb-6 relative z-10 pt-4">{t.text}</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-500 font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const FAQSection = () => (
  <section className="py-20 bg-slate-50">
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "Is this really free?", a: "Yes, 100%. You can generate and download as many cards as you want without paying a dime." },
          { q: "What format are the downloads?", a: "We export high-resolution PNG files suitable for digital sharing or professional printing (300 DPI equivalent at print size)." },
          { q: "Do you save my data?", a: "No. All generation happens in your browser and via the API. We do not store your personal contact details on any server." },
          { q: "Can I use these for print?", a: "Absolutely. The aspect ratio is standard 3.5 x 2 inches. Just send the PNG to your local printer." },
        ].map((faq, i) => (
          <details key={i} className="group bg-white rounded-xl shadow-sm border border-slate-200">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-slate-900">
              <span>{faq.q}</span>
              <span className="transition group-open:rotate-180">
                <i className="fas fa-chevron-down text-slate-400"></i>
              </span>
            </summary>
            <div className="text-slate-600 px-6 pb-6">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export const FooterCTA = ({ onStart }: { onStart: () => void }) => (
  <section className="py-20 bg-blue-600 text-white text-center">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Upgrade Your Network?</h2>
      <p className="text-blue-100 mb-10 text-lg">Join thousands of professionals making better impressions today.</p>
      <button 
        onClick={onStart}
        className="px-10 py-4 bg-white text-blue-700 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl"
      >
        Create My Free Card
      </button>
      <p className="mt-8 text-sm text-blue-200 opacity-80">
        © {new Date().getFullYear()} GemCard Generator. Built with Gemini AI.
      </p>
    </div>
  </section>
);