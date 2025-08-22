import React, { useState } from "react";
import FileUpload from "./FileUpload";

export default function FileUploadTest() {
  const [idFile, setIdFile] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleIdFileChange = (file) => {
    console.log("ID File changed:", file);
    setIdFile(file);
    setUploadStatus("");
  };

  const handleReceiptFileChange = (file) => {
    console.log("Receipt File changed:", file);
    setReceiptFile(file);
    setUploadStatus("");
  };

  const testUpload = async (file, type) => {
    if (!file) {
      setUploadStatus("No file to upload");
      return;
    }

    setUploadStatus(`Uploading ${type}...`);
    
    try {
      console.log(`Testing upload for ${type}:`, file.name, file.type, file.size);
      
      const uploadResponse = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        { method: "POST", body: file }
      );
      
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error(`${type} upload failed:`, uploadResponse.status, errorText);
        setUploadStatus(`${type} upload failed: ${uploadResponse.status} - ${errorText.substring(0, 100)}`);
        return;
      }
      
      const result = await uploadResponse.json();
      console.log(`${type} upload successful:`, result);
      setUploadStatus(`${type} upload successful: ${result.url}`);
    } catch (error) {
      console.error(`${type} upload error:`, error);
      setUploadStatus(`${type} upload error: ${error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">File Upload Test</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">ID Document Upload</h2>
          <FileUpload
            label="Upload ID Document"
            description="Accepted: Driver's License, Passport + Utility Bill"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleIdFileChange}
            file={idFile}
          />
          {idFile && (
            <div className="mt-3">
              <button
                onClick={() => testUpload(idFile, "ID")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Test ID Upload
              </button>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Payment Receipt Upload</h2>
          <FileUpload
            label="Upload Payment Receipt"
            description="JPG, PNG, PDF up to 5MB"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleReceiptFileChange}
            file={receiptFile}
          />
          {receiptFile && (
            <div className="mt-3">
              <button
                onClick={() => testUpload(receiptFile, "Receipt")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Test Receipt Upload
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <div className="text-sm space-y-1">
            <p>ID File: {idFile ? `${idFile.name} (${Math.round(idFile.size / 1024)} KB, ${idFile.type})` : 'None'}</p>
            <p>Receipt File: {receiptFile ? `${receiptFile.name} (${Math.round(receiptFile.size / 1024)} KB, ${receiptFile.type})` : 'None'}</p>
            {uploadStatus && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-yellow-800">{uploadStatus}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Camera Testing Instructions:</h3>
          <div className="text-sm space-y-2">
            <p>1. Click "Take Photo" button</p>
            <p>2. Allow camera access when prompted</p>
            <p>3. Take a photo and confirm</p>
            <p>4. Check the debug info above to see file details</p>
            <p>5. Click "Test Upload" to verify the upload works</p>
            <p>6. Check browser console for detailed logs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
