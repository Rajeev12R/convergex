"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface TorchCursorProps {
  mousePosition: { x: number; y: number }
  isHovering: boolean
}

const TorchCursor = ({ mousePosition, isHovering }: TorchCursorProps) => {
  const torchRef = useRef<HTMLDivElement>(null)
  const innerLightRef = useRef<HTMLDivElement>(null)
  const outerGlowRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!torchRef.current || !innerLightRef.current || !outerGlowRef.current || !flashRef.current) return

    const torch = torchRef.current
    const innerLight = innerLightRef.current
    const outerGlow = outerGlowRef.current
    const flash = flashRef.current

    // Smooth cursor following with GSAP
    gsap.to(torch, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.1,
      ease: "power2.out",
    })

    gsap.to(innerLight, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.15,
      ease: "power2.out",
    })

    gsap.to(outerGlow, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.2,
      ease: "power2.out",
    })
  }, [mousePosition])

  useEffect(() => {
    if (!torchRef.current || !innerLightRef.current || !outerGlowRef.current || !flashRef.current) return

    const torch = torchRef.current
    const innerLight = innerLightRef.current
    const outerGlow = outerGlowRef.current
    const flash = flashRef.current

    if (isHovering) {
      // Torch activation animation
      gsap
        .timeline()
        .to(flash, {
          opacity: 0.8,
          scale: 1.5,
          duration: 0.1,
          ease: "power2.out",
        })
        .to(flash, {
          opacity: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          torch,
          {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          0,
        )
        .to(
          innerLight,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0.1,
        )
        .to(
          outerGlow,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          0.2,
        )

      // Subtle flickering effect
      gsap.to(innerLight, {
        opacity: 0.8,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    } else {
      // Torch deactivation
      gsap
        .timeline()
        .to([torch, innerLight, outerGlow], {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.inOut",
        })
        .to(
          flash,
          {
            opacity: 0,
            scale: 1,
            duration: 0.1,
          },
          0,
        )
    }
  }, [isHovering])

  return (
    <>
      {/* Flash Effect */}
      <div
        ref={flashRef}
        className="fixed pointer-events-none z-50 opacity-0"
        style={{
          left: -100,
          top: -100,
          width: 200,
          height: 200,
          background: `radial-gradient(circle, rgba(34, 197, 94, 0.6) 0%, rgba(34, 197, 94, 0.3) 30%, rgba(34, 197, 94, 0.1) 60%, transparent 80%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(2px)",
        }}
      />

      {/* Main Torch Effect */}
      <div
        ref={torchRef}
        className="fixed pointer-events-none z-40 opacity-0"
        style={{
          left: -150,
          top: -150,
          width: 300,
          height: 300,
          background: `radial-gradient(circle, transparent 0%, transparent 35%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.9) 70%, rgba(0, 0, 0, 0.95) 85%, rgba(0, 0, 0, 0.98) 100%)`,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Inner Light */}
      <div
        ref={innerLightRef}
        className="fixed pointer-events-none z-30 opacity-0"
        style={{
          left: -120,
          top: -120,
          width: 240,
          height: 240,
          background: `radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, rgba(34, 197, 94, 0.15) 40%, rgba(34, 197, 94, 0.08) 60%, rgba(34, 197, 94, 0.03) 80%, transparent 100%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(1px)",
        }}
      />

      {/* Outer Glow */}
      <div
        ref={outerGlowRef}
        className="fixed pointer-events-none z-20 opacity-0"
        style={{
          left: -200,
          top: -200,
          width: 400,
          height: 400,
          background: `radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 30%, rgba(34, 197, 94, 0.02) 50%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(3px)",
        }}
      />
    </>
  )
}

export default TorchCursor
