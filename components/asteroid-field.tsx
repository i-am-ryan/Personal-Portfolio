"use client"

import { useEffect, useRef, useState } from "react"

interface Asteroid {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  speedX: number
  speedY: number
  originalX: number
  originalY: number
  vertices: number
  roughness: number
  color: string
  glow: boolean
}

export default function AsteroidField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 })
  const [asteroids, setAsteroids] = useState<Asteroid[]>([])
  const animationFrameRef = useRef<number>(0)
  const isInitializedRef = useRef(false)

  // Initialize asteroids
  useEffect(() => {
    if (isInitializedRef.current) return
    isInitializedRef.current = true

    const canvas = canvasRef.current
    if (!canvas) return

    const generateAsteroids = () => {
      const newAsteroids: Asteroid[] = []
      const count = Math.min((window.innerWidth * window.innerHeight) / 15000, 50)

      for (let i = 0; i < count; i++) {
        const size = 5 + Math.random() * 20
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight

        newAsteroids.push({
          x,
          y,
          size,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          originalX: x,
          originalY: y,
          vertices: Math.floor(5 + Math.random() * 4),
          roughness: 0.2 + Math.random() * 0.4,
          color: getAsteroidColor(),
          glow: Math.random() > 0.7,
        })
      }

      setAsteroids(newAsteroids)
    }

    const getAsteroidColor = () => {
      const colors = [
        "#8B7D6B", // Brown
        "#A9A9A9", // Dark Gray
        "#696969", // Dim Gray
        "#808080", // Gray
        "#D3D3D3", // Light Gray
        "#A0522D", // Sienna
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    generateAsteroids()

    const handleResize = () => {
      generateAsteroids()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    const drawAsteroid = (asteroid: Asteroid) => {
      ctx.save()
      ctx.translate(asteroid.x, asteroid.y)
      ctx.rotate(asteroid.rotation)

      // Add glow effect for some asteroids
      if (asteroid.glow) {
        ctx.shadowBlur = 10
        ctx.shadowColor = "rgba(255, 255, 255, 0.3)"
      }

      // Draw asteroid with irregular shape
      ctx.beginPath()

      for (let i = 0; i < asteroid.vertices; i++) {
        const angle = (i / asteroid.vertices) * Math.PI * 2
        const radius = asteroid.size * (1 - asteroid.roughness + Math.random() * asteroid.roughness * 2)
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.closePath()

      // Create a gradient for more realistic look
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, asteroid.size)
      gradient.addColorStop(0, asteroid.color)
      gradient.addColorStop(1, shadeColor(asteroid.color, -30))

      ctx.fillStyle = gradient
      ctx.fill()

      // Add some texture/craters
      const craterCount = Math.floor(asteroid.size / 3)
      for (let i = 0; i < craterCount; i++) {
        const craterX = (Math.random() - 0.5) * asteroid.size * 1.5
        const craterY = (Math.random() - 0.5) * asteroid.size * 1.5
        const craterSize = asteroid.size * 0.1 + Math.random() * asteroid.size * 0.1

        ctx.beginPath()
        ctx.arc(craterX, craterY, craterSize, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
        ctx.fill()
      }

      ctx.restore()
    }

    // Helper function to darken/lighten colors
    const shadeColor = (color: string, percent: number) => {
      let R = Number.parseInt(color.substring(1, 3), 16)
      let G = Number.parseInt(color.substring(3, 5), 16)
      let B = Number.parseInt(color.substring(5, 7), 16)

      R = Math.min(255, Math.max(0, R + percent))
      G = Math.min(255, Math.max(0, G + percent))
      B = Math.min(255, Math.max(0, B + percent))

      const RR = R.toString(16).padStart(2, "0")
      const GG = G.toString(16).padStart(2, "0")
      const BB = B.toString(16).padStart(2, "0")

      return `#${RR}${GG}${BB}`
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const updatedAsteroids = [...asteroids]

      updatedAsteroids.forEach((asteroid, index) => {
        // Update position
        asteroid.x += asteroid.speedX
        asteroid.y += asteroid.speedY

        // Wrap around screen edges
        if (asteroid.x < -asteroid.size) asteroid.x = canvas.width + asteroid.size
        if (asteroid.x > canvas.width + asteroid.size) asteroid.x = -asteroid.size
        if (asteroid.y < -asteroid.size) asteroid.y = canvas.height + asteroid.size
        if (asteroid.y > canvas.height + asteroid.size) asteroid.y = -asteroid.size

        // Update rotation
        asteroid.rotation += asteroid.rotationSpeed

        // React to mouse position
        const dx = mousePosition.x - asteroid.x
        const dy = mousePosition.y - asteroid.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const repelRadius = 150

        if (distance < repelRadius) {
          const force = (repelRadius - distance) / repelRadius
          const angle = Math.atan2(dy, dx)

          // Push asteroid away from mouse
          asteroid.x -= Math.cos(angle) * force * 2
          asteroid.y -= Math.sin(angle) * force * 2

          // Add some rotation based on mouse interaction
          asteroid.rotationSpeed += (Math.random() - 0.5) * 0.01 * force
        } else {
          // Slowly return to original position when not affected by mouse
          asteroid.x += (asteroid.originalX - asteroid.x) * 0.001
          asteroid.y += (asteroid.originalY - asteroid.y) * 0.001

          // Normalize rotation speed over time
          asteroid.rotationSpeed *= 0.99
        }

        // Draw the asteroid
        drawAsteroid(asteroid)

        updatedAsteroids[index] = asteroid
      })

      setAsteroids(updatedAsteroids)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [asteroids, mousePosition])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-5" />
}
