import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from './Button';
import InputField from './InputField';
import { MessageSquare } from 'lucide-react';

const FeedbackForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 

  const apiBaseUrl = 'https://api.rugdi.in/contact';

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/feedback`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage(response.data.message);
      setMessageType('success');
      reset(); // Clear input fields

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      setMessage(errorMessage);
      setMessageType('error');
      console.error(error);
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <MessageSquare className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Share Your Feedback
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Help us improve our service by sharing your experience
            </p>
          </div>

          {message && (
            <div
              className={`mb-4 p-4 rounded-lg text-white ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
            <InputField
              label="Name"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
              placeholder="Your name"
            />

            <InputField
              label="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email?.message}
              placeholder="your@email.com"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Feedback
              </label>
              <textarea
                {...register('feedback', { required: 'Feedback is required' })}
                className="w-full px-4 py-2 border text-white border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 min-h-[120px]"
                placeholder="Share your thoughts..."
              ></textarea>
              {errors.feedback && (
                <p className="mt-1 text-sm text-red-500">{errors.feedback.message}</p>
              )}
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;
