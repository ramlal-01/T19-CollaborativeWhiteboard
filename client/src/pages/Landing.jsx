import React, { useState } from "react";
import { Zap, Menu, X } from "lucide-react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">

      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-violet-200 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-200 rounded-full blur-[120px] mix-blend-multiply"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Flux<span className="text-cyan-600">Board</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Product", "Engine", "Security", "Enterprise"].map((item) => (
              <a key={item} href="#" className="text-sm text-slate-600 hover:text-cyan-600">
                {item}
              </a>
            ))}

            <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-800">
              Launch App
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white p-4 flex flex-col gap-4 shadow-xl">
            {["Product", "Engine", "Security"].map((item) => (
              <a key={item} className="text-slate-600 hover:text-cyan-600 py-2">
                {item}
              </a>
            ))}
            <button className="bg-cyan-500 text-white py-3 rounded-lg font-bold">
              Launch App
            </button>
          </div>
        )}
      </nav>

      {/* Placeholder for other sections */}
      <main className="pt-32 px-6">
        <h1 className="text-center text-4xl font-bold text-slate-900">
          Landing Page Base Ready
        </h1>
        <p className="text-center text-slate-600 mt-3">
          More sections will be added in next commits...
        </p>
      </main>

    </div>
  );
}
