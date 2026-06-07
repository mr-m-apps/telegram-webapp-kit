'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import { getWebApp } from '../core';
import type { SafeAreaInset } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FullscreenError {
  error: 'UNSUPPORTED' | 'ALREADY_FULLSCREEN';
}

interface FullscreenContextValue {
  isFullscreen: boolean;
  isSupported: boolean;
  isActive: boolean;
  isOrientationLocked: boolean;
  safeArea: SafeAreaInset;
  contentSafeArea: SafeAreaInset;
  lastFullscreenError: FullscreenError | null;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
}

const DEFAULT_INSET: SafeAreaInset = { top: 0, bottom: 0, left: 0, right: 0 };

// ─── CSS Variable Helpers ─────────────────────────────────────────────────────
const SAFE_AREA_VARS = {
  top: '--tg-safe-area-inset-top',
  bottom: '--tg-safe-area-inset-bottom',
  left: '--tg-safe-area-inset-left',
  right: '--tg-safe-area-inset-right',
} as const;

const CONTENT_SAFE_AREA_VARS = {
  top: '--tg-content-safe-area-inset-top',
  bottom: '--tg-content-safe-area-inset-bottom',
  left: '--tg-content-safe-area-inset-left',
  right: '--tg-content-safe-area-inset-right',
} as const;

function applySafeAreaVars(inset: SafeAreaInset, vars: typeof SAFE_AREA_VARS | typeof CONTENT_SAFE_AREA_VARS) {
  const root = document.documentElement.style;
  root.setProperty(vars.top, `${inset.top}px`);
  root.setProperty(vars.bottom, `${inset.bottom}px`);
  root.setProperty(vars.left, `${inset.left}px`);
  root.setProperty(vars.right, `${inset.right}px`);
}

// ─── Context ──────────────────────────────────────────────────────────────────
const FullscreenContext = createContext<FullscreenContextValue | null>(null);

export function useFullscreen(): FullscreenContextValue {
  const ctx = useContext(FullscreenContext);
  if (!ctx) throw new Error('useFullscreen must be used within FullscreenProvider');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export interface FullscreenProviderOptions {
  /** localStorage key to persist user preference */
  storageKey?: string;
  /** Auto-restore fullscreen preference on mount */
  persistPreference?: boolean;
}

export function FullscreenProvider({
  children,
  options = {},
}: {
  children: ReactNode;
  options?: FullscreenProviderOptions;
}) {
  const { storageKey = 'tg-kit-fullscreen', persistPreference = true } = options;

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isOrientationLocked, setIsOrientationLocked] = useState(false);
  const [lastFullscreenError, setLastFullscreenError] = useState<FullscreenError | null>(null);
  const [safeArea, setSafeArea] = useState<SafeAreaInset>(DEFAULT_INSET);
  const [contentSafeArea, setContentSafeArea] = useState<SafeAreaInset>(DEFAULT_INSET);

  const isInitializedRef = useRef(false);

  const savePreference = useCallback((value: boolean) => {
    if (!persistPreference) return;
    try { localStorage.setItem(storageKey, String(value)); } catch {}
  }, [storageKey, persistPreference]);

  const enterFullscreen = useCallback(() => {
    const wa = getWebApp();
    if (!wa?.requestFullscreen) return;
    setLastFullscreenError(null);
    try { wa.requestFullscreen(); savePreference(true); } catch {}
  }, [savePreference]);

  const exitFullscreen = useCallback(() => {
    const wa = getWebApp();
    if (!wa?.exitFullscreen) return;
    try { wa.exitFullscreen(); savePreference(false); } catch {}
  }, [savePreference]);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) exitFullscreen();
    else enterFullscreen();
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  useEffect(() => {
    const wa = getWebApp();
    if (!wa) return;

    setIsSupported(typeof wa.requestFullscreen === 'function');
    setIsFullscreen(Boolean(wa.isFullscreen));
    setIsActive(Boolean(wa.isActive));
    setIsOrientationLocked(Boolean(wa.isOrientationLocked));

    if (wa.safeAreaInset) {
      setSafeArea(wa.safeAreaInset);
      applySafeAreaVars(wa.safeAreaInset, SAFE_AREA_VARS);
    }
    if (wa.contentSafeAreaInset) {
      setContentSafeArea(wa.contentSafeAreaInset);
      applySafeAreaVars(wa.contentSafeAreaInset, CONTENT_SAFE_AREA_VARS);
    }

    const onFullscreen = () => setIsFullscreen(Boolean(wa.isFullscreen));

    const onFullscreenFailed = (...args: unknown[]) => {
      const err = args[0];
      if (err && typeof err === 'object' && 'error' in err) {
        setLastFullscreenError(err as FullscreenError);
      }
    };

    const onActivated = () => setIsActive(true);
    const onDeactivated = () => setIsActive(false);

    const onSafeArea = () => {
      if (!wa.safeAreaInset) return;
      setSafeArea(wa.safeAreaInset);
      applySafeAreaVars(wa.safeAreaInset, SAFE_AREA_VARS);
    };

    const onContentSafeArea = () => {
      if (!wa.contentSafeAreaInset) return;
      setContentSafeArea(wa.contentSafeAreaInset);
      applySafeAreaVars(wa.contentSafeAreaInset, CONTENT_SAFE_AREA_VARS);
    };

    const onOrientationLocked = () => setIsOrientationLocked(Boolean(wa.isOrientationLocked));

    wa.onEvent('fullscreenChanged', onFullscreen);
    wa.onEvent('fullscreenFailed', onFullscreenFailed);
    wa.onEvent('activated', onActivated);
    wa.onEvent('deactivated', onDeactivated);
    wa.onEvent('safeAreaChanged', onSafeArea);
    wa.onEvent('contentSafeAreaChanged', onContentSafeArea);
    wa.onEvent('orientationLockedChanged', onOrientationLocked);

    // Restore preference
    if (!isInitializedRef.current && persistPreference) {
      isInitializedRef.current = true;
      try {
        const saved = localStorage.getItem(storageKey) === 'true';
        if (saved && !wa.isFullscreen && wa.requestFullscreen) {
          setTimeout(() => wa.requestFullscreen?.(), 100);
        }
      } catch {}
    }

    return () => {
      wa.offEvent('fullscreenChanged', onFullscreen);
      wa.offEvent('fullscreenFailed', onFullscreenFailed);
      wa.offEvent('activated', onActivated);
      wa.offEvent('deactivated', onDeactivated);
      wa.offEvent('safeAreaChanged', onSafeArea);
      wa.offEvent('contentSafeAreaChanged', onContentSafeArea);
      wa.offEvent('orientationLockedChanged', onOrientationLocked);
    };
  }, [storageKey, persistPreference]);

  return (
    <FullscreenContext.Provider
      value={{
        isFullscreen,
        isSupported,
        isActive,
        isOrientationLocked,
        safeArea,
        contentSafeArea,
        lastFullscreenError,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen,
      }}
    >
      {children}
    </FullscreenContext.Provider>
  );
}
