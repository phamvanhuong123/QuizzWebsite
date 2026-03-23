import instance from "@/utils/instanceAxios";

const getAll = async () => {
  return await instance.get("questions");
};

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

const create = async (data: any) => {
  return await instance.post("questions", data);
};

const update = async (id: string, data: any) => {
  return await instance.put(`questions/${id}`, data);
};

const remove = async (id: string) => {
  return await instance.delete(`questions/${id}`);
};

export const questionApi = {
  getAll, 
  getByTopicId,
  getById,
  create,
  update,
  remove
};