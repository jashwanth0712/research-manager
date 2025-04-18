import { Search, Bell, ChevronDown } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Navbar() {
  const user = useQuery(api.auth.loggedInUser);

  return (
    <div className="h-16 border-b border-gray-200 px-4 flex items-center gap-4 bg-white">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search everything..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select className="border border-gray-200 rounded-lg px-3 py-2">
            <option>Select Organization</option>
          </select>
          <select className="border border-gray-200 rounded-lg px-3 py-2">
            <option>Select Project</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>

        <button className="flex items-center gap-2">
          <img
            src={user?.image ?? "https://via.placeholder.com/32"}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <ChevronDown className="w-4 h-4 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
