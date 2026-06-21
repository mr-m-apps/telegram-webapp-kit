export interface TgUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

export interface TgWebAppChat {
  id: number;
  type: 'group' | 'supergroup' | 'channel';
  title: string;
  username?: string;
  photo_url?: string;
}

export interface WebAppInitData {
  query_id?: string;
  user?: TgUser;
  receiver?: TgUser;
  chat?: TgWebAppChat;
  chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
  chat_instance?: string;
  start_param?: string;
  can_send_after?: number;
  auth_date: number;
  hash: string;
  signature?: string;
}

export interface TgThemeParams {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
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

export interface SafeAreaInset {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface ContentSafeAreaInset {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

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

export interface BottomButtonParams {
  icon_custom_emoji_id?: string;
  text?: string;
  color?: string;
  text_color?: string;
  has_shine_effect?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  is_active?: boolean;
  is_visible?: boolean;
}

export interface BottomButton {
  readonly type: 'main' | 'secondary';
  icon_custom_emoji_id?: string;
  text: string;
  color: string;
  text_color: string;
  is_visible: boolean;
  is_active: boolean;
  has_shine_effect: boolean;
  readonly is_progress_visible: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  setText(text: string): BottomButton;
  setParams(params: BottomButtonParams): BottomButton;
  show(): BottomButton;
  hide(): BottomButton;
  enable(): BottomButton;
  disable(): BottomButton;
  show_progress(leave_active?: boolean): BottomButton;
  hide_progress(): BottomButton;
  onClick(callback: () => void): BottomButton;
  offClick(callback: () => void): BottomButton;
}

export type MainButton = BottomButton;
export type SecondaryButton = BottomButton;

export interface BackButton {
  is_visible: boolean;
  show(): BackButton;
  hide(): BackButton;
  onClick(callback: () => void): BackButton;
  offClick(callback: () => void): BackButton;
}

export interface SettingsButton {
  is_visible: boolean;
  show(): SettingsButton;
  hide(): SettingsButton;
  onClick(callback: () => void): SettingsButton;
  offClick(callback: () => void): SettingsButton;
}

export interface HapticFeedback {
  impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): HapticFeedback;
  notificationOccurred(type: 'error' | 'success' | 'warning'): HapticFeedback;
  selectionChanged(): HapticFeedback;
}

export interface CloudStorage {
  setItem(key: string, value: string, callback?: (error: Error | null, success: boolean) => void): CloudStorage;
  getItem(key: string, callback: (error: Error | null, value: string) => void): CloudStorage;
  getItems(keys: string[], callback: (error: Error | null, values: Record<string, string>) => void): CloudStorage;
  removeItem(key: string, callback?: (error: Error | null, success: boolean) => void): CloudStorage;
  removeItems(keys: string[], callback?: (error: Error | null, success: boolean) => void): CloudStorage;
  getKeys(callback: (error: Error | null, keys: string[]) => void): CloudStorage;
}

export interface DeviceStorage {
  setItem(key: string, value: string, callback?: (error: Error | null, success: boolean) => void): DeviceStorage;
  getItem(key: string, callback: (error: Error | null, value: string) => void): DeviceStorage;
  removeItem(key: string, callback?: (error: Error | null, success: boolean) => void): DeviceStorage;
  clear(callback?: (error: Error | null, success: boolean) => void): DeviceStorage;
}

export interface SecureStorage {
  setItem(key: string, value: string, callback?: (error: Error | null, success: boolean) => void): SecureStorage;
  getItem(key: string, callback: (error: Error | null, value: string | null, can_restore: boolean) => void): SecureStorage;
  removeItem(key: string, callback?: (error: Error | null, success: boolean) => void): SecureStorage;
  clear(callback?: (error: Error | null, success: boolean) => void): SecureStorage;
  restoreItem(key: string, callback?: (error: Error | null, value: string) => void): SecureStorage;
}

export interface AccelerometerStartParams {
  refresh_rate?: number;
}

export interface Accelerometer {
  is_started: boolean;
  x: number;
  y: number;
  z: number;
  start(params?: AccelerometerStartParams, callback?: (started: boolean) => void): Accelerometer;
  stop(callback?: (stopped: boolean) => void): Accelerometer;
}

export interface DeviceOrientationStartParams {
  refresh_rate?: number;
  need_absolute?: boolean;
}

export interface DeviceOrientation {
  is_started: boolean;
  absolute: boolean;
  alpha: number;
  beta: number;
  gamma: number;
  start(params?: DeviceOrientationStartParams, callback?: (started: boolean) => void): DeviceOrientation;
  stop(callback?: (stopped: boolean) => void): DeviceOrientation;
}

export interface GyroscopeStartParams {
  refresh_rate?: number;
}

export interface Gyroscope {
  is_started: boolean;
  x: number;
  y: number;
  z: number;
  start(params?: GyroscopeStartParams, callback?: (started: boolean) => void): Gyroscope;
  stop(callback?: (stopped: boolean) => void): Gyroscope;
}

export interface BiometricRequestAccessParams {
  reason?: string;
}

export interface BiometricAuthenticateParams {
  reason?: string;
}

export interface BiometricManager {
  is_inited: boolean;
  is_biometric_available: boolean;
  biometric_type: 'finger' | 'face' | 'unknown';
  is_access_requested: boolean;
  is_access_granted: boolean;
  is_biometric_token_saved: boolean;
  device_id: string;
  init(callback?: () => void): BiometricManager;
  requestAccess(params: BiometricRequestAccessParams, callback?: (granted: boolean) => void): BiometricManager;
  authenticate(params: BiometricAuthenticateParams, callback?: (authenticated: boolean, token?: string) => void): BiometricManager;
  updateBiometricToken(token: string, callback?: (updated: boolean) => void): BiometricManager;
  openSettings(): BiometricManager;
}

export interface LocationManager {
  is_inited: boolean;
  is_location_available: boolean;
  is_access_requested: boolean;
  is_access_granted: boolean;
  init(callback?: () => void): LocationManager;
  getLocation(callback: (locationData: LocationData | null) => void): LocationManager;
  openSettings(): LocationManager;
}

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

export interface StoryWidgetLink {
  url: string;
  name?: string;
}

export interface StoryShareParams {
  text?: string;
  widget_link?: StoryWidgetLink;
}

export interface EmojiStatusParams {
  duration?: number;
}

export interface DownloadFileParams {
  url: string;
  file_name: string;
}

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

export interface TgWebApp {
  initData: string;
  initDataUnsafe: WebAppInitData;
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: TgThemeParams;
  isActive: boolean;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  bottomBarColor: string;
  isClosingConfirmationEnabled: boolean;
  isVerticalSwipesEnabled: boolean;
  isFullscreen: boolean;
  isOrientationLocked: boolean;
  safeAreaInset: SafeAreaInset;
  contentSafeAreaInset: ContentSafeAreaInset;
  MainButton: BottomButton;
  SecondaryButton?: BottomButton;
  BackButton: BackButton;
  SettingsButton?: SettingsButton;
  HapticFeedback: HapticFeedback;
  CloudStorage: CloudStorage;
  DeviceStorage?: DeviceStorage;
  SecureStorage?: SecureStorage;
  Accelerometer?: Accelerometer;
  DeviceOrientation?: DeviceOrientation;
  Gyroscope?: Gyroscope;
  LocationManager?: LocationManager;
  BiometricManager?: BiometricManager;
  isVersionAtLeast(version: string): boolean;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  setBottomBarColor(color: string): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  enableVerticalSwipes(): void;
  disableVerticalSwipes(): void;
  requestFullscreen(): void;
  exitFullscreen(): void;
  lockOrientation(): void;
  unlockOrientation(): void;
  addToHomeScreen(): void;
  checkHomeScreenStatus(callback?: (status: 'unsupported' | 'unknown' | 'added' | 'missed') => void): void;
  ready(): void;
  expand(): void;
  close(): void;
  sendData(data: string): void;
  switchInlineQuery(query: string, choose_chat_types?: Array<'users' | 'bots' | 'groups' | 'channels'>): void;
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  openInvoice(url: string, callback?: (status: 'paid' | 'cancelled' | 'failed' | 'pending') => void): void;
  shareToStory(media_url: string, params?: StoryShareParams): void;
  shareMessage(msg_id: string, callback?: (success: boolean) => void): void;
  setEmojiStatus(custom_emoji_id: string, params?: EmojiStatusParams, callback?: (success: boolean) => void): void;
  requestEmojiStatusAccess(callback?: (granted: boolean) => void): void;
  downloadFile(params: DownloadFileParams, callback?: (accepted: boolean) => void): void;
  hideKeyboard(): void;
  requestChat(req_id: string, callback?: (success: boolean) => void): void;
  showPopup(params: PopupParams, callback?: (button_id: string | null) => void): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (okPressed: boolean) => void): void;
  showScanQrPopup(params: ScanQrPopupParams, callback?: (text: string) => void): void;
  closeScanQrPopup(): void;
  readTextFromClipboard(callback?: (text: string | null) => void): void;
  requestWriteAccess(callback?: (granted: boolean) => void): void;
  requestContact(callback?: (shared: boolean) => void): void;
  onEvent(eventType: string, eventHandler: (...args: any[]) => void): void;
  offEvent(eventType: string, eventHandler: (...args: any[]) => void): void;
}

export type WebAppEventType =
  | 'activated'
  | 'deactivated'
  | 'themeChanged'
  | 'viewportChanged'
  | 'safeAreaChanged'
  | 'contentSafeAreaChanged'
  | 'mainButtonClicked'
  | 'secondaryButtonClicked'
  | 'backButtonClicked'
  | 'settingsButtonClicked'
  | 'invoiceClosed'
  | 'popupClosed'
  | 'qrTextReceived'
  | 'scanQrPopupClosed'
  | 'clipboardTextReceived'
  | 'writeAccessRequested'
  | 'contactRequested'
  | 'biometricManagerUpdated'
  | 'biometricAuthRequested'
  | 'biometricTokenUpdated'
  | 'fullscreenChanged'
  | 'fullscreenFailed'
  | 'homeScreenAdded'
  | 'homeScreenChecked'
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
  | 'locationManagerUpdated'
  | 'locationRequested'
  | 'shareMessageSent'
  | 'shareMessageFailed'
  | 'emojiStatusSet'
  | 'emojiStatusFailed'
  | 'emojiStatusAccessRequested'
  | 'fileDownloadRequested';

declare global {
  interface Window {
    Telegram: {
      WebApp: TgWebApp;
    };
  }
}
