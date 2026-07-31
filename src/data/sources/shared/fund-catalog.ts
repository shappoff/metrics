/** Official NIAB fund titles for display. */
export const FUND_NAMES: Readonly<Record<string, string>> = {
  "136": "Минская духовная православная консистория Синода",
  "1781": "Могилёвская римско-католическая консистория",
  "2301": "Могилевская духовная православная консистория Синода",
  "2531": "Полоцкая духовная православная консистория Синода",
  "2736": "Словенинская Петропавловская церковь",
  "2837": "Хотинская Иосифовская церковь",
};

export function getFundName(fund: string): string | undefined {
  return FUND_NAMES[fund];
}

/** e.g. `НИАБ ф. 2531` */
export function formatFundRef(fund: string): string {
  return `НИАБ ф. ${fund}`;
}

/** Short crumb label, e.g. `ф. 2531` */
export function formatFundCrumb(fund: string): string {
  return `ф. ${fund}`;
}

/**
 * Full visible label with archive title when known.
 * e.g. `НИАБ ф. 2531 — Полоцкая духовная православная консистория Синода`
 */
export function formatFundLabel(fund: string): string {
  const name = getFundName(fund);
  return name ? `${formatFundRef(fund)} — ${name}` : formatFundRef(fund);
}
