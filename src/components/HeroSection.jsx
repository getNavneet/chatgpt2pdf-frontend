import React from 'react';
import { FileDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-14 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-2">
          <div className="relative">
            <FileDown className="h-16 w-16 text-blue-500" />
            <div className="absolute -right-2 -top-2 w-6 h-6 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 mt-2">
          ChatGPT to PDF Converter
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          {/* Transform your ChatGPT conversations into beautifully formatted PDF documents with just one click. */}
          Save, share, and archive your AI interactions with ease.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {/*  */}
          {/* <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition-colors transform hover:scale-105 duration-200">
            Get Started
          </button> */}
          <button  onClick={() => navigate('/about')}
 className="px-6 py-2 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
