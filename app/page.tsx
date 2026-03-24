export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF4FF] via-white to-[#F4FBEF] px-6 py-24 md:py-32">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0E5A97]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#4FAF3D]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#0E5A97] font-semibold">
              Your Path to Global Success
            </p>

            <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-tight text-[#0B2341]">
              Build Your Future with UniPath Uzbekistan
            </h1>

            <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-700 leading-8">
              We help ambitious students prepare for top universities,
              scholarships, and international opportunities through mentorship,
              strategy, and structured support.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/signup"
                className="rounded-full bg-[#0B2341] text-white px-7 py-3.5 font-semibold hover:bg-[#0E5A97] transition shadow-lg"
              >
                Get Started
              </a>

              <a
                href="/about"
                className="rounded-full border-2 border-[#0B2341] text-[#0B2341] px-7 py-3.5 font-semibold hover:bg-[#0B2341] hover:text-white transition"
              >
                Learn More
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <p className="text-3xl font-extrabold text-[#0B2341]">100+</p>
                <p className="text-gray-600 mt-1">Students Guided</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#4FAF3D]">20+</p>
                <p className="text-gray-600 mt-1">Programs & Opportunities</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#F5B321]">1:1</p>
                <p className="text-gray-600 mt-1">Mentorship Support</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-white/80 backdrop-blur-md border border-white shadow-2xl p-8 md:p-10">
              <div className="flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt="UniPath Logo"
                  className="w-20 h-auto drop-shadow-lg"
                />
                <div>
                  <h2 className="text-2xl font-bold text-[#0B2341]">
                    UniPath Uzbekistan
                  </h2>
                  <p className="text-sm text-gray-500">
                    Premium student success platform
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-[#F8FBFF] border border-[#DCEAF7] p-5">
                  <h3 className="text-lg font-semibold text-[#0E5A97]">
                    University Applications
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Strong support with essays, strategy, and deadlines.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F7FDF2] border border-[#E3F3D8] p-5">
                  <h3 className="text-lg font-semibold text-[#4FAF3D]">
                    Mentorship & Planning
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Personal guidance to keep students consistent and focused.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FFFBEF] border border-[#F8E4AE] p-5">
                  <h3 className="text-lg font-semibold text-[#F5B321]">
                    Scholarships & Opportunities
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Discover matching global programs and funding pathways.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B2341]">
            Why UniPath?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We combine structure, strategy, and mentorship to help students
            move confidently toward global academic opportunities.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-[#DCEAF7] p-7 shadow-sm bg-[#F8FBFF] hover:-translate-y-1 transition">
              <h3 className="text-2xl font-semibold text-[#0E5A97]">
                Structured Guidance
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                Step-by-step support for applications, planning, deadlines,
                essays, and long-term preparation.
              </p>
            </div>

            <div className="rounded-3xl border border-[#E3F3D8] p-7 shadow-sm bg-[#F7FDF2] hover:-translate-y-1 transition">
              <h3 className="text-2xl font-semibold text-[#4FAF3D]">
                Mentorship
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                Students receive real accountability, practical feedback, and
                encouragement throughout their journey.
              </p>
            </div>

            <div className="rounded-3xl border border-[#F8E4AE] p-7 shadow-sm bg-[#FFFBEF] hover:-translate-y-1 transition">
              <h3 className="text-2xl font-semibold text-[#F5B321]">
                Global Opportunities
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                We help students prepare for universities, scholarships,
                competitions, and leadership programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-[#F8FBFF]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#0B2341]">
            What Students Say
          </h2>
          <p className="mt-4 text-gray-600">
            Real students. Real growth. Real ambition.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-2xl shadow">
              <p className="text-gray-700 leading-7">
                “UniPath helped me understand the whole application process. I
                became much more confident about studying abroad.”
              </p>
              <p className="mt-4 font-semibold text-[#0B2341]">
                — Azizbek, Uzbekistan
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <p className="text-gray-700 leading-7">
                “Before UniPath, I knew almost nothing about scholarships. Now I
                have direction and a clear plan.”
              </p>
              <p className="mt-4 font-semibold text-[#0B2341]">
                — Madina, Tashkent
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <p className="text-gray-700 leading-7">
                “The mentors were supportive and practical. They explained every
                step in a simple way.”
              </p>
              <p className="mt-4 font-semibold text-[#0B2341]">
                — Javlon, Samarkand
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#0B2341]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-12 max-w-4xl mx-auto space-y-6">
          <div className="bg-[#F8FBFF] p-6 rounded-2xl">
            <h3 className="font-semibold text-[#0B2341] text-lg">
              Who can apply to UniPath?
            </h3>
            <p className="mt-2 text-gray-600">
              Any motivated student who wants to study abroad, improve their
              academic profile, or prepare for global opportunities.
            </p>
          </div>

          <div className="bg-[#F8FBFF] p-6 rounded-2xl">
            <h3 className="font-semibold text-[#0B2341] text-lg">
              What does fully funded mean?
            </h3>
            <p className="mt-2 text-gray-600">
              It usually means tuition, living costs, and sometimes travel
              expenses are covered through scholarships or special funding.
            </p>
          </div>

          <div className="bg-[#F8FBFF] p-6 rounded-2xl">
            <h3 className="font-semibold text-[#0B2341] text-lg">
              How do students get selected?
            </h3>
            <p className="mt-2 text-gray-600">
              Students are selected based on performance, motivation, profile
              strength, and sometimes internal exams or evaluations.
            </p>
          </div>

          <div className="bg-[#F8FBFF] p-6 rounded-2xl">
            <h3 className="font-semibold text-[#0B2341] text-lg">
              Do you guarantee university admission?
            </h3>
            <p className="mt-2 text-gray-600">
              No one can guarantee admission, but UniPath helps students
              significantly improve their readiness, strategy, and chances.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-gradient-to-r from-[#0B2341] to-[#0E5A97] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-200">
            Start Your Journey
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">
            Ready to build your global future?
          </h2>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
            Join UniPath Uzbekistan and start preparing for universities,
            scholarships, and international opportunities with confidence.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/signup"
              className="rounded-full bg-white text-[#0B2341] px-7 py-3.5 font-semibold hover:bg-gray-100 transition"
            >
              Join UniPath
            </a>

            <a
              href="/apply"
              className="rounded-full border border-white text-white px-7 py-3.5 font-semibold hover:bg-white hover:text-[#0B2341] transition"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}