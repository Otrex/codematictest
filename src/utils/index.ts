export function extractIdFromUrl(url: string): number | null {
  const parts = url.trimEnd().split('/');
  const lastPart = parts[parts.length - 2];

  if (!isNaN(Number(lastPart))) {
    return Number(lastPart);
  }

  return null;
}

export function pickFields<T extends object, K extends keyof T>(
  arr: T[],
  keys: K[]
): Pick<T, K>[] {
  return arr.map((obj) => {
    const picked: Partial<Pick<T, K>> = {}
    keys.forEach((key) => {
      picked[key] = obj[key]
    })
    return picked as Pick<T, K>
  })
}
