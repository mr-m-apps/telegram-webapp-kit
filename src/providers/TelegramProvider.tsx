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
import { getWebApp, isInTelegram, tgLangToTmdb, tgLangToUi, RTL_LANGS, isRtlLang } from '../core';
import type { TgUser, TgWebApp } from '../types';

// ─── Context Types ────────────────────────────────────────────────────────────
export interface TelegramContextValue {
  ready: boolean;
  inTelegram: boolean;
  /** true in dev mode when bypass=true in URL or NODE_ENV === 'development' */
  bypass: boolean;
  webApp: TgWebApp | null;
  user: TgUser | null;
  /** TMDB-style locale e.g. 'en-US' */
  language: string;
  /** Short UI lang code e.g. 'en' */
  uiLang: string;
  colorScheme: 'light' | 'dark';
  startParam: string | null;
  isRtl: boolean;
  changeLanguage: (lang: string) => void;
}

// ─── Provider Options ─────────────────────────────────────────────────────────
export interface TelegramProviderOptions {
  /** localStorage key for saved language */
  langStorageKey?: string;
  /** Called when a user is found; use to sync to your backend */
  onUserReady?: (user: TgUser) => void;
  /** Called when the WebApp is initialized */
  onReady?: (wa: TgWebApp) => void;
  /** Custom i18n change function */
  onLanguageChange?: (lang: string) => void;
  /** Component shown while initializing */
  loadingComponent?: ReactNode;
  /** Component shown when not in Telegram (outside dev bypass) */
  notInTelegramComponent?: ReactNode;
  /** Allow rendering outside Telegram in all envs (not just dev) */
  allowOutsideTelegram?: boolean;
}

// ─── Default Context ──────────────────────────────────────────────────────────
const defaultCtx: TelegramContextValue = {
  ready: false,
  inTelegram: false,
  bypass: false,
  webApp: null,
  user: null,
  language: 'en-US',
  uiLang: 'en',
  colorScheme: 'dark',
  startParam: null,
  isRtl: false,
  changeLanguage: () => {},
};

const TelegramContext = createContext<TelegramContextValue>(defaultCtx);

export function useTelegram(): TelegramContextValue {
  return useContext(TelegramContext);
}

// ─── DOM Helpers ──────────────────────────────────────────────────────────────
function applyLangToDOM(lang: string) {
  const rtl = isRtlLang(lang);
  document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
}

function applyColorSchemeToDOM(scheme: 'light' | 'dark') {
  if (scheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// ─── TelegramProvider ─────────────────────────────────────────────────────────
export function TelegramProvider({
  children,
  options = {},
}: {
  children: ReactNode;
  options?: TelegramProviderOptions;
}) {
  const {
    langStorageKey = 'tg-kit-ui-lang',
    onUserReady,
    onReady,
    onLanguageChange,
    loadingComponent = null,
    notInTelegramComponent = null,
    allowOutsideTelegram = false,
  } = options;

  const [isInitialized, setIsInitialized] = useState(false);
  const [ctx, setCtx] = useState<TelegramContextValue>(defaultCtx);

  const getSavedLang = useCallback((): string | null => {
    try { return localStorage.getItem(langStorageKey); } catch { return null; }
  }, [langStorageKey]);

  const saveLang = useCallback((lang: string) => {
    try { localStorage.setItem(langStorageKey, lang); } catch {}
  }, [langStorageKey]);

  const changeLanguage = useCallback((lang: string) => {
    saveLang(lang);
    applyLangToDOM(lang);
    onLanguageChange?.(lang);
    setCtx((prev) => ({
      ...prev,
      uiLang: lang,
      language: tgLangToTmdb(lang),
      isRtl: isRtlLang(lang),
    }));
  }, [saveLang, onLanguageChange]);

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
      // Setup WebApp
      try { wa.expand(); } catch {}
      try { wa.disableVerticalSwipes?.(); } catch {}
      try { wa.enableClosingConfirmation?.(); } catch {}

      colorScheme = wa.colorScheme ?? 'dark';
      user = wa.initDataUnsafe?.user ?? null;
      startParam = wa.initDataUnsafe?.start_param ?? null;

      if (user) onUserReady?.(user);
      onReady?.(wa);
    }

    const tgLangCode = user?.language_code;
    const tgUiLang = tgLangToUi(tgLangCode);
    const savedLang = getSavedLang();
    const finalUiLang = savedLang ?? tgUiLang;
    const finalLanguage = tgLangToTmdb(finalUiLang);

    if (!savedLang) saveLang(finalUiLang);

    applyLangToDOM(finalUiLang);
    applyColorSchemeToDOM(colorScheme);
    onLanguageChange?.(finalUiLang);

    setCtx({
      ready: true,
      inTelegram: inTg,
      bypass,
      webApp: wa,
      user,
      language: finalLanguage,
      uiLang: finalUiLang,
      colorScheme,
      startParam,
      isRtl: isRtlLang(finalUiLang),
      changeLanguage,
    });

    setIsInitialized(true);

    try { wa?.ready(); } catch {}
  }, [changeLanguage, getSavedLang, saveLang, onUserReady, onReady, onLanguageChange]);

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
