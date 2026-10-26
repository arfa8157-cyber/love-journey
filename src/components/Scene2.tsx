import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { DEMO_CONFIG } from '../data/messages';

interface Scene2Props {
  recipientName: string;
}

export const Scene2: React.FC<Scene2Props> = ({ recipientName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking across the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Animated transforms synchronized with scroll
  // Boy steps forward
  const boyX = useTransform(scrollYProgress, [0, 0.45, 0.85], ['-15%', '0%', '5%']);
  const boyRotate = useTransform(scrollYProgress, [0, 0.5, 0.9], [-4, 2, 0]);

  // Flower moves from boy's hand towards girl's hands
  const flowerX = useTransform(scrollYProgress, [0.15, 0.5, 0.85], ['-22%', '0%', '20%']);
  const flowerY = useTransform(scrollYProgress, [0.15, 0.5, 0.85], ['10%', '-8%', '2%']);
  const flowerScale = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0.85, 1.25, 1.05]);
  const flowerRotate = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [-15, 10, 0]);

  // Girl leans forward with hands open to receive
  const girlX = useTransform(scrollYProgress, [0.1, 0.55, 0.85], ['15%', '5%', '-2%']);
  const girlRotate = useTransform(scrollYProgress, [0.1, 0.55, 0.85], [3, -2, 0]);

  // Romantic dialogue message emerges and fades in
  const messageOpacity = useTransform(scrollYProgress, [0.35, 0.6, 0.9], [0, 1, 1]);
  const messageY = useTransform(scrollYProgress, [0.35, 0.6, 0.9], [30, 0, 0]);

  // Floating heart caustics
  const sparkleScale = useTransform(scrollYProgress, [0.4, 0.8], [0.5, 1.3]);

  return (
    <section
      id="section-2"
      ref={containerRef}
      className="scene2-scroll-wrapper"
      aria-label="Flower Handover Scene"
    >
      <div className="scene2-sticky-container">
        {/* Soft background glow accents */}
        <div className="scene2-bg-aura" aria-hidden="true">
          <div className="aura-blob aura-white" />
          <div className="aura-blob aura-blue-glow" />
          <div className="aura-blob aura-pink-glow" />
        </div>

        {/* Header with EXACT Arabic heading: "قمرين دول ولا عنيك" */}
        <header className="scene2-header">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="scene2-title-badge liquid-glass-card"
          >
            <Sparkles className="icon-cyan" size={22} />
            <h2 className="scene2-title font-arabic-title">
              {DEMO_CONFIG.arabicHeading}
            </h2>
            <Sparkles className="icon-pink" size={22} />
          </motion.div>
          <p className="scene2-subtitle font-arabic-body">
            حين تلتقي النظرات، تتفتح ورود الحب وتهمس الأرواح بأجمل حكاية
          </p>
        </header>

        {/* Romantic Handover Stage */}
        <div className="handover-stage">
          {/* Boy Character */}
          <motion.div
            className="character-card boy-character-box liquid-glass-card"
            style={
              prefersReducedMotion
                ? { transform: 'none' }
                : { x: boyX, rotate: boyRotate }
            }
          >
            <div className="character-img-frame">
              <img
                src={`${import.meta.env.BASE_URL}assets/boy.jpg`}
                alt="Boy offering a gift with a warm gentle smile"
                className="character-img"
                loading="lazy"
              />
              <div className="character-label">
                <span>The Giver</span>
              </div>
            </div>
          </motion.div>

          {/* Central Flower Traveling in 3D liquid glass radiance */}
          <motion.div
            className="flower-handover-item"
            style={
              prefersReducedMotion
                ? { transform: 'scale(1.1)' }
                : {
                    x: flowerX,
                    y: flowerY,
                    scale: flowerScale,
                    rotate: flowerRotate
                  }
            }
          >
            <div className="flower-glow-halo" aria-hidden="true" />
            <div className="flower-crystal-frame liquid-glass-card">
              <img
                src={`${import.meta.env.BASE_URL}assets/flower.jpg`}
                alt="3D Glowing Liquid Glass Romantic Rose"
                className="flower-img"
                loading="lazy"
              />
            </div>

            {/* Sparkles radiating around the flower */}
            <motion.div
              className="flower-sparkles-cloud"
              style={prefersReducedMotion ? {} : { scale: sparkleScale }}
              aria-hidden="true"
            >
              <Heart size={18} className="sparkle-heart sparkle-heart-1" />
              <Sparkles size={16} className="sparkle-star sparkle-star-1" />
              <Heart size={14} className="sparkle-heart sparkle-heart-2" />
            </motion.div>
          </motion.div>

          {/* Girl Character */}
          <motion.div
            className="character-card girl-character-box liquid-glass-card"
            style={
              prefersReducedMotion
                ? { transform: 'none' }
                : { x: girlX, rotate: girlRotate }
            }
          >
            <div className="character-img-frame">
              <img
                src={`${import.meta.env.BASE_URL}assets/girl.jpg`}
                alt="Girl with delighted blushing expression receiving the flower"
                className="character-img"
                loading="lazy"
              />
              <div className="character-label">
                <span>{recipientName || 'Beloved'}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Revealed Romantic Dialogue Message */}
        <motion.div
          className="scene2-dialogue-card liquid-glass-card font-arabic-body"
          style={
            prefersReducedMotion
              ? { opacity: 1, transform: 'none' }
              : { opacity: messageOpacity, y: messageY }
          }
        >
          <div className="dialogue-content">
            <span className="dialogue-quote">❝</span>
            <p className="dialogue-arabic">
              وردة زجاجية تشبه صفاء قلبكِ، لا تذبل مهما طالت الأيام... لأنها رُويت بمحبتك.
            </p>
            <span className="dialogue-english">
              “Like crystal light meeting the dawn, you turned simple moments into eternity.”
            </span>
            <span className="dialogue-quote dialogue-quote-end">❞</span>
          </div>
        </motion.div>

        {/* Visual scroll guidance indicator */}
        <div className="scroll-hint-bar" aria-hidden="true">
          <div className="scroll-dot" />
          <span>مرري للأسفل لمتابعة تسليم الوردة • Scroll to hand over</span>
        </div>
      </div>
    </section>
  );
};
