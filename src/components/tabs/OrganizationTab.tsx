import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export function OrganizationTab() {
  const organizations = useQuery(api.organizations.list);
  const createOrg = useMutation(api.organizations.create);
  const generateInvite = useMutation(api.organizations.generateInvite);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Id<"organizations"> | null>(null);

  const [newOrg, setNewOrg] = useState({
    name: "",
    domain: "",
    description: "",
    logo: "",
  });

  const [invitation, setInvitation] = useState({
    email: "",
    role: "contributor",
  });

  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    await createOrg(newOrg);
    setShowCreateForm(false);
    setNewOrg({ name: "", domain: "", description: "", logo: "" });
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrg) return;

    const inviteCode = await generateInvite({
      organizationId: selectedOrg,
      email: invitation.email,
      role: invitation.role,
    });

    alert(`Invite code: ${inviteCode}`);
    setShowInviteForm(false);
    setInvitation({ email: "", role: "contributor" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Organizations</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add Organization
        </button>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Create Organization</h3>
            <form onSubmit={handleCreateOrg} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={newOrg.name}
                  onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Domain</label>
                <input
                  type="text"
                  value={newOrg.domain}
                  onChange={(e) => setNewOrg({ ...newOrg, domain: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newOrg.description}
                  onChange={(e) => setNewOrg({ ...newOrg, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Logo URL</label>
                <input
                  type="url"
                  value={newOrg.logo}
                  onChange={(e) => setNewOrg({ ...newOrg, logo: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showInviteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Invite Member</h3>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={invitation.email}
                  onChange={(e) => setInvitation({ ...invitation, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  value={invitation.role}
                  onChange={(e) => setInvitation({ ...invitation, role: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="admin">Admin</option>
                  <option value="pi">Principal Investigator</option>
                  <option value="contributor">Contributor</option>
                  <option value="reviewer">Reviewer</option>
                  <option value="intern">Intern</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Generate Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizations?.map((org) => (
          <div
            key={org._id}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              {org.logo ? (
                <img src={org.logo} alt={org.name} className="w-12 h-12 rounded" />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xl font-bold text-gray-500">
                  {org.name[0]}
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{org.name}</h3>
                <p className="text-sm text-gray-500">{org.domain}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedOrg(org._id);
                  setShowInviteForm(true);
                }}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg"
              >
                Invite
              </button>
            </div>
            <p className="text-gray-600 text-sm">{org.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
