import client from "./index";

const userApi = {
  getMyUser() {
    return client.get('user/info').then(res => {
      return res.data.data;
    })
  },

};

export default userApi;
