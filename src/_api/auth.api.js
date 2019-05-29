import client from "./index";

const authApi = {
  login(phone, password) {
    return client.post('auth/login', {phone, password}).then(res => {
      return res.data;
    });
  }
};

export default authApi;
