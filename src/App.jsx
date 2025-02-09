import React, { useState } from 'react';
import { Upload, FileUp, Image as ImageIcon, Download } from 'lucide-react';
import { CSVReader } from './components/CSVReader';
import { ImageUpload } from './components/ImageUpload';

function App() {
  const [csvData, setCSVData] = useState([]);
  const [eventName, setEventName] = useState('');
  const [sign1, setSign1] = useState(null);
  const [sign2, setSign2] = useState(null);
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');

  const handleCSVUpload = (data) => {
    setCSVData(data);
  };

  const handleGenerate = () => {
    // In a real implementation, this would generate certificates
    // using a library like pdfkit or html2canvas
    console.log('Generating certificates with:', {
      csvData,
      eventName,
      sign1,
      sign2,
      name1,
      name2
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
            Certificate Generator
          </h1>

          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <div className="grid gap-6">
              {/* Event Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter event name"
                />
              </div>

              {/* CSV Upload */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Participants CSV
                  </label>
                  <a
                    href="/sample_format.csv"
                    download
                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <Download size={16} />
                    Download Sample Format
                  </a>
                </div>
                <CSVReader onUpload={handleCSVUpload} />
              </div>

              {/* Signature 1 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Signature 1 Name
                  </label>
                  <input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter name for signature 1"
                  />
                </div>
                <ImageUpload onImageUpload={setSign1} label="Upload Signature 1" />
              </div>

              {/* Signature 2 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Signature 2 Name
                  </label>
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter name for signature 2"
                  />
                </div>
                <ImageUpload onImageUpload={setSign2} label="Upload Signature 2" />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
                disabled={!csvData.length || !eventName || !sign1 || !sign2 || !name1 || !name2}
              >
                <FileUp size={20} />
                Generate Certificates
              </button>
            </div>
          </div>

          {/* Preview Section */}
          {csvData.length > 0 && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Uploaded Participants</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      {csvData[0].map((header, i) => (
                        <th
                          key={i}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {csvData.slice(1).map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;