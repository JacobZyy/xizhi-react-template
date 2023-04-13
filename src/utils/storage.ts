export const storage = {
  get(key: string) {
    return JSON.parse(window.localStorage.getItem(key) as string);
  },
  set(key: string, value: unknown) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string) {
    window.localStorage.removeItem(key);
  },

  clear() {
    window.localStorage.clear();
  },
};
