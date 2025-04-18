export function DatasetsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Datasets</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Add Dataset
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <select className="border border-gray-200 rounded-lg px-3 py-2">
          <option>All Sources</option>
          <option>Internal</option>
          <option>External</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Dataset cards will go here */}
      </div>
    </div>
  );
}
