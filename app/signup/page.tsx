"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");

    if (password !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Account created. Check your email for verification.");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F4FBEF] via-white to-[#EAF4FF] px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#4FAF3D]">
            Join UniPath
          </p>

          <h1 className="mt-4 text-5xl font-extrabold leading-tight text-[#0B2341]">
            Create your student account
          </h1>

          <p className="mt-6 text-lg text-gray-700 max-w-xl">
            Start your journey with UniPath and get access to expert guidance,
            mentorship, and structured support for top university preparation.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-2xl bg-white border border-[#F8E4AE] p-5 shadow-sm">
              <h3 className="text-xl font-semibold text-[#F5B321]">
                Personalized Guidance
              </h3>
              <p className="mt-2 text-gray-600">
                Build your own preparation journey with step-by-step support.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-[#DCEAF7] p-5 shadow-sm">
              <h3 className="text-xl font-semibold text-[#0E5A97]">
                Real Opportunities
              </h3>
              <p className="mt-2 text-gray-600">
                Prepare for universities, scholarships, and leadership programs.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <h2 className="text-3xl font-bold text-[#0B2341]">Sign Up</h2>
          <p className="mt-2 text-gray-600">
            Create your account to get started.
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#4FAF3D]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#4FAF3D]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#4FAF3D]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#4FAF3D]"
                required
              />
            </div>

            <button
              type="submit"
              className="block w-full rounded-xl bg-[#4FAF3D] text-white py-3 font-semibold hover:bg-[#3f9731] transition text-center"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {status && (
            <div className="mt-4 rounded-xl bg-[#F8FBFF] border border-[#DCEAF7] p-4 text-sm text-[#0B2341]">
              {status}
            </div>
          )}

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-[#0E5A97] font-semibold">
              Log in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}