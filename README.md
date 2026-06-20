```markdown
# telegram-webapp-kit

Full-featured Telegram Mini App SDK for React / Next.js.  
Types · Hooks · Providers · Utilities — zero dependencies beyond React.

---

## Install

```bash
npm install @mr-m/telegram-webapp-kit
# or
pnpm add @mr-m/telegram-webapp-kit
```

Add the Telegram script to your layout.tsx or _document.tsx:

```tsx
// Next.js App Router — layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
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

---

Setup Providers

Wrap your app with the providers you need:

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
    fetch('/api/user', { method: 'POST', body: JSON.stringify(user) });
  },
  loadingComponent: <div>Loading…</div>,
  notInTelegramComponent: <div>Open in Telegram</div>,
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

---

Fullscreen & Safe Areas

The FullscreenProvider automatically injects CSS variables for safe areas:

```css
:root {
  --tg-safe-area-inset-top: 0px;
  --tg-safe-area-inset-bottom: 0px;
  --tg-safe-area-inset-left: 0px;
  --tg-safe-area-inset-right: 0px;

  --tg-content-safe-area-inset-top: 0px;
  --tg-content-safe-area-inset-bottom: 0px;
  --tg-content-safe-area-inset-left: 0px;
  --tg-content-safe-area-inset-right: 0px;
}
```

Base Container

Wrap your app content with the .app-container class to handle safe areas automatically:

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

Usage in your app

```tsx
// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
```

Utility Classes for Fixed Elements

For fixed headers, footers, or floating buttons:

```css
/* Fixed header */
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

Hooks Reference

useTelegram()

Main context hook — gives you everything from the provider.

```tsx
const {
  ready,         // boolean — is the SDK initialized?
  inTelegram,    // boolean — running inside Telegram?
  bypass,        // boolean — dev bypass mode?
  webApp,        // TgWebApp | null — raw WebApp instance
  user,          // TgUser | null
  colorScheme,   // 'light' | 'dark'
  startParam,    // string | null
} = useTelegram();
```

---

useTelegramBackButton()

Auto-manages the Back Button based on the current route.

```tsx
import { useTelegramBackButton } from '@mr-m/telegram-webapp-kit';

useTelegramBackButton({ pathname });

useTelegramBackButton({
  pathname,
  onBack: () => router.push('/'),
  hideOnRoot: true,
});
```

---

useTelegramMainButton()

Declarative Main Button control.

```tsx
useTelegramMainButton({
  text: 'Continue',
  onClick: handleSubmit,
  isVisible: formIsValid,
  isActive: !isLoading,
  showProgress: isLoading,
  color: '#2481cc',
  hasShineEffect: true,
});
```

---

useTelegramSecondaryButton()

```tsx
useTelegramSecondaryButton({
  text: 'Cancel',
  onClick: handleCancel,
  position: 'left',
  isVisible: true,
});
```

---

useTelegramSettingsButton()

```tsx
useTelegramSettingsButton(() => router.push('/settings'));
```

---

useHapticFeedback()

```tsx
const haptic = useHapticFeedback();

haptic.impact('medium');
haptic.notification('success');
haptic.selectionChanged();
```

Or use the static shortcut:

```tsx
import { haptic } from '@mr-m/telegram-webapp-kit';
haptic.success();
```

---

useTelegramTheme()

```tsx
const { colorScheme, themeParams, isDark } = useTelegramTheme();
```

---

useTelegramViewport()

```tsx
const { height, stableHeight, isExpanded, expand } = useTelegramViewport();
```

---

useTelegramFullscreen()

```tsx
const { isFullscreen, isSupported, enter, exit, toggle, error } = useTelegramFullscreen();
```

Or use useFullscreen() from the FullscreenProvider for the full context including safe areas.

---

useSafeArea()

```tsx
const { safeArea, contentSafeArea } = useSafeArea();
```

CSS variables are set automatically:

```css
--tg-safe-area-inset-top: 0px;
--tg-safe-area-inset-bottom: 0px;
--tg-safe-area-inset-left: 0px;
--tg-safe-area-inset-right: 0px;

--tg-content-safe-area-inset-top: 0px;
--tg-content-safe-area-inset-bottom: 0px;
--tg-content-safe-area-inset-left: 0px;
--tg-content-safe-area-inset-right: 0px;
```

---

useCloudStorage()

Promise-based wrappers over Telegram CloudStorage.

```tsx
const storage = useCloudStorage();

await storage.setItem('key', 'value');
const val = await storage.getItem('key');
const all = await storage.getItems(['a', 'b']);
await storage.removeItem('key');
const keys = await storage.getKeys();
```

---

useAccelerometer() / useGyroscope() / useDeviceOrientation()

```tsx
const { x, y, z, isStarted, start, stop } = useAccelerometer({
  refreshRate: 50,
  autoStart: true,
});

const { x, y, z } = useGyroscope({ autoStart: true });

const { alpha, beta, gamma, absolute } = useDeviceOrientation({
  needAbsolute: true,
  autoStart: true,
});
```

---

useBiometric()

```tsx
const { isAvailable, biometricType, init, requestAccess, authenticate } = useBiometric();

await init();
const granted = await requestAccess('Authenticate to continue');
const { authenticated, token } = await authenticate('Confirm your identity');
```

---

useLocation()

```tsx
const { isAvailable, isGranted, init, getLocation, openSettings } = useLocation();

await init();
const loc = await getLocation();
```

---

useHomeScreen()

```tsx
const { addToHomeScreen, checkStatus } = useHomeScreen();
const status = await checkStatus();
```

---

useIsActive()

Tracks whether the Mini App is currently active (foreground).

```tsx
const isActive = useIsActive();
```

---

useTelegramEvent()

Subscribe to any raw Telegram event.

```tsx
useTelegramEvent('themeChanged', () => {
  console.log('Theme changed!');
});
```

---

Utility Functions

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

const wa = getWebApp();
const user = getRawUserData();
const { displayName, avatarUrl } = getUserInfoWithAvatar();

await dialog.alert('Hello!');
const confirmed = await dialog.confirm('Are you sure?');
const buttonId = await dialog.popup({ message: 'Choose', buttons: [{ id: 'a', text: 'Option A' }] });

const status = await openInvoice('https://...');
const qrText = await scanQr('Scan the code');
const clipboard = await readClipboard();
```

---

Start Param Routing

Handle deep links via start_param:

```tsx
import { useTelegramStartParam } from '@mr-m/telegram-webapp-kit';

function App() {
  const startParam = useTelegramStartParam();

  useEffect(() => {
    if (startParam === 'premium') router.push('/upgrade');
  }, [startParam]);
}
```

---

TypeScript

All interfaces are exported:

```tsx
import type {
  TgUser,
  TgWebApp,
  TgThemeParams,
  SafeAreaInset,
  LocationData,
  WebAppEventType,
  PopupParams,
  TelegramContextValue,
  TelegramProviderOptions,
} from '@mr-m/telegram-webapp-kit';
```

---

Dev Bypass

Outside Telegram, the provider shows notInTelegramComponent.
In development or when ?bypass is in the URL, it renders normally so you can develop locally.

```bash
http://localhost:3000?bypass
```

---

License

MIT © mr-m-apps

```
