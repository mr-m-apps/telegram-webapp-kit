import * as react from 'react';
import { ReactNode } from 'react';

interface TgUser {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
    is_premium?: boolean;
    allows_write_to_pm?: boolean;
    added_to_attachment_menu?: boolean;
}
interface TgThemeParams {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
    header_bg_color?: string;
    bottom_bar_bg_color?: string;
    accent_text_color?: string;
    section_bg_color?: string;
    section_header_text_color?: string;
    section_separator_color?: string;
    subtitle_text_color?: string;
    destructive_text_color?: string;
}
interface BottomButtonParams {
    text?: string;
    color?: string;
    text_color?: string;
    is_visible?: boolean;
    is_active?: boolean;
    hasShineEffect?: boolean;
    position?: 'left' | 'right' | 'top' | 'bottom';
}
interface BottomButton {
    type: 'main' | 'secondary';
    text: string;
    color: string;
    text_color: string;
    is_visible: boolean;
    is_active: boolean;
    hasShineEffect: boolean;
    isProgressVisible: boolean;
    position?: 'left' | 'right' | 'top' | 'bottom';
    setText: (text: string) => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    setParams: (params: BottomButtonParams) => void;
}
interface MainButton extends BottomButton {
    type: 'main';
}
interface SecondaryButton extends BottomButton {
    type: 'secondary';
    position: 'left' | 'right' | 'top' | 'bottom';
}
interface SettingsButton {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
}
interface BackButton {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
}
interface HapticFeedback {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
}
interface Accelerometer {
    isStarted: boolean;
    x: number;
    y: number;
    z: number;
    start: (params?: {
        refresh_rate?: number;
    }, callback?: (error?: Error) => void) => void;
    stop: (callback?: (error?: Error) => void) => void;
}
interface DeviceOrientation {
    isStarted: boolean;
    absolute: boolean;
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
    start: (params?: {
        refresh_rate?: number;
        need_absolute?: boolean;
    }, callback?: (error?: Error) => void) => void;
    stop: (callback?: (error?: Error) => void) => void;
}
interface Gyroscope {
    isStarted: boolean;
    x: number;
    y: number;
    z: number;
    start: (params?: {
        refresh_rate?: number;
    }, callback?: (error?: Error) => void) => void;
    stop: (callback?: (error?: Error) => void) => void;
}
interface CloudStorage {
    setItem: (key: string, value: string, callback?: (error: Error | null, success: boolean) => void) => void;
    getItem: (key: string, callback: (error: Error | null, value: string) => void) => void;
    getItems: (keys: string[], callback: (error: Error | null, values: Record<string, string>) => void) => void;
    removeItem: (key: string, callback?: (error: Error | null, success: boolean) => void) => void;
    removeItems: (keys: string[], callback?: (error: Error | null, success: boolean) => void) => void;
    getKeys: (callback: (error: Error | null, keys: string[]) => void) => void;
}
interface LocationData {
    latitude: number;
    longitude: number;
    altitude: number | null;
    course: number | null;
    speed: number | null;
    horizontal_accuracy: number | null;
    vertical_accuracy: number | null;
    course_accuracy: number | null;
    speed_accuracy: number | null;
}
interface LocationManager {
    isInited: boolean;
    isLocationAvailable: boolean;
    isAccessRequested: boolean;
    isAccessGranted: boolean;
    init: (callback?: (error?: Error) => void) => void;
    getLocation: (callback: (location: LocationData | null) => void) => void;
    openSettings: () => void;
}
interface BiometricRequestAccessParams {
    reason?: string;
}
interface BiometricAuthenticateParams {
    reason?: string;
}
interface BiometricManager {
    isInited: boolean;
    isBiometricAvailable: boolean;
    biometricType: 'finger' | 'face' | 'unknown';
    isAccessRequested: boolean;
    isAccessGranted: boolean;
    isBiometricTokenSaved: boolean;
    deviceId: string;
    init: (callback?: () => void) => void;
    requestAccess: (params: BiometricRequestAccessParams, callback?: (granted: boolean) => void) => void;
    authenticate: (params: BiometricAuthenticateParams, callback?: (authenticated: boolean, token?: string) => void) => void;
    updateBiometricToken: (token: string, callback?: (updated: boolean) => void) => void;
    openSettings: () => void;
}
interface ChatAdministratorRights {
    can_manage_chat?: boolean;
    can_change_info?: boolean;
    can_delete_messages?: boolean;
    can_invite_users?: boolean;
    can_restrict_members?: boolean;
    can_pin_messages?: boolean;
    can_promote_members?: boolean;
    can_manage_video_chats?: boolean;
    is_anonymous?: boolean;
    can_manage_topics?: boolean;
    can_post_stories?: boolean;
    can_edit_stories?: boolean;
    can_delete_stories?: boolean;
}
interface RequestChatParams {
    request_id: number;
    chat_is_channel: boolean;
    chat_is_forum?: boolean;
    chat_has_username?: boolean;
    chat_is_created?: boolean;
    user_administrator_rights?: ChatAdministratorRights;
    bot_administrator_rights?: ChatAdministratorRights;
    bot_is_member?: boolean;
    request_title?: boolean;
    request_username?: boolean;
    request_photo?: boolean;
}
interface PopupButton {
    id?: string;
    type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
    text?: string;
}
interface PopupParams {
    title?: string;
    message: string;
    buttons?: PopupButton[];
}
interface ScanQrPopupParams {
    text?: string;
}
interface StoryShareParams {
    text?: string;
    widget_link?: {
        url: string;
        name?: string;
    };
}
interface EmojiStatusParams {
    duration?: number;
}
interface DownloadFileParams {
    url: string;
    file_name: string;
}
interface SafeAreaInset {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
interface TgWebApp {
    initData: string;
    initDataUnsafe: {
        user?: TgUser;
        receiver?: TgUser;
        chat?: {
            id: number;
            type: string;
            title: string;
            username?: string;
            photo_url?: string;
        };
        start_param?: string;
        can_send_after?: number;
        auth_date?: number;
        hash?: string;
        chat_type?: string;
        chat_instance?: string;
        signature?: string;
    };
    version: string;
    platform: string;
    colorScheme: 'light' | 'dark';
    themeParams: TgThemeParams;
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    bottomBarColor: string;
    isActive?: boolean;
    isFullscreen?: boolean;
    isOrientationLocked?: boolean;
    isClosingConfirmationEnabled: boolean;
    isVerticalSwipesEnabled: boolean;
    safeAreaInset?: SafeAreaInset;
    contentSafeAreaInset?: SafeAreaInset;
    MainButton: MainButton;
    SecondaryButton?: SecondaryButton;
    BackButton: BackButton;
    SettingsButton?: SettingsButton;
    HapticFeedback: HapticFeedback;
    Accelerometer?: Accelerometer;
    DeviceOrientation?: DeviceOrientation;
    Gyroscope?: Gyroscope;
    CloudStorage: CloudStorage;
    DeviceStorage?: CloudStorage;
    SecureStorage?: CloudStorage;
    LocationManager?: LocationManager;
    BiometricManager?: BiometricManager;
    ready: () => void;
    expand: () => void;
    close: () => void;
    setHeaderColor: (color: string) => void;
    setBackgroundColor: (color: string) => void;
    setBottomBarColor?: (color: string) => void;
    enableVerticalSwipes?: () => void;
    disableVerticalSwipes?: () => void;
    enableClosingConfirmation?: () => void;
    disableClosingConfirmation?: () => void;
    requestFullscreen?: () => void;
    exitFullscreen?: () => void;
    sendData: (data: string) => void;
    switchInlineQuery: (query: string, chooseChatTypes?: Array<'users' | 'bots' | 'groups' | 'channels'>) => void;
    openLink: (url: string, options?: {
        try_instant_view?: boolean;
        try_browser?: boolean;
    }) => void;
    openTelegramLink: (url: string) => void;
    openInvoice: (url: string, callback?: (status: 'paid' | 'cancelled' | 'failed' | 'pending') => void) => void;
    shareToStory?: (mediaUrl: string, params?: StoryShareParams) => void;
    shareMessage?: (msgId: string, callback?: (success: boolean) => void) => void;
    setEmojiStatus?: (customEmojiId: string, params?: EmojiStatusParams, callback?: (success: boolean) => void) => void;
    requestEmojiStatusAccess?: (callback?: (granted: boolean) => void) => void;
    downloadFile?: (params: DownloadFileParams, callback?: (accepted: boolean) => void) => void;
    hideKeyboard?: () => void;
    showPopup: (params: PopupParams, callback?: (buttonId: string) => void) => void;
    showAlert: (message: string, callback?: () => void) => void;
    showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
    showScanQrPopup: (params: ScanQrPopupParams, callback?: (text: string) => void) => void;
    closeScanQrPopup: () => void;
    readTextFromClipboard?: (callback?: (text: string) => void) => void;
    requestWriteAccess?: (callback?: (granted: boolean) => void) => void;
    requestContact?: (callback?: (shared: boolean) => void) => void;
    requestChat?: (params: RequestChatParams, callback?: (success: boolean) => void) => void;
    addToHomeScreen?: () => void;
    checkHomeScreenStatus?: (callback?: (status: 'unsupported' | 'unknown' | 'added' | 'missed') => void) => void;
    requestWriteAccess2?: (callback?: (granted: boolean) => void) => void;
    shareToStoryV2?: (params: StoryShareParams & {
        media_url: string;
    }) => void;
    onEvent: (eventType: WebAppEventType | string, eventHandler: (...args: unknown[]) => void) => void;
    offEvent: (eventType: WebAppEventType | string, eventHandler: (...args: unknown[]) => void) => void;
    isVersionAtLeast: (version: string) => boolean;
}
type WebAppEventType = 'themeChanged' | 'mainButtonClicked' | 'secondaryButtonClicked' | 'backButtonClicked' | 'settingsButtonClicked' | 'viewportChanged' | 'invoiceClosed' | 'popupClosed' | 'qrTextReceived' | 'scanQrPopupClosed' | 'clipboardTextReceived' | 'writeAccessRequested' | 'contactRequested' | 'chatBoostAdded' | 'activated' | 'deactivated' | 'safeAreaChanged' | 'contentSafeAreaChanged' | 'fullscreenChanged' | 'fullscreenFailed' | 'homeScreenAdded' | 'homeScreenChecked' | 'emojiStatusSet' | 'emojiStatusFailed' | 'emojiStatusAccessRequested' | 'shareMessageSent' | 'shareMessageFailed' | 'fileDownloadRequested' | 'locationManagerUpdated' | 'locationRequested' | 'accelerometerStarted' | 'accelerometerStopped' | 'accelerometerChanged' | 'accelerometerFailed' | 'deviceOrientationStarted' | 'deviceOrientationStopped' | 'deviceOrientationChanged' | 'deviceOrientationFailed' | 'gyroscopeStarted' | 'gyroscopeStopped' | 'gyroscopeChanged' | 'gyroscopeFailed' | 'biometricManagerUpdated' | 'biometricAuthRequested' | 'biometricTokenUpdated';
declare global {
    interface Window {
        Telegram?: {
            WebApp?: TgWebApp;
        };
    }
}

declare function getWebApp(): TgWebApp | null;
declare function isInTelegram(): boolean;
declare function isVersionAtLeast(version: string): boolean;
declare function tgLangToTmdb(code?: string): string;
declare function tgLangToUi(code?: string): string;
declare const RTL_LANGS: Set<string>;
declare function isRtlLang(lang?: string): boolean;
declare const SUPPORTED_LANGS: readonly [{
    readonly code: "en";
    readonly countryCode: "us";
    readonly name: "English";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/us.svg";
}, {
    readonly code: "ar";
    readonly countryCode: "sa";
    readonly name: "العربية";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/sa.svg";
}, {
    readonly code: "es";
    readonly countryCode: "es";
    readonly name: "Español";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/es.svg";
}, {
    readonly code: "fr";
    readonly countryCode: "fr";
    readonly name: "Français";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/fr.svg";
}, {
    readonly code: "de";
    readonly countryCode: "de";
    readonly name: "Deutsch";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/de.svg";
}, {
    readonly code: "it";
    readonly countryCode: "it";
    readonly name: "Italiano";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/it.svg";
}, {
    readonly code: "pt";
    readonly countryCode: "pt";
    readonly name: "Português";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/pt.svg";
}, {
    readonly code: "ru";
    readonly countryCode: "ru";
    readonly name: "Русский";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/ru.svg";
}, {
    readonly code: "zh";
    readonly countryCode: "cn";
    readonly name: "中文";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/cn.svg";
}, {
    readonly code: "ja";
    readonly countryCode: "jp";
    readonly name: "日本語";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/jp.svg";
}, {
    readonly code: "ko";
    readonly countryCode: "kr";
    readonly name: "한국어";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/kr.svg";
}, {
    readonly code: "tr";
    readonly countryCode: "tr";
    readonly name: "Türkçe";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/tr.svg";
}, {
    readonly code: "hi";
    readonly countryCode: "in";
    readonly name: "हिन्दी";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/in.svg";
}, {
    readonly code: "id";
    readonly countryCode: "id";
    readonly name: "Indonesia";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/id.svg";
}, {
    readonly code: "nl";
    readonly countryCode: "nl";
    readonly name: "Nederlands";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/nl.svg";
}, {
    readonly code: "pl";
    readonly countryCode: "pl";
    readonly name: "Polski";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/pl.svg";
}, {
    readonly code: "sv";
    readonly countryCode: "se";
    readonly name: "Svenska";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/se.svg";
}, {
    readonly code: "uk";
    readonly countryCode: "ua";
    readonly name: "Українська";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/ua.svg";
}, {
    readonly code: "vi";
    readonly countryCode: "vn";
    readonly name: "Tiếng Việt";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/vn.svg";
}, {
    readonly code: "fa";
    readonly countryCode: "ir";
    readonly name: "فارسی";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/ir.svg";
}, {
    readonly code: "he";
    readonly countryCode: "il";
    readonly name: "עברית";
    readonly flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/il.svg";
}];
type Language = (typeof SUPPORTED_LANGS)[number];
declare function openExternalLink(url: string, tryInstantView?: boolean): void;
declare function openTelegramLink(url: string): void;
declare function getUserAvatarUrl(user?: TgUser, defaultAvatarUrl?: string): string;
declare function getUserIdentifier(user?: TgUser): string;
declare function getUserDisplayName(user?: TgUser): string;
declare function getUserInfoWithAvatar(): {
    user: TgUser | undefined;
    avatarUrl: string;
    displayName: string;
    identifier: string;
};
declare function getRawUserData(): TgUser | null;
declare const haptic: {
    light: () => void | undefined;
    medium: () => void | undefined;
    heavy: () => void | undefined;
    rigid: () => void | undefined;
    soft: () => void | undefined;
    success: () => void | undefined;
    error: () => void | undefined;
    warning: () => void | undefined;
    selection: () => void | undefined;
};
declare const cloudStorage: {
    setItem: (key: string, value: string) => Promise<boolean>;
    getItem: (key: string) => Promise<string>;
    getItems: (keys: string[]) => Promise<Record<string, string>>;
    removeItem: (key: string) => Promise<boolean>;
    getKeys: () => Promise<string[]>;
};
declare const dialog: {
    alert: (message: string) => Promise<void>;
    confirm: (message: string) => Promise<boolean>;
    popup: (params: PopupParams) => Promise<string>;
};
declare function readClipboard(): Promise<string>;
declare function openInvoice(url: string): Promise<'paid' | 'cancelled' | 'failed' | 'pending'>;
declare function scanQr(text?: string): Promise<string>;
declare const biometric: {
    init: () => Promise<void>;
    requestAccess: (reason?: string) => Promise<boolean>;
    authenticate: (reason?: string) => Promise<{
        authenticated: boolean;
        token?: string;
    }>;
};
declare const location: {
    init: () => Promise<void>;
    getLocation: () => Promise<LocationData | null>;
};

/**
 * Returns the raw Telegram WebApp instance.
 * Null on server or outside Telegram.
 */
declare function useTelegramWebApp(): TgWebApp | null;
declare function useTelegramUser(): TgUser | null;
/**
 * Subscribe to any Telegram WebApp event.
 */
declare function useTelegramEvent(eventType: WebAppEventType | string, handler: (...args: unknown[]) => void): void;
/**
 * Automatically shows/hides the Telegram Back Button based on pathname.
 * Pass `onBack` to override default browser history back behavior.
 */
declare function useTelegramBackButton(options?: {
    pathname?: string;
    onBack?: () => void;
    hideOnRoot?: boolean;
}): void;
/**
 * Control the Telegram Main Button declaratively.
 */
declare function useTelegramMainButton(options: {
    text: string;
    onClick: () => void;
    isVisible?: boolean;
    isActive?: boolean;
    color?: string;
    textColor?: string;
    hasShineEffect?: boolean;
    showProgress?: boolean;
}): void;
declare function useTelegramSecondaryButton(options: {
    text: string;
    onClick: () => void;
    isVisible?: boolean;
    isActive?: boolean;
    position?: 'left' | 'right' | 'top' | 'bottom';
    color?: string;
    textColor?: string;
}): void;
declare function useTelegramSettingsButton(onSettings: () => void): void;
declare function useHapticFeedback(): {
    impact: (style?: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
    notification: (type: "error" | "success" | "warning") => void;
    selectionChanged: () => void;
};
declare function useTelegramTheme(): {
    colorScheme: "light" | "dark";
    themeParams: TgThemeParams;
    isDark: boolean;
};
declare function useTelegramViewport(): {
    expand: () => void | undefined;
    height: number;
    stableHeight: number;
    isExpanded: boolean;
};
declare function useTelegramFullscreen(): {
    isFullscreen: boolean;
    error: {
        error: string;
    } | null;
    enter: () => void;
    exit: () => void;
    toggle: () => void;
};
declare function useSafeArea(): {
    safeArea: SafeAreaInset;
    contentSafeArea: SafeAreaInset;
};
declare function useCloudStorage(): {
    setItem: (key: string, value: string) => Promise<boolean>;
    getItem: (key: string) => Promise<string>;
    getItems: (keys: string[]) => Promise<Record<string, string>>;
    removeItem: (key: string) => Promise<boolean>;
    getKeys: () => Promise<string[]>;
};
declare function useAccelerometer(options?: {
    refreshRate?: number;
    autoStart?: boolean;
}): {
    isStarted: boolean;
    start: () => void;
    stop: () => void;
    x: number;
    y: number;
    z: number;
};
declare function useGyroscope(options?: {
    refreshRate?: number;
    autoStart?: boolean;
}): {
    isStarted: boolean;
    start: () => void;
    stop: () => void;
    x: number;
    y: number;
    z: number;
};
declare function useDeviceOrientation(options?: {
    refreshRate?: number;
    needAbsolute?: boolean;
    autoStart?: boolean;
}): {
    isStarted: boolean;
    start: () => void;
    stop: () => void;
    alpha: number;
    beta: number;
    gamma: number;
    absolute: boolean;
};
declare function useBiometric(): {
    isInited: boolean;
    isAvailable: boolean;
    biometricType: "finger" | "face" | "unknown";
    init: () => Promise<void>;
    requestAccess: (reason?: string) => Promise<boolean>;
    authenticate: (reason?: string) => Promise<{
        authenticated: boolean;
        token?: string;
    }>;
};
declare function useLocation(): {
    isAvailable: boolean;
    isGranted: boolean;
    init: () => Promise<void>;
    getLocation: () => Promise<LocationData | null>;
    openSettings: () => void;
};
declare function useHomeScreen(): {
    addToHomeScreen: () => void;
    checkStatus: () => Promise<"unsupported" | "unknown" | "added" | "missed">;
};
declare function useIsActive(): boolean;
declare function useTelegramStartParam(): string | null;

interface TelegramContextValue {
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
interface TelegramProviderOptions {
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
declare function useTelegram(): TelegramContextValue;
declare function TelegramProvider({ children, options, }: {
    children: ReactNode;
    options?: TelegramProviderOptions;
}): react.JSX.Element;

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
declare function useFullscreen(): FullscreenContextValue;
interface FullscreenProviderOptions {
    /** localStorage key to persist user preference */
    storageKey?: string;
    /** Auto-restore fullscreen preference on mount */
    persistPreference?: boolean;
}
declare function FullscreenProvider({ children, options, }: {
    children: ReactNode;
    options?: FullscreenProviderOptions;
}): react.JSX.Element;

export { type Accelerometer, type BackButton, type BiometricAuthenticateParams, type BiometricManager, type BiometricRequestAccessParams, type BottomButton, type BottomButtonParams, type ChatAdministratorRights, type CloudStorage, type DeviceOrientation, type DownloadFileParams, type EmojiStatusParams, FullscreenProvider, type FullscreenProviderOptions, type Gyroscope, type HapticFeedback, type Language, type LocationData, type LocationManager, type MainButton, type PopupButton, type PopupParams, RTL_LANGS, type RequestChatParams, SUPPORTED_LANGS, type SafeAreaInset, type ScanQrPopupParams, type SecondaryButton, type SettingsButton, type StoryShareParams, type TelegramContextValue, TelegramProvider, type TelegramProviderOptions, type TgThemeParams, type TgUser, type TgWebApp, type WebAppEventType, biometric, cloudStorage, dialog, getRawUserData, getUserAvatarUrl, getUserDisplayName, getUserIdentifier, getUserInfoWithAvatar, getWebApp, haptic, isInTelegram, isRtlLang, isVersionAtLeast, location, openExternalLink, openInvoice, openTelegramLink, readClipboard, scanQr, tgLangToTmdb, tgLangToUi, useAccelerometer, useBiometric, useCloudStorage, useDeviceOrientation, useFullscreen, useGyroscope, useHapticFeedback, useHomeScreen, useIsActive, useLocation, useSafeArea, useTelegram, useTelegramBackButton, useTelegramEvent, useTelegramFullscreen, useTelegramMainButton, useTelegramSecondaryButton, useTelegramSettingsButton, useTelegramStartParam, useTelegramTheme, useTelegramUser, useTelegramViewport, useTelegramWebApp };
