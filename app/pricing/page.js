'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function PricingPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [devices, setDevices] = useState([]);
  const [services, setServices] = useState([]);
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

  const loadServices = async (deviceId) => {
    if (!deviceId) return;
    try {
      const res = await fetch(`/api/pricing/services/getAll?deviceId=${deviceId}`);
      const json = await res.json();
      if (json.success) setServices(json.data || []);
    } catch {}
  };

  useEffect(() => { loadCategories(); }, []);
  useEffect(() => { if (selectedCategoryId) loadDevices(selectedCategoryId); }, [selectedCategoryId]);
  useEffect(() => { if (devices[0]?.id) loadServices(devices[0].id); }, [devices]);

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

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="text-gray-600">در حال بارگذاری...</div>
          ) : (
            devices.map((d) => (
              <div key={d.id} className="rounded-2xl border border-gray-200 p-4 bg-white lg:col-span-1">
                <div className="relative w-full overflow-hidden rounded-xl border aspect-[4/3] sm:aspect-video md:aspect-[3/2] lg:aspect-[4/3]">
                  {d.imageUrl ? (
                    <Image
                      src={d.imageUrl}
                      alt={d.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      priority={false}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm bg-gray-50">بدون تصویر</div>
                  )}
                </div>
                <div className="mt-3 text-black font-semibold">{d.title}</div>
                <div className="mt-1 text-gray-700 text-sm">{d.description || ''}</div>
                {!!d.price && (
                  <div className="mt-2 text-black font-bold">{(d.price ?? '').toLocaleString?.() || d.price} تومان</div>
                )}
                {/* Services list for this device */}
                <div className="mt-4 space-y-2">
                  {services.filter(s => s.deviceId === d.id).map(s => (
                    <div key={s.id} className="flex items-center justify-between rounded-lg border p-2">
                      <div className="text-sm text-black">{s.title}</div>
                      <div className="text-sm font-semibold text-black">{(s.price ?? '').toLocaleString?.() || s.price} تومان</div>
                    </div>
                  ))}
                </div>
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


