"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TestimonialSliderProps {
  testimonials: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
}

export function TestimonialSlider({
  testimonials,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!autoPlay || isPaused) return

    const timer = setInterval(() => {
      handleNext()
    }, interval)

    return () => clearInterval(timer)
  }, [currentIndex, autoPlay, interval, isPaused])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-[300px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full"
          >
            {testimonials[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {showArrows && testimonials.length > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-pink-200 hover:bg-pink-50 hover:border-pink-300"
            onClick={handlePrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-pink-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-pink-200 hover:bg-pink-50 hover:border-pink-300"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-pink-500" />
          </Button>
        </div>
      )}

      {showDots && testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex ? "bg-pink-500 w-5" : "bg-pink-200 hover:bg-pink-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

