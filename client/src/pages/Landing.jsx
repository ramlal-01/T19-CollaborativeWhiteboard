import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Globe, 
  Cpu, 
  Layout, 
  Users, 
  Lock, 
  ArrowRight, 
  Github, 
  Twitter, 
  Menu, 
  X,
  Play,
  Code2,
  Database,
  Cloud,
  Mail,
  User,
  ArrowLeft,
  Chrome,
  PenTool,
  Save,
  MessageSquare
} from 'lucide-react';

// Sliding Auth Component
const AuthPage = ({ onBack }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-200/40 rounded-full blur-[100px] mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/40 rounded-full blur-[100px] mix-blend-multiply"></div>

      <button 
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-cyan-600 font-semibold z-10 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md"
      >
        <ArrowLeft size={18} /> Back to Home
      </button>

      {/* Main Container */}
      <div className="bg-white rounded-[20px] shadow-2xl shadow-slate-200/50 relative overflow-hidden w-full max-w-[900px] min-h-[600px] border border-slate-100">
        
        {/* Sign Up Form Container */}
        <div className={`absolute top-0 h-full w-1/2 left-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center p-12 bg-white ${isSignUp ? 'translate-x-[100%] opacity-100 z-50' : 'opacity-0 z-10'}`}>
          <form className="w-full flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Join the Session</h1>
            
            <div className="flex gap-4 mb-6">
              <button className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-cyan-200 hover:text-cyan-600 transition-all shadow-sm">
                <Chrome size={20} />
              </button>
              <button className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-cyan-200 hover:text-cyan-600 transition-all shadow-sm">
                <Github size={20} />
              </button>
            </div>
            
            <span className="text-xs font-medium text-slate-400 mb-6 uppercase tracking-wider">or create new account</span>
            
            <div className="w-full space-y-4 mb-8">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm text-slate-700 placeholder-slate-400" 
                />
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm text-slate-700 placeholder-slate-400" 
                />
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                </div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm text-slate-700 placeholder-slate-400" 
                />
              </div>
            </div>

            <button className="bg-cyan-500 text-white px-12 py-3.5 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form Container */}
        <div className={`absolute top-0 h-full w-1/2 left-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center p-12 bg-white z-20 ${isSignUp ? 'translate-x-[100%]' : ''}`}>
          <form className="w-full flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Welcome Back</h1>
            
            <div className="flex gap-4 mb-6">
              <button className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-cyan-200 hover:text-cyan-600 transition-all shadow-sm">
                <Chrome size={20} />
              </button>
              <button className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-cyan-200 hover:text-cyan-600 transition-all shadow-sm">
                <Github size={20} />
              </button>
            </div>
            
            <span className="text-xs font-medium text-slate-400 mb-6 uppercase tracking-wider">or sign in with email</span>
            
            <div className="w-full space-y-4 mb-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm text-slate-700 placeholder-slate-400" 
                />
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                </div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm text-slate-700 placeholder-slate-400" 
                />
              </div>
            </div>

            <a href="#" className="text-xs font-semibold text-slate-500 mb-8 hover:text-cyan-600 hover:underline transition-colors">Forgot your password?</a>

            <button className="bg-cyan-500 text-white px-12 py-3.5 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-100 ${isSignUp ? '-translate-x-full' : ''}`}>
          <div className={`bg-gradient-to-br from-cyan-500 to-blue-600 text-white relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}>
            
            {/* Background Pattern on Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            
            {/* Overlay Left Panel (For Sign In) */}
            <div className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 transform transition-transform duration-700 ease-in-out px-12 text-center ${isSignUp ? 'translate-x-0' : '-translate-x-[20%]'}`}>
              <h1 className="text-4xl font-bold mb-6 tracking-tight">FluxBoard</h1>
              <p className="mb-8 text-cyan-50 text-lg leading-relaxed">Collaborate with your team in real-time. Log in to access your saved whiteboards.</p>
              <button 
                onClick={() => setIsSignUp(false)}
                className="bg-transparent border-2 border-white text-white px-12 py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-cyan-600 transition-all hover:shadow-lg"
              >
                Sign In
              </button>
            </div>

            {/* Overlay Right Panel (For Sign Up) */}
            <div className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 transform transition-transform duration-700 ease-in-out px-12 text-center ${isSignUp ? 'translate-x-[20%]' : 'translate-x-0'}`}>
              <h1 className="text-4xl font-bold mb-6 tracking-tight">New Here?</h1>
              <p className="mb-8 text-cyan-50 text-lg leading-relaxed">Start brainstorming today. Join 1,000+ teams using FluxBoard for remote work.</p>
              <button 
                onClick={() => setIsSignUp(true)}
                className="bg-transparent border-2 border-white text-white px-12 py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-cyan-600 transition-all hover:shadow-lg"
              >
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (showAuth) {
    return <AuthPage onBack={() => setShowAuth(false)} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-200 selection:text-cyan-900 overflow-x-hidden">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-0 opacity-60 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-100 rounded-full blur-[120px] mix-blend-multiply animate-pulse duration-[5000ms]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-100 rounded-full blur-[120px] mix-blend-multiply animate-pulse duration-[7000ms]"></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-purple-100 rounded-full blur-[100px] mix-blend-multiply"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap size={20} className="text-white fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Flux<span className="text-cyan-500">Board</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Architecture', 'Security', 'Enterprise'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors">
                {item}
              </a>
            ))}
            <button 
              onClick={() => setShowAuth(true)}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Log In
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5">
             {['Features', 'Architecture', 'Security'].map((item) => (
              <a key={item} href="#" className="text-slate-600 hover:text-cyan-600 block py-2 font-medium">{item}</a>
            ))}
            <button onClick={() => setShowAuth(true)} className="w-full bg-cyan-500 text-white py-3 rounded-lg font-bold">Log In</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-100 bg-cyan-50 text-cyan-700 text-xs font-mono mb-8 font-semibold">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
              HACKATHON 2024: REAL-TIME COLLABORATION
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-slate-900">
              Brainstorm, Draw, & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 animate-gradient">
                Annotate Together.
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
              The ultimate collaborative whiteboard for remote teams and online education. Features real-time drawing, sticky notes, chat, and session management with &lt; 2s latency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowAuth(true)}
                className="group bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8 py-4 flex items-center gap-2 transition-all shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-1"
              >
                <span className="font-bold">Start Whiteboarding</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors font-semibold flex items-center gap-2 bg-white/50 backdrop-blur-sm">
                <Github size={20} /> View Source
              </button>
            </div>
          </div>

          {/* Abstract Interactive Visual */}
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
             <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 ring-1 ring-slate-200/50 rounded-2xl p-6 shadow-2xl shadow-slate-200/50 overflow-hidden aspect-square md:aspect-video lg:aspect-square flex flex-col">
                {/* Header of Mock App */}
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs text-indigo-700 font-bold shadow-sm" title="Admin">AD</div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-pink-100 flex items-center justify-center text-xs text-pink-700 font-bold shadow-sm" title="Editor">ED</div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-xs text-emerald-700 font-bold shadow-sm" title="Viewer">VI</div>
                   </div>
                </div>

                {/* Canvas Simulation */}
                <div className="flex-1 relative bg-slate-50/50 rounded-xl border border-slate-100 overflow-hidden shadow-inner">
                   {/* Grid Background */}
                   <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-70"></div>

                   {/* Sticky Note */}
                   <div className="absolute top-10 left-10 p-4 bg-yellow-100/90 rounded-sm border border-yellow-200 shadow-md max-w-[200px] transform -rotate-2">
                      <div className="font-handwriting text-yellow-800 text-xs font-semibold">
                         Brainstorming Ideas:<br/>
                         - Virtual Classrooms<br/>
                         - Remote Design
                      </div>
                   </div>

                   {/* Chat Bubble Simulation */}
                   <div className="absolute bottom-20 right-20 p-3 bg-white rounded-lg rounded-br-none border border-slate-200 shadow-md max-w-[180px]">
                      <div className="flex items-center gap-2 mb-1">
                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
                         <span className="text-[10px] font-bold text-slate-500">Live Chat</span>
                      </div>
                      <div className="text-xs text-slate-700">Looks great! Can we export this as PDF?</div>
                   </div>
                   
                   {/* Animated Paths */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <path d="M 120 100 C 150 150, 300 200, 350 300" stroke="url(#grad1)" strokeWidth="3" fill="none" strokeDasharray="6 4" className="animate-[dash_20s_linear_infinite]" />
                      <defs>
                         <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                         </linearGradient>
                      </defs>
                   </svg>
                </div>
                
                {/* Code overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 p-4 font-mono text-xs">
                   <div className="text-emerald-400">$ system status: operational</div>
                   <div className="text-blue-400">$ latency: 18ms (WebSocket)</div>
                   <div className="flex items-center gap-2 mt-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-slate-400">SESSION SYNCED</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Bento Grid Features - Aligned to Problem Statement */}
      <section className="py-24 px-6 relative z-10 bg-white" id="features">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center text-slate-900">Feature <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Rich Platform</span>.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
               {/* Card 1: Latency */}
               <div className="md:col-span-2 row-span-1 bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:shadow-cyan-500/5 transition-all group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-slate-900">
                     <Zap size={120} />
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-end">
                     <h3 className="text-3xl font-bold mb-2 text-slate-900">Low-Latency Updates (&lt; 2s)</h3>
                     <p className="text-slate-600">Powered by WebSocket technology. Updates propagate instantly across all connected users for seamless collaboration.</p>
                  </div>
               </div>

               {/* Card 2: Toolkit */}
               <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:shadow-purple-500/5 transition-all flex flex-col justify-between group">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                     <PenTool />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold mb-2 text-slate-900">Complete Toolkit</h3>
                     <p className="text-slate-600 text-sm">Pen, eraser, shapes, text boxes, and sticky notes. Everything you need to visualize ideas.</p>
                  </div>
               </div>

               {/* Card 3: Session Management */}
               <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between group">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                     <Users />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold mb-2 text-slate-900">Roles & Security</h3>
                     <p className="text-slate-600 text-sm">Manage Admins, Editors, and Viewers. Secure authentication and encrypted session data.</p>
                  </div>
               </div>

               {/* Card 4: Export & Chat */}
               <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-3xl p-8 flex items-center relative overflow-hidden text-white">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                  <div className="relative z-10 w-full">
                     <h3 className="text-2xl font-bold mb-6">Built for Teams</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                           { name: "Live Chat", icon: <MessageSquare /> },
                           { name: "Export PDF", icon: <Save /> },
                           { name: "Redis", icon: <Database /> },
                           { name: "Node.js", icon: <Cpu /> }
                        ].map((tech) => (
                           <div key={tech.name} className="flex flex-col items-center gap-3 p-4 bg-white/10 rounded-xl border border-white/5 hover:border-cyan-400/50 transition-colors backdrop-blur-sm">
                              <div className="text-cyan-400">{tech.icon}</div>
                              <span className="font-mono text-sm text-slate-200">{tech.name}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Feature Slider / Technical Deep Dive */}
      <section className="py-24 bg-slate-50 border-y border-slate-200" id="architecture">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
               <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-slate-900">Technical Documentation</h2>
                  <div className="space-y-4">
                     {[
                        { title: "State Management", desc: "Conflict-free replicated data types (CRDTs) ensure eventual consistency across all users." },
                        { title: "Binary Serialization", desc: "Data is serialized using Protocol Buffers for minimal payload size over the wire." },
                        { title: "Scalable Infrastructure", desc: "Horizontally scalable Node.js clusters managed via PM2 and Nginx load balancing." }
                     ].map((item, idx) => (
                        <div 
                           key={idx}
                           className={`p-6 rounded-xl border cursor-pointer transition-all ${
                              activeFeature === idx 
                              ? 'bg-white border-cyan-500 shadow-lg shadow-cyan-500/10 scale-[1.02]' 
                              : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200 hover:shadow-sm'
                           }`}
                           onClick={() => setActiveFeature(idx)}
                        >
                           <h4 className="text-xl font-bold mb-2 flex items-center gap-3 text-slate-900">
                              <span className={`text-sm font-mono px-2 py-1 rounded ${activeFeature === idx ? 'bg-cyan-50 text-cyan-600' : 'bg-slate-200 text-slate-500'}`}>0{idx + 1}</span>
                              {item.title}
                           </h4>
                           <p className="text-slate-600 pl-12">{item.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
               
               {/* Dynamic Code Block Display */}
               <div className="bg-[#0D1117] rounded-xl border border-slate-900/10 p-6 font-mono text-sm shadow-2xl relative overflow-hidden ring-1 ring-black/5">
                  <div className="flex gap-2 mb-4">
                     <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  
                  <div className="text-slate-300 overflow-x-auto">
                     {activeFeature === 0 && (
                        <pre>
{`// CRDT Implementation (Simplified)
class WhiteboardState {
  constructor() {
    this.operations = new Map();
    this.vectorClock = new VectorClock();
  }

  apply(op) {
    if (this.hasSeen(op.id)) return;
    
    this.operations.set(op.id, op);
    this.vectorClock.increment(op.clientId);
    
    // Broadcast to connected peers via WebSocket
    socket.emit('sync_op', op);
    
    this.render();
  }
}`}
                        </pre>
                     )}
                     {activeFeature === 1 && (
                        <pre>
{`// Protobuf Schema Definition
syntax = "proto3";

message DrawOperation {
  string id = 1;
  string user_id = 2;
  
  enum ToolType {
    PEN = 0;
    ERASER = 1;
    RECTANGLE = 2;
  }
  
  ToolType tool = 3;
  repeated Point points = 4;
  string color = 5;
  int32 stroke_width = 6;
}`}
                        </pre>
                     )}
                     {activeFeature === 2 && (
                        <pre>
{`# Docker Compose Infrastructure
version: '3.8'

services:
  app_cluster:
    image: fluxboard-server:latest
    deploy:
      replicas: 4
    environment:
      - REDIS_URL=redis://redis:6379
      - DB_HOST=postgres
      
  redis:
    image: redis:alpine
    command: redis-server --appendonly yes
    
  postgres:
    image: postgres:14
    volumes:
      - db_data:/var/lib/postgresql/data`}
                        </pre>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-white">
         <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-blue-100 blur-[100px] opacity-60 pointer-events-none"></div>
            <h2 className="text-5xl font-bold mb-6 relative z-10 text-slate-900">Ready to deploy?</h2>
            <p className="text-xl text-slate-600 mb-10 relative z-10">
               Join the Hackathon demo server or host it yourself. Open source and ready for scale.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
               <button 
                onClick={() => setShowAuth(true)}
                className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/10"
               >
                  Create Session
               </button>
               <button className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                  Read Documentation
               </button>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
                  <Zap size={14} className="text-white fill-white" />
               </div>
               <span className="font-bold text-slate-900">FluxBoard</span>
            </div>
            
            <div className="flex gap-8 text-sm text-slate-500">
               <a href="#" className="hover:text-cyan-600 transition-colors">Privacy</a>
               <a href="#" className="hover:text-cyan-600 transition-colors">Terms</a>
               <a href="#" className="hover:text-cyan-600 transition-colors">GitHub</a>
               <a href="#" className="hover:text-cyan-600 transition-colors">Discord</a>
            </div>
            
            <div className="text-slate-400 text-sm">
               © 2024 Hackathon Team A. All rights reserved.
            </div>
         </div>
      </footer>
    </div>
  );
}