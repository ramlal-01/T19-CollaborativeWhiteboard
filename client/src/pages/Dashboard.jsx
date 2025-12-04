import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  ChevronDown,
  Plus,
  Trello,
  Clock,
  Workflow,
  Grid,
  List,
  MoreHorizontal,
  Share2,
  Edit3,
  Trash2,
  ExternalLink,
  Layout
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [myBoards, setMyBoards] = useState([]);
  const [sharedBoards, setSharedBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      navigate('/login');
      return;
    }

    const currentUser = JSON.parse(storedUser);

    const fetchBoards = async () => {
      try {
        const response = await api.get('/api/boards');
        const boards = response.data || [];

        const mine = [];
        const shared = [];

        boards.forEach((board) => {
          const isOwner = board.owner === currentUser.id;
          if (isOwner) {
            mine.push(board);
          } else {
            shared.push(board);
          }
        });

        setMyBoards(mine);
        setSharedBoards(shared);
      } catch (error) {
        console.error('Failed to load boards', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleOpenBoard = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  const handleCreateBoard = async (title) => {
    try {
      const response = await api.post('/api/boards', { title });
      const board = response.data;
      setMyBoards((prev) => [board, ...prev]);
      handleOpenBoard(board._id);
    } catch (error) {
      console.error('Failed to create board', error);
      alert('Failed to create board');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans text-slate-900">
        <p className="text-slate-600">Loading boards...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">

      {/* =============================
          TOP NAVBAR
      ============================== */}
      <nav className="h-18 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 lg:px-8 
                      flex items-center justify-between sticky top-0 z-50">
        
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Flux<span className="text-indigo-600">Board</span>
          </span>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search boards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl
                       focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        <div className="flex items-center gap-5">

          <button className="relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
            <Bell size={20}/>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 pl-5 border-l border-slate-200"
            >
              <div className="hidden lg:block text-right">
                <p className="text-sm font-bold text-slate-800">Alex Designer</p>
                <p className="text-[11px] text-slate-400">Pro Plan</p>
              </div>

              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 
                              flex items-center justify-center">
                 <span className="font-bold text-indigo-600 text-xs">AD</span>
              </div>

              <ChevronDown size={14} className={`${profileOpen ? 'rotate-180' : ''} text-slate-400`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border p-2 z-50">

                <button className="w-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 rounded-lg">
                  <User size={16} /> Edit Profile
                </button>

                <button className="w-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 rounded-lg">
                  <Settings size={16} /> Settings
                </button>

                <div className="h-px bg-slate-100 my-2"></div>

                <button 
                  onClick={handleLogout}
                  className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 rounded-lg">
                  <LogOut size={16} /> Logout
                </button>

              </div>
            )}
          </div>
        </div>
      </nav>


      {/* ===================================================
          PART 2 — NEW BOARD + TEMPLATES
      ===================================================== */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-12">

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Start a new board</h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              More templates
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

            <div 
              onClick={() => handleCreateBoard('Untitled Board')}
              className="col-span-1 h-32 rounded-xl bg-indigo-600 hover:bg-indigo-700 
                         cursor-pointer shadow-lg flex flex-col items-center justify-center gap-3 text-white group"
            >
              <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <span className="font-semibold text-sm">New Board</span>
            </div>

            {[ 
              { id: 'kanban', name: 'Kanban', color: 'bg-orange-100', text: 'text-orange-600', icon: <Trello size={20} /> },
              { id: 'retro', name: 'Retrospective', color: 'bg-purple-100', text: 'text-purple-600', icon: <Clock size={20} /> },
              { id: 'flow', name: 'Flowchart', color: 'bg-green-100', text: 'text-green-600', icon: <Workflow size={20} /> },
            ].map((t) => (
              <div 
                key={t.id}
                onClick={() => handleCreateBoard(t.name)}
                className="col-span-1 h-32 rounded-xl bg-white border border-slate-200 
                           hover:border-indigo-300 hover:shadow-md cursor-pointer flex flex-col p-4 group"
              >
                <div className={`w-10 h-10 ${t.color} ${t.text} rounded-lg flex items-center justify-center mb-auto`}>
                  {t.icon}
                </div>

                <span className="block text-sm font-semibold text-slate-700 group-hover:text-indigo-600">
                  {t.name}
                </span>
                <span className="text-[10px] text-slate-400">Default layout</span>
              </div>
            ))}
          </div>
        </section>


{/* ===================================================
        PART 3 — RECENT BOARDS SECTION
======================================================= */}

<section>
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <h3 className="text-xl font-bold text-slate-800">Recent Boards</h3>
      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
        {myBoards.length}
      </span>
    </div>

    <div className="flex bg-white border border-slate-200 rounded-lg p-0.5">
      <button 
        onClick={() => setViewMode('grid')}
        className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
      >
        <Grid size={16} />
      </button>

      <button 
        onClick={() => setViewMode('list')}
        className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
      >
        <List size={16} />
      </button>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

    {myBoards.map((board, index) => {
      const colors = ['bg-indigo-50', 'bg-cyan-50', 'bg-slate-50'];
      const thumbnail = colors[index % colors.length];
      const updated = board.updatedAt
        ? new Date(board.updatedAt).toLocaleString()
        : '';

      return (
      <div 
        key={board._id}
        onClick={() => handleOpenBoard(board._id)}
        className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 
                   hover:shadow-xl flex flex-col overflow-hidden cursor-pointer transition-all"
      >
        
        {/* Preview Area */}
        <div className={`h-40 ${thumbnail} relative p-6`}>
          
          <div className="absolute top-4 left-4 w-24 h-2 bg-white/40 rounded-full"></div>
          <div className="absolute top-8 left-4 w-16 h-2 bg-white/40 rounded-full"></div>

          <div className="absolute bottom-4 right-4 w-8 h-8 bg-white rounded-lg shadow-sm 
                          flex items-center justify-center">
            <Layout className="text-indigo-400" />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] opacity-0 
                          group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <button className="bg-white text-slate-900 px-5 py-2 rounded-full text-sm font-bold shadow-lg 
                               flex items-center gap-2 hover:bg-indigo-50">
              Open <ExternalLink size={14} />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col">

          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1 pr-4">
              {board.title}
            </h4>

            <button onClick={(e) => e.stopPropagation()} className="text-slate-400 hover:text-slate-600 p-1 rounded-md">
              <MoreHorizontal size={16} />
            </button>
          </div>

          <p className="text-xs text-slate-400 mb-5 flex items-center gap-1.5">
            <Clock size={12} /> {updated}
          </p>

          <div className="mt-auto flex items-center gap-1 border-t border-slate-50 pt-3 opacity-60 
                          group-hover:opacity-100 transition-opacity">
            
            <button 
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-1.5 text-xs flex items-center justify-center gap-1.5 text-slate-600 
                         hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
              <Share2 size={14} /> Share
            </button>
            
            <div className="w-px h-3 bg-slate-200"></div>

            <button 
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-1.5 text-xs flex items-center justify-center gap-1.5 text-slate-600 
                         hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
              <Edit3 size={14} /> Rename
            </button>

            <div className="w-px h-3 bg-slate-200"></div>

            <button 
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-1.5 text-xs flex items-center justify-center gap-1.5 text-red-600 
                         hover:bg-red-50 rounded-md">
              <Trash2 size={14} /> Delete
            </button>

          </div>
        </div>
      </div>
    )})}

  </div>
</section>


      </main>

      {/* ===================================================
      PART 4 — SHARED WITH ME SECTION
======================================================= */}

<section className="pb-16">
  <div className="flex items-center gap-3 mb-6">
    <h3 className="text-xl font-bold text-slate-800">Shared with me</h3>
    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 text-xs font-bold border border-purple-100">
      {sharedBoards.length}
    </span>
  </div>

  <div className="space-y-3">

    {sharedBoards.map((board, index) => {
      const colors = ['bg-purple-50', 'bg-pink-50', 'bg-orange-50'];
      const thumbnail = colors[index % colors.length];
      const updated = board.updatedAt
        ? new Date(board.updatedAt).toLocaleString()
        : '';

      return (
      <div 
        key={board._id}
        onClick={() => handleOpenBoard(board._id)}
        className="group bg-white border border-slate-200 rounded-xl p-4 
                   flex items-center gap-4 hover:border-purple-200 hover:shadow-md 
                   transition-all cursor-pointer"
      >

        {/* Icon */}
        <div className={`w-12 h-12 ${thumbnail} rounded-lg flex items-center 
                        justify-center text-slate-500 group-hover:scale-105 transition-transform`}>
          <Layout size={20} />
        </div>

        {/* Details */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          <div className="min-w-0">
            <h4 className="font-bold text-slate-800 truncate group-hover:text-purple-600 transition-colors">
              {board.title}
            </h4>
            <p className="text-xs text-slate-400 md:hidden mt-0.5">
              Owner: {board.owner?.name || 'Unknown'}
            </p>
          </div>

          {/* Owner Avatar */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 text-[10px] flex items-center 
                           justify-center font-bold text-slate-600 border border-white">
              {(board.owner?.name || 'U').charAt(0)}
            </div>
            <span className="text-xs text-slate-500">{board.owner?.name || 'Unknown'}</span>
          </div>

          {/* Last Edited */}
          <div className="hidden md:flex items-center gap-1 text-slate-400 text-xs">
            <Clock size={12} /> {updated}
          </div>

        </div>

        {/* Open Button */}
        <button 
          className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 
                     rounded-lg transition-colors"
        >
          <ExternalLink size={18} />
        </button>

      </div>
    )})}

  </div>
</section>
        
    </div>
  );
};

export default Dashboard;
