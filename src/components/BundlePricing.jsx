import React, { useEffect } from "react";
import FeatureItem from "./FeatureItem";

const BundlePricing = ({ title, number, features, mondayData }) => {
  // Extract data from Monday.com API response
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
    <div
      className={`bg-[#FAFAFA] md:w-[450px] max-w-[500px] rounded-3xl p-8 text-right flex flex-col justify-between relative `}
    >
      <div>
        <div className="mb-15">
          <div className="text-apna text-2xl md:text-4xl mb-2">{title}</div>
          <div className="flex items-center justify-end space-x-2">
            <div className="bg-apna text-white rounded-2xl px-4 py-2 text-3xl md:text-5xl flex items-center justify-center font-outfit">
              {number}
            </div>
            <span className="text-6xl font-light font-outfit text-dark">media</span>
          </div>
          <div className="text-lg md:text-2xl text-gray-800 text-left md:ps-14">
            music & video
          </div>
          <div className="text-lg text-gray-500 mt-1">החבילה כוללת:</div>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} icon={feature.icon} text={feature.text} />
          ))}
        </div>
      </div>

      <div className="flex justify-between md:gap-0 w-full ps-3 ms-auto items-center mt-20">
        <div className="right">
          <p className="text-sm md:text-md text-blue-900">+ מע"מ</p>
          <p className="text-sm md:text-md text-gray-500">לחודש</p>
          <p className="text-sm md:text-md text-gray-500">{quantityText}</p>
        </div>
        <div className="text-left">
          <span className="text-3xl md:text-5xl text-gray-600 mr-2">₪</span>
          <span className="text-5xl md:text-7xl font-bold text-apna">
            {displayPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BundlePricing;
