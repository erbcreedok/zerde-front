import client, {handleError, handleResponse} from '../_api'
import {normalizeCourse, normalizeCourses} from "./normalizers";

const clService = {
  loadCourses(page=1, per_page=5) {
    let query = `?page=${page}&per_page=${per_page}`;
    return client.get(`cl/course${query}`).then(handleResponse).then(({data}) => {
      console.log(data);
      return handleCoursesSuccess(data);
    });
  },
  loadCourseById(id) {
    return client.get(`cl/course/${id}`).then(handleResponse).then(({data}) => {
      console.log(data);
      return handleCourseSuccess(data);
    });
  },
  loadUserCourses(user_id) {
    return client.get(`user/${user_id}/cl/courses`).then(handleResponse).then(({data}) => {
      return handleCoursesSuccess(data);
    });
  },
  loadThemes() {
    return client.get(`cl/theme`).then(handleResponse).then(({data}) => {
      return data.themes.data;
    });
  },
  sendComment(course_id, body) {
    return client.post('cl-moderation/course/comment', {course_id, body})
      .then(handleResponse)
      .catch(handleError)
      .then(({data}) => data.comment);
  },
  setLikeToComment(comment_id, rate_value) {
    return client.post(`cl-moderation/course/comment/${comment_id}/rate`, {rate_value})
      .then(handleResponse)
      .catch(handleError)
      .then(({data}) => data.total);
  },
  loadLessonById(id) {
    console.log(id);
    return client.get(`cl/lesson/${id}`)
      .catch(handleError)
      .then(handleResponse)
      .then(({data}) => data);
  },
  startCourse(id) {
    return client.post(`user/course/start/${id}`)
      .then(handleResponse)
      .catch(handleError)
  },
  finishCourse(id) {
    return client.post(`user/course/finish/${id}`)
      .then(handleResponse)
      .catch(handleError)
  },
  startLesson(id) {
    return client.post(`user/lesson/start/${id}`)
      .then(handleResponse)
      .catch(handleError)
  },
  finishLesson(id) {
    return client.post(`user/lesson/finish/${id}`)
      .then(handleResponse)
      .catch(handleError)
  },
  rateLesson(lesson_id, rate_value=1) {
    return client.post(`/cl-moderation/lesson/${lesson_id}/rate`, {rate_value})
      .then(handleResponse)
      .catch(handleError)
      .then(({data}) => data.total);
  },
  sendCommentToLesson(lesson_id, body) {
    return client.post('cl-moderation/lesson/comment', {lesson_id, body})
      .then(handleResponse)
      .catch(handleError)
      .then(({data}) => data.comment);
  },
  setLikeToLessonComment(comment_id, rate_value) {
    return client.post(`cl-moderation/lesson/comment/${comment_id}/rate`, {rate_value})
      .then(handleResponse)
      .catch(handleError)
      .then(({data}) => data.total);
  },
  loadQuizByLessonId(lesson_id) {
    return client.get(`cl/tests/${lesson_id}`)
      .then(handleResponse)
      .catch(handleError)
      .then(({data}) => data);
  },
  submitQuizResult(lesson_id, test_id, result) {
    return client.post(`cl/tests/${lesson_id}/${test_id}`, {result})
      .then(handleResponse)
      .catch(handleError)
      .then(({data}) => data.isTestSuccess);
  },
};

function handleCoursesSuccess({courses}) {
  return {
    courses: normalizeCourses(courses.data),
    totalCount: courses.total ? courses.total : courses.data.length,
  }
}
function handleCourseSuccess(course) {
  return normalizeCourse(course);
}

export default clService;
