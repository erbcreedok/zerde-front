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
  if (!user.level) {
    user.level = 5;
    user.levelName = 'Прокрастинатор';
    user.levelProgress = 80;
  }
  if (!user.lastActivity) {
    user.lastActivity = new Date((new Date()).getTime() - (1000 * 60 * 60 * 24 * 2)); // 2 дня
  }
  if (!user.rating) {
    user.rating = 1324;
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
  if (!user.about) {
    user.about = 'In expression an solicitude principles in do. Happiness remainder joy but earnestly for off.';
  }
  if (!user.birth_date) {
    user.birth_date = new Date('03.16.1997');
    user.age = moment().diff(user.birth_date, 'years');
  }
  if (!user.city) {
    user.city = 'Алматы';
  }
  if (!user.work_information) {
    user.work_information = {
      place: 'Фрилансер',
      space: 'Дизайн',
      position: 'UX/UI Дизайнер',
      since: new Date('12.12.2016'),
      site: null,
    }
  }
  if (!user.contacts) {
    user.contacts = [
      {type: 'phone', value: '77021113439'},
      {type: 'instagram', value: 'moonfriend_11'},
      {type: 'telegram', value: '@aidosssss'},
    ].map(c => normalizeContact(c));
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