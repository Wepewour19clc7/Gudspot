import BaseRoute from '../BaseRoute'

class UserService extends BaseRoute {
  login (email, password) {
    return this.post('/login', {
      email,
      password,
    })
  }

  register (email, password, username) {
    return this.post('/register', {
      email,
      password,
      username
    })
  }
}

export default UserService