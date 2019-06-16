import Vue from 'vue'
import answersMock from '../_mock/answers.mock'
import authService from './auth.service'
import qaApi from '../_api/qa.api'
import {capitalize} from '../_filters/capitalize'
import {normalizeQuestion, normalizeQuestions, normalizeUsers} from './normalizers'
import themesApi from '../_api/themes.api'

const qaService = {
  getQuestions(page=1, limit=5, {searchText="", themes=[], tags=[], category, ...filters}={}) {
    console.log({page,limit,searchText,tags,category,filters, themes});
    // return qaMock.fetchQAs(page, limit, {filters: {...filters, categories, tags, searchText}, });
    return qaApi.getQuestions(page, limit, searchText, themes, category).then(({data: {questions}}) => {
      return {
        questions: normalizeQuestions(questions.data),
        questionsCount: questions.total,
        answersCount: 221,
        totalCount: questions.total,
      }
    });
  },
  getQuestion(slug) {
    // return qaMock.fetchQuestion(slug).then(({data}) => data);
    return qaApi.getQuestion(slug).then(({data}) => normalizeQuestion(data.question));
  },
  getQAStats() {
    return qaApi.getQAStats().then(({data}) => data);
  },
  getAnswerLeaders() {
    return qaApi.getAnswerLeaders().then(({data}) => normalizeUsers(data.leaders));
  },
  getQuestionSimilars(question_id) {
    return qaApi.getQuestionSimilars(question_id).then(({data}) => normalizeQuestions(data.questions).filter(q => {
      return q.id !== question_id-0
    }));
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
  setCorrectAnswer(question_id, answer_id, is_correct) {
    return qaApi.setCorrectAnswer(question_id, answer_id, is_correct)
      .catch(handleError)
      .then(({data}) => data.is_correct);
  },
  async sendQuestion(question) {
    // const token = authService.getToken();
    // return questionsMock.sendQuestion(question, token).then(({data}) => data);
    return await qaApi.createQuestion(question)
      .catch(handleError)
      .then(({data}) => normalizeQuestion(data.question));
  },
  getThemes() {
    return themesApi.getThemes().then(({data}) => data.themes.data);
  },
  async addThemeToFav(theme_id, value) {
    if (!authService.isLogged()) {
      throw {message: 'authorisation required', status: 0};
    }
    return await themesApi.addThemeToFav(theme_id, value);
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
