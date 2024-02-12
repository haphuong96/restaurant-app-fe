import { UserTokens } from "./auth/types";

export const handleApiError = async (error: any) => {
  try {
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

/**
 * Get user access tokens and refresh tokens from local storage
 * @returns 
 */
export const getUserTokens = (): UserTokens | null => {
  try {
    const profile: UserTokens = JSON.parse(
      localStorage.getItem("profile") || ""
    );
    return {
      access: profile.access,
      refresh: profile.refresh,
    };
  } catch (err) {
    return null;
  }
};
