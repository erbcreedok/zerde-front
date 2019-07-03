import client, {handleResponse} from "../_api";
import {normalizeCourse, normalizeCourses} from "./normalizers";

const clService = {
  loadCourses(page=1, per_page=5) {
    let query = `?page=${page}&per_page=${per_page}`;
    return client.get(`cl/course${query}`).then(handleResponse).then(({data}) => {
      console.log(data);
      return handleCoursesSuccess(data);
    });
  },
  loadArticleById(id) {
    return client.get(`kb/article/${id}`).then(handleResponse).then(({data}) => {
      console.log(data);
      return handleCourseSuccess(data);
    });
  },
  loadThemes() {
    return client.get(`kb/theme`).then(handleResponse).then(({data}) => {
      return data.themes.data;
    });
  },
};

// function handleError(error) {
//   if (error.response.status === 401) {
//     Vue.prototype.$notyf.error({
//       message: capitalize(Vue.prototype.$t('authorisation required'))
//     })
//   }
//   throw error;
// }

function handleCoursesSuccess({courses}) {
  return {
    courses: normalizeCourses(courses.data),
    totalCount: courses.total ? courses.total : courses.data.length,
  }
}
function handleCourseSuccess({course}) {
  return normalizeCourse(course);
}

export default clService;
