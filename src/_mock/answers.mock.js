import questionsMock from './questions.mock'
import {generateRandomInt} from '../_helpers'
import usersMock from './users.mock'
import {getListFromLocalStorage, setListToLocalStorage} from '../_helpers/getFromLocalStorage'

const localStorageNaming = 'Academy-answers';
let id = 0;
const answerTexts = [
  'У нас в армии солдат был с фамилией О',
  'По-французски писалось бы как-нибудь "Eaux".',
  'По-французски писалось бы как-нибудь "Eaux".',
  `-Гарри Поттер, ты умеешь говорить на змеином языке?\n-Нет, это польский..`,
  `О! Всегда интересовало слово гмина!`,
  `Вот это пример правильной операторской работы`,
  `Я видел фильм...`,
  `Потому что МЧС наверно и снимали`,
  `Нет`,
  `Да`,
  `Не хватало только расправленного полотна внизу, для ловли падающих.`,
  `Сколько денег потрачено в пустую.`,
];

const generateAnswer = (questionId, replyTo=null) => {
  return {
    id: id++,
    questionId: questionId,
    answerText: answerTexts[generateRandomInt(answerTexts.length)],
    createdAt:  new Date(`${generateRandomInt(1,5)}.${generateRandomInt(1,28)}.2019`),
    author: usersMock.getRandomUser(),
    likes: generateRandomInt(9),
    liked: generateRandomInt(-1, 2),
    replyTo,
  }
};

const generateAnswers = () => {
  let all = [];
  const qs = questionsMock.getQuestions();
  qs.forEach(question => {
    const answers = [];
    for(let i = 0; i<generateRandomInt(1,3); i++) {
      answers.push(generateAnswer(question.id));
    }
    for(let i = 0; i<generateRandomInt(3,8); i++) {
      answers.push(generateAnswer(question.id, answers[generateRandomInt(answers.length)]));
    }
    all.push(...answers);
  });
  return all;
};

const defAnswers = generateAnswers();

const answersMock = {
  resetAnswers() {
    setListToLocalStorage(localStorageNaming, defAnswers);
  },
  getAnswers() {
    const list = getListFromLocalStorage(localStorageNaming, defAnswers);
    return list.map(l => {
      l.createdAt = new Date(l.createdAt);
      return l;
    });
  },
  getAnswerById(id) {
    const answer = this.getAnswers().find(q => q.id+'' === id+'');
    if (!answer) {
      return undefined;
    }
    answer.children = this.getChildAnswers(answer);
    return answer;
  },
  getAnswersByQuestionId(questionId) {
    const answers = this.getAnswers().filter(a => a.questionId === questionId && !a.replyTo);
    if (answers.length > 0) {
      answers.map(a => {
        a.children = this.getChildAnswers(a);
        return a;
      });
    }
    return answers;
  },
  getChildAnswers(answer) {
    const answers = this.getAnswers().filter(a => a.questionId === answer.questionId && a.replyTo && a.replyTo.id === answer.id);
    if (answers.length > 0) {
      answers.map(a => {
        a.children = this.getChildAnswers(a);
        return a;
      });
    }
    return answers;
  },
  getAnswerIndexById(id) {
    const qs = this.getAnswers();
    return qs.findIndex(q => q.id+'' === id+'');
  },
  setAnswers(answers) {
    setListToLocalStorage(localStorageNaming, answers);
  },
  setAnswer(answer) {
    const answers = this.getAnswers();
    const index = this.getAnswerIndexById(answer.id);
    if (index===-1)return;
    answers[index] = answer;
    this.setAnswers(answers);
  },
  addAnswer(answer) {
    const answers = this.getAnswers();
    answers.push(answer);
    this.setAnswers(answers);
  },
  createReply(answerId, message, token) {
    const answer = this.getAnswerById(answerId);
    const user = usersMock.getUserByToken(token);
    if (!answer) {
      throw ({status: 404, message: 'answer not found'})
    }
    if (!user) {
      throw ({status: 403, message: 'no user with provided token'})
    }
    const reply = {
      ...answer,
      id: 'answer-' + (new Date()).getTime(),
      answerText: message,
      createdAt:  new Date(),
      author: user,
      likes: 0,
      liked: 0,
      replyTo: answer,
    };
    this.addAnswer(reply);
    return reply;
  },
  createAnswer(questionId, message, token) {
    const user = usersMock.getUserByToken(token);
    if (!user) {
      throw ({status: 403, message: 'no user with provided token'})
    }
    const answer = {
      id: 'answer-' + (new Date()).getTime(),
      questionId: questionId,
      answerText: message,
      createdAt:  new Date(),
      author: user,
      likes: 0,
      liked: 0,
      children: [],
      replyTo: null,
    };
    this.addAnswer(answer);
    return answer;
  },
  
  //fetchers
  fetchQuestionAnswers(questionId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const answers = this.getAnswersByQuestionId(questionId);
        resolve({status: 200, data: answers});
      }, 1000)
    });
  },
  sendAnswer(questionId, message, token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve({status: 200, data: this.createAnswer(questionId, message, token)});
        } catch (e) {
          reject(e);
        }
      }, 1000)
    });
  },
  addAnswerReply(answerId, message, token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve({status: 200, data: this.createReply(answerId, message, token)});
        } catch (e) {
          reject(e);
        }
      }, 1000)
    });
  },
  setLikeToAnswer(id, value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const a = this.getAnswerById(id);
        if (!a) {
          reject({status: 404, message: 'answer not found'});
          return;
        }
        a.liked = value;
        this.setAnswer(a);
        resolve({status: 200, data: a});
      }, 300);
    });
  },
};

window.mockAcademyAnswers = {...answersMock};

export default answersMock;
