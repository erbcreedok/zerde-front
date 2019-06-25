import client, {handleResponse} from "../_api";
import {normalizeArticle, normalizeArticles} from "./normalizers";

const kbService = {
  loadArticles() {
    return client.get(`kb/article`).then(handleResponse).then(({data}) => {
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
  loadThemes() {
    return client.get(`kb/theme`).then(handleResponse).then(({data}) => {
      return data.themes.data;
    });
  },
  rateArticle(article_id, rate_value) {
    return client.post(`kb-moderation/article/${article_id}/rate`, {rate_value})
      .then(handleResponse)
      .then(({data}) => data.total);
  },
  addArticleToFavorites(article_id, value=true) {
    return client.post(`user/fav/article/${value ? 'add' : 'remove'}`, {article_id})
      .then(handleResponse)
  },
};

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
