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
    data.set('_method', 'PUT');
    return client.post('/profile/update', data, {headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
      return res.data.data;
    });
  },
  approveSpecialization(user_id, specialization_id, val) {
    if (val) {
      return client.post('user/specialization/approve', {user_id, specialization_id}).then(res => res.data.data);
    } else {
      return client.post('user/specialization/disapprove', {user_id, specialization_id}).then(res => res.data.data);
    }
  }
};

export default userApi;
