import React from 'react';
import { Users, Shield, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            About GPT2PDF
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              GPT2PDF was born from a simple idea: making it easy for everyone to preserve and share their valuable ChatGPT conversations. Our tool transforms your AI interactions into beautifully formatted PDF documents that you can save, share, or reference later.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-400">Convert your conversations in seconds with our optimized processing</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Secure & Private</h3>
                <p className="text-gray-600 dark:text-gray-400">Your conversations are processed securely and never stored on our servers</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">User Focused</h3>
                <p className="text-gray-600 dark:text-gray-400">Built with user experience in mind, making conversion a breeze</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-300 mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              We're committed to making knowledge sharing easier in the AI age. By providing tools that help you preserve and share your AI interactions, we're helping bridge the gap between artificial intelligence and human collaboration.
            </p>

            <h2 className="text-2xl font-bold text-gray-300 mb-4">The Team</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              This project is developed from scratch by <a href="https://www.linkedin.com/in/getnavneet/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Navneet</a>, a passionate developer dedicated to creating tools that enhance productivity and collaboration in the digital age. With a focus on simplicity and user experience, Navneet aims to make AI tools accessible to everyone.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-300 mb-4">Our Values</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3 mt-1">✓</span>
                  <div>
                    <h3 className="font-semibold text-gray-300">Simplicity</h3>
                    <p className="text-gray-600 dark:text-gray-400">We believe great tools should be easy to use</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3 mt-1">✓</span>
                  <div>
                    <h3 className="font-semibold text-gray-300">Privacy</h3>
                    <p className="text-gray-600 dark:text-gray-400">Your data security is our top priority</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3 mt-1">✓</span>
                  <div>
                    <h3 className="font-semibold text-gray-300">Innovation</h3>
                    <p className="text-gray-600 dark:text-gray-400">Constantly improving and evolving our services</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;