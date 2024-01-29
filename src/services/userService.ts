import { userApi } from '../api';
import { FormDataI, UserResponseI } from '../types/response/user';
import { DATA_LIMIT } from '../utils/constants';


export class UserService {
  // Initializing a variable to store user response data
  private userResponse: UserResponseI | null = null;

  // Async function to fetch user data
  async getUser(): Promise<void> {
    try {
      // Setting query parameters for the API request
      const queryParams = {
        results: DATA_LIMIT,
      };

      // Making an API call to get user data
      const response: UserResponseI = await userApi.getUser(
        undefined,
        queryParams
      );

      // Storing the received user data in the class variable
      const userData: UserResponseI = response;
      this.userResponse = userData;
    } catch (error) {
      // Handling errors during the API call
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Function to update user data
  updateUser(updatedUserData: FormDataI): void {
    try {
      // Destructuring properties from the updated user data
      const { address, contactNumber, email, firstName, lastName } =
        updatedUserData;

      // Storing the original user response object
      const originalObject = this.userResponse;

      // Updating the user data based on email match
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

      // Creating a new object with updated user data
      const updatedObject = {
        ...originalObject,
        results: updatedResults,
      };

      // Storing the updated user response object
      this.userResponse = updatedObject;
    } catch (error) {
      // Handling errors during the update process
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Function to get the stored user response object
  getUserResponse(): UserResponseI | null {
    return this.userResponse;
  }
}
