"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FullscreenProvider: () => FullscreenProvider,
  RTL_LANGS: () => RTL_LANGS,
  SUPPORTED_LANGS: () => SUPPORTED_LANGS,
  TelegramProvider: () => TelegramProvider,
  biometric: () => biometric,
  cloudStorage: () => cloudStorage,
  dialog: () => dialog,
  getRawUserData: () => getRawUserData,
  getUserAvatarUrl: () => getUserAvatarUrl,
  getUserDisplayName: () => getUserDisplayName,
  getUserIdentifier: () => getUserIdentifier,
  getUserInfoWithAvatar: () => getUserInfoWithAvatar,
  getWebApp: () => getWebApp,
  haptic: () => haptic,
  isInTelegram: () => isInTelegram,
  isRtlLang: () => isRtlLang,
  isVersionAtLeast: () => isVersionAtLeast,
  location: () => location,
  openExternalLink: () => openExternalLink,
  openInvoice: () => openInvoice,
  openTelegramLink: () => openTelegramLink,
  readClipboard: () => readClipboard,
  scanQr: () => scanQr,
  tgLangToTmdb: () => tgLangToTmdb,
  tgLangToUi: () => tgLangToUi,
  useAccelerometer: () => useAccelerometer,
  useBiometric: () => useBiometric,
  useCloudStorage: () => useCloudStorage,
  useDeviceOrientation: () => useDeviceOrientation,
  useFullscreen: () => useFullscreen,
  useGyroscope: () => useGyroscope,
  useHapticFeedback: () => useHapticFeedback,
  useHomeScreen: () => useHomeScreen,
  useIsActive: () => useIsActive,
  useLocation: () => useLocation,
  useSafeArea: () => useSafeArea,
  useTelegram: () => useTelegram,
  useTelegramBackButton: () => useTelegramBackButton,
  useTelegramEvent: () => useTelegramEvent,
  useTelegramFullscreen: () => useTelegramFullscreen,
  useTelegramMainButton: () => useTelegramMainButton,
  useTelegramSecondaryButton: () => useTelegramSecondaryButton,
  useTelegramSettingsButton: () => useTelegramSettingsButton,
  useTelegramStartParam: () => useTelegramStartParam,
  useTelegramTheme: () => useTelegramTheme,
  useTelegramUser: () => useTelegramUser,
  useTelegramViewport: () => useTelegramViewport,
  useTelegramWebApp: () => useTelegramWebApp
});
module.exports = __toCommonJS(index_exports);

// src/core/index.ts
function getWebApp() {
  var _a, _b;
  if (typeof window === "undefined") return null;
  return (_b = (_a = window.Telegram) == null ? void 0 : _a.WebApp) != null ? _b : null;
}
function isInTelegram() {
  const wa = getWebApp();
  return Boolean(wa && wa.initData && wa.initData.length > 0);
}
function isVersionAtLeast(version) {
  var _a, _b;
  return (_b = (_a = getWebApp()) == null ? void 0 : _a.isVersionAtLeast(version)) != null ? _b : false;
}
function tgLangToTmdb(code) {
  var _a;
  if (!code) return "en-US";
  const base = code.toLowerCase().split("-")[0];
  const map = {
    en: "en-US",
    ar: "ar-SA",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    pt: "pt-BR",
    ru: "ru-RU",
    zh: "zh-CN",
    ja: "ja-JP",
    ko: "ko-KR",
    tr: "tr-TR",
    hi: "hi-IN",
    id: "id-ID",
    nl: "nl-NL",
    pl: "pl-PL",
    sv: "sv-SE",
    uk: "uk-UA",
    vi: "vi-VN",
    fa: "fa-IR",
    he: "he-IL",
    cs: "cs-CZ",
    da: "da-DK",
    fi: "fi-FI",
    hu: "hu-HU",
    nb: "nb-NO",
    ro: "ro-RO",
    sk: "sk-SK",
    th: "th-TH",
    ms: "ms-MY"
  };
  return (_a = map[base]) != null ? _a : "en-US";
}
function tgLangToUi(code) {
  if (!code) return "en";
  const base = code.toLowerCase().split("-")[0];
  const supported = [
    "en",
    "ar",
    "es",
    "fr",
    "de",
    "it",
    "pt",
    "ru",
    "zh",
    "ja",
    "ko",
    "tr",
    "hi",
    "id",
    "nl",
    "pl",
    "sv",
    "uk",
    "vi",
    "fa",
    "he",
    "cs",
    "da",
    "fi",
    "hu",
    "nb",
    "ro",
    "sk",
    "th",
    "ms"
  ];
  return supported.includes(base) ? base : "en";
}
var RTL_LANGS = /* @__PURE__ */ new Set(["ar", "fa", "he", "ur", "yi", "ug", "ku"]);
function isRtlLang(lang) {
  if (!lang) return false;
  return RTL_LANGS.has(lang.toLowerCase().split("-")[0]);
}
var SUPPORTED_LANGS = [
  { code: "en", countryCode: "us", name: "English", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/us.svg" },
  { code: "ar", countryCode: "sa", name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/sa.svg" },
  { code: "es", countryCode: "es", name: "Espa\xF1ol", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/es.svg" },
  { code: "fr", countryCode: "fr", name: "Fran\xE7ais", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/fr.svg" },
  { code: "de", countryCode: "de", name: "Deutsch", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/de.svg" },
  { code: "it", countryCode: "it", name: "Italiano", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/it.svg" },
  { code: "pt", countryCode: "pt", name: "Portugu\xEAs", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/pt.svg" },
  { code: "ru", countryCode: "ru", name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/ru.svg" },
  { code: "zh", countryCode: "cn", name: "\u4E2D\u6587", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/cn.svg" },
  { code: "ja", countryCode: "jp", name: "\u65E5\u672C\u8A9E", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/jp.svg" },
  { code: "ko", countryCode: "kr", name: "\uD55C\uAD6D\uC5B4", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/kr.svg" },
  { code: "tr", countryCode: "tr", name: "T\xFCrk\xE7e", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/tr.svg" },
  { code: "hi", countryCode: "in", name: "\u0939\u093F\u0928\u094D\u0926\u0940", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/in.svg" },
  { code: "id", countryCode: "id", name: "Indonesia", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/id.svg" },
  { code: "nl", countryCode: "nl", name: "Nederlands", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/nl.svg" },
  { code: "pl", countryCode: "pl", name: "Polski", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/pl.svg" },
  { code: "sv", countryCode: "se", name: "Svenska", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/se.svg" },
  { code: "uk", countryCode: "ua", name: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/ua.svg" },
  { code: "vi", countryCode: "vn", name: "Ti\u1EBFng Vi\u1EC7t", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/vn.svg" },
  { code: "fa", countryCode: "ir", name: "\u0641\u0627\u0631\u0633\u06CC", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/ir.svg" },
  { code: "he", countryCode: "il", name: "\u05E2\u05D1\u05E8\u05D9\u05EA", flag: "https://raw.githubusercontent.com/mr-m-apps/icons/refs/heads/main/flags/il.svg" }
];
function openExternalLink(url, tryInstantView = false) {
  const wa = getWebApp();
  if (wa == null ? void 0 : wa.openLink) {
    wa.openLink(url, { try_instant_view: tryInstantView });
  } else if (typeof window !== "undefined") {
    window.open(url, "_blank");
  }
}
function openTelegramLink(url) {
  const wa = getWebApp();
  if (wa == null ? void 0 : wa.openTelegramLink) {
    wa.openTelegramLink(url);
  } else if (typeof window !== "undefined") {
    window.open(url, "_blank");
  }
}
function getUserAvatarUrl(user, defaultAvatarUrl = "https://via.placeholder.com/100x100?text=No+Avatar") {
  var _a, _b;
  if (user == null ? void 0 : user.photo_url) return user.photo_url;
  if (user == null ? void 0 : user.id) {
    const firstName = (_a = user == null ? void 0 : user.first_name) != null ? _a : "";
    const lastName = (_b = user == null ? void 0 : user.last_name) != null ? _b : "";
    const name = `${firstName} ${lastName}`.trim() || (user == null ? void 0 : user.username) || `user_${user.id}`;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=100&length=2&rounded=true&bold=true`;
  }
  return defaultAvatarUrl;
}
function getUserIdentifier(user) {
  if (user == null ? void 0 : user.username) return user.username;
  if (user == null ? void 0 : user.id) return user.id.toString();
  return "unknown_user";
}
function getUserDisplayName(user) {
  var _a, _b;
  if (!user) return "User";
  const fullName = `${(_a = user.first_name) != null ? _a : ""} ${(_b = user.last_name) != null ? _b : ""}`.trim();
  if (fullName) return fullName;
  if (user.username) return `@${user.username}`;
  return `User_${user.id}`;
}
function getUserInfoWithAvatar() {
  var _a;
  const wa = getWebApp();
  const user = (_a = wa == null ? void 0 : wa.initDataUnsafe) == null ? void 0 : _a.user;
  return {
    user,
    avatarUrl: getUserAvatarUrl(user),
    displayName: getUserDisplayName(user),
    identifier: getUserIdentifier(user)
  };
}
function getRawUserData() {
  var _a, _b;
  const wa = getWebApp();
  return (_b = (_a = wa == null ? void 0 : wa.initDataUnsafe) == null ? void 0 : _a.user) != null ? _b : null;
}
var haptic = {
  light: () => {
    var _a, _b;
    return (_b = (_a = getWebApp()) == null ? void 0 : _a.HapticFeedback) == null ? void 0 : _b.impactOccurred("light");
  },
  medium: () => {
    var _a, _b;
    return (_b = (_a = getWebApp()) == null ? void 0 : _a.HapticFeedback) == null ? void 0 : _b.impactOccurred("medium");
  },
  heavy: () => {
    var _a, _b;
    return (_b = (_a = getWebApp()) == null ? void 0 : _a.HapticFeedback) == null ? void 0 : _b.impactOccurred("heavy");
  },
  rigid: () => {
    var _a, _b;
    return (_b = (_a = getWebApp()) == null ? void 0 : _a.HapticFeedback) == null ? void 0 : _b.impactOccurred("rigid");
  },
  soft: () => {
    var _a, _b;
    return (_b = (_a = getWebApp()) == null ? void 0 : _a.HapticFeedback) == null ? void 0 : _b.impactOccurred("soft");
  },
  success: () => {
    var _a, _b;
    return (_b = (_a = getWebApp()) == null ? void 0 : _a.HapticFeedback) == null ? void 0 : _b.notificationOccurred("success");
  },
  error: () => {
    var _a, _b;
    return (_b = (_a = getWebApp()) == null ? void 0 : _a.HapticFeedback) == null ? void 0 : _b.notificationOccurred("error");
  },
  warning: () => {
    var _a, _b;
    return (_b = (_a = getWebApp()) == null ? void 0 : _a.HapticFeedback) == null ? void 0 : _b.notificationOccurred("warning");
  },
  selection: () => {
    var _a, _b;
    return (_b = (_a = getWebApp()) == null ? void 0 : _a.HapticFeedback) == null ? void 0 : _b.selectionChanged();
  }
};
var cloudStorage = {
  setItem: (key, value) => new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.CloudStorage)) return reject(new Error("CloudStorage not available"));
    wa.CloudStorage.setItem(key, value, (err, success) => {
      if (err) reject(err);
      else resolve(success);
    });
  }),
  getItem: (key) => new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.CloudStorage)) return reject(new Error("CloudStorage not available"));
    wa.CloudStorage.getItem(key, (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  }),
  getItems: (keys) => new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.CloudStorage)) return reject(new Error("CloudStorage not available"));
    wa.CloudStorage.getItems(keys, (err, values) => {
      if (err) reject(err);
      else resolve(values);
    });
  }),
  removeItem: (key) => new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.CloudStorage)) return reject(new Error("CloudStorage not available"));
    wa.CloudStorage.removeItem(key, (err, success) => {
      if (err) reject(err);
      else resolve(success);
    });
  }),
  getKeys: () => new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.CloudStorage)) return reject(new Error("CloudStorage not available"));
    wa.CloudStorage.getKeys((err, keys) => {
      if (err) reject(err);
      else resolve(keys);
    });
  })
};
var dialog = {
  alert: (message) => new Promise((resolve) => {
    const wa = getWebApp();
    if (!wa) {
      alert(message);
      resolve();
      return;
    }
    wa.showAlert(message, resolve);
  }),
  confirm: (message) => new Promise((resolve) => {
    const wa = getWebApp();
    if (!wa) {
      resolve(window.confirm(message));
      return;
    }
    wa.showConfirm(message, resolve);
  }),
  popup: (params) => new Promise((resolve) => {
    const wa = getWebApp();
    if (!wa) {
      resolve("");
      return;
    }
    wa.showPopup(params, resolve);
  })
};
function readClipboard() {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.readTextFromClipboard)) return reject(new Error("readTextFromClipboard not supported"));
    wa.readTextFromClipboard((text) => resolve(text != null ? text : ""));
  });
}
function openInvoice(url) {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!wa) return reject(new Error("WebApp not available"));
    wa.openInvoice(url, (status) => resolve(status));
  });
}
function scanQr(text) {
  return new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!wa) return reject(new Error("WebApp not available"));
    wa.showScanQrPopup({ text }, (result) => {
      wa.closeScanQrPopup();
      resolve(result);
    });
  });
}
var biometric = {
  init: () => new Promise((resolve, reject) => {
    var _a;
    const bio = (_a = getWebApp()) == null ? void 0 : _a.BiometricManager;
    if (!bio) return reject(new Error("BiometricManager not available"));
    bio.init(resolve);
  }),
  requestAccess: (reason) => new Promise((resolve, reject) => {
    var _a;
    const bio = (_a = getWebApp()) == null ? void 0 : _a.BiometricManager;
    if (!bio) return reject(new Error("BiometricManager not available"));
    bio.requestAccess({ reason }, resolve);
  }),
  authenticate: (reason) => new Promise((resolve, reject) => {
    var _a;
    const bio = (_a = getWebApp()) == null ? void 0 : _a.BiometricManager;
    if (!bio) return reject(new Error("BiometricManager not available"));
    bio.authenticate({ reason }, (authenticated, token) => resolve({ authenticated, token }));
  })
};
var location = {
  init: () => new Promise((resolve, reject) => {
    var _a;
    const loc = (_a = getWebApp()) == null ? void 0 : _a.LocationManager;
    if (!loc) return reject(new Error("LocationManager not available"));
    loc.init((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  }),
  getLocation: () => new Promise((resolve, reject) => {
    var _a;
    const loc = (_a = getWebApp()) == null ? void 0 : _a.LocationManager;
    if (!loc) return reject(new Error("LocationManager not available"));
    loc.getLocation((location2, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(location2);
      }
    });
  })
};

// src/hooks/index.ts
var import_react = require("react");
function useTelegramWebApp() {
  const [wa, setWa] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    setWa(getWebApp());
  }, []);
  return wa;
}
function useTelegramUser() {
  var _a, _b, _c;
  return (_c = (_b = (_a = getWebApp()) == null ? void 0 : _a.initDataUnsafe) == null ? void 0 : _b.user) != null ? _c : null;
}
function useTelegramEvent(eventType, handler) {
  const handlerRef = (0, import_react.useRef)(handler);
  handlerRef.current = handler;
  (0, import_react.useEffect)(() => {
    const wa = getWebApp();
    if (!wa) return;
    const cb = (...args) => handlerRef.current(...args);
    wa.onEvent(eventType, cb);
    return () => wa.offEvent(eventType, cb);
  }, [eventType]);
}
function useTelegramBackButton(options) {
  const { pathname = "/", onBack, hideOnRoot = true } = options != null ? options : {};
  (0, import_react.useEffect)(() => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.BackButton)) return;
    const handleBack = onBack != null ? onBack : (() => {
      if (typeof window !== "undefined" && window.history.length > 1) {
        window.history.back();
      } else {
        wa.close();
      }
    });
    wa.onEvent("backButtonClicked", handleBack);
    if (hideOnRoot && pathname === "/") {
      wa.BackButton.hide();
    } else {
      wa.BackButton.show();
    }
    return () => {
      var _a;
      wa.offEvent("backButtonClicked", handleBack);
      (_a = wa.BackButton) == null ? void 0 : _a.hide();
    };
  }, [pathname, onBack, hideOnRoot]);
}
function useTelegramMainButton(options) {
  const { text, onClick, isVisible = true, isActive = true, color, textColor, hasShineEffect, showProgress } = options;
  const onClickRef = (0, import_react.useRef)(onClick);
  onClickRef.current = onClick;
  (0, import_react.useEffect)(() => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.MainButton)) return;
    const cb = () => onClickRef.current();
    wa.MainButton.onClick(cb);
    wa.MainButton.setParams(__spreadValues(__spreadValues(__spreadValues({
      text,
      is_visible: isVisible,
      is_active: isActive
    }, color && { color }), textColor && { text_color: textColor }), hasShineEffect !== void 0 && { hasShineEffect }));
    if (showProgress) wa.MainButton.showProgress();
    else wa.MainButton.hideProgress();
    return () => wa.MainButton.offClick(cb);
  }, [text, isVisible, isActive, color, textColor, hasShineEffect, showProgress]);
}
function useTelegramSecondaryButton(options) {
  const { text, onClick, isVisible = true, isActive = true, position, color, textColor } = options;
  const onClickRef = (0, import_react.useRef)(onClick);
  onClickRef.current = onClick;
  (0, import_react.useEffect)(() => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.SecondaryButton)) return;
    const cb = () => onClickRef.current();
    wa.SecondaryButton.onClick(cb);
    wa.SecondaryButton.setParams(__spreadValues(__spreadValues(__spreadValues({
      text,
      is_visible: isVisible,
      is_active: isActive
    }, position && { position }), color && { color }), textColor && { text_color: textColor }));
    return () => {
      var _a;
      return (_a = wa.SecondaryButton) == null ? void 0 : _a.offClick(cb);
    };
  }, [text, isVisible, isActive, position, color, textColor]);
}
function useTelegramSettingsButton(onSettings) {
  const onSettingsRef = (0, import_react.useRef)(onSettings);
  onSettingsRef.current = onSettings;
  (0, import_react.useEffect)(() => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.SettingsButton)) return;
    const cb = () => onSettingsRef.current();
    wa.SettingsButton.show();
    wa.onEvent("settingsButtonClicked", cb);
    return () => {
      var _a;
      wa.offEvent("settingsButtonClicked", cb);
      (_a = wa.SettingsButton) == null ? void 0 : _a.hide();
    };
  }, []);
}
function useHapticFeedback() {
  return {
    impact: (0, import_react.useCallback)((style = "medium") => {
      var _a, _b;
      (_b = (_a = getWebApp()) == null ? void 0 : _a.HapticFeedback) == null ? void 0 : _b.impactOccurred(style);
    }, []),
    notification: (0, import_react.useCallback)((type) => {
      var _a, _b;
      (_b = (_a = getWebApp()) == null ? void 0 : _a.HapticFeedback) == null ? void 0 : _b.notificationOccurred(type);
    }, []),
    selectionChanged: (0, import_react.useCallback)(() => {
      var _a, _b;
      (_b = (_a = getWebApp()) == null ? void 0 : _a.HapticFeedback) == null ? void 0 : _b.selectionChanged();
    }, [])
  };
}
function useTelegramTheme() {
  const [colorScheme, setColorScheme] = (0, import_react.useState)(
    () => {
      var _a, _b;
      return (_b = (_a = getWebApp()) == null ? void 0 : _a.colorScheme) != null ? _b : "dark";
    }
  );
  const [themeParams, setThemeParams] = (0, import_react.useState)(
    () => {
      var _a, _b;
      return (_b = (_a = getWebApp()) == null ? void 0 : _a.themeParams) != null ? _b : {};
    }
  );
  useTelegramEvent("themeChanged", () => {
    const wa = getWebApp();
    if (!wa) return;
    setColorScheme(wa.colorScheme);
    setThemeParams(wa.themeParams);
  });
  return { colorScheme, themeParams, isDark: colorScheme === "dark" };
}
function useTelegramViewport() {
  const [viewport, setViewport] = (0, import_react.useState)(() => {
    var _a, _b, _c, _d, _e, _f;
    return {
      height: (_b = (_a = getWebApp()) == null ? void 0 : _a.viewportHeight) != null ? _b : 0,
      stableHeight: (_d = (_c = getWebApp()) == null ? void 0 : _c.viewportStableHeight) != null ? _d : 0,
      isExpanded: (_f = (_e = getWebApp()) == null ? void 0 : _e.isExpanded) != null ? _f : false
    };
  });
  useTelegramEvent("viewportChanged", () => {
    const wa = getWebApp();
    if (!wa) return;
    setViewport({
      height: wa.viewportHeight,
      stableHeight: wa.viewportStableHeight,
      isExpanded: wa.isExpanded
    });
  });
  const expand = (0, import_react.useCallback)(() => {
    var _a;
    return (_a = getWebApp()) == null ? void 0 : _a.expand();
  }, []);
  return __spreadProps(__spreadValues({}, viewport), { expand });
}
function useTelegramFullscreen() {
  const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(
    () => {
      var _a;
      return Boolean((_a = getWebApp()) == null ? void 0 : _a.isFullscreen);
    }
  );
  const [error, setError] = (0, import_react.useState)(null);
  useTelegramEvent("fullscreenChanged", () => {
    var _a;
    setIsFullscreen(Boolean((_a = getWebApp()) == null ? void 0 : _a.isFullscreen));
  });
  useTelegramEvent("fullscreenFailed", (...args) => {
    const err = args[0];
    if (err && typeof err === "object" && "error" in err) {
      setError(err);
    }
  });
  const enter = (0, import_react.useCallback)(() => {
    var _a, _b;
    setError(null);
    (_b = (_a = getWebApp()) == null ? void 0 : _a.requestFullscreen) == null ? void 0 : _b.call(_a);
  }, []);
  const exit = (0, import_react.useCallback)(() => {
    var _a, _b;
    (_b = (_a = getWebApp()) == null ? void 0 : _a.exitFullscreen) == null ? void 0 : _b.call(_a);
  }, []);
  const toggle = (0, import_react.useCallback)(() => {
    if (isFullscreen) exit();
    else enter();
  }, [isFullscreen, enter, exit]);
  return { isFullscreen, error, enter, exit, toggle };
}
function useSafeArea() {
  const [safeArea, setSafeArea] = (0, import_react.useState)(
    () => {
      var _a, _b;
      return (_b = (_a = getWebApp()) == null ? void 0 : _a.safeAreaInset) != null ? _b : { top: 0, bottom: 0, left: 0, right: 0 };
    }
  );
  const [contentSafeArea, setContentSafeArea] = (0, import_react.useState)(
    () => {
      var _a, _b;
      return (_b = (_a = getWebApp()) == null ? void 0 : _a.contentSafeAreaInset) != null ? _b : { top: 0, bottom: 0, left: 0, right: 0 };
    }
  );
  useTelegramEvent("safeAreaChanged", () => {
    var _a;
    const inset = (_a = getWebApp()) == null ? void 0 : _a.safeAreaInset;
    if (inset) setSafeArea(inset);
  });
  useTelegramEvent("contentSafeAreaChanged", () => {
    var _a;
    const inset = (_a = getWebApp()) == null ? void 0 : _a.contentSafeAreaInset;
    if (inset) setContentSafeArea(inset);
  });
  return { safeArea, contentSafeArea };
}
function useCloudStorage() {
  const setItem = (0, import_react.useCallback)((key, value) => new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.CloudStorage)) return reject(new Error("CloudStorage not available"));
    wa.CloudStorage.setItem(key, value, (err, success) => {
      if (err) reject(err);
      else resolve(success);
    });
  }), []);
  const getItem = (0, import_react.useCallback)((key) => new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.CloudStorage)) return reject(new Error("CloudStorage not available"));
    wa.CloudStorage.getItem(key, (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  }), []);
  const getItems = (0, import_react.useCallback)((keys) => new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.CloudStorage)) return reject(new Error("CloudStorage not available"));
    wa.CloudStorage.getItems(keys, (err, values) => {
      if (err) reject(err);
      else resolve(values);
    });
  }), []);
  const removeItem = (0, import_react.useCallback)((key) => new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.CloudStorage)) return reject(new Error("CloudStorage not available"));
    wa.CloudStorage.removeItem(key, (err, success) => {
      if (err) reject(err);
      else resolve(success);
    });
  }), []);
  const getKeys = (0, import_react.useCallback)(() => new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.CloudStorage)) return reject(new Error("CloudStorage not available"));
    wa.CloudStorage.getKeys((err, keys) => {
      if (err) reject(err);
      else resolve(keys);
    });
  }), []);
  return { setItem, getItem, getItems, removeItem, getKeys };
}
function useAccelerometer(options) {
  const { refreshRate = 100, autoStart = false } = options != null ? options : {};
  const [data, setData] = (0, import_react.useState)({ x: 0, y: 0, z: 0 });
  const [isStarted, setIsStarted] = (0, import_react.useState)(false);
  useTelegramEvent("accelerometerChanged", () => {
    var _a;
    const acc = (_a = getWebApp()) == null ? void 0 : _a.Accelerometer;
    if (acc) setData({ x: acc.x, y: acc.y, z: acc.z });
  });
  useTelegramEvent("accelerometerStarted", () => setIsStarted(true));
  useTelegramEvent("accelerometerStopped", () => setIsStarted(false));
  const start = (0, import_react.useCallback)(() => {
    var _a, _b;
    (_b = (_a = getWebApp()) == null ? void 0 : _a.Accelerometer) == null ? void 0 : _b.start({ refresh_rate: refreshRate });
  }, [refreshRate]);
  const stop = (0, import_react.useCallback)(() => {
    var _a, _b;
    (_b = (_a = getWebApp()) == null ? void 0 : _a.Accelerometer) == null ? void 0 : _b.stop();
  }, []);
  (0, import_react.useEffect)(() => {
    if (autoStart) start();
    return () => {
      if (autoStart) stop();
    };
  }, [autoStart, start, stop]);
  return __spreadProps(__spreadValues({}, data), { isStarted, start, stop });
}
function useGyroscope(options) {
  const { refreshRate = 100, autoStart = false } = options != null ? options : {};
  const [data, setData] = (0, import_react.useState)({ x: 0, y: 0, z: 0 });
  const [isStarted, setIsStarted] = (0, import_react.useState)(false);
  useTelegramEvent("gyroscopeChanged", () => {
    var _a;
    const gyro = (_a = getWebApp()) == null ? void 0 : _a.Gyroscope;
    if (gyro) setData({ x: gyro.x, y: gyro.y, z: gyro.z });
  });
  useTelegramEvent("gyroscopeStarted", () => setIsStarted(true));
  useTelegramEvent("gyroscopeStopped", () => setIsStarted(false));
  const start = (0, import_react.useCallback)(() => {
    var _a, _b;
    (_b = (_a = getWebApp()) == null ? void 0 : _a.Gyroscope) == null ? void 0 : _b.start({ refresh_rate: refreshRate });
  }, [refreshRate]);
  const stop = (0, import_react.useCallback)(() => {
    var _a, _b;
    (_b = (_a = getWebApp()) == null ? void 0 : _a.Gyroscope) == null ? void 0 : _b.stop();
  }, []);
  (0, import_react.useEffect)(() => {
    if (autoStart) start();
    return () => {
      if (autoStart) stop();
    };
  }, [autoStart, start, stop]);
  return __spreadProps(__spreadValues({}, data), { isStarted, start, stop });
}
function useDeviceOrientation(options) {
  const { refreshRate = 100, needAbsolute = false, autoStart = false } = options != null ? options : {};
  const [data, setData] = (0, import_react.useState)({ alpha: 0, beta: 0, gamma: 0, absolute: false });
  const [isStarted, setIsStarted] = (0, import_react.useState)(false);
  useTelegramEvent("deviceOrientationChanged", () => {
    var _a, _b, _c, _d;
    const ori = (_a = getWebApp()) == null ? void 0 : _a.DeviceOrientation;
    if (ori) setData({
      alpha: (_b = ori.alpha) != null ? _b : 0,
      beta: (_c = ori.beta) != null ? _c : 0,
      gamma: (_d = ori.gamma) != null ? _d : 0,
      absolute: ori.absolute
    });
  });
  useTelegramEvent("deviceOrientationStarted", () => setIsStarted(true));
  useTelegramEvent("deviceOrientationStopped", () => setIsStarted(false));
  const start = (0, import_react.useCallback)(() => {
    var _a, _b;
    (_b = (_a = getWebApp()) == null ? void 0 : _a.DeviceOrientation) == null ? void 0 : _b.start({ refresh_rate: refreshRate, need_absolute: needAbsolute });
  }, [refreshRate, needAbsolute]);
  const stop = (0, import_react.useCallback)(() => {
    var _a, _b;
    (_b = (_a = getWebApp()) == null ? void 0 : _a.DeviceOrientation) == null ? void 0 : _b.stop();
  }, []);
  (0, import_react.useEffect)(() => {
    if (autoStart) start();
    return () => {
      if (autoStart) stop();
    };
  }, [autoStart, start, stop]);
  return __spreadProps(__spreadValues({}, data), { isStarted, start, stop });
}
function useBiometric() {
  const [isInited, setIsInited] = (0, import_react.useState)(false);
  const [isAvailable, setIsAvailable] = (0, import_react.useState)(false);
  const [biometricType, setBiometricType] = (0, import_react.useState)("unknown");
  useTelegramEvent("biometricManagerUpdated", () => {
    var _a;
    const bio = (_a = getWebApp()) == null ? void 0 : _a.BiometricManager;
    if (!bio) return;
    setIsInited(bio.isInited);
    setIsAvailable(bio.isBiometricAvailable);
    setBiometricType(bio.biometricType);
  });
  const init = (0, import_react.useCallback)(() => new Promise((resolve, reject) => {
    var _a;
    const bio = (_a = getWebApp()) == null ? void 0 : _a.BiometricManager;
    if (!bio) return reject(new Error("BiometricManager not available"));
    bio.init(() => {
      setIsInited(true);
      setIsAvailable(bio.isBiometricAvailable);
      setBiometricType(bio.biometricType);
      resolve();
    });
  }), []);
  const requestAccess = (0, import_react.useCallback)((reason) => new Promise((resolve, reject) => {
    var _a;
    const bio = (_a = getWebApp()) == null ? void 0 : _a.BiometricManager;
    if (!bio) return reject(new Error("BiometricManager not available"));
    bio.requestAccess({ reason }, resolve);
  }), []);
  const authenticate = (0, import_react.useCallback)((reason) => new Promise((resolve, reject) => {
    var _a;
    const bio = (_a = getWebApp()) == null ? void 0 : _a.BiometricManager;
    if (!bio) return reject(new Error("BiometricManager not available"));
    bio.authenticate({ reason }, (authenticated, token) => resolve({ authenticated, token }));
  }), []);
  return { isInited, isAvailable, biometricType, init, requestAccess, authenticate };
}
function useLocation() {
  const [isAvailable, setIsAvailable] = (0, import_react.useState)(false);
  const [isGranted, setIsGranted] = (0, import_react.useState)(false);
  useTelegramEvent("locationManagerUpdated", () => {
    var _a;
    const loc = (_a = getWebApp()) == null ? void 0 : _a.LocationManager;
    if (!loc) return;
    setIsAvailable(loc.isLocationAvailable);
    setIsGranted(loc.isAccessGranted);
  });
  const init = (0, import_react.useCallback)(() => new Promise((resolve, reject) => {
    var _a;
    const loc = (_a = getWebApp()) == null ? void 0 : _a.LocationManager;
    if (!loc) return reject(new Error("LocationManager not available"));
    loc.init((err) => {
      if (err) reject(err);
      else {
        setIsAvailable(loc.isLocationAvailable);
        setIsGranted(loc.isAccessGranted);
        resolve();
      }
    });
  }), []);
  const getLocation = (0, import_react.useCallback)(() => new Promise((resolve, reject) => {
    var _a;
    const loc = (_a = getWebApp()) == null ? void 0 : _a.LocationManager;
    if (!loc) return reject(new Error("LocationManager not available"));
    loc.getLocation(resolve);
  }), []);
  const openSettings = (0, import_react.useCallback)(() => {
    var _a, _b;
    (_b = (_a = getWebApp()) == null ? void 0 : _a.LocationManager) == null ? void 0 : _b.openSettings();
  }, []);
  return { isAvailable, isGranted, init, getLocation, openSettings };
}
function useHomeScreen() {
  const addToHomeScreen = (0, import_react.useCallback)(() => {
    var _a, _b;
    (_b = (_a = getWebApp()) == null ? void 0 : _a.addToHomeScreen) == null ? void 0 : _b.call(_a);
  }, []);
  const checkStatus = (0, import_react.useCallback)(() => new Promise((resolve, reject) => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.checkHomeScreenStatus)) return reject(new Error("Not supported"));
    wa.checkHomeScreenStatus((status) => resolve(status != null ? status : "unsupported"));
  }), []);
  return { addToHomeScreen, checkStatus };
}
function useIsActive() {
  const [isActive, setIsActive] = (0, import_react.useState)(() => {
    var _a;
    return Boolean((_a = getWebApp()) == null ? void 0 : _a.isActive);
  });
  useTelegramEvent("activated", () => setIsActive(true));
  useTelegramEvent("deactivated", () => setIsActive(false));
  return isActive;
}
function useTelegramStartParam() {
  var _a, _b, _c;
  return (_c = (_b = (_a = getWebApp()) == null ? void 0 : _a.initDataUnsafe) == null ? void 0 : _b.start_param) != null ? _c : null;
}

// src/providers/TelegramProvider.tsx
var import_react2 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var defaultCtx = {
  ready: false,
  inTelegram: false,
  bypass: false,
  webApp: null,
  user: null,
  language: "en-US",
  uiLang: "en",
  colorScheme: "dark",
  startParam: null,
  isRtl: false,
  changeLanguage: () => {
  }
};
var TelegramContext = (0, import_react2.createContext)(defaultCtx);
function useTelegram() {
  return (0, import_react2.useContext)(TelegramContext);
}
function applyLangToDOM(lang) {
  const rtl = isRtlLang(lang);
  document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);
}
function applyColorSchemeToDOM(scheme) {
  if (scheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
function TelegramProvider({
  children,
  options = {}
}) {
  const {
    langStorageKey = "tg-kit-ui-lang",
    onUserReady,
    onReady,
    onLanguageChange,
    loadingComponent = null,
    notInTelegramComponent = null,
    allowOutsideTelegram = false
  } = options;
  const [isInitialized, setIsInitialized] = (0, import_react2.useState)(false);
  const [ctx, setCtx] = (0, import_react2.useState)(defaultCtx);
  const getSavedLang = (0, import_react2.useCallback)(() => {
    try {
      return localStorage.getItem(langStorageKey);
    } catch (e) {
      return null;
    }
  }, [langStorageKey]);
  const saveLang = (0, import_react2.useCallback)((lang) => {
    try {
      localStorage.setItem(langStorageKey, lang);
    } catch (e) {
    }
  }, [langStorageKey]);
  const changeLanguage = (0, import_react2.useCallback)((lang) => {
    saveLang(lang);
    applyLangToDOM(lang);
    onLanguageChange == null ? void 0 : onLanguageChange(lang);
    setCtx((prev) => __spreadProps(__spreadValues({}, prev), {
      uiLang: lang,
      language: tgLangToTmdb(lang),
      isRtl: isRtlLang(lang)
    }));
  }, [saveLang, onLanguageChange]);
  (0, import_react2.useLayoutEffect)(() => {
    var _a, _b, _c, _d, _e, _f, _g;
    const wa = getWebApp();
    const inTg = isInTelegram();
    const isDev = process.env.NODE_ENV === "development" || typeof window !== "undefined" && new URLSearchParams(window.location.search).has("bypass");
    const bypass = !inTg && isDev;
    let user = null;
    let startParam = null;
    let colorScheme = "dark";
    if (wa) {
      try {
        wa.expand();
      } catch (e) {
      }
      try {
        (_a = wa.disableVerticalSwipes) == null ? void 0 : _a.call(wa);
      } catch (e) {
      }
      try {
        (_b = wa.enableClosingConfirmation) == null ? void 0 : _b.call(wa);
      } catch (e) {
      }
      colorScheme = (_c = wa.colorScheme) != null ? _c : "dark";
      user = (_e = (_d = wa.initDataUnsafe) == null ? void 0 : _d.user) != null ? _e : null;
      startParam = (_g = (_f = wa.initDataUnsafe) == null ? void 0 : _f.start_param) != null ? _g : null;
      if (user) onUserReady == null ? void 0 : onUserReady(user);
      onReady == null ? void 0 : onReady(wa);
    }
    const tgLangCode = user == null ? void 0 : user.language_code;
    const tgUiLang = tgLangToUi(tgLangCode);
    const savedLang = getSavedLang();
    const finalUiLang = savedLang != null ? savedLang : tgUiLang;
    const finalLanguage = tgLangToTmdb(finalUiLang);
    if (!savedLang) saveLang(finalUiLang);
    applyLangToDOM(finalUiLang);
    applyColorSchemeToDOM(colorScheme);
    onLanguageChange == null ? void 0 : onLanguageChange(finalUiLang);
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
      changeLanguage
    });
    setIsInitialized(true);
    try {
      wa == null ? void 0 : wa.ready();
    } catch (e) {
    }
  }, [changeLanguage, getSavedLang, saveLang, onUserReady, onReady, onLanguageChange]);
  if (!isInitialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loadingComponent });
  if (ctx.ready && !ctx.inTelegram && !ctx.bypass && !allowOutsideTelegram) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: notInTelegramComponent });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelegramContext.Provider, { value: ctx, children });
}

// src/providers/FullscreenProvider.tsx
var import_react3 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var DEFAULT_INSET = { top: 0, bottom: 0, left: 0, right: 0 };
var SAFE_AREA_VARS = {
  top: "--tg-safe-area-inset-top",
  bottom: "--tg-safe-area-inset-bottom",
  left: "--tg-safe-area-inset-left",
  right: "--tg-safe-area-inset-right"
};
var CONTENT_SAFE_AREA_VARS = {
  top: "--tg-content-safe-area-inset-top",
  bottom: "--tg-content-safe-area-inset-bottom",
  left: "--tg-content-safe-area-inset-left",
  right: "--tg-content-safe-area-inset-right"
};
function applySafeAreaVars(inset, vars) {
  const root = document.documentElement.style;
  root.setProperty(vars.top, `${inset.top}px`);
  root.setProperty(vars.bottom, `${inset.bottom}px`);
  root.setProperty(vars.left, `${inset.left}px`);
  root.setProperty(vars.right, `${inset.right}px`);
}
var FullscreenContext = (0, import_react3.createContext)(null);
function useFullscreen() {
  const ctx = (0, import_react3.useContext)(FullscreenContext);
  if (!ctx) throw new Error("useFullscreen must be used within FullscreenProvider");
  return ctx;
}
function FullscreenProvider({
  children,
  options = {}
}) {
  const { storageKey = "tg-kit-fullscreen", persistPreference = true } = options;
  const [isFullscreen, setIsFullscreen] = (0, import_react3.useState)(false);
  const [isSupported, setIsSupported] = (0, import_react3.useState)(false);
  const [isActive, setIsActive] = (0, import_react3.useState)(true);
  const [isOrientationLocked, setIsOrientationLocked] = (0, import_react3.useState)(false);
  const [lastFullscreenError, setLastFullscreenError] = (0, import_react3.useState)(null);
  const [safeArea, setSafeArea] = (0, import_react3.useState)(DEFAULT_INSET);
  const [contentSafeArea, setContentSafeArea] = (0, import_react3.useState)(DEFAULT_INSET);
  const isInitializedRef = (0, import_react3.useRef)(false);
  const savePreference = (0, import_react3.useCallback)((value) => {
    if (!persistPreference) return;
    try {
      localStorage.setItem(storageKey, String(value));
    } catch (e) {
    }
  }, [storageKey, persistPreference]);
  const enterFullscreen = (0, import_react3.useCallback)(() => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.requestFullscreen)) return;
    setLastFullscreenError(null);
    try {
      wa.requestFullscreen();
      savePreference(true);
    } catch (e) {
    }
  }, [savePreference]);
  const exitFullscreen = (0, import_react3.useCallback)(() => {
    const wa = getWebApp();
    if (!(wa == null ? void 0 : wa.exitFullscreen)) return;
    try {
      wa.exitFullscreen();
      savePreference(false);
    } catch (e) {
    }
  }, [savePreference]);
  const toggleFullscreen = (0, import_react3.useCallback)(() => {
    if (isFullscreen) exitFullscreen();
    else enterFullscreen();
  }, [isFullscreen, enterFullscreen, exitFullscreen]);
  (0, import_react3.useEffect)(() => {
    const wa = getWebApp();
    if (!wa) return;
    setIsSupported(typeof wa.requestFullscreen === "function");
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
    const onFullscreenFailed = (...args) => {
      const err = args[0];
      if (err && typeof err === "object" && "error" in err) {
        setLastFullscreenError(err);
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
    wa.onEvent("fullscreenChanged", onFullscreen);
    wa.onEvent("fullscreenFailed", onFullscreenFailed);
    wa.onEvent("activated", onActivated);
    wa.onEvent("deactivated", onDeactivated);
    wa.onEvent("safeAreaChanged", onSafeArea);
    wa.onEvent("contentSafeAreaChanged", onContentSafeArea);
    wa.onEvent("orientationLockedChanged", onOrientationLocked);
    if (!isInitializedRef.current && persistPreference) {
      isInitializedRef.current = true;
      try {
        const saved = localStorage.getItem(storageKey) === "true";
        if (saved && !wa.isFullscreen && wa.requestFullscreen) {
          setTimeout(() => {
            var _a;
            return (_a = wa.requestFullscreen) == null ? void 0 : _a.call(wa);
          }, 100);
        }
      } catch (e) {
      }
    }
    return () => {
      wa.offEvent("fullscreenChanged", onFullscreen);
      wa.offEvent("fullscreenFailed", onFullscreenFailed);
      wa.offEvent("activated", onActivated);
      wa.offEvent("deactivated", onDeactivated);
      wa.offEvent("safeAreaChanged", onSafeArea);
      wa.offEvent("contentSafeAreaChanged", onContentSafeArea);
      wa.offEvent("orientationLockedChanged", onOrientationLocked);
    };
  }, [storageKey, persistPreference]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    FullscreenContext.Provider,
    {
      value: {
        isFullscreen,
        isSupported,
        isActive,
        isOrientationLocked,
        safeArea,
        contentSafeArea,
        lastFullscreenError,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen
      },
      children
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FullscreenProvider,
  RTL_LANGS,
  SUPPORTED_LANGS,
  TelegramProvider,
  biometric,
  cloudStorage,
  dialog,
  getRawUserData,
  getUserAvatarUrl,
  getUserDisplayName,
  getUserIdentifier,
  getUserInfoWithAvatar,
  getWebApp,
  haptic,
  isInTelegram,
  isRtlLang,
  isVersionAtLeast,
  location,
  openExternalLink,
  openInvoice,
  openTelegramLink,
  readClipboard,
  scanQr,
  tgLangToTmdb,
  tgLangToUi,
  useAccelerometer,
  useBiometric,
  useCloudStorage,
  useDeviceOrientation,
  useFullscreen,
  useGyroscope,
  useHapticFeedback,
  useHomeScreen,
  useIsActive,
  useLocation,
  useSafeArea,
  useTelegram,
  useTelegramBackButton,
  useTelegramEvent,
  useTelegramFullscreen,
  useTelegramMainButton,
  useTelegramSecondaryButton,
  useTelegramSettingsButton,
  useTelegramStartParam,
  useTelegramTheme,
  useTelegramUser,
  useTelegramViewport,
  useTelegramWebApp
});
