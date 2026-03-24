"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setEvents(data);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF4FF] via-white to-[#F4FBEF] px-6 py-24 md:py-28">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0E5A97]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#4FAF3D]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#0E5A97] font-semibold">
            UniPath Events
          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-tight text-[#0B2341]">
            Discover events that move students forward
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-8">
            Join workshops, mentoring sessions, university guidance events, and
            special opportunities designed to help students grow.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading events...</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                >
                  <img
                    src={event.image_url || "/logo.png"}
                    alt={event.title}
                    className="w-full h-60 object-cover"
                  />

                  <div className="p-8">
                    <p className="text-sm uppercase tracking-[0.25em] text-[#4FAF3D] font-semibold">
                      Upcoming Event
                    </p>

                    <h3 className="mt-4 text-2xl font-bold text-[#0B2341]">
                      {event.title}
                    </h3>

                    <div className="mt-6 space-y-3 text-gray-700">
                      <p>
                        <span className="font-semibold">Date:</span> {event.date}
                      </p>
                      <p>
                        <span className="font-semibold">Location:</span> {event.location}
                      </p>
                      <p>
                        <span className="font-semibold">Details:</span> {event.description}
                      </p>
                    </div>

                    <a
                      href="/apply"
                      className="inline-block mt-8 rounded-full bg-[#0B2341] text-white px-6 py-3 font-semibold hover:bg-[#0E5A97] transition"
                    >
                      Register
                    </a>
                  </div>
                </div>
              ))}

              {events.length === 0 && (
                <p className="col-span-full text-center text-gray-500">
                  No events added yet.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}