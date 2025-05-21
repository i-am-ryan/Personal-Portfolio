"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const certifications = [
  "Google IT Automation with Python",
  "AWS Cloud Practitioner Essentials",
  "AWS Cloud Technical Essentials",
  "Architecting Solutions on AWS",
  "Python for Data Science, AI & Development – IBM",
  "Automating Real-World Tasks with Python",
  "Developing AI Applications with Python and Flask",
]

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  return (
    <section className="space-section" id="certifications">
      <div ref={sectionRef} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center glow-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Certifications
          </h2>

          <div className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-blue-500/30 shadow-[0_0_15px_rgba(79,70,229,0.3)] mb-8">
            <div className="grid grid-cols-1 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  className="flex items-center p-4 bg-blue-900/30 rounded-lg"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Award className="mr-3 text-blue-400" size={24} />
                  <span className="text-blue-100">{cert}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-900/30"
                onClick={() => window.open("https://github.com/i-am-ryan/Coursera-Certificates.git", "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Coursera Certificates
              </Button>

              <Button
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-900/30"
                onClick={() => window.open("https://github.com/i-am-ryan/Additional-Certificates.git", "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Additional Certificates
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div
        className="planet"
        style={
          {
            width: "70px",
            height: "70px",
            top: "15%",
            right: "20%",
            background: "radial-gradient(circle at 30% 30%, #10b981, #065f46)",
            "--orbit-radius": "60px",
            "--orbit-duration": "15s",
          } as any
        }
      >
        <div className="planet-ring" style={{ transform: "translate(-50%, -50%) rotateX(75deg) rotateZ(30deg)" }}></div>
      </div>
    </section>
  )
}
