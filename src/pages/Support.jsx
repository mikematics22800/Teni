import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../../firebase';

export default function Support() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (!formData.subject.trim() || !formData.message.trim()) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    const user = getCurrentUser();
    if (!user) {
      setError('You must be logged in to send support messages');
      setIsSubmitting(false);
      return;
    }

    try {
      const functions = getFunctions(app);
      const sendSupportEmail = httpsCallable(functions, 'sendSupportEmail');
      
      await sendSupportEmail({
        subject: formData.subject,
        message: formData.message
      });

      setSuccess('Your support message has been sent successfully!');
      setFormData({ subject: '', message: '' });
    } catch (error) {
      setError(error.message || 'Failed to send support message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 mt-20 h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="w-md bg-gray-200 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Contact Support</h2>
          <p className="mt-2 text-sm text-gray-600">
            Have a question or need help? Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-100 rounded-md justify-center flex">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 text-sm text-green-600 bg-green-100 rounded-md justify-center flex">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              className="mt-1 block w-full rounded-md p-2 bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="What's your issue about?"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={6}
              required
              className="mt-1 block w-full rounded-md bg-white border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
              placeholder="Please describe your issue in detail..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}