import { act } from 'react-dom/test-utils';
import { UserService } from './userService';
import { userApi } from '../api';
import { FormDataI, UserResponseI } from '../types/response/user';
import { mockResultData, updatedFromMockData } from '../mocks/testing/mockData';

jest.mock('../api');

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('user data fetched successfully', async () => {
    const mockUserResponse: UserResponseI = {
      results: mockResultData,
    };

    (userApi.getUser as jest.Mock).mockResolvedValueOnce(mockUserResponse);

    await act(async () => {
      await userService.getUser();
    });

    expect(userApi.getUser).toHaveBeenCalled();
    expect(userService.getUserResponse()).toEqual(mockUserResponse);
  });

  test('handles errors when fetching user data', async () => {
    const mockError = new Error('Failed fetching user data...');

    (userApi.getUser as jest.Mock).mockRejectedValueOnce(mockError);

    await act(async () => {
      await expect(userService.getUser()).rejects.toThrow(mockError);
    });
  });

  test('updates user data successfully', () => {
    const mockUpdatedUserData: FormDataI = updatedFromMockData;

    const mockUserResponse: UserResponseI = {
      results: mockResultData,
    };

    const userService = new UserService();
    userService['userResponse'] = mockUserResponse;

    userService.updateUser(mockUpdatedUserData);

    const updatedUserResponse = userService.getUserResponse();

    expect(updatedUserResponse?.results).toBeDefined();
    expect(updatedUserResponse?.results?.length).toBeGreaterThan(0);

    const updatedUser = updatedUserResponse?.results?.find(
      (user) => user.email === mockUpdatedUserData.email
    );

    expect(updatedUser).toBeDefined();
    expect(updatedUser?.name.first).toEqual(mockUpdatedUserData.firstName);
    expect(updatedUser?.name.last).toEqual(mockUpdatedUserData.lastName);
    expect(updatedUser?.location.city).toEqual(mockUpdatedUserData.address);
    expect(updatedUser?.phone).toEqual(mockUpdatedUserData.contactNumber);
  });

  test('returns user response', () => {
    const userResponse = userService.getUserResponse();
    expect(userResponse).toBeDefined();
  });
});
