'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { getWebApp, isInTelegram } from '../core';
import type { TgUser, TgWebApp } from '../types';

export interface TelegramContextValue {
  ready: boolean;
  inTelegram: boolean;
  bypass: boolean;
  webApp: TgWebApp | null;
  user: TgUser | null;
  colorScheme: 'light' | 'dark';
  startParam: string | null;
}

export interface TelegramProviderOptions {
  onUserReady?: (user: TgUser) => void;
  onReady?: (wa: TgWebApp) => void;
  loadingComponent?: ReactNode;
  notInTelegramComponent?: ReactNode;
  allowOutsideTelegram?: boolean;
}

const defaultCtx: TelegramContextValue = {
  ready: false,
  inTelegram: false,
  bypass: false,
  webApp: null,
  user: null,
  colorScheme: 'dark',
  startParam: null,
};

const TelegramContext = createContext<TelegramContextValue>(defaultCtx);

export function useTelegram(): TelegramContextValue {
  return useContext(TelegramContext);
}

function applyColorSchemeToDOM(scheme: 'light' | 'dark') {
  if (scheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function TelegramProvider({
  children,
  options = {},
}: {
  children: ReactNode;
  options?: TelegramProviderOptions;
}) {
  const {
    onUserReady,
    onReady,
    loadingComponent = null,
    notInTelegramComponent = null,
    allowOutsideTelegram = false,
  } = options;

  const [isInitialized, setIsInitialized] = useState(false);
  const [ctx, setCtx] = useState<TelegramContextValue>(defaultCtx);

  useLayoutEffect(() => {
    const wa = getWebApp();
    const inTg = isInTelegram();

    const isDev =
      process.env.NODE_ENV === 'development' ||
      (typeof window !== 'undefined' &&
        new URLSearchParams(window.location.search).has('bypass'));

    const bypass = !inTg && isDev;

    let user: TgUser | null = null;
    let startParam: string | null = null;
    let colorScheme: 'light' | 'dark' = 'dark';

    if (wa) {
      try { wa.expand(); } catch {}
      try { wa.disableVerticalSwipes?.(); } catch {}
      try { wa.enableClosingConfirmation?.(); } catch {}

      colorScheme = wa.colorScheme ?? 'dark';
      user = wa.initDataUnsafe?.user ?? null;
      startParam = wa.initDataUnsafe?.start_param ?? null;

      if (user) onUserReady?.(user);
      onReady?.(wa);
    }

    applyColorSchemeToDOM(colorScheme);

    setCtx({
      ready: true,
      inTelegram: inTg,
      bypass,
      webApp: wa,
      user,
      colorScheme,
      startParam,
    });

    setIsInitialized(true);

    try { wa?.ready(); } catch {}
  }, [onUserReady, onReady]);

  if (!isInitialized) return <>{loadingComponent}</>;

  if (ctx.ready && !ctx.inTelegram && !ctx.bypass && !allowOutsideTelegram) {
    return <>{notInTelegramComponent}</>;
  }

  return (
    <TelegramContext.Provider value={ctx}>
      {children}
    </TelegramContext.Provider>
  );
}
