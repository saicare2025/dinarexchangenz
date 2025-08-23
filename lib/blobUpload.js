export async function uploadViaSignedUrl(file, { preferredName } = {}) {
  // Create FormData for the upload
  const formData = new FormData();
  formData.append("file", file);
  formData.append("orderId", "order");
  formData.append("kind", preferredName ? "custom" : "file");

  // Upload file directly to our API
  const response = await fetch("/api/blob/upload-url", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || "Failed to upload file");
  }

  return result.url; // permanent, public URL
}
