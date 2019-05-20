import questionsMock from '../_mock/questions.mock'
import answersMock from '../_mock/answers.mock'

const qaService = {
  getQuestions(page=1, limit=5, {searchText="", tags=[], categories=[], ...filters}={}) {
    return questionsMock.fetchQuestions(page, limit, {filters: {...filters, categories, tags, searchText}, });
  },
  getQuestion(slug) {
    return questionsMock.fetchQuestion(slug).then(({data}) => data);
  },
  getQAStats() {
    return questionsMock.fetchQAStats();
  },
  getAnswerLeaders() {
    return questionsMock.fetchAnswerLeaders();
  },
  setLikeToQuestion(id, value) {
    return questionsMock.setLikeToQuestion(id, value).then(({data}) => data);
  },
  subscribeToQuestion(id, value) {
    return questionsMock.subscribeToQuestion(id, value).then(({data}) => data);
  },
  getQuestionAnswers(questionId) {
    return answersMock.fetchQuestionAnswers(questionId).then(({data}) => data);
  }
}

export default qaService;