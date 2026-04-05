import { roleRepository } from "../repositories/roleRepository.js";
import { userRepository } from "../repositories/userRepository.js";
import { AppError } from "../utils/appError.js";
import { stripSensitiveUserFields } from "../utils/safeObject.js";

export const rbacService = {
  async listRoles() {
    return roleRepository.findAll();
  },

  async assignRoles(userId, roleIds) {
    const validRoles = await roleRepository.findByIds(roleIds);

    if (validRoles.length !== roleIds.length) {
      throw new AppError("One or more roles are invalid", 400);
    }

    const user = await userRepository.updateById(userId, { roles: roleIds });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return stripSensitiveUserFields(user);
  }
};