import { useEffect, useState } from "react";

interface Numbers {
  pricing: { free_price: number; plus_price: number; currency: string; currency_symbol: string };
  stats: { servers: number; members: number; uptime_percent: number; commands_total: number; modules_active: number; tickets_open: number; team_online: number };
  partner: { name: string; members: number; icon: string; link: string; verified: boolean };
  limits: Record<string, number>;
  social: Record<string, number>;
  trust: Record<string, number>;
  support: Record<string, any>;
}

const DEFAULTS: Numbers = {
  pricing: { free_price: 0, plus_price: 4.99, currency: "€", currency_symbol: "€" },
  stats: { servers: 1, members: 523, uptime_percent: 99.9, commands_total: 12483, modules_active: 13, tickets_open: 12, team_online: 5 },
  partner: { name: "Koblenz RP", members: 523, icon: "🏙️", link: "https://discord.gg/koblenzrp", verified: true },
  limits: { max_ticket_categories: 25, max_embed_fields: 25, max_custom_voice_users: 10, embed_title_max: 256, embed_description_max: 4096, embed_field_name_max: 256, embed_field_value_max: 1024, team_max_members: 50 },
  social: { twitch_delay_seconds: 45, youtube_delay_seconds: 45 },
  trust: { data_breaches: 0, years_active: 1, languages_supported: 2 },
  support: { response_time_minutes: 15, team_size: 5, languages: ["Deutsch", "English"] },
};

let cache: Numbers | null = null;

export function useNumbers(): Numbers {
  const [n, setN] = useState<Numbers>(cache || DEFAULTS);
  useEffect(() => {
    if (cache) return;
    fetch("/numbers.json")
      .then(r => r.json())
      .then(d => { cache = { ...DEFAULTS, ...d }; setN(cache!); })
      .catch(() => {});
  }, []);
  return n;
}
