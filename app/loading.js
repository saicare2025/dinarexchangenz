// app/loading.js
import Spinner from "@/components/Spinner"; // Adjust the path as needed

export default function Loading() {
  // You can wrap with a background, centering, etc. as you wish
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <Spinner />
    </div>
  );
}
