import {getListFromLocalStorage, setListToLocalStorage} from '../_helpers/getFromLocalStorage'
import usersMock from './users.mock'
import {generateRandomInt} from '../_helpers'
export const tags = ['Старт бизнеса', 'Онлайн продажи', 'SEO оптимизация', 'Кадровый вопрос', 'Открытие бизнеса',]
const questionsTitles = [
  'Как правильно выбрать торговую точку для магазина бижутерии?',
  'В каком городе лучше начать стартап по продаже носков?',
  'Какие актёры везде играют одинаково независимо от роли?',
  'Кошка не пьет воду из своих мисочек.',
  'О расселении коммуналок',
  'Сколько будет 2+2?',
  'BlaBlaCar бесплатная прога и без рекламы?',
  'Заберут ли меня в армию?',
  'Почему на иностранные фильмы в РФ намеренно завышают возрастной рейтинг ?',
  'Скажите пожалуйста кто пересекал недавно границу с Украиной, что сейчас требуют какие документы? (',
  'Каков максимальный срок ограничения права на выезд из Российской Федерации, которое может иметь место, если россиянин бы',
  'а вам нравиться розовый цвет помады нежный?'
];
const questionBody = `<p>Proin aliquet metus in eros interdum laoreet. Aliquam non condimentum augue. Nulla facilisi. Aliquam id sem ut dui finibus bibendum sit amet eu turpis. Aliquam ac tortor interdum, pharetra odio et, eleifend velit. Aliquam erat volutpat. Sed gravida risus sit amet cursus dapibus.</p>`;
const categories = ['my', 'interesting'];
const generateRandomQuestions = () => {
  return questionsTitles.map((questionTitle, id) => ({
      id,
      questionTitle,
      questionBody,
      tags: tags.filter(() => generateRandomInt(2)),
      answers: {
        count: generateRandomInt(0, 100),
        success: !!generateRandomInt(2),
      },
      createdAt: new Date(`${generateRandomInt(1,5)}.${generateRandomInt(1,28)}.2019`),
      views: generateRandomInt(300),
      subscribers: generateRandomInt(100),
      authorId: generateRandomInt(1,usersMock.getUsers().length),
      categories: ['all', ...categories.filter(() => !!generateRandomInt(2))],
      likes: generateRandomInt(300),
      liked: generateRandomInt(-1,2),
      subscribed: !!generateRandomInt(2),
    })
  );
};
const defQuestions = generateRandomQuestions();
const localStorageNaming = 'Academy-questions';
const questionsMock = {
  resetQuestions() {
    setListToLocalStorage(localStorageNaming, defQuestions);
  },
  getQuestions() {
    const questions = getListFromLocalStorage(localStorageNaming, defQuestions);
    return questions.map(q => {
      q.author = usersMock.getUserById(q.authorId);
      q.createdAt = new Date(q.createdAt);
      return q;
    });
  },
  getQuestionById(id) {
    const qs = this.getQuestions();
    return qs.find(q => q.id+'' === id+'');
  },
  getQuestionIndexById(id) {
    const qs = this.getQuestions();
    return qs.findIndex(q => q.id+'' === id+'');
  },
  setQuestions(questions) {
    setListToLocalStorage(localStorageNaming, questions);
  },
  setQuestion(question) {
    const qs = this.getQuestions();
    const index = this.getQuestionIndexById(question.id);
    if (index===-1)return;
    qs[index] = question;
    this.setQuestions(qs);
  },
  addQuestion(question) {
    const qs = this.getQuestions();
    qs.push(question);
    this.setQuestions(qs);
    return question;
  },
  createQuestion(question, token) {
    const user = usersMock.getUserByToken(token);
    if (!user) {
      throw ({status: 403, message: 'no user with provided token'})
    }
    const q = {
      id: 'question-' + (new Date()).getTime(),
      answers: {
        count: 0,
        success: 0,
      },
      createdAt: new Date(),
      views: 0,
      subscribers: 0,
      authorId: user.id,
      categories: ['all', 'my'],
      likes: 0,
      liked: 0,
      subscribed: 0,
      ...question
    };
    return this.addQuestion(q);
  },
  fetchQuestions(page=1, limit=10, {filters={}, sortBy={field: 'createdAt', dir: 'DESC'}} = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let qs = this.getQuestions();
        if (Object.keys(filters).length > 0) {
          if(filters.searchText) {
            qs = qs.filter(q => q.questionText.toLowerCase().indexOf(filters.searchText.toLowerCase())!==-1)
          }
          if(filters.categories) {
            qs = qs.filter(q => {
              return filters.categories.find(c => {return q.categories.findIndex(i => i === c)!==-1});
            });
          }
        }
        const totalCount = qs.length;
        qs.sort((a, b) => {
          if (sortBy.dir === 'DESC') return b[sortBy.field] - a[sortBy.field];
          else  return a[sortBy.field] - b[sortBy.field];
        });
        resolve ({
          questions: qs.slice((page-1) * limit, page * limit),
          totalCount,
          questionsCount: 1324,
          answersCount: 2332,
        })
      }, 1000)
    })
  },
  fetchQuestion(slug) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!slug) {
          reject({status: 404, message: 'question not found'});
          return;
        }
        const question = this.getQuestionById(slug);
        if (!question) {
          reject({status: 404, message: 'question not found'});
          return;
        }
        const qs = this.getQuestions();
        question.similars = [qs[generateRandomInt(qs.length)], qs[generateRandomInt(qs.length)], qs[generateRandomInt(qs.length)]];
        resolve({status: 200, data: question});
      }, 1000);
    })
  },
  fetchQAStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          questionsCount: 1233,
          answersCount: 4322,
        })
      }, 200)
    });
  },
  fetchAnswerLeaders() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let user = usersMock.getUserById(4);
        if (!user) {
          const users = usersMock.getUsers();
          user = users[users.length - 1];
        }
        resolve([{
          user,
          answersCount: 32,
          commentsCount: 3,
          likesCount: 342,
        }])
      }, 1000);
    });
  },
  setLikeToQuestion(id, value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const q = this.getQuestionById(id);
        if (!q) {
          reject({status: 404, message: 'question not found'});
          return;
        }
        q.liked = value;
        this.setQuestion(q);
        resolve({status: 200, data: q});
      }, 300);
    });
  },
  subscribeToQuestion(id, value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const q = this.getQuestionById(id);
        if (!q) {
          reject({status: 404, message: 'question not found'});
          return;
        }
        q.subscribed = value;
        this.setQuestion(q);
        resolve({status: 200, data: q});
      }, 300);
    });
  },
  sendQuestion(question, token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve({status: 200, data: this.createQuestion(question, token)});
        } catch (e) {
          reject(e);
        }
      }, 1000);
    })
  }
};

window.mockAcademyQuestions = {
  resetQuestions: questionsMock.resetQuestions,
  getQuestions: questionsMock.getQuestions,
  fetchQuestions: questionsMock.fetchQuestions,
  generateRandomQuestions: generateRandomQuestions
};

export default questionsMock;
