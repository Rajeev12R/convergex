'use client'
import React, { useState, useEffect } from "react"
import Link from "next/link"

const Page = () => {
  const [activeTab, setActiveTab] = useState("join")
  const [roomInput, setRoomInput] = useState("")
  const [newRoomName, setNewRoomName] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  // Simulate real-time stats updates
  const [stats, setStats] = useState({
    totalRooms: 1,
    maxParticipants: 4,
    activeSessions: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeSessions: Math.floor(Math.random() * 3)
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleConnect = () => {
    setIsConnecting(true)
    setTimeout(() => setIsConnecting(false), 2000)
  }

  const availableRooms = [
    { name: "Neural-Link-Alpha", participants: 2, maxParticipants: 4, status: "active", ping: 23 },
    { name: "Quantum-Sync-Beta", participants: 1, maxParticipants: 8, status: "waiting", ping: 45 },
    { name: "Matrix-Hub-Gamma", participants: 3, maxParticipants: 6, status: "active", ping: 12 }
  ]

  return (
    <div className="bg-foreground h-screen w-screen flex flex-col px-8 py-6 relative overflow-hidden">
      {/* Matrix Background Effect */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-lime-300 text-xs font-mono whitespace-nowrap select-none pointer-events-none"
            style={{
              left: `${(i * 7) % 100}%`,
              animationDelay: `${i * 0.2}s`,
              animation: 'matrixRain 4s linear infinite',
            }}
          >
            CONVERGE_X_NEURAL_LINK_QUANTUM_SYNC_MATRIX_HUB
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between w-full relative z-10 mb-8">
        <div className="logo w-fit h-min">
          <h1 className="text-2xl md:text-3xl uppercase tracking-widest font-heading text-lime-300">
            Converge-X
          </h1>
        </div>
        <nav className="bg-black/80 border border-lime-300/50 backdrop-blur-sm flex items-center justify-evenly rounded-xl w-full max-w-96 mx-auto h-14 text-lime-300">
          <Link
            href={"#"}
            className="cursor-pointer px-4 py-2 rounded-xl hover:bg-lime-300/10 bg-lime-300/20 transition-all duration-300 relative group"
          >
            Home
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-300 group-hover:w-full transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-lime-300" />
          </Link>
          <Link
            href={"#"}
            className="cursor-pointer px-4 py-2 rounded-xl hover:bg-lime-300/10 transition-all duration-300 relative group"
          >
            Spaces
          </Link>
          <Link
            href={"#"}
            className="cursor-pointer px-4 py-2 rounded-xl hover:bg-lime-300/10 transition-all duration-300 relative group"
          >
            Settings
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-300 group-hover:w-full transition-all duration-300" />
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Room Control Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Control Header */}
          <div className="bg-black/60 border border-lime-300/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 bg-lime-300 rounded-full animate-pulse" />
              <h2 className="text-2xl font-bold text-lime-300 tracking-wide uppercase">
                Room Control
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-lime-300/50 to-transparent" />
            </div>

            {/* Tab Selector */}
            <div className="flex bg-black/40 rounded-xl p-1 mb-6 border border-lime-300/20">
              <button
                onClick={() => setActiveTab("join")}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "join"
                    ? "bg-lime-300/20 text-lime-300 border border-lime-300/50"
                    : "text-lime-300/70 hover:text-lime-300"
                }`}
              >
                JOIN EXISTING ROOM
              </button>
              <button
                onClick={() => setActiveTab("create")}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "create"
                    ? "bg-lime-300/20 text-lime-300 border border-lime-300/50"
                    : "text-lime-300/70 hover:text-lime-300"
                }`}
              >
                CREATE NEW ROOM
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "join" ? (
              <div className="space-y-4">
                <p className="text-lime-300/80 text-sm leading-relaxed">
                  Enter a room name or paste a room link to join an existing room. You can find available rooms below.
                </p>
                <div className="bg-black/40 border border-lime-300/30 rounded-lg p-1 text-xs text-lime-300/60">
                  <span className="text-lime-400">💡 Tip:</span> You can paste a full room URL or just enter the room name
                </div>
                
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={roomInput}
                    onChange={(e) => setRoomInput(e.target.value)}
                    placeholder="Enter room name or paste link..."
                    className="flex-1 bg-black/60 border border-lime-300/30 rounded-lg px-4 py-3 text-lime-300 placeholder:text-lime-300/40 focus:border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300/20 transition-all"
                  />
                  <button
                    onClick={handleConnect}
                    disabled={!roomInput || isConnecting}
                    className="px-8 py-3 bg-lime-300 text-black font-semibold rounded-lg hover:bg-lime-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    {isConnecting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        CONNECTING
                      </>
                    ) : (
                      "CONNECT TO ROOM"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-lime-300/80 text-sm leading-relaxed">
                  Create a new private room with custom settings and invite your team members.
                </p>
                
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder="Enter new room name..."
                    className="flex-1 bg-black/60 border border-lime-300/30 rounded-lg px-4 py-3 text-lime-300 placeholder:text-lime-300/40 focus:border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300/20 transition-all"
                  />
                  <button
                    onClick={handleConnect}
                    disabled={!newRoomName || isConnecting}
                    className="px-8 py-3 bg-lime-300 text-black font-semibold rounded-lg hover:bg-lime-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    {isConnecting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        CREATING
                      </>
                    ) : (
                      "CREATE ROOM"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Available Rooms */}
          <div className="bg-black/60 border border-lime-300/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse" />
              <h3 className="text-xl font-bold text-lime-300 tracking-wide uppercase">
                Available Rooms to Join
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-lime-300/50 to-transparent" />
            </div>

            <div className="grid gap-4">
              {availableRooms.map((room, index) => (
                <div
                  key={index}
                  className="bg-black/40 border border-lime-300/20 rounded-lg p-4 hover:border-lime-300/50 hover:bg-black/60 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${room.status === 'active' ? 'bg-lime-300 animate-pulse' : 'bg-yellow-400'}`} />
                      <h4 className="text-lime-300 font-semibold text-lg">{room.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        room.status === 'active' ? 'bg-lime-300/20 text-lime-300' : 'bg-yellow-400/20 text-yellow-400'
                      }`}>
                        {room.status.toUpperCase()}
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-lime-300/10 text-lime-300 rounded-lg hover:bg-lime-300/20 transition-all duration-300 group-hover:bg-lime-300 group-hover:text-black">
                      JOIN
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm text-lime-300/70">
                    <div className="flex items-center gap-4">
                      <span>👥 {room.participants}/{room.maxParticipants}</span>
                      <span>📡 {room.ping}ms</span>
                    </div>
                    <div className="w-16 h-1 bg-lime-300/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-lime-300 rounded-full transition-all duration-300"
                        style={{ width: `${(room.participants / room.maxParticipants) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Room Stats */}
          <div className="bg-black/60 border border-lime-300/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              <h3 className="text-xl font-bold text-lime-300 tracking-wide uppercase">
                Room Stats
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-lime-300/20">
                <span className="text-lime-300/80">TOTAL ROOMS</span>
                <span className="text-2xl font-bold text-lime-300">{stats.totalRooms}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-lime-300/20">
                <span className="text-lime-300/80">MAX PARTICIPANTS</span>
                <span className="text-2xl font-bold text-lime-300">{stats.maxParticipants}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-lime-300/20">
                <span className="text-lime-300/80">ACTIVE SESSIONS</span>
                <span className="text-2xl font-bold text-lime-300 animate-pulse">{stats.activeSessions}</span>
              </div>
            </div>
          </div>

          {/* Upgrade Banner */}
          <div className="bg-gradient-to-br from-lime-300/10 to-transparent border border-lime-300/30 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-lime-300/5 rounded-full -translate-y-10 translate-x-10" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-lime-300/5 rounded-full translate-y-8 -translate-x-8" />
            
            <div className="relative z-10">
              <p className="text-lime-300/80 text-sm mb-4 leading-relaxed">
                Want custom room names and more participants?
              </p>
              <button className="w-full py-3 bg-gradient-to-r from-lime-300 to-lime-400 text-black font-bold rounded-lg hover:from-lime-400 hover:to-lime-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                🚀 Upgrade to Command Center
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-black/60 border border-lime-300/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <h3 className="text-lg font-bold text-lime-300 tracking-wide uppercase">
                System Status
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-lime-300/70">Server Health</span>
                <span className="text-lime-300">🟢 Optimal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lime-300/70">Network Latency</span>
                <span className="text-lime-300">12ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lime-300/70">Uptime</span>
                <span className="text-lime-300">99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes matrixRain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default Page