"use client";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      {/* Bottom Section */}
      <div className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center gap-2 text-center md:flex-row-reverse md:justify-between md:items-center md:text-right">
            {/* Powered by (right in RTL) */}
              <p className="text-sm text-gray-800">
              powered by <a href="https://pourdian.com" target="_blank" rel="noopener" className="underline">pourdian.com</a>
            </p>
            {/* Copyright */}
              <p className="text-sm text-gray-800">
              تمامی حقوق این سایت برای لیزر کلینیک محفوظ است © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 