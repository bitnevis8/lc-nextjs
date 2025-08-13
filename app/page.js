import Link from 'next/link';

export default async function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600 via-pink-500 to-amber-400 opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-gray-900">
                کلینیک لیزر مدرن با طراحی زیبا و نتایج ماندگار
              </h1>
              <p className="mt-4 text-gray-600 text-base sm:text-lg leading-8">
                از بین بردن موهای زائد با دستگاه‌های روز، تیم حرفه‌ای و مراقبت‌های پس از درمان. نوبت‌گیری آنلاین، مشاوره تخصصی و پکیج‌های ویژه برای شما.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Link href="/auth/register" className="px-5 py-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition">رزرو نوبت</Link>
                <Link href="/contact" className="px-5 py-3 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 transition">تماس با ما</Link>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2"><span>✓</span><span>بدون دوران نقاهت</span></div>
                <div className="flex items-center gap-2"><span>✓</span><span>نتیجه سریع و قابل‌مشاهده</span></div>
                <div className="flex items-center gap-2"><span>✓</span><span>مناسب انواع پوست</span></div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-rose-200">
                <img src="/images/entertainment/fortune-telling/hafez/logo.png" alt="laser" className="w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/70 backdrop-blur shadow-xl rounded-2xl p-4 border border-rose-200">
                <div className="text-rose-700 font-semibold">پکیج ویژه بانوان</div>
                <div className="text-gray-600 text-sm mt-1">زیر بغل + بیکینی + ساق پا</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">خدمات محبوب</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[
              { title: 'لیزر فول بادی', desc: 'جلسات سریع با پوشش کامل بدن' },
              { title: 'لیزر زیر بغل', desc: 'از بین بردن موهای زائد ناحیه زیر بغل' },
              { title: 'لیزر بیکینی', desc: 'مناسب پوست‌های حساس با نتایج عالی' },
              { title: 'لیزر صورت', desc: 'رفع موهای کرکی و زائد صورت' },
              { title: 'لیزر دست و پا', desc: 'پوشش کامل دست‌ها و پاها' },
              { title: 'پکیج‌های ترکیبی', desc: 'پیشنهادهای اقتصادی و کاربردی' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-rose-100 p-6 hover:shadow-lg transition bg-white/70">
                <div className="text-rose-600 font-semibold">{s.title}</div>
                <div className="text-gray-600 text-sm mt-2 leading-7">{s.desc}</div>
                <div className="mt-4">
                  <Link href="/auth/register" className="text-rose-700 hover:text-rose-900 text-sm font-semibold">رزرو این خدمت →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches CTA */}
      <section className="bg-gradient-to-r from-rose-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900">نزدیک‌ترین شعبه به شما</h3>
              <p className="text-gray-600 mt-2">آدرس، تلفن و ساعت کاری شعب ما را ببینید و نزدیک‌ترین را انتخاب کنید.</p>
              <div className="mt-4">
                <Link href="/contact" className="px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition">تماس با ما</Link>
              </div>
            </div>
            <div className="rounded-2xl border border-rose-100 p-4 bg-white">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500">ساعت کاری</div>
                  <div className="text-gray-800">۱۱:۰۰ تا ۲۱:۰۰</div>
                </div>
                <div>
                  <div className="text-gray-500">مدیریت پایخان</div>
                  <div className="text-gray-800">09376903949</div>
                </div>
                <div>
                  <div className="text-gray-500">مشاوره رایگان</div>
                  <div className="text-gray-800">رزرو آنلاین</div>
                </div>
                <div>
                  <div className="text-gray-500">تخفیف ویژه</div>
                  <div className="text-gray-800">پکیج‌های ترکیبی</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Benefits */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">چرا کلینیک ما؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[ 
              { t: 'اپراتورهای حرفه‌ای', d: 'تیم آموزش‌دیده با سابقه بالا' },
              { t: 'به‌روزترین دستگاه‌ها', d: 'کیفیت و سرعت بیشتر در درمان' },
              { t: 'حریم خصوصی و امنیت', d: 'محیط آرام با رعایت استانداردها' },
            ].map((x, i) => (
              <div key={i} className="rounded-2xl border border-rose-100 p-6 bg-white/70">
                <div className="text-rose-700 font-semibold">{x.t}</div>
                <div className="text-gray-600 text-sm mt-2 leading-7">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
