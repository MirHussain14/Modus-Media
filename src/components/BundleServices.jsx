import React from 'react';

const BundleServicesCard = ({ 
  title = "מדעי עסקים בוחרים", 
  subtitle = "במדיום מדיה",
  packageTitle = "חבילת",
  packageNumber = "1", 
  features = [],
  price = "170",
  currency = "₪",
  priceNote = "+ מע״מ לחודש לנקודת נגיעה"
}) => {
  const defaultFeatures = [
    {
      title: "ימי עשיה",
      description: "שירות מהיר ויעיל עד 3 ימי עשיה. נותנים לכם פתרון מהיר ומקצועי בזמן קצר"
    },
    {
      title: "יחידות איכות",
      description: "שירות איכותי ומקצועי עם ציוד איכותי. נותנים לכם שירות מקצועי עם ציוד איכותי"
    },
    {
      title: "דלמה טכנולוגיה",
      description: "שירות מקצועי עם טכנולוגיה מתקדמת. נותנים לכם פתרון טכנולוגי מתקדם"
    },
    {
      title: "תכנון שמעשים",
      description: "שירות תכנון מקצועי וחדשני. נותנים לכם פתרון תכנון מקצועי ויעיל"
    },
    {
      title: "יתח הכרה",
      description: "שירות מקצועי ויעיל לכל הצרכים. נותנים לכם פתרון מלא ומקצועי"
    },
    {
      title: "תמיכה זמינות 24/7",
      description: "תמיכה טכנית זמינה 24 שעות ביממה 7 ימים בשבוע. נותנים לכם תמיכה מלאה"
    }
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <div className="bg-[#FAFAFA] md:w-[450px] max-w-[500px] rounded-3xl p-8 text-right flex flex-col relative">
      <h1
        dir="rtl"
        className="text-center font-semibold text-4xl w-[80%] mx-auto text-[#0c1d50] mb-2 leading-snug"
      >
        מדוע עסקים בוחרים <br />
        במודוס <span className="font-light">מדיה</span>
      </h1>
      <div className="relative">
        <div className="background w-full">
          <img className='w-[110%]' src="/Vector 9 (Stroke).png" alt="" />
        </div>
        <div className="laptop absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%]">
          <img className='w-[80%] mx-auto' src="/Mask group 1.png" alt="" />
        </div>
        <div className="mobile absolute top-[55%] left-[60%] -translate-x-1/2 -translate-y-1/2">
          <img className='w-[90%]' src="/Слой 111 1.png" alt="" />
        </div>
      </div>
      {/* Bottom Features Grid - Original 6 features layout */}
      <div className="grid grid-cols-2 gap-6 pt-16">
        {defaultFeatures.map((feature, index) => (
          <div key={index} className="text-right">
            <h3 className="font-bold text-[#0c1d50] mb-2 text-2xl">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BundleServicesCard;