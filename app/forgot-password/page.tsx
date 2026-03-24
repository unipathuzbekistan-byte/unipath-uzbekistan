export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EAF4FF] via-white to-[#F4FBEF] px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#0E5A97]">
            Account Recovery
          </p>

          <h1 className="mt-4 text-5xl font-extrabold leading-tight text-[#0B2341]">
            Reset your password securely
          </h1>

          <p className="mt-6 text-lg text-gray-700 max-w-xl">
            Enter your email address and we will send you a recovery link or
            one-time code to restore access to your UniPath account.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-white border border-[#DCEAF7] p-5 shadow-sm">
              <h3 className="text-xl font-semibold text-[#0E5A97]">
                Secure Recovery
              </h3>
              <p className="mt-2 text-gray-600">
                Password reset is handled through verified email access.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-[#E3F3D8] p-5 shadow-sm">
              <h3 className="text-xl font-semibold text-[#4FAF3D]">
                Fast Access
              </h3>
              <p className="mt-2 text-gray-600">
                Return to your dashboard and continue your progress quickly.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <h2 className="text-3xl font-bold text-[#0B2341]">
            Forgot Password
          </h2>
          <p className="mt-2 text-gray-600">
            Enter your email to continue.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#0E5A97]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#0B2341] text-white py-3 font-semibold hover:bg-[#0E5A97] transition"
            >
              Send Recovery Link
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Remembered your password?{" "}
            <a href="/login" className="text-[#4FAF3D] font-semibold">
              Back to login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}