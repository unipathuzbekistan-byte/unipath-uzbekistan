"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "unipathuzbekistan@gmail.com";

type ApplicationStatus = "pending" | "accepted" | "rejected";

type Application = {
  id: string;
  user_id?: string;
  full_name: string;
  email: string;
  phone?: string | null;
  telegram?: string | null;
  program_type: string;
  target_country?: string | null;
  dream_university?: string | null;
  scholarship?: string | null;
  goal: string;
  status: ApplicationStatus;
  created_at?: string;
};

type Mentor = {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise?: string | null;
  image_url?: string | null;
  created_at?: string;
};

type University = {
  id: string;
  name: string;
  country: string;
  world_rank?: string | null;
  acceptance_rate?: string | null;
  requirements?: string | null;
  tier: string;
  image_url?: string | null;
  website_url?: string | null;
  created_at?: string;
};

type Program = {
  id: string;
  title: string;
  category: string;
  short_description: string;
  benefits: string;
  cta_text: string;
  created_at?: string;
};

type EventItem = {
  id: string;
  title: string;
  date?: string | null;
  location?: string | null;
  description?: string | null;
  image_url?: string | null;
  created_at?: string;
};

export default function AdminDashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);

  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const checkAdminAndLoad = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) throw error;

        if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
          window.location.href = "/admin/login";
          return;
        }

        await fetchAllData();
      } catch (error) {
        console.error("Admin auth check failed:", error);
        window.location.href = "/admin/login";
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndLoad();
  }, []);

  const fetchAllData = async () => {
    try {
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
      console.error("Error fetching admin data:", error);
      alert(error?.message || "Failed to load admin dashboard.");
    }
  };

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    try {
      setActionLoading(true);

      const { error } = await supabase
        .from("applications")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      await fetchAllData();
    } catch (error: any) {
      alert("Error updating application: " + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = "/admin/login";
    } catch (error: any) {
      alert("Error logging out: " + error.message);
    }
  };

  const handleAddMentor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setActionLoading(true);

      const form = e.currentTarget;
      const formData = new FormData(form);

      const payload = {
        name: String(formData.get("name") || "").trim(),
        role: String(formData.get("role") || "").trim(),
        bio: String(formData.get("bio") || "").trim(),
        expertise: String(formData.get("expertise") || "").trim(),
        image_url: String(formData.get("image_url") || "").trim(),
      };

      const { error } = await supabase.from("mentors").insert([payload]);
      if (error) throw error;

      alert("Mentor added!");
      form.reset();
      await fetchAllData();
    } catch (error: any) {
      alert("Error adding mentor: " + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateMentor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingMentor) return;

    try {
      setActionLoading(true);

      const form = e.currentTarget;
      const formData = new FormData(form);

      const payload = {
        name: String(formData.get("name") || "").trim(),
        role: String(formData.get("role") || "").trim(),
        bio: String(formData.get("bio") || "").trim(),
        expertise: String(formData.get("expertise") || "").trim(),
        image_url: String(formData.get("image_url") || "").trim(),
      };

      const { error } = await supabase
        .from("mentors")
        .update(payload)
        .eq("id", editingMentor.id);

      if (error) throw error;

      alert("Mentor updated!");
      setEditingMentor(null);
      await fetchAllData();
    } catch (error: any) {
      alert("Error updating mentor: " + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddUniversity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setActionLoading(true);

      const form = e.currentTarget;
      const formData = new FormData(form);

      const payload = {
        name: String(formData.get("name") || "").trim(),
        country: String(formData.get("country") || "").trim(),
        world_rank: String(formData.get("world_rank") || "").trim(),
        acceptance_rate: String(formData.get("acceptance_rate") || "").trim(),
        requirements: String(formData.get("requirements") || "").trim(),
        tier: String(formData.get("tier") || "").trim(),
        image_url: String(formData.get("image_url") || "").trim(),
        website_url: String(formData.get("website_url") || "").trim(),
      };

      const { error } = await supabase.from("universities").insert([payload]);
      if (error) throw error;

      alert("University added!");
      form.reset();
      await fetchAllData();
    } catch (error: any) {
      alert("Error adding university: " + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateUniversity = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!editingUniversity) return;

    try {
      setActionLoading(true);

      const form = e.currentTarget;
      const formData = new FormData(form);

      const payload = {
        name: String(formData.get("name") || "").trim(),
        country: String(formData.get("country") || "").trim(),
        world_rank: String(formData.get("world_rank") || "").trim(),
        acceptance_rate: String(formData.get("acceptance_rate") || "").trim(),
        requirements: String(formData.get("requirements") || "").trim(),
        tier: String(formData.get("tier") || "").trim(),
        image_url: String(formData.get("image_url") || "").trim(),
        website_url: String(formData.get("website_url") || "").trim(),
      };

      const { error } = await supabase
        .from("universities")
        .update(payload)
        .eq("id", editingUniversity.id);

      if (error) throw error;

      alert("University updated!");
      setEditingUniversity(null);
      await fetchAllData();
    } catch (error: any) {
      alert("Error updating university: " + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddProgram = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setActionLoading(true);

      const form = e.currentTarget;
      const formData = new FormData(form);

      const payload = {
        title: String(formData.get("title") || "").trim(),
        category: String(formData.get("category") || "").trim(),
        short_description: String(formData.get("short_description") || "").trim(),
        benefits: String(formData.get("benefits") || "").trim(),
        cta_text: String(formData.get("cta_text") || "").trim(),
      };

      const { error } = await supabase.from("programs").insert([payload]);
      if (error) throw error;

      alert("Program added!");
      form.reset();
      await fetchAllData();
    } catch (error: any) {
      alert("Error adding program: " + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setActionLoading(true);

      const form = e.currentTarget;
      const formData = new FormData(form);

      const payload = {
        title: String(formData.get("title") || "").trim(),
        date: String(formData.get("date") || "").trim(),
        location: String(formData.get("location") || "").trim(),
        description: String(formData.get("description") || "").trim(),
        image_url: String(formData.get("image_url") || "").trim(),
      };

      const { error } = await supabase.from("events").insert([payload]);
      if (error) throw error;

      alert("Event added!");
      form.reset();
      await fetchAllData();
    } catch (error: any) {
      alert("Error adding event: " + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteMentor = async (id: string) => {
    const ok = confirm("Delete this mentor?");
    if (!ok) return;

    try {
      setActionLoading(true);

      const { error } = await supabase.from("mentors").delete().eq("id", id);
      if (error) throw error;

      if (editingMentor?.id === id) setEditingMentor(null);

      await fetchAllData();
    } catch (error: any) {
      alert("Error deleting mentor: " + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteUniversity = async (id: string) => {
    const ok = confirm("Delete this university?");
    if (!ok) return;

    try {
      setActionLoading(true);

      const { error } = await supabase
        .from("universities")
        .delete()
        .eq("id", id);

      if (error) throw error;

      if (editingUniversity?.id === id) setEditingUniversity(null);

      await fetchAllData();
    } catch (error: any) {
      alert("Error deleting university: " + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteProgram = async (id: string) => {
    const ok = confirm("Delete this program?");
    if (!ok) return;

    try {
      setActionLoading(true);

      const { error } = await supabase.from("programs").delete().eq("id", id);
      if (error) throw error;

      await fetchAllData();
    } catch (error: any) {
      alert("Error deleting program: " + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    const ok = confirm("Delete this event?");
    if (!ok) return;

    try {
      setActionLoading(true);

      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;

      await fetchAllData();
    } catch (error: any) {
      alert("Error deleting event: " + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const getTelegramLink = (telegram?: string | null) => {
    if (!telegram) return "#";
    const clean = telegram.replace("@", "").replace(/\s+/g, "").trim();
    return clean ? `https://t.me/${clean}` : "#";
  };

  const getStatusBadgeClass = (status: ApplicationStatus) => {
    if (status === "accepted")
      return "bg-green-100 text-green-700 border-green-200";
    if (status === "rejected")
      return "bg-red-100 text-red-700 border-red-200";
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8FBFF]">
        <p className="text-lg font-medium text-[#0B2341]">
          Loading admin panel...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#0B2341]">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage applications, mentors, universities, programs, and events.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full bg-red-500 px-5 py-2.5 text-white font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {actionLoading && (
          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            Processing request...
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-4">
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
        </div>

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
            <input
              name="image_url"
              placeholder="/mentors/mentor1.jpg"
              className="border p-3 rounded-xl"
            />
            <button
              type="submit"
              className="bg-[#0B2341] text-white py-3 rounded-xl font-semibold hover:bg-[#0E5A97] transition"
            >
              Add Mentor
            </button>
          </form>

          <div className="mt-8 space-y-3">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="flex items-center justify-between rounded-xl border p-4 bg-[#F8FBFF]"
              >
                <div>
                  <p className="font-semibold">{mentor.name}</p>
                  <p className="text-sm text-gray-600">{mentor.role}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingMentor(mentor)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteMentor(mentor.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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
                className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300 transition"
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
                defaultValue={editingMentor.expertise || ""}
                className="border p-3 rounded-xl"
              />
              <input
                name="image_url"
                defaultValue={editingMentor.image_url || ""}
                className="border p-3 rounded-xl"
              />

              <button
                type="submit"
                className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Update Mentor
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteUniversity(uni.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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
                className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleUpdateUniversity} className="mt-6 grid gap-4">
              <input
                name="name"
                defaultValue={editingUniversity.name}
                placeholder="University Name"
                className="border p-3 rounded-xl"
                required
              />
              <input
                name="country"
                defaultValue={editingUniversity.country}
                placeholder="Country"
                className="border p-3 rounded-xl"
                required
              />
              <input
                name="world_rank"
                defaultValue={editingUniversity.world_rank || ""}
                placeholder="World Rank"
                className="border p-3 rounded-xl"
              />
              <input
                name="acceptance_rate"
                defaultValue={editingUniversity.acceptance_rate || ""}
                placeholder="Acceptance Rate"
                className="border p-3 rounded-xl"
              />
              <textarea
                name="requirements"
                defaultValue={editingUniversity.requirements || ""}
                placeholder="Requirements"
                className="border p-3 rounded-xl"
              />
              <select
                name="tier"
                defaultValue={editingUniversity.tier || "Top Global"}
                className="border p-3 rounded-xl"
              >
                <option value="Ivy League">Ivy League</option>
                <option value="Top Global">Top Global</option>
                <option value="Top 100">Top 100</option>
                <option value="Top 300">Top 300</option>
              </select>
              <input
                name="image_url"
                defaultValue={editingUniversity.image_url || ""}
                placeholder="/universities/harvard.jpg"
                className="border p-3 rounded-xl"
              />
              <input
                name="website_url"
                defaultValue={editingUniversity.website_url || ""}
                placeholder="https://www.harvard.edu"
                className="border p-3 rounded-xl"
              />

              <button
                type="submit"
                className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
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
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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
                    {event.date || "No date"} • {event.location || "No location"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteEvent(event.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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

        <div className="mt-12 bg-white rounded-3xl shadow p-8 border">
          <h2 className="text-2xl font-bold text-[#0B2341]">
            Applications List
          </h2>

          {applications.length === 0 ? (
            <p className="mt-6 text-gray-500">No applications yet.</p>
          ) : (
            <div className="mt-6 space-y-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-2xl border border-gray-200 p-6 bg-[#F8FBFF]"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-semibold text-[#0B2341]">
                        {app.full_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-[#0B2341] break-all">
                        {app.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-[#0B2341]">
                        {app.phone || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telegram</p>
                      <p className="font-semibold text-[#0B2341]">
                        {app.telegram || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Program</p>
                      <p className="font-semibold text-[#0B2341] capitalize">
                        {app.program_type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Scholarship</p>
                      <p className="font-semibold text-[#0B2341]">
                        {app.scholarship || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Target Country</p>
                      <p className="font-semibold text-[#0B2341]">
                        {app.target_country || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dream University</p>
                      <p className="font-semibold text-[#0B2341]">
                        {app.dream_university || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Goal / Motivation</p>
                    <p className="mt-1 whitespace-pre-wrap text-[#0B2341]">
                      {app.goal}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full border px-4 py-2 text-sm font-semibold ${getStatusBadgeClass(
                        app.status
                      )}`}
                    >
                      Status: {app.status}
                    </span>

                    {app.telegram && getTelegramLink(app.telegram) !== "#" && (
                      <a
                        href={getTelegramLink(app.telegram)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-[#229ED9] text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
                      >
                        Open Telegram
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => updateStatus(app.id, "accepted")}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Accept
                    </button>

                    <button
                      type="button"
                      onClick={() => updateStatus(app.id, "rejected")}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Reject
                    </button>

                    <button
                      type="button"
                      onClick={() => updateStatus(app.id, "pending")}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}