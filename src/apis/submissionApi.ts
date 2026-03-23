import type { SubmissionPayload, SubmissionResponse } from "@/types/submission.types";
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
const create = async(payload : SubmissionPayload) : Promise<SubmissionResponse> => {
  const response = await instance.post('submissions', payload)
  return response.data
}

export const submissionApi = {
  getByUserId,
  getById,
  create
};
