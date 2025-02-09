import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

export const ImageUpload = ({ onImageUpload, label }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        setPreview(result);
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-indigo-500 transition-colors duration-200"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Signature preview"
              className="max-h-20 mx-auto"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <ImageIcon className="w-6 h-6 mb-2" />
            <p className="text-xs">Click to upload signature image</p>
          </div>
        )}
      </div>
    </div>
  );
};