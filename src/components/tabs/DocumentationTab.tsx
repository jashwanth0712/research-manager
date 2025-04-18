export function DocumentationTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Documentation</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          New Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
          <div className="space-y-4">
            {/* AI Insights will go here */}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Documentation</h3>
          <div className="space-y-4">
            {/* Documentation will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
