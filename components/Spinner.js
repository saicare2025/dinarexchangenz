export default function Spinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <svg
        className="animate-spin h-10 w-10 text-orange-500 mb-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-30"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-80"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <div className="text-gray-400 text-lg">{text}</div>
    </div>
  );
}
