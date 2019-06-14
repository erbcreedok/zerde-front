import client, {handleResponse} from './index'
import i18nService from '../_services/i18n.service'

const qaApi = {
  getThemes() {
    return client.get('qa/theme').then(handleResponse);
  },
  addThemeToFav(theme_id) {
    return client.post('/user/fav/theme', {theme_id}).then(handleResponse);
  },
  createQuestion({questionTitle: title, questionBody: body, themes}) {
    return client.post('qa-moderation/question', {
      locale: i18nService.getCurrentLocale(),
      title,
      body,
      themes: JSON.stringify(themes.map(t => t.id)),
    }).then(handleResponse);
  },
  getQuestions(page=1, per_page=5, search='', themes=[]){
    console.log({page, search});
    let query = `?page=${page}&per_page=${per_page}`;
    if (search !== '') {
      query += '&search='+search;
    }
    if (themes && themes.length) {
      query += '&themes='+JSON.stringify(themes);
    }
    return client.get(`qa/question${query}`).then(handleResponse);
  },
  getQuestion(id) {
    return client.get(`qa/question/${id}`).then(handleResponse);
  },
  sendAnswer(question_id, body) {
    return client.post('qa-moderation/answer', {question_id, body}).then(handleResponse);
  },
  sendComment(answer_id, body) {
    return client.post('qa-moderation/comment', {answer_id, body}).then(handleResponse)
  },
  setLikeToAnswer(answer_id, rate_value) {
    return client.post(`qa-moderation/answer/${answer_id}/rate`, {rate_value}).then(handleResponse)
  },
  setLikeToComment(comment_id, rate_value) {
    return client.post(`qa-moderation/comment/${comment_id}/rate`, {rate_value}).then(handleResponse)
  },
  setLikeToQuestion(question_id, rate_value) {
    return client.post(`qa-moderation/question/${question_id}/rate`, {rate_value}).then(handleResponse)
  },
  addQuestionToFav(question_id) {
    return client.post('user/fav/question', {question_id}).then(handleResponse)
  },
};

export default qaApi;
