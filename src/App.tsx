import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Award, ChevronLeft, Calendar, Sparkles, Clock, 
  MapPin, Hammer, ArrowRight, Building2, HelpCircle 
} from "lucide-react";
import projectsData from "./projects.json";
import { Project } from "./types";
import TehranMap from "./components/TehranMap";
import ProjectDetails from "./components/ProjectDetails";
import ContactFooter from "./components/ContactFooter";

export default function App() {
  const [projects] = useState<Project[]>(projectsData as Project[]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [time, setTime] = useState("");
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "سامانه مانیتورینگ جاوید: هسته مرکزی با موفقیت بارگذاری شد.",
    "رادار جغرافیایی: رادار شمیرانات منطقه ۱ فعال شد."
  ]);

  // Real-time clock updating matching luxury typography guidelines
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Set page scroll position on transition
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setSystemLogs(prev => [
      ...prev,
      `نمای دوربین مانیتورینگ: زوم روی پروژه [${project.titlePersian}].`,
      `داده‌های مهندسی: بارگذاری شناسنامه فنی سازه اثر ${project.architectPersian}.`
    ]);
    setTimeout(() => {
      window.scrollTo({ top: 350, behavior: "smooth" });
    }, 100);
  };

  const handleBackToMap = () => {
    setSystemLogs(prev => [
      ...prev,
      "نمای دوربین مانیتورینگ: بازگشت به نمای گسترده رادار تجسسی منطقه ۱."
    ]);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#08090b] text-white flex flex-col font-sans relative antialiased" dir="rtl">
      
      {/* Absolute Decorative Premium Overlay and Laser Beams */}
      <div className="absolute top-0 right-0 left-0 h-[650px] bg-gradient-to-b from-[#11131a] via-[#090a0d] to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-[80px] right-[10%] w-[1px] h-[350px] bg-gradient-to-b from-amber-500/25 to-transparent pointer-events-none hidden md:block"></div>
      <div className="absolute top-[160px] left-[15%] w-[1px] h-[250px] bg-gradient-to-b from-amber-500/15 to-transparent pointer-events-none hidden md:block"></div>

      {/* Corporate Admin Navigation Header */}
      <header className="relative w-full border-b border-neutral-900 bg-neutral-950/40 backdrop-blur-md z-30 select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center bg-transparent">
          
          {/* Brand Monogram Identity */}
          <div className="flex items-center gap-4">
            {/* Minimal High-End Gold Monogram Logo */}
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="font-serif text-xl font-bold text-[#d4af37] tracking-wider relative z-10">J</span>
              {/* Corner tech borders */}
              <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#d4af37]/45"></span>
              <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#d4af37]/45"></span>
            </div>
            
            <div className="text-right">
              <span className="text-sm font-bold tracking-widest text-[#d4af37] block font-sans">
                توسعه سازه‌های جاوید
              </span>
              <div className="flex items-center gap-1.5 justify-start">
                <span className="text-[9px] text-neutral-500 font-semibold tracking-wider font-mono">
                  JAVID REAL ESTATE HOLDING
                </span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>

          {/* Premium Real-Time Architectural Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-neutral-400">
            {/* Clock Widget matching Typography and Aesthetic principles */}
            <div className="flex items-center gap-2 bg-neutral-950 px-3.5 py-1.5 rounded-lg border border-neutral-900">
              <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="text-neutral-300 font-semibold tracking-wider font-mono" dir="ltr">
                {time || "2026-05-20 11:32:00 UTC"}
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-2 bg-neutral-950 px-3.5 py-1.5 rounded-lg border border-neutral-900 font-mono">
              <span className="text-emerald-400">اتصال رادار شبکه‌ای</span>
              <span className="text-neutral-700">|</span>
              <span className="text-neutral-300">سطح دسترسی وی‌آی‌پی</span>
            </div>
          </div>

        </div>
      </header>

      {/* Master Main Body Container */}
      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-16">
        
        {/* Intro/Hero Section */}
        <section className="text-center space-y-8 py-8 md:py-16 select-none relative">
          
          <div className="max-w-3xl mx-auto space-y-4">
            
            {/* Elite Badge Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800/80 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] md:text-xs text-[#d4af37] font-semibold tracking-wide">
                هلدینگ توسعه مهندسی و سازه‌ای شمیرانات تندیس‌گون
              </span>
            </div>

            {/* Main Luxury typography Header */}
            <h1 className="text-4xl md:text-6xl font-extrabold font-serif text-white tracking-tight leading-tight pt-2 drop-shadow-md">
              دیالوگ بی‌مرز <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-[#d4af37] to-amber-200">سازه‌ و جغرافیا</span>
            </h1>
            
            <p className="text-sm md:text-lg text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed pt-2">
              هلدینگ عمرانی جاوید با پیوند دادن نبوغ مهندسی سازه و معماری معاصر ایران، به توسعه ساختمان‌های نمادین در پهنه کوهپایه‌ای منطقه ۱ شمیرانات می‌پردازد. همکاری مستمر ما با مؤلفان پیشرو فضای امروز ایران ثبتی ماندگار در کالبد معماری تهران است.
            </p>

            <div className="text-neutral-500 text-xs font-mono uppercase tracking-[0.25em]" dir="ltr">
              Contemporary Architecture & Structural Integrity
            </div>

          </div>

          {/* Luxury High-Density Stats Frame */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            
            <div className="bg-neutral-950/70 border border-neutral-900/80 p-5 rounded-2xl relative overflow-hidden group">
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#d4af37] rounded-bl"></span>
              <div className="text-2xl md:text-3xl font-extrabold text-white font-serif tracking-tight font-mono">۲۲,۳۰۰+</div>
              <div className="text-[10px] md:text-xs text-neutral-400 mt-1 font-semibold">کل متراژ ساخته‌شده (متر مربع)</div>
            </div>

            <div className="bg-neutral-950/70 border border-neutral-900/80 p-5 rounded-2xl relative overflow-hidden group">
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#d4af37] rounded-bl"></span>
              <div className="text-2xl md:text-3xl font-extrabold text-[#d4af37] font-serif tracking-tight font-mono">۳</div>
              <div className="text-[10px] md:text-xs text-neutral-400 mt-1 font-semibold">پروژه فعال کانون ساخت متمرکز</div>
            </div>

            <div className="bg-neutral-950/70 border border-neutral-900/80 p-5 rounded-2xl relative overflow-hidden group">
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#d4af37] rounded-bl"></span>
              <div className="text-2xl md:text-2xl font-extrabold text-white font-serif tracking-tight font-sans">معماران مؤلف</div>
              <div className="text-[10px] md:text-xs text-neutral-400 mt-1 font-semibold">طرح‌های انحصاری علیرضا تقابونی و مفاخر فضا</div>
            </div>

            <div className="bg-neutral-950/70 border border-neutral-900/80 p-5 rounded-2xl relative overflow-hidden group">
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#d4af37] rounded-bl"></span>
              <div className="text-2xl md:text-3xl font-extrabold text-white font-serif tracking-tight font-mono">۱۰۰٪</div>
              <div className="text-[10px] md:text-xs text-neutral-400 mt-1 font-semibold">سیستم هوشمند محلی (بدون وابستگی)</div>
            </div>

          </div>

        </section>

        {/* Console Interface Feed (Aesthetic HUD telemetry constraint check - We do standard literal captions only) */}
        <div className="bg-neutral-950/90 border border-neutral-900/60 rounded-xl p-3 flex flex-col md:flex-row gap-4 justify-between items-center text-xs font-mono select-none" dir="rtl">
          <div className="flex gap-4 items-center">
            <span className="text-amber-500 font-bold">رادار توسعه جاوید نسخه ۴</span>
            <span className="text-neutral-700">|</span>
            <div className="flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span className="text-neutral-300 text-[10px]">
                {systemLogs[systemLogs.length - 1]}
              </span>
            </div>
          </div>
          <div className="text-neutral-500 text-[10px]" dir="ltr">
            ACTIVE_BUILDS_D1: 5_PIN_TARGETS
          </div>
        </div>

        {/* Smooth Interactive Section Container */}
        <AnimatePresence mode="wait">
          {!selectedProject ? (
            
            /* MAP STATE VIEW WITH HIGHLIGHTED DESIGNS */
            <motion.div
              key="map-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-6"
            >
              <TehranMap 
                projects={projects} 
                onSelectProject={handleSelectProject} 
                activeProject={selectedProject} 
              />
            </motion.div>
            
          ) : (
            
            /* PROJECT DETAIL SCROLL PRESENTATION */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, scale: 0.98, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -40 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="space-y-6"
            >
              <ProjectDetails 
                project={selectedProject} 
                onBackToMap={handleBackToMap} 
              />
            </motion.div>
            
          )}
        </AnimatePresence>

      </main>

      {/* Luxury Contact and Corporate Footer */}
      <ContactFooter />

    </div>
  );
}
