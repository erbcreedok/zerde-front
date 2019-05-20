import questionsMock from '../_mock/questions.mock'
import answersMock from '../_mock/answers.mock'
import authService from "./auth.service";
import qaMock from "../_mock/qa.mock";

const qaService = {
  getQuestions(page=1, limit=5, {searchText="", tags=[], categories=[], ...filters}={}) {
    return qaMock.fetchQAs(page, limit, {filters: {...filters, categories, tags, searchText}, });
  },
  getQuestion(slug) {
    return qaMock.fetchQuestion(slug).then(({data}) => data);
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
  },
  addAnswerReply(answerId, message) {
    const token = authService.getToken();
    return answersMock.addAnswerReply(answerId, message, token).then(({data}) => data);
  },
  sendAnswer(questionId, message) {
    const token = authService.getToken();
    return answersMock.sendAnswer(questionId, message, token).then(({data}) => data);
  },
  setLikeToAnswer(id, value) {
    return answersMock.setLikeToAnswer(id, value).then(({data}) => data);
  },
  sendQuestion(question) {
    const token = authService.getToken();
    return questionsMock.sendQuestion(question, token).then(({data}) => data);
  }
};

export default qaService;
