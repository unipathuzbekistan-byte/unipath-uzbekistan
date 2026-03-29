"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Application = {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  telegram?: string;
  program_type?: string;
  scholarship?: string;
  target_country?: string;
  dream_university?: string;
  goal?: string;
  status: string;
  created_at?: string;
};

type Mentor = {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise?: string;
  image_url?: string;
  created_at?: string;
};

type University = {
  id: string;
  name: string;
  country?: string;
  world_rank?: string;
  acceptance_rate?: string;
  requirements?: string;
  tier?: string;
  image_url?: string;
  website_url?: string;
  created_at?: string;
};

type Program = {
  id: string;
  title: string;
  category?: string;
  short_description?: string;
  benefits?: string;
  cta_text?: string;
  created_at?: string;
};

type EventItem = {
  id: string;
  title: string;
  date?: string;
  location?: string;
  description?: string;
  image_url?: string;
  created_at?: string;
};

const ADMIN_EMAIL = "unipathuzbekistan@gmail.com";

export default function AdminDashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);

  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null);
  const [editingUniversity, setEditingUniversity] =
    useState<University | null>(null);

  const [loading, setLoading] = useState(true);
  const [mentorUploading, setMentorUploading] = useState(false);
  const [mentorEditUploading, setMentorEditUploading] = useState(false);

  const [appSearch, setAppSearch] = useState("");
  const [appStatusFilter, setAppStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  useEffect(() => {
    const checkAdminAndLoad = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
          window.location.href = "/admin/login";
          return;
        }

        await fetchAllData();
      } catch (error) {
        console.error(error);
        window.location.href = "/admin/login";
      }
    };

    checkAdminAndLoad();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [
        applicationsRes,
        mentorsRes,
        universitiesRes,
        programsRes,
        eventsRes,
      ] = await Promise.all([
        supabase
          .from("applications")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("mentors")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("universities")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("programs")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (applicationsRes.error) throw applicationsRes.error;
      if (mentorsRes.error) throw mentorsRes.error;
      if (universitiesRes.error) throw universitiesRes.error;
      if (programsRes.error) throw programsRes.error;
      if (eventsRes.error) throw eventsRes.error;

      setApplications((applicationsRes.data as Application[]) || []);
      setMentors((mentorsRes.data as Mentor[]) || []);
      setUniversities((universitiesRes.data as University[]) || []);
      setPrograms((programsRes.data as Program[]) || []);
      setEvents((eventsRes.data as EventItem[]) || []);
    } catch (error: any) {
      alert("Error loading dashboard: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const q = appSearch.trim().toLowerCase();

      const matchesSearch =
        q === "" ||
        (app.full_name || "").toLowerCase().includes(q) ||
        (app.email || "").toLowerCase().includes(q) ||
        (app.phone || "").toLowerCase().includes(q) ||
        (app.telegram || "").toLowerCase().includes(q) ||
        (app.program_type || "").toLowerCase().includes(q);

      const matchesStatus =
        appStatusFilter === "all" ? true : app.status === appStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, appSearch, appStatusFilter]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Error updating status: " + error.message);
      return;
    }

    await fetchAllData();

    if (selectedApplication?.id === id) {
      setSelectedApplication((prev) =>
        prev ? { ...prev, status } : prev
      );
    }
  };

  const getTelegramLink = (telegram?: string) => {
    if (!telegram) return "#";
    const clean = telegram.replace("@", "").trim();
    return `https://t.me/${clean}`;
  };

  const uploadMentorImage = async (file: File) => {
    const ext = file.name.split(".").pop() || "png";
    const fileName = `mentor-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("mentors")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from("mentors").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleAddMentor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMentorUploading(true);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);

      const file = fd.get("mentor_photo") as File | null;
      let imageUrl = "";

      if (file && file.size > 0) {
        imageUrl = await uploadMentorImage(file);
      }

      const { error } = await supabase.from("mentors").insert([
        {
          name: fd.get("name"),
          role: fd.get("role"),
          bio: fd.get("bio"),
          expertise: fd.get("expertise"),
          image_url: imageUrl,
        },
      ]);

      if (error) {
        alert("Error adding mentor: " + error.message);
        return;
      }

      alert("Mentor added!");
      form.reset();
      await fetchAllData();
    } catch (error: any) {
      alert("Upload error: " + error.message);
    } finally {
      setMentorUploading(false);
    }
  };

  const handleUpdateMentor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingMentor) return;

    setMentorEditUploading(true);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);

      const file = fd.get("mentor_photo") as File | null;
      let imageUrl = editingMentor.image_url || "";

      if (file && file.size > 0) {
        imageUrl = await uploadMentorImage(file);
      }

      const { error } = await supabase
        .from("mentors")
        .update({
          name: fd.get("name"),
          role: fd.get("role"),
          bio: fd.get("bio"),
          expertise: fd.get("expertise"),
          image_url: imageUrl,
        })
        .eq("id", editingMentor.id);

      if (error) {
        alert("Error updating mentor: " + error.message);
        return;
      }

      alert("Mentor updated!");
      setEditingMentor(null);
      await fetchAllData();
    } catch (error: any) {
      alert("Upload error: " + error.message);
    } finally {
      setMentorEditUploading(false);
    }
  };

  const deleteMentor = async (id: string) => {
    const ok = confirm("Delete this mentor?");
    if (!ok) return;

    const { error } = await supabase.from("mentors").delete().eq("id", id);

    if (error) {
      alert("Error deleting mentor: " + error.message);
      return;
    }

    if (editingMentor?.id === id) {
      setEditingMentor(null);
    }

    await fetchAllData();
  };

  const handleAddUniversity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const { error } = await supabase.from("universities").insert([
      {
        name: fd.get("name"),
        country: fd.get("country"),
        world_rank: fd.get("world_rank"),
        acceptance_rate: fd.get("acceptance_rate"),
        requirements: fd.get("requirements"),
        tier: fd.get("tier"),
        image_url: fd.get("image_url"),
        website_url: fd.get("website_url"),
      },
    ]);

    if (error) {
      alert("Error adding university: " + error.message);
      return;
    }

    alert("University added!");
    form.reset();
    await fetchAllData();
  };

  const handleUpdateUniversity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!editingUniversity) return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    const { error } = await supabase
      .from("universities")
      .update({
        name: fd.get("name"),
        country: fd.get("country"),
        world_rank: fd.get("world_rank"),
        acceptance_rate: fd.get("acceptance_rate"),
        requirements: fd.get("requirements"),
        tier: fd.get("tier"),
        image_url: fd.get("image_url"),
        website_url: fd.get("website_url"),
      })
      .eq("id", editingUniversity.id);

    if (error) {
      alert("Error updating university: " + error.message);
      return;
    }

    alert("University updated!");
    setEditingUniversity(null);
    await fetchAllData();
  };

  const deleteUniversity = async (id: string) => {
    const ok = confirm("Delete this university?");
    if (!ok) return;

    const { error } = await supabase.from("universities").delete().eq("id", id);

    if (error) {
      alert("Error deleting university: " + error.message);
      return;
    }

    if (editingUniversity?.id === id) {
      setEditingUniversity(null);
    }

    await fetchAllData();
  };

  const handleAddProgram = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const { error } = await supabase.from("programs").insert([
      {
        title: fd.get("title"),
        category: fd.get("category"),
        short_description: fd.get("short_description"),
        benefits: fd.get("benefits"),
        cta_text: fd.get("cta_text"),
      },
    ]);

    if (error) {
      alert("Error adding program: " + error.message);
      return;
    }

    alert("Program added!");
    form.reset();
    await fetchAllData();
  };

  const deleteProgram = async (id: string) => {
    const ok = confirm("Delete this program?");
    if (!ok) return;

    const { error } = await supabase.from("programs").delete().eq("id", id);

    if (error) {
      alert("Error deleting program: " + error.message);
      return;
    }

    await fetchAllData();
  };

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const { error } = await supabase.from("events").insert([
      {
        title: fd.get("title"),
        date: fd.get("date"),
        location: fd.get("location"),
        description: fd.get("description"),
        image_url: fd.get("image_url"),
      },
    ]);

    if (error) {
      alert("Error adding event: " + error.message);
      return;
    }

    alert("Event added!");
    form.reset();
    await fetchAllData();
  };

  const deleteEvent = async (id: string) => {
    const ok = confirm("Delete this event?");
    if (!ok) return;

    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      alert("Error deleting event: " + error.message);
      return;
    }

    await fetchAllData();
  };

  const getStatusBadgeClass = (status: string) => {
    if (status === "accepted") {
      return "bg-green-500 text-white";
    }
    if (status === "rejected") {
      return "bg-red-500 text-white";
    }
    return "bg-yellow-500 text-white";
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading admin panel...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#0B2341]">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage applications, mentors, universities, programs, and events.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full bg-red-500 px-5 py-2.5 text-white font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-5">
          <div className="bg-white rounded-2xl p-6 shadow border">
            <h2 className="text-lg text-gray-500">Applications</h2>
            <p className="text-3xl font-bold text-[#0E5A97] mt-2">
              {applications.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border">
            <h2 className="text-lg text-gray-500">Mentors</h2>
            <p className="text-3xl font-bold text-[#4FAF3D] mt-2">
              {mentors.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border">
            <h2 className="text-lg text-gray-500">Universities</h2>
            <p className="text-3xl font-bold text-[#F5B321] mt-2">
              {universities.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border">
            <h2 className="text-lg text-gray-500">Programs</h2>
            <p className="text-3xl font-bold text-[#0B2341] mt-2">
              {programs.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border">
            <h2 className="text-lg text-gray-500">Events</h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {events.length}
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-3xl shadow p-8 border">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-2xl font-bold text-[#0B2341]">Applications</h2>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                className="border px-4 py-2 rounded-xl min-w-[260px]"
              />

              <select
                value={appStatusFilter}
                onChange={(e) => setAppStatusFilter(e.target.value)}
                className="border px-4 py-2 rounded-xl"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="bg-[#F8FBFF] text-left">
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Program</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b">Phone</th>
                  <th className="p-3 border-b">Telegram</th>
                  <th className="p-3 border-b">Country</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#FAFCFF]">
                    <td className="p-3 border-b font-medium text-[#0B2341]">
                      {app.full_name}
                    </td>

                    <td className="p-3 border-b">{app.program_type || "-"}</td>

                    <td className="p-3 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="p-3 border-b">{app.phone || "-"}</td>
                    <td className="p-3 border-b">{app.telegram || "-"}</td>
                    <td className="p-3 border-b">{app.target_country || "-"}</td>

                    <td className="p-3 border-b">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedApplication(app)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => updateStatus(app.id, "accepted")}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Accept
                        </button>

                        <button
                          type="button"
                          onClick={() => updateStatus(app.id, "rejected")}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Reject
                        </button>

                        <button
                          type="button"
                          onClick={() => updateStatus(app.id, "pending")}
                          className="bg-gray-500 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Reset
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredApplications.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-6 text-center text-gray-500 border-b"
                    >
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-[#0B2341]">
                  {selectedApplication.full_name}
                </h2>

                <button
                  type="button"
                  onClick={() => setSelectedApplication(null)}
                  className="rounded-lg bg-gray-200 px-4 py-2"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{selectedApplication.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">
                    {selectedApplication.phone || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Telegram</p>
                  <p className="font-semibold">
                    {selectedApplication.telegram || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Program</p>
                  <p className="font-semibold">
                    {selectedApplication.program_type || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Scholarship</p>
                  <p className="font-semibold">
                    {selectedApplication.scholarship || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Target Country</p>
                  <p className="font-semibold">
                    {selectedApplication.target_country || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Dream University</p>
                  <p className="font-semibold">
                    {selectedApplication.dream_university || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-semibold">
                    {selectedApplication.status || "-"}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">Goal / Motivation</p>
                <p className="mt-1 whitespace-pre-wrap text-[#0B2341]">
                  {selectedApplication.goal || "-"}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {selectedApplication.telegram && (
                  <a
                    href={getTelegramLink(selectedApplication.telegram)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#229ED9] text-white px-4 py-2 text-sm font-semibold"
                  >
                    Open Telegram
                  </a>
                )}

                <button
                  type="button"
                  onClick={() =>
                    updateStatus(selectedApplication.id, "accepted")
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Accept
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateStatus(selectedApplication.id, "rejected")
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateStatus(selectedApplication.id, "pending")
                  }
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 bg-white rounded-3xl shadow p-8 border">
          <h2 className="text-2xl font-bold text-[#0B2341]">Add Mentor</h2>

          <form onSubmit={handleAddMentor} className="mt-6 grid gap-4">
            <input
              name="name"
              placeholder="Full Name"
              className="border p-3 rounded-xl"
              required
            />
            <input
              name="role"
              placeholder="Role"
              className="border p-3 rounded-xl"
              required
            />
            <textarea
              name="bio"
              placeholder="Short Bio"
              className="border p-3 rounded-xl"
              required
            />
            <input
              name="expertise"
              placeholder="Expertise"
              className="border p-3 rounded-xl"
            />

            <div className="rounded-xl border p-4 bg-[#F8FBFF]">
              <label className="block text-sm font-medium text-[#0B2341] mb-2">
                Mentor Photo
              </label>
              <input
                type="file"
                name="mentor_photo"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="w-full"
              />
            </div>

            <button
              disabled={mentorUploading}
              className="bg-[#0B2341] text-white py-3 rounded-xl font-semibold hover:bg-[#0E5A97] transition disabled:opacity-60"
            >
              {mentorUploading ? "Uploading..." : "Add Mentor"}
            </button>
          </form>

          <div className="mt-8 space-y-3">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="flex items-center justify-between rounded-xl border p-4 bg-[#F8FBFF]"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={mentor.image_url || "/logo.png"}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-semibold">{mentor.name}</p>
                    <p className="text-sm text-gray-600">{mentor.role}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingMentor(mentor)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteMentor(mentor.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {mentors.length === 0 && (
              <p className="text-gray-500">No mentors yet.</p>
            )}
          </div>
        </div>

        {editingMentor && (
          <div className="mt-12 bg-white rounded-3xl shadow p-8 border">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0B2341]">
                Edit Mentor
              </h2>

              <button
                type="button"
                onClick={() => setEditingMentor(null)}
                className="rounded-lg bg-gray-200 px-4 py-2"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleUpdateMentor} className="mt-6 grid gap-4">
              <input
                name="name"
                defaultValue={editingMentor.name}
                className="border p-3 rounded-xl"
                required
              />
              <input
                name="role"
                defaultValue={editingMentor.role}
                className="border p-3 rounded-xl"
                required
              />
              <textarea
                name="bio"
                defaultValue={editingMentor.bio}
                className="border p-3 rounded-xl"
                required
              />
              <input
                name="expertise"
                defaultValue={editingMentor.expertise}
                className="border p-3 rounded-xl"
              />

              {editingMentor.image_url && (
                <img
                  src={editingMentor.image_url}
                  alt={editingMentor.name}
                  className="w-24 h-24 rounded-full object-cover border"
                />
              )}

              <div className="rounded-xl border p-4 bg-[#F8FBFF]">
                <label className="block text-sm font-medium text-[#0B2341] mb-2">
                  Replace Mentor Photo
                </label>
                <input
                  type="file"
                  name="mentor_photo"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="w-full"
                />
              </div>

              <button
                disabled={mentorEditUploading}
                className="bg-green-600 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
              >
                {mentorEditUploading ? "Uploading..." : "Update Mentor"}
              </button>
            </form>
          </div>
        )}

        <div className="mt-12 bg-white rounded-3xl shadow p-8 border">
          <h2 className="text-2xl font-bold text-[#0B2341]">Add University</h2>

          <form onSubmit={handleAddUniversity} className="mt-6 grid gap-4">
            <input
              name="name"
              placeholder="University Name"
              className="border p-3 rounded-xl"
              required
            />
            <input
              name="country"
              placeholder="Country"
              className="border p-3 rounded-xl"
              required
            />
            <input
              name="world_rank"
              placeholder="World Rank"
              className="border p-3 rounded-xl"
            />
            <input
              name="acceptance_rate"
              placeholder="Acceptance Rate"
              className="border p-3 rounded-xl"
            />
            <textarea
              name="requirements"
              placeholder="Requirements"
              className="border p-3 rounded-xl"
            />
            <select name="tier" className="border p-3 rounded-xl">
              <option value="Ivy League">Ivy League</option>
              <option value="Top Global">Top Global</option>
              <option value="Top 100">Top 100</option>
              <option value="Top 300">Top 300</option>
            </select>
            <input
              name="image_url"
              placeholder="/universities/harvard.jpg"
              className="border p-3 rounded-xl"
            />
            <input
              name="website_url"
              placeholder="https://www.harvard.edu"
              className="border p-3 rounded-xl"
            />

            <button
              type="submit"
              className="bg-[#0B2341] text-white py-3 rounded-xl font-semibold hover:bg-[#0E5A97] transition"
            >
              Add University
            </button>
          </form>

          <div className="mt-8 space-y-3">
            {universities.map((uni) => (
              <div
                key={uni.id}
                className="flex items-center justify-between rounded-xl border p-4 bg-[#F8FBFF]"
              >
                <div>
                  <p className="font-semibold">{uni.name}</p>
                  <p className="text-sm text-gray-600">
                    {uni.country} • {uni.tier}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingUniversity(uni)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteUniversity(uni.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {universities.length === 0 && (
              <p className="text-gray-500">No universities yet.</p>
            )}
          </div>
        </div>

        {editingUniversity && (
          <div className="mt-12 bg-white rounded-3xl shadow p-8 border">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0B2341]">
                Edit University
              </h2>

              <button
                type="button"
                onClick={() => setEditingUniversity(null)}
                className="rounded-lg bg-gray-200 px-4 py-2"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleUpdateUniversity} className="mt-6 grid gap-4">
              <input
                name="name"
                defaultValue={editingUniversity.name}
                className="border p-3 rounded-xl"
                required
              />
              <input
                name="country"
                defaultValue={editingUniversity.country}
                className="border p-3 rounded-xl"
                required
              />
              <input
                name="world_rank"
                defaultValue={editingUniversity.world_rank}
                className="border p-3 rounded-xl"
              />
              <input
                name="acceptance_rate"
                defaultValue={editingUniversity.acceptance_rate}
                className="border p-3 rounded-xl"
              />
              <textarea
                name="requirements"
                defaultValue={editingUniversity.requirements}
                className="border p-3 rounded-xl"
              />
              <select
                name="tier"
                defaultValue={editingUniversity.tier}
                className="border p-3 rounded-xl"
              >
                <option value="Ivy League">Ivy League</option>
                <option value="Top Global">Top Global</option>
                <option value="Top 100">Top 100</option>
                <option value="Top 300">Top 300</option>
              </select>
              <input
                name="image_url"
                defaultValue={editingUniversity.image_url}
                className="border p-3 rounded-xl"
              />
              <input
                name="website_url"
                defaultValue={editingUniversity.website_url}
                className="border p-3 rounded-xl"
              />

              <button
                type="submit"
                className="bg-green-600 text-white py-3 rounded-xl font-semibold"
              >
                Update University
              </button>
            </form>
          </div>
        )}

        <div className="mt-12 bg-white rounded-3xl shadow p-8 border">
          <h2 className="text-2xl font-bold text-[#0B2341]">Add Program</h2>

          <form onSubmit={handleAddProgram} className="mt-6 grid gap-4">
            <input
              name="title"
              placeholder="Program Title"
              className="border p-3 rounded-xl"
              required
            />
            <select name="category" className="border p-3 rounded-xl">
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="Fully Funded">Fully Funded</option>
            </select>
            <textarea
              name="short_description"
              placeholder="Short description"
              className="border p-3 rounded-xl"
              required
            />
            <textarea
              name="benefits"
              placeholder="Benefits"
              className="border p-3 rounded-xl"
              required
            />
            <input
              name="cta_text"
              placeholder="Button text"
              className="border p-3 rounded-xl"
              required
            />

            <button
              type="submit"
              className="bg-[#0B2341] text-white py-3 rounded-xl font-semibold hover:bg-[#0E5A97] transition"
            >
              Add Program
            </button>
          </form>

          <div className="mt-8 space-y-3">
            {programs.map((program) => (
              <div
                key={program.id}
                className="flex items-center justify-between rounded-xl border p-4 bg-[#F8FBFF]"
              >
                <div>
                  <p className="font-semibold">{program.title}</p>
                  <p className="text-sm text-gray-600">{program.category}</p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteProgram(program.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}

            {programs.length === 0 && (
              <p className="text-gray-500">No programs yet.</p>
            )}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-3xl shadow p-8 border">
          <h2 className="text-2xl font-bold text-[#0B2341]">Add Event</h2>

          <form onSubmit={handleAddEvent} className="mt-6 grid gap-4">
            <input
              name="title"
              placeholder="Event Title"
              className="border p-3 rounded-xl"
              required
            />
            <input
              name="date"
              placeholder="Date"
              className="border p-3 rounded-xl"
            />
            <input
              name="location"
              placeholder="Location"
              className="border p-3 rounded-xl"
            />
            <textarea
              name="description"
              placeholder="Description"
              className="border p-3 rounded-xl"
            />
            <input
              name="image_url"
              placeholder="/events/event1.jpg"
              className="border p-3 rounded-xl"
            />

            <button
              type="submit"
              className="bg-[#0B2341] text-white py-3 rounded-xl font-semibold hover:bg-[#0E5A97] transition"
            >
              Add Event
            </button>
          </form>

          <div className="mt-8 space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-xl border p-4 bg-[#F8FBFF]"
              >
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-gray-600">
                    {event.date} • {event.location}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteEvent(event.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}

            {events.length === 0 && (
              <p className="text-gray-500">No events yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}