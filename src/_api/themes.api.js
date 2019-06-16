import client, {handleResponse} from './index'

const themesApi = {
  getThemes() {
    return client.get('qa/theme').then(handleResponse);
  },
  addThemeToFav(theme_id, value=false) {
    if (value) {
      return client.post('/user/fav/theme/add', {theme_id}).then(handleResponse);
    } else {
      return client.post('/user/fav/theme/remove', {theme_id}).then(handleResponse);
    }
  },
};

export default themesApi;