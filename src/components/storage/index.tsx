export function save(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function load(key: string): any {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function remove(key: string): void {
  localStorage.removeItem(key);
}
