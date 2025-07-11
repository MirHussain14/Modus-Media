const FeatureItemPDF = ({ icon, text }) => {
  return (
    <div className="flex items-center justify-end gap-8 space-x-reverse">
      <div dir="rtl" className="flex-1 text-right">
        <span className="text-gray-700 text-xl leading-relaxed font-outfit">
          {text}
        </span>
      </div>
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
        <img src={icon} alt="" className="max-w-full max-h-full object-contain" />
      </div>
    </div>
  );
};

export default FeatureItemPDF;
