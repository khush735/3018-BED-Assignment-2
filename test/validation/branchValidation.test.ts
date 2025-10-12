import { createBranchSchema, updateBranchSchema } from "../../src/api/v1/validation/branch.schema";

describe("Branch Validation", () => {
  test("should validate correct branch data (create)", () => {
    const validData = {
      name: "Downtown Branch",
      address: "123 Main St, Winnipeg, MB",
      phone: "204-555-1234",
    };

    const { error } = createBranchSchema.validate(validData);
    expect(error).toBeUndefined();
  });

  test("should reject invalid branch data (create)", () => {
    const invalidData = {
      name: "Downtown Branch",
    };

    const { error } = createBranchSchema.validate(invalidData);
    expect(error).toBeDefined();
  });

  test("should validate correct branch update data", () => {
    const validUpdate = {
      phone: "204-999-8888",
    };

    const { error } = updateBranchSchema.validate(validUpdate);
    expect(error).toBeUndefined();
  });

  test("should reject invalid branch update data", () => {
    const invalidUpdate = {
      phone: 12345,
    };

    const { error } = updateBranchSchema.validate(invalidUpdate);
    expect(error).toBeDefined();
  });
});
