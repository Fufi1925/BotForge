import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Bot, Menu, X, Gauge, Activity, Home, Sparkles, Heart, ChevronDown,
  BookOpen, Crown, Zap, Shield, Ticket, Music, BarChart3, Command,
  MessageSquare, Lightbulb, Award, Calendar, Users, Headphones, FileText,
  Layout, Plug, Coins, Smile, Video, RefreshCw, HelpCircle, Code2,
  Briefcase, Mail, Server, Lock, Globe, Layers,
  Cpu, Cloud, TrendingUp, Bell, Wrench, ArrowUpRight
} from "lucide-react";

interface NavLink {
  to: string;
  label: string;
  desc?: string;
  icon?: any;
  badge?: string;
}
interface NavGroup {
  title: string;
  links: NavLink[];
}
interface MegaMenu {
  label: string;
  icon: any;
  cols: NavGroup[];
  cta?: { title: string; desc: string; to: string };
}

const megaMenus: MegaMenu[] = [
  {
    label: "Produkt",
    icon: Sparkles,
    cols: [
      {
        title: "Module",
        links: [
          { to: "/features", label: "Alle Features", desc: "Komplette Übersicht", icon: Layers },
          { to: "/commands", label: "100+ Commands", desc: "Slash + Prefix Commands", icon: Command },
          { to: "/economy", label: "Economy System", desc: "Coins, Shop & Gambling", icon: Coins },
          { to: "/ai", label: "AI Features", desc: "GPT-4 Integration", icon: Cpu, badge: "Neu" },
        ],
      },
      {
        title: "Tools",
        links: [
          { to: "/templates", label: "Server Templates", desc: "Vorgefertigte Setups", icon: Layout },
          { to: "/integrations", label: "Integrationen", desc: "Twitch, YouTube, GitHub", icon: Plug },
          { to: "/widgets", label: "Embed Widgets", desc: "Stats für deine Website", icon: Code2 },
          { to: "/emojis", label: "Emoji Pack", desc: "Custom Emojis Download", icon: Smile },
        ],
      },
      {
        title: "Module Details",
        links: [
          { to: "/docs/automod", label: "AutoMod 2.0", desc: "KI-Schutz", icon: Shield },
          { to: "/docs/tickets", label: "Tickets", desc: "Dropdown Panel", icon: Ticket },
          { to: "/docs/music", label: "Music Player", desc: "Lavalink Audio", icon: Music },
          { to: "/badges", label: "Badges", desc: "Achievement-System", icon: Award },
        ],
      },
    ],
    cta: { title: "Premium freischalten", desc: "24/7 Music & Custom Branding", to: "/premium" },
  },
  {
    label: "Ressourcen",
    icon: BookOpen,
    cols: [
      {
        title: "Lernen",
        links: [
          { to: "/docs", label: "Dokumentation", desc: "Vollständiger Guide", icon: BookOpen },
          { to: "/tutorials", label: "Video Tutorials", desc: "8+ Anleitungen", icon: Video },
          { to: "/faq", label: "FAQ", desc: "Häufige Fragen", icon: HelpCircle },
          { to: "/docs/setup", label: "Setup Guide", desc: "In 2 Minuten startklar", icon: Wrench },
        ],
      },
      {
        title: "Entwickler",
        links: [
          { to: "/api-docs", label: "API Docs", desc: "REST API Referenz", icon: Code2 },
          { to: "/branding", label: "Brand Kit", desc: "Logos & Farben", icon: Sparkles },
          { to: "/changelog", label: "Changelog", desc: "Alle Updates", icon: FileText },
          { to: "/roadmap", label: "Roadmap", desc: "Was kommt als nächstes", icon: TrendingUp },
        ],
      },
      {
        title: "Migration",
        links: [
          { to: "/migrate", label: "Migration Tool", desc: "Von MEE6, Dyno & Co.", icon: RefreshCw, badge: "Hot" },
          { to: "/blog", label: "Blog & News", desc: "Updates und Guides", icon: FileText },
          { to: "/downloads", label: "Downloads", desc: "Apps & Assets", icon: Cloud },
          { to: "/docs/moderation", label: "Mod-Anleitung", desc: "Mod-Befehle erklärt", icon: Shield },
        ],
      },
    ],
    cta: { title: "Migration kostenlos", desc: "Wir helfen beim Wechsel", to: "/migrate" },
  },
  {
    label: "Community",
    icon: Heart,
    cols: [
      {
        title: "Mitmachen",
        links: [
          { to: "/partners", label: "Partner werden", desc: "Werbung + Premium gratis", icon: Heart, badge: "Top" },
          { to: "/affiliate", label: "Affiliate", desc: "20% Lifetime-Provision", icon: TrendingUp },
          { to: "/suggest", label: "Vorschläge", desc: "Stimm für Features ab", icon: Lightbulb },
          { to: "/contact", label: "Kontakt", desc: "Nimm Verbindung auf", icon: Mail },
        ],
      },
      {
        title: "Showcase",
        links: [
          { to: "/showcase", label: "Server Showcase", desc: "Top Communities", icon: Server },
          { to: "/testimonials", label: "Bewertungen", desc: "Was User sagen", icon: MessageSquare },
          { to: "/leaderboard", label: "XP Leaderboard", desc: "Globale Bestenliste", icon: BarChart3 },
          { to: "/guilds", label: "eSports Gilden", desc: "Verifizierte Clans", icon: Crown },
        ],
      },
      {
        title: "Über uns",
        links: [
          { to: "/team", label: "Team", desc: "Lerne uns kennen", icon: Users },
          { to: "/jobs", label: "Karriere", desc: "Wir suchen Talente", icon: Briefcase },
          { to: "/events", label: "Events", desc: "Live-Streams & Drops", icon: Calendar },
          { to: "/community", label: "Community Hub", desc: "Alles auf einen Blick", icon: Globe },
        ],
      },
    ],
    cta: { title: "Discord beitreten", desc: "850+ aktive Member", to: "/support" },
  },
  {
    label: "Support",
    icon: Headphones,
    cols: [
      {
        title: "Hilfe",
        links: [
          { to: "/support", label: "Support-Center", desc: "Hilfe-Übersicht", icon: Headphones },
          { to: "/faq", label: "FAQ", desc: "Häufige Fragen", icon: HelpCircle },
          { to: "/contact", label: "Kontakt", desc: "Wir antworten schnell", icon: Mail },
          { to: "/docs", label: "Dokumentation", desc: "Anleitungen", icon: BookOpen },
        ],
      },
      {
        title: "Status",
        links: [
          { to: "/status", label: "Live Status", desc: "99.9% Uptime", icon: Activity },
          { to: "/uptime", label: "Uptime Monitor", desc: "Live-Counter", icon: Zap },
          { to: "/status/incidents", label: "Vorfälle", desc: "Historie & Updates", icon: Bell },
          { to: "/status/maintenance", label: "Wartung", desc: "Geplante Updates", icon: Wrench },
        ],
      },
      {
        title: "Sicherheit",
        links: [
          { to: "/security", label: "Sicherheit", desc: "DSGVO & TLS 1.3", icon: Lock },
          { to: "/privacy", label: "Datenschutz", desc: "Privacy Policy", icon: Shield },
          { to: "/terms", label: "Nutzungsbedingungen", desc: "Terms of Service", icon: FileText },
          { to: "/legal", label: "Rechtliches", desc: "Impressum & Co.", icon: FileText },
        ],
      },
    ],
    cta: { title: "Premium Support", desc: "Direkt zum Dev-Team", to: "/premium" },
  },
];

const directLinks = [
  { to: "/pricing", label: "Pricing", icon: Crown, highlight: true },
  { to: "/status", label: "Status", icon: Activity },
  { to: "/dashboard", label: "Dashboard", icon: Gauge },
];

export default function Navbar({ scrolled }: { scrolled: boolean }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-1.5" : "py-3"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={navRef}>
        <div className={`glass-strong flex items-center justify-between px-4 sm:px-5 py-2.5 transition-all ${scrolled ? "shadow-2xl" : ""}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center glow-breathe">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a0a14]" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-black text-gradient">BotForge</span>
              <span className="text-[8px] text-gray-500 tracking-widest uppercase -mt-0.5 hidden sm:block">v3.0 · Live</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {/* Home Link */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 ${
                location.pathname === "/" ? "text-white bg-white/5" : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>

            {/* Mega Menus */}
            {megaMenus.map((menu) => {
              const Icon = menu.icon;
              const isOpen = openDropdown === menu.label;
              return (
                <div key={menu.label} className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setOpenDropdown(isOpen ? null : menu.label); }}
                    className={`px-3 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 ${
                      isOpen ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {menu.label}
                    <ChevronDown className={`w-3 h-3 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
              );
            })}

            {/* Direct Links */}
            {directLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-1.5 ${
                    link.highlight
                      ? "text-amber-300 hover:text-amber-200 hover:bg-amber-500/10"
                      : active
                        ? "text-white bg-white/5 border border-violet-500/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${link.highlight ? "text-amber-400" : ""}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-2">
            <a
              href="https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2 px-4 hidden sm:inline-flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              Einladen
            </a>
            <button
              className="xl:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* MEGA MENU PANEL */}
        {openDropdown && (
          <div className="hidden xl:block mt-2 glass-strong rounded-2xl p-6 anim-down border border-white/10 shadow-2xl glow-breathe overflow-hidden">
            {megaMenus.filter(m => m.label === openDropdown).map((menu) => (
              <div key={menu.label} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {menu.cols.map((col, i) => (
                  <div key={i}>
                    <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3 px-2">{col.title}</h4>
                    <div className="space-y-1">
                      {col.links.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition group/link"
                          >
                            {Icon && (
                              <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover/link:bg-violet-500/20 transition">
                                <Icon className="w-4 h-4 text-violet-300" />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-white">{link.label}</span>
                                {link.badge && (
                                  <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                    link.badge === "Neu" ? "bg-cyan-500/20 text-cyan-300" :
                                    link.badge === "Hot" ? "bg-red-500/20 text-red-300" :
                                    "bg-amber-500/20 text-amber-300"
                                  }`}>{link.badge}</span>
                                )}
                              </div>
                              {link.desc && <div className="text-[11px] text-gray-400 mt-0.5">{link.desc}</div>}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {menu.cta && (
                  <div className="lg:col-span-4 mt-2 pt-4 border-t border-white/5">
                    <Link
                      to={menu.cta.to}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-violet-500/15 to-cyan-500/15 border border-violet-500/20 hover:border-violet-500/40 transition group/cta"
                    >
                      <div>
                        <div className="font-bold text-white text-sm">{menu.cta.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{menu.cta.desc}</div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-violet-300 group-hover/cta:rotate-12 transition" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="xl:hidden mt-2 glass-strong p-3 anim-down max-h-[80vh] overflow-y-auto rounded-2xl">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white">
              <Home className="w-4 h-4 text-violet-400" /> Home
            </Link>
            {megaMenus.map((menu) => (
              <details key={menu.label} className="group">
                <summary className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 cursor-pointer list-none">
                  <span className="flex items-center gap-2"><menu.icon className="w-4 h-4 text-violet-400" />{menu.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 group-open:rotate-180 transition" />
                </summary>
                <div className="ml-6 mt-1 mb-2 space-y-0.5">
                  {menu.cols.flatMap(c => c.links).map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 rounded-lg text-[13px] text-gray-400 hover:text-white hover:bg-white/5"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
            {directLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white"
              >
                <link.icon className="w-4 h-4 text-violet-400" /> {link.label}
              </Link>
            ))}
            <a
              href="https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm text-center mt-2 block"
            >
              <Zap className="w-4 h-4 inline mr-1" /> Bot einladen
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
