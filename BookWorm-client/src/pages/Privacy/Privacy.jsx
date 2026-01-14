import React from 'react';
import {
  Eye,
  ShieldCheck,
  Database,
  Globe,
  UserCheck,
  Mail,
} from 'lucide-react';

const Privacy = () => {
  const lastUpdated = 'January 14, 2026';

  const privacySections = [
    {
      icon: <Database className="text-primary" size={24} />,
      title: 'Data Collection',
      content:
        'We collect information you provide directly to us when you create an account, such as your name, email address, and library preferences. We also collect usage data to improve your experience.',
    },
    {
      icon: <Eye className="text-secondary" size={24} />,
      title: 'How We Use Data',
      content:
        'Your data helps us personalize your book recommendations, process your transactions, and send you important updates regarding your account or our service changes.',
    },
    {
      icon: <ShieldCheck className="text-success" size={24} />,
      title: 'Data Protection',
      content:
        'We implement industry-standard security measures including SSL encryption and multi-factor authentication to ensure your personal information remains confidential and secure.',
    },
    {
      icon: <Globe className="text-accent" size={24} />,
      title: 'Third-Party Sharing',
      content:
        'We do not sell your personal data. We only share information with trusted service providers who help us operate our platform, and they are bound by strict confidentiality agreements.',
    },
    {
      icon: <UserCheck className="text-info" size={24} />,
      title: 'Your Rights',
      content:
        'You have the right to access, update, or delete your personal information at any time. You can manage these settings directly from your profile dashboard.',
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 py-20 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-4xl mx-auto">
        {/* --- Header --- */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6">
            <ShieldCheck size={14} /> Secure & Private
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tighter">
            Privacy{' '}
            <span className="italic font-serif text-base-content">Policy</span>
          </h1>
          <p className="text-base-content/50 font-medium">
            Last Updated:{' '}
            <span className="text-base-content">{lastUpdated}</span>
          </p>
        </div>

        {/* --- Intro Card --- */}
        <div className="bg-base-200/50 p-10 rounded-[3rem] border border-base-300 mb-16 text-center">
          <p className="text-lg text-base-content/70 leading-relaxed italic">
            "Your privacy is our priority. We are committed to protecting your
            personal data and being transparent about how we collect and use it
            to enhance your reading journey."
          </p>
        </div>

        {/* --- Policy Grid --- */}
        <div className="space-y-6">
          {privacySections.map((section, idx) => (
            <div
              key={idx}
              className="group p-8 bg-base-100 border border-base-300 rounded-[2.5rem] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-14 h-14 shrink-0 bg-base-200 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 italic text-base-content">
                    {section.title}
                  </h3>
                  <p className="text-base-content/60 leading-relaxed font-medium">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Contact Box --- */}
        <div className="mt-20 p-12 bg-base-200 rounded-[3.5rem] border border-base-300 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl">
              <Mail className="text-primary" size={28} />
            </div>
            <h2 className="text-2xl font-black mb-4 italic">
              Privacy Concerns?
            </h2>
            <p className="text-base-content/50 max-w-md mb-8 font-medium">
              If you have any questions about how we handle your data, our
              privacy officer is ready to help.
            </p>
            <a
              href="mailto:maha609im@gmail.com"
              className="px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20"
            >
              Contact Privacy Team
            </a>
          </div>

          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldCheck size={200} />
          </div>
        </div>

        <div className="mt-16 text-center text-[10px] font-black uppercase tracking-[0.5em] text-base-content/20">
          End of Privacy Documentation
        </div>
      </div>
    </div>
  );
};

export default Privacy;
