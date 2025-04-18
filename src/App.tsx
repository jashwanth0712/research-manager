import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "./components/ui/toaster";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { MainContent } from "./components/MainContent";
import { useState } from "react";

export type TabType = "organization" | "experiments" | "documentation" | "datasets" | "discussions" | "retrospect" | "settings";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("organization");

  return (
    <div className="min-h-screen flex flex-col">
      <Authenticated>
        <div className="flex h-screen overflow-hidden">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 overflow-auto p-6">
              <MainContent activeTab={activeTab} />
            </main>
          </div>
        </div>
      </Authenticated>
      
      <Unauthenticated>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Research Platform</h1>
              <p className="text-gray-600">Sign in to access your research workspace</p>
            </div>
            <SignInForm />
          </div>
        </div>
      </Unauthenticated>
      <Toaster />
    </div>
  );
}
