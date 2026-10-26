# 🌸 Romantic 3D Liquid Glass Interactive Experience ("قمرين دول ولا عنيك")

A production-ready, interactive romantic web application built with **React, TypeScript, Vite, Framer Motion**, and a custom **3D Liquid Glass** design system.

---

## 🌟 Visual & Design System

- **Palette**: Translucent whites, soft pinks (`#f472b6`, `#fbcfe8`), ambient sky blues (`#38bdf8`, `#bae6fd`), and restrained lavender accents.
- **3D Liquid Glass Aesthetics**: Multi-layered backdrop blurs (`backdrop-filter: blur(20px)`), frosted glass panels, inner specular highlights, and soft multi-colored drop shadows.
- **Section-Aware Scrollbar**: Custom scrollbar styling that smoothly shifts its theme (`--scrollbar-thumb` and `--scrollbar-track`) dynamically based on the currently active section.
- **Micro-Animations & Particles**: Rhythmic heartbeat pulse with an emerging background heart, floating ambient particles, 3D perspective door opening, and soft celebratory confetti.

---

## 🧭 User Journey Across the 5 Sections

### Section 1: Heartbeat Header & Password Gate
- A large centered liquid glass heart with a continuous subtle heartbeat animation.
- A secondary glowing pink heart dynamically emerges from behind during each beat pulse.
- A central visually recognizable ornate glass door equipped with a crystal handle.
- Clicking or pressing <kbd>Enter</kbd> / <kbd>Space</kbd> on the door opens the accessible **Password Gate** modal.
- Includes a recipient name field before unlocking.
- **Password Verification**:
  - Displays the exact error message **`"Wrong password"`** on invalid input.
  - Guidance hint displayed: **`"الباسورد الاحتياطي 11/10/2007"`**.
  - On correct password entry (`11/10/2007`), the door rotates open in 3D (`rotateY(-82deg)`), unleashing inner radiance, and smoothly transitions down to Section 2.

### Section 2: Flower Scene
- Exact Arabic heading **`"قمرين دول ولا عنيك"`** centered above the romantic illustration.
- 3D boy and girl character artwork in high-fidelity romantic claymation/glass aesthetic.
- The boy gives a luminous 3D liquid glass rose to the girl as the user scrolls.
- Choreographed with Framer Motion `useScroll` and `useTransform` to synchronize character movement, flower trajectory, and romantic dialogue opacity.
- Fully supports `prefers-reduced-motion` with a graceful static layout.

### Section 3: Gift Messages
- Vertically scrollable series of romantic letters and poetic reflections.
- Purely data-driven from [`src/data/messages.ts`](src/data/messages.ts).
- Reusable [`MessageCard`](src/components/MessageCard.tsx) component supporting both Arabic RTL and English LTR layouts, custom tags, dates, and subtle entrance animations.

### Section 4: Final Declaration
- Displays the exact phrase: **`"i love you"`** followed by the recipient's name (e.g. `"i love you Sarah"`).
- Rendered safely as plain text to prevent XSS / HTML injection.
- Features a glowing, pulsing heart with floating celestial sparkles and delicate romantic confetti.

### Section 5: Save & Share
- **Client-Side PDF Export**: Generates an A4 PDF keepsake using `html2pdf.js` targeting a dedicated, clean print layout (excluding interactive buttons and distracting blobs).
- **Native Share & Clipboard Copy**: Uses the Web Share API (`navigator.share`) with automatic fallback to modern clipboard API and legacy `execCommand`.
- **Safe Shareable URLs**: Documented URL strategy using `?to=RecipientName`. Does not expose passwords in URL parameters.

---

## 📁 Project Architecture

```
love-website/
├── public/
│   └── assets/
│       ├── boy.jpg           # 3D romantic boy illustration
│       ├── girl.jpg          # 3D romantic girl illustration
│       ├── flower.jpg        # 3D glowing liquid glass rose
│       └── heart-door.jpg    # 3D heart with central ornate door
├── src/
│   ├── app/
│   │   ├── App.tsx           # Main application coordinator & navigation
│   │   └── app.css           # 3D Liquid glass styles & responsive layouts
│   ├── components/
│   │   ├── HeartHeader.tsx   # Section 1: Heartbeat & interactive door
│   │   ├── PasswordGate.tsx  # Section 1: Accessible password modal
│   │   ├── RecipientForm.tsx # Recipient name input with validation
│   │   ├── Scene2.tsx        # Section 2: Scroll-linked flower handover
│   │   ├── GiftMessages.tsx  # Section 3: Data-driven romantic messages
│   │   ├── MessageCard.tsx   # Reusable RTL/LTR message card
│   │   ├── FinalNote.tsx     # Section 4: "i love you [name]" declaration
│   │   └── SharePanel.tsx    # Section 5: PDF export & sharing controls
│   ├── data/
│   │   └── messages.ts       # Typed romantic messages and configuration
│   ├── hooks/
│   │   ├── useReducedMotion.ts   # Detects prefers-reduced-motion
│   │   └── useSectionProgress.ts # IntersectionObserver for section tracking
│   ├── utils/
│   │   ├── exportPdf.ts      # A4 PDF export with dynamic html2pdf import
│   │   └── share.ts          # Web Share API & clipboard fallbacks
│   ├── types/
│   │   ├── index.ts          # Core TypeScript types
│   │   └── html2pdf.d.ts     # Typings for html2pdf.js
│   ├── index.css             # Design tokens, variables & section scrollbars
│   └── main.tsx              # Application entry point
├── .env.example              # Template environment variables
├── .gitignore                # Git ignore rules for node_modules & env
├── package.json              # Project dependencies and scripts
└── vite.config.ts            # Vite configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `20.19+` or `22.12+`
- npm, yarn, or pnpm

### 2. Installation
```bash
git clone https://github.com/arfa8157-cyber/love-website.git
cd love-website
npm ci
```

### 3. Local Development
```bash
npm run dev
```
Open your browser at `http://localhost:5173/`.

### 4. Demo Password Configuration
The default demo password is set to:
```
11/10/2007
```
To customize the demo password locally, create a `.env.local` file:
```env
VITE_DEMO_PASSWORD=your_custom_password
```

---

## 🔒 Security & Privacy Notice

> [!IMPORTANT]
> **Client-Side Limitations**: This application uses a frontend demo password gate for presentation and MVP purposes. Frontend environment variables and JavaScript code are publicly accessible in client bundles and **do not** provide cryptographically secure access control.
>
> **For Production Privacy**:
> - Implement a backend authentication endpoint (e.g., Express, Fastify, Next.js API, or Serverless functions).
> - Hash and verify credentials securely on the server with constant-time comparison.
> - Deliver protected love letters and sensitive content only after verifying an HTTP-only session cookie or signed JWT.
> - Shareable URLs intentionally exclude passwords (`?to=name` only supplies display names).

---

## 📦 Production Build & Deployment

### Build Command
```bash
npm run build
```
This compiles TypeScript via `tsc -b` and builds optimized production bundles via Vite into the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- **Vercel / Netlify**: Connect the GitHub repository, set framework preset to `Vite`, build command to `npm run build`, and publish directory to `dist`.
- **GitHub Pages**: A workflow builds and deploys `dist/` whenever you push to `main`. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.

---

## ✅ Acceptance Test Checklist

- [x] **Section 1**: Large heart pulses rhythmically; smaller heart emerges from behind during each pulse.
- [x] **Section 1**: Ornate central door triggers modal when clicked or keyboard-activated (<kbd>Enter</kbd> / <kbd>Space</kbd>).
- [x] **Section 1**: Submitting an invalid password triggers the exact error text `"Wrong password"`.
- [x] **Section 1**: Entering `"11/10/2007"` opens the door in 3D and unlocks the experience.
- [x] **Section 2**: Displays exact Arabic heading `"قمرين دول ولا عنيك"`.
- [x] **Section 2**: Boy and girl characters choreographed with Framer Motion `useScroll`; flower glides from boy to girl as user scrolls.
- [x] **Section 2**: Romantic quote reveals itself smoothly during the handover.
- [x] **Section 3**: All messages rendered from typed data file; supports RTL Arabic and LTR English.
- [x] **Section 4**: Displays exact phrase `"i love you"` followed by the recipient's name with glowing heart and confetti.
- [x] **Section 5**: Client-side PDF export formats an A4 document excluding navigation and buttons.
- [x] **Section 5**: Copy link and Web Share buttons provide visual feedback.
- [x] **Accessibility**: Form labels, `aria-live` announcements, keyboard navigation, and reduced-motion fallbacks.
- [x] **Performance**: Initial JavaScript bundle is split (~420kB); heavy `html2pdf.js` is dynamically loaded on demand.

---

## 💡 Future Enhancements

1. **Audio Ambiance**: Add an optional soft, soothing piano background soundtrack with a mute/unmute control.
2. **Server-Side Authentication**: Implement backend password hashing with bcrypt/Argon2 and rate-limiting to prevent brute force attacks.
3. **Interactive Flower Petals**: 3D WebGL / Three.js particle canvas where glass flower petals float interactively with mouse cursor movement.
4. **Photo Timeline**: Allow couples to upload and view an interactive liquid glass memory photo carousel.
"# love-website" 
"# love-journey" 
