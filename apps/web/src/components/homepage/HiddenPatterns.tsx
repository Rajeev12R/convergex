"use client"

interface HiddenPatternsProps {
  mousePosition: { x: number; y: number }
  isHovering: boolean
}

const HiddenPatterns = ({ mousePosition, isHovering }: HiddenPatternsProps) => {
  return (
    <div
      className="absolute inset-0 z-5"
      style={{
        // Completely hidden initially, only visible through torch mask
        background: `
          radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 25%),
          radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.25) 0%, transparent 30%),
          radial-gradient(circle at 40% 70%, rgba(34, 197, 94, 0.2) 0%, transparent 35%),
          radial-gradient(circle at 90% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 25%),
          radial-gradient(circle at 10% 90%, rgba(34, 197, 94, 0.25) 0%, transparent 30%)
        `,
        maskImage: isHovering
          ? `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 50%, rgba(0,0,0,0.5) 70%, transparent 85%)`
          : "radial-gradient(circle 0px at 50% 50%, transparent 100%)",
        WebkitMaskImage: isHovering
          ? `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 50%, rgba(0,0,0,0.5) 70%, transparent 85%)`
          : "radial-gradient(circle 0px at 50% 50%, transparent 100%)",
        transition: "mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out",
      }}
    >
      {/* Main Corridors - Horizontal */}
      <div className="absolute top-1/4 left-1/4 w-96 h-6 bg-lime-300/40 rounded-sm"></div>
      <div className="absolute top-2/4 left-1/6 w-80 h-6 bg-lime-300/40 rounded-sm"></div>
      <div className="absolute top-3/4 left-1/3 w-72 h-6 bg-lime-300/40 rounded-sm"></div>

      {/* Main Corridors - Vertical */}
      <div className="absolute top-1/6 left-1/3 w-6 h-64 bg-lime-300/40 rounded-sm"></div>
      <div className="absolute top-1/4 right-1/3 w-6 h-48 bg-lime-300/40 rounded-sm"></div>
      <div className="absolute top-1/2 left-2/3 w-6 h-40 bg-lime-300/40 rounded-sm"></div>

      {/* Cafeteria Room */}
      <div className="absolute top-1/6 left-1/4 w-32 h-24 border-2 border-lime-300/50 bg-lime-300/15 rounded-lg">
        {/* Tables */}
        <div className="absolute top-2 left-2 w-6 h-4 bg-lime-300/40 rounded"></div>
        <div className="absolute top-2 right-2 w-6 h-4 bg-lime-300/40 rounded"></div>
        <div className="absolute bottom-2 left-8 w-6 h-4 bg-lime-300/40 rounded"></div>
        <div className="absolute bottom-2 right-8 w-6 h-4 bg-lime-300/40 rounded"></div>
      </div>

      {/* Reactor Room */}
      <div className="absolute top-1/2 right-1/4 w-28 h-28 border-2 border-lime-300/50 bg-lime-300/15 rounded-full">
        {/* Reactor Core */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-lime-300/60 rounded-full"></div>
        {/* Control Panels */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-lime-300/50 rounded"></div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-lime-300/50 rounded"></div>
      </div>

      {/* Electrical Room */}
      <div className="absolute bottom-1/4 left-1/6 w-24 h-20 border-2 border-lime-300/50 bg-lime-300/15 rounded">
        {/* Electrical Panels */}
        <div className="absolute top-1 left-1 w-3 h-6 bg-lime-300/40 rounded"></div>
        <div className="absolute top-1 left-6 w-3 h-6 bg-lime-300/40 rounded"></div>
        <div className="absolute top-1 right-1 w-3 h-6 bg-lime-300/40 rounded"></div>
        <div className="absolute bottom-1 left-3 w-3 h-4 bg-lime-300/40 rounded"></div>
        <div className="absolute bottom-1 right-3 w-3 h-4 bg-lime-300/40 rounded"></div>
      </div>

      {/* Medbay Room */}
      <div className="absolute top-1/3 right-1/6 w-28 h-20 border-2 border-lime-300/50 bg-lime-300/15 rounded-lg">
        {/* Medical Bed */}
        <div className="absolute top-2 left-2 w-8 h-4 bg-lime-300/40 rounded"></div>
        {/* Scanner */}
        <div className="absolute top-2 right-2 w-6 h-6 bg-lime-300/50 rounded-full"></div>
        {/* Medical Equipment */}
        <div className="absolute bottom-2 left-4 w-4 h-3 bg-lime-300/40 rounded"></div>
      </div>

      {/* Security Room */}
      <div className="absolute bottom-1/3 right-1/4 w-26 h-18 border-2 border-lime-300/50 bg-lime-300/15 rounded">
        {/* Security Monitors */}
        <div className="absolute top-1 left-1 w-4 h-3 bg-lime-300/50 rounded"></div>
        <div className="absolute top-1 right-1 w-4 h-3 bg-lime-300/50 rounded"></div>
        <div className="absolute bottom-1 left-2 w-4 h-3 bg-lime-300/50 rounded"></div>
        <div className="absolute bottom-1 right-2 w-4 h-3 bg-lime-300/50 rounded"></div>
      </div>

      {/* Storage Room */}
      <div className="absolute top-2/3 left-1/2 w-22 h-16 border-2 border-lime-300/50 bg-lime-300/15 rounded">
        {/* Storage Boxes */}
        <div className="absolute top-1 left-1 w-3 h-3 bg-lime-300/40 rounded"></div>
        <div className="absolute top-1 right-1 w-3 h-3 bg-lime-300/40 rounded"></div>
        <div className="absolute bottom-1 left-2 w-3 h-3 bg-lime-300/40 rounded"></div>
        <div className="absolute bottom-1 right-2 w-3 h-3 bg-lime-300/40 rounded"></div>
      </div>

      {/* Engine Rooms */}
      <div className="absolute bottom-1/6 left-1/3 w-20 h-16 border-2 border-lime-300/50 bg-lime-300/15 rounded">
        {/* Engine */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-8 bg-lime-300/50 rounded"></div>
      </div>

      <div className="absolute bottom-1/6 right-1/3 w-20 h-16 border-2 border-lime-300/50 bg-lime-300/15 rounded">
        {/* Engine */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-8 bg-lime-300/50 rounded"></div>
      </div>

      {/* Vents */}
      <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-lime-300/70 rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-lime-300/70 rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/2 w-4 h-4 bg-lime-300/70 rounded-full"></div>
      <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-lime-300/70 rounded-full"></div>

      {/* Maze-like Additional Corridors */}
      <div className="absolute top-1/8 left-1/2 w-3 h-16 bg-lime-300/35 rounded-sm"></div>
      <div className="absolute top-1/8 left-1/2 w-24 h-3 bg-lime-300/35 rounded-sm"></div>
      <div className="absolute top-5/6 left-1/8 w-32 h-3 bg-lime-300/35 rounded-sm"></div>
      <div className="absolute top-5/6 left-1/8 w-3 h-20 bg-lime-300/35 rounded-sm"></div>
      <div className="absolute top-1/3 right-1/8 w-3 h-24 bg-lime-300/35 rounded-sm"></div>
      <div className="absolute top-1/3 right-1/8 w-28 h-3 bg-lime-300/35 rounded-sm"></div>

      {/* Task Stations */}
      <div className="absolute top-1/5 left-2/5 w-3 h-3 bg-lime-300/80 rounded-full"></div>
      <div className="absolute top-2/5 right-2/5 w-3 h-3 bg-lime-300/80 rounded-full"></div>
      <div className="absolute bottom-1/5 left-3/5 w-3 h-3 bg-lime-300/80 rounded-full"></div>
      <div className="absolute bottom-2/5 right-3/5 w-3 h-3 bg-lime-300/80 rounded-full"></div>

      {/* Emergency Meeting Button (Center) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-lime-300/70 rounded-full border-2 border-lime-300/90"></div>

      {/* Additional Maze Walls */}
      <div className="absolute top-1/6 right-2/5 w-16 h-3 bg-lime-300/35 rounded-sm"></div>
      <div className="absolute top-1/6 right-2/5 w-3 h-12 bg-lime-300/35 rounded-sm"></div>
      <div className="absolute bottom-1/4 left-2/5 w-20 h-3 bg-lime-300/35 rounded-sm"></div>
      <div className="absolute bottom-1/4 left-2/5 w-3 h-16 bg-lime-300/35 rounded-sm"></div>
      <div className="absolute top-3/5 left-3/4 w-3 h-20 bg-lime-300/35 rounded-sm"></div>
      <div className="absolute top-3/5 left-3/4 w-24 h-3 bg-lime-300/35 rounded-sm"></div>
    </div>
  )
}

export default HiddenPatterns
