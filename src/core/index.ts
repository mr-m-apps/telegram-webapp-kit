import type { TgUser, TgWebApp } from '../types';

// ─── WebApp Access ────────────────────────────────────────────────────────────
export function getWebApp(): TgWebApp | null {
  if (typeof window === 'undefined') return null;
  return window.Telegram?.WebApp ?? null;
}

export function isInTelegram(): boolean {
  const wa = getWebApp();
  return Boolean(wa && wa.initData && wa.initData.length > 0);
}

export function isVersionAtLeast(version: string): boolean {
  return getWebApp()?.isVersionAtLeast(version) ?? false;
}

// ─── Language Helpers ─────────────────────────────────────────────────────────
export function tgLangToTmdb(code?: string): string {
  if (!code) return 'en-US';
  const base = code.toLowerCase().split('-')[0];
  const map: Record<string, string> = {
    en: 'en-US', ar: 'ar-SA', es: 'es-ES', fr: 'fr-FR', de: 'de-DE',
    it: 'it-IT', pt: 'pt-BR', ru: 'ru-RU', zh: 'zh-CN', ja: 'ja-JP',
    ko: 'ko-KR', tr: 'tr-TR', hi: 'hi-IN', id: 'id-ID', nl: 'nl-NL',
    pl: 'pl-PL', sv: 'sv-SE', uk: 'uk-UA', vi: 'vi-VN', fa: 'fa-IR',
    he: 'he-IL', cs: 'cs-CZ', da: 'da-DK', fi: 'fi-FI', hu: 'hu-HU',
    nb: 'nb-NO', ro: 'ro-RO', sk: 'sk-SK', th: 'th-TH', ms: 'ms-MY',
  };
  return map[base] ?? 'en-US';
}

export function tgLangToUi(code?: string): string {
  if (!code) return 'en';
  const base = code.toLowerCase().split('-')[0];
  const supported = [
    'en', 'ar', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja',
    'ko', 'tr', 'hi', 'id', 'nl', 'pl', 'sv', 'uk', 'vi', 'fa',
    'he', 'cs', 'da', 'fi', 'hu', 'nb', 'ro', 'sk', 'th', 'ms',
  ];
  return supported.includes(base) ? base : 'en';
}

// ─── RTL ──────────────────────────────────────────────────────────────────────
export const RTL_LANGS = new Set(['ar', 'fa', 'he', 'ur', 'yi', 'ug', 'ku']);

export function isRtlLang(lang?: string): boolean {
  if (!lang) return false;
  return RTL_LANGS.has(lang.toLowerCase().split('-')[0]);
}

// ─── Supported Languages ──────────────────────────────────────────────────────
export const SUPPORTED_LANGS = [
  { code: 'en', countryCode: 'us', name: 'English', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/us.svg' },
  { code: 'ar', countryCode: 'sa', name: 'العربية', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/sa.svg' },
  { code: 'es', countryCode: 'es', name: 'Español', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/es.svg' },
  { code: 'fr', countryCode: 'fr', name: 'Français', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/fr.svg' },
  { code: 'de', countryCode: 'de', name: 'Deutsch', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/de.svg' },
  { code: 'it', countryCode: 'it', name: 'Italiano', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/it.svg' },
  { code: 'pt', countryCode: 'pt', name: 'Português', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/pt.svg' },
  { code: 'ru', countryCode: 'ru', name: 'Русский', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/ru.svg' },
  { code: 'zh', countryCode: 'cn', name: '中文', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/cn.svg' },
  { code: 'ja', countryCode: 'jp', name: '日本語', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/jp.svg' },
  { code: 'ko', countryCode: 'kr', name: '한국어', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/kr.svg' },
  { code: 'tr', countryCode: 'tr', name: 'Türkçe', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/tr.svg' },
  { code: 'hi', countryCode: 'in', name: 'हिन्दी', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/in.svg' },
  { code: 'id', countryCode: 'id', name: 'Indonesia', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/id.svg' },
  { code: 'nl', countryCode: 'nl', name: 'Nederlands', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/nl.svg' },
  { code: 'pl', countryCode: 'pl', name: 'Polski', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/pl.svg' },
  { code: 'sv', countryCode: 'se', name: 'Svenska', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/se.svg' },
  { code: 'uk', countryCode: 'ua', name: 'Українська', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/ua.svg' },
  { code: 'vi', countryCode: 'vn', name: 'Tiếng Việt', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/vn.svg' },
  { code: 'fa', countryCode: 'ir', name: 'فارسی', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/ir.svg' },
  { code: 'he', countryCode: 'il', name: 'עברית', flag: 'https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/il.svg' },
] as const;

export type Language = (typeof SUPPORTED_LANGS)[number];

// ─── Navigation Helpers ───────────────────────────────────────────────────────
export function openExternalLink(url: string, tryInstantView = false) {
  const wa = getWebApp();
  if (wa?.openLink) {
    wa.openLink(url, { try_instant_view: tryInstantView });
  } else if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }
}

export function openTelegramLink(url: string) {
  const wa = getWebApp();
  if (wa?.openTelegramLink) {
    wa.openTelegramLink(url);
  } else if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }
}

// ─── User Helpers ─────────────────────────────────────────────────────────────
export function getUserAvatarUrl(
  user?: TgUser,
  defaultAvatarUrl = 'https://via.placeholder.com/100x100?text=No+Avatar'
): string {
  if (user?.photo_url) return user.photo_url;

  if (user?.id) {
    const firstName = user?.first_name ?? '';
    const lastName = user?.last_name ?? '';
    const name = `${firstName} ${lastName}`.trim() || user?.username || `user_${user.id}`;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=100&length=2&rounded=true&bold=true`;
  }

  return defaultAvatarUrl;
}

export function getUserIdentifier(user?: TgUser): string {
  if (user?.username) return user.username;
  if (user?.id) return user.id.toString();
  return 'unknown_user';
}

export function getUserDisplayName(user?: TgUser): string {
  if (!user) return 'User';
  const fullName = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();
  if (fullName) return fullName;
  if (user.username) return `@${user.username}`;
  return `User_${user.id}`;
}

export function getUserInfoWithAvatar(): {
  user: TgUser | undefined;
  avatarUrl: string;
  displayName: string;
  identifier: string;
} {
  const wa = getWebApp();
  const user = wa?.initDataUnsafe?.user;
  return {
    user,
    avatarUrl: getUserAvatarUrl(user),
    displayName: getUserDisplayName(user),
    identifier: getUserIdentifier(user),
  };
}

export function getRawUserData(): TgUser | null {
  const wa = getWebApp();
  return wa?.initDataUnsafe?.user ?? null;
}

// ─── Haptic Shortcuts ─────────────────────────────────────────────────────────
export const haptic = {
  light: () => getWebApp()?.HapticFeedback?.impactOccurred('light'),
  medium: () => getWebApp()?.HapticFeedback?.impactOccurred('medium'),
  heavy: () => getWebApp()?.HapticFeedback?.impactOccurred('heavy'),
  rigid: () => getWebApp()?.HapticFeedback?.impactOccurred('rigid'),
  soft: () => getWebApp()?.HapticFeedback?.impactOccurred('soft'),
  success: () => getWebApp()?.HapticFeedback?.notificationOccurred('success'),
  error: () => getWebApp()?.HapticFeedback?.notificationOccurred('error'),
  warning: () => getWebApp()?.HapticFeedback?.notificationOccurred('warning'),
  selection: () => getWebApp()?.HapticFeedback?.selectionChanged(),
};

// ─── Cloud Storage Promises ───────────────────────────────────────────────────
export const cloudStorage = {
  setItem: (key: string, value: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.CloudStorage) return reject(new Error('CloudStorage not available'));
      wa.CloudStorage.setItem(key, value, (err, success) => {
        if (err) reject(err);
        else resolve(success);
      });
    }),

  getItem: (key: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.CloudStorage) return reject(new Error('CloudStorage not available'));
      wa.CloudStorage.getItem(key, (err, value) => {
        if (err) reject(err);
        else resolve(value);
      });
    }),

  getItems: (keys: string[]): Promise<Record<string, string>> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.CloudStorage) return reject(new Error('CloudStorage not available'));
      wa.CloudStorage.getItems(keys, (err, values) => {
        if (err) reject(err);
        else resolve(values);
      });
    }),

  removeItem: (key: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.CloudStorage) return reject(new Error('CloudStorage not available'));
      wa.CloudStorage.removeItem(key, (err, success) => {
        if (err) reject(err);
        else resolve(success);
      });
    }),

  getKeys: (): Promise<string[]> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.CloudStorage) return reject(new Error('CloudStorage not available'));
      wa.CloudStorage.getKeys((err, keys) => {
        if (err) reject(err);
        else resolve(keys);
      });
    }),
};

// ─── Dialog Promises ──────────────────────────────────────────────────────────
export const dialog = {
  alert: (message: string): Promise<void> =>
    new Promise((resolve) => {
      const wa = getWebApp();
      if (!wa) { alert(message); resolve(); return; }
      wa.showAlert(message, resolve);
    }),

  confirm: (message: string): Promise<boolean> =>
    new Promise((resolve) => {
      const wa = getWebApp();
      if (!wa) { resolve(window.confirm(message)); return; }
      wa.showConfirm(message, resolve);
    }),

  popup: (params: import('../types').PopupParams): Promise<string> =>
    new Promise((resolve) => {
      const wa = getWebApp();
      if (!wa) { resolve(''); return; }
      wa.showPopup(params, resolve);
    }),
};

// ─── Clipboard Promises ───────────────────────────────────────────────────────
export function readClipboard(): Promise<string> {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!wa?.readTextFromClipboard) return reject(new Error('readTextFromClipboard not supported'));
    wa.readTextFromClipboard((text) => resolve(text ?? ''));
  });
}

// ─── Invoice ──────────────────────────────────────────────────────────────────
export function openInvoice(url: string): Promise<'paid' | 'cancelled' | 'failed' | 'pending'> {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!wa) return reject(new Error('WebApp not available'));
    wa.openInvoice(url, (status) => resolve(status as 'paid' | 'cancelled' | 'failed' | 'pending'));
  });
}

// ─── QR Scanner ───────────────────────────────────────────────────────────────
export function scanQr(text?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!wa) return reject(new Error('WebApp not available'));
    wa.showScanQrPopup({ text }, (result) => {
      wa.closeScanQrPopup();
      resolve(result);
    });
  });
}

// ─── Biometric Promise Wrappers ───────────────────────────────────────────────
export const biometric = {
  init: (): Promise<void> =>
    new Promise((resolve, reject) => {
      const bio = getWebApp()?.BiometricManager;
      if (!bio) return reject(new Error('BiometricManager not available'));
      bio.init(resolve);
    }),

  requestAccess: (reason?: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const bio = getWebApp()?.BiometricManager;
      if (!bio) return reject(new Error('BiometricManager not available'));
      bio.requestAccess({ reason }, resolve);
    }),

  authenticate: (reason?: string): Promise<{ authenticated: boolean; token?: string }> =>
    new Promise((resolve, reject) => {
      const bio = getWebApp()?.BiometricManager;
      if (!bio) return reject(new Error('BiometricManager not available'));
      bio.authenticate({ reason }, (authenticated, token) => resolve({ authenticated, token }));
    }),
};

// ─── Location Promise Wrappers ────────────────────────────────────────────────
export const location = {
  init: (): Promise<void> =>
    new Promise((resolve, reject) => {
      const loc = getWebApp()?.LocationManager;
      if (!loc) return reject(new Error('LocationManager not available'));
      loc.init((error?: Error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    }),

  getLocation: (): Promise<import('../types').LocationData | null> =>
    new Promise((resolve, reject) => {
      const loc = getWebApp()?.LocationManager;
      if (!loc) return reject(new Error('LocationManager not available'));
      loc.getLocation((location: import('../types').LocationData | null, error?: Error) => {
        if (error) {
          reject(error);
        } else {
          resolve(location);
        }
      });
    }),
};