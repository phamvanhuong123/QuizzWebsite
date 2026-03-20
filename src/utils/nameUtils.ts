/**
 * Xử lý tên hiển thị cho người dùng (chỉ lấy chữ cái đầu tiên, viết hoa)
 * @param fullName
 * @returns Chữ cái đầu tiên viết hoa, hoặc "User" nếu không có tên
 */
export const getDisplayName = (fullName?: string | null): string => {
  if (!fullName) return "User";
  const trimmed = fullName.trim();
  if (trimmed.length === 0) return "User";
  return trimmed.charAt(0).toUpperCase();
};

/**
 * Lấy chữ cái đầu tiên để hiển thị trong avatar (viết hoa)
 * @param fullName
 * @returns Ký tự đầu tiên viết hoa
 */
export const getInitialLetter = (fullName?: string | null): string => {
  return getDisplayName(fullName);
};
