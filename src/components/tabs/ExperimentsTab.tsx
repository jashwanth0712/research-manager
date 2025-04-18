export function ExperimentsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Experiments</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          New Experiment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {["todo", "wip", "done", "idea"].map((status) => (
          <div key={status} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize">{status}</h3>
            <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
              {/* Experiment cards will go here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
