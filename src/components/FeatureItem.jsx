const FeatureItem = ({ icon, text }) => {
  return (
    <div className="flex items-center justify-end gap-8 space-x-reverse">
      <div className="flex-1 text-right">
        <span className="text-gray-700 text-md md:text-xl leading-relaxed">{text}</span>
      </div>
      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center">
        <img src={icon} alt=""/>
      </div>
    </div>
  );
};

export default FeatureItem;