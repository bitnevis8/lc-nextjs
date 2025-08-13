"use client";

import { useEffect, useState } from "react";
import Map from "@/app/components/ui/Map/Map";

export default function ContactPage() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buildMapsUrls = (b) => {
    const lat = Number(b.latitude);
    const lon = Number(b.longitude);
    const label = encodeURIComponent(b.name || 'Branch');
    return {
      google: `https://www.google.com/maps?q=${lat},${lon}(${label})`,
      geo: `geo:${lat},${lon}?q=${lat},${lon}(${label})`,
    };
  };

  const handleShare = async (b) => {
    const { google } = buildMapsUrls(b);
    const title = b.name || 'موقعیت شعبه';
    const text = `${title}${b.address ? `\n${b.address}` : ''}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: google });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(google);
        alert('لینک موقعیت در کلیپ‌بورد کپی شد');
      } else {
        window.open(google, '_blank');
      }
    } catch (_) {}
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/branches/public', { cache: 'no-store' });
        const data = await res.json();
        if (data.success) setBranches(data.data || []);
        else setError(data.message || 'خطا در دریافت شعب');
      } catch (e) {
        setError('خطا در ارتباط با سرور');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-10">در حال بارگذاری...</div>;
  if (error) return <div className="max-w-6xl mx-auto px-4 py-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl md:text-3xl font-extrabold">تماس با ما</h1>
      {branches.length > 0 && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
       
          <div className="space-y-2">
            {branches.slice(0, 2).map((b, idx) => (
              <div key={b.id || idx} className="grid grid-cols-2">
                <div className="text-right font-semibold text-rose-700 truncate">{b.name || '—'}</div>
                <div className="text-left text-gray-800 ltr:font-mono">{b.mobile || '—'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {branches.map((b, idx) => (
        <div key={b.id || idx} className="rounded-2xl border border-rose-100 overflow-hidden bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-6 space-y-3">
              <div className="text-rose-700 font-bold text-xl md:text-2xl">{b.name}</div>
              <div className="text-gray-600 text-base md:text-lg">{b.address || '—'}</div>
              <div className="grid grid-cols-2 gap-3 text-sm md:text-base">
                <div>
                  <div className="text-gray-600">تلفن</div>
                  <div className="text-gray-800 text-base md:text-lg">{b.phone || '—'}</div>
                </div>
                <div>
                  <div className="text-gray-600">همراه</div>
                  <div className="text-gray-800 text-base md:text-lg">{b.mobile || '—'}</div>
                </div>
                <div>
                  <div className="text-gray-600">مدیریت پایخان</div>
                  <div className="text-gray-800 text-base md:text-lg">{b.managerPhone || '—'}</div>
                </div>
                <div>
                  <div className="text-gray-600">ساعت کاری</div>
                  <div className="text-gray-800 text-base md:text-lg">{(b.openTime?.slice(0,5) || '—')} تا {(b.closeTime?.slice(0,5) || '—')}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button onClick={() => handleShare(b)} className="px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition">
                  اشتراک‌گذاری لوکیشن
                </button>
              </div>
            </div>
            <div className="min-h-[280px]">
              <Map
                center={[b.latitude ?? 32.383, b.longitude ?? 48.4]}
                markers={b.latitude && b.longitude ? [{ latitude: Number(b.latitude), longitude: Number(b.longitude), name: b.name }]: []}
                showSearch={false}
                height="280px"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


