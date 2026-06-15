export const EXAM_TOKENS_STORAGE_KEY = 'prepmx-exam-tokens';
export const EXAM_TOKENS_COOKIE_KEY = 'prepmx-exam-tokens';

/** Créditos iniciales en demo (3 simulacros completos). */
export const DEFAULT_EXAM_TOKENS = 3;

export interface TokenPack {
  id: string;
  label: string;
  tokens: number;
  priceMxn: number;
}

export const TOKEN_PACKS: TokenPack[] = [
  { id: 'pack-3', label: '3 simulacros', tokens: 3, priceMxn: 99 },
  { id: 'pack-10', label: '10 simulacros', tokens: 10, priceMxn: 249 },
  { id: 'pack-25', label: '25 simulacros', tokens: 25, priceMxn: 499 },
];
