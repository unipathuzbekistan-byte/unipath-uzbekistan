"use client";

const partners = [
  { name: "IT Park Uzbekistan", logo: "/logos/itpark.png" },
  { name: "Prime School",       logo: "/logos/prime-school.jpg" },
  { name: "Prime MUN",          logo: "/logos/primemun.jpg" },
];

export default function PartnersSection() {
  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-10">
        <p className="text-green-600 text-xs font-semibold tracking-widest uppercase mb-2">
          Hamkorlar
        </p>
        <h2 className="text-4xl font-bold text-gray-900">
          Bizning hamkorlarimiz
        </h2>
      </div>

      <div className="relative overflow-hidden">
        {/* Chetlarni xiralashtirish */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center w-36 h-20 bg-gray-50 border border-gray-200 rounded-xl px-4 opacity-60 hover:opacity-100 hover:border-green-400 transition-all duration-300 flex-shrink-0"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                onError={(e) => {
                  const el = e.currentTarget;
                  el.style.display = "none";
                  const fallback = el.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "block";
                }}
              />
              <span className="hidden text-xs font-medium text-gray-500 text-center leading-tight">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}