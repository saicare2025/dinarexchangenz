import React, { useRef, useState, useEffect } from "react";

export default function FileUpload({ label, description, accept, onChange, file, disabled = false }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraSupported, setCameraSupported] = useState(true);
  const [cameraError, setCameraError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if camera is supported
  useEffect(() => {
    const checkCameraSupport = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach(track => track.stop());
          setCameraSupported(true);
        } else {
          setCameraSupported(false);
        }
      } catch (error) {
        console.log("Camera not available:", error);
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
    setIsCapturing(false);
    setCameraError("");
    setIsLoading(false);
    // Reset the input value to allow capturing again
    event.target.value = "";
  };

  const handleCameraError = (event) => {
    console.error("Camera error:", event);
    setCameraError("Camera access denied or not available");
    setIsCapturing(false);
    setIsLoading(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const openCamera = async () => {
    if (!cameraSupported) {
      setCameraError("Camera is not supported on this device");
      return;
    }

    try {
      setIsLoading(true);
      setIsCapturing(true);
      setCameraError("");
      
      // Request camera permission first
      await navigator.mediaDevices.getUserMedia({ video: true });
      
      // If permission granted, open camera input
      cameraInputRef.current?.click();
    } catch (error) {
      console.error("Camera permission denied:", error);
      setCameraError("Camera access denied. Please allow camera access in your browser settings.");
      setIsCapturing(false);
      setIsLoading(false);
    }
  };

  const removeFile = () => {
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
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="Preview" 
                    className="max-w-full max-h-32 rounded border"
                    style={{ maxWidth: '280px' }}
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

      {/* Camera capture modal */}
      {isCapturing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Camera Access</h3>
            <p className="text-gray-600 mb-4">
              Please allow camera access when prompted to take a photo.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsCapturing(false);
                  setCameraError("");
                  setIsLoading(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
