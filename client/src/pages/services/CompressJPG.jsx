import React, { useState } from 'react';
import UploadSection from '../../components/UploadSection';
import axios from 'axios';
import { Loader2, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CompressJPG() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFilesSelected = (files) => {
    const selectedFile = Array.isArray(files) ? files[0] : files;
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please upload a JPG image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/pdf/compress-jpg', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'compressed.jpg');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert('Failed to compress JPG.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-2">
      <h2 className="text-3xl font-bold  text-center">Compress JPG</h2>

      <UploadSection accept="image/jpeg" onFilesSelected={handleFilesSelected} />

      {file && (
        <p className="mt-4 text-gray-400 text-sm">
          <span className="font-medium text-white">Selected:</span> {file.name}
        </p>
      )}

      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="relative mt-8 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium group disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden"
      >
        {/* Animated border effect */}
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
              Compressing...
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              Compress JPG
            </>
          )}
        </span>
      </motion.button>
    </div>
  );
}
