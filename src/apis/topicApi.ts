import instance from "@/utils/instanceAxios";
import type { ApiTopic } from "@/types/api.types";

const getAll = async (): Promise<ApiTopic[]> => {
  const res = await instance.get("topics");
  return res.data;
};

const getById = async (id: string): Promise<ApiTopic> => {
  const res = await instance.get(`topics/${id}`);
  return res.data;
};

const create = async (data: Omit<ApiTopic, "id">): Promise<ApiTopic> => {
  const res = await instance.post("topics", data);
  return res.data;
};

const update = async (
  id: string,
  data: Partial<ApiTopic>,
): Promise<ApiTopic> => {
  const res = await instance.patch(`topics/${id}`, data);
  return res.data;
};

const remove = async (id: string): Promise<void> => {
  await instance.delete(`topics/${id}`);
};

export const topicApi = {
  getAll,
  getById,
  create,
  update,
  remove,
};
