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
        className="relative min-h-[100vh] bg-cover bg-center md:bg-top"
        style={{ backgroundImage: `url(${bg3})` }}
        aria-label="Spring Well Presbyterian Church hero"
      >
        {/* soft overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-white/0" />

        {/* hero content */}
        <div className="flex">
          <div
            className="
            relative z-10
            mx-6 md:mx-24 lg:mx-36
            pt-32 md:pt-48 pb-24
            !text-[#116db5]
            max-w-3xl
          "
          >
            {/* Korean heading */}
            <h1 className="!font-heading-ko !text-5xl !font-semi drop-shadow-lg leading-tight">
              생명샘 장로교회
            </h1>

            {/* English heading */}
            <h1 className="!font-heading-en mt-2 !text-5xl !font-bold drop-shadow-lg leading-tight">
              Spring Well Presbyterian Church
            </h1>

            {/* Subheading */}
            <h2 className="!font-subhead mt-3 !text-2xl !font-semibold drop-shadow-sm">
              English Ministry
            </h2>

            {/* Tagline */}
            <p className="!font-subhead mt-2 !text-lg/7 italic">
              A place of worship, community, and hope
            </p>

            {/* primary CTA */}
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
                Learn More
              </button>
            </div>
          </div>

          {/* decorative cross on right side */}
          <div className="mt-48 ml-28 opacity-10 z-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="w-[200px] h-[200px] !text-[#116db5] fill-current"
            >
              <path d="M368 144H240V24c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 
              24v120H16c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 
              16h128v248c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 
              24-24V240h128c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16z"/>
            </svg>
          </div>
        </div>

        {/* soft fade into next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* INFO PANEL */}
      {/*<VerseOfTheDay />*/}
      <section id="quickinfo" className="relative bg-white ">
        <div className="min-h-[100vh]" style={{ backgroundImage: `url(${forestbg})` }}>
          <QuickInfo />
        </div>
      </section>

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
              { src: photos[2], title: "Service Project" },
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
