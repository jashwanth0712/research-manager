import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export function OrganizationTab() {
  const user = useQuery(api.auth.getUserId);
  const userDetails = useQuery(api.auth.getUser, { });
  const organizations = useQuery(api.organizations.list);
  const createOrganization = useMutation(api.organizations.create);
  //TODO : user details
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
      <div className="flex gap-4">
      <h1>User id</h1>
      <p>{JSON.stringify(user)}</p>
      </div>
      <div className="flex gap-4">
      <h1>User details</h1>
      <p>{JSON.stringify(userDetails)}</p>
      </div>
      <div className="flex gap-4">
      <h1>Organizations</h1>
      <p>{JSON.stringify(organizations)}</p>
      </div>

      <h1>Onclick Functions</h1>
      <button onClick={handleClick}>Create Organization</button>
    </div>
  );
}
