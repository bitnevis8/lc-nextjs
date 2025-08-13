"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SchedulePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/schedule/getAll", { credentials: "include" });
        const data = await res.json();
        if (data.success) setItems(data.data || []);
        else setError(data.message || "خطا در دریافت نوبت‌ها");
      } catch (e) {
        setError("خطا در ارتباط با سرور");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">زمان‌بندی</h1>
        <Link href="#" className="px-3 py-2 bg-blue-600 text-white rounded-md opacity-60 pointer-events-none">افزودن (به‌زودی)</Link>
      </div>

      {loading && (
        <div className="text-gray-600">در حال بارگذاری...</div>
      )}
      {error && (
        <div className="text-red-600">{error}</div>
      )}

      {!loading && !error && (
        <div className="bg-white shadow-sm border border-gray-100 rounded-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-right text-sm text-gray-600">
                <th className="py-2 px-3">خدمت</th>
                <th className="py-2 px-3">شروع</th>
                <th className="py-2 px-3">پایان</th>
                <th className="py-2 px-3">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id} className="border-t text-sm">
                  <td className="py-2 px-3">{row.serviceTitle}</td>
                  <td className="py-2 px-3">{new Date(row.startAt).toLocaleString('fa-IR')}</td>
                  <td className="py-2 px-3">{new Date(row.endAt).toLocaleString('fa-IR')}</td>
                  <td className="py-2 px-3">
                    <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">نوبتی ثبت نشده است</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


