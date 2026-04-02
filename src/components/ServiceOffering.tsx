export default function ServiceOffering() {
  return (
    <section className="py-32 px-6 bg-zinc-900/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 text-center fade-in-up">
          Start With a Free<br />Automation Audit
        </h2>

        <div className="space-y-8 fade-in-up" style={{ animationDelay: '100ms' }}>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Before any commitment, we review your current workflows and identify specific opportunities
            where automation could save time, reduce errors, or eliminate manual work.
          </p>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            You'll walk away with a clear understanding of:
          </p>

          <ul className="space-y-4 ml-6">
            <li className="text-lg md:text-xl text-gray-300 leading-relaxed flex items-start gap-3">
              <span className="text-white font-bold mt-1">•</span>
              <span>Where your team is losing the most time to manual processes</span>
            </li>
            <li className="text-lg md:text-xl text-gray-300 leading-relaxed flex items-start gap-3">
              <span className="text-white font-bold mt-1">•</span>
              <span>Which workflows are realistic candidates for automation</span>
            </li>
            <li className="text-lg md:text-xl text-gray-300 leading-relaxed flex items-start gap-3">
              <span className="text-white font-bold mt-1">•</span>
              <span>What a practical implementation path could look like</span>
            </li>
          </ul>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed pt-8">
            No sales pitch. No pressure. Even if we never work together, you'll have clarity you didn't have before.
          </p>
        </div>
      </div>
    </section>
  );
}
