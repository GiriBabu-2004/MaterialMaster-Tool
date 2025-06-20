import React, { useState } from 'react';
import UploadSection from '../../components/UploadSection';
import axios from 'axios';
import { Loader2, FileStack } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilesSelected = (selectedFiles) => {
    setFiles(Array.isArray(selectedFiles) ? selectedFiles : [selectedFiles]);
  };

  const handleSubmit = async () => {
    if (files.length < 2) {
      alert('Please upload at least two PDF files.');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file); // same key for all files
    });

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/pdf/merge', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'merged.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Merge error:', error);
      alert('Failed to merge PDF files.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h2 className="text-3xl font-bold  text-center">Merge PDF Files</h2>

      <UploadSection accept="application/pdf" multiple onFilesSelected={handleFilesSelected} />

      {files.length > 0 && (
        <div className="mt-4 text-sm text-gray-400 max-w-md w-full">
          <span className="font-medium text-white">Files to merge:</span>
          <ul className="list-disc list-inside mt-1">
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="relative mt-8 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium group disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden"
      >
        {/* Animated border */}
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
              Merging...
            </>
          ) : (
            <>
              <FileStack className="h-5 w-5" />
              Merge PDFs
            </>
          )}
        </span>
      </motion.button>
    </div>
  );
}
