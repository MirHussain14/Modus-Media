const FeatureItem = ({ icon, text }) => {
  return (
    <div className="flex items-center justify-end gap-8 space-x-reverse">
      <div dir="rtl" className="flex-1 text-right">
        <span className="text-gray-700 text-lg leading-relaxed">{text}</span>
      </div>
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
        <img src={icon} alt=""/>
      </div>
    </div>
  );
};

export default FeatureItem;