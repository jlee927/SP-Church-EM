// src/pages/Offerings.tsx
import bgHero from "../assets/images/bg5.jpg"; // <- replace or point to your existing hero image
import { useState } from "react";

export default function Offerings() {
  // Tailwind style tokens you’ve used elsewhere
  const cardBase =
    "relative rounded-2xl bg-white/60 md:bg-white/65 backdrop-blur-md " +
    "ring-1 ring-white/55 shadow-[0_14px_30px_-12px_rgba(17,109,181,0.20)] " +
    "transition-all duration-300 hover:shadow-[0_18px_42px_-12px_rgba(17,109,181,0.30)] hover:-translate-y-0.5 " +
    "hover:ring-1 hover:ring-[#116db5]/15";

  const iconWrap =
    "inline-flex h-10 w-10 items-center justify-center rounded-full " +
    "bg-[#116db5]/12 ring-1 ring-[#116db5]/20 shadow-[0_0_0_3px_rgba(17,109,181,0.06)]";

  // Simple state for PayPal custom amount
  const [amount, setAmount] = useState("25");
  const [fund, setFund] = useState("General Fund");

  // TODO: replace with your Stripe Payment Link (e.g., https://buy.stripe.com/abc123...)
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/your-payment-link";

  // TODO: replace with your PayPal business ID or email
  const PAYPAL_BUSINESS = "your-paypal-email@yourchurch.org";

  // Optional Zelle email + mailing address
  const ZELLE_EMAIL = "give@yourchurch.org";
  const MAILING_ADDRESS = [
    "Springwell Presbyterian Church",
    "1234 Example Rd.",
    "Chicago, IL 60601",
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* HERO */}
      <section
        className="relative h-[48vh] md:h-[52vh] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${bgHero})` }}
        aria-label="Offerings hero"
      >
        {/* soft gradient tint over the photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-white/0" />
        <div className="relative z-10 w-full mx-6 md:mx-24 lg:mx-36 pb-8">
          <h1 className="font-heading-en text-4xl md:text-5xl font-bold !text-[#116db5] drop-shadow-sm">
            Offerings & Giving
          </h1>
          <p className="font-subhead text-[#0e5a96]/90 mt-1 max-w-2xl">
            Your generosity supports worship, missions, and care for our local community.
          </p>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="relative py-12 md:py-16">
        {/* subtle sky wash background to tie with hero */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#d9ecff]/25 via-transparent to-transparent" />

        <div className="relative z-10 mx-6 md:mx-24 lg:mx-36 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* PRIMARY: Give Online */}
          <div className={`${cardBase} p-5 md:p-6 lg:col-span-2`}>
            <div className="flex items-center gap-3 mb-4">
              <span className={iconWrap} aria-hidden>
                💝
              </span>
              <h2 className="text-xl md:text-2xl font-semibold text-[#0e5a96]">
                Give Online
              </h2>
            </div>

            {/* Stripe quick button */}
            <div className="mb-6">
              <p className="text-sm text-slate-700 mb-2">
                Fast & secure checkout. You can choose one-time or recurring on the next screen.
              </p>
              <a
                href={STRIPE_PAYMENT_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-white bg-[#116db5] hover:bg-[#0e5a96] shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#116db5]"
              >
                Give with Stripe
              </a>
              <p className="mt-2 text-xs text-slate-500">
                Powered by Stripe. We don’t store any card details on our site.
              </p>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#116db5]/20 to-transparent" />

            {/* PayPal form with amount + fund */}
            <div>
              <p className="text-sm text-slate-700 mb-3">
                Prefer PayPal? You can set an amount and choose a fund:
              </p>

              <form
                action="https://www.paypal.com/donate"
                method="post"
                target="_blank"
                className="grid grid-cols-1 md:grid-cols-4 gap-3 md:items-end"
              >
                <input type="hidden" name="business" value={PAYPAL_BUSINESS} />
                <input type="hidden" name="currency_code" value="USD" />
                {/* Pass a note/designation via item_name so your treasurer sees it in PayPal details */}
                <input type="hidden" name="item_name" value={`Offering • ${fund}`} />

                <label className="block">
                  <span className="text-xs font-medium text-slate-600">Amount (USD)</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    name="amount"
                    className="mt-1 w-full rounded-lg border-slate-300 focus:border-[#116db5] focus:ring-[#116db5] bg-white/80"
                    placeholder="25"
                    required
                    aria-label="Donation amount in US dollars"
                  />
                </label>

                <div className="flex gap-2 md:col-span-2">
                  {["25", "50", "100", "250"].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className="flex-1 rounded-lg ring-1 ring-slate-200 bg-white/80 px-3 py-2 text-sm hover:ring-[#116db5]/40"
                      aria-label={`Set amount to ${preset} dollars`}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>

                <label className="block md:col-span-2">
                  <span className="text-xs font-medium text-slate-600">Fund</span>
                  <select
                    value={fund}
                    onChange={(e) => setFund(e.target.value)}
                    className="mt-1 w-full rounded-lg border-slate-300 focus:border-[#116db5] focus:ring-[#116db5] bg-white/80"
                    aria-label="Choose donation fund"
                  >
                    <option>General Fund</option>
                    <option>Missions</option>
                    <option>Benevolence</option>
                    <option>Building</option>
                    <option>Youth/Children</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="rounded-xl px-4 py-2.5 text-white bg-[#0e5a96] hover:bg-[#0c4976] shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#116db5]"
                >
                  Give with PayPal
                </button>

                <p className="text-xs text-slate-500 md:col-span-3">
                  PayPal may offer card, bank, or balance options depending on your account.
                </p>
              </form>
            </div>
          </div>

          {/* SECONDARY: QR + Other Ways */}
          <div className={`${cardBase} p-5 md:p-6`}>
            <div className="flex items-center gap-3 mb-4">
              <span className={iconWrap} aria-hidden>
                📱
              </span>
              <h3 className="text-lg md:text-xl font-semibold text-[#0e5a96]">
                Other Ways to Give
              </h3>
            </div>

            {/* Optional QR code (replace src with your hosted QR to Stripe/PayPal/your /donate route) */}
            <div className="rounded-xl ring-1 ring-slate-200 bg-white/70 p-3 mb-4">
              <img
                src="/qr-donate.png"
                alt="Scan to give"
                className="mx-auto w-40 h-40 object-contain"
              />
              <p className="text-center text-xs text-slate-600 mt-2">
                Scan to give from your phone.
              </p>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              <li>
                <strong>Zelle:</strong>{" "}
                <a href={`mailto:${ZELLE_EMAIL}`} className="text-[#0e5a96] underline">
                  {ZELLE_EMAIL}
                </a>{" "}
                (memo: “Offering” + fund)
              </li>
              <li>
                <strong>Check by mail:</strong>
                <address className="not-italic mt-1 text-slate-700">
                  {MAILING_ADDRESS.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </address>
              </li>
              <li>
                <strong>In-person:</strong> Place offerings in the box at the back of the sanctuary.
              </li>
            </ul>
          </div>

          {/* TRUST / FAQ */}
          <div className={`${cardBase} p-5 md:p-6 lg:col-span-3`}>
            <div className="flex items-center gap-3 mb-4">
              <span className={iconWrap} aria-hidden>
                🔒
              </span>
              <h3 className="text-lg md:text-xl font-semibold text-[#0e5a96]">
                Security & Questions
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
              <div className="rounded-xl ring-1 ring-slate-200 bg-white/70 p-4">
                <p className="font-medium mb-1">Secure processing</p>
                <p>
                  Our online giving uses trusted processors (Stripe/PayPal). We never store card
                  data on our servers.
                </p>
              </div>
              <div className="rounded-xl ring-1 ring-slate-200 bg-white/70 p-4">
                <p className="font-medium mb-1">Designated gifts</p>
                <p>
                  Choose a fund (e.g., Missions). Undesignated gifts go to the General Fund.
                </p>
              </div>
              <div className="rounded-xl ring-1 ring-slate-200 bg-white/70 p-4">
                <p className="font-medium mb-1">Statements</p>
                <p>
                  Need a giving statement or have questions? Contact{" "}
                  <a href="mailto:finance@yourchurch.org" className="text-[#0e5a96] underline">
                    finance@yourchurch.org
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

