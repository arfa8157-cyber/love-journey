import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Sparkles, Stars, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { DEMO_CONFIG } from '../data/messages';

interface FinalNoteProps {
  recipientName: string;
}

export const FinalNote: React.FC<FinalNoteProps> = ({ recipientName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  // Handle empty or whitespace-only names with sensible default
  const safeDisplayName = recipientName && recipientName.trim()
    ? recipientName.trim()
    : DEMO_CONFIG.defaultRecipient;

  // Trigger gentle romantic pastel confetti on entering viewport
  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      try {
        confetti({
          particleCount: 45,
          spread: 70,
          origin: { y: 0.75 },
          colors: ['#f472b6', '#38bdf8', '#c084fc', '#ffffff']
        });
      } catch (err) {
        // Safe fallback
      }
    }
  }, [isInView, prefersReducedMotion]);

  return (
    <section id="section-4" ref={containerRef} className="final-note-section" aria-label="Final Romantic Declaration">
      {/* Background Soft Glow */}
      <div className="final-ambient-radiance" aria-hidden="true">
        <div className="radiance-center-glow" />
      </div>

      <div className="final-note-container">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9, y: 40 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="final-glass-card liquid-glass-card"
        >
          {/* Glowing Animated Heart at the top of the card */}
          <div className="final-heart-halo-wrapper">
            <motion.div
              animate={{
                scale: [1, 1.15, 1.05, 1.2, 1],
                filter: [
                  'drop-shadow(0 0 15px rgba(244, 114, 182, 0.5))',
                  'drop-shadow(0 0 35px rgba(244, 114, 182, 0.85))',
                  'drop-shadow(0 0 15px rgba(244, 114, 182, 0.5))'
                ]
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="final-heart-glowing"
            >
              <Heart size={68} className="heart-svg-fill" aria-hidden="true" />
            </motion.div>

            {/* Restrained floating elements */}
            <motion.div
              className="floating-mini-element element-1"
              animate={{ y: [-6, 6, -6], rotate: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <Sparkles size={20} className="text-cyan" />
            </motion.div>
            <motion.div
              className="floating-mini-element element-2"
              animate={{ y: [8, -8, 8], rotate: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              aria-hidden="true"
            >
              <Stars size={18} className="text-pink" />
            </motion.div>
          </div>

          {/* EXACT requirement: Display the exact phrase "i love you" followed by recipient's name */}
          <div className="final-phrase-box">
            <span className="final-prelude font-arabic-body">من أعماق القلب إلى روحكِ الجميلة</span>

            <h1 className="final-declaration font-romantic-serif">
              <span className="declaration-phrase">i love you</span>{' '}
              <span className="declaration-recipient-name">
                {safeDisplayName}
              </span>
            </h1>

            <div className="final-arabic-echo font-arabic-title">
              أحبكِ بكل ما أوتيتُ من نبض، اليوم وغداً وإلى نهاية العمر ❤️
            </div>
          </div>

          {/* Letter excerpt note */}
          <div className="final-letter-extract font-arabic-body">
            <p>
              مهما تبدلت الفصول ومرت الأيام، ستظلين دائماً المعجزة الأجمل التي أضاءت حياتي. شكراً لأنكِ أنتِ، بنقائكِ، وسحركِ، وابتسامتكِ التي تصنع ربيعاً في قلبي في عز الشتاء.
            </p>
          </div>

          {/* Subtle sign-off badge */}
          <div className="final-signoff-row">
            <div className="signoff-signature font-romantic-serif">Forever Yours</div>
            <div className="signoff-icon">
              <Flame size={16} className="text-pink" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
