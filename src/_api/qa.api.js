import client, {handleResponse} from './index'
import i18nService from '../_services/i18n.service'

const qaApi = {
  createQuestion({questionTitle: title, questionBody: body, themes}) {
    return client.post('qa-moderation/question', {
      locale: i18nService.getCurrentLocale(),
      title,
      body,
      themes: JSON.stringify(themes.map(t => t.id)),
    }).then(handleResponse);
  },
  getQuestions(page=1, per_page=5, {search='', themes=[], category='all', orderBy, orderDir='DESC'} = {}){
    let route = '/question';
    let query = `?page=${page}&per_page=${per_page}`;
    switch (category) {
      case 'all':
        route = '/question';
        break;
      case 'my':
        route = '/my-list';
        break;
      case 'interesting':
        route = '/interesting';
        break;
    }
    if (search !== '') {
      query += '&search='+search;
    }
    if (themes && themes.length) {
      query += '&themes='+JSON.stringify(themes);
    }
    if (orderBy) {
      query += `&order_by[${encodeURI(orderBy)}]=${orderDir ? orderDir : 'DESC'}`
    }
    return client.get(`qa${route}${query}`).then(handleResponse);
  },
  getQuestion(id) {
    return client.get(`qa/question/${id}`).then(handleResponse);
  },
  getQuestionSimilars(question_id) {
    return client.get(`qa/similar-questions/${question_id}`).then(handleResponse);
  },
  getFavoriteQuestions() {
    return client.get(`/profile/qa/favorite`).then(handleResponse)
  },
  getFavoriteMaterials() {
    return client.get(`/profile/kb/favorite`).then(handleResponse)
  },
  getQAStats() {
    return client.get(`qa/count`).then(handleResponse);
  },
  getAnswerLeaders() {
    return client.get(`qa/answers-leader`).then(handleResponse);
  },
  getQuestionByUserId(user_id) {
    return client.get(`user/${user_id}/questions`).then(handleResponse);
  },
  getAnswersByUserId(user_id) {
    return client.get(`user/${user_id}/answers`).then(handleResponse);
  },
  getCommentsByUserId(user_id) {
    return client.get(`user/${user_id}/qa/comments`).then(handleResponse);
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
  setCorrectAnswer(question_id, answer_id, is_correct) {
    return client.post(`/qa-moderation/select/${answer_id}/question/${question_id}`, {is_correct: is_correct ? '1' : '0'}).then(handleResponse)
  },
  addQuestionToFav(question_id, value) {
    if (value) {
      return client.post('user/fav/question/add', {question_id}).then(handleResponse)
    } else {
      return client.post('user/fav/question/remove', {question_id}).then(handleResponse)
    }
  },
};

export default qaApi;
