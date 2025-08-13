"use client";

import { useEffect, useState } from "react";
import Map from "@/app/components/ui/Map/Map";

export default function UnitLocationsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ id: null, name: "", address: "", phone: "", mobile: "", managerPhone: "", latitude: null, longitude: null, openTime: "", closeTime: "" });
  const [saving, setSaving] = useState(false);
  const [mapReloadIndex, setMapReloadIndex] = useState(0);
  const [showMap, setShowMap] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/branches/getAll", { credentials: "include" });
      const data = await res.json();
      if (data.success) setList(data.data);
      else setError(data.message || "خطا در دریافت شعب");
    } catch (e) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const url = form.id ? `/api/branches/update/${form.id}` : "/api/branches/create";
      const method = form.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setForm({ id: null, name: "", address: "", phone: "", mobile: "", managerPhone: "", latitude: null, longitude: null, openTime: "", closeTime: "" });
        await load();
      } else {
        setError(data.message || "خطا در ذخیره");
      }
    } catch (e) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("حذف شود؟")) return;
    await fetch(`/api/branches/delete/${id}`, { method: "DELETE", credentials: "include" });
    await load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">مدیریت مراکز</h1>

      {/* لیست شعب در بالا */}
      <div className="bg-white rounded-md border overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 text-sm text-gray-700">
            <tr>
              <th className="px-3 py-2">نام</th>
              <th className="px-3 py-2">تلفن</th>
              <th className="px-3 py-2">همراه</th>
              <th className="px-3 py-2">آدرس</th>
              <th className="px-3 py-2">موقعیت</th>
              <th className="px-3 py-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.id} className="border-t text-sm">
                <td className="px-3 py-2">{item.name}</td>
                <td className="px-3 py-2">{item.phone || '-'}</td>
                <td className="px-3 py-2">{item.mobile || '-'}</td>
                <td className="px-3 py-2">{item.address || '-'}</td>
                <td className="px-3 py-2">{item.latitude && item.longitude ? `${Number(item.latitude).toFixed(5)}, ${Number(item.longitude).toFixed(5)}` : '-'}</td>
                <td className="px-3 py-2 flex gap-2">
                  <button onClick={()=>{ 
                    setForm({ id: item.id, name: item.name, address: item.address, phone: item.phone, mobile: item.mobile, managerPhone: item.managerPhone || "", latitude: item.latitude ? Number(item.latitude) : null, longitude: item.longitude ? Number(item.longitude) : null, openTime: item.openTime || "", closeTime: item.closeTime || "" }); 
                    setShowMap(false);
                    setTimeout(()=>{ setMapReloadIndex((v)=>v+1); setShowMap(true); }, 50);
                  }} className="px-2 py-1 border rounded-md">ویرایش</button>
                  <button onClick={()=>onDelete(item.id)} className="px-2 py-1 border rounded-md text-red-600">حذف</button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">موردی موجود نیست</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <form onSubmit={onSubmit} className="bg-white rounded-md border p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">نام شعبه</label>
            <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">شماره تلفن</label>
            <input value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">شماره همراه</label>
            <input value={form.mobile} onChange={(e)=>setForm({...form,mobile:e.target.value})} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">آدرس</label>
            <input value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">شماره مدیریت پایخان</label>
            <input value={form.managerPhone} onChange={(e)=>setForm({...form,managerPhone:e.target.value})} className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">موقعیت روی نقشه (برای تعیین مارکر کلیک کنید)</label>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
            <div className="lg:col-span-1">
              <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs mb-1 text-gray-600">ساعت شروع</label>
                      <input type="time" value={form.openTime} onChange={(e)=>setForm({...form, openTime: e.target.value})} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-gray-600">ساعت پایان</label>
                      <input type="time" value={form.closeTime} onChange={(e)=>setForm({...form, closeTime: e.target.value})} className="w-full border rounded-md px-3 py-2" />
                    </div>
                  </div>
                <div>
                  <label className="block text-xs mb-1 text-gray-600">عرض جغرافیایی</label>
                  <input value={form.latitude ?? ''} onChange={(e)=>setForm({...form,latitude:e.target.value ? Number(e.target.value) : null})} className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-xs mb-1 text-gray-600">طول جغرافیایی</label>
                  <input value={form.longitude ?? ''} onChange={(e)=>setForm({...form,longitude:e.target.value ? Number(e.target.value) : null})} className="w-full border rounded-md px-3 py-2" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 min-h-[360px]">
              {showMap && (
                <Map
                  key={`${form.latitude ?? 'lat'}-${form.longitude ?? 'lng'}-${mapReloadIndex}`}
                  center={[form.latitude ?? 32.383, form.longitude ?? 48.4]}
                  markers={form.latitude && form.longitude ? [{ latitude: form.latitude, longitude: form.longitude, name: form.name }]: []}
                  onMapClick={({ latitude, longitude }) => { setForm({ ...form, latitude, longitude }); setMapReloadIndex((v)=>v+1); }}
                  showSearch={true}
                  height="350px"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-md">{form.id ? "ویرایش" : "افزودن"}</button>
          {form.id && (
            <button type="button" onClick={()=>setForm({ id: null, name: "", address: "", phone: "", mobile: "", latitude: null, longitude: null })} className="px-4 py-2 border rounded-md">انصراف</button>
          )}
        </div>
        {error && <div className="text-red-600">{error}</div>}
      </form>

      
    </div>
  );
}


