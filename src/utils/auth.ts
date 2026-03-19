export interface User {
  id: string;
  fullName: string | null;
  email: string;
  role?: string;
  token?: string;
}

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};
