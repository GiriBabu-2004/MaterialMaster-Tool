import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UploadSection({ accept, multiple = false, onFilesSelected }) {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selected = multiple ? Array.from(e.target.files) : e.target.files[0];
    if (!selected) return;
    onFilesSelected(selected);
  };

  const openFileDialog = () => fileInputRef.current.click();

  return (
    <div 
      className="flex items-center justify-center bg-gray-950 w-full px-4"
      style={{ minHeight: 'calc(100vh - 4rem - 3rem)' }} // viewport minus navbar (64px) and footer (48px)
    >
      <motion.div
        initial={{ opacity: 0.8, scale: 0.98 }}
        whileHover={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.96 }}
        onClick={openFileDialog}
        className="border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors w-full max-w-md max-h-full overflow-auto bg-gray-900 border-gray-700"
        style={{ 
          // allow it to shrink and scroll internally if content grows
          maxHeight: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-gray-800">
            <UploadCloud className="h-12 w-12 text-blue-400 animate-bounce" />
          </div>
          <p className="text-gray-300 text-lg font-medium text-center">
            {multiple
              ? 'Click or drag & drop files to upload'
              : 'Click or drag & drop a file to upload'}
          </p>
          {accept && (
            <p className="text-gray-500 text-sm text-center">
              {`Allowed files: ${accept}`}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
