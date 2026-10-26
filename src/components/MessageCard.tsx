import React from 'react';
import { motion } from 'framer-motion';
import type { RomanticMessage } from '../types';
import { Heart, Feather, Sparkles } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface MessageCardProps {
  message: RomanticMessage;
  index: number;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message, index }) => {
  const prefersReducedMotion = useReducedMotion();
  const isRtl = message.dir === 'rtl' || (!message.dir && /[\u0600-\u06FF]/.test(message.body));

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : index * 0.12 }}
      className={`message-card liquid-glass-card accent-${message.accent || 'pink'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
      aria-labelledby={`msg-title-${message.id}`}
    >
      {/* Top Header of the Card */}
      <div className="card-top-row">
        {message.tag && (
          <span className="card-tag">
            <Sparkles size={13} aria-hidden="true" />
            <span>{message.tag}</span>
          </span>
        )}

        {message.date && (
          <span className="card-date font-arabic-body">
            {message.date}
          </span>
        )}

        <div className="card-icon-end">
          <Heart size={16} className="card-heart-icon" aria-hidden="true" />
        </div>
      </div>

      {/* Optional Title */}
      {message.title && (
        <h3
          id={`msg-title-${message.id}`}
          className={`card-title ${isRtl ? 'font-arabic-title' : 'font-romantic-serif'}`}
        >
          {message.title}
        </h3>
      )}

      {/* Body Content */}
      <p className={`card-body ${isRtl ? 'font-arabic-body text-rtl' : 'font-sans text-ltr'}`}>
        {message.body}
      </p>

      {/* Card Footer Decoration */}
      <div className="card-bottom-row" aria-hidden="true">
        <Feather size={14} className="card-feather" />
        <div className="card-divider-line" />
      </div>
    </motion.article>
  );
};
