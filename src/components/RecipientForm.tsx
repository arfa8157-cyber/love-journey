import React from 'react';
import { User, Sparkles } from 'lucide-react';

interface RecipientFormProps {
  value: string;
  onChange: (name: string) => void;
  error?: string;
  disabled?: boolean;
}

export const RecipientForm: React.FC<RecipientFormProps> = ({
  value,
  onChange,
  error,
  disabled = false
}) => {
  return (
    <div className="recipient-form-group">
      <label htmlFor="recipient-name" className="recipient-label">
        <span className="recipient-label-title">الاسم </span>
        <span className="recipient-label-subtitle">اكتبي اسمكِ </span>
      </label>

      <div className="recipient-input-wrapper">
        <User className="recipient-input-icon" size={20} aria-hidden="true" />
        <input
          id="recipient-name"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" ادخل الاسم"
          disabled={disabled}
          autoComplete="off"
          aria-invalid={!!error}
          aria-describedby={error ? 'recipient-name-error' : 'recipient-name-desc'}
          className={`recipient-input ${error ? 'recipient-input-invalid' : ''}`}
        />
        <Sparkles className="recipient-input-sparkle" size={18} aria-hidden="true" />
      </div>

      <div id="recipient-name-desc" className="sr-only">
        سيتم استخدام هذا الاسم لتخصيص الرسالة الختامية ورسائل الحب.
      </div>

      {error && (
        <p id="recipient-name-error" className="form-error-msg" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
