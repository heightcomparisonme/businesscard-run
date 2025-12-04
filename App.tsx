import React, { useState, useRef, useCallback, useEffect } from 'react';
import { CardData, CardTheme } from './types';
import CardForm from './components/CardForm';
import CardPreview from './components/CardPreview';
import TemplateGallery, { TemplatePreset } from './components/TemplateGallery';
import { generateCardContent, generateCardDesign } from './services/geminiService';
import { 
  HeroSection, 
  LossAversionSection, 
  BenefitsSection, 
  ProcessSection, 
  TestimonialsSection, 
  FAQSection,
  FooterCTA,
  FAQ_ITEMS
} from './components/LandingSections';

const DEFAULT_SOCIAL_IMAGE = 'https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6';

const SEO_CONFIG = {
  title: 'GemCard | Free AI Business Card Generator & Designer',
  description: 'Create print-ready business cards in seconds with AI taglines, smart themes, and instant PNG downloads—no sign-up, no design skills required.',
  siteName: 'GemCard',
  socialImage: import.meta.env.VITE_SOCIAL_IMAGE || DEFAULT_SOCIAL_IMAGE,
};

const getBaseUrl = () => {
  if (typeof window === 'undefined') return import.meta.env.VITE_SITE_URL || '';
  const envUrl = import.meta.env.VITE_SITE_URL;
  const fallback = window.location.origin;
  const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const normalizedEnv = envUrl ? envUrl.replace(/\/$/, '') : '';
  const normalizedFallback = fallback.replace(/\/$/, '');
  return normalizedEnv && !isLocal ? normalizedEnv : normalizedFallback;
};

const upsertMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  if (!content || typeof document === 'undefined') return;
  const selector = attribute === 'property' ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  if (!href || typeof document === 'undefined') return;
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
};

const injectJsonLd = (id: string, data: Record<string, unknown>) => {
  if (typeof document === 'undefined') return;
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

const useSEO = () => {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const baseUrl = getBaseUrl();
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const canonicalUrl = `${baseUrl}${path}`;
    const generatorTarget = `${canonicalUrl}#generator`;

    upsertLink('canonical', canonicalUrl);
    upsertMeta('description', SEO_CONFIG.description);
    upsertMeta('application-name', SEO_CONFIG.siteName);
    upsertMeta('theme-color', '#0ea5e9');

    upsertMeta('og:title', SEO_CONFIG.title, 'property');
    upsertMeta('og:description', SEO_CONFIG.description, 'property');
    upsertMeta('og:site_name', SEO_CONFIG.siteName, 'property');
    upsertMeta('og:type', 'website', 'property');
    upsertMeta('og:url', canonicalUrl, 'property');
    upsertMeta('og:image', SEO_CONFIG.socialImage, 'property');

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', SEO_CONFIG.title);
    upsertMeta('twitter:description', SEO_CONFIG.description);
    upsertMeta('twitter:url', canonicalUrl);
    upsertMeta('twitter:image', SEO_CONFIG.socialImage);

    injectJsonLd('structured-data-webapp', {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: SEO_CONFIG.siteName,
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      url: canonicalUrl,
      description: SEO_CONFIG.description,
      potentialAction: {
        '@type': 'CreateAction',
        name: 'Generate an AI business card',
        target: generatorTarget,
      },
    });

    injectJsonLd('structured-data-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    });
  }, []);
};

const App: React.FC = () => {
  useSEO();
  const [cardData, setCardData] = useState<CardData>({
    fullName: '',
    jobTitle: '',
    companyName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    tagline: '',
    theme: CardTheme.MODERN,
    primaryColor: '#0ea5e9',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const generatorRef = useRef<HTMLElement>(null);

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFieldChange = useCallback((field: keyof CardData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleGenerateAI = async () => {
    if (!process.env.API_KEY) {
      alert("Please configure your API_KEY in the environment to use AI features.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const suggestion = await generateCardContent(cardData);
      setCardData((prev) => ({
        ...prev,
        tagline: suggestion.tagline,
        jobTitle: suggestion.suggestedTitle || prev.jobTitle,
      }));
    } catch (error) {
      console.error("Failed to generate content", error);
      alert("Could not generate AI content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMagicDesign = async (description: string) => {
    if (!process.env.API_KEY) {
      alert("Please configure your API_KEY in the environment to use AI features.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const design = await generateCardDesign(description, cardData);
      setCardData((prev) => ({
        ...prev,
        theme: design.theme,
        primaryColor: design.primaryColor,
        tagline: design.tagline,
        jobTitle: design.suggestedTitle || prev.jobTitle,
      }));
    } catch (error) {
      console.error("Failed to generate design", error);
      alert("Could not generate design. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTemplateSelect = (preset: TemplatePreset) => {
    setCardData((prev) => ({
      ...prev,
      theme: preset.id,
      primaryColor: preset.primaryColor,
      fullName: prev.fullName || preset.sample?.fullName || '',
      jobTitle: prev.jobTitle || preset.sample?.jobTitle || '',
      companyName: prev.companyName || preset.sample?.companyName || '',
      email: prev.email || preset.sample?.email || '',
      phone: prev.phone || preset.sample?.phone || '',
      website: prev.website || preset.sample?.website || '',
      address: prev.address || preset.sample?.address || '',
      tagline: prev.tagline || preset.sample?.tagline || '',
    }));
  };

  const handleDownload = async () => {
    if (!cardRef.current || !window.html2canvas) return;
    
    setIsDownloading(true);
    try {
      await new Promise(r => setTimeout(r, 100));

      const canvas = await window.html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${cardData.fullName.replace(/\s+/g, '_')}_BusinessCard.png`;
      link.click();
    } catch (error) {
      console.error("Download failed", error);
      alert("Failed to download image.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 focus:shadow-lg rounded"
      >
        Skip to main content
      </a>
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <nav className="flex items-center justify-between w-full" aria-label="Primary navigation">
            <button 
              type="button"
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              aria-label="GemCard home"
            >
              <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                <i className="fas fa-id-card" aria-hidden="true"></i>
              </span>
              <span className="text-xl font-bold text-slate-800 tracking-tight">
                GemCard
              </span>
            </button>
            <div className="flex gap-4 items-center">
               <button 
                 type="button"
                 onClick={scrollToGenerator} 
                 className="text-sm font-semibold text-slate-600 hover:text-slate-900 hidden sm:block"
               >
                 Create Card
               </button>
               <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-slate-900 hidden sm:block">
                 How it Works
               </a>
               <a 
                 href="https://github.com" 
                 target="_blank" 
                 rel="noreferrer" 
                 aria-label="GemCard on GitHub"
                 className="text-slate-400 hover:text-slate-600 transition-colors"
               >
                 <i className="fab fa-github text-xl" aria-hidden="true"></i>
               </a>
            </div>
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-1 flex flex-col">
        {/* Hero Section */}
        <HeroSection onStart={scrollToGenerator} />

        {/* Main Generator App Section */}
        <section 
          ref={generatorRef} 
          id="generator" 
          className="py-16 bg-slate-50 border-t border-slate-200 scroll-mt-16"
          aria-label="Business card generator"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <i className="fas fa-layer-group text-blue-500" aria-hidden="true"></i> Generator Workspace
              </h2>
              <p className="text-slate-500">Design your perfect card below.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
              {/* Left Column: Form */}
              <div className="lg:col-span-5 xl:col-span-4 h-full">
                <CardForm 
                  data={cardData} 
                  onChange={handleFieldChange} 
                  onGenerateAI={handleGenerateAI}
                  onMagicDesign={handleMagicDesign}
                  isGenerating={isGenerating}
                />
              </div>

              {/* Right Column: Preview */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                <div className="space-y-6">
                  <div className="bg-slate-200/50 rounded-2xl border-2 border-dashed border-slate-300 p-8 flex items-center justify-center min-h-[400px] relative group overflow-hidden">
                     <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" aria-hidden="true"></div>
                     <div className="z-10 shadow-2xl rounded overflow-hidden">
                        <CardPreview ref={cardRef} data={cardData} />
                     </div>
                     <div className="absolute bottom-4 right-4 text-xs text-slate-400 font-mono bg-white/80 px-2 py-1 rounded">
                        Preview Mode
                     </div>
                  </div>

                  <div className="flex justify-end gap-4">
                     <button 
                       onClick={() => setCardData({
                          fullName: 'Alex Morgan',
                          jobTitle: 'Creative Director',
                          companyName: 'Pixel Studio',
                          email: 'alex@pixelstudio.design',
                          phone: '+1 (555) 123-4567',
                          website: 'pixelstudio.design',
                          address: 'San Francisco, CA',
                          tagline: 'Designing the future, one pixel at a time.',
                          theme: CardTheme.MODERN,
                          primaryColor: '#6366f1'
                       })}
                       className="px-6 py-3 rounded-xl bg-white text-slate-600 border border-slate-200 font-semibold hover:bg-slate-50 transition-all shadow-sm"
                     >
                       Load Example
                     </button>
                     <button 
                       onClick={handleDownload}
                       disabled={isDownloading}
                       className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                       aria-live="polite"
                     >
                       {isDownloading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-download"></i>}
                       Download Card
                     </button>
                  </div>
                </div>

                <TemplateGallery 
                  selectedTheme={cardData.theme} 
                  onSelect={handleTemplateSelect} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Marketing Landing Page Sections */}
        <LossAversionSection />
        <BenefitsSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
      </main>

      <footer>
        <FooterCTA onStart={scrollToGenerator} />
      </footer>
    </div>
  );
};

export default App;
