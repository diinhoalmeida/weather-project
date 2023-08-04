export function normalizeWord(word: string): string {
  const normalized = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const removedSpecialChars = normalized.replace(/[^a-zA-Z0-9\s\-']/g, "");
  return removedSpecialChars.toLowerCase();
}
