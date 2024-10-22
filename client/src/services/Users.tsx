  import axios from "axios";
interface ServiceUserloginParam {
  email: string,
  password?: string,
  name?: string,
}
const ServiceUserlogin = async ({email, password}: ServiceUserloginParam) : Promise<{success: boolean}> => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/dang-nhap`, { email, password });
        if (response.status === 200) {
            const data= response.data;
           
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('name', data.name);
            sessionStorage.setItem('id', data.id);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('refreshToken', data.refreshToken);
            sessionStorage.setItem('roles', data.roles);
            sessionStorage.setItem('permissions', data.permissions);
        return {success: true}
        } else {
         
            return {success: false}
        }
    } catch (error) {
        console.error('An error occurred during login:', error);
        throw error;
    }
};



const Userregister = async ({email, password, name}: ServiceUserloginParam) : Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/dang-ky`, { email, password, name });
    if (response.status === 201) {
      return { success: true, message: "Registration successful" }; // Thêm thông điệp thành công
    } else {
      return { success: false, message: response.data.message || "Registration failed" };
    }
  } catch (error) {
    console.error("Error in Userregister:", error);
    return { success: false, message: "An error occurred during registration" };
  }
};
const Getalluser = async()=>{
  try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/getalluser`);
      if(data.status === 200){
        return data;
      }
  } catch (error) {
      throw(error)
  }
}
const Update_user_roles = async(id_user_update:number,edited_roles:string)=>{
     try {
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/update_roles`,{id_user_update,edited_roles})
        if(data.status === 200){
          return {success: true};
        }
     } catch (error) {
      throw(error)
     }
}
const Update_user_permission = async(id_user_update:number,edited_Permissions:string)=>{
  try {
     const data = await axios.post(`${process.env.REACT_APP_API_URL}/update_permissions`,{id_user_update,edited_Permissions});
     if(data.status === 200){
      return {success:true}
     }
  } catch (error) {
    throw(error);
  }

}
export { ServiceUserlogin,Userregister,Getalluser,Update_user_roles,Update_user_permission };
