// ─── Telegram User ───────────────────────────────────────────────────────────
export interface TgUser {
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

// ─── Theme ───────────────────────────────────────────────────────────────────
export interface TgThemeParams {
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

// ─── Buttons ─────────────────────────────────────────────────────────────────
export interface BottomButtonParams {
  text?: string;
  color?: string;
  text_color?: string;
  is_visible?: boolean;
  is_active?: boolean;
  hasShineEffect?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export interface BottomButton {
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

export interface MainButton extends BottomButton {
  type: 'main';
}

export interface SecondaryButton extends BottomButton {
  type: 'secondary';
  position: 'left' | 'right' | 'top' | 'bottom';
}

export interface SettingsButton {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  onClick: (cb: () => void) => void;
  offClick: (cb: () => void) => void;
}

export interface BackButton {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  onClick: (cb: () => void) => void;
  offClick: (cb: () => void) => void;
}

// ─── Hardware ─────────────────────────────────────────────────────────────────
export interface HapticFeedback {
  impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
  notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
  selectionChanged: () => void;
}

export interface Accelerometer {
  isStarted: boolean;
  x: number;
  y: number;
  z: number;
  start: (params?: { refresh_rate?: number }, callback?: (error?: Error) => void) => void;
  stop: (callback?: (error?: Error) => void) => void;
}

export interface DeviceOrientation {
  isStarted: boolean;
  absolute: boolean;
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  start: (params?: { refresh_rate?: number; need_absolute?: boolean }, callback?: (error?: Error) => void) => void;
  stop: (callback?: (error?: Error) => void) => void;
}

export interface Gyroscope {
  isStarted: boolean;
  x: number;
  y: number;
  z: number;
  start: (params?: { refresh_rate?: number }, callback?: (error?: Error) => void) => void;
  stop: (callback?: (error?: Error) => void) => void;
}

// ─── Storage ──────────────────────────────────────────────────────────────────
export interface CloudStorage {
  setItem: (key: string, value: string, callback?: (error: Error | null, success: boolean) => void) => void;
  getItem: (key: string, callback: (error: Error | null, value: string) => void) => void;
  getItems: (keys: string[], callback: (error: Error | null, values: Record<string, string>) => void) => void;
  removeItem: (key: string, callback?: (error: Error | null, success: boolean) => void) => void;
  removeItems: (keys: string[], callback?: (error: Error | null, success: boolean) => void) => void;
  getKeys: (callback: (error: Error | null, keys: string[]) => void) => void;
}

// ─── Location ────────────────────────────────────────────────────────────────
export interface LocationData {
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

export interface LocationManager {
  isInited: boolean;
  isLocationAvailable: boolean;
  isAccessRequested: boolean;
  isAccessGranted: boolean;
  init: (callback?: (error?: Error) => void) => void;
  getLocation: (callback: (location: LocationData | null) => void) => void;
  openSettings: () => void;
}

// ─── Biometric ───────────────────────────────────────────────────────────────
export interface BiometricRequestAccessParams {
  reason?: string;
}

export interface BiometricAuthenticateParams {
  reason?: string;
}

export interface BiometricManager {
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

// ─── Contact & Chat ───────────────────────────────────────────────────────────
export interface ChatAdministratorRights {
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

export interface ChatBoostParams {
  slots?: number[];
}

export interface RequestChatParams {
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

// ─── Popups ───────────────────────────────────────────────────────────────────
export interface PopupButton {
  id?: string;
  type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
  text?: string;
}

export interface PopupParams {
  title?: string;
  message: string;
  buttons?: PopupButton[];
}

export interface ScanQrPopupParams {
  text?: string;
}

export interface StoryShareParams {
  text?: string;
  widget_link?: {
    url: string;
    name?: string;
  };
}

export interface EmojiStatusParams {
  duration?: number;
}

export interface DownloadFileParams {
  url: string;
  file_name: string;
}

// ─── Safe Area ────────────────────────────────────────────────────────────────
export interface SafeAreaInset {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

// ─── Web App ──────────────────────────────────────────────────────────────────
export interface TgWebApp {
  // Core data
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

  // Display
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

  // State flags
  isActive?: boolean;
  isFullscreen?: boolean;
  isOrientationLocked?: boolean;
  isClosingConfirmationEnabled: boolean;
  isVerticalSwipesEnabled: boolean;

  // Safe areas
  safeAreaInset?: SafeAreaInset;
  contentSafeAreaInset?: SafeAreaInset;

  // UI Components
  MainButton: MainButton;
  SecondaryButton?: SecondaryButton;
  BackButton: BackButton;
  SettingsButton?: SettingsButton;

  // Hardware & Sensors
  HapticFeedback: HapticFeedback;
  Accelerometer?: Accelerometer;
  DeviceOrientation?: DeviceOrientation;
  Gyroscope?: Gyroscope;

  // Storage
  CloudStorage: CloudStorage;
  DeviceStorage?: CloudStorage;
  SecureStorage?: CloudStorage;

  // Managers
  LocationManager?: LocationManager;
  BiometricManager?: BiometricManager;

  // Lifecycle
  ready: () => void;
  expand: () => void;
  close: () => void;

  // Colors
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setBottomBarColor?: (color: string) => void;

  // Swipes & Closing
  enableVerticalSwipes?: () => void;
  disableVerticalSwipes?: () => void;
  enableClosingConfirmation?: () => void;
  disableClosingConfirmation?: () => void;

  // Fullscreen
  requestFullscreen?: () => void;
  exitFullscreen?: () => void;

  // Communication
  sendData: (data: string) => void;
  switchInlineQuery: (query: string, chooseChatTypes?: Array<'users' | 'bots' | 'groups' | 'channels'>) => void;

  // Navigation
  openLink: (url: string, options?: { try_instant_view?: boolean; try_browser?: boolean }) => void;
  openTelegramLink: (url: string) => void;
  openInvoice: (url: string, callback?: (status: 'paid' | 'cancelled' | 'failed' | 'pending') => void) => void;

  // Sharing
  shareToStory?: (mediaUrl: string, params?: StoryShareParams) => void;
  shareMessage?: (msgId: string, callback?: (success: boolean) => void) => void;

  // Emoji
  setEmojiStatus?: (customEmojiId: string, params?: EmojiStatusParams, callback?: (success: boolean) => void) => void;
  requestEmojiStatusAccess?: (callback?: (granted: boolean) => void) => void;

  // Files
  downloadFile?: (params: DownloadFileParams, callback?: (accepted: boolean) => void) => void;

  // Keyboard
  hideKeyboard?: () => void;

  // Popups & Dialogs
  showPopup: (params: PopupParams, callback?: (buttonId: string) => void) => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
  showScanQrPopup: (params: ScanQrPopupParams, callback?: (text: string) => void) => void;
  closeScanQrPopup: () => void;

  // Clipboard
  readTextFromClipboard?: (callback?: (text: string) => void) => void;

  // Permissions
  requestWriteAccess?: (callback?: (granted: boolean) => void) => void;
  requestContact?: (callback?: (shared: boolean) => void) => void;
  requestChat?: (params: RequestChatParams, callback?: (success: boolean) => void) => void;

  // Home Screen
  addToHomeScreen?: () => void;
  checkHomeScreenStatus?: (callback?: (status: 'unsupported' | 'unknown' | 'added' | 'missed') => void) => void;

  // Boost
  requestWriteAccess2?: (callback?: (granted: boolean) => void) => void;
  shareToStoryV2?: (params: StoryShareParams & { media_url: string }) => void;

  // Events
  onEvent: (eventType: WebAppEventType | string, eventHandler: (...args: unknown[]) => void) => void;
  offEvent: (eventType: WebAppEventType | string, eventHandler: (...args: unknown[]) => void) => void;

  // Version check
  isVersionAtLeast: (version: string) => boolean;
}

// ─── Events ───────────────────────────────────────────────────────────────────
export type WebAppEventType =
  | 'themeChanged'
  | 'mainButtonClicked'
  | 'secondaryButtonClicked'
  | 'backButtonClicked'
  | 'settingsButtonClicked'
  | 'viewportChanged'
  | 'invoiceClosed'
  | 'popupClosed'
  | 'qrTextReceived'
  | 'scanQrPopupClosed'
  | 'clipboardTextReceived'
  | 'writeAccessRequested'
  | 'contactRequested'
  | 'chatBoostAdded'
  | 'activated'
  | 'deactivated'
  | 'safeAreaChanged'
  | 'contentSafeAreaChanged'
  | 'fullscreenChanged'
  | 'fullscreenFailed'
  | 'homeScreenAdded'
  | 'homeScreenChecked'
  | 'emojiStatusSet'
  | 'emojiStatusFailed'
  | 'emojiStatusAccessRequested'
  | 'shareMessageSent'
  | 'shareMessageFailed'
  | 'fileDownloadRequested'
  | 'locationManagerUpdated'
  | 'locationRequested'
  | 'accelerometerStarted'
  | 'accelerometerStopped'
  | 'accelerometerChanged'
  | 'accelerometerFailed'
  | 'deviceOrientationStarted'
  | 'deviceOrientationStopped'
  | 'deviceOrientationChanged'
  | 'deviceOrientationFailed'
  | 'gyroscopeStarted'
  | 'gyroscopeStopped'
  | 'gyroscopeChanged'
  | 'gyroscopeFailed'
  | 'biometricManagerUpdated'
  | 'biometricAuthRequested'
  | 'biometricTokenUpdated';

// ─── Global Declaration ───────────────────────────────────────────────────────
declare global {
  interface Window {
    Telegram?: { WebApp?: TgWebApp };
  }
}
