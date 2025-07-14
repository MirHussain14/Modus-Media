import { useState, useEffect } from "react";

const Header = ({ mondayData }) => {
  let subitemName = "טורר בבא";
  let parentName = "בוא משקאות";
  let loading = true;
  let error = null;
  if (mondayData && mondayData.length > 0) {
    const item = mondayData[0];
    if (item.name) subitemName = item.name;
    if (item.parent_item?.column_values?.length > 0) {
      const boardRelationValue = item.parent_item.column_values[0];
      if (boardRelationValue.display_value) {
        parentName = boardRelationValue.display_value;
      }
    }
    loading = false;
  }

  return (
    <div
      dir="ltr"
      className="relative bg-[#0B225F] text-white px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-7 pe-6 md:pe-10 lg:pe-60 rounded-2xl sm:rounded-3xl md:rounded-4xl flex w-full md:max-w-[1000.97px] max-h-[435.84px] mx-auto"
    >
      {/* Vertical Label */}
      <div className="absolute -top-[7%] right-3 md:right-10 h-full">
        <div className="bg-apna h-[115%] w-20 sm:w-24 md:w-28 lg:w-36 rounded-md sm:rounded-lg flex items-center justify-center">
          <div className="bg-[#024B94] h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 absolute -left-[8%] top-[2.6%] -z-1 rotate-[41deg] md:rotate-[40deg]"></div>
          <div className="bg-[#024B94] h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 absolute md:-left-[8%] -left-[7%] -bottom-[12%] md:-bottom-[12.3%] -z-1 rotate-[55deg] md:rotate-[50deg]"></div>
          <span
            className="text-white text-2xl sm:text-2xl md:text-[55px] font-bold transform rotate-180 ps-20 md:ps-0"
            style={{ writingMode: "vertical-rl" }}
          >
            מודוס <span className="font-light">מדיה</span>
          </span>
        </div>
      </div>

      {/* Left Side */}
      <div className="flex w-full flex-col md:flex-row items-start justify-between font-outfit">
        <div className="flex flex-col space-y-1 h-full justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-2 sm:mb-3 md:mb-4 w-full">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-9 md:h-9 rounded flex items-center justify-center">
              <img src="/Group.svg" alt="" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-4xl font-light w-full whitespace-nowrap">
              modus <span className="opacity-[80%]">media</span>
            </span>
          </div>
          <div className="space-y-1 sm:space-y-2 hidden md:block">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <img className="w-4 h-4" src="/call.png" alt="" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                039521528
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <img className="w-4 h-3" src="/mail.png" alt="" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                sales@modusmedia.io
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <img className="w-4 h-4" src="/search.png" alt="" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                modusmedia.io
              </span>
            </div>
          </div>
        </div>

        <div
          dir="ltr"
          className="lg:mt-0 mt-3 sm:mt-4 md:mt-5 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-8 w-[70%] lg:w-auto text-right md:pe-34 lg:pe-0"
        >
          <div>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
              מודוס
            </span>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-md">
              {" "}
              מדיה
            </span>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg">
              WE מגדל
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg">
              דרך מנחם בגין 150, תל אביב
            </div>
          </div>

          <div className="lg:text-right pt-1 sm:pt-2">
            <div className="text-sm sm:text-base md:text-lg lg:text-2xl">
              ,לכבוד
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg">
              {loading && <span className="text-gray-300">טוען נתונים...</span>}
              {error && (
                <span className="text-red-300" title={error}>
                  שגיאה בטעינת נתונים
                </span>
              )}
              {!loading && !error && (
                <>
                  {parentName} - לידי {subitemName}
                </>
              )}
            </div>
            <div className="text-lg pt-2 sm:pt-3 md:pt-4 lg:pt-8 font-outfit font-semibold">
              {(() => {
                const d = new Date();
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                return `${day}.${month}.${year}`;
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
