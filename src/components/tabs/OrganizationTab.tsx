import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

// TODO : user details
// TODO : CRUD for organizations (create, delete)
// TODO : Invite users to organizations
// TODO : CRUD for research groups
// TODO : CRUD for memberships
// TODO : CRUD for projects (Done)
// TODO : Invite users to research groups

export function OrganizationTab() {
  const user = useQuery(api.auth.getUserId);
  const userDetails = useQuery(api.auth.getUser, {});
  const organizations = useQuery(api.organizations.list);
  const projects = useQuery(api.projects.list);

  const createOrganization = useMutation(api.organizations.create);
  const createProject = useMutation(api.projects.create);
  const updateProject = useMutation(api.projects.update);
  const deleteProject = useMutation(api.projects.remove);
  const deleteOrganization = useMutation(api.organizations.remove);

  // Keep track of new project names per organization
  const [newProjectNames, setNewProjectNames] = useState<
    Record<string, string>
  >({});

  const handleCreateOrganization = async () => {
    await createOrganization({
      name: "Test Org",
      domain: "test.com",
      description: "A testing org",
    });
  };

  const handleDeleteOrganization = async (
    organizationId: Id<"organizations">
  ) => {
    if (confirm("Are you sure you want to delete this organization?")) {
      await deleteOrganization({ organizationId });
    }
  };

  const handleCreateProject = async (orgId: Id<"organizations">) => {
    if (!userDetails) return;
    const name = newProjectNames[orgId] || "Untitled Project";

    await createProject({
      name,
      organizationId: orgId,
      groupId: undefined,
      description: "Created from frontend",
      tags: ["demo"],
      contributorIds: [userDetails._id],
      lastActivityAt: Date.now(),
    });

    setNewProjectNames((prev) => ({ ...prev, [orgId]: "" }));
  };

  const handleUpdateProject = async (projectId: Id<"projects">) => {
    await updateProject({
      projectId,
      name: "Updated Project",
    });
  };

  const handleDeleteProject = async (projectId: Id<"projects">) => {
    await deleteProject({ projectId });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Organizations</h1>

      <button
        onClick={handleCreateOrganization}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Create Organization
      </button>

      {organizations?.map((org) => (
        <div key={org._id} className="mb-6 border p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold">{org.name}</h2>
          <p className="text-sm text-gray-600">{org.description}</p>

          <div className="mt-4">
            <input
              type="text"
              placeholder="New Project Name"
              value={newProjectNames[org._id] || ""}
              onChange={(e) =>
                setNewProjectNames((prev) => ({
                  ...prev,
                  [org._id]: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded mr-2"
            />
            <button
              onClick={() => handleCreateProject(org._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Add Project
            </button>
            <button
              onClick={() => handleDeleteOrganization(org._id)}
              className="bg-red-600 text-white px-3 py-1 rounded ml-4"
            >
              Delete Organization
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {(projects || [])
              .filter((project) => project.organizationId === org._id)
              .map((project) => (
                <div
                  key={project._id}
                  className="border rounded p-2 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded"
                      onClick={() => handleUpdateProject(project._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteProject(project._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
