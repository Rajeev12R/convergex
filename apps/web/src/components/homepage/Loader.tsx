import React from "react"

const Loader = () => {
  return (
    <div className="bg-foreground h-screen w-screen flex items-center justify-center relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-lime-300 text-xs font-mono whitespace-nowrap select-none pointer-events-none"
            style={{
              left: `${(i * 5) % 100}%`,
              animationDelay: `${i * 0.1}s`,
              animation: "matrixRain 3s linear infinite",
            }}
          >
            01101100011010010110111001101011011001010110010000100000011010010110111000001010
          </div>
        ))}
      </div>

      {/* Central Loading Animation */}
      <div className="relative z-10 flex flex-col items-center  gap-8">
        {/* Hexagonal Loading Ring */}
        <div className="relative w-32 h-32">
          {/* Outer Hexagon */}
          <div
            className="absolute inset-0 border-2 border-lime-300/30 rounded-none transform rotate-0 animate-spin-slow"
            style={{
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              animation: "hexSpin 4s linear infinite",
            }}
          />

          {/* Middle Hexagon */}
          <div
            className="absolute inset-2 border-2 border-lime-400/50 rounded-none transform rotate-60 animate-spin-reverse"
            style={{
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              animation: "hexSpinReverse 3s linear infinite",
            }}
          />

          {/* Inner Hexagon */}
          <div
            className="absolute inset-4 border-2 border-lime-500 rounded-none transform rotate-120"
            style={{
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              animation: "hexSpin 2s linear infinite",
            }}
          />

          {/* Central Core */}
          <div className="absolute inset-6 bg-lime-300 rounded-full animate-pulse-glow" />

          {/* Orbiting Particles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-lime-400 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
                animation: `orbit 2s linear infinite`,
                animationDelay: `${i * 0.33}s`,
                transform: `rotate(${
                  i * 60
                }deg) translateX(60px) translateY(-4px)`,
              }}
            />
          ))}
        </div>

        {/* Game-style Loading Text */}
        <div className="text-center space-y-4 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-lime-300 tracking-wider animate-pulse-text">
            CONVERGE-X
          </div>

          {/* Loading Progress Bar */}
          <div className="w-80 h-2 bg-lime-300/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-lime-400 to-lime-300 rounded-full animate-loading-bar" />
          </div>

          {/* Status Messages */}
          <div className="text-lime-400 text-lg font-mono tracking-wide animate-typing">
            <span className="inline-block animate-blink">▋</span>
            Loading your virtual space...
          </div>

          {/* Loading Stats */}
          <div className="flex justify-between text-lime-300/70 text-sm font-mono w-80 mt-4">
            <span className="animate-pulse" style={{ animationDelay: "0s" }}>
              SECURITY: ██████████ 100%
            </span>
            <span className="animate-pulse" style={{ animationDelay: "0.5s" }}>
              ENCRIPTION: ██████████ 100%
            </span>
          </div>
          
          {/* <div className="flex justify-between text-lime-300/70 text-sm font-mono w-80">
            <span className="animate-pulse" style={{ animationDelay: "1s" }}>
              ENCRYPTION: ██████░░░░ 60%
            </span>
            <span className="animate-pulse" style={{ animationDelay: "1.5s" }}>
              CONNECTION: ████████░░ 85%
            </span>
        
          </div> */}
        </div>

        {/* Floating Elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-lime-300 rounded-full animate-float"
            style={{
              top: `${20 + i * 10}%`,
              left: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Loader
