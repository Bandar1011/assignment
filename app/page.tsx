"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type TabKey = "about" | "experiences" | "recommended";

const aboutText = `Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calender is usually blocked between 9–10 AM. This is a...`;
const defaultImages: string[] = [
  "/building.webp",
  "/building.webp",
  "/building.webp",
  "/building.webp",
];

function SideRail() {
  return (
    <div className="relative w-10 shrink-0 self-stretch pl-1">
      {/* Question mark badge (top-left) */}
      <div className="absolute left-1 top-1 grid h-6 w-6 place-items-center rounded-full p-[2px] bg-[linear-gradient(327.89deg,#4A4E54_-1.73%,#A3ADBA_89.26%)] shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
        <div className="grid h-full w-full place-items-center rounded-full bg-[#363C43]">
          <span className="text-[13px] font-semibold leading-none bg-[linear-gradient(327.89deg,#4A4E54_-1.73%,#A3ADBA_89.26%)] bg-clip-text text-transparent">?</span>
        </div>
      </div>
      {/* Grid icon (center-left): 3 rows x 2 columns */}
      <div className="absolute left-[7px] top-1/2 -translate-y-1/2 grid grid-cols-2 gap-[2px] opacity-70">
        <div className="h-2 w-2 bg-white/20" />
        <div className="h-2 w-2 bg-white/20" />
        <div className="h-2 w-2 bg-white/20" />
        <div className="h-2 w-2 bg-white/20" />
        <div className="h-2 w-2 bg-white/20" />
        <div className="h-2 w-2 bg-white/20" />
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [images, setImages] = useState<string[]>(() => [...defaultImages]);
  const [galleryStart, setGalleryStart] = useState<number>(0);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");
  const [lastDir, setLastDir] = useState<"left" | "right">("right");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      // Revoke object URLs on unmount
      images.forEach((src) => {
        if (src.startsWith("blob:")) URL.revokeObjectURL(src);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabLabel = useMemo(() => {
    if (activeTab === "about") return "About Me";
    if (activeTab === "experiences") return "Experiences";
    return "Recommended";
  }, [activeTab]);
  const tabs: [TabKey, string][] = useMemo(
    () => [
      ["about", "About Me"],
      ["experiences", "Experiences"],
      ["recommended", "Recommended"],
    ],
    []
  );
  const activeIndex = useMemo(
    () => tabs.findIndex(([key]) => key === activeTab),
    [activeTab, tabs]
  );
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const visibleImages = useMemo(() => {
    if (images.length === 0) return [] as string[];
    const count = Math.min(3, images.length);
    return Array.from({ length: count }, (_, i) => images[galleryStart + i]);
  }, [images, galleryStart]);

  const maxStart = useMemo(() => Math.max(images.length - 3, 0), [images.length]);

  // Keep reset behavior available for later reuse (not rendered)
  const resetGallery = useCallback(() => {
    images.forEach((src) => {
      if (typeof src === "string" && src.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(src);
        } catch {}
      }
    });
    setGalleryStart(0);
    setImages([...defaultImages]);
  }, [images]);

  return (
    <div className="h-screen w-full grid place-items-center px-0 md:px-0 py-4 md:py-6">
      {/* Grey square panel layered above main background */}
      <div className="relative w-screen h-[96vh] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#373E44_-100%,#191B1F_100%)] shadow-[10px_10px_40px_10px_#00000080] p-5 md:p-6">
        <div className="mx-auto h-full w-full px-8 md:px-12 py-6">
          <div className="flex h-full flex-col justify-center space-y-6 items-end">
            {/* Tabs widget */}
            <div className="rounded-3xl bg-[#363C43] p-4 w-[600px] h-[280px] overflow-hidden opacity-100 shadow-[0_4px_25px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-md">
              <div className="flex items-start gap-2 w-full overflow-hidden">
                <SideRail />
                <div className="flex-1 min-w-0">
                  {/* Tabs Bar (own black bar) */}
                  <div className="relative flex items-center rounded-2xl overflow-hidden bg-[#171717] p-2 w-full max-w-[597px] h-[49px] gap-[6px] shadow-[inset_0px_4.96px_12.4px_2.48px_#00000040]">
                    {/* Hover indicator */}
                    <span
                      className="pointer-events-none absolute left-2 top-2 bottom-2 z-1 rounded-lg bg-white/6 transition-[transform,opacity] duration-200 ease-out"
                      style={{
                        width: "calc((100% - 1rem) / 3)",
                        transform: `translateX(${(hoverIndex ?? 0) * 100}%)`,
                        opacity:
                          hoverIndex === null || hoverIndex === activeIndex ? 0 : 1,
                      }}
                    />
                    {/* Active indicator */}
                    <span
                      className="pointer-events-none absolute left-2 top-2 bottom-2 z-2 rounded-lg bg-white/15 shadow-inner transition-transform duration-300 ease-in-out"
                      style={{
                        width: "calc((100% - 1rem) / 3)",
                        transform: `translateX(${activeIndex * 100}%)`,
                      }}
                    />
                    {tabs.map(([key, label], idx) => {
                      const isActive = activeTab === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setActiveTab(key)}
                          onMouseEnter={() => setHoverIndex(idx)}
                          onMouseLeave={() => setHoverIndex(null)}
                          className={`z-3 flex-1 rounded-xl px-5 py-3 text-sm font-semibold tracking-wide transition-colors ${
                            isActive ? "text-white" : "text-[#969696]"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Content Box (separate grey box) */}
                  <div className="relative mt-3 h-[220px] w-full max-w-full overflow-y-auto no-scrollbar rounded-xl bg-[#363C43] p-4 text-gray-200">
                    {/* decorative center scrollbar */}
                    <div className="pointer-events-none absolute right-0 top-[24%] -translate-y-1/2 h-14 w-[6px] rounded-full bg-[linear-gradient(180deg,#B8BFC6_0%,#5A6167_100%)] shadow-[0_6px_10px_rgba(0,0,0,0.35)]" />
                    <p className="whitespace-pre-line font-(--font-jakarta) text-[18px] leading-none tracking-[0] text-[#969696]">
                      {aboutText}
                    </p>
                    {/* decorative scrollbar removed per spec */}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle separator line aligned under widgets */}
            <div className="my-4 h-1 w-[640px] self-end rounded bg-white/10" />

            {/* Gallery widget */}
            <div className="rounded-3xl bg-[#363C43] p-4 w-[600px] h-[280px] opacity-100 shadow-[0_4px_25px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-md">
              <div className="flex items-start gap-2">
                <SideRail />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-[#171717] px-6 py-3 text-lg font-semibold text-zinc-200">
                      Gallery
                    </div>
                    <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length === 0) return;
                        const urls = files.map((f) => URL.createObjectURL(f));
                        setImages((prev) => {
                          if (prev.length === 0) return urls;
                          const next = [...prev];
                          // Replace only the visible tiles in order, starting from current window
                          for (let i = 0; i < urls.length; i++) {
                            const replaceAt = (galleryStart + i) % next.length;
                            const old = next[replaceAt];
                            next[replaceAt] = urls[i];
                            // Revoke old blob URL if we replaced a blob
                            if (typeof old === "string" && old.startsWith("blob:")) {
                              try { URL.revokeObjectURL(old); } catch { /* noop */ }
                            }
                          }
                          return next;
                        });
                        e.currentTarget.value = "";
                      }}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()
                      }
                      className="relative rounded-full px-4 md:px-5 py-2 text-xs font-semibold text-white bg-[linear-gradient(180deg,#3A4046_0%,#2B3035_100%)] shadow-[0_5px_12px_rgba(0,0,0,0.35)] ring-1 ring-black/40 transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.99]"
                    >
                      <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-6px_10px_rgba(0,0,0,0.25)]" />
                      <span className="relative z-10">+ ADD IMAGE</span>
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      if (isSliding || images.length <= 1 || galleryStart === 0) return;
                      setLastDir("left");
                      setSlideDir("left");
                      setIsSliding(true);
                    }}
                    type="button"
                    className="relative grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(180deg,#2E3338_0%,#1F2327_100%)] ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.35)] transition duration-150 ease-out hover:brightness-90 cursor-pointer focus:outline-none"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#b3bac2]">
                      <path d="M20 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M10 7l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="sr-only">Previous</span>
                  </button>
                  <button
                    onClick={() => {
                      if (isSliding || images.length <= 1 || galleryStart === maxStart) return;
                      setLastDir("right");
                      setSlideDir("right");
                      setIsSliding(true);
                    }}
                    type="button"
                    className="relative grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(180deg,#2E3338_0%,#1F2327_100%)] ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.35)] transition duration-150 ease-out hover:brightness-90 cursor-pointer focus:outline-none"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#b3bac2]">
                      <path d="M4 12h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M14 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="sr-only">Next</span>
                  </button>
                  </div>
                  </div>
                  <div className="mt-4 relative overflow-hidden">
                    <div className="grid grid-cols-3 gap-0.5">
                      {[0, 1, 2].map((i) => {
                        if (images.length === 0) return null;
                        const realIndex = galleryStart + i;
                        const src = images[realIndex];
                        const baseClass = "group aspect-square overflow-hidden rounded-2xl ring-1 ring-white/10 shadow transform-gpu scale-85 transition-transform duration-200 will-change-transform";
                        const animClass = !isSliding
                          ? ""
                          : slideDir === "right"
                            ? i === 0
                              ? "tile-out-left"
                              : "tile-left"
                            : i === 2
                              ? "tile-out-right"
                              : "tile-right";
                        const hoverClass = !isSliding ? "hover:-translate-y-1 hover:-rotate-2 hover:scale-100 hover:shadow-[0_12px_24px_rgba(0,0,0,0.45)]" : "";
                        return (
                          <div key={`img-${realIndex}`} className={`${baseClass} ${animClass} ${hoverClass}`}>
                            <img
                              src={src}
                              alt="image"
                              className={`${isSliding
                                ? "h-full w-full object-cover grayscale opacity-80"
                                : "h-full w-full object-cover transition duration-300 ease-out grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"}`}
                            />
                          </div>
                        );
                      })}
                    </div>
                    {isSliding && images.length > 0 && (
                      (() => {
                        const extra = slideDir === "right" ? galleryStart + 3 : galleryStart - 1;
                        const src = images[extra];
                        const posClass = slideDir === "right" ? "incoming-from-right" : "incoming-from-left";
                        return (
                          <div
                            className={`absolute top-0 ${slideDir === "right" ? "right-0" : "left-0"} w-1/3 aspect-square overflow-hidden rounded-2xl ring-1 ring-white/10 shadow transform-gpu scale-85 ${posClass}`}
                            onAnimationEnd={() => {
                              if (!isSliding) return;
                              setGalleryStart((s) => (slideDir === "right" ? Math.min(s + 1, maxStart) : Math.max(s - 1, 0)));
                              setIsSliding(false);
                            }}
                          >
                            <img src={src} alt="image" className="h-full w-full object-cover grayscale opacity-70" />
                          </div>
                        );
                      })()
                    )}
                    <style>{`
                      .tile-left { transition: transform 280ms ease-out; transform: translateX(-100%); }
                      .tile-right { transition: transform 280ms ease-out; transform: translateX(100%); }
                      .tile-out-left { transition: transform 280ms ease-out; transform: translateX(-100%); }
                      .tile-out-right { transition: transform 280ms ease-out; transform: translateX(100%); }
                      .incoming-from-right { animation: inRight 280ms ease-out forwards; }
                      .incoming-from-left { animation: inLeft 280ms ease-out forwards; }
                      @keyframes inRight { from { transform: translateX(100%) scale(.85); } to { transform: translateX(0) scale(.85); } }
                      @keyframes inLeft { from { transform: translateX(-100%) scale(.85); } to { transform: translateX(0) scale(.85); } }
                    `}</style>
                  </div>
                  {/* Removed nested global styled-jsx block to avoid error */}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 h-1 w-[640px] rounded bg-white/10 ml-auto mr-0" />
        </div>
      </div>
    </div>
  );
}

