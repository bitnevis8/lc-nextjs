"use client";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      {/* Bottom Section */}
      <div className="border-t border-gray-100 bg-rose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-row-reverse justify-between items-center">
            {/* Powered by (right in RTL) */}
            <p className="text-sm text-cyan-100">
              powered by <a href="https://pourdian.com" target="_blank" rel="noopener" className="underline">pourdian.com</a>
            </p>
            {/* Copyright */}
            <p className="text-sm text-cyan-100">
              تمامی حقوق این سایت برای لیزر کلینیک محفوظ است © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 