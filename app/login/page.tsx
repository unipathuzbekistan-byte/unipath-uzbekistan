"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus(error.message);
    } else {
      window.location.href = "/dashboard";
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EAF4FF] via-white to-[#F4FBEF] px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#0E5A97]">
            Welcome Back
          </p>

          <h1 className="mt-4 text-5xl font-extrabold leading-tight text-[#0B2341]">
            Log in to your UniPath account
          </h1>

          <p className="mt-6 text-lg text-gray-700 max-w-xl">
            Access your student dashboard, applications, mentorship updates,
            and personalized university preparation tools.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-white border border-[#DCEAF7] p-5 shadow-sm">
              <h3 className="text-xl font-semibold text-[#0E5A97]">
                Track Progress
              </h3>
              <p className="mt-2 text-gray-600">
                Follow your application journey and see your next steps clearly.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-[#E3F3D8] p-5 shadow-sm">
              <h3 className="text-xl font-semibold text-[#4FAF3D]">
                Stay Organized
              </h3>
              <p className="mt-2 text-gray-600">
                Keep all your forms, documents, and support in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <h2 className="text-3xl font-bold text-[#0B2341]">Login</h2>
          <p className="mt-2 text-gray-600">
            Enter your details to continue.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0E5A97]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0E5A97]"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="/forgot-password" className="text-[#0E5A97] font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="block w-full rounded-xl bg-[#0B2341] text-white py-3 font-semibold hover:bg-[#0E5A97] transition text-center"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>

          {status && (
            <div className="mt-4 rounded-xl bg-[#FFFBEF] border border-[#F8E4AE] p-4 text-sm text-[#0B2341]">
              {status}
            </div>
          )}

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-[#4FAF3D] font-semibold">
              Create one
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}