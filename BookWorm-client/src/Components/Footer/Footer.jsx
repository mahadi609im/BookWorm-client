import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaLinkedinIn, FaGithub, FaGlobe } from 'react-icons/fa';
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from 'react-icons/hi';

const Footer = () => {
  const socialIcon = [
    {
      Icon: FaFacebookF,
      link: 'https://facebook.com/mahadi609im',
      label: 'Facebook',
    },
    {
      Icon: FaLinkedinIn,
      link: 'https://linkedin.com/in/mahadi609im',
      label: 'LinkedIn',
    },
    {
      Icon: FaGithub,
      link: 'https://github.com/mahadi609im',
      label: 'Github',
    },
    {
      Icon: FaGlobe,
      link: 'https://mahaportfolio-609im.netlify.app/',
      label: 'Portfolio',
    },
  ];

  const supportLink = [
    {
      name: 'Terms of Service',
      path: '/terms',
    },
    {
      name: 'Privacy Policy',
      path: '/privacy',
    },
    {
      name: 'Help Center',
      path: '/help',
    },
  ];
  return (
    <footer className="bg-base-200 border-t border-base-300 pt-16 pb-8 relative overflow-hidden transition-colors duration-500">
      {/* Background Decor - Increased Opacity for better visibility in Light Mode */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 dark:bg-primary/10 blur-[100px] rounded-full pointer-events-none transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 dark:bg-accent/10 blur-[100px] rounded-full pointer-events-none transition-opacity"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-bold italic tracking-tight text-base-content">
              Book<span className="text-primary">Worm</span>
            </h2>
            <p className="text-sm text-base-content/70 leading-relaxed italic">
              Your sanctuary for stories. Track your progress, discover new
              worlds, and join a community of passionate readers.
            </p>
            <div className="flex gap-4 pt-2">
              {socialIcon.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-base-100 border border-base-300 flex items-center justify-center text-base-content/50 hover:text-primary hover:border-primary hover:shadow-lg transition-all active:scale-90"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-base-content/40 mb-6">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                'Browse Books',
                'My Library',
                'Tutorials',
                'Reading Challenge',
              ].map(link => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm font-bold text-base-content/80 hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 transition-all duration-300 h-[2px] bg-primary mr-0 group-hover:mr-2"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-base-content/40 mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLink.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.path}
                    className="text-sm font-bold text-base-content/80 hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-base-content/40 mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-base-content/80">
                <HiOutlineLocationMarker
                  className="text-primary mt-1 shrink-0"
                  size={20}
                />
                <span className="text-sm font-medium">
                  Gazipur, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3 text-base-content/80">
                <HiOutlineMail className="text-primary shrink-0" size={20} />
                <span className="text-sm font-medium">maha609im@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-base-content/80">
                <HiOutlinePhone className="text-primary shrink-0" size={20} />
                <span className="text-sm font-medium">+880 1609-216725</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Adaptive Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-base-300 to-transparent w-full mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] uppercase font-bold tracking-widest text-base-content/40 text-center md:text-left">
            © 2026 BookWorm App. Crafted for the love of reading.
          </p>

          <div className="flex items-center gap-2 px-4 py-2 bg-base-100/50 backdrop-blur-sm rounded-2xl border border-base-300 shadow-sm group hover:border-primary/50 transition-all cursor-default">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(0,89,255,0.5)]"></div>
            <span className="text-[9px] uppercase font-bold text-base-content/60 tracking-tighter">
              System Status: All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
