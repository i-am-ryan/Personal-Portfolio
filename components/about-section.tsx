"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  return (
    <section className="space-section" id="about">
      <div ref={sectionRef} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center glow-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Professional Summary
          </h2>

          <div className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-blue-500/30 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all duration-500">
            <p className="text-lg leading-relaxed text-blue-100">
           Ambitious and solutions-driven final-year BCom Information Systems student at the University of Johannesburg, specializing in full-stack web development, cloud computing (AWS), and IT automation. Certified in Google IT Automation, AWS, and Python for Data Science. Proven experience building real-world digital solutions including an AI-powered food security platform. Strong collaborator and problem-solver, eager to contribute to innovation-focused teams within the banking or tech sector.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div
        className="planet"
        style={
          {
            width: "80px",
            height: "80px",
            top: "30%",
            right: "15%",
            background: "radial-gradient(circle at 30% 30%, #06b6d4, #0e7490)",
            "--orbit-radius": "100px",
            "--orbit-duration": "20s",
          } as any
        }
      >
        <div className="planet-craters"></div>
      </div>
    </section>
  )
}
