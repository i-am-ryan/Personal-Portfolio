"use client"

import { useEffect, useState } from "react"

export default function CometEffect() {
  const [cometPosition, setCometPosition] = useState({ x: -100, y: -100 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Randomly show a comet every 8-15 seconds
    const showComet = () => {
      // Determine random start position (top or right edge)
      const startFromTop = Math.random() > 0.5

      let startX, startY

      if (startFromTop) {
        startX = Math.random() * window.innerWidth
        startY = -20
      } else {
        startX = window.innerWidth + 20
        startY = Math.random() * (window.innerHeight / 2) // Only in top half
      }

      setCometPosition({ x: startX, y: startY })
      setIsVisible(true)

      // Animate comet
      let currentX = startX
      let currentY = startY
      const endX = startFromTop ? -100 : -100
      const endY = startFromTop ? window.innerHeight + 100 : window.innerHeight + 100

      const speedX = startFromTop ? -3 - Math.random() * 2 : -5 - Math.random() * 3
      const speedY = startFromTop ? 5 + Math.random() * 3 : 3 + Math.random() * 2

      const animateComet = () => {
        currentX += speedX
        currentY += speedY

        setCometPosition({ x: currentX, y: currentY })

        if (currentX > endX && currentY < endY) {
          requestAnimationFrame(animateComet)
        } else {
          setIsVisible(false)
        }
      }

      requestAnimationFrame(animateComet)
    }

    // Initial delay before first comet
    const initialDelay = setTimeout(() => {
      showComet()

      // Set up interval for recurring comets
      const interval = setInterval(
        () => {
          showComet()
        },
        8000 + Math.random() * 7000,
      ) // Random interval between 8-15 seconds

      return () => clearInterval(interval)
    }, 3000)

    return () => clearTimeout(initialDelay)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="comet"
      style={{
        left: `${cometPosition.x}px`,
        top: `${cometPosition.y}px`,
      }}
    />
  )
}
