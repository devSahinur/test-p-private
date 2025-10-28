'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { SITE_CONFIG } from '@/lib/config';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission (you can add actual backend logic here)
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Contact form submitted:', formData);
    setSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  // Structured data for contact page SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Us - EpornerHub",
    "description": "Get in touch with EpornerHub. Contact us for support, partnerships, advertising, or general inquiries.",
    "url": "http://localhost:3003/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "EpornerHub",
      "email": "support@epornerhub.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "support@epornerhub.com",
        "availableLanguage": "English"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-gray-400 text-lg">
              Have questions or feedback? We&apos;d love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
                  <p className="text-gray-400 text-sm">
                    Feel free to reach out to us with any questions, concerns, or feedback.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-400 text-sm">support@epornerhub.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-white font-medium">Response Time</p>
                      <p className="text-gray-400 text-sm">Within 24-48 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <div>
                      <p className="text-white font-medium">Availability</p>
                      <p className="text-gray-400 text-sm">24/7 Support</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-800">
                  <h4 className="text-white font-medium mb-3">Common Topics</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      <span>Technical Support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      <span>Content Issues</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      <span>Partnership Inquiries</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      <span>Advertising</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                      <span>General Feedback</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 bg-opacity-20 rounded-full mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">
                      Thank you for contacting us. We&apos;ll get back to you soon!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="technical">Technical Support</option>
                        <option value="content">Content Issues</option>
                        <option value="partnership">Partnership Inquiries</option>
                        <option value="advertising">Advertising</option>
                        <option value="feedback">General Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="agree"
                        required
                        className="mt-1 w-4 h-4 bg-gray-800 border-gray-700 rounded text-orange-500 focus:ring-2 focus:ring-orange-500"
                      />
                      <label htmlFor="agree" className="text-sm text-gray-400">
                        I agree that I am 18+ years old and accept the terms of service and privacy policy.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      We typically respond within 24-48 hours. For urgent matters, please check our FAQ section.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p className="text-lg font-semibold text-white mb-2">{SITE_CONFIG.name}</p>
            <p className="mb-4">{SITE_CONFIG.description}</p>

            <div className="border-t border-gray-800 pt-6 mt-6">
              <p className="text-sm mb-2">
                <strong className="text-gray-300">Powered by Eporner API</strong>
              </p>
              <p className="text-xs text-gray-500 mb-4">
                All videos are embedded from Eporner.com using their official API.
                We do not host any content. Content is provided by Eporner.
              </p>
              <p className="text-xs text-gray-600">
                &copy; 2024 {SITE_CONFIG.name} • 18+ Only • Not affiliated with Eporner
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
