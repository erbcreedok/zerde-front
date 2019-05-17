const _validators = {
  ru: {
    attributes: {
      email: 'эл. почта',
      phone: 'телефон',
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
      length: (field, val) => {
        if(field === 'телефон')return 'Некорректный номер телефона';
        return `Длина поля должна быть равна ${val} символам`
      },
      min: (val, args) => `Минимум ${args[0]} символов`,
    },
  },
  kk: {
    attributes: {
      email: 'эл. пошта',
      phone: 'телефон',
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
      length: (field, val) => {
        if(field === 'телефон')return 'Еңгізген телефон қәте';
        return `${val} таңба болу керек`
      },
      min: (val, args) => `Кем дегенде ${args[0]} таңба болу керек`,
    },
  }
};

export default _validators;
