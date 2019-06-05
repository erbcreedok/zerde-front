export const dismaskPhone = (phone) => phone.match(/\d+/g).join('');

export const dismaskNumber = (number) => number.match(/\d+/g).join('');
