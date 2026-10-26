import React, { useState, useEffect } from 'react';
import { HeartHeader } from '../components/HeartHeader';
import { PasswordGate } from '../components/PasswordGate';
import { Scene2 } from '../components/Scene2';
import { GiftMessages } from '../components/GiftMessages';
import { FinalNote } from '../components/FinalNote';
import { SharePanel } from '../components/SharePanel';
import { useSectionProgress } from '../hooks/useSectionProgress';
import type { SectionId } from '../types';
import { Heart, Lock, KeyRound, Sparkles } from 'lucide-react';
import './app.css';

export const App: React.FC = () => {
  const [recipientName, setRecipientName] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isDoorOpen, setIsDoorOpen] = useState<boolean>(false);
  const [isGateModalOpen, setIsGateModalOpen] = useState<boolean>(false);

  const sectionIds: SectionId[] = [
    'section-1',
    'section-2',
    'section-3',
    'section-4',
    'section-5'
  ];

  // Track active section and update dynamic scrollbar theme
  const activeSection = useSectionProgress(sectionIds);

  // Check URL query param ?to= on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const toParam = urlParams.get('to');
      if (toParam && toParam.trim()) {
        setRecipientName(toParam.trim());
      }
    }
  }, []);

  const handleOpenGate = () => {
    if (isUnlocked) {
      // If already unlocked, scroll to section 2
      scrollToSection('section-2');
    } else {
      setIsGateModalOpen(true);
    }
  };

  const handlePasswordSuccess = (name: string) => {
    setRecipientName(name);
    setIsGateModalOpen(false);
    setIsDoorOpen(true);

    setTimeout(() => {
      setIsUnlocked(true);
      // Smoothly scroll down to section 2
      setTimeout(() => {
        scrollToSection('section-2');
      }, 600);
    }, 400);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-viewport">
      {/* Background Floating Orbs and Sparks */}
      <div className="app-floating-orbs" aria-hidden="true">
        <div className="ambient-orb orb-pink" />
        <div className="ambient-orb orb-blue" />
        <div className="ambient-orb orb-lavender" />
      </div>

      {/* Floating Header Navigation Dock (visible once unlocked) */}
      {isUnlocked && (
        <nav className="app-nav-dock liquid-glass-card" aria-label="Main Navigation">
          <a
            href="#section-1"
            className="nav-brand font-arabic-title"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('section-1');
            }}
          >
            <Heart size={16} className="text-pink animate-pulse" />
            <span>قمرين</span>
          </a>

          <ul className="nav-links-list">
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('section-2')}
                className={`nav-link-btn ${activeSection === 'section-2' ? 'active-nav' : ''}`}
              >
                الوردة
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('section-3')}
                className={`nav-link-btn ${activeSection === 'section-3' ? 'active-nav' : ''}`}
              >
                الرسائل
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('section-4')}
                className={`nav-link-btn ${activeSection === 'section-4' ? 'active-nav' : ''}`}
              >
                الاعتراف
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('section-5')}
                className={`nav-link-btn ${activeSection === 'section-5' ? 'active-nav' : ''}`}
              >
                مشاركة
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Main Sections */}
      <main id="main-content">
        {/* Section 1: Heartbeat Header & Password Gate */}
        <HeartHeader
          isUnlocked={isUnlocked}
          isDoorOpen={isDoorOpen}
          onOpenGate={handleOpenGate}
          onScrollDown={() => scrollToSection('section-2')}
        />

        {/* Sections 2 to 5: Unlocked Experience */}
        {isUnlocked ? (
          <>
            {/* Section 2: Flower Scene with scroll-linked Framer Motion handover */}
            <Scene2 recipientName={recipientName} />

            {/* Section 3: Data-driven Gift Messages */}
            <GiftMessages recipientName={recipientName} />

            {/* Section 4: Final Message ("i love you" + recipient name) */}
            <FinalNote recipientName={recipientName} />

            {/* Section 5: Save & Share (PDF export, URL copy, web share) */}
            <SharePanel recipientName={recipientName} />
          </>
        ) : (
          /* Locked State Teaser Invitation */
          <div className="locked-experience-lockout">
            <div className="locked-teaser-card liquid-glass-card">
              <div className="teaser-lock-icon">
                <Lock size={28} />
              </div>
              <h2 className="teaser-title font-arabic-title">
                الرحلة محمية بباب القلب
              </h2>
              <p className="teaser-desc font-arabic-body">
                هذه الصفحة تحتوي على رسائل حب وذكريات خاصة. اضغط على الباب في الأعلى وأدخل كلمة المرور لفك القفل والاستمتاع بالتجربة الكاملة.
              </p>
              <button
                type="button"
                onClick={handleOpenGate}
                className="teaser-action-btn font-arabic-title"
              >
                <KeyRound size={18} />
                <span>إدخال كلمة المرور الآن</span>
                <Sparkles size={16} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Password Gate Modal Dialog */}
      <PasswordGate
        isOpen={isGateModalOpen}
        onClose={() => setIsGateModalOpen(false)}
        onSuccess={handlePasswordSuccess}
        recipientName={recipientName}
        onRecipientChange={setRecipientName}
      />
    </div>
  );
};

export default App;
