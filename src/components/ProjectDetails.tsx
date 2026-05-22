import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, MapPin, Award, Layers, TrendingUp, Calendar, 
  BookOpen, Video, Eye, X, Maximize2, Sparkles, Building2, Grid 
} from "lucide-react";
import { Project } from "../types";

interface ProjectDetailsProps {
  project: Project;
  onBackToMap: () => void;
}

export default function ProjectDetails({ project, onBackToMap }: ProjectDetailsProps) {
  const [activeMediaTab, setActiveMediaTab] = useState<"exterior" | "interior" | "progress">("exterior");
  const [selectedSketchLightbox, setSelectedSketchLightbox] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  // Specifications listing
  const specs = [
    { label: "موقعیت پروژه", value: project.locationPersian, icon: MapPin },
    { label: "معمار مؤلف", value: project.architectPersian, icon: Award },
    { label: "زیربنای ناخالص کل", value: project.id === "velanjak" ? "۷,۵۰۰ متر مربع" : project.id === "saraye-yaser" ? "۱۲,۰۰۰ متر مربع" : "۲,۸۰۰ متر مربع", icon: Grid },
    { label: "سازه و طبقات", value: project.id === "velanjak" ? "۱۰ طبقه سازه فلزی پیشرفته" : project.id === "saraye-yaser" ? "۱۲ طبقه سازه صلب بتنی" : "۴ سطح معلق بتن نمایان (اکسپوز)", icon: Layers },
    { label: "وضعیت ساخت", value: project.statusPersian, icon: TrendingUp },
  ];

  return (
    <div className="w-full relative py-6 select-none font-sans bg-[#08090b] text-white">
      
      {/* Floating Header Actions */}
      <div className="sticky top-4 z-40 max-w-7xl mx-auto px-4 flex justify-between items-center bg-neutral-950/75 backdrop-blur-md border border-neutral-900 p-2.5 rounded-full shadow-lg" dir="rtl">
        <button
          onClick={onBackToMap}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-neutral-300 bg-neutral-900 border border-neutral-800 hover:border-[#d4af37] hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1 rotate-180" />
          <span>بازگشت به نقشه رادار</span>
        </button>
        <div className="flex items-center gap-2 px-2">
          <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
          <span className="text-[10px] md:text-xs text-[#d4af37] font-semibold tracking-wider font-mono">وضعیت اتصال زنده: {project.id.toUpperCase()}</span>
        </div>
      </div>

      {/* Hero Banner with Spec Overlays */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden bg-black mt-6 rounded-2xl border border-neutral-900" dir="rtl">
        <img
          src={project.images?.hero}
          alt={project.titlePersian}
          className="w-full h-full object-cover opacity-85 hover:scale-102 transition-transform duration-1000 origin-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-neutral-950/40 to-transparent"></div>
        
        {/* Absolute Centered Premium Title Overlays */}
        <div className="absolute bottom-10 inset-x-0 px-6 md:px-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <div className="flex justify-center items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="text-[10px] md:text-sm text-[#d4af37] uppercase tracking-wider">سازه شاخص مانیومنتال هلدینگ جاوید</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold font-serif text-white tracking-wide leading-tight drop-shadow-xl">
              {project.titlePersian}
            </h1>
            <p className="text-sm md:text-lg font-mono text-neutral-400 tracking-[0.1em]">
              {project.titleEnglish}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Structural Specifications columns */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12" dir="rtl">
        
        {/* Left column (Specs HUD grid) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-6 shadow-xl relative overflow-hidden group text-right">
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <h3 className="text-lg font-bold font-serif text-white border-b border-neutral-900 pb-4 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#d4af37]" />
              شناسنامه فنی و مهندسی سازه
            </h3>

            {/* Speclist rows */}
            <div className="space-y-6">
              {specs.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 text-[#d4af37] shrink-0 self-start transition-colors group-hover:border-[#d4af37]/30">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex-1 space-y-1 text-right">
                      <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-sm font-bold text-white tracking-wide">
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Progress Ring */}
            {project.progressPercent !== undefined && (
              <div className="mt-8 pt-6 border-t border-neutral-900 text-right">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-neutral-400">پیشرفت کل پروژه کارگاهی</span>
                  <span className="font-mono text-amber-400 font-bold">{project.progressPercent}%</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-l from-[#d4af37] to-amber-500 h-full rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column (Description, Sketches, and Timeline) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Paragraph description */}
          <div className="text-right">
            <h2 className="text-2xl font-bold font-serif text-white mb-6 tracking-wide flex items-center gap-2 text-gradient">
              مفهوم کانسپچوال و فلسفه فضایی اثر
            </h2>
            <p className="text-neutral-300 leading-relaxed text-sm md:text-base font-sans font-light md:text-justify">
              {project.descriptionPersian}
            </p>
            <div className="mt-6 p-4 rounded-xl bg-neutral-950 border border-neutral-900 text-left text-neutral-400 text-xs leading-relaxed font-normal" dir="ltr">
              {project.descriptionEnglish}
            </div>
          </div>

          {/* Architectural Sketches Section */}
          {project.hasSketches && (
            <div className="p-6 md:p-8 bg-neutral-950 border border-neutral-900 rounded-2xl shadow-lg text-right">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#d4af37]" />
                  اسکیس‌های معماری و دیاگرام‌های فضایی اولیه
                </h3>
                <span className="text-[10px] font-mono text-[#d4af37] border border-[#d4af37]/20 px-2 py-0.5 rounded-full uppercase">پیش‌طرح‌های معمار مؤلف</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                فرآیند طراحی این ابرسازه‌ها با اتود زدن لوپ‌های چرخشی فضایی و تراش احجام سنگ کانسپچوال صورت پذیرفته است. برای بزرگ‌نمایی ایده دست‌نویس معمار کلیک کنید.
              </p>

              {/* Sketch Lightbox Trigger Asset */}
              <div className="relative group overflow-hidden rounded-xl border border-neutral-900 bg-neutral-900 lux-img-shadow max-h-96">
                <img
                  src={project.images?.sketch}
                  alt="اسکیس معماری"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent flex items-end justify-center pb-6">
                  <button
                    onClick={() => project.images?.sketch && setSelectedSketchLightbox(project.images.sketch)}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-950/90 border border-neutral-800 text-xs font-bold text-[#d4af37] md:opacity-0 group-hover:opacity-100 transition-all rounded-lg cursor-pointer hover:bg-white hover:text-neutral-950 hover:border-white shadow-xl"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>مشاهده کیفیت اصلی تصاویر کانسپت خطی</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Media Interactive Galleries */}
          <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-xl" dir="rtl">
            <div className="p-6 border-b border-neutral-900 flex flex-col md:flex-row gap-4 items-center justify-between">
              <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                <Grid className="w-5 h-5 text-[#d4af37]" />
                گالری زنده تصاویر و مراحل اجرایی کارگاه
              </h3>

              {/* Tabs selector */}
              <div className="flex gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-xs font-semibold">
                <button
                  onClick={() => setActiveMediaTab("exterior")}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    activeMediaTab === "exterior" ? "bg-amber-400 text-neutral-950 text-bold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  نمای خارجی
                </button>
                <button
                  onClick={() => setActiveMediaTab("interior")}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    activeMediaTab === "interior" ? "bg-amber-400 text-neutral-950 text-bold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  فضای داخلی
                </button>
                <button
                  onClick={() => setActiveMediaTab("progress")}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    activeMediaTab === "progress" ? "bg-amber-400 text-neutral-950 text-bold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  پیشرفت کارگاهی
                </button>
              </div>
            </div>

            {/* Gallery Image Presentation Workspace */}
            <div className="p-6 aspect-video relative max-h-[420px] bg-neutral-900 group">
              <img
                src={
                  activeMediaTab === "exterior" 
                    ? project.images?.hero 
                    : activeMediaTab === "interior" 
                    ? project.images?.interior 
                    : project.images?.construction
                }
                alt={`${project.titlePersian}`}
                className="w-full h-full object-cover rounded-xl transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-6 bottom-10 p-4 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-right group-hover:translate-y-2 transition-transform">
                <p className="text-xs text-[#d4af37] font-mono leading-none mb-1">IMAGE METADATA REFERENCE</p>
                <p className="text-sm font-semibold text-white">
                  {activeMediaTab === "exterior" 
                    ? `شبیه‌سازی سه بعدی واقع‌گرایانه طرح خارجی ${project.titlePersian}`
                    : activeMediaTab === "interior"
                    ? `طراحی و دکوراسیون داخلی اختصاصی و مینی‌مال فضا برای ${project.titlePersian}`
                    : `گزارش میدانی کارگاه و پایش مستقیم کیفیت بتن و متریال برای ${project.titlePersian}`}
                </p>
              </div>
            </div>
          </div>

          {/* Construction Report & Video Cinematic Trailer Area */}
          <div className="p-6 md:p-8 bg-neutral-950 border border-neutral-900 rounded-2xl flex flex-col md:flex-row gap-6 items-center text-right" dir="rtl">
            <div className="md:w-1/3 shrink-0 relative overflow-hidden rounded-xl border border-neutral-900 aspect-video md:aspect-square bg-neutral-900 w-full">
              <img
                src={project.images?.construction}
                alt="Construction Site Report Video Thumbnail"
                className="w-full h-full object-cover opacity-60 cursor-pointer"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setShowVideoModal(true)}
                className="absolute inset-0 m-auto w-14 h-14 bg-gradient-to-r from-amber-400 to-[#d4af37] text-neutral-950 rounded-full flex items-center justify-center cursor-pointer shadow-xl hover:scale-110 active:scale-95 transition-all z-10"
              >
                <Video className="w-6 h-6 animate-pulse" />
              </button>
            </div>
            <div className="flex-1 space-y-3">
              <span className="text-[10px] font-semibold text-[#d4af37] bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-800 p-1 inline-block uppercase">پایش هوایی کارگاه</span>
              <h4 className="text-lg font-bold font-serif text-white">تصاویر دوربین هوایی پهپاد کارگاه</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                گزارش‌های مکرر هوایی با پهپادی اختصاصی مراحل گودبرداری، اجرای ستون‌ها، مهار دیوار نیلینگ و فریم بتنی را با مختصات تله‌متری دقیق ذخیره می‌کند. برای مشاهده آمار پرواز دکمه زیر را بفشارید.
              </p>
              <button
                onClick={() => setShowVideoModal(true)}
                className="text-xs font-semibold text-[#d4af37] flex items-center gap-1.5 hover:underline cursor-pointer"
              >
                <span>باز پخش ویدیو سنجش و تله‌متری پهپاد کارگاه</span>
                <ArrowLeft className="w-3.5 h-3.5 transform rotate-180" />
              </button>
            </div>
          </div>

          {/* Technical Progress Timeline */}
          {project.timeline && (
            <div className="p-4 md:p-8 bg-neutral-950 border border-neutral-900 rounded-2xl text-right" dir="rtl">
              <h3 className="text-xl font-bold font-serif text-white mb-8 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#d4af37]" />
                گاه‌شمار پیشرفت اجرایی و نقاط تحویل
              </h3>

              {/* Vertical Pipeline Layout */}
              <div className="relative border-r border-neutral-900 pr-5 space-y-8 min-h-[220px]">
                {/* Gold glowing line inside pipeline */}
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4af37] to-neutral-500/10 pointer-events-none"></div>

                {project.timeline.map((item, idx) => {
                  const isLatest = idx === project.timeline!.length - 1;
                  return (
                    <div key={idx} className="relative flex flex-col items-start md:flex-row md:items-center justify-between">
                      {/* Node Dot marker */}
                      <span className={`absolute -right-[25.5px] w-2.5 h-2.5 rounded-full z-10 ${
                        isLatest 
                          ? "bg-amber-400 ring-4 ring-amber-400/25 animate-ping"
                          : "bg-neutral-800 border-2 border-neutral-950"
                      }`} />
                      
                      {/* Node Dot Static Layer */}
                      <span className={`absolute -right-[25.5px] w-2.5 h-2.5 rounded-full z-11 ${
                        isLatest ? "bg-[#d4af37]" : "bg-neutral-800"
                      }`} />

                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-[#d4af37] bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                            {item.date}
                          </span>
                          <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${
                            isLatest ? "bg-amber-400/10 text-amber-300 border border-amber-400/20" : "bg-neutral-900 text-neutral-500"
                          }`}>
                            {isLatest ? "آخرین وضعیت کارگاه: فعال" : "تکمیل شده"}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-white mt-1.5">
                          {item.titlePersian}
                        </h5>
                        <p className="text-[10px] text-[#d4af37] font-semibold mt-0.5">
                          {item.titleEnglish}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Lightbox Modal for Architectural Drawings Sketches */}
      <AnimatePresence>
        {selectedSketchLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-lg"
          >
            <button
              onClick={() => setSelectedSketchLightbox(null)}
              className="absolute top-6 right-6 p-2 bg-neutral-900 text-neutral-400 hover:text-white rounded-full border border-neutral-800 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-w-4xl max-h-[85vh] relative overflow-hidden rounded-xl border border-neutral-800">
              <img
                src={selectedSketchLightbox}
                alt="Architectural Blueprint Lightbox"
                className="w-full h-auto object-contain max-h-[85vh]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-neutral-950/90 text-right border-t border-neutral-900">
                <p className="text-sm font-semibold text-white">اتودها و اسکیس‌های اولیه معمار مؤلف اثر</p>
                <p className="text-xs text-[#d4af37] font-semibold mt-1 uppercase">JAVID REALTY COMPREHENSIVE ARCHITECTURAL BLUEPRINTS SYSTEM</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Drone Report Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-lg"
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-6 right-6 p-2 bg-neutral-900 text-neutral-400 hover:text-white rounded-full border border-neutral-800 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full max-w-3xl aspect-video rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-950 relative flex flex-col justify-center items-center p-8 text-center" dir="rtl">
              {/* Retro cinematic grid or monitor feed styling */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1.5px)] [background-size:16px_16px]"></div>
              
              <div className="w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center text-amber-400 mb-6 animate-pulse">
                <Video className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-mono text-[#d4af37] tracking-[0.2em] uppercase mb-2">اتصال مستقیم هوایی پهپاد کارگاهی</span>
              <h3 className="text-2xl font-bold font-serif text-white">تصاویر دوربین پهپاد نظارتی و مانیتورینگ کارگاهی</h3>
              <p className="text-xs text-neutral-400 max-w-md leading-relaxed mt-2 mb-6">
                پخش زنده تله‌متری هوایی کارگاه‌های منطقه ۱ شمیرانات شامل بررسی تراز پی‌ها، عایق‌بندی فونداسیون، ستون‌ها و بتن‌ریزی سقف.
              </p>

              <div className="text-[10px] font-mono text-neutral-500 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800 flex gap-4 min-w-[280px]" dir="ltr">
                <div>FEED: STABLE</div>
                <div>RES: 4K UHD</div>
                <div>FPS: 60</div>
                <div>CODE: H.265</div>
              </div>

              <button
                onClick={() => setShowVideoModal(false)}
                className="mt-6 px-6 py-2 bg-[#d4af37] text-neutral-950 font-semibold text-xs rounded-full hover:bg-white transition-all duration-300 cursor-pointer"
              >
                بستن خروجی پهپاد
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
