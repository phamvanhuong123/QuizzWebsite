import instance from "@/utils/instanceAxios";

const getByUserId = async (userId: string) => {
  return await instance.get("submissions", {
    params: {
      userId: userId,
    },
  });
};

const getById = async (id: string) => {
  return await instance.get(`submissions/${id}`);
};


export const submissionApi = {
  getByUserId,
  getById,
};
