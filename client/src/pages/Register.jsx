import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, User } from 'lucide-react';
import api from '../api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('All fields are required');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/api/auth/register', {
        name,
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Register Error:', error);
      const message =
        error.response?.data?.message || 'Registration failed or server error!';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-200 selection:text-cyan-900 overflow-x-hidden relative">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-0 opacity-60 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-100 rounded-full blur-[120px] mix-blend-multiply animate-pulse duration-[5000ms]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-100 rounded-full blur-[120px] mix-blend-multiply animate-pulse duration-[7000ms]"></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-purple-100 rounded-full blur-[100px] mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top bar */}
        <header className="px-6 pt-6 pb-4 flex items-center justify-between max-w-5xl mx-auto w-full">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-sm md:text-base font-bold tracking-tight text-slate-900">
              Flux<span className="text-cyan-500">Board</span>
            </span>
          </button>

          <p className="hidden sm:block text-xs md:text-sm text-slate-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-cyan-600 font-semibold hover:text-cyan-700"
            >
              Log in
            </button>
          </p>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="max-w-5xl w-full grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-10 items-center">
            {/* Register Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-slate-900/5 rounded-2xl p-8 md:p-10 max-w-md w-full mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-100 bg-cyan-50 text-xs font-mono font-semibold text-cyan-700 mb-6">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                Create your workspace
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Sign up in seconds
              </h1>
              <p className="text-sm md:text-base text-slate-500 mb-6">
                Set up your account and start collaborating on whiteboards with your team.
              </p>

              <div className="space-y-4" onKeyDown={handleKeyDown}>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-[0.08em]">
                    Full name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-sm focus:bg-white focus:ring-2 focus:ring-cyan-100 focus:border-cyan-500 outline-none placeholder:text-slate-300"
                      placeholder="Alex Designer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-[0.08em]">
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-sm focus:bg-white focus:ring-2 focus:ring-cyan-100 focus:border-cyan-500 outline-none placeholder:text-slate-300"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-[0.08em]">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <Lock size={16} />
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-sm focus:bg-white focus:ring-2 focus:ring-cyan-100 focus:border-cyan-500 outline-none placeholder:text-slate-300"
                      placeholder="Create a strong password"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={loading}
                  className="mt-2 w-full bg-slate-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 hover:shadow-lg disabled:opacity-70"
                >
{loading ? 'Creating account...' : 'Create account'}
                </button>

                <p className="text-xs text-slate-500 text-center mt-3">
                  By signing up you agree to our terms and privacy policy.
                </p>

                <p className="text-xs text-slate-500 text-center">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-cyan-600 font-semibold hover:text-cyan-700"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </div>

            {/* Visual Preview (Desktop only) */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
                <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 ring-1 ring-slate-200/50 rounded-2xl p-6 shadow-2xl shadow-slate-200/50 overflow-hidden aspect-[4/3] flex flex-col">
                  <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs text-indigo-700 font-bold shadow-sm">
                        UX
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-pink-100 flex items-center justify-center text-xs text-pink-700 font-bold shadow-sm">
                        PM
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-xs text-emerald-700 font-bold shadow-sm">
                        ENG
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 relative bg-slate-50/50 rounded-xl border border-slate-100 overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-70"></div>

                    <div className="absolute top-10 left-10 p-4 bg-yellow-100/90 rounded-sm border border-yellow-200 shadow-md max-w-[220px] transform -rotate-2">
                      <div className="font-handwriting text-yellow-800 text-xs font-semibold">
                        Team onboarding:
                        <br />- Welcome board
                        <br />- First retro
                        <br />- Design review
                      </div>
                    </div>

                    <div className="absolute bottom-20 right-12 p-3 bg-white rounded-lg rounded-br-none border border-slate-200 shadow-md max-w-[190px]">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-[10px] font-bold text-slate-500">New member joined</span>
                      </div>
                      <div className="text-xs text-slate-700">
                        Alex just created their first board.
                      </div>
                    </div>

                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <path
                        d="M 120 100 C 150 150, 300 200, 350 300"
                        stroke="url(#grad-register)"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="6 4"
                        className="animate-[dash_20s_linear_infinite]"
                      />
                      <defs>
                        <linearGradient id="grad-register" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="mt-4 text-xs text-slate-500 flex items-center justify-between">
                    <span>Auto-saves, roles & sharing controls</span>
                    <span className="text-cyan-500 font-mono">BETA ACCESS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
