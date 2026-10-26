export type PasswordStatus = 'idle' | 'checking' | 'valid' | 'invalid';

export interface UnlockState {
  isUnlocked: boolean;
  unlockedAt: number | null;
}

export interface RomanticMessage {
  id: string;
  title?: string;
  body: string;
  dir?: 'rtl' | 'ltr';
  date?: string;
  tag?: string;
  accent?: 'blue' | 'pink' | 'lavender';
}

export type ExportStatus = 'idle' | 'generating' | 'success' | 'error';

export type ShareStatus = 'idle' | 'copying' | 'copied' | 'shared' | 'error';

export type SectionId = 'section-1' | 'section-2' | 'section-3' | 'section-4' | 'section-5';

export interface AppState {
  recipientName: string;
  isUnlocked: boolean;
  doorOpened: boolean;
  activeSection: SectionId;
}
