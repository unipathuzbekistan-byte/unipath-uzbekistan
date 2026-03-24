"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("universities")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setUniversities(data);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredUniversities = useMemo(() => {
    return universities.filter((u) => {
      const matchesSearch =
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.country?.toLowerCase().includes(search.toLowerCase()) ||
        u.world_rank?.toLowerCase().includes(search.toLowerCase());

      const matchesTier =
        tierFilter === "All" ? true : u.tier === tierFilter;

      return matchesSearch && matchesTier;
    });
  }, [universities, search, tierFilter]);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF4FF] via-white to-[#F4FBEF] px-6 py-24 md:py-28">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0E5A97]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#4FAF3D]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#0E5A97] font-semibold">
            University Explorer
          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-tight text-[#0B2341]">
            Discover universities that match your goals
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-8">
            Explore universities by tier, country, rank, selectivity, and official website.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search by university, country, or rank..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-5 py-3 outline-none focus:border-[#0E5A97]"
            />

            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-5 py-3 outline-none focus:border-[#0E5A97]"
            >
              <option value="All">All Tiers</option>
              <option value="Ivy League">Ivy League</option>
              <option value="Top Global">Top Global</option>
              <option value="Top 100">Top 100</option>
              <option value="Top 300">Top 300</option>
            </select>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading universities...</p>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-3xl font-bold text-[#0B2341]">
                  Available Universities
                </h2>

                <p className="text-gray-600">
                  Results: <span className="font-semibold">{filteredUniversities.length}</span>
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredUniversities.map((u) => (
                  <div
                    key={u.id}
                    className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition"
                  >
                    <img
                      src={u.image_url || "/logo.png"}
                      alt={u.name}
                      className="w-full h-60 object-cover"
                    />

                    <div className="p-8">
                      <p className="text-sm uppercase tracking-[0.25em] text-[#4FAF3D] font-semibold">
                        {u.tier}
                      </p>

                      <h3 className="mt-4 text-2xl font-bold text-[#0B2341]">
                        {u.name}
                      </h3>

                      <div className="mt-6 space-y-3 text-gray-700">
                        <p>
                          <span className="font-semibold">Country:</span> {u.country}
                        </p>
                        <p>
                          <span className="font-semibold">World Rank:</span> {u.world_rank}
                        </p>
                        <p>
                          <span className="font-semibold">Acceptance Rate:</span> {u.acceptance_rate}
                        </p>
                        <p>
                          <span className="font-semibold">Requirements:</span> {u.requirements}
                        </p>
                      </div>

                      <a
                        href={u.website_url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-8 rounded-full bg-[#0B2341] text-white px-6 py-3 font-semibold hover:bg-[#0E5A97] transition"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                ))}

                {filteredUniversities.length === 0 && (
                  <p className="col-span-full text-center text-gray-500">
                    No universities match your search or filter.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}