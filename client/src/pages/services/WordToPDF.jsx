import React, { useState } from 'react';
import UploadSection from '../../components/UploadSection';
import axios from 'axios';
import { Loader2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WordToPDF() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelected = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please upload a Word document (.doc or .docx).');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/pdf/word-to-pdf', formData, {
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Failed to convert Word to PDF. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h2 className="text-3xl font-bold  text-center">Convert Word to PDF</h2>

      <UploadSection accept=".doc,.docx" onFilesSelected={handleFileSelected} />

      {file && (
        <div className="mt-4 text-sm text-gray-400 max-w-md w-full text-center">
          <span className="font-medium text-white">File to convert:</span> {file.name}
        </div>
      )}

      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="relative mt-8 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium group disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden"
      >
        <motion.span
          className="absolute inset-0 border border-white rounded-md opacity-30 group-hover:animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <span className="relative flex items-center gap-2 z-10">
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Converting...
            </>
          ) : (
            <>
              <FileText className="h-5 w-5" />
              Convert to PDF
            </>
          )}
        </span>
      </motion.button>
    </div>
  );
}
