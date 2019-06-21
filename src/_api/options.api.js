import client from './index';

const optionsApi = {
  getSpecializations() {
    return client.get('profile/specialization/available').then(res => res.data.data);
  },
  getRegions() {
    return client.get('profile/region/available').then(res => res.data.data);
  },
  getDomains() {
    return client.get('profile/job/domain/available').then(res => res.data.data);
  },
};

export default optionsApi;