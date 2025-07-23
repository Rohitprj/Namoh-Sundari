import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the type for the user data we intend to store
export type UserData = {
  email: string;
  token: string;
  role: string;
  userId:number
};

const USER_DATA_KEY = 'loggedInUserData'; // A single key to store all user data

/**
 * Stores user data (email, token, role) in AsyncStorage.
 * The data is stored as a single JSON string under the 'loggedInUserData' key.
 * @param {UserData} data - An object containing user's email, token, and role.
 */
export const storeUserData = async (data: UserData): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
    console.log('User data stored successfully:', data);
  } catch (error) {
    console.error('Error storing user data:', error);
    // In a real app, you might want to show a user-friendly error message here
  }
};

/**
 * Retrieves stored user data from AsyncStorage.
 * @returns {Promise<UserData | null>} The user data object, or null if no data is found or an error occurs.
 */
export const getUserData = async (): Promise<UserData | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

/**
 * Removes all stored user data from AsyncStorage.
 */
export const removeUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
    console.log('User data removed successfully.');
  } catch (error) {
    console.error('Error removing user data:', error);
  }
};
