import { Request, Response } from "express";
import { createUsersValidator } from "../../validations/V1/user.validation";
import { createUserService } from "../../services/users.service";
import AppError from "../../errors/AppError";
import tryCatch from "../../utils/tryCatch";

export const userCreateController = tryCatch(
  async (req: Request, res: Response) => {
    const requestBody = req.body;

    const validatedRequestBody =
      await createUsersValidator.parseAsync(requestBody);

    const user = await createUserService(validatedRequestBody);

    if (!user) {
      throw new AppError(400, "Could not register the User", 499);
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: user,
    });
  },
);
