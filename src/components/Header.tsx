import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface HeaderProps {
  cartCount?: number
}

const Header: React.FC<HeaderProps> = ({ cartCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isBuildPage = location.pathname === '/build-pizza'

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mx-6 mt-6 glass-effect rounded-3xl shadow-glass">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-white/10 rounded-3xl -z-10"></div>
      <div className="absolute inset-0 bg-conic-gradient from-transparent via-primary/10 to-transparent animate-[headerGlow_20s_linear_infinite] rounded-3xl -z-10 opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-14 h-14 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <span className="text-white font-bold text-xs text-center leading-tight">
                پیتزا<br />هات
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className={`
            ${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex
            ${isMobileMenuOpen ? 'absolute top-full right-0 left-auto w-56 bg-white/15 backdrop-blur-25 flex-col gap-2 rounded-2xl shadow-glass mt-3 p-4 border border-white/25 animate-fade-in' : 'flex-row gap-8 items-center bg-white/10 backdrop-blur-15 rounded-full px-4 py-2 border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.1)]'}
          `}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-full -z-10"></div>
            
            {isBuildPage ? (
              <Link
                to="/"
                className="nav-link px-4 py-3 rounded-3xl bg-white/5 backdrop-blur-10 border border-white/10 text-text-primary font-medium text-sm transition-all duration-300 hover:text-primary hover:bg-primary/15 hover:border-primary/30 hover:shadow-[0_4px_16px_rgba(255,107,53,0.2)] hover:-translate-y-0.5 relative z-10"
              >
                خانه
              </Link>
            ) : (
              <>
                <a href="#" className="nav-link px-4 py-3 rounded-3xl bg-white/5 backdrop-blur-10 border border-white/10 text-text-primary font-medium text-sm transition-all duration-300 hover:text-primary hover:bg-primary/15 hover:border-primary/30 hover:shadow-[0_4px_16px_rgba(255,107,53,0.2)] hover:-translate-y-0.5 relative z-10">
                  منو
                </a>
                <a href="#" className="nav-link px-4 py-3 rounded-3xl bg-white/5 backdrop-blur-10 border border-white/10 text-text-primary font-medium text-sm transition-all duration-300 hover:text-primary hover:bg-primary/15 hover:border-primary/30 hover:shadow-[0_4px_16px_rgba(255,107,53,0.2)] hover:-translate-y-0.5 relative z-10">
                  سفارش
                </a>
                <a href="#" className="nav-link px-4 py-3 rounded-3xl bg-white/5 backdrop-blur-10 border border-white/10 text-text-primary font-medium text-sm transition-all duration-300 hover:text-primary hover:bg-primary/15 hover:border-primary/30 hover:shadow-[0_4px_16px_rgba(255,107,53,0.2)] hover:-translate-y-0.5 relative z-10">
                  آنلاین
                </a>
              </>
            )}
            
            {!isBuildPage && (
              <a
                href="#"
                className="bg-gradient-to-r from-primary to-primary-dark text-white px-7 py-3.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 border border-white/20 backdrop-blur-20 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <span className="relative">ثبت نام</span>
              </a>
            )}
          </nav>

          {/* Cart Icon (for build page) */}
          {isBuildPage && (
            <div className="relative cursor-pointer p-3 rounded-full transition-all duration-300 bg-white/10 backdrop-blur-10 hover:bg-white/20 hover:scale-110">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden flex flex-col gap-1 p-3 bg-white/10 backdrop-blur-15 border border-white/15 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-primary/10 ${
              isMobileMenuOpen ? 'active' : ''
            }`}
            onClick={toggleMobileMenu}
          >
            <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes headerGlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </header>
  )
}

export default Header
