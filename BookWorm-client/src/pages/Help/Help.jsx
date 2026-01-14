import React from 'react';
import {
  Search,
  Book,
  MessageCircle,
  Mail,
  Zap,
  ShieldQuestion,
  LifeBuoy,
  Phone,
} from 'lucide-react';

const Help = () => {
  const faqs = [
    {
      question: 'How do I borrow a book?',
      answer:
        "Navigate to the Browse section, click on the book details, and if you have an active membership, you can click the 'Borrow' button. The book will be added to your shelf instantly.",
    },
    {
      question: 'Can I renew my membership online?',
      answer:
        "Yes, you can renew your membership through your profile settings under the 'Subscription' tab using any of our supported payment methods.",
    },
    {
      question: 'How many books can I keep at once?',
      answer:
        'Standard members can keep up to 3 books at a time, while Premium members can keep up to 10 books simultaneously.',
    },
    {
      question: 'What happens if I return a book late?',
      answer:
        'A small late fee is applied per day. However, you can always request a 3-day extension before the due date for free.',
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 py-20 px-6 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-5xl mx-auto">
        {/* --- Hero Section --- */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tighter">
            How can we{' '}
            <span className="italic font-serif text-base-content">
              help you?
            </span>
          </h1>

          <div className="relative max-w-2xl mx-auto group">
            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for articles, guides..."
              className="w-full pl-16 pr-8 py-6 bg-base-200 border border-base-300 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-medium text-lg"
            />
          </div>
        </div>

        {/* --- Quick Support Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            {
              icon: <Book className="text-primary" />,
              title: 'Guides',
              desc: 'Step-by-step tutorials',
            },
            {
              icon: <Zap className="text-warning" />,
              title: 'Quick Start',
              desc: 'Setup your account',
            },
            {
              icon: <ShieldQuestion className="text-secondary" />,
              title: 'Safety',
              desc: 'Privacy & security',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 bg-base-100 border border-base-300 rounded-[2.5rem] hover:shadow-xl hover:border-primary/20 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 bg-base-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 italic">{item.title}</h3>
              <p className="text-base-content/50 text-sm font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- FAQ Section --- */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <LifeBuoy className="text-primary" size={32} />
            <h2 className="text-3xl font-black italic tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="collapse collapse-plus bg-base-200/50 rounded-3xl border border-base-300"
              >
                <input
                  type="radio"
                  name="my-accordion-3"
                  defaultChecked={index === 0}
                />
                <div className="collapse-title text-lg font-bold italic py-5 px-8">
                  {faq.question}
                </div>
                <div className="collapse-content px-8 opacity-70">
                  <p className="pb-5 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Contact Support Section --- */}
        <div className="bg-base-content text-base-100 rounded-[3.5rem] p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black mb-4 italic">
                Still need help?
              </h2>
              <p className="text-base-100/60 max-w-sm font-medium">
                Our team is available to assist you. Reach out via email or call
                us directly!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Call Button */}
              <a
                href="tel:01609217725"
                className="flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20"
              >
                <Phone size={20} /> 01609217725
              </a>
              {/* Email Button */}
              <a
                href="mailto:maha609im@gmail.com"
                className="flex items-center justify-center gap-3 px-8 py-5 bg-secondary text-base-200 rounded-2xl font-black uppercase tracking-widest  hover:text-base-300 transition-all shadow-sm"
              >
                <Mail size={20} /> Email Us
              </a>
            </div>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="mt-12 text-center text-base-content/30 text-xs font-black uppercase tracking-[0.3em]">
          Help Center &copy; 2026 Edition
        </div>
      </div>
    </div>
  );
};

export default Help;
