"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B2341]/95 backdrop-blur-md text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 py-4">
        <a href="/" className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="UniPath Logo"
            className="w-12 md:w-16 h-auto drop-shadow-md"
          />
          <div>
            <p className="text-xl md:text-3xl font-extrabold tracking-tight leading-none">
              UniPath
            </p>
            <p className="text-[10px] md:text-xs tracking-[0.35em] text-[#F5B321] mt-1">
              UZBEKISTAN
            </p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-7 text-[15px] font-medium">
          <a href="/" className="hover:text-[#F5B321] transition">
            Home
          </a>
          <a href="/about" className="hover:text-[#F5B321] transition">
            About
          </a>
          <a href="/programs" className="hover:text-[#F5B321] transition">
            Programs
          </a>
          <a href="/mentors" className="hover:text-[#F5B321] transition">
            Mentors
          </a>
          <a href="/universities" className="hover:text-[#F5B321] transition">
            Universities
          </a>
          <a href="/apply" className="hover:text-[#F5B321] transition">
            Apply
          </a>
          <a href="/contact" className="hover:text-[#F5B321] transition">
            Contact
          </a>

          {!user ? (
            <>
              <a href="/login" className="hover:text-[#84C341] transition">
                Login
              </a>
              <a
                href="/signup"
                className="rounded-full bg-[#4FAF3D] px-5 py-2.5 text-white font-semibold hover:bg-[#3d922f] transition shadow-md"
              >
                Sign Up
              </a>
            </>
          ) : (
            <>
              <a href="/dashboard" className="hover:text-[#84C341] transition">
                Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-500 px-5 py-2.5 text-white font-semibold hover:bg-red-600 transition shadow-md"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0B2341] border-t border-white/10 px-6 py-4 space-y-4">
          <a href="/" className="block" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="/about" className="block" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="/programs" className="block" onClick={() => setMenuOpen(false)}>
            Programs
          </a>
          <a href="/mentors" className="block" onClick={() => setMenuOpen(false)}>
            Mentors
          </a>
          <a href="/universities" className="block" onClick={() => setMenuOpen(false)}>
            Universities
          </a>
          <a href="/apply" className="block" onClick={() => setMenuOpen(false)}>
            Apply
          </a>
          <a href="/contact" className="block" onClick={() => setMenuOpen(false)}>
            Contact
          </a>

          {!user ? (
            <>
              <a href="/login" className="block" onClick={() => setMenuOpen(false)}>
                Login
              </a>
              <a
                href="/signup"
                className="block rounded-full bg-[#4FAF3D] px-5 py-2.5 text-center font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </a>
            </>
          ) : (
            <>
              <a
                href="/dashboard"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </a>
              <button
                onClick={async () => {
                  setMenuOpen(false);
                  await handleLogout();
                }}
                className="block w-full rounded-full bg-red-500 px-5 py-2.5 text-center font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}