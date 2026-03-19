import instance from "@/utils/instanceAxios";


const getQuestionByTopicId = async (topicId : string)=> {
    const res = await instance.get("questions",{
        params : {
            topicId : topicId
        }
    })
    return res.data
}

export const questionApi = {
    getQuestionByTopicId
}