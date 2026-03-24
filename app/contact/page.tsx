"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    setLoading(true);
    setStatus("");

    try {
      await emailjs.sendForm(
        "service_ihvhs3m",
        "template_3zl5lbd",
        formRef.current,
        {
          publicKey: "e7KapE5k-MqrjUkoj",
        }
      );

      setStatus("Message sent successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF4FF] via-white to-[#F4FBEF] px-6 py-24 md:py-28">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0E5A97]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#4FAF3D]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#0E5A97] font-semibold">
              Contact UniPath
            </p>

            <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-tight text-[#0B2341]">
              Let’s build your path to global success
            </h1>

            <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-700 leading-8">
              Have questions about UniPath, our programs, or the fully funded
              track? Reach out and our team will get back to you.
            </p>

            <div className="mt-10 grid gap-4">
              <div className="rounded-2xl bg-[#F8FBFF] border border-[#DCEAF7] p-5">
                <h3 className="text-lg font-semibold text-[#0E5A97]">
                  Student Guidance
                </h3>
                <p className="mt-2 text-gray-600">
                  Ask about programs, preparation, mentorship, and opportunities.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F7FDF2] border border-[#E3F3D8] p-5">
                <h3 className="text-lg font-semibold text-[#4FAF3D]">
                  Fully Funded Track
                </h3>
                <p className="mt-2 text-gray-600">
                  Learn how the entrance exam and annual selection process work.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFFBEF] border border-[#F8E4AE] p-5">
                <h3 className="text-lg font-semibold text-[#F5B321]">
                  Direct Contact
                </h3>
                <p className="mt-2 text-gray-600">
                  unipathuzbekistan@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white/90 backdrop-blur-md border border-white shadow-2xl p-8 md:p-10">
            <h2 className="text-3xl font-bold text-[#0B2341]">Send a Message</h2>
            <p className="mt-2 text-gray-600">
              Fill out the form and we will respond as soon as possible.
            </p>

            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="mt-8 flex flex-col gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0E5A97]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0E5A97]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 h-36 outline-none focus:border-[#0E5A97]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#0B2341] text-white py-3 font-semibold hover:bg-[#0E5A97] transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {status && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-xl">
                {status}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}