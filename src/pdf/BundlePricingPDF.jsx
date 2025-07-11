import FeatureItemPDF from "./FeatureItemPDF";

const BundlePricingPDF = ({ title, number, features }) => {
  return (
    <div className="bg-[#FAFAFA] w-[450px] rounded-3xl p-8 text-right flex flex-col justify-between relative">
      <div>
        <div className="mb-15">
          <div className="text-apna text-4xl mb-2">{title}</div>
          <div className="flex items-center justify-end space-x-2">
            <div className="bg-apna text-white rounded-2xl px-4 py-1 text-5xl flex items-center justify-center font-outfit">
              {number}
            </div>
            <span className="text-6xl outfit-light text-dark">media</span>
          </div>
          <div className="text-2xl text-gray-800 text-left ps-14">
            music & video
          </div>
          <div dir="rtl" className="text-lg text-gray-500 mt-1">
            החבילה כוללת:
          </div>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <FeatureItemPDF key={index} icon={feature.icon} text={feature.text} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BundlePricingPDF;
