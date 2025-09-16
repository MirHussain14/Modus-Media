import React from "react";

const BundleServicesCard = ({
  title = "מדעי עסקים בוחרים",
  subtitle = "במדיום מדיה",
  packageTitle = "חבילת",
  packageNumber = "1",
  features = [],
  price = "170",
  currency = "₪",
  priceNote = "+ מע״מ לחודש לנקודת נגיעה",
  mondayData = []
}) => {
  const defaultFeatures = [
    {
      title: " יחס אישי",
      description:
        "אנחנו נותנים שירות אישי ותקשורת קרובה ואינטימית. אנחנו לא חותמים על טפסים ונעלמים. אנחנו כאן בשבילכם לכל אורך הדרך",
    },
    {
      title: "ייחודיות ואיכות",
      description:
        "אנחנו במודוס דואגים לערוך פלייליסטים איכותיים בהקפדה רבה ולהתאים את זה בדיוק מרבי לאופי ולקהל היעד של העסק",
    },
    {
      title: "קדמה טכנולוגית",
      description:
        "אנחנו משקיעים משאבים גדולים בפיתוח ושדרוג מערכות ניהול התוכן, כך שאתם נהנים מתפעול ממשקים מתקדמים ונוחים המאפשרים שליטה נרחבת בתכנים המתנגנים בעסק",
    },
    {
      title: "חסכון משמעותי",
      description:
        "אנו מציעים מסלול הפוטר אתכם מתשלום תמלוגים לארגוני הזכויות השונים, מסלול שיכול לחסוך לעסק שלך אלפי שקלים בשנה ויותר",
    },
    {
      title: "יחס המרה",
      description:
        "באמצעות עריכה מותאמת ונכונה אנחנו נעזור לך להפוך כל אורח ללקוח קבוע",
    },
    {
      title: "זמינות ותמיכה 24/7",
      description:
        "צוות התמיכה שלנו זמין עבורכם באופן מיידי 24/7, בוואטסאפ, בטלפון ובעסק",
    },
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;
  const getDisplayPrice = () => {
    if (mondayData[0].column_values[0].text) {
      const priceText = mondayData[0].column_values[0].text;
      console.log("Price Text:", priceText);
      return mondayData[0].column_values[0].text || "170"; // Fallback to 170 if no value is found
    }
  };

  const getQuantityText = () => {
    if (mondayData[0].column_values[1]) {
      const quantity = parseInt(mondayData[0].column_values[1].text);
      if (quantity > 1) {
        return `ל-${quantity} נקודות קצה`;
      }
    }
    return "לנקודת קצה"; // Default for quantity <= 1
  };

  const displayPrice = getDisplayPrice();
  const quantityText = getQuantityText();
  return (
    <div>
      <div className="bg-[#FAFAFA] md:w-[450px] max-w-[500px] rounded-3xl p-8 text-right flex flex-col relative">
        <h1
          dir="rtl"
          className="text-center font-bold text-4xl w-[80%] mx-auto text-[#0c1d50] mb-2 leading-snug"
        >
          מדוע עסקים בוחרים <br />
          במודוס <span className="font-light">מדיה</span>
        </h1>
        <div className="relative">
          <div className="background w-full">
            <img className="w-[110%]" src="/Vector 9 (Stroke).png" alt="" />
          </div>
          <div className="laptop absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%]">
            <img className="w-[80%] mx-auto" src="/Mask group 1.png" alt="" />
          </div>
          <div className="mobile absolute top-[55%] left-[60%] -translate-x-1/2 -translate-y-1/2">
            <img className="w-[90%]" src="/Слой 111 1.png" alt="" />
          </div>
        </div>
        {/* Bottom Features Grid - Original 6 features layout */}
        <div className="grid grid-cols-2 gap-6 pt-16">
          {defaultFeatures.map((feature, index) => (
            <div key={index} className="text-right">
              <h3 className="font-bold text-[#0c1d50] mb-2 text-xl">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between md:gap-0 w-full ps-3 ms-auto items-center mt-20">
        <div className="right">
          <p className="text-sm md:text-base text-blue-900">+ מע"מ</p>
          <p className="text-sm md:text-base text-gray-500">לחודש</p>
          <p className="text-sm md:text-base text-gray-500">{quantityText}</p>
        </div>
        <div className="text-left">
          <span className="text-3xl md:text-5xl text-gray-600 mr-2">₪</span>
          <span className="text-5xl md:text-7xl font-bold text-apna font-outfit">
            {displayPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BundleServicesCard;
