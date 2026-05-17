import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import PageGate from "./components/PageGate";

// Core
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Status from "./pages/Status";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Commands from "./pages/Commands";
import Support from "./pages/Support";
import Changelog from "./pages/Changelog";
import Roadmap from "./pages/Roadmap";
import ApiDocs from "./pages/ApiDocs";
import Partners from "./pages/Partners";
import EmojiPack from "./pages/EmojiPack";
import Team from "./pages/Team";
import Docs from "./pages/Docs";
import DocsSetup from "./pages/DocsSetup";
import DocsModeration from "./pages/DocsModeration";
import DocsTickets from "./pages/DocsTickets";
import DocsMusic from "./pages/DocsMusic";
import DocsAutoMod from "./pages/DocsAutoMod";
import Features from "./pages/Features";
import PremiumDetail from "./pages/PremiumDetail";
import GlobalLeaderboard from "./pages/GlobalLeaderboard";
import Analytics from "./pages/Analytics";
import IncidentHistory from "./pages/IncidentHistory";
import FaqPage from "./pages/FaqPage";
import Branding from "./pages/Branding";
import Affiliate from "./pages/Affiliate";
import Contact from "./pages/Contact";
import Suggest from "./pages/Suggest";
import Maintenance from "./pages/Maintenance";
import GuildPartners from "./pages/GuildPartners";
import SecurityPortal from "./pages/SecurityPortal";
import Downloads from "./pages/Downloads";
import GrowthSimulator from "./pages/GrowthSimulator";
import DemoDashboard from "./pages/DemoDashboard";
import Integrations from "./pages/Integrations";
import Economy from "./pages/Economy";
import Testimonials from "./pages/Testimonials";
import Comparison from "./pages/Comparison";
import Uptime from "./pages/Uptime";
import Badges from "./pages/Badges";
import Events from "./pages/Events";
import Tutorials from "./pages/Tutorials";
import Migrate from "./pages/Migrate";
import ServerTemplates from "./pages/ServerTemplates";
import Blog from "./pages/Blog";
import Widgets from "./pages/Widgets";
import OpenSource from "./pages/OpenSource";
import Jobs from "./pages/Jobs";
import Legal from "./pages/Legal";
import AiShowcase from "./pages/AiShowcase";
import Showcase from "./pages/Showcase";
import CommunityHub from "./pages/CommunityHub";
import Pricing from "./pages/Pricing";
import Trust from "./pages/Trust";
import TestDashboardDemo from "./pages/TestDashboardDemo";

// Helper: Page mit Gate
const G = (key: string, name: string, def: boolean, El: React.ComponentType) => (
  <PageGate pageKey={key} pageName={name} defaultVisible={def}>
    <El />
  </PageGate>
);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [demoPath, setDemoPath] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    fetch("/api/system")
      .then(r => r.json())
      .then(d => {
        if (d?.demo_dashboard?.enabled && d?.demo_dashboard?.secret_path) {
          setDemoPath(d.demo_dashboard.secret_path);
        }
      })
      .catch(() => {});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <Navbar scrolled={scrolled} />
        <main className="relative z-10">
          <Routes>
            {/* Core */}
            <Route path="/" element={G("home", "Startseite", true, Home)} />
            <Route path="/dashboard" element={G("dashboard", "Dashboard", true, Dashboard)} />
            <Route path="/dashboard/:guildId" element={G("dashboard", "Dashboard", true, Dashboard)} />
            <Route path="/status" element={G("status", "Status", true, Status)} />
            <Route path="/commands" element={G("commands", "Commands", true, Commands)} />
            <Route path="/support" element={G("support", "Support", true, Support)} />
            <Route path="/changelog" element={G("changelog", "Changelog", true, Changelog)} />
            <Route path="/roadmap" element={G("roadmap", "Roadmap", true, Roadmap)} />
            <Route path="/api-docs" element={G("api_docs", "API Docs", true, ApiDocs)} />
            <Route path="/partners" element={G("partners", "Partner", true, Partners)} />
            <Route path="/emojis" element={G("emojis", "Emoji Pack", true, EmojiPack)} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Docs */}
            <Route path="/team" element={G("team", "Team", true, Team)} />
            <Route path="/docs" element={G("docs", "Dokumentation", true, Docs)} />
            <Route path="/docs/setup" element={G("docs", "Setup Guide", true, DocsSetup)} />
            <Route path="/docs/moderation" element={G("docs", "Moderation Docs", true, DocsModeration)} />
            <Route path="/docs/tickets" element={G("docs", "Ticket Docs", true, DocsTickets)} />
            <Route path="/docs/music" element={G("docs", "Music Docs", true, DocsMusic)} />
            <Route path="/docs/automod" element={G("docs", "AutoMod Docs", true, DocsAutoMod)} />

            {/* Features & Premium */}
            <Route path="/features" element={G("features", "Features", true, Features)} />
            <Route path="/premium" element={G("premium", "Premium", true, PremiumDetail)} />
            <Route path="/leaderboard" element={G("leaderboard", "Leaderboard", true, GlobalLeaderboard)} />
            <Route path="/analytics" element={G("analytics", "Analytics", true, Analytics)} />
            <Route path="/status/incidents" element={G("incidents", "Incidents", true, IncidentHistory)} />
            <Route path="/status/maintenance" element={G("maintenance", "Wartung", true, Maintenance)} />
            <Route path="/faq" element={G("faq", "FAQ", true, FaqPage)} />

            {/* Community */}
            <Route path="/branding" element={G("branding_page", "Branding", true, Branding)} />
            <Route path="/affiliate" element={G("affiliate", "Affiliate", false, Affiliate)} />
            <Route path="/contact" element={G("contact", "Kontakt", true, Contact)} />
            <Route path="/suggest" element={G("suggest", "Vorschläge", true, Suggest)} />
            <Route path="/guilds" element={G("guilds", "Gilden", false, GuildPartners)} />
            <Route path="/security" element={G("security", "Security", true, SecurityPortal)} />
            <Route path="/downloads" element={G("downloads", "Downloads", false, Downloads)} />
            <Route path="/growth" element={G("growth", "Growth Simulator", true, GrowthSimulator)} />

            {/* Extra */}
            <Route path="/integrations" element={G("integrations", "Integrationen", true, Integrations)} />
            <Route path="/economy" element={G("economy", "Economy", false, Economy)} />
            <Route path="/testimonials" element={G("testimonials", "Bewertungen", true, Testimonials)} />
            <Route path="/compare" element={G("compare", "Vergleich", true, Comparison)} />
            <Route path="/uptime" element={G("uptime", "Uptime", true, Uptime)} />
            <Route path="/badges" element={G("badges", "Badges", true, Badges)} />
            <Route path="/events" element={G("events", "Events", true, Events)} />
            <Route path="/tutorials" element={G("tutorials", "Tutorials", true, Tutorials)} />
            <Route path="/migrate" element={G("migrate", "Migration", true, Migrate)} />
            <Route path="/templates" element={G("templates", "Templates", true, ServerTemplates)} />
            <Route path="/blog" element={G("blog", "Blog", true, Blog)} />
            <Route path="/widgets" element={G("widgets", "Widgets", false, Widgets)} />
            <Route path="/open-source" element={G("open_source", "Tech Stack", false, OpenSource)} />
            <Route path="/jobs" element={G("jobs", "Karriere", false, Jobs)} />
            <Route path="/legal" element={G("legal", "Rechtliches", true, Legal)} />
            <Route path="/ai" element={G("ai", "AI Features", false, AiShowcase)} />
            <Route path="/showcase" element={G("showcase", "Showcase", true, Showcase)} />
            <Route path="/community" element={G("community", "Community", true, CommunityHub)} />
            <Route path="/pricing" element={G("pricing", "Pricing", true, Pricing)} />
            <Route path="/trust" element={G("trust", "Trust & Security", true, Trust)} />
            <Route path="/demo-dashboard-test" element={<TestDashboardDemo />} />

            {/* Verstecktes Demo-Dashboard */}
            {demoPath && <Route path={`/${demoPath}`} element={<DemoDashboard />} />}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
