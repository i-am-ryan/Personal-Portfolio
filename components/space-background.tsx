"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create stars
    const stars: { x: number; y: number; radius: number; speed: number; opacity: number; twinkleSpeed: number }[] = []
    const createStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 800)

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          speed: Math.random() * 0.5,
          opacity: Math.random(),
          twinkleSpeed: 0.003 + Math.random() * 0.015,
        })
      }
    }

    createStars()

    // Create shooting stars
    const shootingStars: {
      x: number
      y: number
      length: number
      speed: number
      opacity: number
      active: boolean
      delay: number
    }[] = []
    const createShootingStars = () => {
      for (let i = 0; i < 5; i++) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: 80 + Math.random() * 120,
          speed: 10 + Math.random() * 20,
          opacity: 0,
          active: false,
          delay: Math.random() * 200,
        })
      }
    }

    createShootingStars()

    // Create nebula
    const nebulae: { x: number; y: number; radius: number; color: string; opacity: number }[] = []
    const createNebulae = () => {
      const colors = [
        "rgba(111, 66, 193, 0.1)",
        "rgba(79, 70, 229, 0.1)",
        "rgba(59, 130, 246, 0.1)",
        "rgba(236, 72, 153, 0.1)",
      ]
      for (let i = 0; i < 3; i++) {
        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 100 + Math.random() * 200,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.05 + Math.random() * 0.1,
        })
      }
    }

    createNebulae()

    // Animation
    let lastScrollY = window.scrollY
    let animationFrameId: number
    let time = 0
    let shootingStarTimer = 0

    const animate = () => {
      time += 0.01
      shootingStarTimer++

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw nebulae
      nebulae.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)
        gradient.addColorStop(0, nebula.color.replace("0.1", `${nebula.opacity}`))
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Calculate parallax effect based on scroll
      const scrollDiff = window.scrollY - lastScrollY
      lastScrollY = window.scrollY

      // Draw stars with parallax effect
      stars.forEach((star) => {
        star.y -= star.speed + scrollDiff * 0.05 * star.speed
        star.opacity = 0.2 + Math.abs(Math.sin(time * star.twinkleSpeed * 10)) * 0.8

        // Reset star position if it goes off screen
        if (star.y < -10) {
          star.y = canvas.height + 10
          star.x = Math.random() * canvas.width
        } else if (star.y > canvas.height + 10) {
          star.y = -10
          star.x = Math.random() * canvas.width
        }

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
      })

      // Draw shooting stars
      if (shootingStarTimer > 200) {
        const inactiveStar = shootingStars.find((star) => !star.active && star.delay <= 0)
        if (inactiveStar) {
          inactiveStar.x = Math.random() * canvas.width
          inactiveStar.y = 0
          inactiveStar.active = true
          inactiveStar.opacity = 1
          shootingStarTimer = 0
        }
      }

      shootingStars.forEach((star) => {
        if (star.delay > 0) {
          star.delay--
          return
        }

        if (star.active) {
          star.y += star.speed
          star.x += star.speed * 0.3

          if (star.y > canvas.height || star.x > canvas.width) {
            star.active = false
            star.opacity = 0
            star.delay = Math.random() * 200
            return
          }

          ctx.beginPath()
          ctx.moveTo(star.x, star.y)
          ctx.lineTo(star.x - star.length * 0.3, star.y - star.length)
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}
