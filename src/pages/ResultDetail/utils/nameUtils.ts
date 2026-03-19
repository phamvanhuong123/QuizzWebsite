/**
 * Xử lý tên hiển thị cho người dùng
 * @param fullName
 * @returns Tên đã được xử lý để hiển thị
 */
export const getDisplayName = (fullName?: string | null): string => {
  if (!fullName) return "User";

  const trimmedName = fullName.trim();

  // Nếu chuỗi rỗng
  if (trimmedName.length === 0) return "User";

  // Kiểm tra nếu chuỗi có nhiều hơn 15 ký tự và không có khoảng trắng, khả năng cao là mã hash/ID
  if (trimmedName.length > 15 && !trimmedName.includes(" ")) {
    const specialCharCount = (trimmedName.match(/[^a-zA-ZÀ-ỹ\s]/g) || [])
      .length;
    const numberCount = (trimmedName.match(/[0-9]/g) || []).length;

    if (specialCharCount > 5 || numberCount > 5) {
      return "User";
    }
  }

  // Tách chuỗi thành các phần bằng khoảng trắng
  const nameParts = trimmedName.split(/\s+/);

  if (nameParts.length === 1) {
    const singleName = nameParts[0];

    // Kiểm tra nếu tên chỉ gồm 1 từ và là tên thuần (không chứa ký tự đặc biệt/số)
    const hasSpecialChars = /[^a-zA-ZÀ-ỹ]/g.test(singleName);

    if (!hasSpecialChars && singleName.length <= 15) {
      return (
        singleName.charAt(0).toUpperCase() + singleName.slice(1).toLowerCase()
      );
    } else {
      return "User";
    }
  }

  // Nếu có nhiều hơn 1 phần, lấy phần cuối cùng (tên)
  const lastName = nameParts[nameParts.length - 1];

  // Kiểm tra tên cuối có hợp lệ không
  const hasSpecialChars = /[^a-zA-ZÀ-ỹ]/g.test(lastName);

  if (!hasSpecialChars && lastName.length <= 15) {
    return lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  } else {
    return "User";
  }
};

/**
 * Tạo chữ cái đầu tiên của tên để hiển thị trong avatar tròn
 * @param fullName - Tên đầy đủ
 * @returns Chữ cái đầu tiên (viết hoa)
 */
export const getInitialLetter = (fullName?: string | null): string => {
  const displayName = getDisplayName(fullName);
  return displayName.charAt(0).toUpperCase();
};

/**
 * Tạo màu ngẫu nhiên dựa trên tên người dùng
 * @param fullName
 * @returns Mã màu HSL
 */
export const getNameColor = (fullName?: string | null): string => {
  if (!fullName) return "hsl(0, 70%, 50%)";

  // Tạo hash từ tên để có màu nhất quán
  let hash = 0;
  for (let i = 0; i < fullName.length; i++) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Chuyển hash thành màu HSL (0-360)
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 50%)`;
};
