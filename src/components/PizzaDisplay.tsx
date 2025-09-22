import React, { useState, useEffect } from 'react'

interface Pizza {
  id: number
  name: string
  description: string
  image: string
  thumbnail: string
}

interface PizzaDisplayProps {
  pizzas: Pizza[]
  currentIndex: number
  onPizzaSelect: (index: number) => void
  isChanging?: boolean
}

const PizzaDisplay: React.FC<PizzaDisplayProps> = ({ pizzas, currentIndex, onPizzaSelect, isChanging = false }) => {
  const [isRotating, setIsRotating] = useState(false)

  const currentPizza = pizzas[currentIndex]

  const handlePizzaClick = () => {
    setIsRotating(true)
    setTimeout(() => setIsRotating(false), 800)
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const handleThumbnailClick = (index: number) => {
    if (index !== currentIndex) {
      setIsRotating(true)
      setTimeout(() => setIsRotating(false), 800)
      onPizzaSelect(index)
    }
  }

  return (
    <div className="relative flex justify-center items-center">
      {/* Main Pizza Container */}
      <div className="relative w-[450px] h-[450px] flex justify-center items-center">
        {/* Background Circle */}
        <div className="absolute w-[400px] h-[400px] bg-white/15 rounded-full backdrop-blur-20 animate-rotate-slow border border-white/20 shadow-pizza">
          <div className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-60 animate-pulse"></div>
        </div>

        {/* Main Pizza Image */}
        <img
          src={currentPizza.image}
          alt={currentPizza.name}
          className={`relative w-[360px] h-[360px] rounded-full object-cover shadow-pizza transition-all duration-500 z-10 border-4 border-white/80 cursor-pointer ${
            isRotating ? 'animate-pizza-rotate' : ''
          } ${isChanging ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          onClick={handlePizzaClick}
        />

        {/* Floating Pizza Images */}
        <div className="absolute w-full h-full pointer-events-none">
          {pizzas.length > 1 && (
            <>
              <img
                src={pizzas[(currentIndex + 1) % pizzas.length].image}
                alt="پیتزا شناور ۱"
                className="absolute top-[-20px] right-[-30px] w-[120px] h-[120px] rounded-full object-cover shadow-lg animate-float"
              />
              {pizzas.length > 2 && (
                <img
                  src={pizzas[(currentIndex + 2) % pizzas.length].image}
                  alt="پیتزا شناور ۲"
                  className="absolute bottom-[-20px] right-[-30px] w-[120px] h-[120px] rounded-full object-cover shadow-lg animate-float"
                  style={{ animationDelay: '3s' }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PizzaDisplay
