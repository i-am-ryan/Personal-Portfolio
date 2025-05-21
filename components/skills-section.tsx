"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const technicalSkills = [
  { name: "Python", color: "#3776AB" },
  { name: "Java", color: "#f89820" },
  { name: "C#", color: "#68217A" },
  { name: "HTML5", color: "#E34F26" },
  { name: "CSS3", color: "#1572B6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "AWS", color: "#FF9900" },
  { name: "Google Cloud", color: "#4285F4" },
  { name: "React.js", color: "#61DAFB" },
  { name: "Flask", color: "#000000" },
  { name: "REST APIs", color: "#00BFFF" },
  { name: "Git", color: "#F05032" },
  { name: "GitHub", color: "#6e5494" },
  { name: "VS Code", color: "#007ACC" },
  { name: "Agile", color: "#009FDA" },
  { name: "DevOps", color: "#0078D7" },
  { name: "Linux", color: "#FCC624" },
  { name: "Windows", color: "#0078D6" },
  { name: "SQL", color: "#4479A1" },
  { name: "Firebase", color: "#FFCA28" },
  { name: "CI/CD", color: "#43853d" },
  { name: "Docker", color: "#2496ED" },
]

const softSkills = [
  "Problem-Solving & Critical Thinking",
  "Strong Communication & Collaboration",
  "Adaptability & Continuous Learning",
  "Time Management & Organization",
  "Attention to Detail",
  "Adaptability & Fast Learning",
  "Teamwork",
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
  const [constellationLines, setConstellationLines] = useState<
    { x1: number; y1: number; x2: number; y2: number; width: number; opacity: number }[]
  >([])

  // Set up constellation effect
  useEffect(() => {
    if (hoveredSkill === null || !isInView) {
      setConstellationLines([])
      return
    }

    const hoveredElement = skillsRef.current[hoveredSkill]
    if (!hoveredElement) return

    const hoveredRect = hoveredElement.getBoundingClientRect()
    const hoveredCenterX = hoveredRect.left + hoveredRect.width / 2
    const hoveredCenterY = hoveredRect.top + hoveredRect.height / 2

    const newLines = skillsRef.current
      .map((el, index) => {
        if (!el || index === hoveredSkill) return null

        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const distance = Math.sqrt(Math.pow(centerX - hoveredCenterX, 2) + Math.pow(centerY - hoveredCenterY, 2))

        // Only connect to nearby skills
        if (distance > 300) return null

        // Calculate line properties
        const width = Math.sqrt(Math.pow(centerX - hoveredCenterX, 2) + Math.pow(centerY - hoveredCenterY, 2))
        const angle = Math.atan2(centerY - hoveredCenterY, centerX - hoveredCenterX)

        return {
          x1: hoveredCenterX,
          y1: hoveredCenterY,
          x2: centerX,
          y2: centerY,
          width,
          angle: angle * (180 / Math.PI),
          opacity: 1 - distance / 300, // Fade out with distance
        }
      })
      .filter(Boolean) as { x1: number; y1: number; x2: number; y2: number; width: number; opacity: number }[]

    setConstellationLines(newLines)
  }, [hoveredSkill, isInView])

  return (
    <section className="space-section" id="skills">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center glow-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Technical Skills
          </h2>

          <div className="mb-12">
            <div className="relative">
              {/* Constellation lines */}
              {constellationLines.map((line, index) => (
                <div
                  key={`line-${index}`}
                  className="constellation-line"
                  style={{
                    left: `${line.x1}px`,
                    top: `${line.y1}px`,
                    width: `${line.width}px`,
                    transform: `rotate(${line.angle}deg)`,
                    opacity: line.opacity,
                  }}
                />
              ))}

              {/* Galaxy of skills as rockets */}
              <div className="flex flex-wrap justify-center gap-8 md:gap-10 py-8">
                {technicalSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    ref={(el) => (skillsRef.current[index] = el)}
                    className="rocket-skill flex flex-col items-center justify-center w-24 h-32 md:w-28 md:h-36"
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      y: 100,
                    }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.8,
                      delay: index * 0.05,
                    }}
                  >
                    <div className="rocket-body">
                      <div className="rocket-window"></div>
                      <div className="rocket-fins rocket-fin-left" style={{ "--fin-color": skill.color } as any}></div>
                      <div className="rocket-fins rocket-fin-right" style={{ "--fin-color": skill.color } as any}></div>
                      <div className="rocket-flame"></div>
                      <div className="rocket-smoke"></div>
                    </div>
                    <span className="text-white text-center font-medium text-sm mt-10">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-8 text-center glow-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Soft Skills
          </h2>

          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="flex items-center p-3 bg-blue-900/30 rounded-lg"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="mr-3 text-xl">✔</div>
                  <div className="text-blue-100">{skill}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Space station */}
      <div className="space-station" style={{ top: "20%", right: "10%" }}>
        <div className="station-body"></div>
        <div className="station-panel-left"></div>
        <div className="station-panel-right"></div>
      </div>
    </section>
  )
}
