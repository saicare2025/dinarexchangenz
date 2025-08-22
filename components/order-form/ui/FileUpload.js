import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

export default function FileUpload({ label, description, accept, onChange, file, disabled = false }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [cameraSupported, setCameraSupported] = useState(true);
  const [cameraError, setCameraError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if camera is supported (without requesting permission)
  useEffect(() => {
    const checkCameraSupport = () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        setCameraSupported(true);
      } else {
        setCameraSupported(false);
      }
    };

    checkCameraSupport();
  }, []);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile);
    }
    // Reset the input value to allow selecting the same file again
    event.target.value = "";
  };

  const handleCameraCapture = (event) => {
    const capturedFile = event.target.files?.[0];
    if (capturedFile) {
      // Create a proper file object for camera captures
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = capturedFile.name && capturedFile.name !== 'image.jpg' 
        ? capturedFile.name 
        : `camera-capture-${timestamp}.jpg`;
      
      // Create a new File object with proper metadata
      const newFile = new File([capturedFile], fileName, {
        type: capturedFile.type || 'image/jpeg',
        lastModified: Date.now(),
      });
      
      console.log("Camera capture successful:", newFile);
      onChange(newFile);
    }
    setCameraError("");
    setIsLoading(false);
    // Reset the input value to allow capturing again
    event.target.value = "";
  };

  const handleCameraError = (event) => {
    console.error("Camera error:", event);
    setCameraError("Camera access denied or not available");
    setIsLoading(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const openCamera = () => {
    if (!cameraSupported) {
      setCameraError("Camera is not supported on this device");
      return;
    }

    setIsLoading(true);
    setCameraError("");
    
    // Open camera input directly - browser will handle permission request
    cameraInputRef.current?.click();
  };

  const removeFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
    setCameraError("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        {file && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Uploaded
          </span>
        )}
      </div>

      <div
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg ${
          disabled ? "opacity-50" : ""
        }`}
      >
        <div className="space-y-3 text-center w-full">
          {!file ? (
            <>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={openFileDialog}
                  disabled={disabled}
                  className={`px-4 py-2 text-sm font-medium text-white bg-orange rounded-md hover:bg-orange/90 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 transition-colors ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Choose Photos
                </button>
                <button
                  type="button"
                  onClick={openCamera}
                  disabled={disabled || !cameraSupported || isLoading}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                    disabled || !cameraSupported || isLoading
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                  }`}
                >
                  {isLoading ? "Opening Camera..." : "Take Photo"}
                </button>
              </div>
              
              <p className="text-xs text-gray-500">{description}</p>
              
              {cameraError && (
                <p className="text-xs text-red-500 bg-red-50 p-2 rounded">
                  {cameraError}
                </p>
              )}
            </>
          ) : (
            <div className="space-y-3 w-full">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <p className="text-sm text-green-600 text-center">
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </p>
                <button
                  type="button"
                  onClick={removeFile}
                  className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md border border-red-200 transition-colors"
                >
                  Remove
                </button>
              </div>
              
              {file.type.startsWith('image/') && (
                <div className="mt-2 flex justify-center">
                  <Image 
                    src={URL.createObjectURL(file)} 
                    alt="Preview" 
                    width={280}
                    height={128}
                    className="max-w-full max-h-32 rounded border object-cover"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input for choosing files */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        disabled={disabled}
        className="hidden"
      />

      {/* Hidden file input for camera capture */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
        onError={handleCameraError}
        disabled={disabled}
        className="hidden"
      />
    </div>
  );
}
