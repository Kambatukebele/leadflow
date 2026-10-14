import z, { maxLength } from "zod";

const leadStatusSchema = z.enum([
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "WON",
  "LOST",
]);

const leadSourceSchema = z.enum([
  "YOUTUBE",
  "INSTAGRAM",
  "LINKEDIN",
  "X",
  "GOOGLE_ADS",
  "FACEBOOK",
  "A_FRIEND",
  "CO_WORKER",
]);

const optionalNullableString = (maxLength: number) =>
  z.string().max(maxLength).nullable().optional();

export const createLeadsValidator = z.object({
  name: z.string().min(1).max(50),
  email: z.string().trim().nullable().optional(),
  phone: optionalNullableString(30),
  company: optionalNullableString(100),
  source: leadSourceSchema.optional(),
  status: leadStatusSchema.optional(),
  notes: optionalNullableString(500),
  userId: z.number().int().positive(),
});

export const updateLeadsValidator = z
  .object({
    name: z.string().min(1).max(50).optional(),
    email: z.string().trim().nullable().optional(),
    phone: optionalNullableString(30),
    company: optionalNullableString(100),
    source: leadSourceSchema.optional(),
    status: leadStatusSchema.optional(),
    notes: optionalNullableString(500),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });

export const filterQueryParamsValidator = z.object({
  status: leadStatusSchema.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().max(100).optional(),
});

export const leadIdValidator = z.coerce.number().int().positive();

export type CreateLeadInput = z.infer<typeof createLeadsValidator>;

export type UpdateLeadInput = z.infer<typeof updateLeadsValidator>;

export type LeadFilters = z.infer<typeof filterQueryParamsValidator>;
