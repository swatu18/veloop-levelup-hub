# 🚀 VeLoop Rewards — Level-Up Hub

A gaming-grade, fintech-premium rewards and level-up dashboard web application built for the **VeLoop** ecosystem.

Designed from the ground up to match the reference design screens (Page 33 specification), featuring custom vector badges, interactive HTML5 Canvas minigames, celebration modals with particle physics, and dedicated authentication.

---

## 🌟 The 6 Reference Screens

1. **Dashboard Home (Screen 1)**
   - Top Header with greeting, notifications bell indicator, and profile menu drawer.
   - **Hero Level Card:** 24K gold-beveled octagonal Level 05 badge, large XP counter (6,420 XP / 8,000 XP), dynamic progress bar.
   - **Today's Boost:** 3 stat cards for Today's XP (215 XP), Completed Tasks (4/8), and Active Streak (7 Days).
   - **Earn More Grid:** 6 circular action buttons (Watch & Earn, Daily Tasks, Refer & Earn, XP Catcher, Mini Games, Streak Bonus).
   - **Level 05 Rewards Vault:** Unlocked vault card leading directly to reward claims.
   - **Bottom Navigation:** Fixed 5-tab bar with golden active indicators.

2. **XP Catcher Game (Screen 2)**
   - High-performance HTML5 Canvas arcade game with 60 FPS requestAnimationFrame physics.
   - Falling items: Purple XP Orbs (`+20 XP`), Gold V-Coins (`+1 VE`), and Cosmic Green Gems (`+50 XP`).
   - Interactive gold-woven mesh basket responsive to touch dragging, mouse movement, and keyboard arrow keys (`←`, `→`).
   - Floating floating score indicators, live countdown timer, and 2X multiplier HUD.

3. **Challenge Complete with Share (Screen 3)**
   - Golden Laurel Wreath star shield trophy crest (`LaurelBadge`).
   - Final score celebration with `New Best!` badge.
   - Experience and VEs dual reward cards.
   - Real-time progress bar toward Level 06.
   - Native Web Share API integration with automatic fallback to clipboard copy toast notification.
   - "Play Again" and "Back to Dashboard" navigation.

4. **Earn & Level Up Hub (Screen 4)**
   - Full quest ledger with 6 mission cards featuring distinct icon color schemes.
   - Direct launch into XP Catcher or instant completion with immediate XP reward updates.
   - Motivational footer card celebrating milestone achievements.

5. **Level Up Celebration Modal (Screen 5)**
   - Fullscreen dark backdrop with floating golden confetti particle burst (`canvas-confetti`).
   - Grand Golden Laurel Wreath badge with level designation.
   - Dual reward cards (`+500 VEs` coins and `+25 Gems` rare crystals).
   - Unlocked perks checklist.
   - "Claim Rewards" action button that updates user balance in real-time.

6. **Recent Activity Ledger (Screen 6)**
   - Detailed ledger of transactions and rewards with relative timestamps.
   - Interactive filter toggle (`All`, `XP`, `VEs`).
   - Today's Summary card tracking total earned XP and VEs.

---

## 🔒 Realistic Authentication

- **Sign In Page (`/signin`):** Email and password authentication with validation.
- **Sign Up Page (`/signup`):** Full name, email, password confirmation, and terms acceptance.
- **Protected Routes:** Automatic redirection to authentication when not logged in.
- **Pure realistic flows:** Zero pre-filled demo accounts or reviewer bypass shortcuts.

---

## 📱 Responsive & Mobile-First Design

- Designed specifically for standard mobile viewport constraints (`viewport-fit=cover`, `user-scalable=no`).
- iOS safe-area inset padding (`env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`).
- Centered mobile frame layout on desktop displays (`768px+`) with obsidian ambient glow.
- `touch-action: none` applied to canvas to prevent accidental scroll during gameplay.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 + Custom Dark Theme CSS
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Particles:** Canvas Confetti

---

## 🏃 Running Locally

```bash
# Clone the repository
git clone https://github.com/swatu18/veloop-levelup-hub.git

# Navigate into project directory
cd veloop-levelup-hub

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```
