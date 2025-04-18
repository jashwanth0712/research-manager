import { TabType } from "../App";
import {
  LayoutGrid,
  FlaskConical,
  FileText,
  Database,
  MessageSquare,
  GitFork,
  Settings
} from "lucide-react";

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: "organization" as const, label: "Organization", icon: LayoutGrid },
  { id: "experiments" as const, label: "Experiments", icon: FlaskConical },
  { id: "documentation" as const, label: "Documentation", icon: FileText },
  { id: "datasets" as const, label: "Datasets", icon: Database },
  { id: "discussions" as const, label: "Discussions", icon: MessageSquare },
  { id: "retrospect" as const, label: "Retrospect", icon: GitFork },
  { id: "settings" as const, label: "Settings", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Research Platform</h1>
      </div>
      <nav className="flex-1 p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left mb-1 ${
                activeTab === tab.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
