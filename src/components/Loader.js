export default function Loader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-700 rounded-full animate-spin"/>
        <p className="text-sm text-gray-400">Loading…</p>
      </div>
    </div>
  );
}

export function ErrorMsg({ message }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md">
        <p className="text-red-700 font-semibold mb-1">Failed to load data</p>
        <p className="text-red-500 text-sm">{message}</p>
      </div>
    </div>
  );
}
