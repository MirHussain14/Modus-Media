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
            display_value: "בוא משקאות",
          },
        ],
      },
    },
  ];
};

const FooterMobile = () => {
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
      className="relative bg-[#0c1d50] text-white px-5 sm:px-6 md:px-8 py-4 rounded-2xl sm:rounded-3xl md:rounded-4xl flex w-full md:max-w-[1000.97px] max-h-[435.84px] mx-auto md:hidden mt-4 font-outfit"
    >
      {/* Left Side */}
      <div className="flex w-full flex-col lg:flex-row items-start justify-between">
        <div className="flex flex-col space-y-1 h-full justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-2 sm:mb-3 md:mb-4">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded flex items-center justify-center">
              <img src="/Group.svg" alt="" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light w-full">
              modus <span className="opacity-[80%]">media</span>
            </span>
          </div>
          <div className="space-y-1 sm:space-y-2 mt-2">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fw-bold" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                039521528
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fw-bold" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                sales@modusmedia.io
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fw-bold" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                modusmedia.io
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMobile;
