import { Phone, Mail, Globe } from "lucide-react";
import { useState, useEffect } from "react";

// Mock function to simulate the Monday.com API call
const getItemWithParentBoardRelation = async () => {
  return [
    {
      name: "טורר בבא",
      parent_item: {
        column_values: [
          {
            display_value: "בוא משקאות"
          }
        ]
      }
    }
  ];
};

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
    <div dir="ltr" className="relative bg-[#0c1d50] text-white px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-7 pe-6 md:pe-10 lg:pe-60 rounded-2xl sm:rounded-3xl md:rounded-4xl flex w-full md:max-w-[1000.97px] max-h-[435.84px] mx-auto">
      {/* Vertical Label */}
      <div className="absolute -top-[7%] right-3 md:right-10 h-full">
        <div className="bg-blue-500 h-[115%] w-20 sm:w-24 md:w-28 lg:w-36 rounded-md sm:rounded-lg flex items-center justify-center">
          <div className="bg-[#024B94] h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 absolute -left-[8%] top-[2.7%] -z-1 rotate-[41deg] md:rotate-45"></div>
          <div className="bg-[#024B94] h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 absolute md:-left-[8%] -left-[7%] -bottom-[12%] md:-bottom-[12.5%] -z-1 rotate-[55deg] md:rotate-45"></div>
          <span
            className="text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold transform rotate-180 ps-20 md:ps-0"
            style={{ writingMode: "vertical-rl" }}
          >
            מודוס <span className="font-light">מדיה</span>
          </span>
        </div>
      </div>

      {/* Left Side */}
      <div className="flex w-full flex-col md:flex-row items-start justify-between">
        <div className="flex flex-col space-y-1 h-full justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-2 sm:mb-3 md:mb-4">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded flex items-center justify-center">
              <img src="/Group.svg" alt="" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light w-full">
              <span className="font-bold">modus</span> media
            </span>
          </div>
          <div className="space-y-1 sm:space-y-2 hidden md:block">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fw-bold" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">039521528</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fw-bold" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">sales@modusmedia.io</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fw-bold" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">modusmedia.io</span>
            </div>
          </div>
        </div>

        <div dir="ltr" className="lg:mt-0 mt-3 sm:mt-4 md:mt-5 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-8 w-[70%] lg:w-auto text-right md:pe-34 lg:pe-0">
          <div>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">מודוס</span>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-md"> מדיה</span>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg">WE מגדל</div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg">דרך מנחם בגין 150, תל אביב</div>
          </div>

          <div className="lg:text-right pt-1 sm:pt-2">
            <div className="font-bold text-sm sm:text-base md:text-lg lg:text-2xl">,לכבוד</div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg">
              {loading && <span className="text-gray-300">טוען נתונים...</span>}
              {error && <span className="text-red-300" title={error}>שגיאה בטעינת נתונים</span>}
              {!loading && !error && (
                <>
                  {parentName} - לידי {subitemName}
                </>
              )}
            </div>
            <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl pt-2 sm:pt-3 md:pt-4 lg:pt-8">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;