"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setStatus("");
      setLoading(true);

      if (password.length < 8) {
        setStatus("Password must be at least 8 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setStatus("Passwords do not match.");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      setStatus("Password updated successfully. Redirecting to login...");

      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 1500);
    } catch (error: any) {
      setStatus(error?.message || "Could not update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EAF4FF] via-white to-[#F4FBEF] px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
        <h1 className="text-3xl font-bold text-[#0B2341]">
          Update Admin Password
        </h1>

        <p className="mt-2 text-gray-600">
          Enter your new UniPath admin password.
        </p>

        <form onSubmit={handleUpdatePassword} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0E5A97] focus:ring-2 focus:ring-[#0E5A97]/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0E5A97] focus:ring-2 focus:ring-[#0E5A97]/20"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0B2341] text-white py-3 font-semibold hover:bg-[#0E5A97] transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Password"}
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