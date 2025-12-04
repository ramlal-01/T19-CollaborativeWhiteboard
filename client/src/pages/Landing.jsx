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

     {/* Hero Section */}
<main className="relative z-10 pt-32 pb-20 px-6">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

    {/* Left Content */}
    <div>
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-200 bg-cyan-50 text-cyan-700 text-xs font-mono mb-8">
        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
        v2.0 LIVE: WEBSOCKET PROTOCOL OPTIMIZED
      </div>

      {/* Heading */}
      <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-slate-900">
        Real-time collaboration, <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 animate-gradient">
          at the speed of thought.
        </span>
      </h1>

      {/* Subheading */}
      <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
        The high-performance whiteboard for engineering teams. Sub-30ms latency,
        infinite canvas, and end-to-end encryption. Built for the modern web.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="group bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-8 py-4 flex items-center gap-2 transition-all shadow-xl hover:shadow-slate-900/20 hover:-translate-y-1">
          <span className="font-bold">Start Whiteboarding</span>
        </button>

        <button className="px-8 py-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors font-semibold flex items-center gap-2 bg-white/50 backdrop-blur-sm">
          View Source
        </button>
      </div>
    </div>

    {/* Right Simulation Block */}
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>

      <div className="relative bg-white/60 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-2xl overflow-hidden aspect-square flex flex-col">
        
        {/* Mock Window Header */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>

          <div className="flex -space-x-2">
            {["U1", "U2", "U3"].map((u) => (
              <div key={u} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs text-slate-600 font-bold">
                {u}
              </div>
            ))}
          </div>
        </div>

        {/* Canvas Simulation */}
        <div className="flex-1 relative bg-slate-50/50 rounded-lg border border-slate-100 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-70"></div>
        </div>
      </div>
    </div>

  </div>
</main>


    </div>
  );
}
