import React from "react";

const HeaderPDF = ({ mondayData }) => {
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
      className="relative bg-[#0B225F] text-white px-8 py-7 pe-60 rounded-4xl flex w-[1000.97px] mx-auto"
    >
      {/* Vertical Label */}
      <div className="absolute -top-[7%] right-10 h-full">
        <div className="bg-apna h-[115%] w-36 rounded-lg flex items-center justify-center">
          <div className="bg-[#024B94] h-8 w-8 absolute -left-[8%] top-[2.7%] -z-1 rotate-45"></div>
          <div className="bg-[#024B94] h-8 w-8 absolute -left-[8%] -bottom-[12.5%] -z-1 rotate-45"></div>
          <span
            className="text-white text-[50px] font-bold transform rotate-180 ps-0"
            style={{ writingMode: "vertical-rl" }}
          >
            מודוס <span className="font-light">מדיה</span>
          </span>
        </div>
      </div>

      {/* Left Side */}
      <div className="flex w-full flex-row items-start justify-between font-outfit">
        <div className="flex flex-col space-y-1 h-full justify-between">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-9 h-9 rounded flex items-center justify-center">
              <img src="/Group.svg" alt="" />
            </div>
            <span className="text-4xl font-light w-full whitespace-nowrap inline-flex gap-2">
              modus <span className="opacity-[80%]">media</span>
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <img className="w-4 h-4" src="/call.png" alt="" />
              <span className="text-xl font-medium">039521528</span>
            </div>
            <div className="flex items-center space-x-4">
              <img className="w-4 h-3" src="/mail.png" alt="" />
              <span className="text-xl font-medium">sales@modusmedia.io</span>
            </div>
            <div className="flex items-center space-x-4">
              <img className="w-4 h-4" src="/search.png" alt="" />
              <span className="text-xl font-medium">modusmedia.io</span>
            </div>
          </div>
        </div>

        <div
          dir="ltr"
          className="mt-0 space-y-8 w-auto text-right pe-0"
        >
          <div>
            <span className="text-2xl font-bold">מודוס</span>
            <span className="text-2xl font-medium"> מדיה</span>
            <div className="text-lg">WE מגדל</div>
            <div className="text-lg">דרך מנחם בגין 150, תל אביב</div>
          </div>

          <div className="pt-1 text-right">
            <div className="font-bold text-xl">,לכבוד</div>
            <div className="text-lg">
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
            <div className="text-lg pt-8 font-outfit font-semibold">
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

export default HeaderPDF;