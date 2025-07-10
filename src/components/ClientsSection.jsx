import React from 'react';

const ClientsSection = () => {
  return (
    <div className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">בין לקוחותינו</h2>
        </div>

        {/* First Row */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-4 sm:mb-6 md:mb-8 items-center justify-items-center">
          <div className="flex items-center justify-center w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
            <img src="/wework-logo 1.png" alt="WeWork" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
            <img src="/Super Yuda 1.png" alt="Super Yuda" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
            <img src="/MAC-Cosmetics-logo 1.png" alt="MAC" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
            <img src="/Aristo Smat logo 1.png" alt="Aristo Smal" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
            <img src="/Group 212.png" alt="Factory 54" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
            <img src="/Femina 1.png" alt="Femina" className="max-h-full max-w-full object-contain" />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center justify-items-center">
          <div className="flex items-center justify-center w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
            <img src="/slaks logo 1.png" alt="SACK'S" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
            <img src="/f-54-logo-web 1.png" alt="FACTORY 54" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
            <img src="/TOUS 2.png" alt="TOUS" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
            <img src="/Good Pharm 1.png" alt="GOOD PHARM" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-center w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 lg:w-24 lg:h-16">
            <img src="/Arcaffe 1.png" alt="Arcaffe" className="max-h-full max-w-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsSection;
