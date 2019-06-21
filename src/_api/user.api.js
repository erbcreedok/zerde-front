import client from "./index";

const userApi = {
  getMyUser() {
    return client.get('user/info').then(res => {
      return res.data.data;
    });
  },
  getUserById(id) {
    return client.get('user/'+id+'/info').then(res => {
      return res.data.data;
    });
  },
  getMyProfile() {
    return client.get('profile/info').then(res => {
      return res.data.data;
    });
  },
  getUserProfile(id) {
    return client.get('user/'+id).then(res => {
      return res.data.data;
    })
  },
  updateProfile(data) {
    return client.put('/profile/update', data, {headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
      return res.data;
    });
  }
};

export default userApi;
