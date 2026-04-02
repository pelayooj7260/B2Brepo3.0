import { Check, X } from 'lucide-react';

export default function WhoItsFor() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-20 text-center fade-in-up">
          This Is For You If
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                You're running a real business with real operations—not just an idea
              </p>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                You've felt the friction: manual tasks, disconnected tools, bottlenecks
              </p>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                You're curious about automation but want to understand it before committing
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                You make decisions based on clarity, not hype
              </p>
            </div>
          </div>

          <div className="fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                You're looking for someone to just "do AI stuff" without a clear outcome
              </p>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                You expect instant magic solutions that require zero input from your team
              </p>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                You're still figuring out your business model or customer base
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                You're shopping for the cheapest option rather than the right fit
              </p>
            </div>
          </div>
        </div>

        <div className="text-center fade-in-up" style={{ animationDelay: '300ms' }}>
          <p className="text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            We work <span className="text-white font-semibold">with</span> you, not <span className="text-white font-semibold">for</span> you.
            This is a collaboration—your insight into your business combined with our technical expertise.
          </p>
        </div>
      </div>
    </section>
  );
}
