import React from 'react'

interface Step {
  id: number
  title: string
  description: string
  icon: string
}

interface ProgressStepsProps {
  currentStep: number
  onStepClick: (step: number) => void
  isStepCompleted: (step: number) => boolean
}

const steps: Step[] = [
  { id: 1, title: 'سایز', description: 'انتخاب اندازه', icon: '📏' },
  { id: 2, title: 'خمیر', description: 'نوع خمیر', icon: '🥖' },
  { id: 3, title: 'سس', description: 'انتخاب سس', icon: '🍅' },
  { id: 4, title: 'پنیر', description: 'نوع پنیر', icon: '🧀' },
  { id: 5, title: 'تاپینگ', description: 'مواد اضافی', icon: '🍄' },
]

const ProgressSteps: React.FC<ProgressStepsProps> = ({ 
  currentStep, 
  onStepClick, 
  isStepCompleted 
}) => {
  return (
    <div className="flex justify-center gap-8 mb-12 p-6 card-glass overflow-x-auto scrollbar-hide">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isCompleted = isStepCompleted(step.id)
        const isClickable = step.id < currentStep || isCompleted

        return (
          <div
            key={step.id}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 min-w-[140px] ${
              isActive
                ? 'opacity-100 scale-100 bg-primary/15 shadow-sm'
                : isCompleted
                ? 'opacity-80 scale-95 bg-green-500/10 hover:opacity-90 hover:scale-98'
                : 'opacity-60 scale-95 hover:opacity-80 hover:scale-98'
            } ${!isClickable ? 'cursor-not-allowed' : ''}`}
            onClick={() => isClickable && onStepClick(step.id)}
          >
            {/* Step Icon */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-white transform scale-110'
                  : isCompleted
                  ? 'bg-green-500 text-white'
                  : 'bg-white/20 text-text-primary'
              }`}
            >
              {isCompleted && step.id !== currentStep ? '✅' : step.icon}
            </div>

            {/* Step Info */}
            <div className="text-right">
              <div className="font-semibold text-sm text-text-primary mb-1">
                {step.title}
              </div>
              <div className="text-xs text-text-muted">
                {step.description}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProgressSteps
