import instance from "@/utils/instanceAxios";

const login = async (email : string, password : string)=> {
    const res = await instance.get('users',{
        params : { email: email, password: password }
    })
    return res.data.length > 0 ? res.data[0] : null;
}

 const register = async (email : string, password : string, fullName : string) => {
  const res = await instance.post('users', {email, password, fullName, role : 'user'})
  return res.data
}
const getAllUsers = () => {
    return instance.get('/users');
}
 const getUserByEmail = async(email : string) => {
  const res = await instance.get('users',{
    params : {email}
  })
  return res.data
}
const getAllSubmissions = () => {
    return instance.get('/submissions');
}
export const userApi = {
    login,
    getAllUsers,          
    getAllSubmissions,
    register,
    getUserByEmail
}