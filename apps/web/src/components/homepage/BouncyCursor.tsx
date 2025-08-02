"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface BouncyCursorProps {
  mousePosition: { x: number; y: number }
  isHovering: boolean
}

const BouncyCursor = ({ mousePosition, isHovering }: BouncyCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cursorRef.current || !cursorDotRef.current) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    // Smooth bouncy cursor following
    gsap.to(cursor, {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      duration: 0.3,
      ease: "back.out(1.7)",
    })

    // Inner dot follows with slight delay and bounce
    gsap.to(cursorDot, {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      duration: 0.2,
      ease: "back.out(2)",
    })
  }, [mousePosition])

  useEffect(() => {
    if (!cursorRef.current || !cursorDotRef.current || !flashRef.current) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    const flash = flashRef.current

    if (isHovering) {
      // Flash effect when torch activates
      gsap
        .timeline()
        .to(flash, {
          opacity: 1,
          scale: 3,
          duration: 0.1,
          ease: "power2.out",
        })
        .to(flash, {
          opacity: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          cursor,
          {
            scale: 1.5,
            borderColor: "rgba(34, 197, 94, 0.8)",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          0,
        )
        .to(
          cursorDot,
          {
            scale: 1.2,
            backgroundColor: "rgba(34, 197, 94, 0.9)",
            duration: 0.2,
            ease: "back.out(2)",
          },
          0.1,
        )
    } else {
      // Reset cursor when not hovering
      gsap.to(cursor, {
        scale: 1,
        borderColor: "rgba(34, 197, 94, 0.3)",
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "back.out(1.7)",
      })

      gsap.to(cursorDot, {
        scale: 1,
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        duration: 0.2,
        ease: "back.out(2)",
      })
    }
  }, [isHovering])

  return (
    <>
      {/* Flash Effect */}
      <div
        ref={flashRef}
        className="fixed pointer-events-none z-50 w-20 h-20 opacity-0"
        style={{
          left: mousePosition.x - 40,
          top: mousePosition.y - 40,
          background: `radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, rgba(34, 197, 94, 0.4) 50%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(4px)",
        }}
      />

      {/* Main Cursor Ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-40 w-10 h-10 border-2 border-lime-300/30 rounded-full transition-colors duration-300"
        style={{
          left: 0,
          top: 0,
        }}
      />

      {/* Inner Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-41 w-3 h-3 bg-lime-300/60 rounded-full"
        style={{
          left: 0,
          top: 0,
        }}
      />
    </>
  )
}

export default BouncyCursor
