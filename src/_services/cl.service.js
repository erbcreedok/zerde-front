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
