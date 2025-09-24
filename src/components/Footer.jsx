// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <div
      dir="ltr"
      className="mt-5 md:flex hidden justify-center gap-24 flex-col md:flex-row text-center text-sm text-gray-500 space-y-1"
    >
      <div dir="rtl" className="text-sm">
        *הצעת המחיר תקפה למשך 15 ימים מעת שליחתה.
      </div>
      <div dir="rtl" className="text-sm">בכפוף לתנאי ההסכם.</div>
    </div>
  );
};

export default Footer;
