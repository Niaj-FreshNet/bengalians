"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"

interface BannerProps {
  heading: string
  text: string
  buttonText: string
  link: string
  images: {
    mobile: string
    tablet?: string
    desktop: string
  }
  variant?: "light" | "dark" | "minimal"
  textPosition?: "left" | "center" | "right"
  showScrollIndicator?: boolean
}

export function BannerSection({
  heading,
  text,
  buttonText,
  link,
  images,
  variant = "dark",
  textPosition = "left",
  showScrollIndicator = true
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getVariantStyles = () => {
    switch (variant) {
      case "light":
        return {
          overlay: "bg-white/40 backdrop-blur-sm",
          heading: "text-gray-900",
          text: "text-gray-700",
          button: "bg-gray-900 text-white hover:bg-gray-800",
          indicator: "text-gray-900"
        }
      case "minimal":
        return {
          overlay: "bg-gradient-to-r from-black/60 via-black/40 to-transparent",
          heading: "text-white",
          text: "text-gray-100",
          button: "bg-white text-gray-900 hover:bg-gray-100",
          indicator: "text-white"
        }
      default: // dark (handles 'primary', 'secondary', 'tertiary' from old component)
        return {
          overlay: "bg-gradient-to-r from-black/70 via-black/50 to-transparent",
          heading: "text-white",
          text: "text-gray-200",
          button: "bg-white text-gray-900 hover:bg-gray-100",
          indicator: "text-white"
        }
    }
  }

  const getTextAlignment = () => {
    switch (textPosition) {
      case "center":
        return "items-center text-center"
      case "right":
        return "items-end text-right"
      default:
        return "items-start text-left"
    }
  }

  const styles = getVariantStyles()

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden mt-4 mb-8">
      {/* Background Images - Fixed, No Parallax */}
      <div className="absolute inset-0">
        {/* Mobile */}
        <div className="absolute inset-0 block md:hidden">
          <img
            src={images.mobile || "/placeholder.svg"}
            alt={heading}
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Tablet */}
        <div className="absolute inset-0 hidden md:block lg:hidden">
          <img
            src={images.tablet || images.desktop}
            alt={heading}
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Desktop */}
        <div className="absolute inset-0 hidden lg:block">
          <img
            src={images.desktop}
            alt={heading}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Overlay */}
      <div className={`absolute inset-0 ${styles.overlay}`} />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content Container */}
      <div className="relative h-full flex items-center px-6 sm:px-12 lg:px-20 xl:px-32">
        <div className={`max-w-7xl w-full mx-auto flex flex-col ${getTextAlignment()} space-y-6 md:space-y-8`}>
          
          {/* Heading */}
          <h1
            className={`
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
              font-light tracking-tight leading-[1.1]
              transition-all duration-1000 delay-100
              ${styles.heading}
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
            `}
          >
            {heading.split(" ").map((word, index) => (
              <span 
                key={index}
                className="inline-block"
                style={{
                  animation: isVisible ? `fadeSlideUp 0.8s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                {word}
                {index < heading.split(" ").length - 1 && " "}
              </span>
            ))}
          </h1>

          {/* Subtitle Text */}
          {text && (
            <p
              className={`
                text-base sm:text-lg md:text-xl lg:text-2xl 
                font-light max-w-2xl leading-relaxed
                transition-all duration-1000 delay-300
                ${styles.text}
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              `}
            >
              {text}
            </p>
          )}

          {/* CTA Button */}
          <div
            className={`
              transition-all duration-1000 delay-500
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
            `}
          >
            <a
              href={link}
              className={`
                inline-flex items-center gap-3 px-8 py-4 
                text-sm md:text-base font-medium tracking-wide uppercase
                transition-all duration-300 ease-out
                transform hover:scale-105 hover:gap-4
                ${styles.button}
                group
              `}
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div
          className={`
            absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2
            transition-all duration-1000 delay-700
            ${styles.indicator}
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs uppercase tracking-widest opacity-60">Scroll</span>
            <ChevronDown className="w-5 h-5 opacity-60" />
          </div>
        </div>
      )}

      {/* Edge Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/10 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/10 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
