import { useEffect, useState } from "react";

export interface LiveStats {
  guilds: number;
  users: number;
  channels: number;
  ping: number;
  uptime: number;
  commands: Record<string, number>;
  version: string;
  source?: "live" | "configured";
}

const DEFAULT: LiveStats = {
  guilds: 1,
  users: 523,
  channels: 12,
  ping: 0,
  uptime: 0,
  commands: {},
  version: "3.0.0",
};

export function useLiveStats(intervalMs = 10000): LiveStats {
  const [stats, setStats] = useState<LiveStats>(DEFAULT);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats({ ...DEFAULT, ...data });
        }
      } catch {
        // offline → defaults bleiben
      }
    };
    fetchStats();
    const id = setInterval(fetchStats, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return stats;
}

export function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}
