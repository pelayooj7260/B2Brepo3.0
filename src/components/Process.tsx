export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'You Submit a Request',
      description: "Fill out the form below. Tell us about your business and what's slowing you down."
    },
    {
      number: '02',
      title: 'We Review Your Situation',
      description: "We'll look at what you've shared and determine if there's a good fit for a conversation."
    },
    {
      number: '03',
      title: 'We Schedule a Call',
      description: "If it makes sense, we'll set up a brief call to discuss your workflows in more detail."
    },
    {
      number: '04',
      title: 'You Get Your Audit',
      description: "We'll deliver a clear breakdown of opportunities, with no obligation to move forward."
    }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-20 text-center fade-in-up">
          How It Works
        </h2>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex gap-8 fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="text-5xl md:text-6xl font-bold text-gray-700">
                  {step.number}
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
