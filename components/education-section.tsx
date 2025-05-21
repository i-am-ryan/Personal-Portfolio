"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Calendar } from "lucide-react"

export default function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  return (
    <section className="space-section" id="education">
      <div ref={sectionRef} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center glow-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Education
          </h2>

          <motion.div
            className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-blue-500/30 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all duration-500"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-blue-600/20 p-4 rounded-full">
                <GraduationCap size={40} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-300">Bachelor of Commerce in Information Systems</h3>
                <p className="text-xl text-blue-100 mb-2">University of Johannesburg, South Africa</p>
                <div className="flex items-center text-blue-200">
                  <Calendar size={16} className="mr-2" />
                  <span>Graduation: 2025</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div
        className="planet"
        style={
          {
            width: "120px",
            height: "120px",
            bottom: "20%",
            left: "10%",
            background: "radial-gradient(circle at 30% 30%, #ec4899, #831843)",
            "--orbit-radius": "80px",
            "--orbit-duration": "25s",
          } as any
        }
      >
        <div className="planet-spots"></div>
        <div className="planet-craters"></div>
      </div>
    </section>
  )
}
