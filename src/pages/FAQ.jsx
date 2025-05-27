import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(0);

  const faqs = [
    {
      question: "How does GPT2PDF work?",
      answer: "GPT2PDF converts your ChatGPT conversations into PDF format by processing the conversation URL you provide. It maintains the formatting and structure of your chat while creating a professional-looking document that's easy to share and archive."
    },
    {
      question: "Is it free to use?",
      answer: "Yes, GPT2PDF is currently free to use for basic conversions. We plan to introduce premium features in the future while keeping the core functionality free."
    },
    {
      question: "How secure is my conversation data?",
      answer: "We take security seriously. Your conversations are processed securely and are never stored on our servers. The conversion happens in real-time, and once complete, all data is automatically deleted."
    },
    {
      question: "What formats are supported?",
      answer: "Currently, we support PDF output format. We're working on adding more export options like DOCX and HTML in future updates."
    },
    {
      question: "Can I customize the PDF output?",
      answer: "Basic customization options are available, including dark/light theme. More customization options will be added in future updates."
    },
    {
      question: "Is there a limit to conversation length?",
      answer: "There's no strict limit, but we recommend keeping conversations under 10,000 messages for optimal performance."
    },
    {
      question: "When will the Chrome extension be available?",
      answer: "Our Chrome extension is currently in development and will be available soon. Join our waitlist to be notified when it launches!"
    },
    {
      question: "How can I report issues or suggest features?",
      answer: "You can use our feedback form or contact us directly through the contact page. We value your input and actively work on improving our service based on user feedback."
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h1>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-300 mb-2">Still have questions?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We're here to help! Reach out to us through our contact form.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;