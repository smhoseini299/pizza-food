import React from 'react'

interface Pizza {
  id: number
  name: string
  description: string
  image: string
  thumbnail: string
}

interface ThumbnailCarouselProps {
  pizzas: Pizza[]
  currentIndex: number
  onThumbnailClick: (index: number) => void
}

const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({ 
  pizzas, 
  currentIndex, 
  onThumbnailClick 
}) => {
  return (
    <div className="mt-20 p-8 card-glass">
      {/* Carousel Header */}
      <div className="flex justify-between items-center mb-4 px-6">
        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-text-primary to-primary bg-clip-text text-transparent">
          پیتزای خود را انتخاب کنید
        </h3>
        
        {/* Indicators */}
        <div className="flex gap-3">
          {pizzas.map((_, index) => (
            <button
              key={index}
              onClick={() => onThumbnailClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-transparent ${
                index === currentIndex
                  ? 'bg-primary transform scale-125 border-white/40 shadow-[0_0_12px_rgba(255,107,53,0.4)]'
                  : 'bg-primary/30 hover:bg-primary/50 hover:scale-110'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Container */}
      <div className="flex gap-5 overflow-x-auto scrollbar-hide justify-center items-center px-6 py-6">
        {pizzas.map((pizza, index) => (
          <div
            key={pizza.id}
            className={`flex-shrink-0 relative cursor-pointer transition-all duration-300 group ${
              index === currentIndex ? 'transform scale-115 -translate-y-1' : ''
            }`}
            onClick={() => onThumbnailClick(index)}
          >
            {/* Thumbnail Image */}
            <img
              src={pizza.thumbnail}
              alt={pizza.name}
              className={`w-25 h-25 rounded-full object-cover shadow-md border-4 transition-all duration-300 relative overflow-hidden ${
                index === currentIndex
                  ? 'border-primary shadow-[0_8px_24px_rgba(255,107,53,0.3)]'
                  : 'border-white/60 hover:border-white/80 group-hover:shadow-lg'
              }`}
            />

            {/* Hover/Active Overlay */}
            <div
              className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-100'
                  : 'bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100'
              }`}
            />

            {/* Pizza Name (appears on hover) */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
              {pizza.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThumbnailCarousel
