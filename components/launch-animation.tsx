"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function LaunchAnimation() {
  const [countdown, setCountdown] = useState(3)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }

    // Hide animation after rocket launch completes
    if (countdown === 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  if (!isVisible) return null

  return (
    <div className="launch-animation" style={{ opacity: countdown === 0 ? 0.9 : 1 }}>
      {countdown > 0 ? (
        <motion.div
          className="launch-countdown glow-text"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          key={countdown}
        >
          {countdown}
        </motion.div>
      ) : (
        <>
          <div className="launch-rocket">
            <div className="rocket-body">
              <div className="rocket-window"></div>
              <div className="rocket-fins rocket-fin-left" style={{ "--fin-color": "#ef4444" } as any}></div>
              <div className="rocket-fins rocket-fin-right" style={{ "--fin-color": "#ef4444" } as any}></div>
              <div className="rocket-flame" style={{ height: "60px" }}></div>
            </div>
          </div>
          <div className="launch-text glow-text">LAUNCHING PORTFOLIO</div>
        </>
      )}
    </div>
  )
}
