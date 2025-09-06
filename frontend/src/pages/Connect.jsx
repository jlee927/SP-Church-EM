// src/pages/Connect.jsx
import { useMemo, useState } from "react";
import bg3 from "../assets/images/bg4.jpg";

export default function Connect() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "General Question",
    message: "",
    prayerRequest: false,
    consent: false,
  });
  const [errors, setErrors] = useState({});

  const CHURCH_EMAIL = "youremail@yourchurch.org";
  const CHURCH_ADDRESS = "1234 Main St, Your City, IL 60607";

  const mapSrc = useMemo(
    () =>
      `https://www.google.com/maps?q=${encodeURIComponent(
        CHURCH_ADDRESS
      )}&output=embed`,
    [CHURCH_ADDRESS]
  );

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Please include a short message.";
    if (!form.consent) e.consent = "Please acknowledge this to proceed.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (key) => (ev) => {
    const value =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const subject = `[${form.reason}] ${form.name}`;
    const bodyLines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      `Reason: ${form.reason}`,
      form.prayerRequest ? `Prayer Request: Yes` : `Prayer Request: No`,
      "",
      "Message:",
      form.message,
    ]
      .filter(Boolean)
      .join("%0D%0A");

    const mailto = `mailto:${encodeURIComponent(
      CHURCH_EMAIL
    )}?subject=${encodeURIComponent(subject)}&body=${bodyLines}`;
    window.location.href = mailto;
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* HERO */}
      <section
        id="connect-hero"
        className="relative min-h-[50vh] bg-cover bg-top flex flex-col"
        style={{ backgroundImage: `url(${bg3})` }}
        aria-label="Connect with Springwell Presbyterian Church"
      >
        <div className="relative mt-4 z-10 mx-6 md:mx-24 lg:mx-36 pt-32 md:pt-40 pb-12 !text-[#116db5] max-w-3xl">
          <h1 className="!font-heading-en !text-5xl !font-bold drop-shadow-lg leading-tight">
            Connect
          </h1>
          <p className="mt-2 !font-subhead !text-lg !text-[#0e5a96]/90">
            We’d love to hear from you—questions, prayer requests, or just saying hello.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="relative z-10 -mt-6 md:-mt-10 mb-24 mx-6 md:mx-24 lg:mx-36">
        {/* Top cards: Ministries / Prayer */}
        <div className="grid gap-8 md:grid-cols-2 mt-6">
          {/* Ministries */}
          <div className="rounded-2xl border border-slate-200/60 bg-white/95 shadow-sm p-8 md:p-10 leading-relaxed">
            <h3 className="!font-heading-en !text-xl !font-semibold !text-[#116db5] tracking-tight mb-2">
              Get Involved
            </h3>
            <ul className="mt-3 space-y-1.5 !font-sans !text-slate-700 !text-[15px]">
              <li>• Youth & Children’s Ministry</li>
              <li>• Adult Bible Study</li>
              <li>• Choir & Worship Team</li>
              <li>• Community Outreach</li>
            </ul>
            <p className="mt-4 !font-subhead !text-[14px] !text-slate-600">
              Discover ways to serve and grow with us.
            </p>
          </div>

          {/* Prayer */}
          <div className="rounded-2xl border border-slate-200/60 bg-white/95 shadow-sm p-8 md:p-10 leading-relaxed">
            <h3 className="!font-heading-en !text-xl !font-semibold !text-[#116db5] tracking-tight mb-2">
              Prayer Support
            </h3>
            <p className="mt-3 !font-sans !text-slate-700 !text-[15px] leading-relaxed">
              Our prayer team is here for you. Share your joys, concerns, or needs, and we
              will lift them up confidentially.
            </p>
            <p className="mt-3 !font-subhead !text-[13px] !text-slate-500">
              (Use the form below and check “This is a prayer request”)
            </p>
          </div>
        </div>

        {/* FORM + Map */}
        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-200/60 bg-white/95 shadow-sm p-8 md:p-10">
            <h2 className="!font-heading-en !text-2xl !font-semibold !text-[#116db5] tracking-tight">
              Email Us
            </h2>
            <p className="!font-subhead !text-slate-600 mt-1">
              Fill this out and we’ll get back to you soon.
            </p>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="block !text-sm !font-subhead !text-slate-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300 ${
                      errors.name ? "border-red-400" : "border-slate-200"
                    }`}
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Your full name"
                    required
                  />
                  {errors.name && (
                    <p className="!text-sm !text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block !text-sm !font-subhead !text-slate-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300 ${
                      errors.email ? "border-red-400" : "border-slate-200"
                    }`}
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="you@example.com"
                    required
                  />
                  {errors.email && (
                    <p className="!text-sm !text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="block !text-sm !font-subhead !text-slate-700">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block !text-sm !font-subhead !text-slate-700">
                    Reason
                  </label>
                  <select
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300 bg-white"
                    value={form.reason}
                    onChange={handleChange("reason")}
                  >
                    <option>General Question</option>
                    <option>Prayer Request</option>
                    <option>Get Involved</option>
                    <option>Pastoral Care</option>
                    <option>Facilities / Events</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block !text-sm !font-subhead !text-slate-700">
                  Message *
                </label>
                <textarea
                  rows={6}
                  className={`mt-1 w-full rounded-xl border px-3 py-3 outline-none focus:ring-2 focus:ring-sky-300 ${
                    errors.message ? "border-red-400" : "border-slate-200"
                  }`}
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder="How can we help?"
                  required
                />
                {errors.message && (
                  <p className="!text-sm !text-red-500 mt-1">{errors.message}</p>
                )}
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="prayerRequest"
                  type="checkbox"
                  checked={form.prayerRequest}
                  onChange={handleChange("prayerRequest")}
                  className="mt-1 h-5 w-5 rounded border-gray-300"
                />
                <label htmlFor="prayerRequest" className="!text-sm !font-subhead !text-slate-700">
                  This is a prayer request.
                  <span className="block !font-sans !text-slate-500 !text-xs">
                    Our team will keep your request confidential.
                  </span>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={handleChange("consent")}
                  className="mt-1 h-5 w-5 rounded border-gray-300"
                />
                <label htmlFor="consent" className="!text-sm !font-subhead !text-slate-700">
                  I understand this will open my email app to send the message.
                </label>
              </div>
              {errors.consent && (
                <p className="!text-sm !text-red-500 -mt-2">{errors.consent}</p>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  className="rounded-full bg-[#116db5] !text-white px-6 py-2.5 !font-heading-en shadow-sm hover:opacity-90 transition"
                >
                  Send Email
                </button>
              </div>

              <p className="!text-xs !font-sans !text-slate-500">
                Tip: Want this to send without opening an email app? Hook this form up to
                Formspree, Netlify Forms, or your API later—no UI changes needed.
              </p>
            </form>
          </div>

          {/* Map */}
          <div className="rounded-2xl border border-slate-200/60 bg-white/95 shadow-sm p-4 md:p-5">
            <div className="overflow-hidden rounded-xl h-[320px] md:h-[420px] w-full">
              <iframe
                title="Church Map Large"
                src={mapSrc}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
