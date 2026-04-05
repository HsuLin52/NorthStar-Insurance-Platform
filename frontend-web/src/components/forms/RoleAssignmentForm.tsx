"use client";

import { useState, type FormEvent } from "react";

interface RoleOption {
  _id: string;
  name: string;
}

interface RoleAssignmentFormProps {
  availableRoles: RoleOption[];
  currentRoles: string[];
  onSubmit: (roleIds: string[]) => Promise<void>;
}

export default function RoleAssignmentForm({
  availableRoles,
  currentRoles,
  onSubmit
}: RoleAssignmentFormProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    availableRoles
      .filter((role) => currentRoles.includes(role.name))
      .map((role) => role._id)
  );

  function toggleRole(roleId: string) {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((item) => item !== roleId)
        : [...prev, roleId]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(selectedRoles);
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="full-span">
        <label>Assigned Roles</label>
        <div className="checkbox-grid">
          {availableRoles.map((role) => (
            <label key={role._id} className="checkbox-card">
              <input
                type="checkbox"
                checked={selectedRoles.includes(role._id)}
                onChange={() => toggleRole(role._id)}
              />
              <span>{role.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Save Roles
      </button>
    </form>
  );
}