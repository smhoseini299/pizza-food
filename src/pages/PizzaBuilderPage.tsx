import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ProgressSteps from '../components/ProgressSteps'
import PizzaPreview from '../components/PizzaPreview'
import OptionCard from '../components/OptionCard'
import ToppingItem from '../components/ToppingItem'
import { usePizzaBuilder } from '../hooks/usePizzaBuilder'
import { pizzaConfig } from '../data/pizzaConfig'
import { PizzaOption } from '../types/pizza'

const PizzaBuilderPage: React.FC = () => {
  const {
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
  } = usePizzaBuilder()

  const [cartCount, setCartCount] = useState(0)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  // Step configuration
  const getStepConfig = () => {
    switch (currentStep) {
      case 1:
        return {
          title: 'انتخاب سایز پیتزا',
          description: 'سایز مورد نظر خود را انتخاب کنید',
          options: pizzaConfig.sizes,
          onSelect: selectSize,
          selectedValue: currentPizza.size
        }
      case 2:
        return {
          title: 'انتخاب نوع خمیر',
          description: 'نوع خمیر دلخواه خود را انتخاب کنید',
          options: pizzaConfig.doughs,
          onSelect: selectDough,
          selectedValue: currentPizza.dough
        }
      case 3:
        return {
          title: 'انتخاب سس',
          description: 'سس مورد علاقه خود را انتخاب کنید',
          options: pizzaConfig.sauces,
          onSelect: selectSauce,
          selectedValue: currentPizza.sauce
        }
      case 4:
        return {
          title: 'انتخاب پنیر',
          description: 'نوع پنیر دلخواه خود را انتخاب کنید',
          options: pizzaConfig.cheeses,
          onSelect: selectCheese,
          selectedValue: currentPizza.cheese
        }
      case 5:
        return {
          title: 'اضافه کردن تاپینگ',
          description: 'تاپینگ‌های مورد نظر خود را اضافه کنید',
          options: [],
          onSelect: () => {},
          selectedValue: null
        }
    }
  }

  const stepConfig = getStepConfig()

  // Handle drag and drop
  const handleToppingDrop = (e: React.DragEvent) => {
    const toppingId = e.dataTransfer.getData('text/plain')
    const topping = pizzaConfig.toppings.find(t => t.id === toppingId)
    
    if (topping && !currentPizza.toppings.some(t => t.id === toppingId)) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      toggleTopping(topping, x, y)
      showToastMessage('تاپینگ اضافه شد!')
    }
  }

  // Navigation handlers
  const handleStepClick = (step: number) => {
    if (step < currentStep || isStepCompleted(step)) {
      setCurrentStep(step)
    }
  }

  const handleNext = () => {
    if (canProceedToNextStep()) {
      if (navigateStep(1)) {
        // Success
      } else if (currentStep === totalSteps) {
        // Show order summary
        setShowOrderModal(true)
      }
    } else {
      showToastMessage('لطفاً یک گزینه انتخاب کنید')
    }
  }

  const handleBack = () => {
    navigateStep(-1)
  }

  const handleFinish = () => {
    if (isOrderComplete()) {
      setShowOrderModal(true)
    } else {
      showToastMessage('لطفاً تمام مراحل را تکمیل کنید')
    }
  }

  const handleConfirmOrder = () => {
    setCartCount(prev => prev + 1)
    setShowOrderModal(false)
    showToastMessage('پیتزا به سبد خرید اضافه شد!', 'success')
    
    // Reset after a delay
    setTimeout(() => {
      resetPizza()
    }, 1000)
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100])
    }
  }

  const showToastMessage = (message: string, type: 'info' | 'success' = 'info') => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showOrderModal) {
        if (e.key === 'Escape') {
          setShowOrderModal(false)
        }
        return
      }

      switch (e.key) {
        case 'ArrowLeft':
          if (currentStep > 1) navigateStep(-1)
          break
        case 'ArrowRight':
          if (currentStep < totalSteps && canProceedToNextStep()) navigateStep(1)
          break
        case 'Enter':
          if (currentStep === totalSteps) {
            handleFinish()
          } else if (canProceedToNextStep()) {
            navigateStep(1)
          }
          break
        case 'Escape':
          window.history.back()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, canProceedToNextStep, showOrderModal])

  return (
    <div className="min-h-screen bg-build-page">
      <Header cartCount={cartCount} />

      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Progress Steps */}
          <ProgressSteps
            currentStep={currentStep}
            onStepClick={handleStepClick}
            isStepCompleted={isStepCompleted}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Pizza Canvas */}
            <div className="sticky top-32 flex flex-col items-center gap-8">
              <PizzaPreview
                pizza={currentPizza}
                onToppingRemove={(toppingId) => {
                  const topping = pizzaConfig.toppings.find(t => t.id === toppingId)
                  if (topping) {
                    toggleTopping(topping)
                    showToastMessage('تاپینگ حذف شد')
                  }
                }}
                onDrop={handleToppingDrop}
              />

              {/* Price Display */}
              <div className="card-glass p-6 text-center">
                <div className="text-lg text-text-secondary mb-2 font-medium">
                  قیمت کل:
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {formatPrice(calculateTotalPrice())}
                </div>
              </div>
            </div>

            {/* Options Panel */}
            <div className="card-glass p-8 h-fit">
              <div className="mb-8 text-right">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  {stepConfig.title}
                </h2>
                <p className="text-lg text-text-secondary">
                  {stepConfig.description}
                </p>
              </div>

              {/* Options Grid */}
              {currentStep !== 5 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
                  {stepConfig.options.map((option, index) => (
                    <OptionCard
                      key={option.id}
                      option={option}
                      isSelected={stepConfig.selectedValue?.id === option.id}
                      onSelect={(opt) => stepConfig.onSelect(opt as PizzaOption)}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-text-muted mb-8 p-5">
                  تاپینگ‌ها را از پایین انتخاب کنید
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="flex-1 px-6 py-4 bg-white/80 text-text-secondary border-2 border-black/10 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-text-primary hover:-translate-y-0.5"
                >
                  ← مرحله قبل
                </button>

                {currentStep === totalSteps ? (
                  <button
                    onClick={handleFinish}
                    className="flex-1 btn-primary"
                  >
                    <span className="text-xl">🛒</span>
                    افزودن به سبد
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex-1 btn-primary"
                  >
                    مرحله بعد →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Toppings Drawer (for step 5) */}
          {currentStep === 5 && (
            <div className="mt-8 card-glass p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  تاپینگ‌های موجود
                </h3>
                <p className="text-text-secondary">
                  تاپینگ‌ها را روی پیتزا بکشید یا کلیک کنید
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {pizzaConfig.toppings.map((topping, index) => (
                  <ToppingItem
                    key={topping.id}
                    topping={topping}
                    isSelected={currentPizza.toppings.some(t => t.id === topping.id)}
                    onToggle={(topping) => {
                      toggleTopping(topping)
                      showToastMessage(
                        currentPizza.toppings.some(t => t.id === topping.id)
                          ? 'تاپینگ حذف شد'
                          : 'تاپینگ اضافه شد!'
                      )
                    }}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Order Summary Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-5 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[slideUp_300ms_cubic-bezier(0.22,1,0.36,1)]">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-8 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-text-primary">خلاصه سفارش</h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl text-text-muted hover:text-text-primary transition-all duration-300"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Order Pizza Preview */}
                <div className="flex justify-center">
                  <div className="w-40 h-40">
                    <PizzaPreview pizza={currentPizza} />
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium">سایز:</span>
                    <span>{currentPizza.size?.name || '-'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium">خمیر:</span>
                    <span>{currentPizza.dough?.name || '-'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium">سس:</span>
                    <span>{currentPizza.sauce?.name || '-'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium">پنیر:</span>
                    <span>{currentPizza.cheese?.name || '-'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium">تاپینگ‌ها:</span>
                    <span>
                      {currentPizza.toppings.length > 0
                        ? currentPizza.toppings.map(t => t.name).join('، ')
                        : 'بدون تاپینگ'}
                    </span>
                  </div>
                  <div className="flex justify-between py-4 border-t-2 border-primary text-xl font-bold text-primary">
                    <span>قیمت کل:</span>
                    <span>{formatPrice(calculateTotalPrice())}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-4 p-8 border-t border-gray-100">
              <button
                onClick={() => setShowOrderModal(false)}
                className="flex-1 btn-secondary"
              >
                ویرایش سفارش
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 btn-primary"
              >
                <span className="text-xl">🛒</span>
                تأیید و افزودن به سبد
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-32 left-1/2 transform -translate-x-1/2 ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'} bg-green-500 text-white px-6 py-4 rounded-2xl flex items-center gap-3 font-semibold shadow-lg z-50 transition-all duration-300`}>
          <div className="text-xl">✅</div>
          <div>{toastMessage}</div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default PizzaBuilderPage
