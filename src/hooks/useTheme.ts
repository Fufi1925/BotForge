import { useEffect, useState } from "react";

export type ThemeMode = "dark" | "light" | "auto";
export interface Theme {
  mode: ThemeMode;
  accent: string;
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

const DARK: Theme = {
  mode: "dark",
  accent: "#7C3AED",
  bg: "#0a0a14",
  surface: "rgba(15,15,30,0.55)",
  text: "#e8eaf2",
  textMuted: "#9ca3af",
  border: "rgba(255,255,255,0.08)",
};

const LIGHT: Theme = {
  mode: "light",
  accent: "#6366F1",
  bg: "#f3f4f6",
  surface: "#ffffff",
  text: "#111827",
  textMuted: "#6b7280",
  border: "#e5e7eb",
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("bf_theme");
    if (saved) {
      try { return { ...DARK, ...JSON.parse(saved) }; } catch {}
    }
    return DARK;
  });

  useEffect(() => {
    localStorage.setItem("bf_theme", JSON.stringify(theme));
    document.documentElement.style.setProperty("--bf-accent", theme.accent);
    document.documentElement.style.setProperty("--bf-bg", theme.bg);
    document.documentElement.style.setProperty("--bf-surface", theme.surface);
    document.documentElement.style.setProperty("--bf-text", theme.text);
    document.documentElement.style.setProperty("--bf-text-muted", theme.textMuted);
    document.documentElement.style.setProperty("--bf-border", theme.border);
    document.documentElement.dataset.theme = theme.mode;
  }, [theme]);

  const setMode = (mode: ThemeMode) => {
    const base = mode === "light" ? LIGHT : DARK;
    setTheme({ ...base, mode, accent: theme.accent });
  };

  const setAccent = (accent: string) => setTheme({ ...theme, accent });

  return { theme, setTheme, setMode, setAccent };
}
