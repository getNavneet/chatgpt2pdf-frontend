import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chrome, Star } from 'lucide-react';

const ChromeExtension = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const apiBaseUrl = 'http://localhost:3000/contact';

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const submitMail = async () => {
    if (!email) {
      setMessage('Please enter your email address.');
      setMessageType('error');
      return;
    }

    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await axios.post(
        `${apiBaseUrl}/waitlist`,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage(response.data.message || 'Successfully joined the waitlist!');
      setMessageType('success');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to join the waitlist. Please try again.';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setEmail('');
        setMessage('');
        setMessageType('');
      }, 5000); // Clears input and message after 5 seconds

      return () => clearTimeout(timer); // Cleanup timeout on component unmount or message change
    }
  }, [message]);

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 bg-white dark:bg-gray-800 rounded-full shadow-md mb-6">
            <Chrome className="h-8 w-8 text-blue-500" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Coming Soon to Chrome
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Convert your ChatGPT conversations to PDF directly from Chrome! Our extension is in the final stages of development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full mx-auto mb-4">
                <Star className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">One-Click Convert</h3>
              <p className="text-gray-600 dark:text-gray-400">Convert conversations instantly with a single click</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full mx-auto mb-4">
                <Star className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Auto-Format</h3>
              <p className="text-gray-600 dark:text-gray-400">Beautiful formatting applied automatically</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-full mx-auto mb-4">
                <Star className="h-6 w-6 text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Batch Convert</h3>
              <p className="text-gray-600 dark:text-gray-400">Convert multiple conversations at once</p>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl inline-block">
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              🚀 Join the waitlist to be notified when we launch!
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={submitMail}
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Notify Me'}
              </button>
            </div>
            {message && (
              <div className={`mt-4 p-4 rounded-lg ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChromeExtension;
