import React, { useState } from "react";
import FileUpload from "./FileUpload";

export default function FileUploadTest() {
  const [idFile, setIdFile] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);

  const handleIdFileChange = (file) => {
    console.log("ID File changed:", file);
    setIdFile(file);
  };

  const handleReceiptFileChange = (file) => {
    console.log("Receipt File changed:", file);
    setReceiptFile(file);
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
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <div className="text-sm space-y-1">
            <p>ID File: {idFile ? `${idFile.name} (${Math.round(idFile.size / 1024)} KB)` : 'None'}</p>
            <p>Receipt File: {receiptFile ? `${receiptFile.name} (${Math.round(receiptFile.size / 1024)} KB)` : 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
