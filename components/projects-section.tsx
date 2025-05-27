"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Github, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const projects = [

  {
    title: "Portfolio Website",
    description: "Personal portfolio website showcasing projects, skills, and achievements.",
    link: "https://personal-portfolio-gray-alpha-31.vercel.app/",
    icon: <Code className="h-12 w-12 text-blue-400" />,
  },
   {
    title: "My Photography Business",
    description: "Personal Photography website Where you can book a session with me and my Team.",
    link: "https://photography-business.vercel.app/",
    icon: <Code className="h-12 w-12 text-purple-400" />,
  },
  {
    title: "E-commerce Website Harvest Hope",
    description: "Harvest Hope  An AI-driven food security web app for connecting surplus food donors with communities in need, featuring crop and meal planners to reduce waste.",
   link: "https://harvest-hope-web.vercel.app/",
    icon: <Code className="h-12 w-12 text-purple-400" />,
  },
  {
    title: "Simple Python Games",
    description:
      "Collection of interactive games built with Python, showcasing programming fundamentals and game logic.",
    link: "https://github.com/i-am-ryan/Python-projects.git",
    icon: <Code className="h-12 w-12 text-blue-400" />,
  },
  {
    title: "Python Automation Scripts",
    description: "Scripts to automate IT tasks, improving efficiency and reducing manual work.",
    link: "https://github.com/i-am-ryan/Python-Automation-Projects.git",
    icon: <Code className="h-12 w-12 text-purple-400" />,
  },
  {
    title: "Personal Finance Tracker",
    description: "Application to track personal finances, manage budgets, and visualize spending patterns.",
    link: "https://github.com/i-am-ryan/Personal-finance-tracker-.git",
    icon: <Code className="h-12 w-12 text-green-400" />,
  },

  {
    title: "Slot Machine Game",
    description: "A fully interactive terminal-based slot machine game built in Python",
    link: "https://github.com/i-am-ryan/Slot-Machine.git",
    icon: <Code className="h-12 w-12 text-blue-400" />,
  },

]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  return (
    <section className="space-section" id="projects">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center glow-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Projects & Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-black/60 border-blue-500/30 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all duration-500 h-full flex flex-col">
                  <CardHeader>
                    <div className="mb-4">{project.icon}</div>
                    <CardTitle className="text-xl text-blue-300">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-blue-100 text-base">{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500 text-blue-400 hover:bg-blue-900/30"
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative planet */}
      <div
        className="planet"
        style={
          {
            width: "110px",
            height: "110px",
            top: "60%",
            left: "5%",
            background: "radial-gradient(circle at 30% 30%, #8b5cf6, #4c1d95)",
            "--orbit-radius": "50px",
            "--orbit-duration": "22s",
          } as any
        }
      >
        <div
          className="planet-ring"
          style={{ transform: "translate(-50%, -50%) rotateX(75deg) rotateZ(-20deg)" }}
        ></div>
        <div className="planet-spots"></div>
      </div>
    </section>
  )
}
