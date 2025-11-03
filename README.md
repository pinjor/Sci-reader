

# SciRadar - Research Discovery Platform

A modern, mobile-first React application for research discovery and collaboration built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Modern UI Design** - Clean, intuitive interface with smooth animations
- 📱 **Mobile-First** - Optimized for mobile devices with responsive design
- 🔄 **Smooth Transitions** - Page transitions powered by Framer Motion
- 🎯 **Complete Authentication Flow** - Sign up, OTP verification, password setup
- 📚 **Paper Management** - Save, organize, and listen to research papers
- 👥 **Collaboration** - Create projects and collaborate with other researchers
- 🤖 **AI Integration** - AI-powered paper summarization and chat
- 🔍 **Search & Filter** - Advanced search with filters and voice search
- 💬 **Messaging** - In-app messaging between users
- ⚙️ **Settings** - Comprehensive settings with theme, language, and more

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Heroicons** - Icons
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sci-reader
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── PaperCard.tsx
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── SearchBar.tsx
│   │   ├── BottomSheet.tsx
│   │   ├── Toast.tsx
│   │   └── Tabs.tsx
│   └── layout/          # Layout components
│       ├── Header.tsx
│       └── BottomNav.tsx
├── screens/
│   ├── auth/            # Authentication screens
│   │   ├── SplashScreen.tsx
│   │   ├── WelcomeScreen.tsx
│   │   ├── SignUpFlow.tsx
│   │   └── OTPVerification.tsx
│   └── main/            # Main app screens
│       ├── HomeFeed.tsx
│       ├── Search.tsx
│       ├── Messages.tsx
│       ├── MyLibrary.tsx
│       ├── Profile.tsx
│       ├── Settings.tsx
│       └── ...
├── context/
│   └── AppContext.tsx   # Global state management
├── router/
│   └── AppRouter.tsx     # Route configuration
├── utils/
│   └── animations.ts     # Animation presets
└── App.tsx              # Root component
```

## Design System

### Colors
- **Primary**: #007AFF (Blue)
- **Accent**: #00C6FF → #0072FF (Cyan to Blue gradient)

### Typography
- **Font**: Inter or SF Pro
- **Headers**: Bold, varying sizes
- **Body**: Regular, 14-16px

### Spacing
- **Grid**: 8px base unit
- **Rounded Corners**: 16px for buttons, cards, inputs

### Shadows
- **Cards**: Minimal, soft shadows
- **Modals**: Slightly elevated

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Running on Android

This is a React web application optimized for mobile browsers. To run it on Android:

### Quick Method (Browser):
1. Run `npm run dev`
2. Find your computer's IP address (e.g., `192.168.1.100`)
3. On your Android device/emulator, open Chrome browser
4. Navigate to `http://YOUR_IP:5173`

The Vite config is already set to allow external connections.

### For Native Android App:
See `ANDROID_SETUP.md` for instructions on using Capacitor to create a native Android app that can be opened in Android Studio.

## Screens

1. **Splash Screen** - App launch screen
2. **Welcome Screen** - Sign up/Sign in entry point
3. **Sign-Up Flow** - Multi-step registration
4. **OTP Verification** - Email verification
5. **Home Feed** - Main feed with papers and carousel
6. **Search** - Search papers and users with filters
7. **Voice Search** - Voice-activated search
8. **Messages** - Conversation list
9. **My Library** - Projects and listen history
10. **Project Details** - Paper organization and AI chat
11. **Profile** - User profile with tabs
12. **Settings** - App preferences
13. **Subscription** - Plan selection
14. **Notifications** - User notifications

## Features in Detail

### Authentication
- Email input validation
- Name collection
- Occupation selection
- Interests selection
- OTP verification with auto-focus
- Password creation with visibility toggle

### Paper Management
- Paper cards with metadata
- Save/Listen/Share actions
- Badge system (Open Access, Full Text, Listened)
- Filter and sort options

### Collaboration
- Create public/private projects
- Add papers manually or via link
- Invite collaborators
- Member comments/notes

### AI Features
- Paper summarization
- Method explanation
- Chat interface

## State Management

Uses React Context API for global state management with mock data for:
- Papers
- Projects
- User information

## Responsive Design

The app is designed mobile-first with:
- Touch-friendly targets (min 44x44px)
- Optimized typography scales
- Responsive layouts
- Safe area handling for notched devices

## Browser Support

- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

