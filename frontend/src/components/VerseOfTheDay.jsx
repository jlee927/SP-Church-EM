// components/VerseOfTheDay.tsx
import React from "react";

export default function VerseOfTheDay() {
  // mock/static verse for now
  const verse = {
    text:
      "“The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters; He restores my soul.”",
    ref: "Psalm 23:1–3 (ESV)",
  };

  return (
    <aside className="
      p-6 shadow-md ring-1 ring-slate-200/60
      backdrop-blur-sm
      flex flex-col justify-between h-full
    ">
      <header className="mb-3">
        <h3 className="text-xl font-semibold text-[#116db5]">
          Verse of the Day
        </h3>
        <p className="text-xs text-slate-500">Updated daily</p>
      </header>

      <blockquote className="text-slate-800 italic leading-relaxed">
        {verse.text}
      </blockquote>

      <footer className="mt-4 text-sm font-medium text-slate-600">
        — {verse.ref}
      </footer>
    </aside>
  );
}

