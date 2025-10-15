import { listBranches, createBranch } from '../../src/api/v1/services/branchService';
import * as firestoreRepo from '../../src/api/v1/repositories/firestoreRepository';

jest.mock('../../src/api/v1/repositories/firestoreRepository');

describe('Branch Service (humanized tests)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list all branches successfully', async () => {
    const mockData = [
      {
        id: '1',
        name: 'Main Branch',
        address: '100 Main St',
        phone: '111-222-3333',
        manager: 'John',
      },
      {
        id: '2',
        name: 'Toronto Branch',
        address: '200 King St',
        phone: '444-555-6666',
        manager: 'Mary',
      },
    ];

    // Mocking Firestore getDocuments
    (firestoreRepo.getDocuments as jest.Mock).mockResolvedValue({
      docs: mockData.map((b) => ({
        id: b.id,
        data: () => ({
          name: b.name,
          address: b.address,
          phone: b.phone,
          manager: b.manager,
        }),
      })),
    });

    const result = await listBranches();

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Main Branch');
    expect(result[1].phone).toBe('444-555-6666');
  });

  it('should create a new branch successfully', async () => {
    const payload = {
      name: 'Test Branch',
      address: '123 Main St',
      phone: '111-222-3333',
      manager: 'Alex',
    };

    // Mocking Firestore createDocument
    (firestoreRepo.createDocument as jest.Mock).mockResolvedValue('123');

    const result = await createBranch(payload);

    expect(result.id).toBe('123');
    expect(result.name).toBe('Test Branch');
    expect(result.address).toBe('123 Main St');
  });
});
