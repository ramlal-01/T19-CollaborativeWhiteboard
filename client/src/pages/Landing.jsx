import React, { useState } from "react";
import { Zap, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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

            <button 
              onClick={() => navigate('/login')}
              className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-800">
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
            <button 
              onClick={() => navigate('/login')}
              className="bg-cyan-500 text-white py-3 rounded-lg font-bold">
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
        <button 
          onClick={() => navigate('/login')}
          className="group bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-8 py-4 flex items-center gap-2 transition-all shadow-xl hover:shadow-slate-900/20 hover:-translate-y-1">
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


{/* Bento Grid Features */}
<section className="py-24 px-6 relative z-10 bg-white" id="product">
  <div className="max-w-7xl mx-auto">

    {/* Title */}
    <h2 className="text-4xl font-bold mb-16 text-center text-slate-900">
      Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">velocity</span>.
    </h2>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

      {/* Card 1 - Realtime WebSocket */}
      <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:shadow-cyan-500/5 transition-all group relative overflow-hidden">
        
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity text-slate-900">
          <Zap size={120} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end">
          <h3 className="text-3xl font-bold mb-2 text-slate-900">Real-time WebSocket Sync</h3>
          <p className="text-slate-600">
            Updates propagate across all connected clients in under 30ms. No refreshing, no waiting.
          </p>
        </div>
      </div>

      {/* Card 2 - Infinite Canvas */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:shadow-purple-500/5 transition-all flex flex-col justify-between group">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
          <svg width="24" height="24" strokeWidth="2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-slate-900">Infinite Canvas</h3>
          <p className="text-slate-600 text-sm">
            Pan, zoom, and expand without limits. Crisp vector rendering at any scale.
          </p>
        </div>
      </div>

      {/* Card 3 - Role Based Security */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between group">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
          <svg width="24" height="24" strokeWidth="2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 17v.01"/>
            <path d="M10 7h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2 text-slate-900">Role-Based Access</h3>
          <p className="text-slate-600 text-sm">
            Controls for Admins, Editors, Texters, and Viewers. Secure token system.
          </p>
        </div>
      </div>

      {/* Card 4 - Stack Architecture */}
      <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-3xl p-8 flex items-center relative overflow-hidden text-white">
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 w-full">
          <h3 className="text-2xl font-bold mb-6">The Stack</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "React 18",
              "Node.js",
              "Redis",
              "PostgreSQL"
            ].map((tech) => (
              <div
                key={tech}
                className="flex flex-col items-center gap-3 p-4 bg-white/10 rounded-xl border border-white/5 hover:border-cyan-400/50 transition-colors backdrop-blur-sm">
                <span className="font-mono text-sm text-slate-200">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


    </div>
  );
}
