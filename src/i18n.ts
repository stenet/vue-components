import type { Locale, NamedValue, Path, TranslateResult, TranslateOptions } from "vue-i18n";

export type Translate = {
  (key: Path): TranslateResult
  (key: Path, locale: Locale): TranslateResult
  (key: Path, locale: Locale, list: unknown[]): TranslateResult
  (key: Path, locale: Locale, named: object): TranslateResult
  (key: Path, list: unknown[]): TranslateResult
  (key: Path, named: Record<string, unknown>): TranslateResult
  (key: Path): string
  (key: Path, plural: number): string
  (key: Path, plural: number, options: TranslateOptions): string
  (key: Path, defaultMsg: string): string
  (key: Path, defaultMsg: string, options: TranslateOptions): string
  (key: Path, list: unknown[]): string
  (key: Path, list: unknown[], plural: number): string
  (key: Path, list: unknown[], defaultMsg: string): string
  (key: Path, list: unknown[], options: TranslateOptions): string
  (key: Path, named: NamedValue): string
  (key: Path, named: NamedValue, plural: number): string
  (key: Path, named: NamedValue, defaultMsg: string): string
  (key: Path, named: NamedValue, options: TranslateOptions): string
};