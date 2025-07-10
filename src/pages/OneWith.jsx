import Header from "../components/Header";
import PricingCard from "../components/PricingCard";
import ClientsSection from "../components/ClientsSection";
import Footer from "../components/Footer";
import BusinessServicesCard from "../components/BusinessServicesCard";
import React, { useState, useEffect } from "react";
import { getItemWithParentBoardRelation } from "../monday";
import FooterMobile from "../components/FooterMobile";
import domtoimage from "dom-to-image";
import { jsPDF } from 'jspdf';

const OneWith = () => {
  const [mondayData, setMondayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

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

  // Export the complete website as PDF using dom-to-image, hiding buttons
  const downloadSiteSVG = () => {
    setIsDownloading(true);
    
    // Show alert instead of notification
    alert("מתחיל ייצוא PDF... אנא המתן");
    
    // Select the main wrapper (the outermost div with min-h-screen p-8)
    const mainWrapper = document.querySelector('.min-h-screen.p-8');
    const button = document.querySelector('.site-export-btn');
    
    if (!mainWrapper) {
      alert("לא נמצא אלמנט ראשי לייצוא");
      setIsDownloading(false);
      return;
    }
    
    // Hide button during export
    if (button) button.style.display = 'none';
    
    // Configure dom-to-image options to remove borders and improve quality
    const options = {
      quality: 1.0,
      width: mainWrapper.scrollWidth,
      height: mainWrapper.scrollHeight * 1.3,
      style: {
        'transform': 'scale(1.32)',
        'transform-origin': 'center top',
        'border': 'none',
        'outline': 'none',
        'box-shadow': 'none'
      },
      filter: function (node) {
        // Remove any border styles from all elements
        if (node.style) {
          node.style.border = 'none';
          node.style.outline = 'none';
          node.style.boxShadow = 'none';
        }
        return true;
      }
    };
    
    domtoimage.toSvg(mainWrapper, options)
      .then(function (svgDataUrl) {
        // Create a new image element to load the SVG
        const img = new Image();

        img.onload = function() {
          try {
            // Get the image dimensions
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;

            // A4 dimensions in mm
            const a4Width = 210;

            // Calculate scale to fit the image exactly to the A4 width
            const scaleX = a4Width / (imgWidth * 0.264583); // px to mm (96 DPI)
            const finalWidth = a4Width;
            const finalHeight = imgHeight * 0.264583 * scaleX;

            // Create PDF document with custom height to fit the entire content
            const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'mm',
              format: [a4Width, finalHeight * 1.05] // Custom format: [width, height]
            });

            // Convert SVG to PNG for better PDF compatibility
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size with high resolution for quality
            const canvasScale = 4; // Increased scale for better quality
            canvas.width = imgWidth * canvasScale;
            canvas.height = imgHeight * canvasScale;
            ctx.scale(canvasScale, canvasScale);

            // Set white background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, imgWidth, imgHeight);

            // Draw the image on canvas
            ctx.drawImage(img, 0, 0);

            // Convert canvas to PNG data URL
            const pngDataUrl = canvas.toDataURL('image/png', 1.0);

            // Add the image to PDF - it will now fit perfectly without cropping
            pdf.addImage(pngDataUrl, 'PNG', 0, 0, finalWidth, finalHeight);

            // Save the PDF with specific filename for OneWith component
            pdf.save('modus-media-one-with.pdf');

            // Show success alert
            alert("PDF נוצר בהצלחה!");

            // Restore elements
            if (button) button.style.display = '';
            setIsDownloading(false);

          } catch (error) {
            console.error('Error creating PDF:', error);
            alert('שגיאה ביצירת PDF: ' + error.message);

            // Restore elements on error
            if (button) button.style.display = '';
            setIsDownloading(false);
          }
        };

        img.onerror = function() {
          alert('שגיאה בטעינת התמונה עבור PDF');

          // Restore elements on error
          if (button) button.style.display = '';
          setIsDownloading(false);
        };

        // Load the SVG data URL
        img.src = svgDataUrl;
      })
      .catch(function (error) {
        // Restore elements on error
        if (button) button.style.display = '';
        alert('שגיאה ביצוא SVG: ' + error);
        setIsDownloading(false);
      });
  };

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
      icon: "/Music.svg",
      text: (
        <>
          תכני מוסיקה בהתאמה אישית <br />
          <span className="text-apna">כולל כל עלויות התמלוגים</span>
        </>
      ),
    },
    {
      icon: "/Settings.svg",
      text: (
        <>
          ה שוטפים בהתאם <br />
          בהתאם לפרופיל העסקי
        </>
      ),
    },
    {
      icon: "/Play.svg",
      text: (
        <>
          תוכנת נגן המותקנת על מחשב <br />
          לקוח לרבות רישיון שימוש בה
        </>
      ),
    },
    {
      icon: "/Phone.svg",
      text: (
        <>
          אפליקציית מובייל (iOS, Android) <br />
          שלט רחוק השולט בתוכנת הנגן
        </>
      ),
    },
    {
      icon: "/Tools.svg",
      text: (
        <>
          תמיכה טכנית עבור תוכנת הנגן <br />
          ואפליקציית המובייל
        </>
      ),
    },
  ];

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
    <div className="min-h-screen p-8">
      {/* Site PDF Download Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={downloadSiteSVG}
          disabled={isDownloading}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white shadow-lg site-export-btn
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
              מייצא PDF...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              הורד PDF של האתר
            </>
          )}
        </button>
      </div>

      {/* Main content wrapped in PDF-content div */}
      <div id="pdf-content">
        <Header />
        <div className="flex flex-col-reverse md:flex-row gap-5 justify-center md:mt-20 mt-14 w-full">
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
            number="1"
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

export default OneWith;