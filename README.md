# 🚀 VELOOP Rewards — Level-Up Progression & Engagement Hub
### Task 16: Complete Level-Up Dashboard Redesign

A gaming-grade, fintech-inspired gamified progression center and rewards dashboard engineered for the **VeLoop Rewards** ecosystem. Built according to the **Task 16 Specification & Page 33 UI Reference**.

---

## 🔗 Project Links

- **Live Deployment:** [https://veloop-levelup-hub.vercel.app](https://veloop-levelup-hub.vercel.app)
- **Direct Route:** [https://veloop-levelup-hub.vercel.app/Lvl-Dashboard](https://veloop-levelup-hub.vercel.app/Lvl-Dashboard)
- **GitHub Repository:** [https://github.com/swatu18/veloop-levelup-hub](https://github.com/swatu18/veloop-levelup-hub)

---

## 📸 The 6 Reference Screens (Page 33 Specification)

The application matches the exact 6 screens from the design attachment:

1. **Screen 1: Dashboard Home**
   - **Header:** Hamburger drawer, greeting (*"Good Morning, VeLooper!"*), subtitle (*"Level up your journey and unlock epic rewards every day."*), notification bell indicator, sound toggle.
   - **Hero Level Card:** 24K gold chamfered octagonal **Level 05** badge (`OctagonBadge`), prominent XP counter (**6,420 XP** to reach Level 06), dynamic progress bar (**6,420 / 8,000 XP**, 80%), and explicit calculation (**1,580 XP Needed to Level 06**). Includes an `[i]` Level info tooltip.
   - **Today's Boost:** 3 stat cards: XP Earned (**215 XP**), Daily Tasks Done (**4 / 8**), and Active Player Streak (**7 Days**).
   - **Earn More Grid:** 6 high-contrast circular/rounded cards in 2 rows of 3:
     - 🟣 **Watch & Earn** (`+50 XP`)
     - 📋 **Daily Tasks** (`+30 XP`)
     - 👥 **Refer & Earn** (`+100 XP`)
     - 🧲 **XP Catcher** (Play Arcade / `+10 XP`)
     - 🎮 **Mini Games** (`+75 XP`)
     - 🔥 **Streak Bonus** (`+25 XP`)
   - **Level 05 Rewards Vault:** 3D wooden/gold treasure chest with glowing purple amethyst gems spilling out. Clicking opens the reward claim modal.
   - **Bottom Navigation Bar:** Mobile-fixed 5 tabs: **Home**, **Earn** ($), **Rewards** (Gift), **Wallet**, and **Profile**.

2. **Screen 2: XP Catcher Arcade (Interactive Mini-Game)**
   - Top status bar with Back button, **XP CATCHER `(i)`**, and live **00:18** countdown timer.
   - Subtitle: *"Catch XP orbs & coins. Score high for better rewards!"*
   - Real-time HTML5 Canvas rendering (60 FPS):
     - Falling purple spheres (**XP Orbs** with white "XP" label)
     - Golden coins (**V-Coins** with engraved "V")
     - Multifaceted green gems
   - Gold-woven mesh collector basket with smooth mouse dragging, touch sliding, and keyboard arrow controls (`←`, `→`).
   - Floating score popups (`+10 XP`, `+25 XP`), dynamic multipliers (`2X Multiplier`), and sound effects.

3. **Screen 3: Challenge Complete (Results & Rewards)**
   - Top bar with Back button and Web Share API button (with fallback toast).
   - Header: *"CHALLENGE COMPLETE! Outstanding!"*
   - Grand faceted Golden Star Trophy Crest surrounded by lush golden laurel branches (`StarCrestBadge`).
   - **Final Score:** Large numeric score display with `New Best!` badge.
   - Dual reward cards: `+30 XP Experience` & `+12 VEs Your Reward`.
   - Level progression bar from Level 05 to Level 06.
   - Actions: **Play Again** (golden button) and **Back to Dashboard** (dark outline).

4. **Screen 4: Earn & Level Up Hub**
   - Header: *"EARN & LEVEL UP — Complete activities. Earn XP. Climb levels. Get rewards."*
   - Interactive quest ledger with the 6 core earning activities.
   - Clicking any quest triggers sound FX, awards XP, updates progress in real-time, and records to the activity ledger.
   - Motivational footer card: *"Keep going! You're doing great! 📊"*

5. **Screen 5: Level Up Celebration Modal**
   - Fullscreen dark backdrop with floating golden confetti particle burst (`canvas-confetti`).
   - Grand 3-tiered Golden Dais / Pedestal with the gold Level 05 badge and laurel leaves (`PedestalBadge`).
   - Dual reward cards: `+500 VEs` (realistic stack of gold coins) and `+25 Gems` (cluster of purple amethysts).
   - Unlocked perks checklist:
     - 📈 Higher daily XP limit
     - 🎯 Access to new challenges
     - 🎁 Better reward opportunities
   - **Claim Rewards** golden glowing CTA that credits balances instantly.

6. **Screen 6: Recent Activity Ledger**
   - Detailed chronological ledger with relative timestamps, category icons, and colored transaction amounts.
   - Top bar with Back button, *"RECENT ACTIVITY"*, and filter funnel.
   - Transactions:
     - Referral Bonus (`+20 XP`)
     - Daily Mission Completed (`+50 XP`)
     - Mini Game Win (`+75 XP`)
     - XP Catcher Reward (`+10 VEs`)
     - Streak Bonus (`+25 XP`)
   - **Today's Summary Card:** Total XP Earned (`215 XP`) and Total VEs Earned (`35 VEs`).

---

## 🏛️ Comprehensive Architecture & Requirements Satisfaction

| Section | Feature / Requirement | Implementation Details |
|---|---|---|
| **1-2** | Fintech Gamification | Luxury dark `#161827` palette with gold, silver, deep navy, purple accents; no casino/gambling gimmicks. |
| **3-8** | Mandatory Mini Game | Real-time playable XP Catcher arcade game with canvas physics, controls, timer, score, sounds, and reward flow. |
| **9-14** | Main Hero & XP Progress | Chamfered 24K gold `OctagonBadge`, animated progress bar, explicit `1,580 XP Needed to Level 06`, `[i]` Level info tooltip. |
| **15-17** | Next Reward & Locked State | `LockedNextReward` card displaying `500 VEs + 20 Gems`, unlock requirement, and progress indicator. |
| **18-21** | Level Progression Roadmap | `LevelRoadmap` tracking Levels 01 to 08 with Completed (✓), You Are Here (★), Next Goal (🎯), and Locked (🔒) states. |
| **22-26** | Earning Section & CTAs | 6 interactive earning cards with real-time XP claiming; Personalized recommendation banner with 1-click CTA. |
| **27-28** | Level Up Celebration | Full modal with 3D pedestal, laurel branches, coin stacks, gem clusters, and particle physics. |
| **29-30** | XP Activity & Sources | Detailed ledger with filter tabs, today's summary card, and category breakdown. |
| **31-32** | Transparent Info Tooltips | `[i]` icons explaining XP progression mechanics and reward configurations. |
| **34-35** | Background & Color Direction | Project-wide body background `#161827` with matching card layers (`#1A1D30`, `#121524`). |
| **37-39** | Responsive Design | Fluid layouts scaling from Mobile (320px+) to Tablet (768px+), Laptop (1280px+), Desktop (1440px+), and 1920px+. |
| **40-42** | Empty, Loading & Error States | Dedicated `LoadingSkeleton`, `ErrorState`, and `EmptyActivityState` toggleable via reviewer toolbar. |
| **54** | Direct Route | Configured for `/Lvl-Dashboard`, `/lvl-dashboard`, and `/` with SPA rewrites. |

---

## 💻 Technology Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 + Custom Dark Theme CSS Modules
- **Routing:** React Router v7 (Supports `/`, `/Lvl-Dashboard`, `/dashboard`)
- **Icons:** Lucide React + Custom 3D SVG Vector Illustrations
- **Canvas Physics & Particles:** HTML5 Canvas 60 FPS Engine + `canvas-confetti`
- **Audio:** Web Audio API procedural sound synthesizer (coins, pops, clicks, fanfare)
- **Deployment:** Vercel

---

## 📂 Project Structure

```
src/
├── assets/                  # Icons & images
├── components/
│   ├── badges/              # 24K Gold Octagonal, Laurel, and Pedestal badges
│   │   ├── OctagonBadge.jsx
│   │   ├── LaurelBadge.jsx
│   │   ├── PedestalBadge.jsx
│   │   └── StarCrestBadge.jsx
│   ├── illustrations/       # 3D Vector game assets
│   │   ├── GamingIcons.jsx
│   │   ├── TreasureChest.jsx
│   │   └── CoinPile.jsx
│   ├── levelup/             # Celebration modal with confetti
│   │   └── LevelUpModal.jsx
│   ├── map/                 # 30-Level Realm Saga Map
│   │   └── SagaMap.jsx
│   ├── nav/                 # Responsive navigation bars
│   │   ├── BottomNav.jsx    # Mobile 5-tab bar
│   │   └── DesktopNavbar.jsx# Widescreen gaming navbar
│   ├── rewards/             # Locked next reward card
│   │   └── LockedNextReward.jsx
│   ├── roadmap/             # Level progression roadmap
│   │   └── LevelRoadmap.jsx
│   ├── showcase/            # Page 33 6-screen side-by-side matrix
│   │   └── Page33Showcase.jsx
│   └── states/              # Loading, Error, and Empty states
│       ├── LoadingSkeleton.jsx
│       ├── ErrorState.jsx
│       └── EmptyActivityState.jsx
├── context/
│   ├── AuthContext.jsx      # Authentication state
│   └── DashboardContext.jsx # XP, Level, VEs, Gems, activities ledger
├── pages/
│   ├── activity/            # Screen 6: Recent Activity
│   │   └── ActivityPage.jsx
│   ├── auth/                # Sign In & Sign Up pages
│   ├── dashboard/           # Screen 1: Dashboard Home
│   │   ├── Dashboard.jsx
│   │   └── DashboardHome.jsx
│   ├── earn/                # Screen 4: Earn & Level Up Hub
│   │   └── EarnPage.jsx
│   └── game/                # Screen 2 & 3: XP Catcher & Challenge Complete
│       └── GamePage.jsx
└── utils/
    └── sound.js             # Procedural gaming audio synthesizer
```

---

## 🚀 Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/swatu18/veloop-levelup-hub.git

# 2. Navigate to project root
cd veloop-levelup-hub

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```

---

## 👤 Author

Developed with care for the **VeLoop Rewards Frontend Development Task Assignment (Task 16)**.
