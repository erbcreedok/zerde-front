import moment from 'moment';
import userService from './user.service'
import {getContactIconClass, getContactLabel, getContactLink} from '../_types/contact-types'

export function normalizeUser(user, save=true) {
  if (!user.fullname) {
    user.fullname = (user.firstname + ' ' + user.lastname).trim();
  }
  if (!user.avatar_src) {
    user.avatar_src = '/assets/img/avatar-placeholder.jpg';
  }
  if (save) {
    userService.loadedUsers.push(user);
  }
  return user;
}

export function normalizeUserProfile(user) {
  user = normalizeUser(user, false);
  if (!user.level) {
    user.level = 5;
    user.levelName = 'Прокрастинатор';
    user.levelProgress = 80;
  }
  if (!user.lastActivity) {
    user.lastActivity = new Date((new Date()).getTime() - (1000 * 60 * 60 * 24 * 2)); // 2 дня
  }
  if (!user.rating) {
    user.rating = 124;
  }
  if (!user.questionsCount) {
    user.questionsCount = 5;
  }
  if (!user.commentsCount) {
    user.commentsCount = 10;
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
      domain_id: null,
      position: null,
      start_date: null,
      link: null,
    };
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

export function normalizeUsers(users) {
  return users.map(u => normalizeUser(u));
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