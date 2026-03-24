export default function Footer() {
  return (
    <footer className="bg-[#071a31] text-white px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="UniPath Logo" className="w-14 h-auto" />
            <div>
              <h2 className="text-2xl font-bold">UniPath</h2>
              <p className="text-xs tracking-[0.3em] text-[#F5B321]">
                UZBEKISTAN
              </p>
            </div>
          </div>

          <p className="mt-4 text-gray-300 leading-7 max-w-sm">
            Helping ambitious students prepare for top universities and global
            opportunities through guidance, mentorship, and strategy.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#F5B321]">Quick Links</h3>
          <div className="mt-4 space-y-2 text-gray-300">
            <p><a href="/">Home</a></p>
            <p><a href="/about">About</a></p>
            <p><a href="/programs">Programs</a></p>
            <p><a href="/contact">Contact</a></p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#F5B321]">Contact</h3>
          <div className="mt-4 space-y-2 text-gray-300">
            <p>unipathuzbekistan@gmail.com</p>
            <p>Uzbekistan</p>
            <p>Support for students worldwide</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-400">
        © 2026 UniPath Uzbekistan. All rights reserved.
      </div>
    </footer>
  );
}