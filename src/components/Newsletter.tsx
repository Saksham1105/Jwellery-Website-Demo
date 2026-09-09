import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section id="newsletter-section" className="py-20 sm:py-24 bg-[#1D1B19] text-[#FAF8F5] relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B76E79_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        {/* Accent Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2C2926] border border-[#B76E79]/40 text-[10px] tracking-[0.25em] uppercase text-[#B76E79]">
          <Sparkles className="w-3 h-3" />
          <span>The Aurélia Circle</span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#FAF8F5]">
          Privileged Access to Private Previews
        </h2>

        <p className="text-xs sm:text-sm text-[#D9D2C7] font-light max-w-lg mx-auto leading-relaxed">
          Be first to receive invites to new high jewelry collections, private salon appointments in Paris and New York, and bespoke editorial releases.
        </p>

        {/* Input Form */}
        {isSubmitted ? (
          <div className="p-6 bg-[#2C2926] border border-[#B76E79]/50 max-w-md mx-auto space-y-2 text-center animate-fadeIn">
            <div className="w-10 h-10 rounded-full bg-[#B76E79] text-[#1D1B19] flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#FAF8F5]">Welcome to the Circle</h3>
            <p className="text-xs text-[#D9D2C7]">
              A welcome letter and complimentary bespoke gift invitation have been sent to {email}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#9A535E] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#262422] border border-[#3E3A36] focus:border-[#B76E79] text-xs text-[#FAF8F5] placeholder:text-[#9A535E] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                id="newsletter-subscribe-btn"
                className="px-6 py-3 bg-[#B76E79] hover:bg-[#C9828D] active:bg-[#9A535E] text-[#1D1B19] text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-[#9C948B] tracking-wide mt-3">
              We respect your privacy. Unsubscribe at any moment with a single click.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
