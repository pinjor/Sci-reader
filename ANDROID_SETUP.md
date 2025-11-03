# Running SciRadar on Android

Since this is a React web application, here are the ways to run it on Android:

## Option 1: Run in Browser (Easiest)

### Steps:
1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Find your local IP address:**
   - Windows: Open Command Prompt and run `ipconfig`
   - Look for "IPv4 Address" (e.g., 192.168.1.100)

3. **Update Vite config to allow external connections:**
   Edit `vite.config.ts` to allow connections from your network:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     server: {
       host: '0.0.0.0', // Allow external connections
       port: 5173,
     },
   })
   ```

4. **Access on Android:**
   - Open Chrome browser on your Android device/emulator
   - Navigate to: `http://YOUR_IP_ADDRESS:5173`
   - Example: `http://192.168.1.100:5173`

## Option 2: Build for Production and Serve

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Preview locally:**
   ```bash
   npm run preview
   ```

3. **Or serve with a simple HTTP server:**
   ```bash
   npx serve -s dist
   ```

4. **Access from Android device on the same network**

## Option 3: Convert to Native Android App (Using Capacitor)

This allows you to create a native Android app that can be opened in Android Studio:

### Installation:
```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npx cap init
```

### Configuration:
- App ID: `com.sciradar.app`
- App Name: `SciRadar`

### Build and Sync:
```bash
npm run build
npx cap add android
npx cap sync
npx cap open android
```

This will open the project in Android Studio where you can:
- Run on emulator
- Run on physical device
- Build APK
- Publish to Google Play Store

### Note:
For Capacitor, you may need to install Android Studio and Android SDK first.

## Quick Test on Android Emulator

1. **Start Android Emulator** from Android Studio
2. **Run development server** with network access
3. **Open browser in emulator** and navigate to your local IP

---

**Current Status:** This app is optimized for mobile browsers and will work perfectly on Android devices/emulators via browser.

