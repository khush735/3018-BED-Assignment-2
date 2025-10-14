import { listBranches, createBranch } from 'api/v1/services/branchService';
import * as firestoreRepo from 'api/v1/repositories/firestoreRepository';

jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('Branch Service (basic tests)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list all branches successfully', async () => {
    const mockData = [
      { id: '1', name: 'Main Branch', location: 'Winnipeg', manager: 'John' },
      { id: '2', name: 'Toronto Branch', location: 'Toronto', manager: 'Mary' },
    ];

    (firestoreRepo.getDocuments as jest.Mock).mockResolvedValue({
      docs: mockData.map((b) => ({
        id: b.id,
        data: () => ({ name: b.name, location: b.location, manager: b.manager }),
      })),
    });

    const result = await listBranches();
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Main Branch');
  });

  it('should create a new branch successfully', async () => {
    const payload = { name: 'Test Branch', location: 'Regina', manager: 'Alex' };
    (firestoreRepo.createDocument as jest.Mock).mockResolvedValue('123');

    const result = await createBranch(payload);
    expect(result.id).toBe('123');
    expect(result.name).toBe('Test Branch');
  });
});
