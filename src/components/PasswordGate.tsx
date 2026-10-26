import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, Lock, Unlock, HelpCircle, X, HeartHandshake } from 'lucide-react';
import { RecipientForm } from './RecipientForm';
import { DEMO_CONFIG } from '../data/messages';

interface PasswordGateProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (recipientName: string) => void;
  recipientName: string;
  onRecipientChange: (name: string) => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({
  isOpen,
  onClose,
  onSuccess,
  recipientName,
  onRecipientChange
}) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [nameError, setNameError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isUnlockedSuccess, setIsUnlockedSuccess] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setErrorMsg('');
      setIsUnlockedSuccess(false);
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isVerifying && !isUnlockedSuccess) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isVerifying, isUnlockedSuccess, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setNameError('');

    const trimmedName = recipientName.trim();
    if (!trimmedName) {
      setNameError('الرجاء إدخال الاسم لتخصيص الهدية (أو سيتم استخدام اسم افتراضي)');
      // If user left it empty, assign default
      onRecipientChange(DEMO_CONFIG.defaultRecipient);
    }

    const trimmedInput = password.trim();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      // Validate against configured demo password
      if (trimmedInput === DEMO_CONFIG.demoPassword) {
        setIsUnlockedSuccess(true);
        setTimeout(() => {
          onSuccess(trimmedName || DEMO_CONFIG.defaultRecipient);
        }, 800);
      } else {
        // EXACT requirement: display the exact error message "Wrong password" when invalid
        setErrorMsg('Wrong password');
      }
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isVerifying && !isUnlockedSuccess) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="password-gate-card liquid-glass-card"
          >
            <button
              type="button"
              onClick={onClose}
              className="modal-close-btn"
              aria-label="إغلاق / Close dialog"
              disabled={isVerifying || isUnlockedSuccess}
            >
              <X size={20} />
            </button>

            <div className="gate-header">
              <div className="gate-icon-badge">
                {isUnlockedSuccess ? (
                  <Unlock className="icon-gold animate-bounce" size={28} />
                ) : (
                  <Lock className="icon-pink" size={28} />
                )}
              </div>
              <h2 id="gate-modal-title" className="gate-title font-arabic-title">
                منطقة الحب
              </h2>
              <p className="gate-subtitle">
                افتح باب القلب لتبدأ رحلتك الرومانسية 
              </p>
            </div>

            <form onSubmit={handleSubmit} className="gate-form" noValidate>
              {/* Recipient Form Step */}
              <RecipientForm
                value={recipientName}
                onChange={(name) => {
                  onRecipientChange(name);
                  if (nameError) setNameError('');
                }}
                error={nameError}
                disabled={isVerifying || isUnlockedSuccess}
              />

              {/* Password Input */}
              <div className="recipient-form-group">
                <label htmlFor="gate-password-input" className="recipient-label">
                  <span className="recipient-label-title">كلمة المرور / Password</span>
                  <span className="recipient-label-subtitle">أدخل كلمة المرور لفتح البوابة</span>
                </label>

                <div className="recipient-input-wrapper">
                  <KeyRound className="recipient-input-icon" size={20} aria-hidden="true" />
                  <input
                    ref={passwordInputRef}
                    id="gate-password-input"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="••••••••"
                    disabled={isVerifying || isUnlockedSuccess}
                    autoComplete="current-password"
                    aria-invalid={!!errorMsg}
                    aria-describedby={errorMsg ? 'password-error-alert' : 'password-hint-text'}
                    className={`recipient-input ${errorMsg ? 'recipient-input-invalid' : ''}`}
                    required
                  />
                </div>

                {/* EXACT requirement: display the exact error message "Wrong password" when invalid */}
                {errorMsg && (
                  <p id="password-error-alert" className="form-error-msg" role="alert" aria-live="assertive">
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Backup password hint */}
              <div className="gate-hint-box" id="password-hint-text">
                <HelpCircle size={16} className="hint-icon" aria-hidden="true" />
                <span className="hint-text font-arabic-body">
                  {DEMO_CONFIG.backupHint}
                </span>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isVerifying || isUnlockedSuccess}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`gate-submit-btn ${isUnlockedSuccess ? 'gate-btn-success' : ''}`}
              >
                {isVerifying ? (
                  <span className="btn-loading-content">
                    <span className="spinner-dots" /> جارٍ التحقق...
                  </span>
                ) : isUnlockedSuccess ? (
                  <span className="btn-loading-content">
                    <HeartHandshake size={20} /> مرحباً بكِ في قلبي!
                  </span>
                ) : (
                  <span>افتح الباب الآن • Open Door</span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
