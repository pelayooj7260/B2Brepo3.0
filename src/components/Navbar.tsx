import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">A</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">AutoSys</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="#benefits" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Benefits</a>
            <button 
              onClick={() => document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg text-white transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
