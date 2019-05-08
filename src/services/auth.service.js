const authService = {
  async login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ( username === '77021113438' && password === '123123') {
          resolve({status: 200, data: {token: 'SOME_TOKEN_ASD'}})
        } else {
          reject({status: 400, data: {message: 'BAD_CREDENTIALS'}})
        }
      }, 300)
    });
  },
};

export default authService