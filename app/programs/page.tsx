"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPrograms(data);
      }

      setLoading(false);
    };

    fetchPrograms();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F4FBEF] via-white to-[#EAF4FF] px-6 py-24 md:py-28">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#4FAF3D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#0E5A97]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#4FAF3D] font-semibold">
            UniPath Programs
          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-tight text-[#0B2341]">
            Structured pathways for ambitious students
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-8">
            Explore our programs and choose the preparation track that matches
            your goals and level.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading programs...</p>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm text-left"
                >
                  <p className="text-sm uppercase tracking-[0.25em] text-[#4FAF3D] font-semibold">
                    {program.category}
                  </p>

                  <h3 className="mt-4 text-3xl font-bold text-[#0B2341]">
                    {program.title}
                  </h3>

                  <p className="mt-4 text-gray-700 leading-7">
                    {program.short_description}
                  </p>

                  <p className="mt-6 text-sm text-gray-600">
                    <span className="font-semibold">Benefits:</span>{" "}
                    {program.benefits}
                  </p>

                  <a
                    href="/apply"
                    className="inline-block mt-8 rounded-full bg-[#0B2341] text-white px-6 py-3 font-semibold hover:bg-[#0E5A97] transition"
                  >
                    {program.cta_text}
                  </a>
                </div>
              ))}

              {programs.length === 0 && (
                <p className="col-span-full text-center text-gray-500">
                  No programs added yet.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}