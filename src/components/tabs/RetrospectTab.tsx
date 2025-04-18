export function RetrospectTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Retrospect</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Record Pivot
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
          Timeline
        </button>
        <button className="px-3 py-1 hover:bg-gray-100 rounded-full">
          Graph View
        </button>
      </div>

      <div className="space-y-4">
        {/* Pivot timeline will go here */}
      </div>
    </div>
  );
}
