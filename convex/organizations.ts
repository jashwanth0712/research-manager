import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject.split("|")[0] as Id<"users">;
    const memberships = await ctx.db
      .query("memberships")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const orgIds = memberships.map((m) => m.organizationId);
    const organizations = await Promise.all(
      orgIds.map((id) => ctx.db.get(id))
    );

    return organizations.filter((org): org is NonNullable<typeof org> => org !== null);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    domain: v.string(),
    description: v.string(),
    logo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    console.log("identity", identity);
    const userId = identity.subject.split("|")[0] as Id<"users">;
    console.log("userId", userId);
    // Create the organization
    const orgId = await ctx.db.insert("organizations", {
      name: args.name,
      domain: args.domain,
      description: args.description,
      logo: args.logo,
      adminIds: [userId],
      createdAt: Date.now(),
    });
    

    // Create owner membership
    await ctx.db.insert("memberships", {
      userId,
      organizationId: orgId,
      role: "owner",
      expertiseAreas: [],
      joinedAt: Date.now(),
    });

    return orgId;
  },
});

export const generateInvite = mutation({
  args: {
    organizationId: v.id("organizations"),
    email: v.string(),
    role: v.string(),
    groupId: v.optional(v.id("researchGroups")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject as Id<"users">;
    
    // Check if user has permission to invite
    const membership = await ctx.db
      .query("memberships")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("organizationId"), args.organizationId))
      .unique();

    if (!membership || !["owner", "admin"].includes(membership.role)) {
      throw new Error("Not authorized to invite users");
    }

    // Generate unique invite code
    const inviteCode = Math.random().toString(36).substring(2, 15);
    
    // Create invitation
    await ctx.db.insert("invitations", {
      email: args.email,
      organizationId: args.organizationId,
      groupId: args.groupId,
      role: args.role,
      inviteCode,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      createdBy: userId,
      createdAt: Date.now(),
      used: false,
    });

    return inviteCode;
  },
});

export const acceptInvite = mutation({
  args: {
    inviteCode: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject as Id<"users">;

    // Find and validate invitation
    const invitation = await ctx.db
      .query("invitations")
      .withIndex("by_code", (q) => q.eq("inviteCode", args.inviteCode))
      .unique();

    if (!invitation || invitation.used || invitation.expiresAt < Date.now()) {
      throw new Error("Invalid or expired invite code");
    }

    if (invitation.email !== identity.email) {
      throw new Error("Invitation is for a different email address");
    }

    // Create membership
    await ctx.db.insert("memberships", {
      userId,
      organizationId: invitation.organizationId,
      groupId: invitation.groupId,
      role: invitation.role,
      expertiseAreas: [],
      joinedAt: Date.now(),
    });

    // Mark invitation as used
    await ctx.db.patch(invitation._id, { used: true });

    return invitation.organizationId;
  },
});
