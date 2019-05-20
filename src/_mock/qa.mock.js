import questionsMock from "./questions.mock";
import answersMock from "./answers.mock";
import {generateRandomInt} from "../_helpers";

const qaMock = {
  getQAs() {
    const question = questionsMock.getQuestions();
    return question.map(q => {
      q.answers.count = answersMock.getAnswersByQuestionId(q.id).length;
      q.commentsCount = answersMock.getAnswers().filter(a => a.questionId === q.id).length - q.answers.count;
      return q;
    })
  },
  getQAById(id) {
    const qs = this.getQAs();
    return qs.find(q => q.id+'' === id+'');
  },
  
  fetchQAs(page=1, limit=10, {filters={}, sortBy={field: 'createdAt', dir: 'DESC'}} = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let qs = this.getQAs();
        if (Object.keys(filters).length > 0) {
          if(filters.searchText) {
            qs = qs.filter(q => [q.questionTitle.toLowerCase(), q.questionBody.toLowerCase()].join(' ').indexOf(filters.searchText.toLowerCase())!==-1)
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
        const question = this.getQAById(slug);
        if (!question) {
          reject({status: 404, message: 'question not found'});
          return;
        }
        const qs = this.getQAs();
        question.similars = [qs[generateRandomInt(qs.length)], qs[generateRandomInt(qs.length)], qs[generateRandomInt(qs.length)]];
        resolve({status: 200, data: question});
      }, 1000);
    })
  },
};

export default qaMock;
