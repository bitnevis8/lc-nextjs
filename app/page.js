import Link from 'next/link';
import Slider from './components/ui/Slider/Slider';

export default async function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 ">
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight pt-5 lg:pt-0 text-gray-900">
                کلینیک تخصصی لیزر ان سی
              </h1>
              <div className="mt-4 text-gray-900 text-base sm:text-lg leading-8 space-y-4">
                <h2 className="text-xl font-bold">خدمات ما</h2>
                <div className="space-y-2">
                  <div className="font-semibold">1) لیزر مو زائد با دستگاه الکساندرایت دکا 2025 ایتالیایی</div>
                  <ul className="list-disc pr-5 space-y-1 text-base">
                    <li>جواب‌دهی حتی در جلسه اول</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">2) دستگاه کیو سوئچ</div>
                  <ul className="list-disc pr-5 space-y-1 text-base">
                    <li>از بین بردن کک‌ومک</li>
                    <li>از بین بردن ماه‌گرفتگی</li>
                    <li>پاک کردن تتو</li>
                    <li>روشن‌سازی پوست</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">3) هایفوتراپی</div>
                  <div className="text-sm text-gray-700">با دستگاه گلدن کره‌ای و حضور خود دکتر</div>
                  <ul className="list-disc pr-5 space-y-1 text-base">
                    <li>جوان‌سازی</li>
                    <li>رفع غبغب</li>
                    <li>ایجاد و تقویت زاویه فک</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">4) الکترولیز</div>
                  <ul className="list-disc pr-5 space-y-1 text-base">
                    <li>حذف دائم موهای سفید</li>
                    <li>برداشتن خال‌های سطحی</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Link href="/auth/register" className="px-5 py-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition">زمان های نوبت دهی</Link>
                <Link href="/contact" className="px-5 py-3 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 transition">ارتباط با ما</Link>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-gray-900">
                <div className="flex items-center gap-2"><span>✓</span><span>بدون دوران نقاهت</span></div>
                <div className="flex items-center gap-2"><span>✓</span><span>نتیجه سریع و قابل‌مشاهده</span></div>
                <div className="flex items-center gap-2"><span>✓</span><span>مناسب انواع پوست</span></div>
              </div>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
                <img src="/images/entertainment/fortune-telling/hafez/logo.png" alt="laser" className="w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur shadow-xl rounded-2xl p-4 border border-gray-200">
                <div className="text-gray-900 font-semibold">پکیج ویژه بانوان</div>
                <div className="text-gray-900 text-sm mt-1">زیر بغل + بیکینی + ساق پا</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Branches CTA */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Gallery slider */}
          <div className="mb-10">
            <Slider
              images={[
                { src: '/images/gallery/1.jpg', alt: 'Laser Clinic gallery 1' },
                { src: '/images/gallery/2.jpg', alt: 'Laser Clinic gallery 2' },
              ]}
              autoAdvanceMs={6000}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-bold text-black">برای گرفتن نوبت بر روی ارتباط با ما کلیک کنید</h3>
              <p className="text-black mt-2">آدرس، تلفن و ساعت کاری شعب ما را ببینید و با ما در ارتباط باشید.</p>
              <div className="mt-4">
                <Link href="/contact" className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-80 transition">ارتباط با ما</Link>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4 bg-white">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-black">ساعت کاری</div>
                  <div className="text-black">۱۱:۰۰ تا ۲۱:۰۰</div>
                </div>
                <div>
                  <div className="text-black">مدیریت پایخان</div>
                  <div className="text-black">09376903949</div>
                </div>
                <div>
                  <div className="text-black">مشاوره رایگان</div>
                  <div className="text-black">رزرو آنلاین</div>
                </div>
                <div>
                  <div className="text-black">تخفیف ویژه</div>
                  <div className="text-black">پکیج‌های ترکیبی</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services (placed at bottom, above footer) */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">خدمات محبوب</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[
              { title: 'لیزر فول بادی', desc: 'جلسات سریع با پوشش کامل بدن' },
              { title: 'لیزر زیر بغل', desc: 'از بین بردن موهای زائد ناحیه زیر بغل' },
              { title: 'لیزر بیکینی', desc: 'مناسب پوست‌های حساس با نتایج عالی' },
              { title: 'لیزر صورت', desc: 'رفع موهای کرکی و زائد صورت' },
              { title: 'لیزر دست و پا', desc: 'پوشش کامل دست‌ها و پاها' },
              { title: 'پکیج‌های ترکیبی', desc: 'پیشنهادهای اقتصادی و کاربردی' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition bg-white">
                <div className="text-black font-semibold">{s.title}</div>
                <div className="text-black text-sm mt-2 leading-7">{s.desc}</div>
                <div className="mt-4">
                  <Link href="/contact" className="text-black hover:opacity-80 text-sm font-semibold">دریافت نوبت →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us section removed as requested */}
    </main>
  );
}
