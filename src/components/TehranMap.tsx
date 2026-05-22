import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Hammer, Eye, ChevronRight, Plus, Minus } from "lucide-react";
import { Project } from "../types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Precise latitude/longitude bounds mapping for the projects in District 1 (Shemiranat, Tehran)
const PROJ_COORDS: { [key: string]: [number, number] } = {
  "velanjak": [35.8083, 51.3985],
  "saraye-yaser": [35.8125, 51.4552],
  "darakeh": [35.8080, 51.3831],
  "project-a": [35.8010, 51.4782],
  "project-b": [35.7925, 51.4230]
};

// Custom markup generator for the interactive golden pointer pins
const createCustomMarker = (isSelected: boolean, isMajor: boolean) => {
  const outerClass = isSelected 
    ? "relative flex items-center justify-center scale-125 z-50 pointer-events-auto"
    : "relative flex items-center justify-center scale-100 transition-all duration-300 pointer-events-auto";
    
  let dotHTML = "";
  if (isMajor) {
    dotHTML = `
      <div class="${outerClass}">
        <span class="absolute animate-ping inline-flex h-8 w-8 rounded-full bg-[#d4af37] opacity-25"></span>
        <span class="absolute inline-flex h-12 w-12 rounded-full border border-[#d4af37]/35 scale-75 animate-pulse"></span>
        <span class="relative w-4.5 h-4.5 rounded-full bg-[#d4af37] ring-2 ring-neutral-950 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.7)]">
          <span class="w-1.5 h-1.5 bg-white rounded-full"></span>
        </span>
      </div>
    `;
  } else {
    dotHTML = `
      <div class="${outerClass}">
        <span class="relative w-3.5 h-3.5 rounded-full bg-neutral-700 ring-2 ring-neutral-950 flex items-center justify-center shadow-lg hover:bg-neutral-500">
          <span class="w-1 h-1 bg-neutral-950 rounded-full"></span>
        </span>
      </div>
    `;
  }
  
  return L.divIcon({
    html: dotHTML,
    className: "custom-leaflet-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

interface TehranMapProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  activeProject: Project | null;
}

export default function TehranMap({ projects, onSelectProject, activeProject }: TehranMapProps) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Initialize the real-time map container
  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstance.current) return; // Prevent double construction in React Strict Mode

    // Default centroid is centered at District 1 (Shemiran/Tajrish)
    const map = L.map(mapRef.current, {
      center: [35.805, 51.425],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true
    });
    
    mapInstance.current = map;

    // Use premium, free CartoDB Dark Matter tile layer for an immersive dark design
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      minZoom: 11
    }).addTo(map);

    // Populate interactive markers
    projects.forEach((proj) => {
      const coords = PROJ_COORDS[proj.id] || [35.805, 51.425];
      const marker = L.marker(coords, {
        icon: createCustomMarker(activeProject?.id === proj.id, proj.isMajor)
      }).addTo(map);

      marker.on("click", () => {
        if (proj.isMajor) {
          onSelectProject(proj);
        }
      });

      marker.on("mouseover", () => {
        if (proj.isMajor) {
          setHoveredProject(proj);
        }
      });

      marker.on("mouseout", () => {
        setHoveredProject(null);
      });

      markersRef.current[proj.id] = marker;
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      markersRef.current = {};
    };
  }, [projects]);

  // Synchronize changes in selected projects with active animation flies
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    // Redraw markers to apply correct active state animations
    projects.forEach((proj) => {
      const marker = markersRef.current[proj.id];
      if (marker) {
        const isSelected = activeProject?.id === proj.id;
        marker.setIcon(createCustomMarker(isSelected, proj.isMajor));
      }
    });

    if (activeProject) {
      const coords = PROJ_COORDS[activeProject.id];
      if (coords) {
        map.setView(coords, 15, { animate: true, duration: 1.5 });
      }
    } else {
      // Return to global wide radar state
      map.setView([35.805, 51.425], 13, { animate: true, duration: 1.2 });
    }
  }, [activeProject, projects]);

  const handleZoomIn = () => {
    if (mapInstance.current) {
      mapInstance.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstance.current) {
      mapInstance.current.zoomOut();
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#0c0d11] rounded-2xl border border-neutral-800/60 shadow-2xl">
      {/* Map Grids & Background Deco */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1.5px)] [background-size:24px_24px] z-10"></div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090a0d] to-transparent pointer-events-none z-10"></div>

      {/* Map Interactive Frame */}
      <div className="relative w-full overflow-hidden p-6 md:p-10 flex flex-col lg:flex-row gap-8" dir="rtl">
        
        {/* Style injection to eliminate Leaflet custom border frames and enforce dark background */}
        <style dangerouslySetInnerHTML={{__html: `
          .leaflet-container {
            background: #090a0d !important;
            font-family: inherit;
          }
          .custom-leaflet-marker {
            background: transparent !important;
            border: none !important;
          }
          .leaflet-tile-container {
            filter: contrast(105%) brightness(95%) saturate(90%);
          }
        `}} />

        {/* Sidebar Controls */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col justify-between py-2 z-20 text-right">
          <div>
            <div className="flex items-center gap-2 mb-3 justify-start">
              <Compass className="w-5 h-5 text-[#d4af37] animate-pulse" />
              <span className="font-mono text-xs text-[#d4af37] tracking-[0.2em] uppercase">رادار تعاملی شمیران</span>
            </div>
            <h3 className="text-xl font-bold font-serif text-white tracking-tight leading-tight mb-2">
              پایش مکانی پروژه های منطقه ۱
            </h3>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-6">
              موقعیت جغرافیایی پروژه‌های نشانه‌شناختی هلدینگ جاوید بر روی نقشه منطقه ۱ گویای تقاطع معماری و بستر جغرافیا در کوهپایه البرز است. روی گره‌های درخشان طلایی رنگ کلیک کنید.
            </p>

            {/* Quick Filters */}
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => proj.isMajor ? onSelectProject(proj) : null}
                  onMouseEnter={() => proj.isMajor && setHoveredProject(proj)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`w-full group text-right flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                    !proj.isMajor 
                      ? "opacity-60 bg-neutral-900/20 border-neutral-900 cursor-not-allowed" 
                      : activeProject?.id === proj.id
                      ? "bg-gradient-to-r from-neutral-900/80 to-[#1c140a] border-[#d4af37] text-white shadow-[0_4px_12px_rgba(212,175,55,0.15)]"
                      : "bg-neutral-900/30 border-neutral-800/40 hover:border-neutral-700 hover:bg-neutral-900/60 text-neutral-300"
                  }`}
                  disabled={!proj.isMajor}
                >
                  <div className="flex flex-col items-start text-right">
                    <span className="text-sm font-semibold tracking-wide group-hover:text-white transition-colors duration-200">
                      {proj.titlePersian.replace("اقامتی", "").replace("مسکونی", "").trim()}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-0.5" dir="ltr">
                      {proj.id.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    {proj.isMajor ? (
                      <>
                        <span className="text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded text-[9px]">
                          مشخصات
                        </span>
                        <span className="text-[#d4af37] group-hover:-translate-x-1 transition-transform">
                          <ChevronRight className="w-4 h-4 rotate-180" />
                        </span>
                      </>
                    ) : (
                      <span className="text-neutral-600 bg-neutral-900 px-1.5 py-0.5 rounded text-[9px]">
                        کانسبت
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* District Highlights */}
          <div className="mt-8 pt-6 border-t border-neutral-900 space-y-3">
            <div className="flex justify-between items-center text-[11px] font-mono text-neutral-500" dir="ltr">
              <span className="text-[#d4af37]">N 35°48'56"</span>
              <span>مختصات جغرافیایی منطقه ۱</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900">
                <div className="text-[#d4af37] text-lg font-mono font-bold">۳</div>
                <div className="text-[10px] text-neutral-500">پروژه فعال</div>
              </div>
              <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900">
                <div className="text-[#d4af37] text-lg font-mono font-bold">۲</div>
                <div className="text-[10px] text-neutral-500">کانسپت در دست طرح</div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time OpenStreetMap Leaflet Map Workspace */}
        <div className="flex-1 relative aspect-[16/10] bg-[#090a0d] rounded-xl border border-neutral-900/80 lux-img-shadow overflow-hidden group/map select-none font-sans min-h-[360px] md:min-h-[480px]">
          
          {/* MAP REF CONTAINER */}
          <div ref={mapRef} className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing" />

          {/* Custom Sleek Zoom HUD Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-1 z-20">
            <button
              onClick={handleZoomIn}
              className="lg:flex items-center justify-center w-8 h-8 rounded bg-neutral-950/90 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#d4af37] transition-all cursor-pointer shadow-lg font-bold"
              title="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="lg:flex items-center justify-center w-8 h-8 rounded bg-neutral-950/90 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#d4af37] transition-all cursor-pointer shadow-lg font-bold"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Compass Rose Deco */}
          <div className="absolute bottom-6 right-6 pointer-events-none opacity-20 flex flex-col items-center z-10">
            <Compass className="w-12 h-12 text-[#d4af37] stroke-[1px] rotate-12" />
            <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#d4af37] mt-1">JAVID COMPASS</span>
          </div>

          {/* District Outline Labels Overlay */}
          <div className="absolute top-4 left-6 pointer-events-none font-mono text-[9px] text-[#d4af37]/60 flex flex-col tracking-wider z-10">
            <span>SCTOR_REF: D1_SHEMIRANAN</span>
            <span className="text-neutral-600 mt-0.5">TILE_SRC: CARTODB_DARK</span>
          </div>

          {/* Standard Beautiful Hover Detail HUD Card for Major Projects */}
          <AnimatePresence>
            {hoveredProject && hoveredProject.isMajor && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute right-6 bottom-6 w-72 bg-neutral-950/95 border border-neutral-800/80 rounded-xl p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] z-30 pointer-events-none hidden md:block text-right"
                style={{ backdropFilter: "blur(12px)" }}
              >
                <div className="relative overflow-hidden rounded-lg h-28 w-full mb-3 bg-neutral-900">
                  <img
                    src={hoveredProject.images?.hero}
                    alt={hoveredProject.titlePersian}
                    className="w-full h-full object-cover group-hover/map:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent"></div>
                  <div className="absolute bottom-2 right-2 flex flex-col text-right">
                    <span className="text-xs font-bold text-white tracking-wide">
                      {hoveredProject.titlePersian}
                    </span>
                    <span className="text-[9px] text-[#d4af37] font-semibold mt-0.5">
                      {hoveredProject.locationPersian}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500">زیربنای ناخالص ساخته‌شده:</span>
                    <span className="font-mono text-neutral-300" dir="ltr">{hoveredProject?.area}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500">معمار مؤلف اثر:</span>
                    <span className="text-[#d4af37] text-[11px] font-bold">{hoveredProject.architectPersian}</span>
                  </div>
                  
                  {/* Progress Indicator */}
                  {hoveredProject.progressPercent !== undefined && (
                    <div className="pt-2 text-right">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-neutral-400">پیشرفت عملیات اجرایی</span>
                        <span className="text-[#d4af37] font-bold font-mono">{hoveredProject.progressPercent}٪</span>
                      </div>
                      <div className="w-full bg-neutral-900 rounded-full h-1 overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full"
                          style={{ width: `${hoveredProject.progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 text-[10px] text-[#d4af37] flex items-center justify-between bg-neutral-900/40 p-1.5 rounded">
                    <span className="flex items-center gap-1">
                      <Hammer className="w-3.5 h-3.5" /> status: {hoveredProject.statusPersian}
                    </span>
                    <span className="text-white text-[9px] bg-neutral-800 px-1 py-0.5 rounded">جهت بررسی کلیک کنید</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
