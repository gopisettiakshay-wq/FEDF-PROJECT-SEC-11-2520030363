function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-yellow-400 border-t-slate-900 rounded-full animate-spin mx-auto"></div>

        <h2 className="mt-4 text-lg font-semibold text-gray-700">
          Loading Hotel Food System...
        </h2>

        <p className="text-sm text-gray-500">
          Please wait
        </p>
      </div>
    </div>
  );
}

export default Loader;