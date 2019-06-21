import optionsApi from '../_api/options.api'

const optionsService = {
  getSpecializations() {
    return optionsApi.getSpecializations().then(({specializations}) => specializations);
  },
  getRegions() {
    return optionsApi.getRegions().then(({regions}) => regions);
  },
  getDomains() {
    return optionsApi.getDomains().then(({job_domains}) => job_domains);
  },
};

export default optionsService;