import Vue from 'vue';
import questionsMock from '../_mock/questions.mock'
import answersMock from '../_mock/answers.mock'
import authService from './auth.service'
import qaApi from '../_api/qa.api'
import {capitalize} from '../_filters/capitalize'

const qaService = {
  getQuestions(page=1, limit=5, {searchText="", theme, tags=[], categories=[], ...filters}={}) {
    console.log({page,limit,searchText,tags,categories,filters, theme});
    // return qaMock.fetchQAs(page, limit, {filters: {...filters, categories, tags, searchText}, });
    return qaApi.getQuestions(page, searchText).then(({data: {questions}}) => {
      return {
        questions: questions.data,
        questionsCount: questions.total,
        answersCount: 221,
        totalCount: questions.total,
      }
    });
  },
  getQuestion(slug) {
    // return qaMock.fetchQuestion(slug).then(({data}) => data);
    return qaApi.getQuestion(slug).then(({data}) => data.question);
  },
  getQAStats() {
    return questionsMock.fetchQAStats();
  },
  getAnswerLeaders() {
    return questionsMock.fetchAnswerLeaders();
  },
  setLikeToQuestion(id, value) {
    return qaApi.setLikeToQuestion(id, value)
      .catch(handleError)
      .then(({data}) => data.total);
  },
  subscribeToQuestion(id, value) {
    return qaApi.addQuestionToFav(id, value)
      .catch(handleError)
      .then(({data}) => data);
  },
  getQuestionAnswers(questionId) {
    return answersMock.fetchQuestionAnswers(questionId).then(({data}) => data);
  },
  addAnswerReply(answerId, message) {
    const token = authService.getToken();
    return answersMock.addAnswerReply(answerId, message, token).then(({data}) => data);
  },
  sendAnswer(questionId, message) {
    // const token = authService.getToken();
    // return answersMock.sendAnswer(questionId, message, token).then(({data}) => data);
    return qaApi.sendAnswer(questionId, message)
      .catch(handleError)
      .then(({data}) => data.answer);
  },
  sendComment(answer_id, message) {
    return qaApi.sendComment(answer_id, message)
      .catch(handleError)
      .then(({data}) => data.comment);
  },
  setLikeToAnswer(id, value) {
    return qaApi.setLikeToAnswer(id, value)
      .catch(handleError)
      .then(({data}) => data.total);
  },
  setLikeToComment(id, value) {
    return qaApi.setLikeToComment(id, value)
      .catch(handleError)
      .then(({data}) => data.total);
  },
  async sendQuestion(question) {
    // const token = authService.getToken();
    // return questionsMock.sendQuestion(question, token).then(({data}) => data);
    return await qaApi.createQuestion(question)
      .catch(handleError)
      .then(({data}) => data);
  },
  getThemes() {
    return qaApi.getThemes().then(({data}) => data.themes);
  },
  async addThemeToFav(theme_id) {
    if (!authService.isLogged()) {
      throw {message: 'authorisation required', status: 0};
    }
    return await qaApi.addThemeToFav(theme_id);
  }
};

function handleError(error) {
  if (error.response.status === 401) {
    Vue.prototype.$notyf.error({
      message: capitalize(Vue.prototype.$t('authorisation required'))
    })
  }
  throw error;
}

export default qaService;
