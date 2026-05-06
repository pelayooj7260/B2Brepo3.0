import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-brand-obsidian relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-outfit font-extrabold text-white mb-6 tracking-tight">THORNE</h2>
            <p className="text-white/40 max-w-sm leading-relaxed font-light">
              Architecting the next generation of autonomous B2B infrastructure. Eliminating friction through precision engineering and intelligent workflows.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-outfit font-bold mb-6 uppercase tracking-widest text-xs">Resources</h3>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#how-it-works" className="hover:text-brand-primary transition-colors">Methodology</a></li>
              <li><a href="#benefits" className="hover:text-brand-primary transition-colors">Infrastructure</a></li>
              <li><a href="#audit-form" className="hover:text-brand-primary transition-colors">Request Audit</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-outfit font-bold mb-6 uppercase tracking-widest text-xs">Connect</h3>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-brand-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-brand-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-brand-primary transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
            © {currentYear} Thorne Systems. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] text-white/20 uppercase tracking-widest font-bold">
             <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
