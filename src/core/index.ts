import type { TgUser, TgWebApp, DownloadFileParams, EmojiStatusParams, RequestChatParams, StoryShareParams } from '../types';

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

export const deviceStorage = {
  setItem: (key: string, value: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.DeviceStorage) return reject(new Error('DeviceStorage not available'));
      wa.DeviceStorage.setItem(key, value, (err, success) => {
        if (err) reject(err);
        else resolve(success);
      });
    }),

  getItem: (key: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.DeviceStorage) return reject(new Error('DeviceStorage not available'));
      wa.DeviceStorage.getItem(key, (err, value) => {
        if (err) reject(err);
        else resolve(value);
      });
    }),

  removeItem: (key: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.DeviceStorage) return reject(new Error('DeviceStorage not available'));
      wa.DeviceStorage.removeItem(key, (err, success) => {
        if (err) reject(err);
        else resolve(success);
      });
    }),

  clear: (): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.DeviceStorage) return reject(new Error('DeviceStorage not available'));
      wa.DeviceStorage.clear((err, success) => {
        if (err) reject(err);
        else resolve(success);
      });
    }),
};

export const secureStorage = {
  setItem: (key: string, value: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.SecureStorage) return reject(new Error('SecureStorage not available'));
      wa.SecureStorage.setItem(key, value, (err, success) => {
        if (err) reject(err);
        else resolve(success);
      });
    }),

  getItem: (key: string): Promise<{ value: string | null; canRestore: boolean }> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.SecureStorage) return reject(new Error('SecureStorage not available'));
      wa.SecureStorage.getItem(key, (err, value, canRestore) => {
        if (err) reject(err);
        else resolve({ value: value ?? null, canRestore });
      });
    }),

  removeItem: (key: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.SecureStorage) return reject(new Error('SecureStorage not available'));
      wa.SecureStorage.removeItem(key, (err, success) => {
        if (err) reject(err);
        else resolve(success);
      });
    }),

  clear: (): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.SecureStorage) return reject(new Error('SecureStorage not available'));
      wa.SecureStorage.clear((err, success) => {
        if (err) reject(err);
        else resolve(success);
      });
    }),

  restoreItem: (key: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.SecureStorage) return reject(new Error('SecureStorage not available'));
      wa.SecureStorage.restoreItem(key, (err, value) => {
        if (err) reject(err);
        else resolve(value);
      });
    }),
};

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

export function readClipboard(): Promise<string> {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!wa?.readTextFromClipboard) return reject(new Error('readTextFromClipboard not supported'));
    wa.readTextFromClipboard((text) => resolve(text ?? ''));
  });
}

export function openInvoice(url: string): Promise<'paid' | 'cancelled' | 'failed' | 'pending'> {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!wa) return reject(new Error('WebApp not available'));
    wa.openInvoice(url, (status) => resolve(status as 'paid' | 'cancelled' | 'failed' | 'pending'));
  });
}

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

export function shareToStory(mediaUrl: string, params?: StoryShareParams): void {
  const wa = getWebApp();
  wa?.shareToStory?.(mediaUrl, params);
}

export function shareMessage(msgId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!wa?.shareMessage) return reject(new Error('shareMessage not supported'));
    wa.shareMessage(msgId, resolve);
  });
}

export function setEmojiStatus(
  customEmojiId: string,
  params?: EmojiStatusParams
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!wa?.setEmojiStatus) return reject(new Error('setEmojiStatus not supported'));
    wa.setEmojiStatus(customEmojiId, params, resolve);
  });
}

export function requestEmojiStatusAccess(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!wa?.requestEmojiStatusAccess) return reject(new Error('requestEmojiStatusAccess not supported'));
    wa.requestEmojiStatusAccess(resolve);
  });
}

export function downloadFile(params: DownloadFileParams): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!wa?.downloadFile) return reject(new Error('downloadFile not supported'));
    wa.downloadFile(params, resolve);
  });
}

export function requestChat(reqId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!wa?.requestChat) return reject(new Error('requestChat not supported (Bot API 9.6+ required)'));
    wa.requestChat(reqId, resolve);
  });
}

export function hideKeyboard(): void {
  const wa = getWebApp();
  wa?.hideKeyboard?.();
}

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
