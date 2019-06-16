import {maskPhone} from '../_helpers/stringManipulations'

export function getContactLink(type, val) {
  if (val[0] === '@') val = val.substr(1);
  switch (type) {
    case 'phone':
      return 'tel: ' + val;
    case 'instagram':
      return 'https://www.instagram.com/' + val;
    case 'telegram':
      return 'https://t.me/' + val;
    case 'email':
      return 'mailto: ' + val;
    case 'skype':
      return `skype:${val}?userinfo`;
    case 'vk':
      return `https://vk.com/${val}`;
    default:
      return val;
  }
}

function addAt(val) {
  if (val[0] !== '@') return '@'+val
  return val;
}

export function getContactLabel(type, val) {
  switch (type) {
    case 'phone':
      return maskPhone(val);
    case 'instagram':
      return addAt(val);
    case 'telegram':
      return addAt(val);
    default:
      return val;
  }
}

export function getContactIconClass(type) {
  return 'profile_contact-'+type;
}