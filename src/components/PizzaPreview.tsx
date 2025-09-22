import React, { useState } from 'react'
import { PizzaState } from '../types/pizza'

interface PizzaPreviewProps {
  pizza: PizzaState
  onToppingRemove?: (toppingId: string) => void
  onDrop?: (e: React.DragEvent) => void
  showToppings?: boolean
}

const PizzaPreview: React.FC<PizzaPreviewProps> = ({ pizza, onToppingRemove, onDrop, showToppings = true }) => {
  const [isRotating, setIsRotating] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleClick = () => {
    setIsRotating(true)
    setTimeout(() => setIsRotating(false), 900)
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    onDrop?.(e)
  }

  const getSizeClass = () => {
    if (!pizza.size) return ''
    switch (pizza.size.id) {
      case 'small': return 'scale-75'
      case 'medium': return 'scale-100'
      case 'large': return 'scale-125'
      default: return 'scale-100'
    }
  }

  const getDoughStyle = () => {
    if (!pizza.dough) return {}
    switch (pizza.dough.id) {
      case 'thin': return { borderWidth: '4px' }
      case 'classic': return { borderWidth: '8px' }
      case 'deep': return { borderWidth: '16px' }
      default: return { borderWidth: '8px' }
    }
  }

  const getSauceStyle = () => {
    if (!pizza.sauce) return { opacity: 0, transform: 'scale(0.8)' }
    
    let background = ''
    switch (pizza.sauce.id) {
      case 'tomato':
        background = 'radial-gradient(circle, #E74C3C 0%, #C0392B 100%)'
        break
      case 'pesto':
        background = 'radial-gradient(circle, #27AE60 0%, #229954 100%)'
        break
      case 'white':
        background = 'radial-gradient(circle, #F8F9FA 0%, #E9ECEF 100%)'
        break
      default:
        background = 'radial-gradient(circle, #E74C3C 0%, #C0392B 100%)'
    }
    
    return {
      background,
      opacity: 0.9,
      transform: 'scale(1)',
      transition: 'all 0.5s ease-in-out'
    }
  }

  const getCheeseStyle = () => {
    if (!pizza.cheese) return { opacity: 0, transform: 'scale(0.7)' }
    
    let background = ''
    switch (pizza.cheese.id) {
      case 'mozzarella':
        background = 'radial-gradient(circle, #FFF8DC 0%, #F5E6D3 100%)'
        break
      case 'cheddar':
        background = 'radial-gradient(circle, #FFD700 0%, #DAA520 100%)'
        break
      case 'vegan':
        background = 'radial-gradient(circle, #F0F8E8 0%, #E8F5E8 100%)'
        break
      default:
        background = 'radial-gradient(circle, #FFF8DC 0%, #F5E6D3 100%)'
    }
    
    return {
      background,
      opacity: 0.85,
      transform: 'scale(1)',
      transition: 'all 0.5s ease-in-out'
    }
  }

  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center perspective-1000 cursor-grab active:cursor-grabbing">
      <div
        className={`relative w-full h-full transition-all duration-700 ${getSizeClass()} ${
          isRotating ? 'animate-[pizzaRotate3D_900ms_cubic-bezier(0.16,1,0.3,1)]' : ''
        } ${isDragOver ? 'bg-primary/10 border-2 border-dashed border-primary rounded-full' : ''}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Pizza Base */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full transition-all duration-500"
          style={{
            background: 'radial-gradient(circle, #F4E4BC 0%, #E6D3A3 70%, #D4C291 100%)',
            boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '8px solid #E6D3A3',
            ...getDoughStyle()
          }}
        />

        {/* Pizza Sauce */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-70 h-70 rounded-full transition-all duration-700"
          style={getSauceStyle()}
        />

        {/* Pizza Cheese */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-65 h-65 rounded-full transition-all duration-700"
          style={{
            ...getCheeseStyle(),
            mask: 'radial-gradient(circle, black 60%, transparent 90%)',
            WebkitMask: 'radial-gradient(circle, black 60%, transparent 90%)'
          }}
        />

        {/* Pizza Toppings */}
        {showToppings && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-75 h-75 pointer-events-none">
            {pizza.toppings.map((topping, index) => (
              <div
                key={`${topping.id}-${index}`}
                className="absolute w-8 h-8 transition-all duration-500 pointer-events-auto cursor-pointer hover:scale-125 hover:z-10 flex items-center justify-center animate-fade-in"
                style={{
                  left: `${topping.x}px`,
                  top: `${topping.y}px`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${index * 100}ms`
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  onToppingRemove?.(topping.id)
                }}
              >
                {/* Topping Icon */}
                <div 
                  className="text-2xl filter drop-shadow-sm"
                  style={{
                    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
                  }}
                >
                  {topping.icon}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pizza Shadow */}
        <div className="absolute -bottom-10 w-87.5 h-15 bg-radial-gradient from-black/30 to-transparent rounded-full filter blur-sm -z-10" />

        {/* Drop Zone Indicator */}
        {isDragOver && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg font-semibold z-50">
            اینجا رها کنید
          </div>
        )}
      </div>

      <style>{`
        @keyframes pizzaRotate3D {
          0% { transform: rotateY(0deg) scale(1); }
          50% { transform: rotateY(180deg) scale(1.06); }
          100% { transform: rotateY(360deg) scale(1); }
        }
      `}</style>
    </div>
  )
}

// Helper function to adjust color brightness
const adjustColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

export default PizzaPreview
