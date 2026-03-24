export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF4FF] via-white to-[#F4FBEF] px-6 py-24 md:py-28">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0E5A97]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#4FAF3D]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#0E5A97] font-semibold">
              About UniPath
            </p>

            <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-tight text-[#0B2341]">
              Built to guide students toward global success
            </h1>

            <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-700 leading-8">
              UniPath Uzbekistan is designed to help ambitious students prepare
              for top universities, scholarships, and international
              opportunities through mentorship, strategy, and structured
              support.
            </p>
          </div>

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

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl bg-[#F8FBFF] border border-[#DCEAF7] p-5">
                <h3 className="text-lg font-semibold text-[#0E5A97]">
                  Mission
                </h3>
                <p className="mt-2 text-gray-600">
                  Make global education guidance more structured, accessible,
                  and practical for students.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F7FDF2] border border-[#E3F3D8] p-5">
                <h3 className="text-lg font-semibold text-[#4FAF3D]">
                  Vision
                </h3>
                <p className="mt-2 text-gray-600">
                  Build a generation of students prepared to compete globally
                  with confidence and direction.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFFBEF] border border-[#F8E4AE] p-5">
                <h3 className="text-lg font-semibold text-[#F5B321]">
                  Approach
                </h3>
                <p className="mt-2 text-gray-600">
                  Combine mentorship, planning, and accountability in one
                  powerful platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#4FAF3D] font-semibold">
              Why We Exist
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#0B2341]">
              Students need more than information — they need direction
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-8">
              Many students have talent, ambition, and academic potential, but
              they often lack structure, mentorship, and access to clear
              guidance. UniPath exists to close that gap and create a more
              organized, supportive path toward global opportunities.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-8">
              We focus on clarity, consistency, and long-term growth so students
              can move from confusion to confidence.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl border border-[#DCEAF7] p-7 shadow-sm bg-[#F8FBFF]">
              <h3 className="text-2xl font-semibold text-[#0E5A97]">
                Structure
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                Step-by-step systems that make preparation manageable and clear.
              </p>
            </div>

            <div className="rounded-3xl border border-[#E3F3D8] p-7 shadow-sm bg-[#F7FDF2]">
              <h3 className="text-2xl font-semibold text-[#4FAF3D]">
                Mentorship
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                Real guidance, accountability, and support from people who care
                about student growth.
              </p>
            </div>

            <div className="rounded-3xl border border-[#F8E4AE] p-7 shadow-sm bg-[#FFFBEF]">
              <h3 className="text-2xl font-semibold text-[#F5B321]">
                Opportunity
              </h3>
              <p className="mt-3 text-gray-600 leading-7">
                Preparation for universities, scholarships, leadership programs,
                and international pathways.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-[#F8FBFF]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#0E5A97] font-semibold">
            Our Impact
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#0B2341]">
            Designed for measurable student progress
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            UniPath is built not only to inspire students, but to help them move
            forward with real momentum.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-[#DCEAF7]">
              <p className="text-4xl font-extrabold text-[#0E5A97]">100+</p>
              <p className="mt-2 text-gray-600">Students Guided</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-[#E3F3D8]">
              <p className="text-4xl font-extrabold text-[#4FAF3D]">20+</p>
              <p className="mt-2 text-gray-600">Programs & Opportunities</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-[#F8E4AE]">
              <p className="text-4xl font-extrabold text-[#F5B321]">1:1</p>
              <p className="mt-2 text-gray-600">Mentorship Support</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-[#DCEAF7]">
              <p className="text-4xl font-extrabold text-[#0B2341]">24/7</p>
              <p className="mt-2 text-gray-600">Long-Term Vision</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#4FAF3D] font-semibold">
            The Goal
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#0B2341]">
            From ambition to action
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-700 leading-8">
            UniPath is not just about motivation. It is about building a real
            system where students can prepare, improve, stay consistent, and
            move toward top opportunities with clarity and confidence.
          </p>

          <div className="mt-8">
            <a
              href="/signup"
              className="inline-block rounded-full bg-[#0B2341] text-white px-7 py-3.5 font-semibold hover:bg-[#0E5A97] transition shadow-lg"
            >
              Join UniPath
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}