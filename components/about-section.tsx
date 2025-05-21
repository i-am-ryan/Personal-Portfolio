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
              A motivated, skilled, technically adept final-year Information Systems student with a strong foundation in
              software development, web development, cloud computing, IT automation, DevOps practices and multiple
              programming languages (Python, Java, C#, HTML, CSS, and JavaScript). My foundation demonstrates skills
              expertise in cloud services, scripting, and DevOps practices. Passionate about leveraging technology to
              solve real-world problems, looking to contribute to an innovative IT team and grow my skills. Strong
              problem-solving abilities, teamwork, and adaptability in fast-paced environments.
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
