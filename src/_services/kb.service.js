import client, {handleResponse} from "../_api";
import {normalizeArticles} from "./normalizers";

const kbService = {
  loadArticles() {
    return client.get(`kb/article`).then(handleResponse).then(({data}) => {
      console.log(data);
      return handleArticleSuccess(data);
    });
  },
  loadThemes() {
    return client.get(`kb/theme`).then(handleResponse).then(({data}) => {
      return data.themes.data;
    });
  },
};

function handleArticleSuccess({articles}) {
  return {
    articles: normalizeArticles(articles.data),
    totalCount: articles.total,
  }
}

export default kbService;
