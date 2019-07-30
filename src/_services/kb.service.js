import client, {handleResponse} from "../_api";
import {normalizeArticle, normalizeArticles} from "./normalizers";
import Vue from "vue";
import {capitalize} from "../_filters/capitalize";

const kbService = {
  loadArticles(page=1, per_page=5, {search, themes, types, orderBy} = {}) {
    let query = `?page=${page}&per_page=${per_page}`;
    if (search && search.length) {
      query += '&search=' + encodeURI(search);
    }
    if (themes && themes.length) {
      query += '&themes=' + encodeURI(JSON.stringify(themes));
    }
    if (types && types.length) {
      query += '&types=' + encodeURI(JSON.stringify(types));
    }
    console.log(orderBy);
    if (orderBy) {
      query += `&order_by[${encodeURI(orderBy)}]=DESC`
    }
    return client.get(`kb/article${query}`).then(handleResponse).then(({data}) => {
      console.log(data);
      return handleArticlesSuccess(data);
    });
  },
  loadArticleById(id) {
    return client.get(`kb/article/${id}`).then(handleResponse).then(({data}) => {
      console.log(data);
      return handleArticleSuccess(data);
    });
  },
  loadSimilars(id) {
    return client.get(`kb/similar-articles/${id}`).then(handleResponse).then(({data}) => {
      console.log(data);
      return normalizeArticles(data.articles);
    });
  },
  loadFavorites(page=1, per_page=5) {
    let query = `?page=${page}&per_page=${per_page}`;
    return client.get(`profile/kb/favorite${query}`).then(handleResponse).then(({data}) => {
      return handleArticlesSuccess(data);
    });
  },
  loadThemes() {
    return client.get(`kb/theme`).then(handleResponse).then(({data}) => {
      return data.themes.data;
    });
  },
  rateArticle(article_id, rate_value) {
    return client.post(`kb-moderation/article/${article_id}/rate`, {rate_value})
      .catch(handleError)
      .then(handleResponse)
      .then(({data}) => data.total);
  },
  addArticleToFavorites(article_id, value=true) {
    return client.post(`user/fav/article/${value ? 'add' : 'remove'}`, {article_id})
      .catch(handleError)
      .then(handleResponse)
  },
  sendComment(article_id, body) {
    return client.post('kb-moderation/comment', {article_id, body})
      .then(handleResponse)
      .catch(handleError)
      .then(({data}) => data.comment);
  },
  setLikeToComment(comment_id, rate_value) {
    return client.post(`kb-moderation/comment/${comment_id}/rate`, {rate_value})
      .then(handleResponse)
      .catch(handleError)
      .then(({data}) => data.total);
  },
};

function handleError(error) {
  if (error.response.status === 401) {
    Vue.prototype.$notyf.error({
      message: capitalize(Vue.prototype.$t('authorisation required'))
    })
  }
  throw error;
}

function handleArticlesSuccess({articles}) {
  return {
    articles: normalizeArticles(articles.data),
    totalCount: articles.total ? articles.total : articles.data.length,
  }
}
function handleArticleSuccess({article}) {
  return normalizeArticle(article);
}

export default kbService;
