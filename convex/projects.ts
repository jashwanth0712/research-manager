import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject.split("|")[0] as Id<"users">;

    const allProjects = await ctx.db.query("projects").collect();

    const userProjects = allProjects.filter((project) =>
      project.contributorIds.includes(userId)
    );

    return userProjects;
  },
});
