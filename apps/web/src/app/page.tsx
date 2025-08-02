"use client"
import Link from "next/link"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { HiOutlineRocketLaunch } from "react-icons/hi2"
import BatteryStatus from "@/components/homepage/BatteryStatus"
import NetworkStatus from "@/components/homepage/NetworkStatus"
import HiddenPatterns from "@/components/homepage/HiddenPatterns"
import BouncyCursor from "@/components/homepage/BouncyCursor"
import Loader from "@/components/homepage/Loader"

const Page = () => {
  const { user, isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState<string>("")
  const [isNavigating, setIsNavigating] = useState(false)

useEffect(() => {
    const createUser = async () => {
      try {
        const res = await fetch("/api/db-check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const data = await res.json()

        if (!res.ok) {
          console.error("Error from server:", data)
        } else {
          console.log("User created:", data)
        }
      } catch (err) {
        console.error("Client-side error:", err)
      }
    }

    createUser()
  }, [])

  // Handle Launch Meeting button click
  const handleLaunchMeeting = async () => {
    if (!isLoaded) return
    if (isSignedIn) {
      setIsNavigating(true)
      try {
        await router.push("/workspace")
      } catch (error) {
        console.error("Navigation failed:", error)
      }
      setIsNavigating(false)
    }
  }

  // Time update effect (unchanged)
  useEffect(() => {
    const updateISTTime = () => {
      const now = new Date()
      const istOffset = 5.5 * 60
      const localTime = now.getTime()
      const localOffset = now.getTimezoneOffset() * 60000
      const istTime = new Date(localTime + localOffset + istOffset * 60000)

      const hours = istTime.getHours()
      const minutes = istTime.getMinutes()
      const seconds = istTime.getSeconds()
      const isAM = hours < 12
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

      const suffix = isAM ? "A.M." : "P.M."
      setCurrentTime(
        `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${suffix}`
      )
    }

    updateISTTime()
    const interval = setInterval(updateISTTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Mouse tracking effect (unchanged)
  useEffect(() => {
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      })
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
      document.body.style.cursor = "none"
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      document.body.style.cursor = "default"
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.body.addEventListener("mouseenter", handleMouseEnter)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.body.style.cursor = "default"
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (!isLoaded) {
    return (
      <Loader/>
    )
  }

  return (
    <div
      ref={containerRef}
      className="bg-foreground h-screen w-screen flex items-center justify-center p-10 relative overflow-hidden"
      style={{ cursor: "none" }}
    >
      {/* Custom Cursor & Effects */}
      {!isHovering ? null : (
        <>
          <BouncyCursor mousePosition={mousePosition} isHovering={isHovering} />

          <div
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 30%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.95) 80%)`,
              mixBlendMode: "multiply",
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 40%, rgba(34, 197, 94, 0.05) 60%, transparent 80%)`,
            }}
          />
        </>
      )}

      {/* Hidden Patterns */}
      <HiddenPatterns mousePosition={mousePosition} isHovering={isHovering} />

      <div className="relative w-full h-full border border-lime-300 flex justify-center px-10 py-6 text-background z-30">
        {/* Auth Section */}
        <div className="absolute right-4 top-4">
          <SignedIn>
            <div className="flex items-center gap-4 text-lime-300 px-6 py-2 bg-transparent rounded-ee-xl border border-lime-300">
              <span className="text-lg font-medium">Hi, {user?.firstName}</span>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "bg-foreground border-lime-300",
                    userButtonPopoverActions: "text-lime-300",
                  },
                }}
              />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/workspace">
              <button className="w-60 px-8 py-2 cursor-pointer bg-lime-300 text-foreground font-semibold rounded-xl justify-center hover:bg-lime-400 transition-all duration-300 flex items-center gap-3 text-lg">
                <span className="uppercase tracking-wide">Sign In / Sign Up</span>
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Center Text & Buttons */}
        <div className="flex flex-col items-center gap-8 justify-center text-center">
          <h1 className="text-7xl md:text-9xl uppercase tracking-widest font-heading text-lime-300">
            Converge-X
          </h1>

          <p className="max-w-[500px] text-2xl md:text-3xl text-lime-200 tracking-wide">
            Real Immersive Meeting Space for Remote Collaboration
          </p>

          <div className="flex flex-col gap-4">
            <SignedIn>
              <button
                onClick={handleLaunchMeeting}
                disabled={isNavigating}
                className="w-80 px-8 py-3 bg-lime-300 text-foreground font-semibold rounded-xl justify-center hover:bg-lime-400 transition-all duration-300 flex items-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiOutlineRocketLaunch className="text-2xl" />
                <span>{isNavigating ? "Launching..." : "Launch Meeting"}</span>
              </button>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal"forceRedirectUrl="/workspace">
                <button className="w-80 px-8 py-3 bg-lime-300 text-foreground font-semibold rounded-xl justify-center hover:bg-lime-400 transition-all duration-300 flex items-center gap-3 text-lg">
                  <HiOutlineRocketLaunch className="text-2xl" />
                  <span>Launch Meeting</span>
                </button>
              </SignInButton>
            </SignedOut>

            <span className="-mb-2">New to Converge-X?</span>

            <Link href="/quick-start">
              <button className="w-80 px-8 py-3 border border-lime-300 bg-transparent text-lime-300 justify-center font-semibold rounded-xl cursor-pointer hover:bg-lime-400 hover:text-foreground transition-all duration-300 flex items-center gap-3 text-lg">
                <span className="uppercase">2 minutes quick-start</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Vertical Links */}
        <div className="absolute inset-y-0 right-0 flex flex-col justify-center gap-6 pr-2">
          {[
            { name: "Documentation", href: "/docs" },
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "Discord", href: "https://discord.gg/your-server" },
            { name: "Help & Support", href: "/support" },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="text-sm text-lime-300 hover:text-lime-200 transition-all tracking-wider"
              style={{ writingMode: "vertical-rl" }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Battery, Time, Network */}
        <div className="absolute bottom-4 left-4">
          <BatteryStatus />
        </div>

        <div className="absolute bottom-4 p-4">
          <p className="text-md text-lime-300 tracking-widest">{currentTime}</p>
        </div>

        <div className="absolute bottom-4 right-4">
          <NetworkStatus />
        </div>
      </div>
    </div>
  )
}

export default Page
