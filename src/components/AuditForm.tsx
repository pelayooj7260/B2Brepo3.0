import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { submitAuditRequest, type AuditRequest } from '../lib/submitForm';

export default function AuditForm() {
  const [formData, setFormData] = useState<AuditRequest>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitAuditRequest(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="audit-form" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="fade-in-up mb-16 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Request Your Audit
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Share a bit about your business and the challenges you're facing.
            We'll review and get back to you within 48 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 fade-in-up" style={{ animationDelay: '100ms' }}>
          <div>
            <label htmlFor="name" className="block text-lg text-gray-300 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-lg focus:outline-none focus:border-white transition-colors"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-6 py-4 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-lg focus:outline-none focus:border-white transition-colors"
              placeholder="john@company.com"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-lg text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-6 py-4 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-lg focus:outline-none focus:border-white transition-colors"
              placeholder="Acme Inc."
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg text-gray-300 mb-2">
              Tell us about your situation
            </label>
            <textarea
              id="message"
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-6 py-4 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-lg focus:outline-none focus:border-white transition-colors resize-none"
              placeholder="What processes are slowing you down? What tools are you currently using? What would success look like?"
            />
          </div>

          {submitStatus === 'success' && (
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-lg">
                Thank you! We've received your request and will be in touch within 48 hours.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-lg">
                Something went wrong. Please try again or email us directly.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-xl font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-gray-400 text-sm">
            We respect your privacy. Your information will never be shared.
          </p>
        </form>
      </div>
    </section>
  );
}
