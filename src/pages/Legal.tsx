import { Link } from "react-router-dom";
import { FileText, Shield, Scale } from "lucide-react";
export default function Legal() {
  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 anim-up">
        <h1 className="text-4xl sm:text-5xl font-black mb-3">Rechtliche <span className="text-gradient">Hinweise</span></h1>
        <p className="text-gray-400">Alle rechtlichen Dokumente und Richtlinien von BotForge.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Terms of Service", desc: "Nutzungsbedingungen für den Bot und das Dashboard.", icon: FileText, to: "/terms" },
          { title: "Privacy Policy", desc: "Datenschutzrichtlinie gemäß DSGVO.", icon: Shield, to: "/privacy" },
          { title: "Impressum", desc: "Angaben gemäß § 5 TMG.", icon: Scale, to: "/terms" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <Link key={i} to={item.to} className="glass p-6 hover-lift card-shine block anim-up text-center" style={{animationDelay:`${i*0.1}s`}}>
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
