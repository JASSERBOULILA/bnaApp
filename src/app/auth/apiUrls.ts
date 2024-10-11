// apiUrls.ts
export const urls ={
  authentications:"http://localhost:8081/api/v1/auth/authenticate",
  user:{
    getUser:"http://localhost:8081/api/v1/auth/getUser",
    getUserByMatricule:"http://localhost:8081/api/v1/admin/getUser",
    getUserByMatriculeF:"http://localhost:8081/api/v1/users/getUserById/",
    registerUser:"http://localhost:8081/api/v1/auth/register",
    updateUser:"http://localhost:8081/api/v1/admin/editUser/",
    updateUserPassword:"http://localhost:8081/api/v1/users/editUserPassword/",
    updateUserRole:"http://localhost:8081/api/v1/admin/editUser/",
    getAllUsers:"http://localhost:8081/api/v1/users/allUsers",
    changePasswordOnEmail:"http://localhost:8081/api/v1/passwordFirst/getUser/",
    sendEmail:"http://localhost:8081/api/v1/passwordFirst/sendEmail",
    checkPassword:"http://localhost:8081/api/v1/passwordFirst/checkThePassword",
    deleteUser:"http://localhost:8081/api/v1/users/deleteUser/",
  },
  logout:"http://localhost:8081/api/v1/auth/logout",
  interim:{
    createInterim:"http://localhost:8081/api/v1/interim/new",
    getAllInterim:"http://localhost:8081/api/v1/interim/allInterim",
    getInterimByMatricule:"http://localhost:8081/api/v1/interim/getInterim/",
  },
}
