import { Phone, Mail, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { getItemWithParentBoardRelation } from "../monday";

const Header = () => {
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
    <div dir="ltr" className="relative bg-[#0c1d50] text-white px-8 py-7 pe-10 md:pe-60 rounded-4xl flex w-full md:max-w-[1000.97px] max-h-[435.84px] mx-auto">
      {/* Vertical Label */}
      <div className="absolute -top-[7%] right-3 lg:right-10 h-full">
        <div className="bg-apna h-[115%] w-36 rounded-lg flex items-center justify-center">
          <div className="bg-[#024B94] h-8 w-8 absolute -left-[8%] top-[2.7%] -z-1 rotate-45"></div>
          <div className="bg-[#024B94] h-8 w-8 absolute -left-[8%] -bottom-[12.5%] -z-1 rotate-45"></div>
          <span
            className="text-white text-5xl font-bold transform rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            מודוס <span className="font-light">מדיה</span>
          </span>
        </div>
      </div>

      {/* Left Side */}
      <div className="flex w-full flex-col lg:flex-row items-start justify-between">
        <div className="flex flex-col space-y-1 h-full justify-between">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-8 h-8 rounded flex items-center justify-center">
              <img src="/Group.svg" alt="" />
            </div>
            <span className="text-3xl lg:text-4xl font-light w-full">
              <span className="font-bold">modus</span> media
            </span>
          </div>
          <div className="space-y-2 hidden lg:block">
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 fw-bold" />
              <span className="text-xl font-medium">039521528</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 fw-bold" />
              <span className="text-xl font-medium">sales@modusmedia.io</span>
            </div>
            <div className="flex items-center space-x-4">
              <Globe className="w-6 h-6 fw-bold" />
              <span className="text-xl font-medium">modusmedia.io</span>
            </div>
          </div>
        </div>

        <div className="lg:text-right lg:mt-0 mt-5 space-y-5 lg:space-y-8 lg:ml-20">
          <div>
            <span className="text-xl lg:text-2xl font-bold">מודוס</span>
            <span className="text-xl lg:text-2xl font-md"> מדיה</span>
            <div className="text-md lg:text-lg">WE מגדל</div>
            <div className="text-md lg:text-lg">דרך מנחם בגין 150, תל אביב</div>
          </div>

          <div className="lg:text-right pt-2">
            <div className="font-bold text-lg lg:text-2xl">,לכבוד</div>
            <div className="text-md lg:text-lg">
              {loading && <span className="text-gray-300">טוען נתונים...</span>}
              {error && <span className="text-red-300" title={error}>שגיאה בטעינת נתונים</span>}
              {!loading && !error && (
                <>
                  {parentName} - לידי {subitemName}
                </>
              )}
            </div>
            <div className="font-bold text-xl pt-4 lg:pt-8">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
