'use client';

import Link from 'next/link';
import MobileMenu from '../../MobileMenu';
import AuthButtons from '../../AuthButtons';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-[9999]">
      <div className="w-full">
        <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3" prefetch={true}>
        
              <div className=" flex flex-col items-center">
                <h1 className="text-lg sm:text-2xl font-bold  bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text bg-clip-text text-transparent">
                  LC
                </h1>
                <p className="text-xs bg-gradient-to-r from-pink-600 to-purple-600 -mt-1 hidden sm:block bg-clip-text text-transparent">
                  Laser Clinic
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              prefetch={true}
            >
              صفحه اصلی
            </Link> */}
            {/* <Link 
              href="/categories" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              prefetch={true}
            >
              دسته‌بندی‌ها
            </Link> */}
            {/* Upload link removed as requested */}
            {/* <Link 
              href="/agencies" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              prefetch={true}
            >
              منابع خبری
            </Link> */}
            {/* ایران زمین حذف شد */}
            {/* <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              prefetch={true}
            >
              درباره ما
            </Link> */}
            <div className="ml-4">
              <AuthButtons />
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
} 