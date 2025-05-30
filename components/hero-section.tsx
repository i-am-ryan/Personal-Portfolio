"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return

      const { clientX, clientY } = e
      const { width, height, left, top } = sectionRef.current.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      sectionRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("mousemove", handleMouseMove)
      return () => {
        section.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <section className="space-section relative overflow-hidden">
      <div
        ref={sectionRef}
        className="max-w-4xl mx-auto text-center transition-transform duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="floating"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Ryan Musiyarira
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-200">Tech-Driven IS Student</p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-blue-500/30">
              📍 Johannesburg, South Africa
            </div>
            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-blue-500/30">
              📧 Musiyariraryan96@gmail.com
            </div>
          </div>

          <div className="relative inline-block group">
            <Button
              size="lg"
              variant="default"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={scrollToNext}
            >
              Explore My Universe
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          </div>
        </motion.div>
      </div>

      {/* Decorative planets */}
      <div
        className="planet"
        style={
          {
            width: "100px",
            height: "100px",
            top: "20%",
            left: "10%",
            background: "radial-gradient(circle at 30% 30%, #4f46e5, #1e1b4b)",
            "--orbit-radius": "0px",
            "--orbit-duration": "30s",
          } as any
        }
      >
        <div className="planet-spots"></div>
      </div>
      <div
        className="planet"
        style={
          {
            width: "150px",
            height: "150px",
            bottom: "15%",
            right: "10%",
            background: "radial-gradient(circle at 30% 30%, #7c3aed, #2e1065)",
            "--orbit-radius": "0px",
            "--orbit-duration": "40s",
          } as any
        }
      >
        <div className="planet-ring"></div>
      </div>
    </section>
  )
}
