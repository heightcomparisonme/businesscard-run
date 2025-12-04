import React, { forwardRef } from 'react';
import { CardData, CardTheme } from '../types';

interface CardPreviewProps {
  data: CardData;
}

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ data }, ref) => {
  const {
    fullName,
    jobTitle,
    companyName,
    email,
    phone,
    website,
    address,
    tagline,
    theme,
    primaryColor,
  } = data;

  const displayFullName = fullName || 'Your Name';
  const displayJobTitle = jobTitle || 'Title';
  const initials =
    (fullName || companyName || 'GC')
      .split(' ')
      .filter(Boolean)
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'GC';
  const nameParts = displayFullName.trim().split(/\s+/).filter(Boolean);
  const primaryName = nameParts[0] || displayFullName;
  const secondaryName = nameParts.slice(1).join(' ');
  const boldLineTwo = secondaryName || (nameParts.length ? '' : 'Name');

  // Render logic based on theme
  const renderCardContent = () => {
    switch (theme) {
      case CardTheme.MODERN:
        return (
          <div className="w-full h-full flex overflow-hidden shadow-2xl relative bg-white text-slate-800">
            {/* Left accent bar */}
            <div className="w-1/3 h-full flex flex-col justify-center items-center p-6 text-white" style={{ backgroundColor: primaryColor }}>
              <div className="text-4xl font-bold mb-2 tracking-tighter uppercase border-4 border-white p-2">
                {fullName.charAt(0)}{companyName.charAt(0)}
              </div>
              <p className="opacity-90 text-sm font-medium tracking-widest uppercase text-center mt-4">
                {companyName}
              </p>
            </div>
            {/* Right content */}
            <div className="w-2/3 p-8 flex flex-col justify-center relative">
              <h1 className="text-3xl font-bold text-slate-900 mb-1 leading-tight">{fullName}</h1>
              <p className="text-lg font-medium mb-6 uppercase tracking-wide" style={{ color: primaryColor }}>{jobTitle}</p>
              
              <div className="space-y-2 text-sm text-slate-600">
                {email && (
                  <div className="flex items-center gap-3">
                    <i className="fas fa-envelope w-4 text-center text-slate-400"></i>
                    <span>{email}</span>
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-3">
                    <i className="fas fa-phone w-4 text-center text-slate-400"></i>
                    <span>{phone}</span>
                  </div>
                )}
                {website && (
                  <div className="flex items-center gap-3">
                    <i className="fas fa-globe w-4 text-center text-slate-400"></i>
                    <span>{website}</span>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-3">
                    <i className="fas fa-map-marker-alt w-4 text-center text-slate-400"></i>
                    <span>{address}</span>
                  </div>
                )}
              </div>

              {tagline && (
                 <div className="mt-6 pt-4 border-t border-slate-100 italic text-slate-500 text-xs">
                   "{tagline}"
                 </div>
              )}
            </div>
          </div>
        );

      case CardTheme.MINIMALIST:
        return (
          <div className="w-full h-full flex flex-col justify-between p-10 bg-white text-slate-900 shadow-2xl relative border border-slate-200">
             <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: primaryColor }}></div>
             
             <div>
               <h1 className="text-3xl font-light tracking-tight mb-2">{fullName}</h1>
               <p className="text-sm uppercase tracking-widest font-semibold text-slate-400">{jobTitle}</p>
             </div>

             {tagline && <p className="text-center italic text-slate-500 text-sm my-4">{tagline}</p>}

             <div className="flex justify-between items-end text-xs font-mono text-slate-600">
               <div className="space-y-1">
                 {email && <p>{email}</p>}
                 {phone && <p>{phone}</p>}
               </div>
               <div className="space-y-1 text-right">
                 {website && <p>{website}</p>}
                 {companyName && <p className="font-bold">{companyName}</p>}
               </div>
             </div>
          </div>
        );

      case CardTheme.CREATIVE:
        return (
          <div 
            className="w-full h-full p-8 shadow-2xl relative text-white flex flex-col justify-center items-center text-center"
            style={{ 
              background: `linear-gradient(135deg, ${primaryColor} 0%, #1e293b 100%)`
            }}
          >
            <div className="absolute top-4 right-4 text-white opacity-20 text-6xl font-serif">
              <i className="fas fa-quote-right"></i>
            </div>

            <div className="relative z-10">
              <h1 className="text-4xl font-serif font-bold mb-2">{fullName}</h1>
              <p className="text-lg opacity-90 mb-6 font-light">{jobTitle}</p>
              
              <div className="w-16 h-1 bg-white opacity-50 mx-auto mb-6 rounded-full"></div>
              
              <div className="text-sm space-y-1 opacity-90 font-light">
                 {companyName && <p className="font-bold mb-2 text-base">{companyName}</p>}
                 {email && <p>{email}</p>}
                 {phone && <p>{phone}</p>}
                 {website && <p>{website}</p>}
              </div>
            </div>

            {tagline && (
              <div className="absolute bottom-6 w-full px-8 text-xs opacity-60 tracking-wider">
                {tagline}
              </div>
            )}
          </div>
        );

      case CardTheme.TECH:
        return (
          <div className="w-full h-full bg-slate-900 text-green-400 font-mono p-6 shadow-2xl flex flex-col relative border-2 border-slate-700">
            <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    <span style={{color: primaryColor}}>&gt;</span> {fullName}<span className="animate-pulse">_</span>
                  </h1>
                  <p className="text-xs text-slate-400 uppercase">{jobTitle}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">v1.0.0</div>
                  <div className="text-sm font-bold text-white mt-1">{companyName}</div>
                </div>
            </div>

            <div className="flex-grow flex items-center">
                {tagline && (
                  <div className="w-full bg-slate-800 p-3 rounded border-l-4 border-slate-600 text-xs text-slate-300">
                    // {tagline}
                  </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mt-6">
              {email && (
                <div className="bg-slate-800 p-2 rounded">
                  <span className="text-slate-500 mr-2">const email =</span>
                  <span className="break-all">'{email}'</span>;
                </div>
              )}
                {phone && (
                <div className="bg-slate-800 p-2 rounded">
                  <span className="text-slate-500 mr-2">const phone =</span>
                  <span>'{phone}'</span>;
                </div>
              )}
                {website && (
                <div className="bg-slate-800 p-2 rounded col-span-2">
                  <span className="text-slate-500 mr-2">const web =</span>
                  <span>'{website}'</span>;
                </div>
              )}
            </div>
          </div>
        );

      case CardTheme.ELEGANT:
        return (
          <div className="w-full h-full p-8 bg-slate-900 text-amber-50 shadow-2xl flex flex-col justify-center items-center text-center relative">
             <div className="absolute inset-4 border border-amber-500/30"></div>
             <div className="absolute inset-5 border border-amber-500/20"></div>
             
             <div className="relative z-10">
                <div className="text-amber-500 mb-4 text-2xl">
                   <i className="fas fa-crown"></i>
                </div>
                <h1 className="text-4xl font-serif tracking-wide text-white mb-2">{fullName}</h1>
                <p className="text-xs uppercase tracking-[0.3em] text-amber-500 mb-8">{jobTitle}</p>

                <div className="space-y-2 text-sm font-light font-serif opacity-90">
                  {companyName && <p className="font-semibold mb-2">{companyName}</p>}
                  {email && <p>{email}</p>}
                  {phone && <p>{phone}</p>}
                  {website && <p className="text-amber-200">{website}</p>}
                </div>
                
                {tagline && (
                   <div className="mt-8 pt-4 border-t border-amber-500/30 inline-block px-8 italic text-xs text-slate-400 font-serif">
                     {tagline}
                   </div>
                )}
             </div>
          </div>
        );

      case CardTheme.BOLD:
        return (
          <div 
            className="w-full h-full p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden"
            style={{ backgroundColor: primaryColor }}
          >
             {/* Abstract circle */}
             <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white opacity-10"></div>
             <div className="absolute -left-10 bottom-10 w-32 h-32 rounded-full bg-black opacity-5"></div>

             <div className="relative z-10 mt-4">
               <h1 className="text-5xl font-extrabold text-white tracking-tight leading-none mb-2 drop-shadow-sm">
                 {primaryName}<br/>
                 {boldLineTwo}
               </h1>
               <div className="inline-block bg-white text-slate-900 px-3 py-1 text-sm font-bold uppercase tracking-wider mt-2 transform -skew-x-6">
                 {displayJobTitle}
               </div>
             </div>

             <div className="relative z-10 text-white font-medium">
                {companyName && <p className="text-xl font-bold mb-4 opacity-90">{companyName}</p>}
                
                <div className="flex flex-wrap gap-4 text-sm opacity-90">
                   {email && <div><i className="fas fa-envelope mr-2"></i>{email}</div>}
                   {phone && <div><i className="fas fa-phone mr-2"></i>{phone}</div>}
                   {website && <div><i className="fas fa-globe mr-2"></i>{website}</div>}
                </div>
             </div>
          </div>
        );

      case CardTheme.GEOMETRIC:
        return (
          <div className="w-full h-full bg-slate-50 shadow-2xl relative overflow-hidden flex">
             {/* Diagonal Background */}
             <div 
               className="absolute top-0 right-0 h-full w-2/3 transform skew-x-[-20deg] translate-x-20 origin-top"
               style={{ backgroundColor: primaryColor }}
             ></div>
             
             <div className="relative z-10 w-1/2 p-8 flex flex-col justify-center text-slate-800">
                <h1 className="text-3xl font-bold mb-1">{fullName}</h1>
                <p className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: primaryColor }}>{jobTitle}</p>
                
                <div className="space-y-3 text-sm">
                   {companyName && <div className="font-bold text-slate-900">{companyName}</div>}
                   {email && <div className="text-slate-600">{email}</div>}
                   {phone && <div className="text-slate-600">{phone}</div>}
                   {address && <div className="text-slate-600">{address}</div>}
                </div>
             </div>

             <div className="relative z-10 w-1/2 p-8 flex flex-col justify-center items-end text-right text-white">
                {website && (
                  <div className="mb-8">
                     <p className="font-mono text-lg font-bold border-b-2 border-white/30 pb-1">{website}</p>
                  </div>
                )}
                {tagline && (
                   <div className="text-lg font-light leading-relaxed max-w-[200px]">
                     {tagline}
                   </div>
                )}
            </div>
          </div>
        );

      case CardTheme.HORIZON:
        return (
          <div className="w-full h-full bg-white text-slate-900 shadow-2xl relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(180deg, ${primaryColor}22 0%, #ffffff 55%, #e2e8f0 100%)` }}
              aria-hidden="true"
            ></div>
            <div
              className="absolute -left-16 top-10 w-52 h-52 rounded-full opacity-20 blur-2xl"
              style={{ backgroundColor: primaryColor }}
              aria-hidden="true"
            ></div>
            <div className="relative z-10 h-full flex flex-col p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Profile</p>
                  <h1 className="text-3xl font-semibold mt-1 mb-1">{displayFullName}</h1>
                  <p className="text-sm font-semibold" style={{ color: primaryColor }}>{displayJobTitle}</p>
                </div>
                <div className="text-right text-xs text-slate-500 space-y-1">
                  {companyName && <div className="font-semibold text-slate-700">{companyName}</div>}
                  {website && <div>{website}</div>}
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-slate-200">
                {tagline ? (
                  <p className="italic text-sm text-slate-600 max-w-[360px]">{tagline}</p>
                ) : (
                  <p className="text-sm text-slate-400">Add a short promise that sits on the horizon of your work.</p>
                )}
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 mt-4">
                  {email && (
                    <div className="flex items-center gap-2">
                      <i className="fas fa-envelope text-slate-400 w-4 text-center"></i>
                      <span className="break-all">{email}</span>
                    </div>
                  )}
                  {phone && (
                    <div className="flex items-center gap-2">
                      <i className="fas fa-phone text-slate-400 w-4 text-center"></i>
                      <span>{phone}</span>
                    </div>
                  )}
                  {address && (
                    <div className="flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-slate-400 w-4 text-center"></i>
                      <span>{address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case CardTheme.MONOGRAM:
        return (
          <div className="w-full h-full bg-white text-slate-900 shadow-2xl flex items-center px-10 gap-8 relative">
            <div className="absolute inset-y-8 left-24 w-px bg-slate-200" aria-hidden="true"></div>
            <div
              className="flex-shrink-0 w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold"
              style={{ borderColor: primaryColor, color: primaryColor, backgroundColor: '#f8fafc' }}
            >
              {initials}
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold tracking-tight">{displayFullName}</h1>
              <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: primaryColor }}>{displayJobTitle}</p>
              <div className="text-sm text-slate-600 space-y-1 mt-2">
                {companyName && <div className="font-semibold text-slate-800">{companyName}</div>}
                {email && <div>{email}</div>}
                {phone && <div>{phone}</div>}
              </div>
            </div>
            <div className="ml-auto text-right text-xs text-slate-500 max-w-[140px] italic">
              {tagline || 'A concise statement about your expertise.'}
            </div>
          </div>
        );

      case CardTheme.NEON:
        return (
          <div className="w-full h-full bg-slate-950 text-white relative shadow-[0_10px_50px_rgba(15,23,42,0.55)] overflow-hidden p-8 flex flex-col">
            <div
              className="absolute inset-0 rounded"
              style={{ boxShadow: `0 0 0 2px ${primaryColor}, 0 0 24px ${primaryColor}55, inset 0 0 24px ${primaryColor}55`, borderRadius: '0.5rem' }}
              aria-hidden="true"
            ></div>
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Neon Identity</p>
                <h1 className="text-3xl font-bold mt-2 mb-1">{displayFullName}</h1>
                <p className="text-sm font-semibold" style={{ color: primaryColor }}>{displayJobTitle}</p>
              </div>
              <div className="text-right text-xs text-slate-400 space-y-1">
                {companyName && <div className="font-semibold text-white">{companyName}</div>}
                {website && <div>{website}</div>}
              </div>
            </div>
            <div className="relative z-10 flex-grow flex items-center">
              <div className="bg-slate-900/70 border border-slate-800 rounded px-4 py-3 text-sm font-mono text-slate-200 shadow-inner w-full">
                {tagline ? `< ${tagline} />` : '<plug in your differentiator />'}
              </div>
            </div>
            <div className="relative z-10 grid grid-cols-3 gap-3 text-xs text-slate-200">
              {email && (
                <div className="flex items-center gap-2 bg-slate-900/70 px-3 py-2 rounded border border-slate-800">
                  <i className="fas fa-at text-[10px]" style={{ color: primaryColor }}></i>
                  <span className="truncate">{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2 bg-slate-900/70 px-3 py-2 rounded border border-slate-800">
                  <i className="fas fa-wave-square text-[10px]" style={{ color: primaryColor }}></i>
                  <span>{phone}</span>
                </div>
              )}
              {website && (
                <div className="flex items-center gap-2 bg-slate-900/70 px-3 py-2 rounded border border-slate-800">
                  <i className="fas fa-globe text-[10px]" style={{ color: primaryColor }}></i>
                  <span className="truncate">{website}</span>
                </div>
              )}
            </div>
          </div>
        );

      case CardTheme.GRID:
        return (
          <div className="w-full h-full bg-white text-slate-900 shadow-2xl relative overflow-hidden border border-slate-200">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `linear-gradient(to right, ${primaryColor}15 1px, transparent 1px), linear-gradient(to bottom, ${primaryColor}15 1px, transparent 1px)`,
                backgroundSize: '22px 22px'
              }}
              aria-hidden="true"
            ></div>
            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{displayFullName}</h1>
                  <p className="text-sm uppercase tracking-[0.2em] font-semibold" style={{ color: primaryColor }}>{displayJobTitle}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: primaryColor }}>
                    ID {initials}
                  </div>
                  {companyName && <div className="text-sm text-slate-600">{companyName}</div>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
                {email && (
                  <div className="flex items-center gap-2">
                    <i className="fas fa-envelope text-slate-400 w-4 text-center"></i>
                    <span className="break-all">{email}</span>
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-2">
                    <i className="fas fa-phone text-slate-400 w-4 text-center"></i>
                    <span>{phone}</span>
                  </div>
                )}
                {website && (
                  <div className="flex items-center gap-2">
                    <i className="fas fa-globe text-slate-400 w-4 text-center"></i>
                    <span>{website}</span>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-slate-400 w-4 text-center"></i>
                    <span>{address}</span>
                  </div>
                )}
              </div>

              {tagline && <div className="text-xs text-slate-500 italic mt-3 border-t border-slate-200 pt-2">{tagline}</div>}
            </div>
          </div>
        );

      case CardTheme.CLASSIC:
      default:
        return (
          <div className="w-full h-full p-8 bg-[#fdfbf7] text-slate-900 shadow-2xl flex flex-col items-center justify-center border-t-8 text-center"
               style={{ borderColor: primaryColor }}
          >
             <h1 className="text-3xl font-serif font-bold text-slate-800 mb-2">{fullName}</h1>
             <p className="text-sm font-sans uppercase tracking-widest text-slate-500 mb-6">{jobTitle}</p>
             
             <div className="w-full border-t border-slate-200 my-2"></div>
             
             <div className="mt-4 space-y-2 text-sm font-serif text-slate-700">
               {companyName && <p className="font-bold text-base">{companyName}</p>}
               {email && <p>{email}</p>}
               {phone && <p>{phone}</p>}
               {website && <p>{website}</p>}
               {address && <p>{address}</p>}
             </div>

             {tagline && <p className="mt-6 text-xs italic text-slate-400 font-serif">"{tagline}"</p>}
          </div>
        );
    }
  };

  return (
    <div className="flex justify-center items-center w-full py-8">
      {/* 
        Standard Business Card Ratio is 3.5 x 2 inches. 
        Aspect ratio 1.75.
        We scale this up for display.
        Width: 560px (3.5 * 160)
        Height: 320px (2 * 160)
      */}
      <div 
        ref={ref}
        style={{ width: '560px', height: '320px', minWidth: '560px', minHeight: '320px' }}
        className="transition-all duration-300 transform hover:scale-[1.02] origin-center"
      >
        {renderCardContent()}
      </div>
    </div>
  );
});

CardPreview.displayName = 'CardPreview';
export default CardPreview;
