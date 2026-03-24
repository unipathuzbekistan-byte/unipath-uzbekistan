"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "unipathuzbekistan@gmail.com";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setStatus("");
      setLoading(true);

      const normalizedEmail = email.trim().toLowerCase();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("User not found.");
      }

      if (data.user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        await supabase.auth.signOut();
        localStorage.removeItem("isAdmin");
        setStatus("You are not authorized to access the admin panel.");
        return;
      }

      localStorage.setItem("isAdmin", "true");
      window.location.href = "/admin/dashboard";
    } catch (error: any) {
      setStatus(error?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EAF4FF] via-white to-[#F4FBEF] px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
        <h1 className="text-3xl font-bold text-[#0B2341]">Admin Login</h1>
        <p className="mt-2 text-gray-600">
          Log in with the authorized admin account.
        </p>

        <form onSubmit={handleAdminLogin} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              placeholder="unipathuzbekistan@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0E5A97] focus:ring-2 focus:ring-[#0E5A97]/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0E5A97] focus:ring-2 focus:ring-[#0E5A97]/20"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0B2341] text-white py-3 font-semibold hover:bg-[#0E5A97] transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Checking..." : "Log In as Admin"}
          </button>
        </form>

        {status && (
          <div className="mt-4 rounded-xl bg-[#FFFBEF] border border-[#F8E4AE] p-4 text-sm text-[#0B2341]">
            {status}
          </div>
        )}
      </div>
    </main>
  );
}