import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export function OrganizationTab() {
  const user = useQuery(api.auth.getUserId);
  const organizations = useQuery(api.organizations.list);
  const createOrganization = useMutation(api.organizations.create);
  // TODO : CRUD for organizations
  // TODO : Invite users to organizations
  // TODO : CRUD for research groups
  // TODO : CRUD for memberships
  // TODO : Invite users to research groups
  const handleClick = async () => {
    await createOrganization({
      name: "Test",
      domain: "test.com",
      description: "Test",
    });
  };
  return (
    <div>
      <h1>Organization</h1>
      <p>{JSON.stringify(user)}</p>
      <p>{JSON.stringify(organizations)}</p>
      <button onClick={handleClick}>Create Organization</button>
    </div>
  );
}
