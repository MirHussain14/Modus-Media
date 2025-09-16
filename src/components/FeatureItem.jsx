const FeatureItem = ({ icon, text }) => {
  return (
    <div className="flex items-center justify-end gap-4 md:gap-8 space-x-reverse">
      <div dir="rtl" className="flex-1 text-right">
        <span className="text-gray-700 text-base md:text-xl leading-relaxed font-outfit">{text}</span>
      </div>
      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
        <img src={icon} alt=""/>
      </div>
    </div>
  );
};

export default FeatureItem;