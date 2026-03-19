import instance from "@/utils/instanceAxios";


const getAll = async ()=> {
    return await instance.get("topics")
}

export const topicApi = {
    getAll
}