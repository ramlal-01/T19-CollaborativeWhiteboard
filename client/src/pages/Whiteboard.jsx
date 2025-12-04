import React, { useState, useRef, useEffect } from 'react';
import { 
  MousePointer2, 
  PenTool, 
  Eraser, 
  Square, 
  Circle, 
  Type, 
  StickyNote, 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut, 
  Share2, 
  Download, 
  MessageSquare, 
  X, 
  Send, 
  MoreVertical, 
  ChevronLeft, 
  Save,
  Check,
  UserPlus,
  Cloud
} from 'lucide-react';

const Whiteboard = ({ onBack }) => {
  const [activeTool, setActiveTool] = useState('select'); // select, pen, eraser, rect, circle, text, sticky
  const [color, setColor] = useState('#2563eb'); // Default blue
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [showChat, setShowChat] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [elements, setElements] = useState([]); // Store drawn elements
  const [isDrawing, setIsDrawing] = useState(false);

  // 🔹 NEW: simple chat state
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "received",
      name: "Sarah",
      time: "10:24 AM",
      text: "I think we should move the high priority items to the left.",
      color: "purple"
    },
    {
      id: 2,
      type: "sent",
      name: "You",
      status: "Delivered",
      text: "Agreed. I'll update the sticky notes now."
    }
  ]);

  // Mock Collaborators
  const collaborators = [
    { id: 1, name: 'Sarah', color: 'bg-purple-500', cursorColor: 'text-purple-500' },
    { id: 2, name: 'Mike', color: 'bg-orange-500', cursorColor: 'text-orange-500' },
  ];

  // Canvas Reference (for future actual drawing)
  const canvasRef = useRef(null);

  // Tools Configuration
  const tools = [
    { id: 'select', icon: <MousePointer2 size={20} />, label: 'Select' },
    { id: 'pen', icon: <PenTool size={20} />, label: 'Pen' },
    { id: 'eraser', icon: <Eraser size={20} />, label: 'Eraser' },
    { id: 'rect', icon: <Square size={20} />, label: 'Rectangle' },
    { id: 'circle', icon: <Circle size={20} />, label: 'Circle' },
    { id: 'text', icon: <Type size={20} />, label: 'Text' },
    { id: 'sticky', icon: <StickyNote size={20} />, label: 'Note' },
  ];

  // Color Palette
  const colors = [
    '#000000', '#2563eb', '#dc2626', '#16a34a', '#d97706', '#9333ea'
  ];

  // Handle Mouse Events for "Drawing" (Simulation)
  const handleMouseDown = (e) => {
    if (activeTool === 'select') return;
    setIsDrawing(true);

    const newElement = {
      id: Date.now(),
      type: activeTool,
      x: e.clientX,
      y: e.clientY,
      color: color,
      width: strokeWidth,
      // future: path data etc.
    };
    // FIXME: once real drawing is implemented, add element here:
    // setElements(prev => [...prev, newElement]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // 🔹 NEW: handle sending chat message
  const handleSendMessage = () => {
    const text = chatInput.trim();
    if (!text) return;

    const newMsg = {
      id: Date.now(),
      type: "sent",
      name: "You",
      status: "Sent",
      text
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatInput("");
  };

  const handleChatKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-slate-50 overflow-hidden font-sans text-slate-900">
      
      {/* 1. Top Navigation Bar */}
      <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 flex items-center justify-between z-20 shadow-sm relative">
        
        {/* Left: Back & Title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-800 text-sm md:text-base">Q4 Marketing Strategy</h1>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-500 border border-slate-200 hidden md:inline-block">Draft</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
              <Cloud size={10} /> Saved just now
            </div>
          </div>
        </div>

        {/* Center: Toolbar (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 bg-white border border-slate-200 shadow-sm rounded-xl p-1 gap-1">
          {/* Undo/Redo Group */}
          <div className="flex items-center border-r border-slate-100 pr-1 mr-1">
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg">
              <Undo size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg">
              <Redo size={18} />
            </button>
          </div>
          
          {/* Tool Selection */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setActiveTool('select')}
              className={`p-2 rounded-lg transition-all ${activeTool === 'select' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
              title="Select (V)"
            >
              <MousePointer2 size={18} />
            </button>
            <button 
              onClick={() => setActiveTool('pen')}
              className={`p-2 rounded-lg transition-all ${activeTool === 'pen' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
              title="Pen (P)"
            >
              <PenTool size={18} />
            </button>
            <button 
              onClick={() => setActiveTool('sticky')}
              className={`p-2 rounded-lg transition-all ${activeTool === 'sticky' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
              title="Sticky Note (N)"
            >
              <StickyNote size={18} />
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1"></div>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg">
              <Square size={18} />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg">
              <Circle size={18} />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg">
              <Type size={18} />
            </button>
          </div>
        </div>

        {/* Right: Actions & Collaborators */}
        <div className="flex items-center gap-3">
          {/* Avatar Stack */}
          <div className="flex items-center -space-x-2 mr-2">
            <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm z-10">
              You
            </div>
            {collaborators.map(c => (
              <div
                key={c.id}
                className={`w-8 h-8 rounded-full border-2 border-white ${c.color} flex items-center justify-center text-xs font-bold text-white shadow-sm`}
                title={c.name}
              >
                {c.name.charAt(0)}
              </div>
            ))}
            <button className="w-8 h-8 rounded-full border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors">
              <UserPlus size={14} />
            </button>
          </div>
          
          <button className="hidden sm:flex bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-2 rounded-lg text-xs font-bold items-center gap-2 transition-colors">
            <Share2 size={14} /> Share
          </button>
          <button className="bg-slate-900 text-white hover:bg-slate-800 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-lg shadow-slate-900/10">
            <Download size={14} /> Export
          </button>
        </div>
      </header>

      {/* 2. Main Workspace Area */}
      <main
        className="flex-1 relative overflow-hidden bg-slate-50 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={canvasRef}
      >
        {/* Dot Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: `${20 * (zoom/100)}px ${20 * (zoom/100)}px`,
            opacity: 0.5
          }}
        ></div>

        {/* Interactive Tool Properties Bar (Floating) */}
        {activeTool === 'pen' && (
          <div className="absolute top-4 left-4 bg-white p-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 animate-in slide-in-from-left-2 z-10">
            <div className="flex gap-1">
              {colors.map(c => (
                <button 
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-indigo-500 scale-110' : 'border-transparent hover:scale-105'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="w-px h-6 bg-slate-100"></div>
            <input 
              type="range"
              min="1"
              max="10"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
              className="w-20 accent-indigo-600" 
            />
          </div>
        )}

        {/* Canvas Content (Simulated SVG) */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full">
            {/* Demo Path */}
            <path
              d="M 150 150 Q 250 100 350 150 T 550 150"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
            />
            <rect
              x="600"
              y="100"
              width="120"
              height="80"
              fill="none"
              stroke="#dc2626"
              strokeWidth="3"
              rx="4"
            />
            <text
              x="615"
              y="145"
              fontFamily="sans-serif"
              fontSize="14"
              fill="#dc2626"
            >
              High Priority
            </text>
          </svg>
          
          {/* Demo Sticky Note */}
          <div className="absolute top-[250px] left-[100px] w-48 h-48 bg-yellow-200 shadow-xl transform -rotate-2 p-4 font-handwriting text-slate-800 rounded-sm pointer-events-auto cursor-move hover:scale-[1.01] transition-transform">
            <div className="font-bold mb-2 text-sm opacity-50">Brainstorm</div>
            <ul className="list-disc pl-4 text-sm space-y-1">
              <li>User Flows</li>
              <li>Wireframes</li>
              <li>Color Palette</li>
            </ul>
          </div>

          {/* Simulated Collaborator Cursor */}
          <div className="absolute top-[320px] left-[450px] transition-all duration-[3000ms] animate-pulse">
            <MousePointer2 className="text-purple-500 fill-purple-500 w-4 h-4 transform -rotate-12" />
            <div className="ml-4 -mt-2 bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm">
              Sarah
            </div>
          </div>
        </div>

        {/* Mobile/Floating Toolbar (Bottom Center) */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:hidden">
          <div className="bg-white border border-slate-200 shadow-xl rounded-full px-4 py-2 flex items-center gap-4">
            {tools.slice(0, 5).map(t => (
              <button 
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`${activeTool === t.id ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                {t.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Zoom Controls (Bottom Left) */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white border border-slate-200 shadow-lg rounded-lg p-1 z-10">
          <button 
            onClick={() => setZoom(z => Math.max(10, z - 10))}
            className="p-1.5 hover:bg-slate-50 text-slate-500 rounded-md"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-xs font-bold text-slate-700 w-10 text-center">
            {zoom}%
          </span>
          <button 
            onClick={() => setZoom(z => Math.min(200, z + 10))}
            className="p-1.5 hover:bg-slate-50 text-slate-500 rounded-md"
          >
            <ZoomIn size={16} />
          </button>
        </div>

        {/* Chat Toggle (Bottom Right) */}
        <button 
          onClick={() => setShowChat(!showChat)}
          className={`absolute bottom-6 right-6 p-3 rounded-full shadow-lg transition-all z-20 ${showChat ? 'bg-indigo-600 text-white rotate-180' : 'bg-white text-slate-600 hover:text-indigo-600'}`}
        >
          {showChat ? <X size={24} /> : <MessageSquare size={24} />}
          {!showChat && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </button>

        {/* Chat Sidebar */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-80 bg-white border-l border-slate-200 shadow-2xl transform transition-transform duration-300 z-10 flex flex-col ${
            showChat ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Chat Header */}
          <div className="h-16 border-b border-slate-100 flex items-center justify-between px-4">
            <span className="font-bold text-slate-800">Session Chat</span>
            <div className="flex -space-x-1">
              {collaborators.map(c => (
                <div
                  key={c.id}
                  className={`w-6 h-6 rounded-full border-2 border-white ${c.color}`}
                ></div>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            <div className="text-center text-xs text-slate-400 my-2">
              Today, 10:23 AM
            </div>

            {messages.map((m) =>
              m.type === "received" ? (
                <div className="flex gap-3" key={m.id}>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                    {m.name.charAt(0)}
                  </div>
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-slate-700">
                        {m.name}
                      </span>
                      {m.time && (
                        <span className="text-[10px] text-slate-400">
                          {m.time}
                        </span>
                      )}
                    </div>
                    <div className="bg-white border border-slate-200 p-2.5 rounded-2xl rounded-tl-none text-sm text-slate-600 shadow-sm">
                      {m.text}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 flex-row-reverse" key={m.id}>
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                    Y
                  </div>
                  <div className="flex flex-col gap-1 max-w-[80%] items-end">
                    <div className="bg-indigo-600 p-2.5 rounded-2xl rounded-tr-none text-sm text-white shadow-md">
                      {m.text}
                    </div>
                    {m.status && (
                      <span className="text-[10px] text-slate-400">
                        {m.status}
                      </span>
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleChatKeyDown}
                className="w-full bg-slate-100 border-none rounded-xl py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-white rounded-lg text-indigo-600 hover:bg-indigo-50 shadow-sm transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Whiteboard;
