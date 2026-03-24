"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserAndApplications = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setUser(data.user);

      const { data: appData } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false });

      if (appData) {
        setApplications(appData);
      }

      setLoading(false);
    };

    getUserAndApplications();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const getProgress = (status: string) => {
    if (status === "accepted") return 100;
    if (status === "rejected") return 0;
    return 40;
  };

  const getStatusColor = (status: string) => {
    if (status === "accepted") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F4FBEF] via-white to-[#EAF4FF] px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#4FAF3D]">
              Student Dashboard
            </p>
            <h1 className="mt-2 text-4xl font-bold text-[#0B2341]">
              Welcome back, {user?.user_metadata?.full_name || "Student"}
            </h1>
            <p className="mt-2 text-gray-600">
              Track your applications, status, and next steps.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full bg-red-500 text-white px-5 py-2 font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-[#0B2341]">Account</h2>
            <p className="mt-3 text-gray-700">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Name:</span>{" "}
              {user?.user_metadata?.full_name || "Not provided"}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-[#0B2341]">
              Applications Submitted
            </h2>
            <p className="mt-4 text-4xl font-bold text-[#0E5A97]">
              {applications.length}
            </p>
            <p className="mt-2 text-gray-600">Total submitted applications</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-[#0B2341]">
              Current Focus
            </h2>
            <p className="mt-4 text-xl font-bold text-[#4FAF3D]">
              Stay Consistent
            </p>
            <p className="mt-2 text-gray-600">
              Keep improving your profile and checking updates.
            </p>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-[#0E5A97]">
            Your Applications
          </h2>

          {applications.length === 0 ? (
            <div className="mt-6">
              <p className="text-gray-600">
                You have not submitted any applications yet.
              </p>
              <a
                href="/apply"
                className="inline-block mt-4 rounded-full bg-[#0B2341] text-white px-6 py-3 font-semibold hover:bg-[#0E5A97] transition"
              >
                Apply Now
              </a>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {applications.map((app) => {
                const progress = getProgress(app.status);

                return (
                  <div
                    key={app.id}
                    className="rounded-2xl border border-gray-200 p-6 bg-[#F8FBFF]"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#0B2341] capitalize">
                          {app.program_type}
                        </h3>

                        <p className="mt-2 text-gray-700">
                          <span className="font-semibold">Goal:</span> {app.goal}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                          Submitted by: {app.full_name}
                        </p>
                      </div>

                      <div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>

                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-3 rounded-full ${
                            app.status === "accepted"
                              ? "bg-green-500"
                              : app.status === "rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      <div className="rounded-xl bg-white p-4 border">
                        <p className="text-sm text-gray-500">Step 1</p>
                        <p className="font-semibold text-[#0B2341]">
                          Application Submitted
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-4 border">
                        <p className="text-sm text-gray-500">Step 2</p>
                        <p className="font-semibold text-[#0B2341]">
                          Under Review
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-4 border">
                        <p className="text-sm text-gray-500">Step 3</p>
                        <p className="font-semibold text-[#0B2341]">
                          Final Decision
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}