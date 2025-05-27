import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ConverterCard from './components/ConverterCard';
import ChromeExtension from './components/ChromeExtension';
import FeedbackForm from './components/FeedbackForm';
import ContactForm from './components/ContactForm';
import About from './pages/About';
import FAQ from './pages/FAQ';

function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <ConverterCard />
                <ChromeExtension />
                <FeedbackForm />
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<ContactForm />} />
          </Routes>
        </main>
        <footer className="py-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ChatGPT to PDF Converter. All rights reserved.
            <br/><span className='italic'>Developed from scratch by <a href='https://www.linkedin.com/in/getnavneet/' target='_blank' className='underline'>Navneet</a></span>
          </p>
        </footer>
      </Layout>
    </Router>
  );
}

export default App;