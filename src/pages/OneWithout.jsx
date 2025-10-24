import Header from "../components/Header";
import PricingCard from "../components/PricingCard";
import ClientsSection from "../components/ClientsSection";
import Footer from "../components/Footer";
import BusinessServicesCard from "../components/BusinessServicesCard";
import React, { useState, useEffect } from "react";
import { getItemWithParentBoardRelation } from "../monday";
import FooterMobile from "../components/FooterMobile";
import domtoimage from "dom-to-image";
import { jsPDF } from "jspdf";
import OneWithoutPDF from "../pdf/pages/OneWithoutPDF";
import { uploadAndLinkToMonday } from "../dropbox";

// Helper to get query param by name
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

const OneWithout = () => {
  const [mondayData, setMondayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    let latestResponse = null;
    const fetchDataAndGeneratePDF = async () => {
      try {
        const response = await getItemWithParentBoardRelation();
        if (response && response.length > 0) {
          setMondayData(response);
        }
        latestResponse = response;
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Monday data:", err);
      } finally {
        setLoading(false);
      }

      // Wait for DOM to render
      setTimeout(async () => {
        try {
          const mainWrapper = document.querySelector(".onewithout");
          if (!mainWrapper) return;
          const options = {
            quality: 1,
            width: mainWrapper.scrollWidth,
            height: mainWrapper.scrollHeight,
            style: {
              transform: `scale(1)`,
              "transform-origin": "top center",
              "box-shadow": "none",
              opacity: "100%",
              display: "block",
              top: "none",
              left: "none",
            },
            filter: function (node) {
              if (node.style) {
                node.style.border = "none";
                node.style.outline = "none";
                node.style.boxShadow = "none";
              }
              return true;
            },
          };
          const svgDataUrl = await domtoimage.toSvg(mainWrapper, options);
          const img = new window.Image();
          img.src = svgDataUrl;
          const capturedResponse = latestResponse;
          img.onload = async function () {
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;
            const a4Width = 210;
            const scaleX = a4Width / (imgWidth * 0.264583);
            const finalWidth = a4Width;
            const finalHeight = imgHeight * 0.264583 * scaleX;
            const pdf = new jsPDF({
              orientation: "portrait",
              unit: "mm",
              format: [a4Width, finalHeight],
            });
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const canvasScale = 2;
            canvas.width = imgWidth * canvasScale;
            canvas.height = imgHeight * canvasScale;
            ctx.scale(canvasScale, canvasScale);
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, imgWidth, imgHeight);
            ctx.drawImage(img, 0, 0);
            const pngDataUrl = canvas.toDataURL("image/png", 1.0);
            pdf.addImage(pngDataUrl, "PNG", 0, 0, finalWidth, finalHeight);
            const pdfBlob = pdf.output("blob");
            // Get subitem name for filename
            let subitemName = "";
            if (
              capturedResponse &&
              capturedResponse.length > 0 &&
              capturedResponse[0].name
            ) {
              subitemName = capturedResponse[0].name;
            }
            // Format date as DD.MM.YYYY
            const d = new Date();
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = d.getFullYear();
            const dateStr = `${day}.${month}.${year}`;
            // File name in English
            const fileName = `מודוס מדיה -  הצעת מחי - ${subitemName} ${dateStr}.pdf`;
            const file = new File([pdfBlob], fileName, {
              type: "application/pdf",
            });
            setPdfFile(file);
            // Get mondayItemId from query param (?id=)
            const mondayItemId = getQueryParam("id") || 9542442798;
            // Dropbox path
            const dropboxTargetPath = `/Shiran Tal/Modus/הצעות מחיר/${fileName}`;
            // Upload to Dropbox
            await uploadAndLinkToMonday(file, dropboxTargetPath, mondayItemId);
          };
        } catch (err) {
          // Ignore errors in PDF upload for consistency with BundleWith
        }
      }, 2000);
    };
    fetchDataAndGeneratePDF();
  }, []);

  // Download the already generated PDF file from state
  const downloadSiteSVG = () => {
    if (!pdfFile) return;
    setIsDownloading(true);
    const button = document.querySelector(".site-export-btn");
    if (button) {
      button.classList.add("bg-green-600");
    }
    // Create a download link and trigger it
    const url = URL.createObjectURL(pdfFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = pdfFile.name || "modus-media.pdf"; // Aligned with BundleWith
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      if (button) {
        button.classList.remove("bg-green-600");
      }
      setIsDownloading(false);
    }, 1200);
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
          תכני מוסיקה <br /> בהתאמה אישית
        </>
      ),
    },
    {
      icon: "/Settings.svg",
      text: (
        <>
          עדכוני מוסיקה שוטפים <br /> בהתאם לפרופיל העסקי
        </>
      ),
    },
    {
      icon: "/Play.svg",
      text: (
        <>
          תוכנת נגן התקנת על מחשב <br /> לרגעים רגישים, שימושית בהם
        </>
      ),
    },
    {
      icon: "/Phone.svg",
      text: (
        <>
          אפליקציית מובייל (iOS, Android) <br /> שלט מרחוק השולט בתוכנת הנגן
        </>
      ),
    },
    {
      icon: "/Tools.svg",
      text: (
        <>
          תמיכה טכנית עבור תוכנת הנגן <br /> ואפליקציית המובייל
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-white z-[-2]">
        <Header mondayData={mondayData} />
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
      <div className="min-h-screen p-8 w-screen overflow-x-hidden relative">
        <Header mondayData={mondayData} /> {/* Fixed: Pass mondayData */}
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
    <>
      <div className="fixed top-4 left-4 z-50 overflow-hidden">
        <button
          onClick={downloadSiteSVG}
          disabled={isDownloading || !pdfFile}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white shadow-lg site-export-btn
            transition-all duration-200 hover:shadow-xl
            ${
              isDownloading
                ? "bg-green-600 cursor-not-allowed"
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
              <span dir="rtl">הורד קובץ PDF</span>
            </>
          )}
        </button>
      </div>
      <div className="p-8 max-w-[1150px] mx-auto overflow-x-hidden relative bg-white z-[-2] overflow-hidden">
        {/* Site PDF Download Button */}

        {/* Main content wrapped in PDF-content div */}
        <div className="pdf-content" id="pdf-content">
          <Header mondayData={mondayData} />
          <div className="flex flex-col-reverse md:flex-row gap-15 justify-center md:mt-20 mt-14 w-full">
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
        <OneWithoutPDF />
        <FooterMobile />
      </div>
    </>
  );
};

export default OneWithout;
