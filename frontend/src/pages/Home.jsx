// src/pages/Home.jsx
import { useEffect, useState } from "react";
import bg3 from "../assets/images/bg4.jpg";
import forestbg from "../assets/images/forestbg.jpg";
import AppNavbar from "../components/AppNavbar";
import QuickInfo from "../components/QuickInfo";
import VerseOfTheDay from "../components/VerseOfTheDay";
import CommunityStrip from "../components/CommunityStrip";

export default function Home() {

  const photos = [
    "https://images.ctfassets.net/kgajkzbxa0pd/FXi0cmGso7Oa1XuRi6rx9/9952b24b618c104a4e9fa3c0a7175e7a/background.png",
    "https://images.ctfassets.net/kgajkzbxa0pd/3w5Wm9cdheqF1XPvnoWuHn/3dae330ad65bb580d760e3744a6ecb5a/IMG_4650.JPG",
    "https://images.ctfassets.net/kgajkzbxa0pd/3w5Wm9cdheqF1XPvnoWuHn/3dae330ad65bb580d760e3744a6ecb5a/IMG_4650.JPG",
    "https://images.ctfassets.net/kgajkzbxa0pd/2cwfeFY8EARH1o9H7tMHvZ/8a75f9622185c8e18dcd98d7c5575abf/Longwood_Gardens-Italian_Garden.jpg",
    "https://images.ctfassets.net/fk7muqopeh95/3Yx3zrZk6MoswLUwYMP3FP/93eb24ca74dbe1029ba9036dd835bca7/20241006_142509-scaled.jpg",
    "https://images.ctfassets.net/fk7muqopeh95/76H2KV3sWow5GHSMtVbS6J/d8d41f39b8c6cee7d0e6d93a446b7db3/brochure.jpg"
  ]

  const [showTopBtn, setShowTopBtn] = useState(false);

  const handleScrollToQuickInfo = () => {
    document.getElementById("quickinfo")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const halfHero = hero.offsetHeight / 2;
      setShowTopBtn(window.scrollY > halfHero);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Set Inter as default UI/body font
    <div className="!font-sans">
      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-[100vh] overflow-hidden bg-white"
        aria-label="Spring Well Presbyterian Church hero"
      >
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-top opacity-80"
          style={{ backgroundImage: `url(${bg3})` }}
        />

        <div className="absolute inset-0 bg-white/10" />

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white" />

        <div className="relative z-10 mx-auto flex min-h-[100vh] w-full max-w-7xl items-center px-6 md:px-10 lg:px-12 2xl:-mt-16">
          <div className="max-w-3xl -translate-y-8 !text-[#116db5]">
            <h1 className="!font-heading-ko !text-5xl !font-semi drop-shadow-lg leading-tight ">
              생명샘 장로교회
            </h1>

            <h1 className="!font-heading-en mt-2 !text-5xl !font-bold drop-shadow-lg leading-tight">
              Spring Well Presbyterian Church
            </h1>

            <h2 className="!font-subhead mt-3 !text-2xl !font-semibold drop-shadow-sm">
              English Ministry
            </h2>

            <p className="!font-subhead mt-2 !text-lg/7 italic">
              A place of worship, community, and hope
            </p>

            <div className="mt-6">
              <button
                onClick={handleScrollToQuickInfo}
                className="
            inline-flex items-center gap-2
            !rounded-full px-7 py-2
            !font-heading-en
            bg-white !text-[#116db5] border border-white
            shadow-sm
            transition-all duration-200
            hover:!bg-gray-100 hover:!border-gray-100
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#116db5]/40
          "
              >
                Plan a Visit
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute right-24 top-1/2 hidden -translate-y-1/2 lg:block opacity-10 -mt-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="w-[220px] h-[220px] !text-[#116db5] fill-current"
            >
              <path d="M368 144H240V24c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 
        24v120H16c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 
        16h128v248c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 
        24-24V240h128c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16z"/>
            </svg>
          </div>
        </div>
      </section>


      {/* INFO PANEL (JOIN US THIS SUNDAY) */}
      {/*<VerseOfTheDay />*/}
      <section className="relative bg-white ">
        <div id="quickinfo" className="pt-12">
        </div>
        <div className="min-h-[100vh]" style={{ backgroundImage: `url(${forestbg})` }}>
          <QuickInfo />
        </div>
      </section>


      {/* BROCHURE / SERMON RESOURCE SECTION */}
      <section className="relative overflow-hidden bg-slate-50 py-16 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">

            {/* Left Content Column */}
            <div className="lg:col-span-6">
              <span className="!font-subhead !text-sm !font-semibold uppercase tracking-[0.18em] !text-[#116db5]/75">
                Sunday Resource
              </span>
              <h2 className="mt-2 !font-heading-en text-3xl font-bold tracking-tight text-[#116db5] sm:text-4xl lg:text-5xl">
                Sermon & Ministry Guide
              </h2>
              <p className="mt-4 !font-subhead text-base leading-relaxed text-slate-600 sm:text-lg">
                Explore our sermon outline on Luke 9:57–62, titled <em>"Same Life, Different Kingdom."</em> It breaks down what it truly means to follow Christ through freedom from comfort, procrastination, and looking back.
              </p>
            </div>

            {/* Right Card Column */}
            <div className="lg:col-span-6 flex justify-center">
              <a
                href={photos[5]}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full max-w-md overflow-hidden rounded-3xl bg-white p-3 ring-1 ring-slate-200 shadow-[0_20px_50px_-20px_rgba(17,109,181,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_-15px_rgba(17,109,181,0.35)]"
              >
                <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={photos[5]}
                    alt="Sermon Guide - Same Life, Different Kingdom"
                    className="w-full h-auto object-cover scale-105 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-center pb-6">
                    <span className="rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-[#116db5] shadow-lg">
                      Click to View
                    </span>
                  </div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* COMMUNITY STRIP */}
      <section>
        <div className="relative min-h-[100vh]
          bg-gradient-to-b
          from-transparent
          via-white/70
          to-white
         ">
          <CommunityStrip
            variant="hover"
            items={[
              { src: photos[0], title: "Sunday Worship" },
              { src: photos[1], title: "Fellowship Night", text: "College & young adults" },
              { src: photos[4], title: "Starved Rock Trip" },
            ]}
          />
        </div>
      </section>

      {/* FLOATING BACK-TO-TOP BUTTON */}
      <button
        onClick={handleScrollToHero}
        aria-label="Back to top"
        aria-hidden={!showTopBtn}
        className={`
          fixed bottom-6 right-6 z-50
          h-8 w-8 !rounded-md
          bg-white !text-[#116db5]
          shadow-lg ring-1 ring-slate-200
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-105 hover:ring-slate-300
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#116db5]/40
          ${showTopBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
        `}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M7.41 12.59 12 8l4.59 4.59L18 11.17 12 5l-6 6z" />
          <path d="M7.41 17.59 12 13l4.59 4.59L18 16.17 12 10l-6 6z" />
        </svg>
      </button>
    </div>
  );
}
