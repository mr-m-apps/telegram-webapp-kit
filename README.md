# 📱 Telegram WebApp Kit

**Full-featured SDK for building Telegram Mini Apps with React & Next.js**

A zero-dependency React library that provides complete access to the Telegram WebApp API with type-safe hooks, providers, and utilities.

[![NPM Version](https://img.shields.io/npm/v/@mr-m/telegram-webapp-kit)](https://www.npmjs.com/package/@mr-m/telegram-webapp-kit)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-18%2B-blue.svg)](#peerDependencies)

---

## ⚡ Features

✅ **Complete TypeScript Support** — Fully typed hooks, providers, and utilities  
✅ **Zero Dependencies** — Only requires React (no extra packages)  
✅ **React & Next.js Ready** — Works with both App Router and Pages Router  
✅ **Safe Areas Handling** — Built-in support for notches and safe areas  
✅ **Haptic Feedback** — Impact, notification, and selection feedback  
✅ **Device Integration** — Accelerometer, gyroscope, device orientation  
✅ **Biometric Authentication** — Face ID / fingerprint support  
✅ **Location & Geolocation** — Get user location with proper permissions  
✅ **Cloud Storage** — Promise-based cloud storage wrapper  
✅ **Button Management** — Main, secondary, back, and settings buttons  
✅ **Theme & Color Scheme** — Dark/light mode detection  
✅ **Event Subscriptions** — Subscribe to any Telegram WebApp event  
✅ **Development Bypass** — Test locally without Telegram  

---

## 📦 Installation

### npm
```bash
npm install @mr-m/telegram-webapp-kit
```

### pnpm
```bash
pnpm add @mr-m/telegram-webapp-kit
```

### yarn
```bash
yarn add @mr-m/telegram-webapp-kit
```

### bun
```bash
bun add @mr-m/telegram-webapp-kit
```

---

## 🚀 Quick Start

### 1. Add Telegram Script

Add the official Telegram WebApp script to your `layout.tsx` (Next.js App Router):

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Wrap App with Providers

Create a providers component and wrap your app:

```tsx
// app/providers.tsx
'use client';
import {
  TelegramProvider,
  FullscreenProvider,
  type TelegramProviderOptions,
} from '@mr-m/telegram-webapp-kit';

const telegramOptions: TelegramProviderOptions = {
  onUserReady: (user) => {
    // Called when user data is loaded
    console.log('User ready:', user);
    // Sync user to your backend
    fetch('/api/user', { method: 'POST', body: JSON.stringify(user) });
  },
  loadingComponent: <div className="p-4">Loading Mini App...</div>,
  notInTelegramComponent: <div className="p-4">Please open in Telegram</div>,
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FullscreenProvider options={{ persistPreference: true }}>
      <TelegramProvider options={telegramOptions}>
        {children}
      </TelegramProvider>
    </FullscreenProvider>
  );
}
```

Use providers in layout:

```tsx
// app/layout.tsx
import { Providers } from './providers';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Providers>
          <div className="app-container">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
```

### 3. Use Hooks

Access Telegram features in your components:

```tsx
'use client';
import { useTelegram, useTelegramMainButton } from '@mr-m/telegram-webapp-kit';

export default function Home() {
  const { user, colorScheme, ready } = useTelegram();

  useTelegramMainButton({
    text: 'Continue',
    onClick: () => console.log('Clicked!'),
    isVisible: ready,
  });

  return (
    <div>
      <h1>Hello {user?.first_name}!</h1>
      <p>Theme: {colorScheme}</p>
    </div>
  );
}
```

---

## 🎯 Core Concepts

### Safe Areas & Fullscreen

The `FullscreenProvider` automatically injects CSS variables for notches and safe areas:

```css
:root {
  /* Safe area (includes notch, keyboard, etc.) */
  --tg-safe-area-inset-top: 0px;
  --tg-safe-area-inset-bottom: 0px;
  --tg-safe-area-inset-left: 0px;
  --tg-safe-area-inset-right: 0px;

  /* Content safe area (keyboard, etc. but not notch) */
  --tg-content-safe-area-inset-top: 0px;
  --tg-content-safe-area-inset-bottom: 0px;
  --tg-content-safe-area-inset-left: 0px;
  --tg-content-safe-area-inset-right: 0px;
}
```

### App Container

Wrap your main content with `.app-container` to handle safe areas automatically:

```css
.app-container {
  position: relative;
  min-height: 100vh;
  padding-top: calc(var(--tg-safe-area-inset-top, 0px) + var(--tg-content-safe-area-inset-top, 0px));
  padding-bottom: calc(var(--tg-safe-area-inset-bottom, 0px) + var(--tg-content-safe-area-inset-bottom, 0px));
  padding-left: calc(var(--tg-safe-area-inset-left, 0px) + var(--tg-content-safe-area-inset-left, 0px));
  padding-right: calc(var(--tg-safe-area-inset-right, 0px) + var(--tg-content-safe-area-inset-right, 0px));
}
```

### Fixed Elements

For headers, footers, or floating buttons:

```css
/* Fixed header with safe area */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-top: var(--tg-safe-area-inset-top, 0px);
  z-index: 100;
}

/* Fixed bottom navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: var(--tg-safe-area-inset-bottom, 0px);
  z-index: 100;
}

/* Floating action button */
.fab {
  position: fixed;
  bottom: calc(20px + var(--tg-safe-area-inset-bottom, 0px));
  right: calc(20px + var(--tg-safe-area-inset-right, 0px));
  z-index: 50;
}

/* Fullscreen content */
.fullscreen-content {
  position: fixed;
  top: var(--tg-safe-area-inset-top, 0px);
  left: var(--tg-safe-area-inset-left, 0px);
  right: var(--tg-safe-area-inset-right, 0px);
  bottom: var(--tg-safe-area-inset-bottom, 0px);
}
```

---

## 🪝 Hooks API

### useTelegram()

Main hook for Telegram context and WebApp instance:

```tsx
const {
  ready,           // boolean — SDK initialized?
  inTelegram,      // boolean — Running in Telegram?
  bypass,          // boolean — Dev bypass mode active?
  webApp,          // TgWebApp | null — Raw WebApp instance
  user,            // TgUser | null — Current user
  colorScheme,     // 'light' | 'dark' — User's theme preference
  startParam,      // string | null — Deep link parameter
} = useTelegram();
```

**Example:**
```tsx
const { user, ready, inTelegram } = useTelegram();

if (!ready) return <div>Loading...</div>;
if (!inTelegram) return <div>Open this in Telegram</div>;

return <h1>Welcome {user?.first_name}</h1>;
```

---

### useTelegramMainButton()

Control the main action button at the bottom:

```tsx
useTelegramMainButton({
  text: 'Continue',           // Button label
  onClick: handleClick,        // Click handler
  isVisible: true,             // Show/hide button
  isActive: !isLoading,        // Enable/disable
  showProgress: isLoading,     // Show loading indicator
  color: '#2481cc',            // Button color (optional)
  hasShineEffect: true,        // Shine animation (optional)
});
```

**Example:**
```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

useTelegramMainButton({
  text: 'Submit Form',
  onClick: async () => {
    setIsSubmitting(true);
    await submitForm();
    setIsSubmitting(false);
  },
  isActive: !isSubmitting,
  showProgress: isSubmitting,
});
```

---

### useTelegramSecondaryButton()

Secondary button (often on the left):

```tsx
useTelegramSecondaryButton({
  text: 'Cancel',
  onClick: handleCancel,
  position: 'left',    // 'left' | 'right'
  isVisible: true,
});
```

---

### useTelegramBackButton()

Auto-manages back button based on route:

```tsx
import { useRouter } from 'next/navigation';
import { useTelegramBackButton } from '@mr-m/telegram-webapp-kit';

export default function Page() {
  const router = useRouter();

  useTelegramBackButton({
    pathname: '/current-page',
    onBack: () => router.back(),
    hideOnRoot: true,  // Hide on home page
  });

  return <div>Your content</div>;
}
```

---

### useTelegramSettingsButton()

Handle settings button click:

```tsx
import { useRouter } from 'next/navigation';
import { useTelegramSettingsButton } from '@mr-m/telegram-webapp-kit';

export default function Page() {
  const router = useRouter();

  useTelegramSettingsButton(() => {
    router.push('/settings');
  });

  return <div>Your content</div>;
}
```

---

### useHapticFeedback()

Trigger haptic feedback (vibration):

```tsx
const haptic = useHapticFeedback();

// Impact vibrations
haptic.impact('light');      // Light tap
haptic.impact('medium');     // Medium tap
haptic.impact('heavy');      // Strong tap
haptic.impact('rigid');      // Rigid tap
haptic.impact('soft');       // Soft tap

// Notifications
haptic.notification('success');  // Success pattern
haptic.notification('warning');  // Warning pattern
haptic.notification('error');    // Error pattern

// Selection
haptic.selectionChanged();       // Selection feedback
```

**Or use static methods:**
```tsx
import { haptic } from '@mr-m/telegram-webapp-kit';

haptic.success();
haptic.error();
haptic.warning();
```

---

### useTelegramTheme()

Get theme and color information:

```tsx
const { colorScheme, themeParams, isDark } = useTelegramTheme();

console.log(isDark ? 'Dark mode' : 'Light mode');
console.log('Primary color:', themeParams?.button_color);
```

---

### useTelegramViewport()

Manage WebApp viewport:

```tsx
const { height, stableHeight, isExpanded, expand } = useTelegramViewport();

// Expand webview to fill available height
expand();
```

---

### useTelegramFullscreen()

Control fullscreen mode:

```tsx
const { isFullscreen, isSupported, enter, exit, toggle, error } = useTelegramFullscreen();

if (isSupported) {
  toggle();  // Toggle fullscreen
}
```

---

### useFullscreen()

Extended fullscreen from `FullscreenProvider` (includes safe areas):

```tsx
const { isFullscreen, error, safeArea } = useFullscreen();
```

---

### useSafeArea()

Get safe area values and CSS variables:

```tsx
const { safeArea, contentSafeArea } = useSafeArea();

console.log(safeArea.top);        // Top inset (includes notch)
console.log(contentSafeArea.bottom); // Bottom inset (keyboard safe)
```

---

### useCloudStorage()

Promise-based cloud storage (persists across devices):

```tsx
const storage = useCloudStorage();

// Set value
await storage.setItem('user-settings', JSON.stringify({ theme: 'dark' }));

// Get value
const settings = await storage.getItem('user-settings');

// Get multiple values
const [val1, val2] = await storage.getItems(['key1', 'key2']);

// Remove value
await storage.removeItem('key1');

// Get all keys
const allKeys = await storage.getKeys();
```

---

### useAccelerometer()

Device accelerometer (motion sensor):

```tsx
const { x, y, z, isStarted, start, stop } = useAccelerometer({
  refreshRate: 50,      // Hz
  autoStart: true,      // Start automatically
});

// Manual control
start();
stop();
```

---

### useGyroscope()

Device gyroscope (rotation sensor):

```tsx
const { x, y, z, isStarted, start, stop } = useGyroscope({
  autoStart: true,
});
```

---

### useDeviceOrientation()

Device orientation (compass):

```tsx
const { alpha, beta, gamma, absolute, isStarted, start, stop } = useDeviceOrientation({
  needAbsolute: true,
  autoStart: true,
});

// alpha: 0-360° (compass bearing)
// beta: -180 to 180° (tilt front/back)
// gamma: -90 to 90° (tilt left/right)
```

---

### useBiometric()

Biometric authentication (Face ID / Fingerprint):

```tsx
const { isAvailable, biometricType, init, requestAccess, authenticate } = useBiometric();

// Initialize
await init();

// Request permission
const granted = await requestAccess('Authenticate to unlock premium features');

// Authenticate
if (granted) {
  const { authenticated, token } = await authenticate('Confirm your identity');
  if (authenticated) {
    console.log('Auth token:', token);
  }
}
```

---

### useLocation()

Get user location:

```tsx
const { isAvailable, isGranted, init, getLocation, openSettings } = useLocation();

// Initialize permission
await init();

// Request permission
if (isGranted) {
  const location = await getLocation();
  console.log('Latitude:', location.latitude);
  console.log('Longitude:', location.longitude);
}

// Open settings to grant permission
openSettings();
```

---

### useHomeScreen()

Add app to home screen:

```tsx
const { addToHomeScreen, checkStatus } = useHomeScreen();

const status = await checkStatus();
if (status === 'ok') {
  await addToHomeScreen();  // Shows system dialog
}
```

---

### useIsActive()

Track if Mini App is in foreground:

```tsx
const isActive = useIsActive();

useEffect(() => {
  if (isActive) {
    console.log('App is visible');
  } else {
    console.log('App is backgrounded');
  }
}, [isActive]);
```

---

### useTelegramEvent()

Subscribe to raw Telegram events:

```tsx
useTelegramEvent('themeChanged', () => {
  console.log('User switched theme!');
});

useTelegramEvent('viewportChanged', () => {
  console.log('Viewport height changed');
});
```

---

## 🛠 Utility Functions

Standalone utilities (no hooks required):

```tsx
import {
  getWebApp,
  isInTelegram,
  isVersionAtLeast,
  getUserDisplayName,
  getUserAvatarUrl,
  getUserIdentifier,
  getUserInfoWithAvatar,
  getRawUserData,
  openExternalLink,
  openTelegramLink,
  haptic,
  cloudStorage,
  dialog,
  readClipboard,
  openInvoice,
  scanQr,
  biometric,
  location,
} from '@mr-m/telegram-webapp-kit';

// Get raw WebApp instance
const webApp = getWebApp();

// Check if running in Telegram
if (isInTelegram()) {
  console.log('In Telegram!');
}

// Check WebApp version
if (isVersionAtLeast('6.0')) {
  console.log('Version 6.0+');
}

// Get user info
const displayName = getUserDisplayName();
const avatarUrl = getUserAvatarUrl();
const info = getUserInfoWithAvatar();

// Open links
openExternalLink('https://example.com');
openTelegramLink('https://t.me/username');

// Dialog
await dialog.alert('Alert message');
const confirmed = await dialog.confirm('Are you sure?');
const buttonId = await dialog.popup({
  message: 'Choose an option',
  buttons: [
    { id: 'option-a', text: 'Option A' },
    { id: 'option-b', text: 'Option B' },
  ],
});

// Clipboard
const clipboardText = await readClipboard();

// Invoice / Payment
const status = await openInvoice('https://t.me/invoice_link');

// QR Code Scanner
const qrResult = await scanQr('Scan QR code');

// Biometric
await biometric.init();

// Location
const location = await location.getLocation();
```

---

## 🌐 Deep Links & Start Parameters

Handle deep links via `startParam`:

```tsx
'use client';
import { useTelegram } from '@mr-m/telegram-webapp-kit';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { startParam, ready } = useTelegram();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;

    switch (startParam) {
      case 'premium':
        router.push('/upgrade');
        break;
      case 'invite':
        router.push('/invite');
        break;
      default:
        router.push('/home');
    }
  }, [startParam, ready, router]);

  return <div>Redirecting...</div>;
}
```

---

## 🎨 Type Definitions

All types are exported for TypeScript projects:

```tsx
import type {
  TgUser,                    // User object
  TgWebApp,                  // WebApp instance
  TgThemeParams,             // Theme colors
  SafeAreaInset,             // Safe area values
  LocationData,              // Location coordinates
  WebAppEventType,           // Event types
  PopupParams,               // Dialog parameters
  TelegramContextValue,      // Context type
  TelegramProviderOptions,   // Provider options
} from '@mr-m/telegram-webapp-kit';
```

---

## 🔧 Development & Testing

### Dev Bypass Mode

Test your Mini App outside Telegram:

```bash
# Add ?bypass to URL
http://localhost:3000?bypass
```

This will:
- Skip Telegram availability check
- Render normally without Telegram script
- Allow local testing and debugging

### Fallback UI

Customize what users see when not in Telegram:

```tsx
const telegramOptions: TelegramProviderOptions = {
  notInTelegramComponent: (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-lg">📱 Open this app in Telegram</p>
      <a href="https://t.me/YourBot?startapp=..." className="mt-4">
        Launch Mini App
      </a>
    </div>
  ),
};
```

---

## 📚 Complete Example

Here's a complete Mini App example:

```tsx
// app/layout.tsx
import Script from 'next/script';
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'My Mini App',
  description: 'Built with telegram-webapp-kit',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Providers>
          <div className="app-container">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
```

```tsx
// app/providers.tsx
'use client';
import {
  TelegramProvider,
  FullscreenProvider,
  type TelegramProviderOptions,
} from '@mr-m/telegram-webapp-kit';

const telegramOptions: TelegramProviderOptions = {
  onUserReady: (user) => {
    fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  },
  loadingComponent: <div className="p-4 text-center">Loading...</div>,
  notInTelegramComponent: (
    <div className="p-4 text-center">
      Open this app in Telegram
    </div>
  ),
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FullscreenProvider options={{ persistPreference: true }}>
      <TelegramProvider options={telegramOptions}>
        {children}
      </TelegramProvider>
    </FullscreenProvider>
  );
}
```

```tsx
// app/page.tsx
'use client';
import { useTelegram, useTelegramMainButton, useHapticFeedback } from '@mr-m/telegram-webapp-kit';
import { useState } from 'react';

export default function Home() {
  const { user, colorScheme, ready } = useTelegram();
  const haptic = useHapticFeedback();
  const [count, setCount] = useState(0);

  useTelegramMainButton({
    text: 'Increment',
    onClick: () => {
      setCount(c => c + 1);
      haptic.impact('light');
    },
    isVisible: ready,
  });

  if (!ready) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Welcome {user?.first_name}</h1>
      <p className="mt-2 text-gray-600">Theme: {colorScheme}</p>
      <div className="mt-6 text-4xl font-bold text-center">{count}</div>
    </div>
  );
}
```

---

## 🐛 Troubleshooting

**Q: Hooks return null or undefined**  
A: Make sure you've wrapped your component with both `TelegramProvider` and `FullscreenProvider`.

**Q: Buttons don't appear**  
A: Wait for `ready === true` before rendering button controls.

**Q: Safe areas not working**  
A: Ensure `.app-container` has the correct CSS and safe area CSS variables are set.

**Q: Getting "not in Telegram" message**  
A: Add `?bypass` to your URL for local testing, or open the app through Telegram.

---

## 📖 Resources

- [Telegram WebApp Documentation](https://core.telegram.org/bots/webapps)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

---

## 📄 License

MIT © [mr-m-apps](https://github.com/mr-m-apps)

---

## 🤝 Contributing

Found a bug or have a feature request? Open an issue on [GitHub](https://github.com/mr-m-apps/telegram-webapp-kit/issues).

---

**Built with ❤️ for Telegram Mini Apps**
