import Header from "../components/Header";
import PricingCard from "../components/PricingCard";
import ClientsSection from "../components/ClientsSection";
import Footer from "../components/Footer";
import BusinessServicesCard from "../components/BusinessServicesCard";
import React, { useState, useEffect } from "react";
import { getItemWithParentBoardRelation } from "../monday";
const TwoVIP = () => {
  const [mondayData, setMondayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Monday.com data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItemWithParentBoardRelation();
        if (response && response.length > 0) {
          setMondayData(response); // Get the first item
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
    { icon: "/Settings.svg", text: "עדכוני מוסיקה שוטפים בהתאם לפרופיל העסקי" },
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
          <span className="text-blue-500">Modus Mini Box</span>
        </>
      ),
    },
    {
      icon: "/Music.svg",
      text: (
        <>
          תכני מוסיקה <span className="text-blue-500">VIP</span>
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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen p-8 xl:px-64">
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

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen p-8 xl:px-64">
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
    <div className="min-h-screen p-8 xl:px-64">
      <Header />
      <div className="flex flex-col md:flex-row gap-5 justify-between md:mt-20 w-full mt-14">
        <BusinessServicesCard
          title="מדעי עסקים בוחרים"
          subtitle="במדיום מדיה"
          packageTitle="חבילת"
          packageNumber="1"
          features={package1Features}
          price="170"
          currency="₪"
          priceNote="+ מע״מ לחודש לנקודת נגיעה"
        />
        <PricingCard
          title="חבילת"
          number="2"
          features={package2Features}
          price="170"
          mondayData={mondayData}
        />
      </div>

      <ClientsSection />
      <Footer />
    </div>
  );
};

export default TwoVIP;
