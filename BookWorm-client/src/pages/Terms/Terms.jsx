import React from 'react';
import {
  ShieldCheck,
  Scale,
  Lock,
  RefreshCcw,
  AlertCircle,
} from 'lucide-react';

const Terms = () => {
  const lastUpdated = 'October 20, 2023';

  const sections = [
    {
      icon: <Scale className="text-primary" size={24} />,
      title: '1. Acceptance of Terms',
      content:
        'By accessing and using our platform, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you are prohibited from using the service.',
    },
    {
      icon: <Lock className="text-primary" size={24} />,
      title: '2. User Accounts',
      content:
        'When you create an account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account and for keeping your password secure.',
    },
    {
      icon: <ShieldCheck className="text-primary" size={24} />,
      title: '3. Intellectual Property',
      content:
        'The service and its original content, features, and functionality are and will remain the exclusive property of our platform and its licensors.',
    },
    {
      icon: <RefreshCcw className="text-primary" size={24} />,
      title: '4. Modifications',
      content:
        "We reserve the right to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days' notice before any new terms take effect.",
    },
    {
      icon: <AlertCircle className="text-primary" size={24} />,
      title: '5. Limitation of Liability',
      content:
        'In no event shall our platform be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.',
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 py-20 px-6">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-base-content/60 font-medium italic">
          Last Updated: {lastUpdated}
        </p>
        <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full opacity-20"></div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-base-200/50 p-8 rounded-[2.5rem] border border-base-200 backdrop-blur-sm mb-12">
          <p className="text-lg text-base-content/70 leading-relaxed italic">
            Please read these terms and conditions carefully before using our
            service. These terms outline the rules and regulations for the use
            of our website and services.
          </p>
        </div>

        {/* Dynamic Sections */}
        <div className="grid gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group p-8 bg-base-100 border border-base-300 rounded-3xl hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-base-content italic">
                  {section.title}
                </h2>
              </div>
              <p className="text-base-content/60 leading-relaxed pl-14">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Footer */}
        <div className="mt-16 p-10 bg-primary text-primary-content rounded-[3rem] text-center shadow-2xl shadow-primary/20">
          <h3 className="text-2xl font-black mb-4 italic">
            Have questions about our terms?
          </h3>
          <p className="opacity-80 mb-6 font-medium">
            If you have any questions, please contact our legal team at:
          </p>
          <a
            href="mailto:maha609im@gmail.com"
            className="px-8 py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default Terms;
