import { useState, useEffect } from 'react'
import { PizzaState, PizzaOption, PizzaTopping } from '../types/pizza'

const initialPizzaState: PizzaState = {
  size: null,
  dough: null,
  sauce: null,
  cheese: null,
  toppings: []
}

export const usePizzaBuilder = () => {
  const [currentPizza, setCurrentPizza] = useState<PizzaState>(initialPizzaState)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  // Save progress to localStorage
  const saveProgress = () => {
    localStorage.setItem('pizzaBuilder', JSON.stringify({
      currentPizza,
      currentStep
    }))
  }

  // Load progress from localStorage
  const loadProgress = () => {
    const saved = localStorage.getItem('pizzaBuilder')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setCurrentPizza(data.currentPizza || initialPizzaState)
        setCurrentStep(data.currentStep || 1)
      } catch (error) {
        console.error('Failed to load saved progress:', error)
      }
    }
  }

  // Calculate total price
  const calculateTotalPrice = (): number => {
    let total = 0
    if (currentPizza.size) total += currentPizza.size.price
    if (currentPizza.dough) total += currentPizza.dough.price
    if (currentPizza.sauce) total += currentPizza.sauce.price
    if (currentPizza.cheese) total += currentPizza.cheese.price
    currentPizza.toppings.forEach(topping => {
      total += topping.price
    })
    return total
  }

  // Format price in Persian
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  // Selection functions
  const selectSize = (size: PizzaOption) => {
    setCurrentPizza(prev => ({ ...prev, size }))
  }

  const selectDough = (dough: PizzaOption) => {
    setCurrentPizza(prev => ({ ...prev, dough }))
  }

  const selectSauce = (sauce: PizzaOption) => {
    setCurrentPizza(prev => ({ ...prev, sauce }))
  }

  const selectCheese = (cheese: PizzaOption) => {
    setCurrentPizza(prev => ({ ...prev, cheese }))
  }

  const toggleTopping = (topping: PizzaOption, x?: number, y?: number) => {
    setCurrentPizza(prev => {
      const existingIndex = prev.toppings.findIndex(t => t.id === topping.id)
      
      if (existingIndex >= 0) {
        // Remove topping
        const newToppings = [...prev.toppings]
        newToppings.splice(existingIndex, 1)
        return { ...prev, toppings: newToppings }
      } else {
        // Add topping with better positioning
        let newX = x
        let newY = y
        
        if (!newX || !newY) {
          // Generate positions that don't overlap
          const pizzaRadius = 150 // Pizza radius
          const toppingRadius = 20 // Topping radius
          let attempts = 0
          let validPosition = false
          
          while (!validPosition && attempts < 50) {
            // Generate random position within pizza circle
            const angle = Math.random() * 2 * Math.PI
            const distance = Math.random() * (pizzaRadius - toppingRadius)
            newX = Math.cos(angle) * distance + pizzaRadius
            newY = Math.sin(angle) * distance + pizzaRadius
            
            // Check if position overlaps with existing toppings
            validPosition = !prev.toppings.some(existingTopping => {
              const dx = newX - existingTopping.x
              const dy = newY - existingTopping.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              return distance < toppingRadius * 2
            })
            
            attempts++
          }
          
          // Fallback to random position if no valid position found
          if (!validPosition) {
            newX = Math.random() * 200 + 50
            newY = Math.random() * 200 + 50
          }
        }
        
        const newTopping: PizzaTopping = {
          ...topping,
          x: newX,
          y: newY
        }
        return { ...prev, toppings: [...prev.toppings, newTopping] }
      }
    })
  }

  // Navigation functions
  const canProceedToNextStep = (): boolean => {
    switch (currentStep) {
      case 1: return currentPizza.size !== null
      case 2: return currentPizza.dough !== null
      case 3: return currentPizza.sauce !== null
      case 4: return currentPizza.cheese !== null
      case 5: return true // Toppings are optional
      default: return false
    }
  }

  const isStepCompleted = (step: number): boolean => {
    switch (step) {
      case 1: return currentPizza.size !== null
      case 2: return currentPizza.dough !== null
      case 3: return currentPizza.sauce !== null
      case 4: return currentPizza.cheese !== null
      case 5: return true
      default: return false
    }
  }

  const navigateStep = (direction: number) => {
    const newStep = currentStep + direction
    
    if (direction > 0 && !canProceedToNextStep()) {
      return false // Cannot proceed
    }
    
    if (newStep >= 1 && newStep <= totalSteps) {
      setCurrentStep(newStep)
      return true
    }
    return false
  }

  const resetPizza = () => {
    setCurrentPizza(initialPizzaState)
    setCurrentStep(1)
    localStorage.removeItem('pizzaBuilder')
  }

  const isOrderComplete = (): boolean => {
    return !!(currentPizza.size && currentPizza.dough && currentPizza.sauce && currentPizza.cheese)
  }

  // Auto-save on changes
  useEffect(() => {
    saveProgress()
  }, [currentPizza, currentStep])

  // Load progress on mount
  useEffect(() => {
    loadProgress()
  }, [])

  return {
    currentPizza,
    currentStep,
    totalSteps,
    calculateTotalPrice,
    formatPrice,
    selectSize,
    selectDough,
    selectSauce,
    selectCheese,
    toggleTopping,
    canProceedToNextStep,
    isStepCompleted,
    navigateStep,
    resetPizza,
    isOrderComplete,
    setCurrentStep
  }
}
