import React from 'react';

const ClientsSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">בין לקוחותינו</h2>
        </div>

        {/* First Row */}
        <div className="flex items-center justify-center gap-12 mb-8">
          <div className="flex items-center justify-center w-30 opacity-60">
            <img src="/wework-logo 1.png" alt="WeWork" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-30 opacity-60">
            <img src="/Super Yuda 1.png" alt="Super Yuda" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-30 opacity-60">
            <img src="/MAC-Cosmetics-logo 1.png" alt="MAC" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-30 opacity-60">
            <img src="/Aristo Smat logo 1.png" alt="Aristo Smal" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-30 opacity-60">
            <img src="/f-54-logo-web 1.png" alt="ILAN'S" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-30 opacity-60">
            <img src="/Femina 1.png" alt="Femina" className="max-h-full max-w-full object-contain" />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex items-center justify-center gap-12">
          <div className="flex items-center justify-center w-30 opacity-60">
            <img src="/Group 212.png" alt="SACK'S" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-30 opacity-60">
            <img src="/Good Pharm 1.png" alt="FACTORY 54" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-30 opacity-60">
            <img src="/TOUS 2.png" alt="TOUS" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-30 opacity-60">
            <img src="/Good Pharm 1.png" alt="GOOD PHARM" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-30 opacity-60">
            <img src="/Arcaffe 1.png" alt="Arcaffe" className="max-h-full max-w-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsSection;
