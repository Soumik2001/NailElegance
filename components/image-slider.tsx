"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

interface ImageSliderProps {
  images: {
    src: string
    alt: string
    title?: string
  }[]
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  className?: string
  aspectRatio?: "square" | "video" | "wide" | "custom"
  height?: string | number
}

export function ImageSlider({
  images,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  className = "",
  aspectRatio = "square",
  height,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const isMobile = useMobile()

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "video":
        return "aspect-video"
      case "wide":
        return "aspect-[16/9]"
      case "custom":
        return ""
      default:
        return "aspect-square"
    }
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
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
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  return (
    <div
      className={`relative overflow-hidden ${className} ${!height ? getAspectRatioClass() : ""}`}
      style={height ? { height } : {}}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
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
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex].src || "/placeholder.svg"}
              alt={images[currentIndex].alt}
              fill
              className="object-cover"
              priority={currentIndex === 0}
            />
            {images[currentIndex].title && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white font-medium">{images[currentIndex].title}</h3>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {showArrows && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full z-10 shadow-md"
            onClick={handlePrevious}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-pink-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full z-10 shadow-md"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-pink-500" />
          </Button>
        </>
      )}

      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex ? "bg-pink-500 w-5" : "bg-white/70 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

