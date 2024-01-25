import type { SupportedLangFiles, Translations } from '@windy/lang-files.d';
import type { LoadedTranslations, LoadingOptions, TransFileInfo } from '@windy/trans.d';
export declare const files: Record<keyof SupportedLangFiles, TransFileInfo>;
/**
 * key-value pairs with all loaded lang strings
 */
declare const trans: LoadedTranslations;
/**
 * Preferred language which does not existed in translations (for statistics purposes)
 */
declare let missingLang: string | undefined;
/**
 * Get file from storage, checks it version number and if
 * fits current version returns it. If file is not in storage downloads a file
 * and stores it in storage.
 *
 * Handles versioning of the file, so each new versionof client get its correct file.
 *
 * If filename is relative filename (set in options). For example for 'lang/cs.json'
 * we try to download /v5.0/lang/cz.json'
 *
 * Can also store files with absolute URLs
 *
 * @param  {string} filename Filename (e.g. 'lang/cs.json')
 * @param  {Object} options Optionally custom options
 * @returns Resolves with contents of loaded file (key-value pairs)
 */
declare const getFile: (filename: string, options?: LoadingOptions) => Promise<Translations>;
/**
 * Loads external language file and attach it as a source of translations. Missing translations are presented in default english lang.
 * It does nothing in case of english, as it is already loaded by default.
 *
 * @param id Id of translation file
 * @param lang Optionally forced language, client lang is used by default
 * @returns Translations in key-pair object. Missing translations are presented in default english lang.
 */
declare const loadLangFile: (id: keyof SupportedLangFiles, lang?: "ca" | "lt" | "id" | "es" | "en" | "zh-TW" | "zh" | "ja" | "fr" | "ko" | "it" | "ru" | "nl" | "cs" | "tr" | "pl" | "sv" | "fi" | "ro" | "el" | "hu" | "hr" | "da" | "ar" | "fa" | "hi" | "ta" | "sk" | "uk" | "bg" | "he" | "is" | "et" | "vi" | "sl" | "sr" | "th" | "sq" | "pt" | "nb" | "de" | "bn") => Promise<void | Translations>;
/**
 * Replace all `[data-*]` translation tags with proper translation in HTML element. It overrides its innerHTML
 * Supported data suffixes: 'title', 'placeholder', 't', 'afterbegin', 'beforeend', 'tooltipsrc'
 *
 * @param element HTML element where tags should be replaced
 * @example
 * ```
 * data-t="PHRASE"
 *
 * data-afterbegin=""
 * data-beforeend=""
 * data-tooltipsrc="PHRASE"
 *
 * <p>
 *   <!-- afterbegin -->
 *   foo
 *   <!-- beforeend -->
 * </p>
 * ```
 */
declare const translateDocument: <T extends HTMLElement>(element: T) => void;
/**
 * @module trans
 *
 * - handles all i18n tasks
 * - detects desired language
 * - lazy loads language file
 * - translates required part of a DOM (with many limitations)
 * - returns translated strings for later use in app
 */
export { getFile, loadLangFile, missingLang, trans as t, translateDocument };
