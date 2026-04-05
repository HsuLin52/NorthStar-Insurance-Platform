import { Role } from "../models/Role.js";

export const roleRepository = {
  findAll() {
    return Role.find().sort({ name: 1 });
  },
  findByNames(names) {
    return Role.find({ name: { $in: names } });
  },
  findByIds(roleIds) {
    return Role.find({ _id: { $in: roleIds } });
  },
  create(payload) {
    return Role.create(payload);
  }
};