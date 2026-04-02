export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400">
          {currentYear} AI Automation Agency. Building systems that work.
        </p>
      </div>
    </footer>
  );
}
