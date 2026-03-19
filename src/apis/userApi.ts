import instance from "@/utils/instanceAxios";


const login = async (email : string, password : string)=> {
    const res = await instance.get('users',{
        params : {
            email : email,
            password : password
        }
    })
    return res.data.length > 0 ? res.data[0] : null;
}

export const userApi = {
    login
}