import React, { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactFooter() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [projectInterest, setProjectInterest] = useState("velanjak");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Simulate luxury persistence in localStorage
    const inquiry = { name, phone, projectInterest, message, timestamp: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("javid_inquiries") || "[]");
    existing.push(inquiry);
    localStorage.setItem("javid_inquiries", JSON.stringify(existing));

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName("");
      setPhone("");
      setMessage("");
    }, 4500);
  };

  return (
    <footer className="w-full bg-[#060709] border-t border-neutral-900 font-sans py-16 px-4 select-none relative overflow-hidden text-right">
      
      {/* Abstract decorative layout */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#d4af37]/3 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Grid: Contact inquiry form */}
        <div className="lg:col-span-6 bg-[#090a0d] border border-neutral-800/60 rounded-2xl p-6 md:p-8 relative" dir="rtl">
          <h3 className="text-xl font-bold font-serif text-white mb-2 text-right">ارتباط با کارشناسان و درخواست مشاوره خصوصی</h3>
          <p className="text-xs text-neutral-400 leading-relaxed mb-6 text-right">
            دپارتمان واگذاری و خدمات وی‌آی‌پی گروه عمرانی جاوید آماده تنظیم برنامه‌های بازدید اختصاصی (Private Tour) و ارائه شناسنامه‌های لوکس معماری به شماست.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-right">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-400 tracking-wider">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-[#d4af37] text-white text-sm px-4 py-2.5 rounded-lg outline-none transition-all"
                    placeholder="مثال: علیرضا جاوید"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-400 tracking-wider">شماره همراه / واتس‌اپ</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-[#d4af37] text-white text-sm px-4 py-2.5 rounded-lg outline-none transition-all"
                    placeholder="مثال: 09121112222"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-400 tracking-wider">سازه و اثر مورد تقاضا</label>
                <select
                  value={projectInterest}
                  onChange={(e) => setProjectInterest(e.target.value)}
                  className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-[#d4af37] text-white text-sm px-3 py-2.5 rounded-lg outline-none transition-all"
                >
                  <option value="velanjak">برج کانسپچوال ولنجک (سازه منحصربه‌فرد اثر دکتر علیرضا تقابونی)</option>
                  <option value="saraye-yaser">آپارتمان مانیومنتال سرای یاسر نیاوران (اثر متمایز دکتر علیرضا تقابونی)</option>
                  <option value="darakeh">ویلا صخره‌ای درکه (اثر مهندس شروین حسینی)</option>
                  <option value="general">کلکسیون جامع آثار و فرصت‌های تملک در شمیرانات</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-400 tracking-wider">یادداشت‌های بیشتر (اختیاری)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-24 bg-neutral-900/60 border border-neutral-800 focus:border-[#d4af37] text-white text-sm px-4 py-2.5 rounded-lg outline-none transition-all resize-none"
                  placeholder="نیازمندی‌ها، حجم فضایی مورد نظر، یا ترجیحات متریال ساختمانی خود را عنوان بفرمایید..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-400 to-[#d4af37] hover:from-white hover:to-white hover:text-neutral-950 text-neutral-950 font-semibold text-sm rounded-lg transition-all duration-300 shadow-lg cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>ارسال درخواست مشاوره وی‌آی‌پی</span>
              </button>
            </form>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-400 animate-bounce" />
              <h4 className="text-lg font-bold text-white">درخواست شما با موفقیت ثبت گردید</h4>
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                مستندات معماری و کاتالوگ‌های تصویری دیجیتال به زودی ارسال می‌گردند. کارشناسان ارشد هلدینگ جاوید جهت هماهنگی با شماره <span className="text-[#d4af37] font-bold font-mono">{phone}</span> تماس حاصل خواهند نمود. سپاس از حسن انتخاب شما.
              </p>
            </div>
          )}
        </div>

        {/* Right Grid: Corporate Offices Detail Spec */}
        <div className="lg:col-span-6 flex flex-col justify-between text-right" dir="rtl">
          <div>
            <span className="font-mono text-xs text-[#d4af37] tracking-[0.2em] uppercase">JAVID REAL EXPANSION HQ</span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-serif text-white mt-1 mb-4">گروه توسعه سازه جاوید</h2>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-lg mb-8">
              هلدینگ سازه جاوید به عنوان پیشرو خلاق در احداث بناهای یادمانی و مانیومنتال، با مشارکت برترین معماران جریان‌ساز و کارشناسان عالی رتبه مهندسی سازه، تعریف جدیدی از تجربه زیست فاخر ارائه می‌دهد.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-[#d4af37] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-bold text-white">دفتر مرکزی هلدینگ جاوید</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    تهران، منطقه ۱ شمیرانات، تقاطق کامرانیه و فرمانیه، مجتمع برجهای تجاری تخصصی آریا، طبقه ۴، واحد ۴۰۲
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-[#d4af37] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-bold text-white">دپارتمان فروش و واگذاری کانه ها</h4>
                  <p className="text-xs text-neutral-400 mt-1 font-mono" dir="ltr">
                    +98 (21) 2280 4015  &nbsp;|&nbsp;  +98 (21) 2280 4016
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">ساعات پاسخگویی: ۹:۰۰ صبح الی ۲۱:۰۰ شب (بدون تعطیلی)</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-[#d4af37] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-bold text-white">پست الکترونیک رسمی</h4>
                  <p className="text-xs text-neutral-400 mt-1 font-mono" dir="ltr">
                    info@javidprojects.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-neutral-500">
            <div>
              © {new Date().getFullYear()} هلدینگ عمرانی و املاک جاوید. تمامی حقوق مادی و معنوی محفوظ است.
            </div>
            <div className="flex gap-4 text-[10px]" dir="ltr">
              <span className="text-[#d4af37]">ARCHITECTURAL MASTERPIECE: ALIREZA TAGHABONI & SHERVIN HOSSEINI</span>
              <span className="text-neutral-700">|</span>
              <span>SERVICES V4.2</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
