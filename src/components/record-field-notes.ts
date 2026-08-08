const NOTE_SUFFIX = "_note";

/** Column key for the note paired with a base field (`parents` → `parents_note`). */
export function pairedNoteKey(fieldKey: string): string {
  return `${fieldKey}${NOTE_SUFFIX}`;
}

/**
 * True when `noteKey` is `{base}_note` and `base` exists as a visible column.
 * `notes` alone is not a paired note (no leading underscore before `note`).
 */
export function isPairedNoteKey(
  noteKey: string,
  columnKeys: ReadonlySet<string>
): boolean {
  if (!noteKey.endsWith(NOTE_SUFFIX)) {
    return false;
  }

  const baseKey = noteKey.slice(0, -NOTE_SUFFIX.length);
  return baseKey.length > 0 && columnKeys.has(baseKey);
}
