import { useState, useEffect } from "react";
import { getItemWithParentBoardRelation } from "../monday";

const HeaderPDF = () => {
  const [subitemName, setSubitemName] = useState("טורר בבא");
  const [parentName, setParentName] = useState("בוא משקאות");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        setLoading(true);
        setError(null);
        const items = await getItemWithParentBoardRelation();
        if (items && items.length > 0) {
          const item = items[0];
          if (item.name) setSubitemName(item.name);
          if (item.parent_item?.column_values?.length > 0) {
            const boardRelationValue = item.parent_item.column_values[0];
            if (boardRelationValue.display_value) {
              setParentName(boardRelationValue.display_value);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching Monday.com data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItemData();
  }, []);

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
            className="text-white text-[55px] font-bold transform rotate-180 ps-0"
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
            <div className="font-bold text-2xl">,לכבוד</div>
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
            <div className="font-bold text-xl pt-8">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPDF;
