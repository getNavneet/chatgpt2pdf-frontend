import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { Link, FileText, Check, AlertCircle, Clipboard } from 'lucide-react';
import Button from './Button';
import InputField from './InputField';

const ConverterCard = () => {
  const [chatGptUrl, setChatGptUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState('Converting your conversation to PDF...');
  // Use environment variable or EC2 HTTPS URL
  const apiBaseUrl = 'https://api.rugdi.in/api';
        const attemptsRef = useRef(0); // persists across renders


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chatGptUrl.trim()) {
      setError('Please enter a ChatGPT conversation URL');
      setStatus('error');
      return;
    }

    if (!chatGptUrl.includes('chatgpt.com/share')) {
      setError('Please enter a valid ChatGPT share URL (e.g., https://chatgpt.com/share/...)');
      setStatus('error');
      return;
    }

    setError('');
    setStatus('loading');
    setJobId(null);

    try {
      const response = await axios.post(`${apiBaseUrl}/generate-pdf`, { url: chatGptUrl });
      const newJobId = response.data.jobId;
      setJobId(newJobId);
      setLoadingMsg('Processing Url, please wait...');

      const maxAttempts = 30;

     const checkStatus = async () => {
  try {
    const statusResponse = await axios.get(`${apiBaseUrl}/status/${newJobId}`);
    
    if (statusResponse.data.ready) {
      window.location.href = `${apiBaseUrl}/download/${newJobId}`;
      setStatus('success');
    } else if (attemptsRef.current <= maxAttempts) {
      attemptsRef.current++;

      if (attemptsRef.current <= 3) {
        setLoadingMsg('Extracting Content...');
      } else if (attemptsRef.current <= 8) {
        setLoadingMsg('Processing Content...');
      } else if (attemptsRef.current <= 15) {
        setLoadingMsg('Formatting PDF...');
      } else if (attemptsRef.current <= 20) {
        setLoadingMsg('Finalizing PDF...');
      } else if (attemptsRef.current <= 30) {
        setLoadingMsg('Almost there, just a bit longer...');
      }

      setTimeout(checkStatus, 2000); // Retry in 2s
    } else {
      setStatus('timeout');
    }
  } catch (err) {
    console.error("Error checking status", err);
    setStatus('error');
    setTimeout(checkStatus, 2000); // Retry on error
  }
};
      setTimeout(checkStatus, 6000); // Start polling
    } catch (err) {
      console.error("Error generating PDF:", err);
      setError(err.response?.data?.error || 'Failed to generate PDF');
      setStatus('error');
    }
  };

   

  // const handleCopy = () => {
  //   if (jobId) {
  //     const downloadUrl = `${apiBaseUrl}/download/${jobId}`;
  //     navigator.clipboard.writeText(downloadUrl);
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 2000);
  //   }
  // };

  const resetForm = () => {
    setChatGptUrl('');
    setStatus('idle');
    setError('');
    setJobId(null);
  };

  return (
    <section className="pt-2 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Convert Your Conversation
              </h2>

              {(status === 'idle' || status === 'error') && (
                <form onSubmit={handleSubmit}>
                  <InputField
                    label="ChatGPT Conversation URL"
                    placeholder="https://chatgpt.com/share/..."
                    value={chatGptUrl}
                    onChange={(e) => setChatGptUrl(e.target.value)}
                    icon={<Link className="h-5 w-5 text-gray-400" />}
                    fullWidth
                    error={error}
                    className={`w-full px-4 py-2 border rounded-md 
    border-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.6)] 
    bg-white text-white placeholder-gray-400 
    focus:outline-none focus:ring-0` }
                  />
                  <div className="mt-6">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={status === 'loading'}
                      icon={<FileText className="h-5 w-5" />}
                    >
                      Convert to PDF
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Paste the URL of your ChatGPT conversation to convert it into a beautifully formatted PDF document.
                  </p>
                </form>
              )}

              {status === 'loading' && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        
                  <p className="text-gray-700 dark:text-gray-300">
                    {loadingMsg ? ` ${loadingMsg}` : 'Converting your conversation to PDF... '}
                  </p>
                </div>
              )}

              {status === 'success' && (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Conversion Successful!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your ChatGPT conversation has been converted to PDF and downloaded.
                  </p>

                  {jobId && (
                    <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-lg p-3 mb-4">
                      <div className="flex-1 truncate">
                        <a
                          href={`${apiBaseUrl}/download/${jobId}`}
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download PDF
                        </a>
                      </div>
                      {/* coppy button dont needed */}
                      {/* <button
                        onClick={handleCopy}
                        className="ml-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <Clipboard className="h-5 w-5 text-gray-500" />
                        )}
                      </button> */}
                    </div>
                  )}

                  <div className="flex space-x-4 mt-6">
                    <Button
                      variant="primary"
                      className="flex-1"
                      onClick={() => window.open(`${apiBaseUrl}/download/${jobId}`, '_blank')}
                    >
                      Download Again
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={resetForm}
                    >
                      Convert Another
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 sm:px-8">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your conversations are processed securely. We do not store the content of your chats.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-transform hover:scale-105">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Conversion</h3>
              <p className="text-gray-600 dark:text-gray-400">Convert your conversations to PDF in seconds.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-transform hover:scale-105">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Process</h3>
              <p className="text-gray-600 dark:text-gray-400">Your data is processed securely and never stored.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-transform hover:scale-105">
              <div className="rounded-full bg-teal-100 dark:bg-teal-900 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beautiful Format</h3>
              <p className="text-gray-600 dark:text-gray-400">Clean, professional layout for your PDF documents.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConverterCard;