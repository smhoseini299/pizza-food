import React from 'react'

const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Background Glass Pizza Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="glass-pizza w-[300px] h-[300px] top-[10%] right-[-150px] animate-[floatPizza_25s_ease-in-out_infinite]">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-gradient-radial from-[rgba(244,228,188,0.3)] via-[rgba(230,211,163,0.2)] to-[rgba(212,194,145,0.1)] border-2 border-[rgba(230,211,163,0.2)]"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] rounded-full bg-gradient-radial from-[rgba(231,76,60,0.3)] via-[rgba(192,57,43,0.2)] to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] rounded-full bg-gradient-radial from-[rgba(255,248,220,0.4)] via-[rgba(245,230,211,0.2)] to-transparent"></div>
            {/* Toppings */}
            <div className="absolute top-[25%] left-[30%] w-3 h-3 rounded-full bg-[rgba(139,0,0,0.4)] backdrop-blur-sm border border-white/10 animate-[toppingFloat_15s_ease-in-out_infinite]"></div>
            <div className="absolute top-[40%] left-[60%] w-3 h-3 rounded-full bg-[rgba(139,115,85,0.4)] backdrop-blur-sm border border-white/10 animate-[toppingFloat_15s_ease-in-out_infinite_-2s]"></div>
            <div className="absolute top-[60%] left-[25%] w-3 h-3 rounded-full bg-[rgba(34,139,34,0.4)] backdrop-blur-sm border border-white/10 animate-[toppingFloat_15s_ease-in-out_infinite_-4s]"></div>
          </div>
        </div>

        <div className="glass-pizza w-[200px] h-[200px] top-[60%] left-[-100px] animate-[floatPizza_30s_ease-in-out_infinite_reverse_-8s]">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-gradient-radial from-[rgba(244,228,188,0.3)] via-[rgba(230,211,163,0.2)] to-[rgba(212,194,145,0.1)] border-2 border-[rgba(230,211,163,0.2)]"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] rounded-full bg-gradient-radial from-[rgba(231,76,60,0.3)] via-[rgba(192,57,43,0.2)] to-transparent"></div>
          </div>
        </div>

        <div className="glass-pizza w-[150px] h-[150px] top-[30%] left-[70%] animate-[floatPizza_22s_ease-in-out_infinite_-15s]">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-gradient-radial from-[rgba(244,228,188,0.3)] via-[rgba(230,211,163,0.2)] to-[rgba(212,194,145,0.1)] border-2 border-[rgba(230,211,163,0.2)]"></div>
          </div>
        </div>
      </div>

      {/* Glass Overlay Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[300px] h-[300px] bg-white/8 backdrop-blur-[20px] rounded-full border border-white/15 shadow-[0_8px_32px_rgba(255,107,53,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] animate-[floatGlass_25s_ease-in-out_infinite]"></div>
        
        <div className="absolute bottom-[20%] right-[10%] w-[200px] h-[200px] bg-white/6 backdrop-blur-[15px] rounded-full border border-white/12 shadow-[0_6px_24px_rgba(255,167,38,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] animate-[floatGlass_20s_ease-in-out_infinite_reverse_-5s]"></div>
        
        <div className="absolute top-1/2 right-[25%] w-[150px] h-[150px] bg-white/4 backdrop-blur-[12px] rounded-full border border-white/10 shadow-[0_4px_16px_rgba(255,213,79,0.08),inset_0_1px_0_rgba(255,255,255,0.1)] animate-[floatGlass_30s_ease-in-out_infinite_-10s]"></div>
      </div>

      <style jsx>{`
        @keyframes toppingFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          33% {
            transform: translateY(-8px) scale(1.1);
            opacity: 0.8;
          }
          66% {
            transform: translateY(4px) scale(0.9);
            opacity: 0.4;
          }
        }

        @keyframes floatGlass {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-20px) scale(1.05);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) scale(0.95);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) scale(1.1);
            opacity: 0.7;
          }
        }
      `}</style>
    </>
  )
}

export default BackgroundEffects
