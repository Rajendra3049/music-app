'use client';

import {
  CONTACT_PAGE,
  CONTACT_SUBJECTS,
  OWNER_EMAIL,
  OWNER_LOCATION,
  OWNER_PHONE,
  OWNER_SOCIAL
} from '@/constants/owner-info';
import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Music2, Phone, Upload, X, Youtube } from 'lucide-react';
import { useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const socialLinks = [
  {
    name: 'Instagram',
    icon: Instagram,
    href: OWNER_SOCIAL.instagram.url,
    handle: OWNER_SOCIAL.instagram.handle
  },
  {
    name: 'YouTube',
    icon: Youtube,
    href: OWNER_SOCIAL.youtube.url,
    handle: OWNER_SOCIAL.youtube.handle
  }
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  file?: File;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size should be less than 10MB');
        return;
      }
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: undefined }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size should be less than 10MB');
        return;
      }
      setFormData(prev => ({ ...prev, file }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative py-20 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400"
          >
            {CONTACT_PAGE.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xl text-gray-300"
          >
            {CONTACT_PAGE.subtitle}
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-12 px-4 sm:px-6"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">{CONTACT_PAGE.formTitle}</h2>
            <p className="text-gray-400 mb-6">{CONTACT_PAGE.formSubtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      errors.name ? 'border-red-500' : 'border-white/20'
                    } text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                      errors.email ? 'border-red-500' : 'border-white/20'
                    } text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                    errors.subject ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                >
                  <option value="">Select a subject</option>
                  {CONTACT_SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                    errors.message ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Attach File (Optional)
                </label>
                <motion.div
                  className="relative"
                  initial={false}
                  animate={{ borderColor: formData.file ? 'rgb(168, 85, 247)' : 'rgba(255, 255, 255, 0.2)' }}
                >
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`
                      relative flex flex-col items-center justify-center p-8
                      border-2 border-dashed rounded-lg cursor-pointer
                      bg-white/5 hover:bg-white/10 transition-all
                      ${formData.file ? 'border-purple-500' : 'border-white/20'}
                    `}
                  >
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx,.txt,.mp3,.wav"
                    />
                    
                    {formData.file ? (
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-purple-400 mb-2">
                          <Music2 className="w-6 h-6" />
                          <span className="text-sm font-medium">{formData.file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFile();
                          }}
                          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-purple-500/20">
                          <Upload className="w-6 h-6 text-purple-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-300 mb-1">
                          Drop your file here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500">
                          Supports PDF, DOC, TXT, MP3, WAV (max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-500 text-center mt-4">
                  Message sent successfully! We'll get back to you soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center mt-4">
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Info */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-12 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Mail className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <a
                href={`mailto:${OWNER_EMAIL}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {OWNER_EMAIL}
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Phone className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
              <a
                href={`tel:${OWNER_PHONE}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {OWNER_PHONE}
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <MapPin className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{CONTACT_PAGE.locationTitle}</h3>
              <p className="text-gray-400">{OWNER_LOCATION}</p>
              <p className="text-sm text-gray-500 mt-2">{CONTACT_PAGE.locationSubtitle}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Social Media */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-12 px-4 sm:px-6"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-bold text-white mb-2"
          >
            {CONTACT_PAGE.socialTitle}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-400 mb-8"
          >
            {CONTACT_PAGE.socialSubtitle}
          </motion.p>

          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={fadeInUp}
              >
                <link.icon className="w-6 h-6 text-purple-400" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {link.handle}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
} 