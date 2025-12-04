import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  ChevronDown
} from 'lucide-react';

const Dashboard = ({ onLogout, onOpenBoard }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">

      {/* TOP NAVBAR */}
      <nav className="h-18 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 lg:px-8 
                      flex items-center justify-between sticky top-0 z-50">

        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Flux<span className="text-indigo-600">Board</span>
          </span>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search boards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl
                       focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 
                       outline-none text-sm placeholder:text-slate-400"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5">

          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
            <Bell size={20}/>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* PROFILE DROPDOWN */}
          <div className="relative">

            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 pl-5 border-l border-slate-200"
            >
              <div className="hidden lg:block text-right">
                <p className="text-sm font-bold text-slate-800 leading-none mb-1">Alex Designer</p>
                <p className="text-[11px] font-medium text-slate-400 leading-none">Pro Plan</p>
              </div>

              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 
                              flex items-center justify-center">
                 <span className="font-bold text-indigo-600 text-xs">AD</span>
              </div>

              <ChevronDown size={14} className={`${profileOpen ? 'rotate-180' : ''} text-slate-400 transition-transform`} />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border p-2 z-50">
                
                <button className="w-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 
                                   flex items-center gap-3 rounded-lg">
                  <User size={16} /> Edit Profile
                </button>

                <button className="w-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 
                                   flex items-center gap-3 rounded-lg">
                  <Settings size={16} /> Settings
                </button>

                <div className="h-px bg-slate-100 my-2"></div>

                <button 
                  onClick={onLogout}
                  className="w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 
                             flex items-center gap-3 rounded-lg">
                  <LogOut size={16} /> Logout
                </button>

              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Next parts will be added here */}

    </div>
  );
};

export default Dashboard;
