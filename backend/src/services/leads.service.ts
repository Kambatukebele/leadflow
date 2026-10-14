import prisma from "../db/prisma";
import { Prisma } from "../../generated/prisma/client";
import type {
  CreateLeadInput,
  UpdateLeadInput,
  LeadFilters,
} from "../validations/V1/leads.validations";

export const createLeadService = async (body: CreateLeadInput) => {
  return prisma.lead.create({
    data: body,
  });
};

export const getAllLeadService = async (
  filters: Pick<LeadFilters, "status" | "search">,
  limit: number,
  offset: number,
) => {
  const where: Prisma.LeadWhereInput = {
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.search
      ? {
          OR: [
            { name: { contains: filters.search, mode: "insensitive" } },
            { email: { contains: filters.search, mode: "insensitive" } },
            { company: { contains: filters.search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [leads, count] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    }),
    prisma.lead.count({ where }),
  ]);

  return { leads, count };
};

export const getLeadService = async (id: number) => {
  return prisma.lead.findUnique({
    where: { id },
  });
};

export const updateLeadService = async (body: UpdateLeadInput, id: number) => {
  return prisma.lead.update({
    where: { id },
    data: body,
  });
};

export const deleteLeadService = async (id: number) => {
  return prisma.lead.delete({
    where: { id },
  });
};
