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

Add the Telegram script to your `layout.tsx` or `_document.tsx`:

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

## Setup Providers

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
  langStorageKey: 'my-app-lang',           // localStorage key for saved language
  onUserReady: (user) => {
    // sync user to your backend
    fetch('/api/user', { method: 'POST', body: JSON.stringify(user) });
  },
  onLanguageChange: (lang) => {
    // e.g. i18n.changeLanguage(lang)
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

## Hooks Reference

### `useTelegram()`
Main context hook — gives you everything from the provider.

```tsx
const {
  ready,         // boolean — is the SDK initialized?
  inTelegram,    // boolean — running inside Telegram?
  bypass,        // boolean — dev bypass mode?
  webApp,        // TgWebApp | null — raw WebApp instance
  user,          // TgUser | null
  language,      // 'en-US' (TMDB-style locale)
  uiLang,        // 'en' (short code)
  colorScheme,   // 'light' | 'dark'
  startParam,    // string | null
  isRtl,         // boolean
  changeLanguage,// (lang: string) => void
} = useTelegram();
```

---

### `useTelegramBackButton()`
Auto-manages the Back Button based on the current route.

```tsx
import { useTelegramBackButton } from '@mr-m/telegram-webapp-kit';

// Basic — uses browser history.back()
useTelegramBackButton({ pathname });

// Custom back handler
useTelegramBackButton({
  pathname,
  onBack: () => router.push('/'),
  hideOnRoot: true, // default: true
});
```

---

### `useTelegramMainButton()`
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

### `useTelegramSecondaryButton()`
```tsx
useTelegramSecondaryButton({
  text: 'Cancel',
  onClick: handleCancel,
  position: 'left',
  isVisible: true,
});
```

---

### `useTelegramSettingsButton()`
```tsx
useTelegramSettingsButton(() => router.push('/settings'));
```

---

### `useHapticFeedback()`
```tsx
const haptic = useHapticFeedback();

haptic.impact('medium');       // 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
haptic.notification('success');// 'error' | 'success' | 'warning'
haptic.selectionChanged();
```

Or use the static shortcut:
```tsx
import { haptic } from '@mr-m/telegram-webapp-kit';
haptic.success();
```

---

### `useTelegramTheme()`
```tsx
const { colorScheme, themeParams, isDark } = useTelegramTheme();
```

---

### `useTelegramViewport()`
```tsx
const { height, stableHeight, isExpanded, expand } = useTelegramViewport();
```

---

### `useTelegramFullscreen()`
```tsx
const { isFullscreen, isSupported, enter, exit, toggle, error } = useTelegramFullscreen();
```

Or use `useFullscreen()` from the `FullscreenProvider` for the full context including safe areas.

---

### `useSafeArea()`
```tsx
const { safeArea, contentSafeArea } = useSafeArea();
// safeArea.top, .bottom, .left, .right — in pixels

// CSS variables are also set automatically:
// --tg-safe-area-inset-top, --tg-content-safe-area-inset-bottom, etc.
```

---

### `useCloudStorage()`
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

### `useAccelerometer()` / `useGyroscope()` / `useDeviceOrientation()`
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

### `useBiometric()`
```tsx
const { isAvailable, biometricType, init, requestAccess, authenticate } = useBiometric();

await init();
const granted = await requestAccess('Authenticate to continue');
const { authenticated, token } = await authenticate('Confirm your identity');
```

---

### `useLocation()`
```tsx
const { isAvailable, isGranted, init, getLocation, openSettings } = useLocation();

await init();
const loc = await getLocation();
// loc.latitude, loc.longitude, loc.altitude, etc.
```

---

### `useHomeScreen()`
```tsx
const { addToHomeScreen, checkStatus } = useHomeScreen();
const status = await checkStatus(); // 'added' | 'missed' | 'unknown' | 'unsupported'
```

---

### `useIsActive()`
Tracks whether the Mini App is currently active (foreground).
```tsx
const isActive = useIsActive();
```

---

### `useTelegramEvent()`
Subscribe to any raw Telegram event.
```tsx
useTelegramEvent('themeChanged', () => {
  console.log('Theme changed!');
});
```

---

## Utility Functions

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
  tgLangToTmdb,
  tgLangToUi,
  isRtlLang,
  SUPPORTED_LANGS,
  haptic,
  cloudStorage,     // Promise-based static helpers
  dialog,           // Promise-based alert/confirm/popup
  readClipboard,
  openInvoice,
  scanQr,
  biometric,        // Static promise helpers
  location,         // Static promise helpers
} from '@mr-m/telegram-webapp-kit';

// Examples
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

## Start Param Routing

If you want to handle deep links via `start_param`, use `useTelegramStartParam`:

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

## TypeScript

All interfaces are exported. The most useful ones:

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

## Dev Bypass

Outside Telegram, the provider shows `notInTelegramComponent`.  
In `development` or when `?bypass` is in the URL, it renders normally so you can develop locally.

```bash
http://localhost:3000?bypass
```
