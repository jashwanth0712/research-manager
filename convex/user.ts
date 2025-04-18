import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const setPresentOrganization = mutation({
    args: {
        organizationId: v.id("organizations"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");
        const userId = identity.subject.split("|")[0] as Id<"users">;
        if (!userId) {
            throw new Error("User not found");
        }
        await ctx.db.patch(userId, {
            presentOrganization: args.organizationId,
        });
    }
})

export const setPresentProject = mutation({
    args: {
        projectId: v.id("projects"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");
        const userId = identity.subject.split("|")[0] as Id<"users">;
        if (!userId) {
            throw new Error("User not found");
        }
        await ctx.db.patch(userId, {
            presentProject: args.projectId,
        });
    }
})

