import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';

interface HeartHeaderProps {
  isUnlocked: boolean;
  isDoorOpen: boolean;
  onOpenGate: () => void;
  onScrollDown: () => void;
}

export const HeartHeader: React.FC<HeartHeaderProps> = ({
  isUnlocked,
  isDoorOpen,
  onOpenGate,
  onScrollDown
}) => {
  return (
    <section id="section-1" className="hero-heart-section" aria-label="Heartbeat Header and Password Gate">
      {/* Background ambient floating lights */}
      <div className="ambient-particles" aria-hidden="true">
        <div className="ambient-blob blob-pink" />
        <div className="ambient-blob blob-blue" />
        <div className="ambient-blob blob-lavender" />
      </div>

      <div className="hero-content-wrapper">
        {/* Subtle Welcome Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-badge liquid-glass-card"
        >
          <Sparkles size={16} className="text-pink" />
          <span className="font-arabic-body">رحلة رومانسية زجاجية ثلاثية الأبعاد</span>
          <Heart size={14} className="text-pink animate-pulse" />
        </motion.div>

        {/* Heart Container with continuous heartbeat animation */}
        <div className="heart-interaction-stage">
          {/* Smaller heart emerging from behind the main heart during each beat */}
          <motion.div
            className="emerging-heart-back"
            animate={{
              scale: [1, 1.45, 1.1, 1.6, 1],
              opacity: [0.35, 0.85, 0.45, 0.9, 0.2]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100" className="svg-heart-glow">
              <path
                d="M50 88.9L42.7 82.3C16.9 58.9 0 43.6 0 24.6 0 9.2 12.2 0 27.5 0c8.6 0 16.9 4 22.5 10.4C55.6 4 63.9 0 72.5 0 87.8 0 100 9.2 100 24.6c0 19-16.9 34.3-42.7 57.7L50 88.9z"
                fill="url(#pinkGlowGrad)"
              />
              <defs>
                <linearGradient id="pinkGlowGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f472b6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Main Large Heart with rhythmic heartbeat pulse */}
          <motion.div
            className="main-heart-glass-container"
            animate={{
              scale: isDoorOpen ? 1.05 : [1, 1.045, 1.01, 1.075, 1],
              boxShadow: [
                '0 20px 50px -10px rgba(244, 114, 182, 0.35), 0 10px 30px -5px rgba(56, 189, 248, 0.25)',
                '0 25px 70px -5px rgba(244, 114, 182, 0.55), 0 15px 40px -3px rgba(56, 189, 248, 0.4)',
                '0 20px 50px -10px rgba(244, 114, 182, 0.35), 0 10px 30px -5px rgba(56, 189, 248, 0.25)',
                '0 28px 75px -5px rgba(244, 114, 182, 0.6), 0 18px 45px -3px rgba(56, 189, 248, 0.45)',
                '0 20px 50px -10px rgba(244, 114, 182, 0.35), 0 10px 30px -5px rgba(56, 189, 248, 0.25)'
              ]
            }}
            transition={{
              duration: 2.2,
              repeat: isDoorOpen ? 0 : Infinity,
              ease: 'easeInOut'
            }}
          >
            {/* Visual Glass Artwork representing the Heart and Door */}
            <div className="heart-artwork-wrapper">
              <img
                src={`${import.meta.env.BASE_URL}assets/heart-door.jpg`}
                alt="3D Translucent Liquid Glass Heart with Ornate Central Door"
                className="heart-background-img"
              />

              {/* Specular Liquid Glass Highlights overlay */}
              <div className="glass-specular-sheen" aria-hidden="true" />
              <div className="glass-caustic-ring" aria-hidden="true" />

              {/* The Visually Recognizable Door Inside the Heart */}
              <div className="door-viewport-perspective">
                {/* Door Opening Light Beam (visible when opened) */}
                {isDoorOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.9 }}
                    className="door-inner-radiance"
                    aria-hidden="true"
                  >
                    <div className="radiance-sparkles" />
                  </motion.div>
                )}

                {/* The Interactive Door Leaf */}
                <motion.button
                  type="button"
                  id="door-trigger-btn"
                  onClick={onOpenGate}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenGate();
                    }
                  }}
                  animate={{
                    rotateY: isDoorOpen ? -82 : 0,
                    x: isDoorOpen ? -15 : 0,
                    boxShadow: isDoorOpen
                      ? '0 0 40px rgba(255,255,255,0.9)'
                      : '0 10px 25px rgba(0,0,0,0.15)'
                  }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`heart-door-leaf ${isDoorOpen ? 'door-open-state' : ''}`}
                  aria-label={
                    isUnlocked
                      ? 'الباب مفتوح - اضغط للنزول / Door opened, click to proceed'
                      : 'افتح باب القلب بإدخال كلمة المرور / Unlock the Heart Door'
                  }
                  title="انقر لفتح باب القلب / Click to unlock the door"
                >
                  {/* Ornate Door Trim Details */}
                  <div className="door-ornate-rim">
                    <div className="door-arch-grid">
                      <span className="door-pane" />
                      <span className="door-pane" />
                      <span className="door-pane" />
                      <span className="door-pane" />
                      <span className="door-pane" />
                      <span className="door-pane" />
                    </div>

                    {/* Door Handle */}
                    <div className="door-handle" aria-hidden="true">
                      <div className="handle-crystal-gem" />
                      <div className="handle-lever" />
                    </div>

                    {/* Glass Door Inner Glow */}
                    <div className="door-reflection-line" />
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive guidance status pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="door-guidance-pill"
        >
          {isUnlocked ? (
            <button
              type="button"
              onClick={onScrollDown}
              className="scroll-proceed-btn liquid-glass-card"
            >
              <span className="font-arabic-title">مرحباً بكِ في حديقتنا، تفضلي بالدخول</span>
              <ChevronDown size={20} className="animate-bounce text-pink" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenGate}
              className="open-gate-trigger-btn liquid-glass-card"
            >
              <Sparkles size={16} className="text-pink" />
              <span className="font-arabic-body">انقري على باب القلب لبدء المغامرة</span>
              <span className="subtext-en">• Click the door to unlock •</span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};
