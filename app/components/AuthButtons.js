"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";

export default function AuthButtons() {
  const { user, loading, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  if (loading) return null;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    if (setUser) setUser(null);
    if (typeof window !== 'undefined') localStorage.clear();
    window.location.href = "/";
  };

  if (user) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 py-2 px-3 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm sm:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM4.5 20.25a7.5 7.5 0 1115 0 .75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{user.firstName} {user.lastName}</span>
          <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.957a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0l-4.24-4.52a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
        {open && (
          <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
            <Link href="/dashboard" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              داشبورد
            </Link>
            <button onClick={handleLogout} className="w-full text-left block px-3 py-2 text-sm text-red-600 hover:bg-red-50">
              خروج
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse">
      <Link
        href="/auth/register"
        className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium py-2 px-3 rounded text-sm sm:text-base text-center transition-colors duration-200"
      >
        ثبت نام
      </Link>
      <Link
        href="/auth/login"
        className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium py-2 px-3 rounded text-sm sm:text-base text-center transition-colors duration-200"
      >
        ورود
      </Link>
    </div>
  );
} 