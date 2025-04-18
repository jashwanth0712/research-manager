import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  organizations: defineTable({
    name: v.string(),
    domain: v.string(),
    description: v.string(),
    logo: v.optional(v.string()),
    adminIds: v.array(v.id("users")),
    createdAt: v.number(),
  }).index("by_domain", ["domain"]),

  researchGroups: defineTable({
    name: v.string(),
    organizationId: v.id("organizations"),
    description: v.string(),
    piId: v.id("users"), // Principal Investigator
    coLeadIds: v.array(v.id("users")),
    createdAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_pi", ["piId"]),

  memberships: defineTable({
    userId: v.id("users"),
    organizationId: v.id("organizations"),
    groupId: v.optional(v.id("researchGroups")),
    role: v.string(), // "owner", "admin", "pi", "contributor", "reviewer", "intern"
    expertiseAreas: v.array(v.string()),
    joinedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_org", ["organizationId"])
    .index("by_group", ["groupId"]),

  invitations: defineTable({
    email: v.string(),
    organizationId: v.id("organizations"),
    groupId: v.optional(v.id("researchGroups")),
    role: v.string(),
    inviteCode: v.string(),
    expiresAt: v.number(),
    createdBy: v.id("users"),
    createdAt: v.number(),
    used: v.boolean(),
  })
    .index("by_email", ["email"])
    .index("by_code", ["inviteCode"])
    .index("by_org", ["organizationId"]),

  projects: defineTable({
    name: v.string(),
    organizationId: v.id("organizations"),
    groupId: v.optional(v.id("researchGroups")),
    description: v.string(),
    tags: v.array(v.string()),
    contributorIds: v.array(v.id("users")),
    lastActivityAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_group", ["groupId"])
    .index("by_contributor", ["contributorIds"]),
    users: defineTable({
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      phone: v.optional(v.string()),
      phoneVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
      presentOrganization: v.optional(v.id("organizations")),
      presentProject: v.optional(v.id("projects")),
      // other "users" fields...
    }).index("email", ["email"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
