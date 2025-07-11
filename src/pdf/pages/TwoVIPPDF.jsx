import HeaderPDF from "../HeaderPDF";
import ClientsSectionPDF from "../ClientsSectionPDF";
import FooterPDF from "../FooterPDF";
import React, { useState, useEffect } from "react";
import { getItemWithParentBoardRelation } from "../../monday";
import BusinessServicesCardPDF from "../BusinessServicesCardPDF";
import PricingCardPDF from "../PricingCardPDF";

const TwoVIPPDF = () => {
  const [mondayData, setMondayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          מערכת מחשב
          <br />
          <span className="text-apna">Modus Mini Box</span>
        </>
      ),
    },
    {
      icon: "/Music.svg",
      text: (
        <>
          תכני מוסיקה <span className="text-apna">VIP</span>
          <br />
          בהתאמה אישית
        </>
      ),
    },
    {
      icon: "/Settings.svg",
      text: (
        <>
          עדכוני מוסיקה שוטפים בהתאם
          <br />
          לפרופיל העסקי
        </>
      ),
    },
    {
      icon: "/Play.svg",
      text: (
        <>
          תוכנת נגן
          <br />
          ורישיון שימוש בה
        </>
      ),
    },
    {
      icon: "/Phone.svg",
      text: (
        <>
          אפליקציית מובייל (iOS, Android)
          <br />
          שלט רחוק השולט בתוכנת הנגן
        </>
      ),
    },
    {
      icon: "/Tools.svg",
      text: (
        <>
          תמיכה טכנית עבור תוכנת הנגן
          <br />
          ואפליקציית המובייל
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen">
        <HeaderPDF />
        <div className="flex items-center justify-center mt-20">
          <div className="text-center">
            <div className="text-xl text-gray-600">טוען נתונים...</div>
          </div>
        </div>
        <ClientsSectionPDF />
        <FooterPDF />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <HeaderPDF />
        <div className="flex items-center justify-center mt-20">
          <div className="text-center">
            <div className="text-xl text-red-500">
              שגיאה בטעינת הנתונים: {error}
            </div>
          </div>
        </div>
        <ClientsSectionPDF />
        <FooterPDF />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 twovip opacity-0 absolute top-0 left-0">
      <div id="pdf-content" className="w-[1000.97px] mx-auto">
        <HeaderPDF />
        <div className="flex gap-5 justify-center mt-14 w-full">
          <BusinessServicesCardPDF
            title="מדעי עסקים בוחרים"
            subtitle="במודוס מדיה"
            packageTitle="חבילת"
            packageNumber="1"
            features={package1Features}
            price="170"
            currency="₪"
            priceNote="+ מע״מ לחודש לנקודת נגיעה"
          />
          <PricingCardPDF
            title="חבילת"
            number="2"
            features={package2Features}
            price="170"
            mondayData={mondayData}
          />
        </div>
        <ClientsSectionPDF />
        <FooterPDF />
      </div>
    </div>
  );
};

export default TwoVIPPDF;