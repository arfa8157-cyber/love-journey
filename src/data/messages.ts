import type { RomanticMessage } from '../types';

export const ROMANTIC_MESSAGES: RomanticMessage[] = [
  {
    id: 'msg-1',
    title: 'قمرين في سماء واحدة',
    body: 'كلما نظرتُ إلى عينيكِ تساءلت، كيف يمكن لكونٍ كامل من السحر والهدوء أن يجتمع في نظرة واحدة؟ أنتِ لستِ فقط قمراً يضيء عتمة ليلي، بل أنتِ الضياء الذي يعيد لروحي بهجتها.',
    dir: 'rtl',
    date: 'رسالة الصباح',
    tag: 'عينيكِ',
    accent: 'pink'
  },
  {
    id: 'msg-2',
    title: 'The Constellation in Your Smile',
    body: 'In a world that rushes past, your smile is my quiet sanctuary. Like light diffusing through crystal glass, every glance from you brings soft warmth into every corner of my heart.',
    dir: 'ltr',
    date: 'First Memory',
    tag: 'Sanctuary',
    accent: 'blue'
  },
  {
    id: 'msg-3',
    title: 'زهرة لا تذبل أبدًا',
    body: 'حين أهديكِ الورد، أعلم أنه يستحي من رقّة يديكِ، فالزهور تنحني احتراماً للجمال الذي ينبض في قلبكِ قبل ملامحكِ.',
    dir: 'rtl',
    date: 'هدية القلب',
    tag: 'وردة بيضاء',
    accent: 'lavender'
  },
  {
    id: 'msg-4',
    title: 'A Lifetime of Heartbeats',
    body: 'If each heartbeat were a word, every second would whisper your name. Meeting you wasn\'t just chance; it was destiny unfolding its sweetest melody.',
    dir: 'ltr',
    date: 'Whisper',
    tag: 'Timeless',
    accent: 'pink'
  },
  {
    id: 'msg-5',
    title: 'وعد إلى الأبد',
    body: 'سأظل دائماً هنا، بين دعاء وابتسامة، أحرس حلمكِ وأكون لكِ الأمان والسند، كما كنتِ أنتِ دائماً لقلبي النور والدفء والوطن.',
    dir: 'rtl',
    date: 'عهد المحبة',
    tag: 'إلى الأبد',
    accent: 'blue'
  }
];

export const DEMO_CONFIG = {
  // Demo password clearly documented as required by specification
  demoPassword: import.meta.env.VITE_DEMO_PASSWORD || '11/10/2007',
  backupHint: '❤️❤️',
  arabicHeading: 'قمرين دول ولا عنيك',
  defaultRecipient: 'حبيبتي'
};
