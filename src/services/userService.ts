import { userApi } from '../api';
import { FormDataI, UserResponseI } from '../types/response/user';
import { DATA_LIMIT } from '../utils/constants';

export class UserService {
  private userResponse: UserResponseI | null = null;

  async getUser(): Promise<void> {
    try {
      const queryParams = {
        results: DATA_LIMIT,
      };
      const response: UserResponseI = await userApi.getUser(
        undefined,
        queryParams
      );
      const userData: UserResponseI = response;

      this.userResponse = userData;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  updateUser(updatedUserData: FormDataI): void {
    try {
      const { address, contactNumber, email, firstName, lastName } =
        updatedUserData;

      const originalObject = this.userResponse;

      const updatedResults = originalObject?.results?.map((user) =>
        user.email === email
          ? {
              ...user,
              name: {
                title: user.name.title,
                first: firstName,
                last: lastName,
              },
              location: {
                ...user.location,
                city: address,
              },
              phone: contactNumber,
            }
          : user
      );

      const updatedObject = {
        ...originalObject,
        results: updatedResults,
      };

      this.userResponse = updatedObject;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  getUserResponse(): UserResponseI | null {
    return this.userResponse;
  }
}
