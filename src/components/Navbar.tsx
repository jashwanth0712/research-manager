import { Search, Bell, ChevronDown } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";

export function Navbar() {
  const { signOut } = useAuthActions();
  const organizations = useQuery(api.organizations.list);
  const projects = useQuery(api.projects.list);
  const user = useQuery(api.auth.loggedInUser);
  const setPresentOrganization = useMutation(api.user.setPresentOrganization);
  const setPresentProject = useMutation(api.user.setPresentProject);

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
          {organizations?.length > 0 ? (
            <select className="border border-gray-200 rounded-lg px-3 py-2" onChange={async (e) => {
              const orgId = e.target.value;
              if (orgId) {
                await setPresentOrganization({ organizationId: orgId });
              }
            }}>
              <option>Select Organization</option>
              {organizations?.map((org) => (
                <option key={org._id} value={org._id} selected={org._id === user?.presentOrganization}>{org.name}</option>
              ))}
            </select>
          ) : (
            <div className="border border-gray-200 rounded-lg px-3 py-2">
              <p className="text-gray-500">No organizations yet</p>
            </div>
          )}
          {projects?.length > 0 ? (
            <select className="border border-gray-200 rounded-lg px-3 py-2" onChange={async (e) => {
              const projectId = e.target.value;
              if (projectId) {
                await setPresentProject({ projectId: projectId });
              }
            }}>
              <option>Select Project</option>
              {projects?.map((project) => (
                <option key={project._id} value={project._id} selected={project._id === user?.presentProject}>{project.name}</option>
              ))}
            </select>
          ) : (
            <div className="border border-gray-200 rounded-lg px-3 py-2">
              <p className="text-gray-500">No projects yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            3
          </span>
        </button>

        <button onClick={signOut} className="flex items-center gap-2">
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
