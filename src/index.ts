// ─── Types ────────────────────────────────────────────────────────────────────
export type {
  TgUser,
  TgWebApp,
  TgThemeParams,
  BottomButton,
  BottomButtonParams,
  MainButton,
  SecondaryButton,
  BackButton,
  SettingsButton,
  HapticFeedback,
  CloudStorage,
  LocationManager,
  LocationData,
  BiometricManager,
  BiometricRequestAccessParams,
  BiometricAuthenticateParams,
  Accelerometer,
  DeviceOrientation,
  Gyroscope,
  PopupButton,
  PopupParams,
  ScanQrPopupParams,
  StoryShareParams,
  EmojiStatusParams,
  DownloadFileParams,
  SafeAreaInset,
  RequestChatParams,
  ChatAdministratorRights,
  WebAppEventType,
} from './types';

// ─── Core Utilities ───────────────────────────────────────────────────────────
export {
  // WebApp access
  getWebApp,
  isInTelegram,
  isVersionAtLeast,
  // Language
  tgLangToTmdb,
  tgLangToUi,
  isRtlLang,
  RTL_LANGS,
  SUPPORTED_LANGS,
  // User helpers
  getUserAvatarUrl,
  getUserIdentifier,
  getUserDisplayName,
  getUserInfoWithAvatar,
  getRawUserData,
  // Navigation
  openExternalLink,
  openTelegramLink,
  // Haptic shortcuts
  haptic,
  // Cloud storage promises
  cloudStorage,
  // Dialog promises
  dialog,
  // Clipboard
  readClipboard,
  // Invoice
  openInvoice,
  // QR
  scanQr,
  // Biometric promises
  biometric,
  // Location promises
  location,
} from './core';

export type { Language } from './core';

// ─── Hooks ────────────────────────────────────────────────────────────────────
export {
  useTelegramWebApp,
  useTelegramUser,
  useTelegramEvent,
  useTelegramBackButton,
  useTelegramMainButton,
  useTelegramSecondaryButton,
  useTelegramSettingsButton,
  useHapticFeedback,
  useTelegramTheme,
  useTelegramViewport,
  useTelegramFullscreen,
  useSafeArea,
  useCloudStorage,
  useAccelerometer,
  useGyroscope,
  useDeviceOrientation,
  useBiometric,
  useLocation,
  useHomeScreen,
  useIsActive,
  useTelegramStartParam,
} from './hooks';

// ─── Providers ────────────────────────────────────────────────────────────────
export {
  TelegramProvider,
  useTelegram,
} from './providers/TelegramProvider';

export type {
  TelegramContextValue,
  TelegramProviderOptions,
} from './providers/TelegramProvider';

export {
  FullscreenProvider,
  useFullscreen,
} from './providers/FullscreenProvider';

export type { FullscreenProviderOptions } from './providers/FullscreenProvider';
