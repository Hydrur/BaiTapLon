import createApiAdmin from "../api.auth.service";

class AuthorizationServiceAdmin {

  constructor(baseUrl = "/api/admin/auth") {
    this.api = createApiAdmin(baseUrl);
  }

  // async submitLogin(data) {
  //   console.log("data",data)
  //   return (await this.api.post("/login", data)).data;
  // }

  async submitLogin(credentials){
    try {
        const response = await this.api.post('/login', credentials);
        const { token, user } = response.data;

        // Store token and user data in local storage
        // localStorage.setItem('token', token);
        // localStorage.setItem('user', JSON.stringify(user));

        // return user;
    } catch (error) {
        throw error;
    }
};


  async logOut(data) {
    return (await this.api.get("/logout", data)).data;
  }
}

export default new AuthorizationServiceAdmin();