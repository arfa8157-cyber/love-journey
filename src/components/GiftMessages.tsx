import React from 'react';
import { motion } from 'framer-motion';
import { ROMANTIC_MESSAGES } from '../data/messages';
import { MessageCard } from './MessageCard';
import { Mail, Sparkles, HeartHandshake } from 'lucide-react';

interface GiftMessagesProps {
  recipientName: string;
}

export const GiftMessages: React.FC<GiftMessagesProps> = ({ recipientName }) => {
  return (
    <section id="section-3" className="gift-messages-section" aria-label="Romantic Gift Messages">
      {/* Background Ambience */}
      <div className="section-ambient-glow" aria-hidden="true">
        <div className="glow-sphere glow-lavender" />
        <div className="glow-sphere glow-pink" />
      </div>

      <div className="section-inner-container">
        {/* Section Heading */}
        <header className="section-header-box">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-badge liquid-glass-card"
          >
            <Mail size={16} className="text-pink" aria-hidden="true" />
            <span className="font-arabic-body">رسائل القلب والروح</span>
            <Sparkles size={16} className="text-blue" aria-hidden="true" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-main-title font-arabic-title"
          >
            كلماتٌ كُتبت لأجلكِ يا {recipientName || 'غاليتي'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="section-subtitle font-arabic-body"
          >
            كل حرف هنا ينبض بصدق المشاعر، اختير بعناية ليعبر عما يعجز اللسان عن قوله
          </motion.p>
        </header>

        {/* Scrollable Series of Typed Romantic Messages */}
        <div className="messages-list-wrapper">
          {ROMANTIC_MESSAGES.map((msg, index) => (
            <MessageCard key={msg.id} message={msg} index={index} />
          ))}
        </div>

        {/* Section Bottom Ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-footer-ornament"
          aria-hidden="true"
        >
          <div className="ornament-line" />
          <HeartHandshake size={22} className="ornament-icon text-pink" />
          <div className="ornament-line" />
        </motion.div>
      </div>
    </section>
  );
};
