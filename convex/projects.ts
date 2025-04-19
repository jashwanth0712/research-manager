// convex/projects.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

//
// CREATE Project
//
export const create = mutation({
  args: {
    name: v.string(),
    organizationId: v.id("organizations"),
    groupId: v.optional(v.id("researchGroups")),
    description: v.string(),
    tags: v.array(v.string()),
    contributorIds: v.array(v.id("users")),
    lastActivityAt: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db.insert("projects", {
      ...args,
    });
  },
});

//
// READ (List Projects by current user)
//
export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject.split("|")[0] as Id<"users">;
    const allProjects = await ctx.db.query("projects").collect();

    return allProjects.filter((project) =>
      project.contributorIds.includes(userId)
    );
  },
});

//
// UPDATE Project
//
export const update = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.optional(v.string()),
    groupId: v.optional(v.id("researchGroups")),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    contributorIds: v.optional(v.array(v.id("users"))),
    lastActivityAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");

    await ctx.db.patch(args.projectId, {
      name: args.name ?? project.name,
      groupId: args.groupId ?? project.groupId,
      description: args.description ?? project.description,
      tags: args.tags ?? project.tags,
      contributorIds: args.contributorIds ?? project.contributorIds,
      lastActivityAt: args.lastActivityAt ?? project.lastActivityAt,
    });
  },
});

//
// DELETE Project
//
export const remove = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    await ctx.db.delete(args.projectId);
  },
});
