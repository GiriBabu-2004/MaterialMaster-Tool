import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import Routes from './routes';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden bg-neutral-900 text-white">
        {/* Fixed Navbar */}
        <AppNavbar />

        {/* Scrollable main content with padding to avoid navbar/footer overlap */}
        <main className="flex-grow overflow-auto pt-16 pb-12">
          <Routes />
        </main>

        {/* Fixed Footer */}
        <Footer />
      </div>
    </Router>
  );
}
