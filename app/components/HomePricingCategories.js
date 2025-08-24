'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePricingCategories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/pricing/categories/getAll');
        const json = await res.json();
        if (json.success) setCategories(json.data || []);
        else setError(json.message || 'خطا در دریافت دسته‌ها');
      } catch (e) {
        setError('خطا در ارتباط با سرور');
      }
    })();
  }, []);

  if (error) return null;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-black">تعرفه خدمات</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <Link key={c.id} href={`/pricing?categoryId=${c.id}`} className="rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition bg-white">
            <div className="relative mb-3 w-full overflow-hidden rounded-xl border aspect-[16/9]">
              <Image
                src={c.imageUrl || '/images/devices/q-switch.jpg'}
                alt={c.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="text-black font-semibold">{c.title}</div>
            <div className="text-gray-600 text-sm mt-1 line-clamp-2">{c.description || 'مشاهده دستگاه‌ها و قیمت‌ها'}</div>
            <div className="mt-3 text-black font-semibold">مشاهده قیمت‌ها →</div>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Link href="/pricing" className="px-6 py-3 w-full sm:w-1/2 text-center rounded-xl bg-white text-black border border-gray-200 hover:bg-gray-50 transition">
          مشاهده همه قیمت‌ها
        </Link>
      </div>
    </div>
  );
}


