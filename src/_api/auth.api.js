import client from "./index";

const authApi = {
  login(phone, password) {
    return client.post('auth/login', {phone, password}).then(handleResponse);
  },
  register(data) {
    console.log({data});
    return client.post('auth/register', data).then(handleResponse)
  },
  confirmSMS(phone, code) {
    return client.post('auth/verify', {phone, code}).then(handleResponse)
  },
};

export default authApi;

function handleResponse(res) {
  console.log(res);
  return res.data;
}
