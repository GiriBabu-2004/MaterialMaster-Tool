import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';

// Services
import MergePDF from './pages/services/MergePDF';
import CompressPDF from './pages/services/CompressPDF';
import WordToPDF from './pages/services/WordToPDF';
import PDFToWord from './pages/services/PDFToWord';
import CompressJPG from './pages/services/CompressJPG';
import JPGToPDF from './pages/services/JPGToPDF';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />

      <Route path="/services/merge-pdf" element={<MergePDF />} />
      <Route path="/services/compress-pdf" element={<CompressPDF />} />
      <Route path="/services/word-to-pdf" element={<WordToPDF />} />
      <Route path="/services/pdf-to-word" element={<PDFToWord />} />
      <Route path="/services/jpg-to-pdf" element={<JPGToPDF />} />
      <Route path='/services/compress-jpg' element={<CompressJPG />}/>
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
}
