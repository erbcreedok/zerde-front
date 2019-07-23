import moment from 'moment';
import userService from './user.service'
import {getContactIconClass, getContactLabel, getContactLink} from '../_types/contact-types'
import {homeURL} from "../_api";

export function normalizeUser(user, save=true) {
  if (!user.fullname) {
    user.fullname = (user.firstname + ' ' + user.lastname).trim();
  }
  if (!user.avatar_src) {
    user.avatar_src = '/assets/img/avatar-placeholder.jpg';
  } else if (user.avatar_src.indexOf(homeURL) === -1) {
    user.avatar_src = homeURL + user.avatar_src;
  }
  if (save) {
    userService.loadedUsers.push(user);
  }
  return user;
}

export function normalizeCourseAuthor(author) {
  if (!author.fullname) {
    author.fullname = (author.firstname + ' ' + author.lastname).trim();
  }
  if (!author.avatar_src) {
    if (author.avatar) {
      author.avatar_src = homeURL + '/storage/cl/author/' + author.avatar;
    } else {
      author.avatar_src = '/assets/img/avatar-placeholder.jpg';
    }
  } else if (author.avatar_src.indexOf(homeURL) === -1) {
    author.avatar_src = homeURL + author.avatar_src;
  }
  return author;
}

export function normalizeUserProfile(user) {
  user = normalizeUser(user, false);
  if (!user.level) {
    user.level = 5;
    user.levelName = 'Прокрастинатор';
    user.levelProgress = 80;
  }
  if (!user.lastActivity) {
    user.lastActivity = new Date(user.last_seen);
  }
  if (!user.rating) {
    user.rating = 124;
  }
  if (user.region && user.region.id) {
    user.region_id = user.region.id;
  }
  if (!user.qa_count) {
    user.qa_count = null;
  }
  if (!user.cm_count) {
    user.cm_count = null;
  }
  if (!user.coursesCount) {
    user.coursesCount = 0;
  }
  if (user.birth_date && !user.age) {
    user.age = moment().diff(user.birth_date, 'years');
    user.birth_date = moment(user.birth_date).format('DD.MM.YYYY');
  } else {
    user.age = null;
  }
  if (!user.job) {
    user.job = {
      name: null,
      domain: {
        id: null,
        name: null,
      },
      domain_id: null,
      position: null,
      start_date: null,
      link: null,
    };
  } else {
    if(user.job.job_domain) {
      user.job.domain = user.job.job_domain;
    }
    if(user.job.start_date) {
      user.job.start_date = moment(user.job.start_date).format('DD.MM.YYYY');
    }
  }
  if (!user.specializations) {
    user.specializations = [];
  }
  if (!user.contacts && user.contacts !== null) {
    user.contacts = {
      phone: null,
      instagram: null,
      telegram: null,
      skype: null,
      vk: null,
      facebook: null,
    };
  } else {
    user.contacts = JSON.parse(user.contacts);
  }
  return user;
}

export function normalizeUsers(users, save=true) {
  return users.map(u => normalizeUser(u, save));
}

export function normalizeCourseAuthors(authors) {
  return authors.map(a => normalizeCourseAuthor(a));
}

export function normalizeUserProfileForm(data) {
  data.delete('id');
  data.delete('username');
  data.delete('phone');
  data.delete('age');
  data.delete('qa_count');
  data.delete('cm_count');
  data.delete('avatar_src');
  data.delete('fullname');
  data.delete('level');
  data.delete('levelName');
  data.delete('levelProgress');
  data.delete('lastActivity');
  data.delete('rating');
  data.delete('region');
  data.delete('questionsCount');
  data.delete('commentsCount');
  data.delete('coursesCount');
  data.delete('job[id]');
  data.delete('job[user_id]');
  data.delete('job[created_at]');
  data.delete('job[updated_at]');
  
  return data;
}


export function normalizeQuestion(question) {
  if (question.author) {
    question.author = normalizeUser(question.author);
  }
  return question;
}

export function normalizeQuestions(questions) {
  return questions.map(q => normalizeQuestion(q));
}

export function normalizeContact(contact) {
  if (!contact.link) {
    contact.link = getContactLink(contact.type, contact.value);
  }
  if (!contact.label) {
    contact.label = getContactLabel(contact.type, contact.value);
  }
  contact.icon = getContactIconClass(contact.type);
  return contact;
}

export function normalizeArticle(article) {
  article = {...article,
    created_at: moment(article.created_at),
    updated_at: moment(article.updated_at),
    cover: article.img_src ? article.img_src : '/assets/img/blogpost_placeholder.jpg',
    category: article.themes && article.themes[0] && article.themes[0].name ? article.themes[0].name : '',
    author: article.author ? normalizeUser(article.author) : null,
    embed: article.video ? generateEmbedLink(article.video) : null,
  };
  return article;
}

export function normalizeCourse(course) {
  if (course.lessons_list) {
    const lessons = [];
    course.lessons_list.map((l, index) => {
      lessons.push({...l, type: 'lesson'});
      if (l.test) {
        const user_access = l.user_finished;
        const user_finished = l.test_result && l.test_result.success;
        lessons.push({type: 'quiz', id: l.id, title: `Тест. Урок ${index+1}`, user_access, user_finished});
      }
    });
    course.lessons = lessons;
  }
  course = {
    ...course,
    authors: course.authors ? normalizeCourseAuthors(course.authors) : course.authors_list ? normalizeCourseAuthors(course.authors_list) : [],
  };
  return course;
}

export function generateEmbedLink(link, type='video_out') {
  if (type==='video_out') {
    if (link.indexOf('youtube.com/watch?v=') !== -1) {
      const code = link.split('youtube.com/watch?v=')[1].split('=')[0];
      link = 'https://www.youtube.com/embed/' + code;
    } else if (link.indexOf('youtu.be/') !== -1) {
      const code = link.split('youtu.be/')[1];
      link = 'https://www.youtube.com/embed/' + code;
    } else {
      link = 'http://academy-back.tk/storage/kb/article/' + link;
    }
    return link;
  }
  
}

export function normalizeArticles(articles = []) {
  return articles.map(a => normalizeArticle(a));
}

export function normalizeCourses(courses) {
  return courses.map(c => normalizeCourse(c));
}
