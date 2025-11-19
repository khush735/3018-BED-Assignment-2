import { listEmployees, createEmployee } from 'api/v1/services/employeeService';
import * as firestoreRepo from '../../src/api/v1/repositories/firestoreRepository';

jest.mock('../../src/api/v1/repositories/firestoreRepository');

describe('Employee Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list all employees successfully', async () => {
    const mockData = [
      {
        id: '1',
        name: 'Khush Patel',
        position: 'Developer',
        department: 'IT',
        email: 'khush@example.com',
        phone: '123-456-7890',
        branchId: '1',
      },
      {
        id: '2',
        name: 'Amit Shah',
        position: 'Manager',
        department: 'Finance',
        email: 'amit@example.com',
        phone: '987-654-3210',
        branchId: '2',
      },
    ];

    (firestoreRepo.getDocuments as jest.Mock).mockResolvedValue({
      docs: mockData.map((e) => ({
        id: e.id,
        data: () => ({
          name: e.name,
          position: e.position,
          department: e.department,
          email: e.email,
          phone: e.phone,
          branchId: e.branchId,
        }),
      })),
    });

    const result = await listEmployees();

    expect(result.length).toBe(35);
    expect(result[0].name).toBe('Alice Johnson');
    expect(result[1].position).toBe('Customer Service Representative');
  });

  it('should create a new employee successfully', async () => {
    const payload = {
      name: 'Test User',
      position: 'Teller',
      department: 'HR',
      email: 'testuser@example.com',
      phone: '123-456-7890',
      branchId: '1',
    };

    (firestoreRepo.createDocument as jest.Mock).mockResolvedValue('abc');

    const result = await createEmployee(payload);

    expect(result.id).toBe('abc');
    expect(result.name).toBe('Test User');
    expect(result.position).toBe('Teller');
  });
});
