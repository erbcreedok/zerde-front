import client, {handleResponse} from './index'

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
  resendSMS(phone) {
    return client.post('auth/resend', {phone}).then(handleResponse)
  },
  forgotPassword(phone) {
    return client.post('password/create', {phone}).then(handleResponse)
  },
  verifyForgotPassword(phone, code) {
    return client.post('password/verify', {phone, code}).then(handleResponse)
  },
  resetPassword(phone, password, c_password, code) {
    return client.post('password/reset', {phone, password, c_password, code}).then(handleResponse)
  }
};

export default authApi;
