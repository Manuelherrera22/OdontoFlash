'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Testimonials } from '@/components/sections/Testimonials'
import { Footer } from '@/components/layout/Footer'
import { AuthModal } from '@/components/auth/AuthModal'

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authType, setAuthType] = useState<'login' | 'register'>('login')

  const handleAuth = (type: 'login' | 'register') => {
    setAuthType(type)
    setIsAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onAuth={handleAuth} />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero onAuth={handleAuth} />
        <Features />
        <HowItWorks />
        <Testimonials />
      </motion.main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        type={authType}
        onSwitchType={(type) => setAuthType(type)}
      />
    </div>
  )
}
