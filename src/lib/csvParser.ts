import Papa from 'papaparse';

/**
 * Robust CSV parser that parses string or text stream into typed objects
 */
export function parseCSV<T = Record<string, string>>(csvText: string): { data: T[]; errors: Papa.ParseError[] } {
  if (!csvText || !csvText.trim()) {
    return { data: [], errors: [] };
  }

  const result = Papa.parse<T>(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false, // We will explicitly parse numbers and booleans with custom validators to avoid type casting bugs
    transformHeader: (header) => header.trim(),
    transform: (value) => value.trim(),
  });

  return {
    data: result.data,
    errors: result.errors,
  };
}
