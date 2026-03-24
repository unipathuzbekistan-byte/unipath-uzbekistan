"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ApplyPage() {
  const [user, setUser] = useState<any>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [programType, setProgramType] = useState("standard");
  const [targetCountry, setTargetCountry] = useState("");
  const [dreamUniversity, setDreamUniversity] = useState("");
  const [scholarship, setScholarship] = useState("yes");
  const [goal, setGoal] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/login";
      } else {
        setUser(data.user);
        setFullName(data.user.user_metadata?.full_name || "");
      }
    };

    getUser();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const { error } = await supabase.from("applications").insert([
      {
        user_id: user.id,
        full_name: fullName,
        email: user.email,
        phone,
        telegram,
        program_type: programType,
        target_country: targetCountry,
        dream_university: dreamUniversity,
        scholarship,
        goal,
        status: "pending",
      },
    ]);

    if (error) {
      setStatus("Error: " + error.message);
    } else {
      setStatus("success");
      setGoal("");
      setPhone("");
      setTelegram("");
      setTargetCountry("");
      setDreamUniversity("");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F4FBEF] via-white to-[#EAF4FF] px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-[#0B2341]">
          Apply to UniPath
        </h1>

        <p className="mt-2 text-gray-600">
          Fill out the form below and start your journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* PERSONAL */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-[#0B2341]">
              Personal Information
            </h2>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full border px-4 py-3 rounded-xl mb-3"
              required
            />

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 90 123 45 67"
              className="w-full border px-4 py-3 rounded-xl mb-3"
              required
            />

            <input
              type="text"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder="Telegram username (@username)"
              className="w-full border px-4 py-3 rounded-xl"
            />
          </div>

          {/* PROGRAM */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-[#0B2341]">
              Choose Program
            </h2>

            <div className="grid gap-3 md:grid-cols-3">
              {["standard", "premium", "fully-funded"].map((type) => (
                <div
                  key={type}
                  onClick={() => setProgramType(type)}
                  className={`cursor-pointer border rounded-xl p-4 text-center ${
                    programType === type
                      ? "bg-[#0B2341] text-white"
                      : "bg-white"
                  }`}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>

          {/* GOALS */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-[#0B2341]">
              Academic Goals
            </h2>

            <input
              value={targetCountry}
              onChange={(e) => setTargetCountry(e.target.value)}
              placeholder="Target Country (USA, Germany...)"
              className="w-full border px-4 py-3 rounded-xl mb-3"
            />

            <input
              value={dreamUniversity}
              onChange={(e) => setDreamUniversity(e.target.value)}
              placeholder="Dream University"
              className="w-full border px-4 py-3 rounded-xl mb-3"
            />

            <select
              value={scholarship}
              onChange={(e) => setScholarship(e.target.value)}
              className="w-full border px-4 py-3 rounded-xl"
            >
              <option value="yes">Need Scholarship</option>
              <option value="no">Self-funded</option>
            </select>
          </div>

          {/* MOTIVATION */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-[#0B2341]">
              Motivation
            </h2>

            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Why do you want to join UniPath?"
              className="w-full border px-4 py-3 rounded-xl"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4FAF3D] text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>

        {status === "success" && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-xl text-center">
            ✅ Application submitted successfully!
          </div>
        )}

        {status && status !== "success" && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl text-center">
            {status}
          </div>
        )}

      </div>
    </main>
  );
}