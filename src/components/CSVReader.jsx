import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

export const CSVReader = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        const lines = text.split('\n');
        const data = lines.map(line => line.split(',').map(cell => cell.trim()));
        onUpload(data);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-500 transition-colors duration-200"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".csv"
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center text-gray-500">
        <Upload className="w-8 h-8 mb-2" />
        <p className="text-sm">Click to upload CSV file or drag and drop</p>
        <p className="text-xs mt-1">Only CSV files are supported</p>
      </div>
    </div>
  );
};