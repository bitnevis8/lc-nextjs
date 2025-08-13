'use client';

import Link from 'next/link';
import MobileMenu from '../../MobileMenu';
import AuthButtons from '../../AuthButtons';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-[9999]">
      <div className="w-full">
        <div className="relative flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo (desktop) */}
          <div className="hidden md:flex items-center">
            <Link href="/" className="flex items-center" prefetch={true}>
              <img src="/images/entertainment/fortune-telling/hafez/logo2.png" alt="Laser Clinic" className="w-10 h-10 object-cover rounded" />
            </Link>
          </div>

          {/* Logo (mobile centered) */}
          <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="pointer-events-auto">
              <Link href="/" className="flex items-center" prefetch={true}>
                <img src="/images/entertainment/fortune-telling/hafez/logo2.png" alt="Laser Clinic" className="w-8 h-8 object-cover rounded" />
              </Link>
            </div>
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

          {/* Mobile Menu (left on mobile) */}
          <div className="md:hidden mr-auto">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
} 