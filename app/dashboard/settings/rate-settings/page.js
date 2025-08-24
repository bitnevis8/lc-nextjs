'use client';

import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/app/config/api';

export default function RateSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({ id: null, title: '', slug: '', description: '' });
  const [categoryImageUrl, setCategoryImageUrl] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [devices, setDevices] = useState([]);
  const [deviceForm, setDeviceForm] = useState({ id: null, title: '', price: '', imageUrl: '', description: '' });
  const [services, setServices] = useState([]);
  const [serviceForm, setServiceForm] = useState({ id: null, title: '', price: '', description: '' });

  const resetCategoryForm = () => { setCategoryForm({ id: null, title: '', slug: '', description: '' }); setCategoryImageUrl(''); };
  const resetDeviceForm = () => setDeviceForm({ id: null, title: '', price: '', imageUrl: '', description: '' });
  const resetServiceForm = () => setServiceForm({ id: null, title: '', price: '', description: '' });

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/pricing/categories/getAll');
      const json = await res.json();
      if (json.success) setCategories(json.data || []);
      else setError(json.message || 'خطا در دریافت دسته‌ها');
    } catch (e) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
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
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pricing/services/getAll?deviceId=${deviceId}`);
      const json = await res.json();
      if (json.success) setServices(json.data || []);
      else setError(json.message || 'خطا در دریافت سرویس‌ها');
    } catch (e) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) loadDevices(selectedCategoryId);
    else setDevices([]);
  }, [selectedCategoryId]);

  useEffect(() => {
    if (deviceForm.id) loadServices(deviceForm.id);
    else setServices([]);
  }, [deviceForm.id]);

  const submitCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const isEdit = !!categoryForm.id;
      const url = isEdit ? `/api/pricing/categories/update/${categoryForm.id}` : '/api/pricing/categories/create';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        title: categoryForm.title,
        slug: categoryForm.slug || null,
        description: categoryForm.description || null,
        imageUrl: categoryImageUrl || null,
      })});
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'خطا');
      resetCategoryForm();
      await loadCategories();
    } catch (e) {
      setError(e.message || 'خطا در ذخیره دسته');
    } finally {
      setLoading(false);
    }
  };

  const editCategory = (cat) => {
    setCategoryForm({ id: cat.id, title: cat.title || '', slug: cat.slug || '', description: cat.description || '' });
    setCategoryImageUrl(cat.imageUrl || '');
  };

  const deleteCategory = async (id) => {
    if (!confirm('حذف این دسته؟')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pricing/categories/delete/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'خطا');
      if (selectedCategoryId === id) setSelectedCategoryId(null);
      await loadCategories();
    } catch (e) {
      setError(e.message || 'خطا در حذف دسته');
    } finally {
      setLoading(false);
    }
  };

  const submitDevice = async (e) => {
    e.preventDefault();
    if (!selectedCategoryId) {
      setError('ابتدا یک دسته را انتخاب کنید');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const isEdit = !!deviceForm.id;
      const url = isEdit ? `/api/pricing/devices/update/${deviceForm.id}` : '/api/pricing/devices/create';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        categoryId: selectedCategoryId,
        title: deviceForm.title,
        price: deviceForm.price ? parseFloat(deviceForm.price) : null,
        imageUrl: deviceForm.imageUrl || null,
        description: deviceForm.description || null,
      })});
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'خطا');
      resetDeviceForm();
      await loadDevices(selectedCategoryId);
    } catch (e) {
      setError(e.message || 'خطا در ذخیره دستگاه');
    } finally {
      setLoading(false);
    }
  };

  const editDevice = (dev) => {
    setDeviceForm({ id: dev.id, title: dev.title || '', price: dev.price || '', imageUrl: dev.imageUrl || '', description: dev.description || '' });
  };

  const deleteDevice = async (id) => {
    if (!confirm('حذف این دستگاه؟')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pricing/devices/delete/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'خطا');
      await loadDevices(selectedCategoryId);
    } catch (e) {
      setError(e.message || 'خطا در حذف دستگاه');
    } finally {
      setLoading(false);
    }
  };

  const submitService = async (e) => {
    e.preventDefault();
    if (!deviceForm.id) {
      setError('ابتدا یک دستگاه را انتخاب/بسازید');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const isEdit = !!serviceForm.id;
      const url = isEdit ? `/api/pricing/services/update/${serviceForm.id}` : '/api/pricing/services/create';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        deviceId: deviceForm.id,
        title: serviceForm.title,
        price: parseFloat(serviceForm.price),
        description: serviceForm.description || null,
      })});
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'خطا');
      resetServiceForm();
      await loadServices(deviceForm.id);
    } catch (e) {
      setError(e.message || 'خطا در ذخیره سرویس');
    } finally {
      setLoading(false);
    }
  };

  const editService = (svc) => {
    setServiceForm({ id: svc.id, title: svc.title || '', price: svc.price || '', description: svc.description || '' });
  };

  const deleteService = async (id) => {
    if (!confirm('حذف این سرویس؟')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pricing/services/delete/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'خطا');
      await loadServices(deviceForm.id);
    } catch (e) {
      setError(e.message || 'خطا در حذف سرویس');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-black">مدیریت نرخ‌ها</h1>

      {error && (
        <div className="mt-3 p-3 rounded bg-rose-100 text-rose-700">{error}</div>
      )}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black">دسته‌ها</h2>
            <button onClick={resetCategoryForm} className="text-sm text-rose-700 hover:underline">جدید</button>
          </div>
          <form onSubmit={submitCategory} className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={categoryForm.title} onChange={e => setCategoryForm({ ...categoryForm, title: e.target.value })} placeholder="عنوان" className="border rounded p-2" required />
            <input value={categoryForm.slug} onChange={e => setCategoryForm({ ...categoryForm, slug: e.target.value })} placeholder="اسلاگ (اختیاری)" className="border rounded p-2" />
            <input value={categoryImageUrl} onChange={e => setCategoryImageUrl(e.target.value)} placeholder="آدرس تصویر دسته (public)" className="border rounded p-2 md:col-span-2" />
            <div className="md:col-span-2">
              <textarea value={categoryForm.description} onChange={e => setCategoryForm({ ...categoryForm, description: e.target.value })} placeholder="توضیحات" className="border rounded p-2 w-full" rows={2} />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">{categoryForm.id ? 'ویرایش دسته' : 'ایجاد دسته'}</button>
            </div>
          </form>

          <div className="mt-4 overflow-auto">
            <table className="min-w-full text-right">
              <thead>
                <tr className="text-gray-600 text-sm">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">عنوان</th>
                  <th className="py-2 px-3">اسلاگ</th>
                  <th className="py-2 px-3">تصویر</th>
                  <th className="py-2 px-3">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c, idx) => (
                  <tr key={c.id} className="border-t text-sm">
                    <td className="py-2 px-3">{idx + 1}</td>
                    <td className="py-2 px-3">{c.title}</td>
                    <td className="py-2 px-3">{c.slug || '—'}</td>
                    <td className="py-2 px-3">
                      {c.imageUrl ? <img src={c.imageUrl} alt={c.title} className="w-16 h-12 object-cover rounded border" /> : '—'}
                    </td>
                    <td className="py-2 px-3 flex gap-2">
                      <button onClick={() => setSelectedCategoryId(c.id)} className={`px-2 py-1 rounded ${selectedCategoryId === c.id ? 'bg-rose-700 text-white' : 'bg-gray-100 text-gray-700'}`}>دستگاه‌ها</button>
                      <button onClick={() => editCategory(c)} className="px-2 py-1 rounded bg-gray-100 text-gray-700">ویرایش</button>
                      <button onClick={() => deleteCategory(c.id)} className="px-2 py-1 rounded bg-rose-600 text-white">حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Devices */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black">دستگاه‌ها {selectedCategoryId ? `(دسته #${selectedCategoryId})` : ''}</h2>
            <button onClick={resetDeviceForm} className="text-sm text-rose-700 hover:underline">جدید</button>
          </div>

          <form onSubmit={submitDevice} className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={deviceForm.title} onChange={e => setDeviceForm({ ...deviceForm, title: e.target.value })} placeholder="نام دستگاه" className="border rounded p-2" required />
            <input value={deviceForm.price} onChange={e => setDeviceForm({ ...deviceForm, price: e.target.value })} placeholder="قیمت کلی (اختیاری)" className="border rounded p-2" />
            <input value={deviceForm.imageUrl} onChange={e => setDeviceForm({ ...deviceForm, imageUrl: e.target.value })} placeholder="آدرس تصویر (URL)" className="border rounded p-2 md:col-span-2" />
            <div className="md:col-span-2">
              <textarea value={deviceForm.description} onChange={e => setDeviceForm({ ...deviceForm, description: e.target.value })} placeholder="توضیحات" className="border rounded p-2 w-full" rows={2} />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button disabled={loading || !selectedCategoryId} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">{deviceForm.id ? 'ویرایش دستگاه' : 'ایجاد دستگاه'}</button>
            </div>
          </form>

          {selectedCategoryId ? (
            <div className="mt-4 overflow-auto">
              <table className="min-w-full text-right">
                <thead>
                  <tr className="text-gray-600 text-sm">
                    <th className="py-2 px-3">#</th>
                    <th className="py-2 px-3">نام</th>
                    <th className="py-2 px-3">قیمت کلی</th>
                    <th className="py-2 px-3">تصویر</th>
                    <th className="py-2 px-3">عملیات</th>
                    <th className="py-2 px-3">انتخاب سرویس‌ها</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((d, idx) => (
                    <tr key={d.id} className="border-t text-sm">
                      <td className="py-2 px-3">{idx + 1}</td>
                      <td className="py-2 px-3">{d.title}</td>
                      <td className="py-2 px-3">{d.price?.toLocaleString?.() || d.price || '—'}</td>
                      <td className="py-2 px-3">
                        {d.imageUrl ? (
                          <img src={d.imageUrl} alt={d.title} className="w-16 h-12 object-cover rounded border" />
                        ) : '—'}
                      </td>
                      <td className="py-2 px-3 flex gap-2">
                        <button onClick={() => { editDevice(d); loadServices(d.id); }} className="px-2 py-1 rounded bg-gray-100 text-gray-700">ویرایش</button>
                        <button onClick={() => deleteDevice(d.id)} className="px-2 py-1 rounded bg-rose-600 text-white">حذف</button>
                      </td>
                      <td className="py-2 px-3">
                        <button onClick={() => { setDeviceForm({ id: d.id, title: d.title, price: d.price || '', imageUrl: d.imageUrl || '', description: d.description || '' }); loadServices(d.id); }} className="px-2 py-1 rounded bg-black text-white">انتخاب</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4 text-gray-600 text-sm">برای مشاهده دستگاه‌ها، یک دسته را انتخاب کنید.</div>
          )}

          {/* Services Management */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-black">سرویس‌ها {deviceForm.id ? `(برای دستگاه #${deviceForm.id})` : ''}</h3>
              <button onClick={resetServiceForm} className="text-sm text-rose-700 hover:underline">جدید</button>
            </div>

            <form onSubmit={submitService} className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              <input value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} placeholder="عنوان سرویس (مثلا: لیزر زیر بغل)" className="border rounded p-2" required />
              <input value={serviceForm.price} onChange={e => setServiceForm({ ...serviceForm, price: e.target.value })} placeholder="قیمت سرویس" className="border rounded p-2" required />
              <div className="md:col-span-2">
                <textarea value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder="توضیحات" className="border rounded p-2 w-full" rows={2} />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <button disabled={loading || !deviceForm.id} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">{serviceForm.id ? 'ویرایش سرویس' : 'ایجاد سرویس'}</button>
              </div>
            </form>

            {deviceForm.id ? (
              <div className="mt-4 overflow-auto">
                <table className="min-w-full text-right">
                  <thead>
                    <tr className="text-gray-600 text-sm">
                      <th className="py-2 px-3">#</th>
                      <th className="py-2 px-3">عنوان</th>
                      <th className="py-2 px-3">قیمت</th>
                      <th className="py-2 px-3">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((s, idx) => (
                      <tr key={s.id} className="border-t text-sm">
                        <td className="py-2 px-3">{idx + 1}</td>
                        <td className="py-2 px-3">{s.title}</td>
                        <td className="py-2 px-3">{s.price?.toLocaleString?.() || s.price}</td>
                        <td className="py-2 px-3 flex gap-2">
                          <button onClick={() => editService(s)} className="px-2 py-1 rounded bg-gray-100 text-gray-700">ویرایش</button>
                          <button onClick={() => deleteService(s.id)} className="px-2 py-1 rounded bg-rose-600 text-white">حذف</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-4 text-gray-600 text-sm">برای مدیریت سرویس‌ها، ابتدا یک دستگاه را انتخاب کنید.</div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}


