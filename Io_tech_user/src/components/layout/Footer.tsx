'use client';

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  );

  const TwitterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" clipRule="evenodd" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.009.388a6.578 6.578 0 00-2.378 1.548 6.578 6.578 0 00-1.548 2.378C.876 4.825.754 5.399.72 6.347.685 7.295.672 7.702.672 11.323c0 3.621.013 4.028.048 4.976.034.948.156 1.522.34 2.033a6.578 6.578 0 001.548 2.378 6.578 6.578 0 002.378 1.548c.511.184 1.085.306 2.033.34.948.035 1.355.048 4.976.048 3.621 0 4.028-.013 4.976-.048.948-.034 1.522-.156 2.033-.34a6.578 6.578 0 002.378-1.548 6.578 6.578 0 001.548-2.378c.184-.511.306-1.085.34-2.033.035-.948.048-1.355.048-4.976 0-3.621-.013-4.028-.048-4.976-.034-.948-.156-1.522-.34-2.033a6.578 6.578 0 00-1.548-2.378A6.578 6.578 0 0016.066.388C15.555.204 14.981.082 14.033.048 13.085.013 12.678 0 12.017 0zm0 2.16c3.557 0 3.98.014 5.387.048.817.037 1.262.171 1.558.285.391.152.67.334.964.628.294.294.476.573.628.964.114.296.248.741.285 1.558.034 1.407.048 1.83.048 5.387 0 3.557-.014 3.98-.048 5.387-.037.817-.171 1.262-.285 1.558-.152.391-.334.67-.628.964a2.596 2.596 0 01-.964.628c-.296.114-.741.248-1.558.285-1.407.034-1.83.048-5.387.048-3.557 0-3.98-.014-5.387-.048-.817-.037-1.262-.171-1.558-.285a2.596 2.596 0 01-.964-.628 2.596 2.596 0 01-.628-.964c-.114-.296-.248-.741-.285-1.558-.034-1.407-.048-1.83-.048-5.387 0-3.557.014-3.98.048-5.387.037-.817.171-1.262.285-1.558.152-.391.334-.67.628-.964a2.596 2.596 0 01.964-.628c.296-.114.741-.248 1.558-.285 1.407-.034 1.83-.048 5.387-.048z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M12.017 15.33a3.33 3.33 0 110-6.66 3.33 3.33 0 010 6.66zm0-8.493a5.163 5.163 0 100 10.326 5.163 5.163 0 000-10.326zM18.407 6.831a1.207 1.207 0 11-2.414 0 1.207 1.207 0 012.414 0z" clipRule="evenodd" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );

  const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );

  const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-6">
              <img 
                src="https://placehold.co/160x60/483a2d/ffffff?text=LOGO" 
                alt="Company Logo" 
                className="h-12 mb-4" 
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Al Safar & Partners Law Firm
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Providing exceptional legal services with integrity, expertise, and dedication. 
                Your trusted partner for all legal matters in the region.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-[#483a2d]/10 rounded-lg">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="font-semibold">+966 11 234 5678</p>
                  <p className="text-sm">Mon-Thu 8AM-6PM, Sun 8AM-4PM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-[#483a2d]/10 rounded-lg">
                  <MailIcon />
                </div>
                <div>
                  <p className="font-semibold">info@alsafarpartners.com</p>
                  <p className="text-sm">We reply within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-[#483a2d]/10 rounded-lg">
                  <LocationIcon />
                </div>
                <div>
                  <p className="font-semibold">Riyadh, Saudi Arabia</p>
                  <p className="text-sm">King Fahd Road, Business District</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                'About Us',
                'Our Services', 
                'Our Team',
                'Case Studies',
                'Blog & Insights',
                'Career Opportunities'
              ].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-[#483a2d] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Services */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Legal Services</h4>
            <ul className="space-y-4">
              {[
                'Corporate Law',
                'Commercial Litigation',
                'Contract Drafting',
                'Intellectual Property',
                'Real Estate Law',
                'International Trade'
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-[#483a2d] transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-[#483a2d] to-gray-700 rounded-2xl p-8 text-white">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-200 mb-6">
                Subscribe to our newsletter for the latest legal insights and industry updates.
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-white/20 outline-none"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-white text-[#483a2d] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-600">
              <p className="text-sm">
                © {currentYear} Al Safar & Partners Law Firm. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-[#483a2d] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#483a2d] transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-[#483a2d] transition-colors">Legal Disclaimer</a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 mr-2">Follow us:</span>
              <div className="flex gap-3">
                {[
                  { icon: FacebookIcon, label: 'Facebook', href: '#' },
                  { icon: TwitterIcon, label: 'Twitter', href: '#' },
                  { icon: LinkedInIcon, label: 'LinkedIn', href: '#' },
                  { icon: InstagramIcon, label: 'Instagram', href: '#' }
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-white hover:bg-[#483a2d] hover:border-[#483a2d] transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-lg"
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;