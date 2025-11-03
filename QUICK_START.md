# Quick Start Guide

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## Project Overview

This is a complete React frontend application for SciRadar, a research discovery and collaboration platform.

### Key Features

- ✅ Full authentication flow (Splash → Welcome → Sign Up → OTP → Password)
- ✅ Main app screens (Home, Search, Messages, Library, Profile)
- ✅ Settings and Subscription screens
- ✅ Project management with AI chat
- ✅ Voice search functionality
- ✅ Responsive mobile-first design
- ✅ Smooth animations with Framer Motion

## Project Structure

```
src/
├── components/        # Reusable UI components
├── screens/          # Screen components (auth & main)
├── context/          # State management (React Context)
├── router/           # React Router configuration
└── utils/            # Utility functions and animations
```

## Available Routes

### Authentication
- `/` - Splash Screen
- `/welcome` - Welcome Screen
- `/signup` - Sign Up Flow
- `/otp` - OTP Verification
- `/password` - Password Creation

### Main App
- `/home` - Home Feed
- `/search` - Search Papers
- `/messages` - Messages List
- `/messages/:id` - Message Details
- `/library` - My Library
- `/project/:id` - Project Details
- `/profile` - User Profile
- `/profile/:id` - Other User Profile
- `/notifications` - Notifications
- `/settings` - Settings
- `/subscription` - Subscription Plans
- `/voice-search` - Voice Search

## Mock Data

The app uses mock data stored in `src/context/AppContext.tsx`. You can modify this to use real API calls later.

## Customization

### Colors
Edit `tailwind.config.js` to customize colors:
```js
colors: {
  primary: '#007AFF',
  accent: {
    start: '#00C6FF',
    end: '#0072FF',
  },
}
```

### Animations
Modify animation presets in `src/utils/animations.ts`

## Next Steps

1. **Connect to Backend API:**
   - Replace mock data in `AppContext.tsx`
   - Add API service layer
   - Implement authentication

2. **Add Dark Mode:**
   - Create theme context
   - Add dark mode toggle
   - Update Tailwind config

3. **Enhance Features:**
   - Real-time messaging
   - File upload for papers
   - Push notifications
   - Offline support

## Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Troubleshooting

### Port already in use
Change the port in `vite.config.ts`:
```ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change to your preferred port
  },
})
```

### Styling issues
Make sure Tailwind CSS is properly configured:
- Check `tailwind.config.js`
- Verify `postcss.config.js`
- Ensure `src/index.css` includes Tailwind directives

## Support

For issues or questions, refer to the main README.md file.

