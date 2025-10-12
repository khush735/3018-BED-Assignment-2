import { createEmployeeSchema, updateEmployeeSchema } from "../../src/api/v1/validation/employee.schema";

describe("Employee Validation Schema", () => {
  test("createEmployeeSchema should validate valid data and reject invalid data", () => {
    const valid = {
      name: "John Doe",
      email: "john@example.com",
      position: "Developer",
      department: "IT",
      branchId: 1,
    };
    const invalid = {
      name: "John", 
    };

    const validResult = createEmployeeSchema.validate(valid);
    const invalidResult = createEmployeeSchema.validate(invalid);

    expect(validResult.error).toBeUndefined();
    expect(invalidResult.error).toBeDefined();
  });

  test("updateEmployeeSchema should validate valid update and reject invalid update", () => {
    const valid = { position: "Manager" };
    const invalid = { email: "wrong-format" };

    const validResult = updateEmployeeSchema.validate(valid);
    const invalidResult = updateEmployeeSchema.validate(invalid);

    expect(validResult.error).toBeUndefined();
    expect(invalidResult.error).toBeDefined();
  });
});
