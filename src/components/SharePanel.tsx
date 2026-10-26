import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, Copy, Check, AlertCircle, Sparkles, Heart, FileText, Info } from 'lucide-react';
import { exportLoveLetterPdf } from '../utils/exportPdf';
import { shareExperience, copyUrlToClipboard, getShareableUrl } from '../utils/share';
import type { ExportStatus, ShareStatus } from '../types';
import { ROMANTIC_MESSAGES, DEMO_CONFIG } from '../data/messages';

interface SharePanelProps {
  recipientName: string;
}

export const SharePanel: React.FC<SharePanelProps> = ({ recipientName }) => {
  const [exportStatus, setExportStatus] = useState<ExportStatus>('idle');
  const [shareStatus, setShareStatus] = useState<ShareStatus>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const safeName = recipientName && recipientName.trim() ? recipientName.trim() : DEMO_CONFIG.defaultRecipient;
  const shareableUrl = getShareableUrl(safeName);

  const handleExportPdf = async () => {
    setExportStatus('generating');
    setFeedbackMsg({ text: 'جارٍ تجهيز ملف PDF عالي الجودة وتنسيق الرسالة...', type: 'info' });

    const result = await exportLoveLetterPdf({
      recipientName: safeName,
      elementId: 'printable-love-letter'
    });

    if (result.success) {
      setExportStatus('success');
      setFeedbackMsg({ text: result.message, type: 'success' });
      setTimeout(() => setExportStatus('idle'), 4000);
    } else {
      setExportStatus('error');
      setFeedbackMsg({ text: result.message, type: 'error' });
    }
  };

  const handleShare = async () => {
    setShareStatus('idle');
    const result = await shareExperience(safeName);
    if (result.success) {
      setShareStatus(result.action === 'shared' ? 'shared' : 'copied');
      setFeedbackMsg({ text: result.message, type: 'success' });
      setTimeout(() => setShareStatus('idle'), 3500);
    } else {
      setShareStatus('error');
      setFeedbackMsg({ text: result.message, type: 'error' });
    }
  };

  const handleCopyLink = async () => {
    setShareStatus('copying');
    const result = await copyUrlToClipboard(safeName);
    if (result.success) {
      setShareStatus('copied');
      setFeedbackMsg({ text: result.message, type: 'success' });
      setTimeout(() => setShareStatus('idle'), 3500);
    } else {
      setShareStatus('error');
      setFeedbackMsg({ text: result.message, type: 'error' });
    }
  };

  return (
    <section id="section-5" className="share-panel-section" aria-label="Save and Share">
      <div className="share-panel-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="share-glass-card liquid-glass-card"
        >
          {/* Section Header */}
          <div className="share-header">
            <div className="share-badge">
              <Share2 size={16} className="text-pink" />
              <span className="font-arabic-body">حفظ ومشاركة الذكرى</span>
              <Heart size={14} className="text-pink" />
            </div>

            <h2 className="share-title font-arabic-title">
              احتفظي بهذه اللحظة إلى الأبد
            </h2>
            <p className="share-desc font-arabic-body">
              يمكنكِ تصدير رسالة الحب كملف PDF تذكاري مطبوع، أو مشاركة الرابط المخصص مع من تحبين.
            </p>
          </div>

          {/* Interactive Action Buttons */}
          <div className="share-actions-grid">
            {/* PDF Export Button */}
            <motion.button
              type="button"
              onClick={handleExportPdf}
              disabled={exportStatus === 'generating'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="action-card-btn export-pdf-btn"
              aria-label="تصدير كملف PDF / Export as PDF"
            >
              <div className="btn-icon-circle">
                {exportStatus === 'generating' ? (
                  <span className="spinner-dots" />
                ) : (
                  <Download size={24} className="text-pink" />
                )}
              </div>
              <div className="btn-text-content">
                <span className="btn-primary-title font-arabic-title">تحميل كملف PDF</span>
                <span className="btn-secondary-desc">تنسيق A4 أنيق للطباعة والحفظ</span>
              </div>
              <FileText size={18} className="btn-end-icon" />
            </motion.button>

            {/* Native Share Button */}
            <motion.button
              type="button"
              onClick={handleShare}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="action-card-btn native-share-btn"
              aria-label="مشاركة الرابط / Share link"
            >
              <div className="btn-icon-circle">
                <Share2 size={24} className="text-blue" />
              </div>
              <div className="btn-text-content">
                <span className="btn-primary-title font-arabic-title">مشاركة التجربة</span>
                <span className="btn-secondary-desc">عبر واتساب أو تطبيقات التواصل</span>
              </div>
              <Sparkles size={18} className="btn-end-icon" />
            </motion.button>

            {/* Copy Link Button */}
            <motion.button
              type="button"
              onClick={handleCopyLink}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="action-card-btn copy-link-btn"
              aria-label="نسخ الرابط إلى الحافظة / Copy link to clipboard"
            >
              <div className="btn-icon-circle">
                {shareStatus === 'copied' ? (
                  <Check size={24} className="text-green" />
                ) : (
                  <Copy size={24} className="text-purple" />
                )}
              </div>
              <div className="btn-text-content">
                <span className="btn-primary-title font-arabic-title">
                  {shareStatus === 'copied' ? 'تم نسخ الرابط!' : 'نسخ الرابط المخصص'}
                </span>
                <span className="btn-secondary-desc">حفظ الرابط في الحافظة</span>
              </div>
              {shareStatus === 'copied' ? (
                <Check size={18} className="btn-end-icon text-green" />
              ) : (
                <Copy size={18} className="btn-end-icon" />
              )}
            </motion.button>
          </div>

          {/* Accessible Live Feedback Banner */}
          <AnimatePresence>
            {feedbackMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`feedback-banner feedback-${feedbackMsg.type}`}
                role="status"
                aria-live="polite"
              >
                {feedbackMsg.type === 'error' ? (
                  <AlertCircle size={18} className="feedback-icon" />
                ) : (
                  <Sparkles size={18} className="feedback-icon" />
                )}
                <span className="feedback-text font-arabic-body">{feedbackMsg.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Privacy & URL Architecture Notice */}
          <div className="share-privacy-note">
            <Info size={16} className="text-blue" aria-hidden="true" />
            <div className="note-text font-arabic-body">
              <span><strong>ملاحظة الخصوصية:</strong> رابط المشاركة المخصص يتضمن فقط اسم المستلمة لتهيئة الصفحة للعرض، ولا يتضمن أي كلمات مرور أو بيانات حساسة في الرابط.</span>
              <div className="share-url-preview font-sans">
                <code>{shareableUrl}</code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          PRINTABLE LOVE LETTER CONTAINER
          Specially formatted for clean A4 PDF export with html2pdf.js.
          Positioned off-screen during regular web browsing to prevent layout clutter.
         ========================================================================= */}
      <div id="printable-love-letter" className="printable-pdf-document" aria-hidden="true">
        <div className="pdf-page-wrapper">
          {/* Decorative PDF Header */}
          <div className="pdf-header">
            <div className="pdf-ornament-top">❦ ❧</div>
            <h1 className="pdf-main-heading">قمرين دول ولا عنيك</h1>
            <p className="pdf-subheading">A Keepsake Romantic Letter For {safeName}</p>
            <div className="pdf-divider" />
          </div>

          {/* Declaration */}
          <div className="pdf-declaration-section">
            <h2 className="pdf-declaration-title">i love you {safeName}</h2>
            <p className="pdf-declaration-arabic">
              أحبكِ بكل ما أوتيتُ من نبض، اليوم وغداً وإلى نهاية العمر ❤️
            </p>
          </div>

          {/* Selected Romantic Excerpts */}
          <div className="pdf-messages-list">
            {ROMANTIC_MESSAGES.map((msg) => (
              <div key={msg.id} className="pdf-message-item" dir={msg.dir || 'rtl'}>
                {msg.title && <h3 className="pdf-msg-title">{msg.title}</h3>}
                <p className="pdf-msg-body">{msg.body}</p>
                {msg.date && <span className="pdf-msg-date">{msg.date}</span>}
              </div>
            ))}
          </div>

          {/* PDF Footer Signoff */}
          <div className="pdf-footer">
            <div className="pdf-divider" />
            <div className="pdf-signature">Forever & Always With Love</div>
            <div className="pdf-date-stamped">
              {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
