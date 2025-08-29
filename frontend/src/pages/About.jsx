import AppNavbar from "../components/AppNavbar";
import bg3 from "../assets/images/bg4.jpg"
import lols from "../assets/images/stick.png"
import elmo from "../assets/images/elmo.png"

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* HERO */}
      <section
        className="relative h-[40vh] bg-cover bg-top !flex flex-col text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
        }}

      >
        <AppNavbar />
        {/*<div className="absolute inset-0 bg-black/40" />*/}
        <h1 className="relative text-white text-5xl font-bold drop-shadow-lg">
          About Us
        </h1>
      </section>

      {/* OUR BELIEFS */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#116db5] mb-6">Our Beliefs</h2>
        <p className="text-gray-600 leading-relaxed">
          We believe in the authority of Scripture as the inspired Word of God.
          We affirm the Trinity — Father, Son, and Holy Spirit — as the foundation
          of our faith. We believe salvation is by grace through faith in Jesus Christ.
          We value prayer, worship, and community as essential parts of Christian life.
        </p>
      </section>

      {/* OUR MISSION */}
      <section className="bg-sky-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#116db5] mb-6">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to glorify God by making disciples, loving our community,
            and serving the world. We seek to be a place of worship, hope, and
            encouragement for people of all backgrounds.
          </p>
        </div>
      </section>

      {/* LEADERSHIP / COMMUNITY */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-[#116db5] text-center mb-12">
          Our Community
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Example leader/member card */}
          <div className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100">
            <img src={lols} className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4" />
            <h3 className="text-xl font-semibold">Washing <br /> Ma Shins</h3>
            <p className="text-gray-500">Head Pastor</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100">
            <img src={elmo} className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4" />
            <h3 className="text-xl font-semibold">Danny-San Park</h3>
            <p className="text-gray-500">Prez</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4" />
            <h3 className="text-xl font-semibold"></h3>
            <p className="text-gray-500">Worship Leader</p>
          </div>
        </div>
      </section>
    </div>
  );
}

