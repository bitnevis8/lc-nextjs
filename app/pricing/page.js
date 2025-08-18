'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PricingPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const loadCategories = async () => {
    try {
      const res = await fetch('/api/pricing/categories/getAll');
      const json = await res.json();
      if (json.success) {
        const list = json.data || [];
        setCategories(list);
        const paramId = parseInt(searchParams.get('categoryId') || '');
        if (paramId && list.some(c => c.id === paramId)) {
          setSelectedCategoryId(paramId);
        } else if (list.length > 0) {
          setSelectedCategoryId(list[0].id);
        }
      } else {
        setError(json.message || 'خطا در دریافت دسته‌ها');
      }
    } catch (e) {
      setError('خطا در ارتباط با سرور');
    }
  };

  const loadDevices = async (categoryId) => {
    if (!categoryId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pricing/devices/getAll?categoryId=${categoryId}`);
      const json = await res.json();
      if (json.success) setDevices(json.data || []);
      else setError(json.message || 'خطا در دریافت دستگاه‌ها');
    } catch (e) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);
  useEffect(() => { if (selectedCategoryId) loadDevices(selectedCategoryId); }, [selectedCategoryId]);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">لیست خدمات و دستگاه‌ها</h1>

        {error && <div className="mt-4 p-3 rounded bg-rose-100 text-rose-700">{error}</div>}

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`px-3 py-2 rounded-lg border ${selectedCategoryId === cat.id ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'}`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="text-gray-600">در حال بارگذاری...</div>
          ) : (
            devices.map((d) => (
              <div key={d.id} className="rounded-2xl border border-gray-200 p-4 bg-white">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border">
                  {d.imageUrl ? (
                    <img src={d.imageUrl} alt={d.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">بدون تصویر</div>
                  )}
                </div>
                <div className="mt-3 text-black font-semibold">{d.title}</div>
                <div className="mt-1 text-gray-700 text-sm">{d.description || ''}</div>
                <div className="mt-2 text-rose-700 font-bold">{(d.price ?? '').toLocaleString?.() || d.price} تومان</div>
                <div className="mt-3">
                  <Link href="/contact" className="px-3 py-2 rounded-lg bg-black text-white">دریافت نوبت</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}


