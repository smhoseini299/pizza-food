import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import PizzaDisplay from '../components/PizzaDisplay'
import ThumbnailCarousel from '../components/ThumbnailCarousel'

// Pizza data using public images
const pizzaData = [
  {
    id: 1,
    name: "پیتزا اسپشیال",
    description: "پیتزای خوشمزه با مواد تازه و پنیر مرغوب، طعمی فراموش نشدنی برای شما.",
    image: "/pizza1.png",
    thumbnail: "/pizza1.png"
  },
  {
    id: 2,
    name: "پیتزا کلاسیک",
    description: "طعم اصیل پیتزا با ترکیب بهترین مواد اولیه و سس مخصوص رستوران.",
    image: "/pizza2.png",
    thumbnail: "/pizza2.png"
  },
  {
    id: 3,
    name: "پیتزا لوکس",
    description: "پیتزای لوکس با بهترین کیفیت مواد و طعمی استثنائی که حس خوبی به شما می‌دهد.",
    image: "/pizza3.png",
    thumbnail: "/pizza3.png"
  }
]

const HomePage: React.FC = () => {
  const [currentPizzaIndex, setCurrentPizzaIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  const currentPizza = pizzaData[currentPizzaIndex]

  useEffect(() => {
    // Add loading animation
    setTimeout(() => setIsLoaded(true), 300)

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const prevIndex = currentPizzaIndex > 0 ? currentPizzaIndex - 1 : pizzaData.length - 1
        setCurrentPizzaIndex(prevIndex)
      } else if (e.key === 'ArrowRight') {
        const nextIndex = currentPizzaIndex < pizzaData.length - 1 ? currentPizzaIndex + 1 : 0
        setCurrentPizzaIndex(nextIndex)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentPizzaIndex])

  const handlePizzaSelect = (index: number) => {
    if (index !== currentPizzaIndex) {
      setIsChanging(true)
      setTimeout(() => {
        setCurrentPizzaIndex(index)
        setTimeout(() => setIsChanging(false), 300)
      }, 150)
    }
  }

  const scrollToMenu = () => {
    const carousel = document.querySelector('.thumbnail-carousel')
    carousel?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <main className="pt-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-15 items-center ${isLoaded ? 'animate-slide-in-left' : 'opacity-0'}`}>
            {/* Left Content */}
            <div className="max-w-md text-right space-y-6 lg:space-y-8">
              <p className="text-text-secondary text-white text-lg font-medium tracking-wide uppercase relative inline-block">
                امروز روز پیتزاست 🍕
                <span className="absolute bottom-[-4px] left-0 w-10 h-0.5 bg-secondary rounded"></span>
              </p>
              
              <h1 className={`text-4xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight bg-gradient-to-r from-white to-white bg-clip-text transition-all duration-500 ${isChanging ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                {currentPizza.name}
              </h1>
              
              <p className={`text-lg lg:text-xl text-white/90 leading-relaxed max-w-lg font-normal transition-all duration-500 delay-100 ${isChanging ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                {currentPizza.description}
              </p>
              
              <div className="flex gap-4 items-center pt-4">
                <Link
                  to="/build-pizza"
                  className="btn-primary group"
                >
                  <span className="text-xl group-hover:rotate-12 transition-transform duration-300">🍕</span>
                  پیتزاتو بساز
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                </Link>
                
                <button
                  onClick={scrollToMenu}
                  className="btn-secondary"
                >
                  مشاهده منو
                </button>
              </div>
            </div>

            {/* Pizza Display */}
            <div className={`${isLoaded ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <PizzaDisplay
                pizzas={pizzaData}
                currentIndex={currentPizzaIndex}
                onPizzaSelect={handlePizzaSelect}
                isChanging={isChanging}
              />
            </div>
          </div>

          {/* Bottom Thumbnail Carousel */}
          <div className="thumbnail-carousel">
            <ThumbnailCarousel
              pizzas={pizzaData}
              currentIndex={currentPizzaIndex}
              onThumbnailClick={handlePizzaSelect}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
