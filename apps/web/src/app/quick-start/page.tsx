"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    {
      id: 1,
      title: "Welcome to Converge-X",
      description:
        "Transform your meetings from flat video grids into immersive 3D spaces. Navigate your avatar through interactive environments designed for seamless collaboration.",
      tip: "No VR headset required - everything works in your browser with intuitive controls",
    },
    {
      id: 2,
      title: "Join Your Space",
      description:
        "Enter meeting rooms as customizable avatars. Move freely through low-poly environments designed to reduce meeting fatigue and increase engagement.",
      tip: "Simply click 'Launch Mission' below to sign in and enter your virtual workspace instantly",
    },
    {
      id: 3,
      title: "Navigate & Interact",
      description:
        "Use arrow keys or WASD to explore 23+ interactive objects. Teleport instantly to whiteboards, sit on benches for casual chats, or use coffee machines for private conversations.",
      tip: "One-click teleportation moves entire teams to collaboration zones like 'Whiteboard Mode'",
    },
    {
      id: 4,
      title: "Communicate Naturally",
      description:
        "Experience spatial audio where conversations feel natural. Screen sharing works seamlessly within the 3D environment, making presentations more engaging than traditional video calls.",
      tip: "Your voice adapts to proximity - closer avatars hear you clearly, distant ones hear ambient sound",
    },
    {
      id: 5,
      title: "AI-Powered Productivity",
      description:
        "Never miss important details with automated meeting summaries and transcript analysis. AI identifies action items and provides comprehensive briefings for absent team members.",
      tip: "Built for teams of 50+ concurrent users with enterprise-grade performance and reliability",
    },
  ]

  // Auto-advance steps
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev >= 5 ? 1 : prev + 1
        if (prev < 5) {
          setCompletedSteps((prevCompleted) =>
            prevCompleted.includes(prev)
              ? prevCompleted
              : [...prevCompleted, prev]
          )
        }
        return next
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentStepData = steps.find((step) => step.id === currentStep)

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId)
    setIsAutoPlaying(false)
    // Mark all previous steps as completed
    const newCompleted = Array.from({ length: stepId - 1 }, (_, i) => i + 1)
    setCompletedSteps(newCompleted)
  }
  return (
    <div className="bg-foreground h-screen w-screen flex items-center justify-center p-10 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative w-full h-full flex flex-col justify-between px-6 py-4 text-background z-30">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-lime-300 to-transparent" />
            <h1 className="text-4xl md:text-5xl uppercase tracking-widest font-heading text-lime-300 font-bold">
              Quick Start Guide
            </h1>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-lime-300 to-transparent" />
          </div>
          <div className="flex items-center justify-center gap-3 text-lime-300/70 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-lime-300 rounded-full animate-pulse" />
              <span className="font-medium">Get Started in 5 Simple Steps</span>
            </div>
            <div className="w-px h-3 bg-lime-300/30" />
            <div className="font-mono">
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </div>

        {/* Progress Navigation */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 bg-black/30 rounded-full px-6 py-3 border border-lime-300/20">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => handleStepClick(step.id)}
                  className={`relative group transition-all duration-300 ${
                    currentStep === step.id ? "scale-110" : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                      currentStep === step.id
                        ? "bg-lime-300 text-black shadow-md"
                        : completedSteps.includes(step.id)
                        ? "bg-lime-300/30 text-lime-300 border border-lime-300/50"
                        : "bg-black/40 text-lime-300/60 hover:bg-lime-300/10 hover:text-lime-300 border border-lime-300/30"
                    }`}
                  >
                    {completedSteps.includes(step.id) ? "✓" : step.id}
                  </div>
                </button>

                {/* Progress Connector */}
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 rounded-full transition-all duration-300 ${
                      completedSteps.includes(step.id) || currentStep > step.id
                        ? "bg-lime-300"
                        : "bg-lime-300/20"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl w-full">
            {/* Step Content Card */}
            <div className="bg-black/20 border border-lime-300/20 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-center space-y-4">
                {/* Step Icon & Title */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-3xl font-bold text-lime-300">
                    {currentStepData?.title}
                  </div>
                </div>

                {/* Step Description */}
                <div className="max-w-3xl mx-auto">
                  <p className="text-lg text-lime-100 leading-relaxed mb-4">
                    {currentStepData?.description}
                  </p>
                </div>

                {/* Tip Box */}
                <div className="bg-black/30 border border-lime-300/30 rounded-lg p-4 max-w-2xl mx-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-lime-300 rounded-full flex items-center justify-center text-black text-xs font-bold flex-shrink-0">
                      💡
                    </div>
                    <div className="text-left">
                      <div className="text-lime-300 font-semibold text-sm mb-1">
                        Key Feature
                      </div>
                      <p className="text-lime-200 text-sm leading-relaxed">
                        {currentStepData?.tip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div className="flex flex-col items-center gap-3 mb-4">
          <button className="group relative px-12 py-3 bg-lime-300 text-black font-semibold text-lg rounded-xl hover:bg-lime-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
            <span className="relative z-10 flex items-center gap-2">
              🚀 Launch Converge-X
            </span>
          </button>

          <div className="text-center space-y-2">
            <p className="text-lime-300/80 text-sm">
              Ready to transform your meetings? Get started in under a minute.
            </p>
            <Link
              href="https://discord.gg/your-server"
              className="inline-flex items-center gap-2 text-lime-300 hover:text-lime-200 transition-colors duration-300 text-sm group"
            >
              <span>💬</span>
              Join our Community
              <span className="text-xs opacity-70 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom Control Panel */}
        <div className="flex justify-between items-center bg-black/20 rounded-lg px-4 py-3 w-[50vw] mx-auto border border-lime-300/20">
          <button
            onClick={() => {
              setCurrentStep((prev) => (prev > 1 ? prev - 1 : 1))
              setIsAutoPlaying(false)
            }}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 bg-lime-300/10 text-lime-300 rounded-md hover:bg-lime-300/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 text-sm"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2 rounded-md transition-all duration-300 text-sm ${
                isAutoPlaying
                  ? "bg-lime-300/20 text-lime-300 border border-lime-300/50"
                  : "bg-black/30 text-lime-300/70 hover:text-lime-300 hover:bg-lime-300/10"
              }`}
            >
              {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>

            <div className="text-lime-300/70 font-mono text-sm">
              {currentStep}/{steps.length}
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentStep((prev) => (prev < 5 ? prev + 1 : 5))
              setIsAutoPlaying(false)
              if (currentStep < 5) {
                setCompletedSteps((prev) =>
                  prev.includes(currentStep) ? prev : [...prev, currentStep]
                )
              }
            }}
            disabled={currentStep === 5}
            className="flex items-center gap-2 px-4 py-2 bg-lime-300/10 text-lime-300 rounded-md hover:bg-lime-300/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 text-sm"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
export default Page
