import { listEmployees, createEmployee } from 'api/v1/services/employeeService';
import * as firestoreRepo from 'api/v1/repositories/firestoreRepository';


jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('Employee Service (basic tests)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list all employees successfully', async () => {
    const mockData = [
      { id: '1', name: 'Khush Patel', department: 'IT', branchId: '1' },
      { id: '2', name: 'Amit Shah', department: 'Finance', branchId: '2' },
    ];

    (firestoreRepo.getDocuments as jest.Mock).mockResolvedValue({
      docs: mockData.map((e) => ({
        id: e.id,
        data: () => ({
          name: e.name,
          department: e.department,
          branchId: e.branchId,
        }),
      })),
    });

    const result = await listEmployees();
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Khush Patel');
  });

  it('should create a new employee successfully', async () => {
    const payload = { name: 'Test User', department: 'HR', branchId: '1' };
    (firestoreRepo.createDocument as jest.Mock).mockResolvedValue('abc');

    const result = await createEmployee(payload);
    expect(result.id).toBe('abc');
    expect(result.name).toBe('Test User');
  });
});
