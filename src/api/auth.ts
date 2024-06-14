import axios from "axios";
import { BASE_URL } from "../constants/apiConfig";
import { UserSignUpData, AuthResponse, UserLoginData } from "../types";

export const signUpUser = async (
  data: UserSignUpData
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${BASE_URL}/auth/signUp`,
      data
    );
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error("Failed sign up", error);
    throw error;
  }
};

export const loginUser = async (data: UserLoginData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${BASE_URL}/auth/signIn`,
      data
    );
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    console.error("Failed sign in", error);
    throw error;
  }
};

// export const refreshUser = async (
//   data: UserRefreshData
// ): Promise<AuthResponse> => {
//   try {
//     const response = await axios.post<AuthResponse>(
//       `${BASE_URL}/auth/refresh-token`,
//       data
//     );
//     localStorage.setItem("accessToken", response.data.accessToken);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
