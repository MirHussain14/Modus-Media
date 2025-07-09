import Header from "../components/Header";
import PricingCard from "../components/PricingCard";
import ClientsSection from "../components/ClientsSection";
import Footer from "../components/Footer";
import BusinessServicesCard from "../components/BusinessServicesCard";
import React, { useState, useEffect } from "react";
import { getItemWithParentBoardRelation } from "../monday";
import FooterMobile from "../components/FooterMobile";

const Video = () => {
  const [mondayData, setMondayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItemWithParentBoardRelation();
        if (response && response.length > 0) {
          setMondayData(response);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Monday data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const package1Features = [
    {
      icon: "/Music.svg",
      text: "תכני מוסיקה בהתאמה אישית כולל כל עדויות המהלומים",
    },
    {
      icon: "/Settings.svg",
      text: "עדכוני מוסיקה שוטפים בהתאם לפרופיל העסקי",
    },
    {
      icon: "/Play.svg",
      text: "תוכנת נגן התמקמת על מחשב לקוות לרגעים רגישים שימושי בה",
    },
    {
      icon: "/Phone.svg",
      text: "אפליקצית מובייל (iOS, Android) שליט ריחוק השולטת בתוכנת הנגן",
    },
    {
      icon: "/Tools.svg",
      text: "תמיכה טכנית עבור תוכנת הנגן ואפליקצית המובייל",
    },
  ];

  const package2Features = [
    {
      icon: "/uilMusic.svg",
      text: (
        <>
          מערכת מחשב <br />
          <span className="text-apna">Modus Video Box</span>
        </>
      ),
    },
    {
      icon: "/Settings.svg",
      text: (
        <>
          תזמון והפעלה אוטומטיים <br />
          בהתאם לשעות הפעילות
        </>
      ),
    },
    {
      icon: "/Play.svg",
      text: (
        <>
          נגן וידאו חכם, פתרון ענן. עד 2 <br /> מסכים. תכני וידאו מותאמים
        </>
      ),
    },
    {
      icon: "/Tools.svg",
      text: (
        <>
          תמיכה טכנית עבור מערכת נגן <br />
          <span className="text-apna">Modus Media Box</span>
        </>
      ),
    },
  ];

  const downloadPDF = () => {
    setIsDownloading(true);
    setShowNotification(true);

    // Print styles are in global CSS (index.css)
    setTimeout(() => {
      window.print();
      setIsDownloading(false);
      setShowNotification(false);
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 lg: ">
        <Header />
        <div className="flex items-center justify-center mt-20">
          <div className="text-center">
            <div className="text-xl text-gray-600">טוען נתונים...</div>
          </div>
        </div>
        <ClientsSection />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 lg: ">
        <Header />
        <div className="flex items-center justify-center mt-20">
          <div className="text-center">
            <div className="text-xl text-red-500">
              שגיאה בטעינת הנתונים: {error}
            </div>
          </div>
        </div>
        <ClientsSection />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 lg: font-outfit">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          מייצא PDF... אנא המתן
        </div>
      )}

      {/* PDF Download Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white shadow-lg
            transition-all duration-200 hover:shadow-xl
            ${
              isDownloading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }
          `}
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              מדפיס...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              הדפס כ-PDF
            </>
          )}
        </button>
      </div>

      {/* Main content wrapped in PDF-content div */}
      <div id="pdf-content">
        <Header />
        <div className="flex flex-col md:flex-row gap-5 justify-center md:mt-20 mt-14 w-full">
          <BusinessServicesCard
            title="מדעי עסקים בוחרים"
            subtitle="במודוס מדיה"
            packageTitle="חבילת"
            packageNumber="1"
            features={package1Features}
            price="170"
            currency="₪"
            priceNote="+ מע״מ לחודש לנקודת נגיעה"
          />
          <PricingCard
            title="חבילת"
            number="3"
            features={package2Features}
            price="170"
            mondayData={mondayData}
          />
        </div>
        <ClientsSection />
        <Footer />
      </div>
      <FooterMobile />
    </div>
  );
};

export default Video;