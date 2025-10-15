import { createEmployeeSchema, updateEmployeeSchema } from "../../src/api/v1/validation/employee.schema";

describe("Employee Validation Schema", () => {
  test("createEmployeeSchema should accept valid data and reject invalid data", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      position: "Developer",
      department: "IT",
      branchId: 1,
      phone: "123-456-7890"
    };

    const invalidData = {
      name: "John", // missing required fields
      email: "not-an-email", // invalid format
    };

    const validResult = createEmployeeSchema.validate(validData);
    const invalidResult = createEmployeeSchema.validate(invalidData);

    // valid data passes
    expect(validResult.error).toBeUndefined();

    // invalid data fails
    expect(invalidResult.error).toBeDefined();
    
   });

  test("updateEmployeeSchema should accept valid updates and reject invalid updates", () => {
    const validUpdate = { position: "Manager" };
    const invalidUpdate = { email: "wrong-format" };

    const validResult = updateEmployeeSchema.validate(validUpdate);
    const invalidResult = updateEmployeeSchema.validate(invalidUpdate);

    expect(validResult.error).toBeUndefined();
    expect(invalidResult.error).toBeDefined();
  });
});
