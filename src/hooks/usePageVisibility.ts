import { useEffect, useState } from "react";

interface SystemConfig {
  page_visibility?: Record<string, boolean>;
  partners?: { featured?: any[] };
  stats?: any;
  dashboard?: any;
}

let cachedConfig: SystemConfig | null = null;
let pendingPromise: Promise<SystemConfig> | null = null;

async function loadConfig(): Promise<SystemConfig> {
  if (cachedConfig) return cachedConfig;
  if (pendingPromise) return pendingPromise;

  pendingPromise = fetch("/api/system")
    .then(r => r.json())
    .then(d => {
      cachedConfig = d;
      return d;
    })
    .catch(() => ({ page_visibility: {} } as SystemConfig));

  return pendingPromise;
}

export function usePageVisibility(pageKey: string, defaultValue = true): {
  visible: boolean;
  loading: boolean;
} {
  const [visible, setVisible] = useState<boolean>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfig().then(cfg => {
      const v = cfg?.page_visibility?.[pageKey];
      setVisible(v !== undefined ? v : defaultValue);
      setLoading(false);
    });
  }, [pageKey, defaultValue]);

  return { visible, loading };
}

export function useSystemConfig() {
  const [config, setConfig] = useState<SystemConfig | null>(cachedConfig);
  useEffect(() => {
    loadConfig().then(setConfig);
  }, []);
  return config;
}
