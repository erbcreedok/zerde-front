const dictionary = {
  ru: {
    attributes: {
      email: 'эл. почта',
      password: 'пароль',
      first_name: 'имя',
      firstName: 'имя',
      name: 'имя',
      last_name: 'фамилия',
      lastName: 'фамилия',
      surname: 'фамилия',
    },
    messages: {
      required: (n) => `Поле "${n}" обязательно`,
      email: 'Вы ввели неверный электронный адрес',
      min: (val, args) => `Минимум ${args[0]} символов`,
    },
  },
  kz: {
  
    attributes: {
      email: 'эл. пошта',
      password: 'құпия сөз',
      first_name: 'аты',
      firstName: 'аты',
      name: 'аты',
      last_name: 'тегі',
      lastName: 'тегі',
      surname: 'тегі',
    },
    messages: {
      required: (n) => `"${n[0].toUpperCase() + n.substr(1)}" толтыру қажет`,
      email: 'Енгізген электрондық пошта жарамсыз',
      min: (val, args) => `Кем дегенде ${args[0]} таңба болу керек`,
    },
  }
};

export default dictionary;
