import React, { useEffect } from "react";
import FeatureItem from "./FeatureItem";

const PricingCard = ({ title, number, features, mondayData }) => {
  // Extract data from Monday.com API response
  const getDisplayPrice = () => {
    if (mondayData[0].column_values[0].text) {
      const priceText = mondayData[0].column_values[0].text;
      console.log("Price Text:", priceText);
      return mondayData[0].column_values[0].text || '170'; // Fallback to 170 if no value is found
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
      className={`bg-[#FAFAFA] w-full md:w-[40%] rounded-3xl p-8 text-right flex flex-col justify-between `}
    >
      <div>
        <div className="mb-15">
          <div className="text-blue-500 text-4xl mb-2">{title}</div>
          <div className="flex items-center justify-end space-x-2">
            <div className="bg-blue-500 text-white rounded-3xl w-20 h-20 text-4xl flex items-center justify-center font-bold">
              {number}
            </div>
            <span className="text-6xl font-light text-gray-800">media</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">החבילה כוללת:</div>
        </div>

        <div className="space-y-11">
          {features.map((feature, index) => (
            <FeatureItem key={index} icon={feature.icon} text={feature.text} />
          ))}
        </div>
      </div>

      <div className="flex w-full ps-3 ms-auto items-center justify-between mt-20">
        <div className="right">
          <div className="text-right">
            <span className="text-md text-blue-900">+ מע"מ</span>
          </div>
          <div className="text-right">
            <span className="text-md text-gray-500">לחודש</span>
          </div>
          <div className="text-right">
            <span className="text-md text-gray-500">{quantityText}</span>
          </div>
        </div>
        <div className="text-left">
          <span className="text-5xl text-gray-600 mr-2">₪</span>
          <span className="text-7xl font-bold text-blue-500">{displayPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;