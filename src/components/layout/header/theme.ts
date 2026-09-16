export type Theme = "light" | "dark";

const listeners = new Set<() => void>();

export function getTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// used by useSyncExternalStore so components re-render when the theme flips
export function subscribeTheme(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "light" ? "dark" : "light";
  localStorage.setItem("theme", next);
  document.documentElement.classList.toggle("dark", next === "dark");
  listeners.forEach((callback) => callback());
  return next;
}
