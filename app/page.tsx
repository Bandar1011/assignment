"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type TabKey = "about" | "experiences" | "recommended";

const aboutText = `Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calender is usually blocked between 9–10 AM. This is a...`;

function SideRail() {
  return (
    <div className="flex w-8 shrink-0 flex-col items-center gap-4 pt-1">
      {/* circle with ? */}
      <div className="grid h-7 w-7 place-items-center rounded-full ring-1 ring-white/15 bg-white/5 text-zinc-300 text-[10px]">?
      </div>
      {/* grid icon */}
      <div className="grid grid-cols-2 gap-1 opacity-80">
        <div className="h-2 w-2 rounded bg-white/15" />
        <div className="h-2 w-2 rounded bg-white/15" />
        <div className="h-2 w-2 rounded bg-white/15" />
        <div className="h-2 w-2 rounded bg-white/15" />
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [images, setImages] = useState<string[]>(() =>
    Array.from({ length: 3 }).map(() => "/building.webp")
  );
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

  return (
    <div className="h-screen w-full grid place-items-center px-4 md:px-8 py-4 md:py-6">
      {/* Grey square panel layered above main background */}
      <div className="relative w-[96vw] h-[92vh] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#373E44_-100%,#191B1F_100%)] shadow-[10px_10px_40px_10px_#00000080] p-5 md:p-6">
        <div className="mx-auto h-full w-full px-8 md:px-12 py-6">
          <div className="flex h-full flex-col justify-center space-y-6 items-end">
            {/* Tabs widget */}
            <div className="rounded-3xl bg-[#363C43] p-4 w-[640px] h-[300px] overflow-hidden opacity-100 shadow-[0_4px_25px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-md">
              <div className="flex items-start gap-3 w-full overflow-hidden">
                <SideRail />
                <div className="flex-1 min-w-0">
                  {/* Tabs Bar (own black bar) */}
                  <div className="relative flex items-center rounded-xl bg-[#0a0f16]/90 p-2 w-full max-w-[597px] h-[49px] gap-[6px] ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    {/* Hover indicator */}
                    <span
                      className="pointer-events-none absolute left-2 top-2 bottom-2 z-1 w-1/3 rounded-lg bg-white/10 transition-[transform,opacity] duration-200 ease-out"
                      style={{
                        transform: `translateX(${(hoverIndex ?? 0) * 100}%)`,
                        opacity: hoverIndex === null ? 0 : 1,
                      }}
                    />
                    {/* Active indicator */}
                    <span
                      className="pointer-events-none absolute left-2 top-2 bottom-2 z-2 w-1/3 rounded-lg bg-white/15 shadow-inner transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(${activeIndex * 100}%)` }}
                    />
                    {tabs.map(([key, label], idx) => {
                      const isActive = activeTab === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setActiveTab(key)}
                          onMouseEnter={() => setHoverIndex(idx)}
                          onMouseLeave={() => setHoverIndex(null)}
                          className={`z-3 flex-1 rounded-xl px-5 py-3 text-sm font-medium tracking-wide transition ${
                            isActive ? "text-white" : "text-[#9CA3AF] hover:text-white"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Content Box (separate grey box) */}
                  <div className="relative mt-3 h-[220px] w-full max-w-full overflow-y-auto no-scrollbar rounded-xl ring-1 ring-white/10 bg-[#363C43] p-4 text-gray-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <p className="whitespace-pre-line font-(--font-jakarta) text-[20px] leading-none tracking-[0] text-gray-300">
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
            <div className="rounded-3xl bg-[#363C43] p-4 w-[640px] h-[300px] opacity-100 shadow-[0_4px_25px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-md">
              <div className="flex items-start gap-3">
                <SideRail />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-[#1b2332] px-4 py-2 text-sm font-semibold text-zinc-200">
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
                        setImages((prev) => [...prev, ...urls]);
                        e.currentTarget.value = "";
                      }}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()
                      }
                      className="rounded-full px-5 py-2.5 text-xs font-medium text-gray-200 bg-linear-to-r from-[#23252B] to-[#17191E] shadow transition-all duration-200 ease-in-out hover:scale-105"
                    >
                      + ADD IMAGE
                    </button>
                  </div>
                  <button className="grid h-10 w-10 place-items-center rounded-full bg-linear-to-r from-[#23252B] to-[#17191E] text-zinc-200 ring-1 ring-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform hover:scale-105">
                    ←
                  </button>
                  <button className="grid h-10 w-10 place-items-center rounded-full bg-linear-to-r from-[#23252B] to-[#17191E] text-zinc-200 ring-1 ring-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-transform hover:scale-105">
                    →
                  </button>
                  </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {images.map((src, idx) => (
                      <div
                        key={`${src}-${idx}`}
                        className="group aspect-square overflow-hidden rounded-xl ring-1 ring-white/10 shadow transform-gpu scale-90 transition-transform duration-300 ease-out hover:scale-100 hover:-translate-y-1 hover:shadow-[0_12px_34px_rgba(0,0,0,0.4)]"
                      >
                        <img
                          src={src}
                          alt="image"
                          className="h-full w-full object-cover transition duration-300 ease-out grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 h-1 w-full rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

