import instance from "@/utils/instanceAxios";

const getByUserId = async (userId: string) => {
  const response = await instance.get("submissions", {
    params: { userId },
  });
  return response;
};

const getById = async (id: string) => {
  return await instance.get(`submissions/${id}`);
};

export const submissionApi = {
  getByUserId,
  getById,
};
