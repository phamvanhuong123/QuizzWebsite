import instance from "@/utils/instanceAxios";

const getByTopicId = async (topicId: string) => {
  return await instance.get("questions", {
    params: {
      topicId: topicId,
    },
  });
};

const getById = async (id: string) => {
  return await instance.get(`questions/${id}`);
};

export const questionApi = {
  getByTopicId,
  getById,
};
