import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import useAdminStore from '@/stores/adminStore';
import useLogoutAdmin from './useLogoutAdmin';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/stores/adminstore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useLogoutAdmin', () => {
  let mockRouter: { push: jest.Mock };
  let mockAdminStore: { logoutAdmin: jest.Mock };

  beforeEach(() => {
    mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockAdminStore = {
      logoutAdmin: jest.fn(),
    };
    (useAdminStore as unknown as jest.Mock).mockReturnValue(mockAdminStore);
  });

  it('should call logoutAdmin and redirect to home page', async () => {
    const { result } = renderHook(() => useLogoutAdmin());

    await act(async () => {
      result.current();
    });

    expect(mockAdminStore.logoutAdmin).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
