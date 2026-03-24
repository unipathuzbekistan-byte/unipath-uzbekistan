"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MentorsPage() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      const { data, error } = await supabase
        .from("mentors")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setMentors(data);
      }

      setLoading(false);
    };

    fetchMentors();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF4FF] via-white to-[#F4FBEF] px-6 py-24 md:py-28">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0E5A97]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#4FAF3D]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#0E5A97] font-semibold">
              UniPath Mentors
            </p>

            <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-tight text-[#0B2341]">
              Learn from mentors who guide with clarity
            </h1>

            <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-700 leading-8">
              Our mentors support students with strategy, planning, essays,
              scholarships, and long-term growth toward top global opportunities.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white/90 backdrop-blur-md border border-white shadow-2xl p-8 md:p-10">
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="UniPath Logo"
                className="w-20 h-auto drop-shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-bold text-[#0B2341]">
                  Mentorship That Matters
                </h2>
                <p className="text-sm text-gray-500">
                  Guidance, structure, and accountability
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl bg-[#F8FBFF] border border-[#DCEAF7] p-5">
                <h3 className="text-lg font-semibold text-[#0E5A97]">
                  Personalized Support
                </h3>
                <p className="mt-2 text-gray-600">
                  Students receive practical and focused guidance.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F7FDF2] border border-[#E3F3D8] p-5">
                <h3 className="text-lg font-semibold text-[#4FAF3D]">
                  Strategic Direction
                </h3>
                <p className="mt-2 text-gray-600">
                  Clear advice on the right next steps and priorities.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFFBEF] border border-[#F8E4AE] p-5">
                <h3 className="text-lg font-semibold text-[#F5B321]">
                  Real Accountability
                </h3>
                <p className="mt-2 text-gray-600">
                  Mentors help students stay consistent and focused.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#4FAF3D] font-semibold">
            Meet Our Team
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#0B2341]">
            Experienced mentors for every stage of the journey
          </h2>

          {loading ? (
            <p className="mt-10 text-gray-500">Loading mentors...</p>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm text-left"
                >
                  <img
                    src={mentor.image_url || "/logo.png"}
                    alt={mentor.name}
                    className="w-full h-72 object-cover"
                  />

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#0B2341]">
                      {mentor.name}
                    </h3>

                    <p className="mt-2 text-[#0E5A97] font-semibold">
                      {mentor.role}
                    </p>

                    <p className="mt-4 text-gray-600 leading-7">
                      {mentor.bio}
                    </p>

                    <div className="mt-6 space-y-2 text-sm text-gray-700">
                      <p>
                        <span className="font-semibold">Expertise:</span>{" "}
                        {mentor.expertise}
                      </p>
                    </div>

                    <a
                      href="/contact"
                      className="inline-block mt-8 rounded-full bg-[#0B2341] text-white px-6 py-3 font-semibold hover:bg-[#0E5A97] transition"
                    >
                      Book a Session
                    </a>
                  </div>
                </div>
              ))}

              {mentors.length === 0 && (
                <p className="col-span-full text-gray-500">
                  No mentors added yet.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}