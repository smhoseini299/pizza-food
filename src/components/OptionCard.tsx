import React, { useState } from 'react'
import { PizzaOption } from '../types/pizza'

interface OptionCardProps {
  option: PizzaOption
  isSelected: boolean
  onSelect: (option: PizzaOption) => void
  index: number
}

const OptionCard: React.FC<OptionCardProps> = ({ option, isSelected, onSelect, index }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 600)
    onSelect(option)
  }

  const formatPrice = (price: number): string => {
    return price === 0 ? 'رایگان' : new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  return (
    <div
      className={`bg-white/80 border-2 rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 relative overflow-hidden group ${
        isSelected
          ? 'border-primary bg-primary/10 transform -translate-y-1 scale-102 shadow-md'
          : 'border-primary/20 hover:border-primary hover:transform hover:-translate-y-1 hover:scale-102 hover:shadow-md'
      } ${isAnimating ? 'animate-bounce-in' : ''}`}
      onClick={handleClick}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Shine effect */}
      <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-all duration-500 group-hover:left-full" />

      {/* Option Icon */}
      <div className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">
        {option.icon}
      </div>

      {/* Option Name */}
      <div className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors duration-300">
        {option.name}
      </div>

      {/* Option Price */}
      <div className="text-sm text-text-secondary font-medium mb-2">
        {formatPrice(option.price)}
      </div>

      {/* Option Description */}
      <div className="text-xs text-text-muted leading-relaxed">
        {option.description}
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm animate-fade-in">
          ✓
        </div>
      )}
    </div>
  )
}

export default OptionCard
