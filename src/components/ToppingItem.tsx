import React, { useState } from 'react'
import { PizzaOption } from '../types/pizza'

interface ToppingItemProps {
  topping: PizzaOption
  isSelected: boolean
  onToggle: (topping: PizzaOption) => void
  index: number
}

const ToppingItem: React.FC<ToppingItemProps> = ({ topping, isSelected, onToggle, index }) => {
  const [isDragging, setIsDragging] = useState(false)

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', topping.id)
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleClick = () => {
    onToggle(topping)
  }

  return (
    <div
      className={`bg-white/80 border-2 rounded-2xl p-4 text-center cursor-grab active:cursor-grabbing transition-all duration-300 user-select-none group ${
        isSelected
          ? 'border-primary bg-primary/10'
          : 'border-primary/20 hover:border-primary'
      } ${isDragging ? 'opacity-50' : 'hover:scale-108 hover:shadow-md'}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      style={{
        animationDelay: `${index * 80}ms`
      }}
    >
      {/* Topping Preview */}
      <div
        className="w-10 h-10 rounded-full mx-auto mb-3 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `radial-gradient(circle, ${topping.color} 0%, ${adjustColor(topping.color || '#8B0000', -30)} 100%)`,
          border: `2px solid ${adjustColor(topping.color || '#8B0000', -50)}`
        }}
      />

      {/* Topping Name */}
      <div className="font-semibold text-text-primary mb-1 text-sm group-hover:text-primary transition-colors duration-300">
        {topping.name}
      </div>

      {/* Topping Price */}
      <div className="text-xs text-text-secondary">
        {formatPrice(topping.price)}
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-1 left-1 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs animate-fade-in">
          ✓
        </div>
      )}

      {/* Drag Instruction */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
        بکشید یا کلیک کنید
      </div>
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

export default ToppingItem
