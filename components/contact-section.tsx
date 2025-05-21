"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

  return (
    <section className="space-section" id="contact">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center glow-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Contact Me
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
              <h3 className="text-2xl font-bold mb-6 text-blue-300">Get In Touch</h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  <a
                    href="mailto:Musiyariraryan96@gmail.com"
                    className="text-blue-100 hover:text-blue-300 transition-colors"
                  >
                    Musiyariraryan96@gmail.com
                  </a>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-blue-400" />
                  <a href="tel:0835913418" className="text-blue-100 hover:text-blue-300 transition-colors">
                    0835913418
                  </a>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                  <span className="text-blue-100">Johannesburg, South Africa</span>
                </div>

                <div className="flex items-center">
                  <Linkedin className="h-5 w-5 mr-3 text-blue-400" />
                  <a href="#" className="text-blue-100 hover:text-blue-300 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>

                <div className="flex items-center">
                  <Github className="h-5 w-5 mr-3 text-blue-400" />
                  <a
                    href="https://github.com/i-am-ryan"
                    className="text-blue-100 hover:text-blue-300 transition-colors"
                  >
                    github.com/i-am-ryan
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-3 text-blue-200">Connect With Me</h4>
                <p className="text-blue-100">
                  I'm currently looking for internships and graduate roles in cloud engineering, DevOps, or software
                  development. Feel free to reach out!
                </p>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
              <h3 className="text-2xl font-bold mb-6 text-blue-300">Send a Message</h3>

              {isSubmitted ? (
                <div className="bg-blue-900/30 p-4 rounded-lg text-center">
                  <p className="text-blue-100 text-lg">Thank you for your message! I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-blue-200 mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-blue-900/20 border-blue-500/30 text-blue-100 placeholder:text-blue-300/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-blue-200 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      required
                      className="bg-blue-900/20 border-blue-500/30 text-blue-100 placeholder:text-blue-300/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-blue-200 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      required
                      className="bg-blue-900/20 border-blue-500/30 text-blue-100 placeholder:text-blue-300/50 min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-blue-200">© {new Date().getFullYear()} Ryan Musiyarira. All rights reserved.</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div
        className="planet"
        style={
          {
            width: "90px",
            height: "90px",
            bottom: "30%",
            right: "15%",
            background: "radial-gradient(circle at 30% 30%, #f59e0b, #92400e)",
            "--orbit-radius": "70px",
            "--orbit-duration": "18s",
          } as any
        }
      >
        <div className="planet-spots"></div>
        <div className="planet-craters"></div>
      </div>
    </section>
  )
}
