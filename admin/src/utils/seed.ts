// Deterministic pseudo-random generator so mock data stays stable across renders.
function mulberry32(seed: number) {
  let a = seed
  return function random() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function createRng(seed: number) {
  const rand = mulberry32(seed)

  return {
    next: () => rand(),
    int: (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min,
    float: (min: number, max: number, decimals = 2) => {
      const value = rand() * (max - min) + min
      return Math.round(value * 10 ** decimals) / 10 ** decimals
    },
    bool: (probability = 0.5) => rand() < probability,
    item: <T,>(arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)],
    items: <T,>(arr: readonly T[], count: number): T[] => {
      const pool = [...arr]
      const result: T[] = []
      for (let i = 0; i < count && pool.length > 0; i++) {
        const idx = Math.floor(rand() * pool.length)
        result.push(pool.splice(idx, 1)[0])
      }
      return result
    },
    dateBetween: (start: Date, end: Date) => {
      const t = start.getTime() + rand() * (end.getTime() - start.getTime())
      return new Date(t)
    },
  }
}
