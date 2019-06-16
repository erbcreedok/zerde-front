export const dismaskPhone = (phone) => phone.match(/\d+/g).join('');

export const dismaskNumber = (number) => number.match(/\d+/g).join('');

export const maskPhone = (number) => number.replace(/^(\d{1})(\d{3})(\d{3})(\d{4}).*/, '+$1($2)$3-$4')
