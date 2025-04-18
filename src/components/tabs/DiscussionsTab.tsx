export function DiscussionsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Discussions</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          New Discussion
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
          All
        </button>
        <button className="px-3 py-1 hover:bg-gray-100 rounded-full">
          Unread
        </button>
        <button className="px-3 py-1 hover:bg-gray-100 rounded-full">
          Mentions
        </button>
      </div>

      <div className="space-y-4">
        {/* Discussion threads will go here */}
      </div>
    </div>
  );
}
