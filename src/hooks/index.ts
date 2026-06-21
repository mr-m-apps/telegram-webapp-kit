'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getWebApp } from '../core';
import type { TgUser, TgWebApp, WebAppEventType, DownloadFileParams, EmojiStatusParams, RequestChatParams, StoryShareParams } from '../types';

export function useTelegramWebApp(): TgWebApp | null {
  const [wa, setWa] = useState<TgWebApp | null>(null);
  useEffect(() => { setWa(getWebApp()); }, []);
  return wa;
}

export function useTelegramUser(): TgUser | null {
  return getWebApp()?.initDataUnsafe?.user ?? null;
}

export function useTelegramEvent(
  eventType: WebAppEventType | string,
  handler: (...args: unknown[]) => void
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const wa = getWebApp();
    if (!wa) return;
    const cb = (...args: unknown[]) => handlerRef.current(...args);
    wa.onEvent(eventType, cb);
    return () => wa.offEvent(eventType, cb);
  }, [eventType]);
}

export function useTelegramBackButton(options?: {
  pathname?: string;
  onBack?: () => void;
  hideOnRoot?: boolean;
}) {
  const { pathname = '/', onBack, hideOnRoot = true } = options ?? {};

  useEffect(() => {
    const wa = getWebApp();
    if (!wa?.BackButton) return;

    const handleBack = onBack ?? (() => {
      if (typeof window !== 'undefined' && window.history.length > 1) {
        window.history.back();
      } else {
        wa.close();
      }
    });

    wa.onEvent('backButtonClicked', handleBack);

    if (hideOnRoot && pathname === '/') {
      wa.BackButton.hide();
    } else {
      wa.BackButton.show();
    }

    return () => {
      wa.offEvent('backButtonClicked', handleBack);
      wa.BackButton?.hide();
    };
  }, [pathname, onBack, hideOnRoot]);
}

export function useTelegramMainButton(options: {
  text: string;
  onClick: () => void;
  isVisible?: boolean;
  isActive?: boolean;
  color?: string;
  textColor?: string;
  hasShineEffect?: boolean;
  showProgress?: boolean;
}) {
  const { text, onClick, isVisible = true, isActive = true, color, textColor, hasShineEffect, showProgress } = options;
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  useEffect(() => {
    const wa = getWebApp();
    if (!wa?.MainButton) return;

    const cb = () => onClickRef.current();
    
    return () => {
      wa.MainButton.offClick(cb);
    };

    wa.MainButton.setParams({
      text,
      is_visible: isVisible,
      is_active: isActive,
      ...(color && { color }),
      ...(textColor && { text_color: textColor }),
      ...(hasShineEffect !== undefined && { hasShineEffect }),
    });

    if (showProgress) 
    wa.MainButton.show_progress();
    else wa.MainButton.hide_progress();

    return () => wa.MainButton.offClick(cb);
  }, [text, isVisible, isActive, color, textColor, hasShineEffect, showProgress]);
}

export function useTelegramSecondaryButton(options: {
  text: string;
  onClick: () => void;
  isVisible?: boolean;
  isActive?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  color?: string;
  textColor?: string;
}) {
  const { text, onClick, isVisible = true, isActive = true, position, color, textColor } = options;
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  useEffect(() => {
    const wa = getWebApp();
    if (!wa?.SecondaryButton) return;

    const cb = () => onClickRef.current();
    return () => {
      wa.SecondaryButton?.offClick(cb);
    };

    wa.SecondaryButton.setParams({
      text,
      is_visible: isVisible,
      is_active: isActive,
      ...(position && { position }),
      ...(color && { color }),
      ...(textColor && { text_color: textColor }),
    });

    return () => wa.SecondaryButton?.offClick(cb);
  }, [text, isVisible, isActive, position, color, textColor]);
}

export function useTelegramSettingsButton(onSettings: () => void) {
  const onSettingsRef = useRef(onSettings);
  onSettingsRef.current = onSettings;

  useEffect(() => {
    const wa = getWebApp();
    if (!wa?.SettingsButton) return;

    const cb = () => onSettingsRef.current();
    wa.SettingsButton.show();
    wa.onEvent('settingsButtonClicked', cb);

    return () => {
      wa.offEvent('settingsButtonClicked', cb);
      wa.SettingsButton?.hide();
    };
  }, []);
}

export function useHapticFeedback() {
  return {
    impact: useCallback((style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') => {
      getWebApp()?.HapticFeedback?.impactOccurred(style);
    }, []),
    notification: useCallback((type: 'error' | 'success' | 'warning') => {
      getWebApp()?.HapticFeedback?.notificationOccurred(type);
    }, []),
    selectionChanged: useCallback(() => {
      getWebApp()?.HapticFeedback?.selectionChanged();
    }, []),
  };
}

export function useTelegramTheme() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(
    () => getWebApp()?.colorScheme ?? 'dark'
  );
  const [themeParams, setThemeParams] = useState(
    () => getWebApp()?.themeParams ?? {}
  );

  useTelegramEvent('themeChanged', () => {
    const wa = getWebApp();
    if (!wa) return;
    setColorScheme(wa.colorScheme);
    setThemeParams(wa.themeParams);
  });

  return { colorScheme, themeParams, isDark: colorScheme === 'dark' };
}

export function useTelegramViewport() {
  const [viewport, setViewport] = useState(() => ({
    height: getWebApp()?.viewportHeight ?? 0,
    stableHeight: getWebApp()?.viewportStableHeight ?? 0,
    isExpanded: getWebApp()?.isExpanded ?? false,
  }));

  useTelegramEvent('viewportChanged', () => {
    const wa = getWebApp();
    if (!wa) return;
    setViewport({
      height: wa.viewportHeight,
      stableHeight: wa.viewportStableHeight,
      isExpanded: wa.isExpanded,
    });
  });

  const expand = useCallback(() => getWebApp()?.expand(), []);

  return { ...viewport, expand };
}

export function useTelegramFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(
    () => Boolean(getWebApp()?.isFullscreen)
  );
  const [error, setError] = useState<{ error: string } | null>(null);

  useTelegramEvent('fullscreenChanged', () => {
    setIsFullscreen(Boolean(getWebApp()?.isFullscreen));
  });

  useTelegramEvent('fullscreenFailed', (...args) => {
    const err = args[0];
    if (err && typeof err === 'object' && 'error' in err) {
      setError(err as { error: string });
    }
  });

  const enter = useCallback(() => {
    setError(null);
    getWebApp()?.requestFullscreen?.();
  }, []);

  const exit = useCallback(() => {
    getWebApp()?.exitFullscreen?.();
  }, []);

  const toggle = useCallback(() => {
    if (isFullscreen) exit();
    else enter();
  }, [isFullscreen, enter, exit]);

  return { isFullscreen, error, enter, exit, toggle };
}

export function useSafeArea() {
  const [safeArea, setSafeArea] = useState(
    () => getWebApp()?.safeAreaInset ?? { top: 0, bottom: 0, left: 0, right: 0 }
  );
  const [contentSafeArea, setContentSafeArea] = useState(
    () => getWebApp()?.contentSafeAreaInset ?? { top: 0, bottom: 0, left: 0, right: 0 }
  );

  useTelegramEvent('safeAreaChanged', () => {
    const inset = getWebApp()?.safeAreaInset;
    if (inset) setSafeArea(inset);
  });

  useTelegramEvent('contentSafeAreaChanged', () => {
    const inset = getWebApp()?.contentSafeAreaInset;
    if (inset) setContentSafeArea(inset);
  });

  return { safeArea, contentSafeArea };
}

export function useCloudStorage() {
  const setItem = useCallback((key: string, value: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.CloudStorage) return reject(new Error('CloudStorage not available'));
      wa.CloudStorage.setItem(key, value, (err, success) => {
        if (err) reject(err); else resolve(success);
      });
    }), []);

  const getItem = useCallback((key: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.CloudStorage) return reject(new Error('CloudStorage not available'));
      wa.CloudStorage.getItem(key, (err, value) => {
        if (err) reject(err); else resolve(value);
      });
    }), []);

  const getItems = useCallback((keys: string[]): Promise<Record<string, string>> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.CloudStorage) return reject(new Error('CloudStorage not available'));
      wa.CloudStorage.getItems(keys, (err, values) => {
        if (err) reject(err); else resolve(values);
      });
    }), []);

  const removeItem = useCallback((key: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.CloudStorage) return reject(new Error('CloudStorage not available'));
      wa.CloudStorage.removeItem(key, (err, success) => {
        if (err) reject(err); else resolve(success);
      });
    }), []);

  const getKeys = useCallback((): Promise<string[]> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.CloudStorage) return reject(new Error('CloudStorage not available'));
      wa.CloudStorage.getKeys((err, keys) => {
        if (err) reject(err); else resolve(keys);
      });
    }), []);

  return { setItem, getItem, getItems, removeItem, getKeys };
}

export function useDeviceStorage() {
  const setItem = useCallback((key: string, value: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.DeviceStorage) return reject(new Error('DeviceStorage not available'));
      wa.DeviceStorage.setItem(key, value, (err, success) => {
        if (err) reject(err); else resolve(success);
      });
    }), []);

  const getItem = useCallback((key: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.DeviceStorage) return reject(new Error('DeviceStorage not available'));
      wa.DeviceStorage.getItem(key, (err, value) => {
        if (err) reject(err); else resolve(value);
      });
    }), []);

  const removeItem = useCallback((key: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.DeviceStorage) return reject(new Error('DeviceStorage not available'));
      wa.DeviceStorage.removeItem(key, (err, success) => {
        if (err) reject(err); else resolve(success);
      });
    }), []);

  const clear = useCallback((): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.DeviceStorage) return reject(new Error('DeviceStorage not available'));
      wa.DeviceStorage.clear((err, success) => {
        if (err) reject(err); else resolve(success);
      });
    }), []);

  return { setItem, getItem, removeItem, clear };
}

export function useSecureStorage() {
  const setItem = useCallback((key: string, value: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.SecureStorage) return reject(new Error('SecureStorage not available'));
      wa.SecureStorage.setItem(key, value, (err, success) => {
        if (err) reject(err); else resolve(success);
      });
    }), []);

  const getItem = useCallback((key: string): Promise<{ value: string | null; canRestore: boolean }> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.SecureStorage) return reject(new Error('SecureStorage not available'));
      wa.SecureStorage.getItem(key, (err, value, canRestore) => {
        if (err) reject(err); else resolve({ value: value ?? null, canRestore });
      });
    }), []);

  const removeItem = useCallback((key: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.SecureStorage) return reject(new Error('SecureStorage not available'));
      wa.SecureStorage.removeItem(key, (err, success) => {
        if (err) reject(err); else resolve(success);
      });
    }), []);

  const clear = useCallback((): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.SecureStorage) return reject(new Error('SecureStorage not available'));
      wa.SecureStorage.clear((err, success) => {
        if (err) reject(err); else resolve(success);
      });
    }), []);

  const restoreItem = useCallback((key: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.SecureStorage) return reject(new Error('SecureStorage not available'));
      wa.SecureStorage.restoreItem(key, (err, value) => {
        if (err) reject(err); else resolve(value);
      });
    }), []);

  return { setItem, getItem, removeItem, clear, restoreItem };
}

export function useAccelerometer(options?: { refreshRate?: number; autoStart?: boolean }) {
  const { refreshRate = 100, autoStart = false } = options ?? {};
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [isStarted, setIsStarted] = useState(false);

  useTelegramEvent('accelerometerChanged', () => {
    const acc = getWebApp()?.Accelerometer;
    if (acc) setData({ x: acc.x, y: acc.y, z: acc.z });
  });

  useTelegramEvent('accelerometerStarted', () => setIsStarted(true));
  useTelegramEvent('accelerometerStopped', () => setIsStarted(false));

  const start = useCallback(() => {
    getWebApp()?.Accelerometer?.start({ refresh_rate: refreshRate });
  }, [refreshRate]);

  const stop = useCallback(() => {
    getWebApp()?.Accelerometer?.stop();
  }, []);

  useEffect(() => {
    if (autoStart) start();
    return () => { if (autoStart) stop(); };
  }, [autoStart, start, stop]);

  return { ...data, isStarted, start, stop };
}

export function useGyroscope(options?: { refreshRate?: number; autoStart?: boolean }) {
  const { refreshRate = 100, autoStart = false } = options ?? {};
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [isStarted, setIsStarted] = useState(false);

  useTelegramEvent('gyroscopeChanged', () => {
    const gyro = getWebApp()?.Gyroscope;
    if (gyro) setData({ x: gyro.x, y: gyro.y, z: gyro.z });
  });

  useTelegramEvent('gyroscopeStarted', () => setIsStarted(true));
  useTelegramEvent('gyroscopeStopped', () => setIsStarted(false));

  const start = useCallback(() => {
    getWebApp()?.Gyroscope?.start({ refresh_rate: refreshRate });
  }, [refreshRate]);

  const stop = useCallback(() => {
    getWebApp()?.Gyroscope?.stop();
  }, []);

  useEffect(() => {
    if (autoStart) start();
    return () => { if (autoStart) stop(); };
  }, [autoStart, start, stop]);

  return { ...data, isStarted, start, stop };
}

export function useDeviceOrientation(options?: { refreshRate?: number; needAbsolute?: boolean; autoStart?: boolean }) {
  const { refreshRate = 100, needAbsolute = false, autoStart = false } = options ?? {};
  const [data, setData] = useState({ alpha: 0, beta: 0, gamma: 0, absolute: false });
  const [isStarted, setIsStarted] = useState(false);

  useTelegramEvent('deviceOrientationChanged', () => {
    const ori = getWebApp()?.DeviceOrientation;
    if (ori) setData({
      alpha: ori.alpha ?? 0,
      beta: ori.beta ?? 0,
      gamma: ori.gamma ?? 0,
      absolute: ori.absolute,
    });
  });

  useTelegramEvent('deviceOrientationStarted', () => setIsStarted(true));
  useTelegramEvent('deviceOrientationStopped', () => setIsStarted(false));

  const start = useCallback(() => {
    getWebApp()?.DeviceOrientation?.start({ refresh_rate: refreshRate, need_absolute: needAbsolute });
  }, [refreshRate, needAbsolute]);

  const stop = useCallback(() => {
    getWebApp()?.DeviceOrientation?.stop();
  }, []);

  useEffect(() => {
    if (autoStart) start();
    return () => { if (autoStart) stop(); };
  }, [autoStart, start, stop]);

  return { ...data, isStarted, start, stop };
}

export function useBiometric() {
  const [isInited, setIsInited] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<'finger' | 'face' | 'unknown'>('unknown');

  useTelegramEvent('biometricManagerUpdated', () => {
    const bio = getWebApp()?.BiometricManager;
    if (!bio) return;
    setIsInited(bio.is_inited);
    setIsAvailable(bio.is_biometric_available);
    setBiometricType(bio.biometric_type);
  });

  const init = useCallback((): Promise<void> =>
    new Promise((resolve, reject) => {
      const bio = getWebApp()?.BiometricManager;
      if (!bio) return reject(new Error('BiometricManager not available'));
      bio.init(() => {
        setIsInited(true);
        setIsAvailable(bio.is_biometric_available);
        setBiometricType(bio.biometric_type);
        resolve();
      });
    }), []);

  const requestAccess = useCallback((reason?: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const bio = getWebApp()?.BiometricManager;
      if (!bio) return reject(new Error('BiometricManager not available'));
      bio.requestAccess({ reason }, resolve);
    }), []);

  const authenticate = useCallback((reason?: string): Promise<{ authenticated: boolean; token?: string }> =>
    new Promise((resolve, reject) => {
      const bio = getWebApp()?.BiometricManager;
      if (!bio) return reject(new Error('BiometricManager not available'));
      bio.authenticate({ reason }, (authenticated, token) => resolve({ authenticated, token }));
    }), []);

  return { isInited, isAvailable, biometricType, init, requestAccess, authenticate };
}

export function useLocation() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isGranted, setIsGranted] = useState(false);

  useTelegramEvent('locationManagerUpdated', () => {
    const loc = getWebApp()?.LocationManager;
    if (!loc) return;
    setIsAvailable(loc.is_location_available);
    setIsGranted(loc.is_access_granted);
  });

  const init = useCallback((): Promise<void> =>
    new Promise((resolve, reject) => {
      const loc = getWebApp()?.LocationManager;
      if (!loc) return reject(new Error('LocationManager not available'));
      loc.init(() => {
        if (loc) {
          setIsAvailable(loc.is_location_available);
          setIsGranted(loc.is_access_granted);
        }
        resolve();
      });
    }), []);

  const getLocation = useCallback(() =>
    new Promise<import('../types').LocationData | null>((resolve, reject) => {
      const loc = getWebApp()?.LocationManager;
      if (!loc) return reject(new Error('LocationManager not available'));
      loc.getLocation(resolve);
    }), []);

  const openSettings = useCallback(() => {
    getWebApp()?.LocationManager?.openSettings();
  }, []);

  return { isAvailable, isGranted, init, getLocation, openSettings };
}

export function useHomeScreen() {
  const addToHomeScreen = useCallback(() => {
    getWebApp()?.addToHomeScreen?.();
  }, []);

  const checkStatus = useCallback((): Promise<'unsupported' | 'unknown' | 'added' | 'missed'> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.checkHomeScreenStatus) return reject(new Error('Not supported'));
      wa.checkHomeScreenStatus((status) => resolve(status ?? 'unsupported'));
    }), []);

  return { addToHomeScreen, checkStatus };
}

export function useIsActive(): boolean {
  const [isActive, setIsActive] = useState(() => Boolean(getWebApp()?.isActive));
  useTelegramEvent('activated', () => setIsActive(true));
  useTelegramEvent('deactivated', () => setIsActive(false));
  return isActive;
}

export function useTelegramStartParam(): string | null {
  return getWebApp()?.initDataUnsafe?.start_param ?? null;
}

export function useShareToStory() {
  return useCallback((mediaUrl: string, params?: StoryShareParams) => {
    const wa = getWebApp();
    wa?.shareToStory?.(mediaUrl, params);
  }, []);
}

export function useShareMessage() {
  return useCallback((msgId: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.shareMessage) return reject(new Error('shareMessage not supported'));
      wa.shareMessage(msgId, resolve);
    }), []);
}

export function useSetEmojiStatus() {
  return useCallback((customEmojiId: string, params?: EmojiStatusParams): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.setEmojiStatus) return reject(new Error('setEmojiStatus not supported'));
      wa.setEmojiStatus(customEmojiId, params, resolve);
    }), []);
}

export function useRequestEmojiStatusAccess() {
  return useCallback((): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.requestEmojiStatusAccess) return reject(new Error('requestEmojiStatusAccess not supported'));
      wa.requestEmojiStatusAccess(resolve);
    }), []);
}

export function useDownloadFile() {
  return useCallback((params: DownloadFileParams): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.downloadFile) return reject(new Error('downloadFile not supported'));
      wa.downloadFile(params, resolve);
    }), []);
}

export function useRequestChat() {
  return useCallback((reqId: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      const wa = getWebApp();
      if (!wa?.requestChat) return reject(new Error('requestChat not supported (Bot API 9.6+ required)'));
      wa.requestChat(reqId, resolve);
    }), []);
}

export function useHideKeyboard() {
  return useCallback(() => {
    getWebApp()?.hideKeyboard?.();
  }, []);
}
