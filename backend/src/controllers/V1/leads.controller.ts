import type { Request, Response } from "express";
import {
  createLeadsValidator,
  updateLeadsValidator,
  filterQueryParamsValidator,
  leadIdValidator,
} from "../../validations/V1/leads.validations";
import tryCatch from "../../utils/tryCatch";
import {
  createLeadService,
  getAllLeadService,
  getLeadService,
  updateLeadService,
  deleteLeadService,
} from "../../services/leads.service";

export const createLeadController = tryCatch(
  async (req: Request, res: Response) => {
    const body = await createLeadsValidator.parseAsync(req.body);
    const lead = await createLeadService(body);

    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  },
);

export const getAllLeadsController = tryCatch(
  async (req: Request, res: Response) => {
    const filters = await filterQueryParamsValidator.parseAsync(req.query);

    const offset = (filters.page - 1) * filters.limit;

    const { leads, count } = await getAllLeadService(
      {
        status: filters.status,
        search: filters.search,
      },
      filters.limit,
      offset,
    );

    return res.status(200).json({
      success: true,
      message: "Leads retrieved successfully",
      data: leads,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total: count,
        totalPages: Math.ceil(count / filters.limit),
      },
    });
  },
);

export const getLeadController = tryCatch(
  async (req: Request, res: Response) => {
    const id = leadIdValidator.parse(req.params.leadId);
    const lead = await getLeadService(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead retrieved successfully",
      data: lead,
    });
  },
);

export const updateLeadController = tryCatch(
  async (req: Request, res: Response) => {
    const id = leadIdValidator.parse(req.params.leadId);
    const body = await updateLeadsValidator.parseAsync(req.body);
    const lead = await updateLeadService(body, id);

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  },
);

export const deleteLeadController = tryCatch(
  async (req: Request, res: Response) => {
    const id = leadIdValidator.parse(req.params.leadId);

    await deleteLeadService(id);

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  },
);
