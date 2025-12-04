import React, { useState, useRef, useCallback } from 'react';
import { CardData, CardTheme } from './types';
import CardForm from './components/CardForm';
import CardPreview from './components/CardPreview';
import { generateCardContent, generateCardDesign } from './services/geminiService';
import { 
  HeroSection, 
  LossAversionSection, 
  BenefitsSection, 
  ProcessSection, 
  TestimonialsSection, 
  FAQSection,
  FooterCTA
} from './components/LandingSections';

const App: React.FC = () => {
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
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <i className="fas fa-id-card"></i>
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              GemCard
            </h1>
          </div>
          <div className="flex gap-4">
             <button onClick={scrollToGenerator} className="text-sm font-semibold text-slate-600 hover:text-slate-900 hidden sm:block">
               Create Card
             </button>
             <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-slate-900 hidden sm:block">
               How it Works
             </a>
             <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors">
               <i className="fab fa-github text-xl"></i>
             </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection onStart={scrollToGenerator} />

      {/* Main Generator App Section */}
      <section 
        ref={generatorRef} 
        id="generator" 
        className="py-16 bg-slate-50 border-t border-slate-200 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <i className="fas fa-layer-group text-blue-500"></i> Generator Workspace
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
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-slate-200/50 rounded-2xl border-2 border-dashed border-slate-300 p-8 flex items-center justify-center min-h-[400px] relative group overflow-hidden">
                   <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none"></div>
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
                   >
                     {isDownloading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-download"></i>}
                     Download Card
                   </button>
                </div>
              </div>
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
      <FooterCTA onStart={scrollToGenerator} />

    </div>
  );
};

export default App;